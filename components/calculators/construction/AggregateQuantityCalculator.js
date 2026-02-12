"use client";

import { useMemo, useState } from "react";

import CalculatorLayout from "@/components/core/CalculatorLayout";
import InputsGrid from "@/components/core/InputsGrid";
import ResultHero from "@/components/core/ResultHero";
import StatsGrid from "@/components/core/StatsGrid";
import ExplanationText from "@/components/core/ExplanationText";

import { calculateAggregate, toNumber } from "../../../lib/formulas";
import AggregateQuantityArticle from "../../content/construction/AggregateQuantityArticle";

export default function AggregateQuantityCalculator() {
  const [values, setValues] = useState({
    length: "",
    width: "",
    thickness: "",
    ratio: "1:1.5:3",
  });

  /* ---------- COMPLETE CHECK ---------- */

  const isComplete =
    values.length !== "" && values.width !== "" && values.thickness !== "";

  /* ---------- DERIVED RESULT ---------- */

  const result = useMemo(() => {
    if (!isComplete) return null;

    return calculateAggregate({
      length: toNumber(values.length),
      width: toNumber(values.width),
      thickness: toNumber(values.thickness),
      mixRatio: values.ratio,
    });
  }, [values, isComplete]);

  /* ---------- INPUT CONFIG ---------- */

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
      label: "Concrete Mix Ratio (Cement : Sand : Aggregate)",
      type: "select",
      options: [
        { label: "M20 (1 : 1.5 : 3)", value: "1:1.5:3" },
        { label: "M15 (1 : 2 : 4)", value: "1:2:4" },
      ],
    },
  ];

  /* ---------- UI ---------- */

  return (
    <CalculatorLayout
      title="Aggregate Quantity Calculator"
      subtitle="Estimate coarse aggregate required for slabs, beams and concrete works."
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
            label="Aggregate Required"
            value={`${result.brass.toFixed(2)} brass`}
          />

          <StatsGrid
            items={[
              {
                label: "Aggregate Volume",
                value: `${result.volume.toFixed(3)} m³`,
                variant: "neutral",
              },
            ]}
          />
        </>
      )}

      <ExplanationText text="Uses wet volume → dry volume (1.54 factor) → concrete mix ratio distribution to compute aggregate requirement accurately." />
    <AggregateQuantityArticle/>
    </CalculatorLayout>
  );
}
