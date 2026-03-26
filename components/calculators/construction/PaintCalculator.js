"use client";

import { useMemo, useState } from "react";

import CalculatorLayout from "@/components/core/CalculatorLayout";
import InputsGrid from "@/components/core/InputsGrid";
import ResultHero from "@/components/core/ResultHero";
import StatsGrid from "@/components/core/StatsGrid";
import ExplanationText from "@/components/core/ExplanationText";

import { calculatePaint, toNumber } from "../../../lib/formulas";
import PaintCalculatorArticle from "../../content/construction/PaintCalculatorArticle";

export default function PaintCalculator() {

  /* ---------- PREFILLED DEFAULT VALUES ---------- */

  const [values, setValues] = useState({
    length: "5",
    width: "4",
    height: "3",
    coats: "2",
    coverage: "10",
  });

  /* ---------- DERIVED RESULT ---------- */

  const result = useMemo(() => {
    return calculatePaint({
      length: toNumber(values.length),
      width: toNumber(values.width),
      height: toNumber(values.height),
      coats: toNumber(values.coats),
      coverage: toNumber(values.coverage),
    });
  }, [values]);

  /* ---------- INPUT CONFIG ---------- */

  const inputs = [
    {
      key: "length",
      label: "Room Length (meters)",
      type: "amount",
      placeholder: "5",
      prefix: "",
    },
    {
      key: "width",
      label: "Room Width (meters)",
      type: "amount",
      placeholder: "4",
      prefix: "",
    },
    {
      key: "height",
      label: "Wall Height (meters)",
      type: "amount",
      placeholder: "3",
      prefix: "",
    },
    {
      key: "coats",
      label: "Number of Coats",
      type: "amount",
      placeholder: "2",
      prefix: "",
    },
    {
      key: "coverage",
      label: "Paint Coverage (sqm per liter)",
      type: "amount",
      placeholder: "10",
      prefix: "",
    },
  ];

  /* ---------- SAFE FALLBACK VALUES ---------- */

  const wallArea = result?.wallArea ?? 0;
  const totalArea = result?.totalArea ?? 0;
  const paint = result?.paint ?? 0;

  /* ---------- UI ---------- */

  return (
    <CalculatorLayout
      title="Paint Calculator – Estimate Paint Quantity"
      subtitle="Estimate how much paint is required for walls based on room size and paint coverage."
      badges={[
        "Instant Results",
        "Accurate",
        "100% Free",
        "No Signup Required",
      ]}
    >
      <InputsGrid
        inputs={inputs}
        values={values}
        setValues={setValues}
      />

      <ResultHero
        label="Paint Required"
        value={`${paint} liters`}
      />

      <StatsGrid
        items={[
          {
            label: "Wall Area",
            value: `${wallArea.toFixed(2)} m²`,
            variant: "neutral",
          },
          {
            label: "Total Paint Area",
            value: `${totalArea.toFixed(2)} m²`,
            variant: "neutral",
          },
        ]}
      />

      <ExplanationText text="Wall area multiplied by number of coats divided by paint coverage gives paint quantity required. A 10% buffer is included for wastage." />

      <PaintCalculatorArticle />
    </CalculatorLayout>
  );
}