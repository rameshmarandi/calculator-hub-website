"use client";

import { useMemo, useState } from "react";

import CalculatorLayout from "@/components/core/CalculatorLayout";
import InputsGrid from "@/components/core/InputsGrid";
import ResultHero from "@/components/core/ResultHero";
import DonutBreakdownChart from "@/components/core/DonutBreakdownChart";
import StatsGrid from "@/components/core/StatsGrid";
import ExplanationText from "@/components/core/ExplanationText";


import { formatINR } from "@/lib/format";
import { calculateCompoundInterest } from "../../../lib/formulas";
import CompoundInterestArticle from "../../content/finance/CompoundInterestArticle";

export default function CompoundInterestCalculator() {
  /* ================= STATE ================= */

  const [values, setValues] = useState({
    principal: "",
    rate: "",
    years: "",
    frequency: "1",
  });

  /* ================= NORMALIZED ================= */

  const principal = Number(values.principal);
  const rate = Number(values.rate);
  const years = Number(values.years);
  const frequency = Number(values.frequency);

  const isValid =
    principal > 0 &&
    rate >= 0 &&
    years > 0 &&
    frequency > 0;

  /* ================= CALC ================= */

  const result = useMemo(() => {
    if (!isValid) return null;

    return calculateCompoundInterest(
      principal,
      rate,
      years,
      frequency,
    );
  }, [principal, rate, years, frequency, isValid]);

  /* ================= INPUT CONFIG ================= */

  const inputs = [
    {
      key: "principal",
      label: "Principal Amount",
      type: "amount",
      placeholder: "1,00,000",
      hint: "Initial investment",
    },
    {
      key: "rate",
      label: "Annual Interest Rate (%)",
      type: "percent",
      placeholder: "8",
      hint: "Interest per year",
    },
    {
      key: "years",
      label: "Investment Duration (Years)",
      type: "number",
      placeholder: "5",
      min: 1,
      hint: "Total time invested",
    },
    {
      key: "frequency",
      label: "Compounding Frequency",
      type: "select",
      options: [
        { label: "Yearly", value: 1 },
        { label: "Half-Yearly", value: 2 },
        { label: "Quarterly", value: 4 },
        { label: "Monthly", value: 12 },
        { label: "Daily", value: 365 },
      ],
      hint: "How often interest compounds",
    },
  ];

  /* ================= UI ================= */

  return (
    <CalculatorLayout
      title="Compound Interest Calculator"
      subtitle="Calculate compound growth of your investment with different compounding frequencies."
      badges={[
        "100% Free",
        "Instant Results",
        "Bank Formula Accurate",
        "No Signup Required",
      ]}
    >
      <InputsGrid inputs={inputs} values={values} setValues={setValues} />

      {result && (
        <>
          {/* HERO */}
          <ResultHero label="Future Value" value={result.futureValue} />

          {/* BREAKDOWN */}
          <DonutBreakdownChart
          title="Principal vs Interest Earned"

            data={[
              { name: "Principal", value: result.invested },
              { name: "Interest", value: result.gains },
            ]}
          />

          {/* STATS */}
          <StatsGrid
            items={[
              {
                label: "Principal",
                value: formatINR(result.invested),
                variant: "neutral",
              },
              {
                label: "Interest Earned",
                value: formatINR(result.gains),
                variant: "success",
              },
              {
                label: "Total Amount",
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

          {/* EXPLANATION */}
          <ExplanationText
            text={`An investment of ${formatINR(
              principal,
            )} at ${rate}% interest compounded ${frequency} time(s) per year for ${years} years grows to ${formatINR(
              result.futureValue,
            )}.`}
          />
        </>
      )}
      <CompoundInterestArticle/>
    </CalculatorLayout>
  );
}
