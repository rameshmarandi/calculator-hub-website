"use client";

import { useMemo, useState } from "react";

import CalculatorLayout from "@/components/core/CalculatorLayout";
import InputsGrid from "@/components/core/InputsGrid";
import ResultHero from "@/components/core/ResultHero";
import DonutBreakdownChart from "@/components/core/DonutBreakdownChart";
import StatsGrid from "@/components/core/StatsGrid";
import ExplanationText from "@/components/core/ExplanationText";


import { formatINR } from "@/lib/format";
import { calculateLumpsum } from "../../../lib/formulas";
import LumpsumInvestmentArticle from "../../content/finance/LumpsumInvestmentArticle";

export default function LumpsumInvestmentCalculator() {
  /* ================= STATE ================= */

  const [values, setValues] = useState({
    amount: "",
    rate: "",
    years: "",
  });

  /* ================= NORMALIZED ================= */

  const amount = Number(values.amount);
  const rate = Number(values.rate);
  const years = Number(values.years);

  const isValid = amount > 0 && rate >= 0 && years > 0;

  /* ================= CALC ================= */

  const result = useMemo(() => {
    if (!isValid) return null;

    return calculateLumpsum (amount, rate, years);
  }, [amount, rate, years, isValid]);

  /* ================= INPUT CONFIG ================= */

  const inputs = [
    {
      key: "amount",
      label: "Investment Amount",
      type: "amount",
      placeholder: "1,00,000",
      hint: "One-time investment",
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
      min: 1,
      hint: "Longer duration increases compounding",
    },
  ];

  /* ================= UI ================= */

  return (
    <CalculatorLayout
      title="Lumpsum Investment Calculator"
      subtitle="Estimate the future value of a one-time investment using compound growth."
      badges={[
        "100% Free",
        "Instant Results",
        "Compound Growth Accurate",
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
            data={[
              { name: "Invested", value: result.invested },
              { name: "Gains", value: result.gains },
            ]}
          />

          {/* STATS */}
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

          {/* EXPLANATION */}
          <ExplanationText
            text={`A one-time investment of ${formatINR(
              amount
            )} growing at ${rate}% annually for ${years} years can grow to ${formatINR(
              result.futureValue
            )} through compounding.`}
          />
        </>
      )}

      <LumpsumInvestmentArticle/>
    </CalculatorLayout>
  );
}
