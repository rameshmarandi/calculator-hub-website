"use client";

import { useMemo, useState } from "react";
import { BarChart } from "lucide-react";

import CalculatorLayout from "@/components/core/CalculatorLayout";
import InputsGrid from "@/components/core/InputsGrid";
import ResultHero from "@/components/core/ResultHero";
import StatsGrid from "@/components/core/StatsGrid";

import FoundationCalculatorArticle from "../../content/construction/FoundationCalculatorArticle";
import { calculateFoundation } from "../../../lib/formulas";

export default function FoundationCalculator() {

  /* STATE */

  const [values, setValues] = useState({
    length: "10",
    width: "0.6",
    depth: "0.4",
  });

  const { length, width, depth } = values;

  /* CALCULATION */

  const result = useMemo(() => {
    return calculateFoundation({
      length,
      width,
      depth,
    });
  }, [length, width, depth]);

  /* INPUT SCHEMA */

  const inputs = [
    {
      key: "length",
      label: "Foundation Length",
      type: "number",
      placeholder: "10",
      hint: "Length of foundation in meters",
    },
    {
      key: "width",
      label: "Foundation Width",
      type: "number",
      placeholder: "0.6",
      hint: "Width of foundation in meters",
    },
    {
      key: "depth",
      label: "Foundation Depth",
      type: "number",
      placeholder: "0.4",
      hint: "Depth of foundation in meters",
    },
  ];

  /* STATS */

  const stats = [
    {
      label: "Concrete Volume",
      value: result?.concrete?.toFixed(3) ?? "0",
      unit: "m³",
      icon: <BarChart size={18} />,
    },
    {
      label: "Cement Required",
      value: result?.cement ?? "0",
      unit: "bags",
      icon: <BarChart size={18} />,
    },
    {
      label: "Sand Required",
      value: result?.sand?.toFixed(2) ?? "0",
      unit: "brass",
      icon: <BarChart size={18} />,
    },
    {
      label: "Aggregate Required",
      value: result?.aggregate?.toFixed(2) ?? "0",
      unit: "brass",
      icon: <BarChart size={18} />,
    },
  ];

  /* RENDER */

  return (
    <CalculatorLayout
      title="Foundation Calculator"
      description="Estimate concrete, cement, sand and aggregate required for foundation construction."
    >
      <InputsGrid
        inputs={inputs}
        values={values}
        setValues={setValues}
      />

      <ResultHero
        label="Concrete Volume"
        value={result?.concrete?.toFixed(3) ?? "0"}
        unit="m³"
      />

      <StatsGrid stats={stats} />

      <FoundationCalculatorArticle />
    </CalculatorLayout>
  );
}