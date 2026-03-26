"use client";

import { useMemo, useState } from "react";

import CalculatorLayout from "@/components/core/CalculatorLayout";
import InputsGrid from "@/components/core/InputsGrid";
import ResultHero from "@/components/core/ResultHero";
import StatsGrid from "@/components/core/StatsGrid";
import ExplanationText from "@/components/core/ExplanationText";

import { calculateSteelWeight, toNumber } from "../../../lib/formulas";
import SteelWeightCalculatorArticle from "../../content/construction/SteelWeightCalculatorArticle";

export default function SteelWeightCalculator() {

  /* ---------- DEFAULT VALUES ---------- */

  const [values, setValues] = useState({
    diameter: "12",
    length: "6",
    quantity: "10"
  });

  /* ---------- RESULT CALCULATION ---------- */

  const result = useMemo(() => {
    return calculateSteelWeight({
      diameter: toNumber(values.diameter),
      length: toNumber(values.length),
      quantity: toNumber(values.quantity)
    });
  }, [values]);

  /* ---------- INPUT CONFIG ---------- */

  const inputs = [
    {
      key: "diameter",
      label: "Bar Diameter (mm)",
      type: "amount",
      placeholder: "12",
      prefix: ""
    },
    {
      key: "length",
      label: "Bar Length (meters)",
      type: "amount",
      placeholder: "6",
      prefix: ""
    },
    {
      key: "quantity",
      label: "Number of Bars",
      type: "amount",
      placeholder: "10",
      prefix: ""
    }
  ];

  /* ---------- SAFE VALUES ---------- */

  const perBar = result?.perBar ?? 0;
  const total = result?.total ?? 0;

  /* ---------- UI ---------- */

  return (
    <CalculatorLayout
      title="Steel Weight Calculator"
      subtitle="Calculate steel bar weight based on diameter, length, and quantity."
      badges={[
        "Instant Results",
        "Engineering Accurate",
        "100% Free",
        "No Signup Required"
      ]}
    >
      <InputsGrid
        inputs={inputs}
        values={values}
        setValues={setValues}
      />

      <ResultHero
        label="Total Steel Weight"
        value={`${total} kg`}
      />

      <StatsGrid
        items={[
          {
            label: "Weight per Bar",
            value: `${perBar} kg`,
            variant: "neutral"
          }
        ]}
      />

      <ExplanationText text="Steel bar weight is calculated using the standard formula: Weight (kg/m) = D² / 162, where D is the bar diameter in millimeters." />

      <SteelWeightCalculatorArticle />
    </CalculatorLayout>
  );
}