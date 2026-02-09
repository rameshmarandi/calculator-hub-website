"use client";

import { useMemo, useState } from "react";

import CalculatorLayout from "@/components/core/CalculatorLayout";
import InputsGrid from "@/components/core/InputsGrid";
import ResultHero from "@/components/core/ResultHero";
import StatsGrid from "@/components/core/StatsGrid";
import ExplanationText from "@/components/core/ExplanationText";
import DonutBreakdownChart from "@/components/core/DonutBreakdownChart";
import { formatINR } from "@/lib/format";

import RetirementCalculatorArticle from "../../content/finance/RetirementCalculatorArticle";

/* =====================================================
   FORMULAS

   Future Monthly = P × (1 + r)^n
   Annual Expense = Monthly × 12
   Corpus = Annual × 25
===================================================== */

export default function RetirementPlanningCalculator() {
  /* ================= STATE ================= */

  const [values, setValues] = useState({
    expense: "",
    rate: "6",
    years: "",
  });

  /* ================= PARSE ONCE ================= */

  const parsed = useMemo(() => {
    return {
      P: Number(values.expense),
      r: Number(values.rate) / 100,
      n: Number(values.years),
    };
  }, [values]);

  /* ================= VALIDATION ================= */

  const isValid = useMemo(() => {
    const { P, r, n } = parsed;
    return P > 0 && n > 0 && r >= 0;
  }, [parsed]);

  /* ================= PURE CALC ================= */

  const result = useMemo(() => {
    if (!isValid) return null;

    const { P, r, n } = parsed;

    const futureMonthly = P * Math.pow(1 + r, n);
    const annualExpense = futureMonthly * 12;
    const corpus = annualExpense * 25;

    return { futureMonthly, annualExpense, corpus };
  }, [parsed, isValid]);

  /* ================= INPUT CONFIG ================= */

  const inputs = useMemo(
    () => [
      {
        key: "expense",
        label: "Current Monthly Expense",
        type: "amount",
        placeholder: "30,000",
      },
      {
        key: "rate",
        label: "Expected Inflation Rate (%)",
        type: "percent",
      },
      {
        key: "years",
        label: "Years Left Until Retirement",
        type: "number",
        min: 1,
      },
    ],
    [],
  );

  /* ================= UI ================= */

  return (
    <CalculatorLayout
      title="Retirement Planning Calculator"
      subtitle="Estimate how much money you need to retire comfortably"
      badges={[
        "100% Free",
        "Instant Results",
        "Accurate Projection",
        "No Signup Required",
      ]}
    >
      <InputsGrid inputs={inputs} values={values} setValues={setValues} />

      {result && (
        <>
          <ResultHero
            label="Required Retirement Corpus"
            value={result.corpus}
          />
          <DonutBreakdownChart
          title="Today’s Value vs Inflation Impact"

            data={[
              {
                name: "Today's Annual Cost",
                value: parsed.P * 12,
              },
              {
                name: "Inflation Added Cost",
                value: result.annualExpense - parsed.P * 12,
              },
            ]}
          />

          <StatsGrid
            items={[
              {
                label: "Monthly Expense at Retirement",
                value: formatINR(result.futureMonthly),
                variant: "warning",
              },
              {
                label: "Annual Expense",
                value: formatINR(result.annualExpense),
                variant: "info",
              },
              {
                label: "Years to Retirement",
                value: parsed.n,
                variant: "neutral",
              },
            ]}
          />

          <ExplanationText
            text={`Your current expense of ${formatINR(parsed.P)} grows to ${formatINR(
              result.futureMonthly,
            )} per month after ${parsed.n} years at ${values.rate}% inflation. To sustain this using the 4% rule, you need approximately ${formatINR(
              result.corpus,
            )}.`}
          />
        </>
      )}

      <RetirementCalculatorArticle />
    </CalculatorLayout>
  );
}
