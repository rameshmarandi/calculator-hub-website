"use client";

import { useMemo, useState } from "react";
import { BarChart } from "lucide-react";

import CalculatorLayout from "@/components/core/CalculatorLayout";
import InputsGrid from "@/components/core/InputsGrid";
import ResultHero from "@/components/core/ResultHero";
import StatsGrid from "@/components/core/StatsGrid";

import ColumnLoadCalculatorArticle from "../../content/construction/ColumnLoadCalculatorArticle";
import { calculateColumnLoad } from "../../../lib/formulas";

export default function ColumnLoadCalculator() {

  /* ---------------- STATE ---------------- */

  const [values, setValues] = useState({
    columnHeight: "3",
    columnWidth: "300",
    columnDepth: "450",
    floors: "2",
    floorLoad: "10",
  });

  /* ---------------- CALCULATION ---------------- */

  const result = useMemo(() => {
    return calculateColumnLoad({
      columnHeight: values.columnHeight,
      columnWidth: values.columnWidth,
      columnDepth: values.columnDepth,
      floors: values.floors,
      floorLoad: values.floorLoad,
    });
  }, [values]);

  /* ---------------- INPUT CONFIG ---------------- */

  const inputs = [
    {
      key: "columnHeight",
      label: "Column Height",
      type: "number",
      placeholder: "3",
      hint: "Height of the column in meters",
    },
    {
      key: "columnWidth",
      label: "Column Width",
      type: "number",
      placeholder: "300",
      hint: "Width in millimeters",
    },
    {
      key: "columnDepth",
      label: "Column Depth",
      type: "number",
      placeholder: "450",
      hint: "Depth in millimeters",
    },
    {
      key: "floors",
      label: "Number of Floors",
      type: "number",
      placeholder: "2",
    },
    {
      key: "floorLoad",
      label: "Load per Floor",
      type: "number",
      placeholder: "10",
      hint: "Load applied per floor (kN)",
    },
  ];

  /* ---------------- STATS ---------------- */

  const stats = [
    {
      label: "Column Self Weight",
      value: result?.selfWeight?.toFixed(2) ?? "0",
      unit: "kN",
      icon: <BarChart size={18} />,
    },
    {
      label: "Load from Floors",
      value: result?.floorLoad?.toFixed(2) ?? "0",
      unit: "kN",
      icon: <BarChart size={18} />,
    },
    {
      label: "Total Column Load",
      value: result?.totalLoad?.toFixed(2) ?? "0",
      unit: "kN",
      icon: <BarChart size={18} />,
    },
  ];

  /* ---------------- RENDER ---------------- */

  return (
    <CalculatorLayout
      title="Column Load Calculator"
      description="Estimate the structural load acting on an RCC column based on column dimensions, height, and number of floors."
    >
      <InputsGrid
        inputs={inputs}
        values={values}
        setValues={setValues}
      />

      <ResultHero
        label="Total Column Load"
        value={result?.totalLoad?.toFixed(2) ?? "0"}
        unit="kN"
      />

      <StatsGrid stats={stats} />

      <ColumnLoadCalculatorArticle />
    </CalculatorLayout>
  );
}