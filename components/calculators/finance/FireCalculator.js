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

/* =====================================================
   FORMULA

   Annual Expense = monthly × 12
   FIRE Corpus = annual ÷ withdrawalRate
===================================================== */

export default function FireCalculator() {
  /* ================= STATE ================= */

  const [values, setValues] = useState({
    expense: "",
    rate: "4",
  });

  /* ================= PARSE ONCE ================= */

  const parsed = useMemo(() => {
    return {
      monthly: Number(values.expense),
      rate: Number(values.rate) / 100,
    };
  }, [values]);

  /* ================= VALIDATION ================= */

  const isValid = useMemo(() => {
    const { monthly, rate } = parsed;
    return monthly > 0 && rate > 0;
  }, [parsed]);

  /* ================= PURE CALC ================= */

  const result = useMemo(() => {
    if (!isValid) return null;

    const { monthly, rate } = parsed;

    const annual = monthly * 12;
    const corpus = annual / rate;

    return { monthly, annual, corpus };
  }, [parsed, isValid]);

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
      {/* INPUTS */}
      <InputsGrid inputs={inputs} values={values} setValues={setValues} />

      {result && (
        <>
          {/* MAIN RESULT */}
          <ResultHero
            label="Required FIRE Corpus"
            value={result.corpus}
          />
<DonutBreakdownChart
title="Expense vs FIRE Corpus"

  data={[
    { name: "1 Year Expense", value: result.annual },
    {
      name: "Corpus Needed",
      value: result.corpus - result.annual,
    },
  ]}
/>

          {/* STATS */}
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
                value: `${values.rate}%`,
                variant: "warning",
              },
            ]}
          />

          {/* EXPLANATION */}
          <ExplanationText
            text={`With monthly expenses of ${formatINR(
              result.monthly
            )}, you need ${formatINR(
              result.annual
            )} per year. Using a ${values.rate}% safe withdrawal rate, your required FIRE corpus is approximately ${formatINR(
              result.corpus
            )}.`}
          />
        </>
      )}

      {/* SEO ARTICLE */}
      <FireCalculatorArticle />
    </CalculatorLayout>
  );
}
