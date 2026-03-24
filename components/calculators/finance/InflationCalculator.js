"use client";

import { useMemo, useState } from "react";

import CalculatorLayout from "@/components/core/CalculatorLayout";
import InputsGrid from "@/components/core/InputsGrid";
import ResultHero from "@/components/core/ResultHero";
import StatsGrid from "@/components/core/StatsGrid";
import ExplanationText from "@/components/core/ExplanationText";

import { formatINR } from "@/lib/format";
import InflationCalculatorArticle from "../../content/finance/InflationArticle";

export default function InflationCalculator() {

  /* ================= STATE ================= */

  const [values, setValues] = useState({
    amount: "100000",
    rate: "6",
    years: "10",
  });

  /* ================= SAFE PARSING ================= */

  const parsed = useMemo(() => {
    return {
      P: Number(values.amount) || 0,
      r: (Number(values.rate) || 0) / 100,
      n: Number(values.years) || 0,
    };
  }, [values]);

  /* ================= CALCULATION ================= */

  const result = useMemo(() => {
    const { P, r, n } = parsed;

    const futureValue = P * Math.pow(1 + r, n);
    const loss = futureValue - P;

    return {
      futureValue,
      loss,
      todayValue: P,
    };
  }, [parsed]);

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

      {/* HERO RESULT */}
      <ResultHero
        label="Future Value Needed"
        value={formatINR(result.futureValue)}
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
            value: `${values.rate || 0}%`,
            variant: "info",
          },
        ]}
      />

      {/* EXPLANATION */}
      <ExplanationText
        text={`₹${formatINR(result.todayValue)} today becomes ₹${formatINR(
          result.futureValue
        )} after ${values.years || 0} years at ${
          values.rate || 0
        }% inflation.`}
      />

      {/* SEO ARTICLE */}
      <InflationCalculatorArticle />
    </CalculatorLayout>
  );
}