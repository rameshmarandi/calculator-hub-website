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

export default function RetirementPlanningCalculator() {

  /* ================= STATE ================= */

  const [values, setValues] = useState({
    expense: "30000",
    rate: "6",
    years: "25",
  });

  /* ================= SAFE PARSING ================= */

  const parsed = useMemo(() => {
    return {
      P: Number(values.expense) || 0,
      r: (Number(values.rate) || 0) / 100,
      n: Number(values.years) || 0,
    };
  }, [values]);

  /* ================= CALCULATION ================= */

  const result = useMemo(() => {
    const { P, r, n } = parsed;

    const futureMonthly = P * Math.pow(1 + r, n);
    const annualExpense = futureMonthly * 12;
    const corpus = annualExpense * 25;

    return {
      futureMonthly,
      annualExpense,
      corpus,
    };
  }, [parsed]);

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
    []
  );

  /* ================= DERIVED VALUES ================= */

  const todaysAnnual = parsed.P * 12;

  const inflationAdded =
    result.annualExpense > todaysAnnual
      ? result.annualExpense - todaysAnnual
      : 0;

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

      <ResultHero
        label="Required Retirement Corpus"
        value={formatINR(result.corpus)}
      />

      <DonutBreakdownChart
        title="Today's Value vs Inflation Impact"
        data={[
          {
            name: "Today's Annual Cost",
            value: todaysAnnual,
          },
          {
            name: "Inflation Added Cost",
            value: inflationAdded,
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
          result.futureMonthly
        )} per month after ${parsed.n} years at ${
          values.rate || 0
        }% inflation. Using the 4% rule, you would need about ${formatINR(
          result.corpus
        )} to retire comfortably.`}
      />

      <RetirementCalculatorArticle />
    </CalculatorLayout>
  );
}