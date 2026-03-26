"use client";

import { useMemo, useState } from "react";

import CalculatorLayout from "@/components/core/CalculatorLayout";
import InputsGrid from "@/components/core/InputsGrid";
import ResultHero from "@/components/core/ResultHero";
import StatsGrid from "@/components/core/StatsGrid";
import ExplanationText from "@/components/core/ExplanationText";

import { calculateSand, toNumber } from "../../../lib/formulas";
import SandQuantityArticle from "../../content/construction/SandQuantityArticle";

export default function SandQuantityCalculator() {

  /* ---------- PREFILLED DEFAULTS ---------- */

  const [values, setValues] = useState({
    length: "5",
    width: "4",
    thickness: "100",
    ratio: "1:4",
  });

  /* ---------- DERIVED RESULT ---------- */

  const result = useMemo(() => {
    return calculateSand({
      length: toNumber(values.length),
      width: toNumber(values.width),
      thickness: toNumber(values.thickness),
      mixRatio: values.ratio,
    });
  }, [values]);

  /* ---------- INPUT CONFIG ---------- */

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
      label: "Cement : Sand Ratio",
      type: "select",
      options: [
        { value: "1:3", label: "1:3" },
        { value: "1:4", label: "1:4" },
        { value: "1:5", label: "1:5" },
      ],
    },
  ];

  /* ---------- SAFE FALLBACKS ---------- */

  const brass = result?.brass ?? 0;
  const volume = result?.volume ?? 0;

  /* ---------- UI ---------- */

  return (
    <CalculatorLayout
      title="Sand Quantity Calculator"
      subtitle="Estimate sand required for slabs, plastering or flooring."
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
        label="Sand Required"
        value={`${brass.toFixed(2)} brass`}
      />

      <StatsGrid
        items={[
          {
            label: "Sand Volume",
            value: `${volume.toFixed(3)} m³`,
            variant: "neutral",
          },
        ]}
      />

      <ExplanationText text="Uses wet volume → dry volume (1.54 factor) → mix ratio distribution to compute sand requirement accurately." />

      <SandQuantityArticle />
    </CalculatorLayout>
  );
}