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
    revenue: "",
    growth: "",
    multiple: "",
  });

  /* ---------------- READY CHECK ---------------- */

  const isComplete =
    values.revenue !== "" &&
    values.growth !== "" &&
    values.multiple !== "";

  /* ---------------- DERIVED RESULT ---------------- */

  const result = useMemo(() => {
    if (!isComplete) return null;

    return calculateStartupValuation({
      revenue: values.revenue,
      growthRate: values.growth,
      multiple: values.multiple,
    });
  }, [values, isComplete]);

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

      {result && (
        <>
          <ResultHero
            label="Estimated Startup Valuation"
            value={result.valuation}
          />

          <StatsGrid
            items={[
              {
                label: "Adjusted Annual Revenue",
                value: formatINR(result.adjustedRevenue),
                variant: "info",
              },
              {
                label: "Revenue Multiple",
                value: `${values.multiple}x`,
                variant: "neutral",
              },
            ]}
          />

          <ExplanationText
            text={`With ${values.growth}% growth, your revenue becomes ${formatINR(
              result.adjustedRevenue
            )}. Applying a ${values.multiple}x multiple gives an estimated valuation of ${formatINR(
              result.valuation
            )}.`}
          />
        </>
      )}

      <StartupValuationArticle/>
    </CalculatorLayout>
  );
}
