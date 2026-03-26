"use client";

import { useMemo, useState } from "react";
import { BarChart } from "lucide-react";

import CalculatorLayout from "@/components/core/CalculatorLayout";
import InputsGrid from "@/components/core/InputsGrid";
import ResultHero from "@/components/core/ResultHero";
import StatsGrid from "@/components/core/StatsGrid";

import StaircaseCalculatorArticle from "../../content/construction/StaircaseCalculatorArticle";
import { calculateStaircase } from "../../../lib/formulas";

export default function StaircaseCalculator() {

  /* STATE */

  const [values, setValues] = useState({
    floorHeight: "3000",
    riserHeight: "150",
    treadDepth: "270",
  });

  const { floorHeight, riserHeight, treadDepth } = values;

  /* CALCULATION */

  const result = useMemo(() => {
    return calculateStaircase({
      floorHeight,
      riserHeight,
      treadDepth,
    });
  }, [floorHeight, riserHeight, treadDepth]);

  /* INPUT SCHEMA */

  const inputs = [
    {
      key: "floorHeight",
      label: "Floor Height",
      type: "number",
      placeholder: "3000",
      hint: "Total height between floors (mm)",
    },
    {
      key: "riserHeight",
      label: "Preferred Riser Height",
      type: "number",
      placeholder: "150",
      hint: "Recommended: 120mm – 220mm",
    },
    {
      key: "treadDepth",
      label: "Tread Depth",
      type: "number",
      placeholder: "270",
      hint: "Recommended: 200mm – 350mm",
    },
  ];

  /* STATS */

  const stats = [
    {
      label: "Number of Steps",
      value: result?.steps ?? "0",
      icon: <BarChart size={18} />,
    },
    {
      label: "Actual Riser Height",
      value: result?.riser?.toFixed(1) ?? "0",
      unit: "mm",
      icon: <BarChart size={18} />,
    },
    {
      label: "Tread Depth",
      value: result?.tread ?? "0",
      unit: "mm",
      icon: <BarChart size={18} />,
    },
    {
      label: "Total Staircase Run",
      value: result?.run?.toFixed(2) ?? "0",
      unit: "m",
      icon: <BarChart size={18} />,
    },
  ];

  /* RENDER */

  return (
    <CalculatorLayout
      title="Staircase Calculator"
      description="Calculate the number of steps, riser height, tread depth, and total staircase length."
    >
      <InputsGrid
        inputs={inputs}
        values={values}
        setValues={setValues}
      />

      <ResultHero
        label="Number of Steps"
        value={result?.steps ?? "0"}
      />

      <StatsGrid stats={stats} />

      <StaircaseCalculatorArticle />
    </CalculatorLayout>
  );
}