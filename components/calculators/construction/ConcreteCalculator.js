"use client";

import { useMemo, useState } from "react";

import CalculatorLayout from "@/components/core/CalculatorLayout";
import InputsGrid from "@/components/core/InputsGrid";
import ResultHero from "@/components/core/ResultHero";
import StatsGrid from "@/components/core/StatsGrid";

import { calculateConcrete, toNumber } from "@/lib/formulas";
import ConcreteCalculatorArticle from "../../content/construction/ConcreteCalculatorArticle";

export default function ConcreteCalculator() {

  const [values, setValues] = useState({
    length: "5",
    width: "4",
    thickness: "100",
    ratio: "1:1.5:3"
  });

  const result = useMemo(() => {
    return calculateConcrete({
      length: toNumber(values.length),
      width: toNumber(values.width),
      thickness: toNumber(values.thickness),
      mixRatio: values.ratio
    });
  }, [values]);

  const inputs = [
    {
      key: "length",
      label: "Length (meters)",
      type: "amount",
      placeholder: "5",
      prefix: ""
    },
    {
      key: "width",
      label: "Width (meters)",
      type: "amount",
      placeholder: "4",
      prefix: ""
    },
    {
      key: "thickness",
      label: "Thickness (mm)",
      type: "amount",
      placeholder: "100",
      prefix: ""
    },
    {
      key: "ratio",
      label: "Concrete Mix Ratio",
      type: "select",
      options: [
        { label: "M20 (1 : 1.5 : 3)", value: "1:1.5:3" },
        { label: "M15 (1 : 2 : 4)", value: "1:2:4" }
      ]
    }
  ];

  const cementBags = result?.cementBags ?? 0;
  const sand = result?.sandBrass ?? 0;
  const aggregate = result?.aggregateBrass ?? 0;
  const volume = result?.concreteVolume ?? 0;

  return (
    <CalculatorLayout
      title="Concrete Calculator"
      subtitle="Estimate concrete volume and material requirements."
    >
      <InputsGrid
        inputs={inputs}
        values={values}
        setValues={setValues}
      />

      <ResultHero
        label="Concrete Volume"
        value={`${volume} m³`}
      />

      <StatsGrid
        items={[
          { label: "Cement Required", value: `${cementBags} bags` },
          { label: "Sand Required", value: `${sand} brass` },
          { label: "Aggregate Required", value: `${aggregate} brass` }
        ]}
      />

      <ConcreteCalculatorArticle />
    </CalculatorLayout>
  );
}