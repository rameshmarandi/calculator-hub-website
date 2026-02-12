"use client";

import { useMemo, useState } from "react";

import CalculatorLayout from "@/components/core/CalculatorLayout";
import InputsGrid from "@/components/core/InputsGrid";
import ResultHero from "@/components/core/ResultHero";
import StatsGrid from "@/components/core/StatsGrid";
import ExplanationText from "@/components/core/ExplanationText";

import { calculateTiles, toNumber } from "../../../lib/formulas";
import TileCalculatorArticle from "../../content/construction/TileCalculatorArticle";

export default function TileCalculator() {
  const [values, setValues] = useState({
    floorLength: "",
    floorWidth: "",
    tileLength: "",
    tileWidth: "",
    wastage: "10",
  });

  const [warning, setWarning] = useState("");

  const isComplete =
    values.floorLength &&
    values.floorWidth &&
    values.tileLength &&
    values.tileWidth;

  const result = useMemo(() => {
    if (!isComplete) return null;

    const tileL = toNumber(values.tileLength);
    const tileW = toNumber(values.tileWidth);
    const waste = toNumber(values.wastage);

    // friendly warnings
    if (tileL < 100 || tileW < 100) {
      setWarning("Tile size looks too small. Minimum recommended is 100 mm.");
    } else if (waste > 30) {
      setWarning("Wastage above 30% is unrealistic. It has been limited.");
    } else {
      setWarning("");
    }

    return calculateTiles({
      floorLength: toNumber(values.floorLength),
      floorWidth: toNumber(values.floorWidth),
      tileLength: tileL,
      tileWidth: tileW,
      wastage: waste,
    });
  }, [values, isComplete]);

  const inputs = [
    {
      key: "floorLength",
      label: "Floor Length (meters)",
      type: "amount",
      placeholder: "5",
    },
    {
      key: "floorWidth",
      label: "Floor Width (meters)",
      type: "amount",
      placeholder: "4",
    },
    {
      key: "tileLength",
      label: "Tile Length (mm)",
      type: "amount",
      placeholder: "600",
      helper: "Common: 300–800 mm",
    },
    {
      key: "tileWidth",
      label: "Tile Width (mm)",
      type: "amount",
      placeholder: "600",
    },
    {
      key: "wastage",
      label: "Wastage (%)",
      type: "amount",
      placeholder: "10",
      helper: "Recommended: 5–10%",
    },
  ];

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
      <InputsGrid inputs={inputs} values={values} setValues={setValues} />

      {warning && (
        <p className="text-sm text-yellow-600">{warning}</p>
      )}

      {result && (
        <>
          <ResultHero
            label="Tiles Required"
            value={`${result.tiles} tiles`}
          />

          <StatsGrid
            items={[
              {
                label: "Floor Area",
                value: `${result.floorArea.toFixed(2)} m²`,
                variant: "neutral",
              },
              {
                label: "Tile Area",
                value: `${result.tileArea.toFixed(3)} m²`,
                variant: "neutral",
              },
            ]}
          />
        </>
      )}

      <ExplanationText text="Floor area divided by tile area plus wastage gives total tiles required." />
      <TileCalculatorArticle/>
    </CalculatorLayout>
  );
}
