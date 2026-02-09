"use client";

import { useMemo, useState } from "react";

import CalculatorLayout from "@/components/core/CalculatorLayout";
import InputsGrid from "@/components/core/InputsGrid";
import ResultHero from "@/components/core/ResultHero";
import StatsGrid from "@/components/core/StatsGrid";
import ExplanationText from "@/components/core/ExplanationText";

import { formatINR } from "@/lib/format";
import InflationArticle from "../../content/finance/InflationArticle";
import InflationCalculatorArticle from "../../content/finance/InflationArticle";

/* =====================================================
   PURE FORMULA
   FV = P × (1 + r)^n
===================================================== */

export default function InflationCalculator() {
  /* ================= STATE ================= */

  const [values, setValues] = useState({
    amount: "",
    rate: "6",
    years: "",
  });

  /* ================= PARSE ONCE ================= */

  const parsed = useMemo(() => {
    const P = Number(values.amount);
    const r = Number(values.rate) / 100;
    const n = Number(values.years);

    return { P, r, n };
  }, [values]);

  /* ================= VALIDATION ================= */

  const isValid = useMemo(() => {
    const { P, r, n } = parsed;
    return P > 0 && n > 0 && r >= 0;
  }, [parsed]);

  /* ================= CALCULATION ================= */

  const result = useMemo(() => {
    if (!isValid) return null;

    const { P, r, n } = parsed;

    const futureValue = P * Math.pow(1 + r, n);
    const loss = futureValue - P;

    return {
      futureValue,
      loss,
      todayValue: P,
    };
  }, [parsed, isValid]);

  /* ================= INPUT CONFIG ================= */

  const inputs = useMemo(
    () => [
      {
        key: "amount",
        label: "Current Amount",
        type: "amount",
        placeholder: "1,00,000",
      },
      {
        key: "rate",
        label: "Expected Inflation Rate (%)",
        type: "percent",
      },
      {
        key: "years",
        label: "Time Period (Years)",
        type: "number",
        min: 1,
      },
    ],
    []
  );

  /* ================= UI ================= */

  return (
    <CalculatorLayout
      title="Inflation Calculator"
      subtitle="Estimate how inflation reduces the value of your money over time"
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
          {/* HERO RESULT */}
          <ResultHero
            label="Future Value Needed"
            value={result.futureValue}
          />

          {/* STATS GRID */}
          <StatsGrid
            items={[
              {
                label: "Loss of Purchasing Power",
                value: formatINR(result.loss),
                variant: "warning",
              },
              {
                label: "Today's Value",
                value: formatINR(result.todayValue),
                variant: "neutral",
              },
              {
                label: "Inflation Rate",
                value: `${values.rate}%`,
                variant: "info",
              },
            ]}
          />

          {/* EXPLANATION */}
          <ExplanationText
            text={`₹${formatINR(parsed.P)} today becomes ₹${formatINR(
              result.futureValue
            )} after ${parsed.n} years at ${values.rate}% inflation. Your money effectively loses ₹${formatINR(
              result.loss
            )} of purchasing power.`}
          />
        </>
      )}

      {/* SEO ARTICLE */}
      <InflationCalculatorArticle />
    </CalculatorLayout>
  );
}
