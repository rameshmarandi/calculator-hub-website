"use client";

import { useMemo, useState } from "react";

import CalculatorLayout from "@/components/core/CalculatorLayout";
import InputsGrid from "@/components/core/InputsGrid";
import ResultHero from "@/components/core/ResultHero";
import StatsGrid from "@/components/core/StatsGrid";
import ExplanationText from "@/components/core/ExplanationText";

import { calculateRCCSlab, toNumber } from "../../../lib/formulas";
import RCCSlabCalculatorArticle from "../../content/construction/RCCSlabCalculatorArticle";

export default function RCCSlabCalculator() {

  /* ---------- PREFILLED DEFAULTS ---------- */

  const [values, setValues] = useState({
    length: "5",
    width: "4",
    thickness: "125",
    steelPercent: "1"
  });

  /* ---------- RESULT CALCULATION ---------- */

  const result = useMemo(() => {
    return calculateRCCSlab({
      length: toNumber(values.length),
      width: toNumber(values.width),
      thickness: toNumber(values.thickness),
      steelPercent: toNumber(values.steelPercent)
    });
  }, [values]);

  /* ---------- INPUT CONFIG ---------- */

  const inputs = [
    {
      key: "length",
      label: "Slab Length (meters)",
      type: "amount",
      placeholder: "5",
      prefix: ""
    },
    {
      key: "width",
      label: "Slab Width (meters)",
      type: "amount",
      placeholder: "4",
      prefix: ""
    },
    {
      key: "thickness",
      label: "Slab Thickness (mm)",
      type: "amount",
      placeholder: "125",
      prefix: ""
    },
    {
      key: "steelPercent",
      label: "Steel Percentage (%)",
      type: "amount",
      placeholder: "1",
      prefix: ""
    }
  ];

  /* ---------- SAFE VALUES ---------- */

  const concrete = result?.concrete ?? 0;
  const cement = result?.cement ?? 0;
  const sand = result?.sand ?? 0;
  const aggregate = result?.aggregate ?? 0;
  const steel = result?.steel ?? 0;

  /* ---------- UI ---------- */

  return (
    <CalculatorLayout
      title="RCC Slab Calculator"
      subtitle="Estimate concrete, cement, sand, aggregate, and steel required for slab construction."
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
        label="Concrete Volume"
        value={`${concrete} m³`}
      />

      <StatsGrid
        items={[
          { label: "Cement Required", value: `${cement} bags` },
          { label: "Sand Required", value: `${sand} brass` },
          { label: "Aggregate Required", value: `${aggregate} brass` },
          { label: "Steel Required", value: `${steel} kg` }
        ]}
      />

      <ExplanationText text="Concrete volume is calculated from slab dimensions. Dry volume factor (1.54) and M20 mix ratio (1:1.5:3) are used to estimate cement, sand, and aggregate. Steel is estimated using typical reinforcement percentage." />

      <RCCSlabCalculatorArticle />
    </CalculatorLayout>
  );
}