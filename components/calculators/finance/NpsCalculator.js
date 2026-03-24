"use client";

import { useMemo, useState } from "react";

import CalculatorLayout from "@/components/core/CalculatorLayout";
import InputsGrid from "@/components/core/InputsGrid";
import ResultHero from "@/components/core/ResultHero";
import DonutBreakdownChart from "@/components/core/DonutBreakdownChart";
import StatsGrid from "@/components/core/StatsGrid";
import ExplanationText from "@/components/core/ExplanationText";

import { formatINR } from "@/lib/format";
import { calculateNps } from "../../../lib/formulas";
import NPSCalculatorArticle from "../../content/finance/NPSCalculatorArticle";

export default function NpsCalculator() {
  /* ================= STATE ================= */

  const [values, setValues] = useState({
    monthly: "5000",
    rate: "10",
    currentAge: "25",
    retirementAge: "60",
  });

  /* ================= CALC ================= */

  const result = useMemo(() => {
    const monthly = Number(values.monthly) || 0;
    const rate = Number(values.rate) || 0;
    const currentAge = Number(values.currentAge) || 0;
    const retirementAge = Number(values.retirementAge) || 0;

    return calculateNps(monthly, rate, currentAge, retirementAge);
  }, [values]);

  /* ================= INPUT CONFIG ================= */

  const inputs = [
    {
      key: "monthly",
      label: "Monthly Contribution",
      type: "amount",
      placeholder: "5,000",
    },
    {
      key: "rate",
      label: "Expected Annual Return (%)",
      type: "percent",
      placeholder: "10",
    },
    {
      key: "currentAge",
      label: "Current Age",
      type: "number",
      min: 18,
      placeholder: "25",
    },
    {
      key: "retirementAge",
      label: "Retirement Age",
      type: "number",
      min: 40,
      placeholder: "60",
    },
  ];

  /* ================= NORMALIZED VALUES ================= */

  const monthly = Number(values.monthly) || 0;
  const rate = Number(values.rate) || 0;
  const currentAge = Number(values.currentAge) || 0;
  const retirementAge = Number(values.retirementAge) || 0;

  /* ================= UI ================= */

  return (
    <CalculatorLayout
      title="NPS Calculator"
      subtitle="Estimate your retirement corpus with monthly NPS contributions and compounding returns."
      badges={[
        "100% Free",
        "Instant Results",
        "Government Backed",
        "No Signup Required",
      ]}
    >
      <InputsGrid inputs={inputs} values={values} setValues={setValues} />

      <ResultHero label="Retirement Corpus" value={result.corpus} />

      <DonutBreakdownChart
        title="Invested Amount vs Returns Earned"
        data={[
          { name: "Investment", value: result.invested },
          { name: "Returns", value: result.gains },
        ]}
      />

      <StatsGrid
        items={[
          {
            label: "Total Investment",
            value: formatINR(result.invested),
          },
          {
            label: "Total Returns",
            value: formatINR(result.gains),
            variant: "success",
          },
          {
            label: "Retirement Corpus",
            value: formatINR(result.corpus),
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
        text={`Contributing ${formatINR(
          monthly
        )} monthly from age ${currentAge} to ${retirementAge} at ${rate}% expected returns can grow to ${formatINR(
          result.corpus
        )}.`}
      />

      <NPSCalculatorArticle />
    </CalculatorLayout>
  );
}