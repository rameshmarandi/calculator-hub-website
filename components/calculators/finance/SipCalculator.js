"use client";

import { useMemo, useState } from "react";

import CalculatorLayout from "@/components/core/CalculatorLayout";
import InputsGrid from "@/components/core/InputsGrid";
import ResultHero from "@/components/core/ResultHero";
import DonutBreakdownChart from "@/components/core/DonutBreakdownChart";
import StatsGrid from "@/components/core/StatsGrid";
import ComparisonMatrix from "@/components/core/ComparisonMatrix";
import ExplanationText from "@/components/core/ExplanationText";

import { formatINR } from "@/lib/format";
import { calculateSip } from "../../../lib/formulas";
import SIPCalculatorArticle from "../../content/finance/SIPCalculatorArticle";

export default function SipCalculator() {

  /* ================= STATE ================= */

  const [values, setValues] = useState({
    monthly: 5000,
    rate: 12,
    years: 10,
  });

  /* ================= SAFE VALUES ================= */

  const monthly = Number(values.monthly) || 0;
  const rate = Number(values.rate) || 0;
  const years = Number(values.years) || 0;

  /* ================= CALC ================= */

  const result = useMemo(() => {
    if (monthly <= 0 || years <= 0) {
      return {
        invested: 0,
        gains: 0,
        futureValue: 0,
        months: 0,
      };
    }

    return calculateSip(monthly, rate, years);
  }, [monthly, rate, years]);

  /* ================= INPUT CONFIG ================= */

  const inputs = [
    {
      key: "monthly",
      label: "Monthly Investment",
      type: "amount",
      placeholder: "5,000",
      hint: "Amount invested every month",
    },
    {
      key: "rate",
      label: "Expected Annual Return (%)",
      type: "percent",
      placeholder: "12",
      hint: "Estimated yearly return",
    },
    {
      key: "years",
      label: "Investment Duration (Years)",
      type: "number",
      placeholder: "10",
      hint: "Longer duration increases compounding",
      min: 1,
    },
  ];

  return (
    <CalculatorLayout
      title="SIP Calculator"
      subtitle="Estimate future value of your monthly SIP investment with compounding returns and plan long term wealth creation."
      badges={[
        "100% Free",
        "Instant Results",
        "Compound Growth Accurate",
        "No Signup Required",
      ]}
    >

      {/* INPUTS */}
      <InputsGrid inputs={inputs} values={values} setValues={setValues} />

      {/* RESULTS (NEVER BLOCKED) */}

      <ResultHero label="Future Value" value={result.futureValue} />

      <DonutBreakdownChart
        title="Investment vs Returns"
        data={[
          { name: "Invested", value: result.invested },
          { name: "Gains", value: result.gains },
        ]}
      />

      <StatsGrid
        items={[
          {
            label: "Total Investment",
            value: formatINR(result.invested),
            variant: "neutral",
          },
          {
            label: "Total Gains",
            value: formatINR(result.gains),
            variant: "success",
          },
          {
            label: "Future Value",
            value: formatINR(result.futureValue),
            variant: "primary",
          },
          {
            label: "Total Months",
            value: result.months,
            variant: "info",
          },
        ]}
      />

      <ExplanationText
        text={`If you invest ${formatINR(
          monthly
        )} every month for ${years} years at an expected return of ${rate}%, your investment can grow to ${formatINR(
          result.futureValue
        )}, generating ${formatINR(result.gains)} in gains.`}
      />

      <ComparisonMatrix
        columns={["Years", "Invested", "Future Value"]}
        rows={[5, 10, 15, 20, 25].map((y) => {
          const r = calculateSip(
            monthly || 5000,
            rate || 12,
            y
          );

          return [
            `${y} years`,
            formatINR(r.invested),
            formatINR(r.futureValue),
          ];
        })}
      />

      <SIPCalculatorArticle />

    </CalculatorLayout>
  );
}