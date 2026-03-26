"use client";

import { useMemo, useState } from "react";

import CalculatorLayout from "@/components/core/CalculatorLayout";
import InputsGrid from "@/components/core/InputsGrid";
import ResultHero from "@/components/core/ResultHero";
import StatsGrid from "@/components/core/StatsGrid";
import ExplanationText from "@/components/core/ExplanationText";

import { calculateCement, toNumber } from "@/lib/formulas";

import CementQuantityArticle from "../../content/construction/CementQuantityArticle";

export default function CementQuantityCalculator() {

  /* ---------------- DEFAULT PREFILLED VALUES ---------------- */

  const [values, setValues] = useState({
    length: "5",
    width: "4",
    thickness: "100",
    ratio: "1:4",
  });

  /* ---------------- RESULT CALCULATION ---------------- */

  const result = useMemo(() => {
    return calculateCement({
      length: toNumber(values.length),
      width: toNumber(values.width),
      thickness: toNumber(values.thickness),
      mixRatio: values.ratio,
    });
  }, [values]);

  /* ---------------- INPUT CONFIG ---------------- */

  const inputs = [
    {
      key: "length",
      label: "Length (meters)",
      type: "amount",
      placeholder: "5",
      prefix: "",
    },
    {
      key: "width",
      label: "Width (meters)",
      type: "amount",
      placeholder: "4",
      prefix: "",
    },
    {
      key: "thickness",
      label: "Thickness (mm)",
      type: "amount",
      placeholder: "100",
      prefix: "",
    },
    {
      key: "ratio",
      label: "Mix Ratio (Cement : Sand)",
      type: "text",
      placeholder: "1:4",
    },
  ];

  /* ---------------- SAFE FALLBACK VALUES ---------------- */

  console.log("cement_quety", result)
  const cementBags = result?.cementBags ?? 0;

  const volume = result?.volume ?? 0;

  /* ---------------- UI ---------------- */

  return (
    <CalculatorLayout
      title="Cement Quantity Calculator"
      subtitle="Estimate cement bags required for slabs, plastering or flooring."
      badges={[
        "Instant Results",
        "Construction Accurate",
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
        label="Cement Bags Required"
        value={`${cementBags} bags`}
        bags
      />

      <StatsGrid
        items={[
          {
            label: "Concrete Volume",
            value: `${volume.toFixed(3)} m³`,
            variant: "neutral",
          },
        ]}
      />

      <ExplanationText text="Uses wet volume → dry volume (1.54 factor) → mix ratio distribution to compute cement requirement accurately." />

      <CementQuantityArticle />
    </CalculatorLayout>
  );
}