"use client";

import { useMemo, useState } from "react";

import CalculatorLayout from "@/components/core/CalculatorLayout";
import InputsGrid from "@/components/core/InputsGrid";
import ResultHero from "@/components/core/ResultHero";
import StatsGrid from "@/components/core/StatsGrid";
import ExplanationText from "@/components/core/ExplanationText";
import { calculateCement, toNumber } from "../../../lib/formulas";
import CementQuantityArticle from "../../content/construction/CementQuantityArticle";

export default function CementQuantityCalculator() {
  const [values, setValues] = useState({
    length: "",
    width: "",
    thickness: "",
    ratio: "1:4",
  });

  /* ---------------- COMPLETE CHECK ---------------- */

  const isComplete =
    values.length !== "" && values.width !== "" && values.thickness !== "";

  /* ---------------- DERIVED RESULT ---------------- */

  const result = useMemo(() => {
    if (!isComplete) return null;

    return calculateCement({
      length: toNumber(values.length),
      width: toNumber(values.width),
      thickness: toNumber(values.thickness),
      mixRatio: values.ratio,
    });
  }, [values, isComplete]);

  /* ---------------- INPUT CONFIG ---------------- */

  const inputs = [
    {
      key: "length",
      label: "Length (meters)",
      type: "amount",
      placeholder: "5",
    },
    {
      key: "width",
      label: "Width (meters)",
      type: "amount",
      placeholder: "4",
    },
    {
      key: "thickness",
      label: "Thickness (mm)",
      type: "amount",
      placeholder: "100",
    },
    {
      key: "ratio",
      label: "Mix Ratio (Cement : Sand)",
      type: "text",
      placeholder: "1:4",
    },
  ];

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
      <InputsGrid inputs={inputs} values={values} setValues={setValues} />

      {result && (
        <>
         <ResultHero
  label="Cement Bags Required"
  value={`${result.cementBags} bags`}
  bags
/>


          <StatsGrid
            items={[
              {
                label: "Concrete Volume",
                value: `${result.volume.toFixed(3)} m³`,
                variant: "neutral",
              },
            ]}
          />
        </>
      )}

      <ExplanationText text="Uses wet volume → dry volume (1.54 factor) → mix ratio distribution to compute cement requirement accurately." />
      <CementQuantityArticle/>
    </CalculatorLayout>
  );
}
