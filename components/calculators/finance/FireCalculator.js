"use client";

import { useMemo, useState } from "react";

import CalculatorLayout from "@/components/core/CalculatorLayout";
import InputsGrid from "@/components/core/InputsGrid";
import ResultHero from "@/components/core/ResultHero";
import StatsGrid from "@/components/core/StatsGrid";
import ExplanationText from "@/components/core/ExplanationText";
import DonutBreakdownChart from "@/components/core/DonutBreakdownChart";

import { formatINR } from "@/lib/format";

import FireCalculatorArticle from "../../content/finance/FireCalculatorArticle";

export default function FireCalculator() {

  /* ================= STATE ================= */

  const [values, setValues] = useState({
    expense: "40000",
    rate: "4",
  });

  /* ================= SAFE PARSING ================= */

  const parsed = useMemo(() => {
    return {
      monthly: Number(values.expense) || 0,
      rate: (Number(values.rate) || 0) / 100,
    };
  }, [values]);

  /* ================= CALCULATION ================= */

  const result = useMemo(() => {
    const { monthly, rate } = parsed;

    const annual = monthly * 12;
    const corpus = rate > 0 ? annual / rate : 0;

    return { monthly, annual, corpus };
  }, [parsed]);

  /* ================= INPUT CONFIG ================= */

  const inputs = useMemo(
    () => [
      {
        key: "expense",
        label: "Monthly Living Expenses",
        type: "amount",
        placeholder: "40,000",
      },
      {
        key: "rate",
        label: "Safe Withdrawal Rate (%)",
        type: "percent",
      },
    ],
    []
  );

  /* ================= SAFE CHART VALUES ================= */

  const corpusExtra =
    result.corpus > result.annual
      ? result.corpus - result.annual
      : 0;

  /* ================= UI ================= */

  return (
    <CalculatorLayout
      title="FIRE Calculator"
      subtitle="Estimate how much money you need to achieve Financial Independence"
      badges={[
        "100% Free",
        "Instant Results",
        "Accurate Projection",
        "No Signup Required",
      ]}
    >
      <InputsGrid inputs={inputs} values={values} setValues={setValues} />

      <ResultHero
        label="Required FIRE Corpus"
        value={formatINR(result.corpus)}
      />

      <DonutBreakdownChart
        title="Expense vs FIRE Corpus"
        data={[
          { name: "1 Year Expense", value: result.annual },
          { name: "Corpus Needed", value: corpusExtra },
        ]}
      />

      <StatsGrid
        items={[
          {
            label: "Monthly Expenses",
            value: formatINR(result.monthly),
            variant: "neutral",
          },
          {
            label: "Annual Expenses",
            value: formatINR(result.annual),
            variant: "info",
          },
          {
            label: "Withdrawal Rate",
            value: `${values.rate || 0}%`,
            variant: "warning",
          },
        ]}
      />

      <ExplanationText
        text={`With monthly expenses of ${formatINR(
          result.monthly
        )}, you need ${formatINR(
          result.annual
        )} per year. Using a ${values.rate || 0}% safe withdrawal rate, your required FIRE corpus is approximately ${formatINR(
          result.corpus
        )}.`}
      />

      <FireCalculatorArticle />
    </CalculatorLayout>
  );
}