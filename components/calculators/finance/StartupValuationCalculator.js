"use client";

import { useMemo, useState } from "react";

import InputsGrid from "@/components/core/InputsGrid";
import StatsGrid from "@/components/core/StatsGrid";
import ResultHero from "@/components/core/ResultHero";
import ExplanationText from "@/components/core/ExplanationText";
import CalculatorLayout from "@/components/core/CalculatorLayout";

import { formatINR } from "@/lib/format";
import { calculateStartupValuation } from "../../../lib/formulas";
import StartupValuationArticle from "../../content/finance/StartupValuationArticle";

export default function StartupValuationCalculator() {

  /* ---------------- STATE ---------------- */

  const [values, setValues] = useState({
    revenue: "5000000",
    growth: "20",
    multiple: "5",
  });

  /* ---------------- SAFE NUMBERS ---------------- */

  const revenue = Number(values.revenue) || 0;
  const growthRate = Number(values.growth) || 0;
  const multiple = Number(values.multiple) || 0;

  /* ---------------- RESULT ---------------- */

  const result = useMemo(() => {
    const calculated = calculateStartupValuation({
      revenue,
      growthRate,
      multiple,
    });

    return (
      calculated || {
        valuation: 0,
        adjustedRevenue: 0,
      }
    );
  }, [revenue, growthRate, multiple]);

  /* ---------------- INPUT CONFIG ---------------- */

  const inputs = [
    {
      key: "revenue",
      label: "Annual Revenue",
      type: "amount",
      placeholder: "50,00,000",
    },
    {
      key: "growth",
      label: "Expected Annual Growth Rate (%)",
      type: "percent",
      placeholder: "20",
    },
    {
      key: "multiple",
      label: "Revenue Multiple",
      type: "number",
      placeholder: "5",
      min: 1,
    },
  ];

  /* ---------------- UI ---------------- */

  return (
    <CalculatorLayout
      title="Startup Valuation Calculator"
      subtitle="Estimate valuation using revenue growth and industry multiples."
      badges={[
        "Instant Results",
        "Founder Friendly",
        "100% Free",
        "No Signup Required",
      ]}
    >
      <InputsGrid inputs={inputs} values={values} setValues={setValues} />

      <ResultHero
        label="Estimated Startup Valuation"
        value={formatINR(result.valuation || 0)}
      />

      <StatsGrid
        items={[
          {
            label: "Adjusted Annual Revenue",
            value: formatINR(result.adjustedRevenue || 0),
            variant: "info",
          },
          {
            label: "Revenue Multiple",
            value: `${multiple || 0}x`,
            variant: "neutral",
          },
        ]}
      />

      <ExplanationText
        text={`With ${growthRate}% growth, your revenue becomes ${formatINR(
          result.adjustedRevenue
        )}. Applying a ${multiple}x revenue multiple gives an estimated startup valuation of ${formatINR(
          result.valuation
        )}.`}
      />

      <StartupValuationArticle />
    </CalculatorLayout>
  );
}