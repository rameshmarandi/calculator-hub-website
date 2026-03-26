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

  /* ---------- PREFILLED DEFAULT VALUES ---------- */

  const [values, setValues] = useState({
    length: "5",
    width: "4",
    thickness: "100",
    ratio: "1:1.5:3",
  });

  /* ---------- DERIVED RESULT ---------- */

  const result = useMemo(() => {
    return calculateAggregate({
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
      label: "Concrete Mix Ratio (Cement : Sand : Aggregate)",
      type: "select",
      options: [
        { label: "M20 (1 : 1.5 : 3)", value: "1:1.5:3" },
        { label: "M15 (1 : 2 : 4)", value: "1:2:4" },
      ],
    },
  ];

  /* ---------- SAFE FALLBACK VALUES ---------- */

  const brass = result?.brass ?? 0;
  const volume = result?.volume ?? 0;

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
      <InputsGrid
        inputs={inputs}
        values={values}
        setValues={setValues}
      />

      <ResultHero
        label="Aggregate Required"
        value={`${brass.toFixed(2)} brass`}
      />

      <StatsGrid
        items={[
          {
            label: "Aggregate Volume",
            value: `${volume.toFixed(3)} m³`,
            variant: "neutral",
          },
        ]}
      />

      <ExplanationText text="Uses wet volume → dry volume (1.54 factor) → concrete mix ratio distribution to compute aggregate requirement accurately." />

      <AggregateQuantityArticle />
    </CalculatorLayout>
  );
}