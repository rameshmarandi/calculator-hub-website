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
    fixed: "100000",
    price: "500",
    variable: "300",
  });

  /* ---------------- SAFE NUMBERS ---------------- */

  const fixedCost = Number(values.fixed) || 0;
  const sellingPrice = Number(values.price) || 0;
  const variableCost = Number(values.variable) || 0;

  /* ---------------- RESULT ---------------- */

  const result = useMemo(() => {
    return (
      calculateBreakEven({
        fixedCost,
        sellingPrice,
        variableCost,
      }) || {
        units: 0,
        revenue: 0,
        contribution: 0,
        impossible: false,
      }
    );
  }, [fixedCost, sellingPrice, variableCost]);

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

      <ResultHero label="Break Even Units" value={result?.units || 0} />

      <StatsGrid
        items={[
          {
            label: "Break Even Revenue",
            value: formatINR(result?.revenue || 0),
            variant: "info",
          },
          {
            label: "Contribution Margin",
            value: formatINR(result?.contribution || 0),
            variant: "neutral",
          },
        ]}
      />

      <BreakEvenCalculatorArticle />
    </CalculatorLayout>
  );
}