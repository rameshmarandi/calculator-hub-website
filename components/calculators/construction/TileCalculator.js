"use client";

import { useMemo, useState, useEffect } from "react";

import CalculatorLayout from "@/components/core/CalculatorLayout";
import InputsGrid from "@/components/core/InputsGrid";
import ResultHero from "@/components/core/ResultHero";
import StatsGrid from "@/components/core/StatsGrid";
import ExplanationText from "@/components/core/ExplanationText";

import { calculateTiles, toNumber } from "../../../lib/formulas";
import TileCalculatorArticle from "../../content/construction/TileCalculatorArticle";

export default function TileCalculator() {

  /* ---------- DEFAULT VALUES ---------- */

  const [values, setValues] = useState({
    floorLength: "5",
    floorWidth: "4",
    tileLength: "600",
    tileWidth: "600",
    wastage: "10",
  });

  const [warning, setWarning] = useState("");

  /* ---------- WARNING CHECK ---------- */

  useEffect(() => {
    const tileL = toNumber(values.tileLength);
    const tileW = toNumber(values.tileWidth);
    const waste = toNumber(values.wastage);

    if (tileL && tileL < 100) {
      setWarning("Tile size looks too small. Minimum recommended is 100 mm.");
    } else if (tileW && tileW < 100) {
      setWarning("Tile width looks too small. Minimum recommended is 100 mm.");
    } else if (waste > 30) {
      setWarning("Wastage above 30% is unrealistic.");
    } else {
      setWarning("");
    }
  }, [values]);

  /* ---------- RESULT CALCULATION ---------- */

  const result = useMemo(() => {
    return calculateTiles({
      floorLength: toNumber(values.floorLength),
      floorWidth: toNumber(values.floorWidth),
      tileLength: toNumber(values.tileLength),
      tileWidth: toNumber(values.tileWidth),
      wastage: toNumber(values.wastage),
    });
  }, [values]);

  /* ---------- INPUT CONFIG ---------- */

  const inputs = [
    {
      key: "floorLength",
      label: "Floor Length (meters)",
      type: "amount",
      placeholder: "5",
      prefix: "",
    },
    {
      key: "floorWidth",
      label: "Floor Width (meters)",
      type: "amount",
      placeholder: "4",
      prefix: "",
    },
    {
      key: "tileLength",
      label: "Tile Length (mm)",
      type: "amount",
      placeholder: "600",
      helper: "Common: 300–800 mm",
      prefix: "",
    },
    {
      key: "tileWidth",
      label: "Tile Width (mm)",
      type: "amount",
      placeholder: "600",
      prefix: "",
    },
    {
      key: "wastage",
      label: "Wastage (%)",
      type: "amount",
      placeholder: "10",
      helper: "Recommended: 5–15%",
      prefix: "",
    },
  ];

  /* ---------- SAFE VALUES ---------- */

  const tiles = result?.tiles ?? 0;
  const floorArea = result?.floorArea ?? 0;
  const tileArea = result?.tileArea ?? 0;

  /* ---------- UI ---------- */

  return (
    <CalculatorLayout
      title="Tile Calculator"
      subtitle="Estimate number of tiles required for flooring or wall tiling."
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

      {warning && (
        <p className="text-sm text-yellow-600">{warning}</p>
      )}

      <ResultHero
        label="Tiles Required"
        value={`${tiles} tiles`}
      />

      <StatsGrid
        items={[
          {
            label: "Floor Area",
            value: `${floorArea.toFixed(2)} m²`,
            variant: "neutral",
          },
          {
            label: "Tile Area",
            value: `${tileArea.toFixed(3)} m²`,
            variant: "neutral",
          },
        ]}
      />

      <ExplanationText text="Floor area divided by tile area plus wastage gives total tiles required." />

      <TileCalculatorArticle />
    </CalculatorLayout>
  );
}