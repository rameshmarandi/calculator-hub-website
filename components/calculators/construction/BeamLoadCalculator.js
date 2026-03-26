"use client";

import { useMemo, useState } from "react";

import CalculatorLayout from "@/components/core/CalculatorLayout";
import InputsGrid from "@/components/core/InputsGrid";
import ResultHero from "@/components/core/ResultHero";
import StatsGrid from "@/components/core/StatsGrid";
import ExplanationText from "@/components/core/ExplanationText";

import { calculateBeamLoad, toNumber } from "../../../lib/formulas";
import BeamLoadCalculatorArticle from "../../content/construction/BeamLoadCalculatorArticle";

export default function BeamLoadCalculator() {

  /* ---------- DEFAULT VALUES ---------- */

  const [values, setValues] = useState({
    beamLength: "4",
    beamWidth: "230",
    beamDepth: "450",
    liveLoad: "3"
  });

  /* ---------- RESULT CALCULATION ---------- */

  const result = useMemo(() => {
    return calculateBeamLoad({
      beamLength: toNumber(values.beamLength),
      beamWidth: toNumber(values.beamWidth),
      beamDepth: toNumber(values.beamDepth),
      liveLoad: toNumber(values.liveLoad)
    });
  }, [values]);

  /* ---------- INPUT CONFIG ---------- */

  const inputs = [
    {
      key: "beamLength",
      label: "Beam Length (meters)",
      type: "amount",
      placeholder: "4",
      prefix: ""
    },
    {
      key: "beamWidth",
      label: "Beam Width (mm)",
      type: "amount",
      placeholder: "230",
      prefix: ""
    },
    {
      key: "beamDepth",
      label: "Beam Depth (mm)",
      type: "amount",
      placeholder: "450",
      prefix: ""
    },
    {
      key: "liveLoad",
      label: "Live Load (kN/m)",
      type: "amount",
      placeholder: "3",
      prefix: ""
    }
  ];

  /* ---------- SAFE VALUES ---------- */

  const selfWeight = result?.selfWeight ?? 0;
  const loadPerMeter = result?.loadPerMeter ?? 0;
  const totalLoad = result?.totalLoad ?? 0;

  /* ---------- UI ---------- */

  return (
    <CalculatorLayout
      title="Beam Load Calculator"
      subtitle="Estimate the self weight and total structural load acting on an RCC beam."
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
        label="Total Load on Beam"
        value={`${totalLoad} kN`}
      />

      <StatsGrid
        items={[
          {
            label: "Beam Self Weight",
            value: `${selfWeight} kN/m`,
            variant: "neutral"
          },
          {
            label: "Total Load per Meter",
            value: `${loadPerMeter} kN/m`,
            variant: "primary"
          }
        ]}
      />

      <ExplanationText text="Beam self weight is calculated using beam volume and RCC density (≈25 kN/m³). Total load per meter equals self weight plus live load, and total beam load equals load per meter multiplied by beam length." />

      <BeamLoadCalculatorArticle />
    </CalculatorLayout>
  );
}