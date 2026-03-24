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
import { calculateSip, calculateStepUpSip } from "@/lib/formulas";
import StepUpSIPCalculatorArticle from "../../content/finance/StepUpSIPCalculatorArticle";

export default function StepUpSipCalculator() {

  /* ================= STATE ================= */

  const [values, setValues] = useState({
    monthly: 5000,
    rate: 12,
    stepUp: 10,
    years: 15,
  });

  /* ================= SAFE NUMBERS ================= */

  const monthly = Number(values.monthly) || 0;
  const rate = Number(values.rate) || 0;
  const stepUp = Number(values.stepUp) || 0;
  const years = Number(values.years) || 0;

  /* ================= CALCULATIONS ================= */

  const result = useMemo(() => {
    if (monthly <= 0 || years <= 0) {
      return {
        invested: 0,
        gains: 0,
        futureValue: 0,
        months: 0,
      };
    }

    return calculateStepUpSip(monthly, rate, stepUp, years);
  }, [monthly, rate, stepUp, years]);

  const regularSip = useMemo(() => {
    if (monthly <= 0 || years <= 0) {
      return {
        futureValue: 0,
      };
    }

    return calculateSip(monthly, rate, years);
  }, [monthly, rate, years]);

  /* ================= INPUT CONFIG ================= */

  const inputs = [
    {
      key: "monthly",
      label: "Initial Monthly Investment",
      type: "amount",
      placeholder: "5,000",
      hint: "Starting SIP amount",
    },
    {
      key: "rate",
      label: "Expected Annual Return (%)",
      type: "percent",
      placeholder: "12",
      hint: "Estimated yearly return",
    },
    {
      key: "stepUp",
      label: "Annual Step-Up Rate (%)",
      type: "percent",
      placeholder: "10",
      hint: "Yearly increase in SIP amount",
    },
    {
      key: "years",
      label: "Investment Duration (Years)",
      type: "number",
      placeholder: "15",
      min: 1,
      hint: "Longer duration increases compounding",
    },
  ];

  return (
    <CalculatorLayout
      title="Step-Up SIP Calculator"
      subtitle="Estimate future value when your SIP increases every year and accelerate wealth creation through compounding."
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
        text={`With a starting SIP of ${formatINR(
          monthly
        )} increasing ${stepUp}% yearly for ${years} years at ${rate}% returns, your corpus can grow to ${formatINR(
          result.futureValue
        )}.`}
      />

      <ComparisonMatrix
        columns={["Type", "Future Value"]}
        rows={[
          ["Regular SIP", formatINR(regularSip.futureValue)],
          ["Step-Up SIP", formatINR(result.futureValue)],
        ]}
      />

      <StepUpSIPCalculatorArticle />

    </CalculatorLayout>
  );
}