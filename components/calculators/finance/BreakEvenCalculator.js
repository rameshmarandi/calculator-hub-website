"use client";

import { useMemo, useState } from "react";

import InputsGrid from "@/components/core/InputsGrid";
import StatsGrid from "@/components/core/StatsGrid";
import ResultHero from "@/components/core/ResultHero";
import ExplanationText from "@/components/core/ExplanationText";
import CalculatorLayout from "@/components/core/CalculatorLayout";

import { formatINR } from "@/lib/format";

import { calculateBreakEven } from "../../../lib/formulas";
import BreakEvenCalculatorArticle from "../../content/finance/BreakEvenCalculatorArticle";

export default function BreakEvenCalculator() {
  /* ---------------- STATE ---------------- */

  const [values, setValues] = useState({
    fixed: "",
    price: "",
    variable: "",
  });

  /* ---------------- SHOW ONLY WHEN COMPLETE ---------------- */

  const isComplete =
    values.fixed !== "" && values.price !== "" && values.variable !== "";

  /* ---------------- DERIVED RESULT ---------------- */

  const result = useMemo(() => {
    if (!isComplete) return null;

    return calculateBreakEven({
      fixedCost: values.fixed,
      sellingPrice: values.price,
      variableCost: values.variable,
    });
  }, [values, isComplete]);

  /* ---------------- INPUT CONFIG ---------------- */

  const inputs = [
    {
      key: "fixed",
      label: "Fixed Costs",
      type: "amount",
      placeholder: "1,00,000",
    },
    {
      key: "price",
      label: "Selling Price per Unit",
      type: "amount",
      placeholder: "500",
    },
    {
      key: "variable",
      label: "Variable Cost per Unit",
      type: "amount",
      placeholder: "300",
    },
  ];

  /* ---------------- UI ---------------- */

  return (
    <CalculatorLayout
      title="Break Even Calculator"
      subtitle="Find how many units you must sell to cover all costs."
      badges={[
        "Instant Results",
        "Business Accurate",
        "100% Free",
        "No Signup Required",
      ]}
    >
      <InputsGrid inputs={inputs} values={values} setValues={setValues} />

      {result?.impossible && (
        <ExplanationText
          variant="danger"
          text="Break even is not possible because variable cost is greater than or equal to selling price. You lose money on every unit."
        />
      )}

      {result && !result.impossible && (
        <>
          <ResultHero label="Break Even Units" value={result.units} />

          <StatsGrid
            items={[
              {
                label: "Break Even Revenue",
                value: formatINR(result.revenue),
                variant: "info",
              },
              {
                label: "Contribution Margin",
                value: formatINR(result.contribution),
                variant: "neutral",
              },
            ]}
          />
        </>
      )}
      <BreakEvenCalculatorArticle />
    </CalculatorLayout>
  );
}
