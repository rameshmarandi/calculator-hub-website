"use client";

import { useMemo, useState } from "react";

import CalculatorLayout from "@/components/core/CalculatorLayout";
import InputsGrid from "@/components/core/InputsGrid";
import ResultHero from "@/components/core/ResultHero";
import StatsGrid from "@/components/core/StatsGrid";

import { calculateBricks, toNumber } from "@/lib/formulas";
import BrickCalculatorArticle from "../../content/construction/BrickCalculatorArticle";


export default function BrickCalculator() {

  const [values, setValues] = useState({
    length: "5",
    height: "3",
    brickType: "standard"
  });

  const result = useMemo(() => {
    return calculateBricks({
      length: toNumber(values.length),
      height: toNumber(values.height),
      brickType: values.brickType
    });
  }, [values]);

  const inputs = [
    {
      key: "length",
      label: "Wall Length (meters)",
      type: "amount",
      placeholder: "5",
      prefix: ""
    },
    {
      key: "height",
      label: "Wall Height (meters)",
      type: "amount",
      placeholder: "3",
         prefix: ""
    },
    {
      key: "brickType",
      label: "Brick Type",
      type: "select",
      options: [
        { label: "Standard Brick", value: "standard" },
        { label: "Modular Brick", value: "modular" }
      ]
    }
  ];

  const bricks = result?.bricks ?? 0;
  const mortar = result?.mortar ?? 0;
  const area = result?.area ?? 0;

  return (
    <CalculatorLayout
      title="Brick Calculator"
      subtitle="Estimate bricks and mortar required for wall construction."
    >
      <InputsGrid
        inputs={inputs}
        values={values}
        setValues={setValues}

      />

      <ResultHero
        label="Bricks Required"
        value={`${bricks} bricks`}
      />

      <StatsGrid
        items={[
          { label: "Wall Area", value: `${area} m²` },
          { label: "Mortar Required", value: `${mortar} m³` }
        ]}
      />

      <BrickCalculatorArticle />
    </CalculatorLayout>
  );
}