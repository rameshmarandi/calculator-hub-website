"use client";

import { useState } from "react";
import { Calculator, BarChart } from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { ResultCard } from "../../ResultCard";
import ColumnLoadCalculatorArticle from "../../content/construction/ColumnLoadCalculatorArticle";

export default function ColumnLoadCalculator() {
  const [columnHeight, setColumnHeight] = useState("");
  const [columnWidth, setColumnWidth] = useState("");
  const [columnDepth, setColumnDepth] = useState("");
  const [floors, setFloors] = useState("1");
  const [floorLoad, setFloorLoad] = useState("10");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */

 function validate() {
  const height = parseFloat(columnHeight);
  const width = parseFloat(columnWidth);
  const depth = parseFloat(columnDepth);
  const totalFloors = parseFloat(floors);
  const floorLoadValue = parseFloat(floorLoad);

  if (!Number.isFinite(height) || height <= 0) {
    setError("Enter a valid column height.");
    return false;
  }

  if (!Number.isFinite(width) || width < 200 || width > 2000) {
    setError("Column width must be between 200 mm and 2000 mm.");
    return false;
  }

  if (!Number.isFinite(depth) || depth < 200 || depth > 2000) {
    setError("Column depth must be between 200 mm and 2000 mm.");
    return false;
  }

  if (!Number.isInteger(totalFloors) || totalFloors < 1 || totalFloors > 200) {
    setError("Number of floors must be a whole number between 1 and 200.");
    return false;
  }

  if (!Number.isFinite(floorLoadValue) || floorLoadValue <= 0) {
    setError("Enter a valid load per floor.");
    return false;
  }

  setError("");
  return true;
}

  /* ---------------- CALCULATION ---------------- */

  function calculateColumnLoad(e) {
    e.preventDefault();

    if (!validate()) return;

    const height = parseFloat(columnHeight);
    const width = parseFloat(columnWidth) / 1000;
    const depth = parseFloat(columnDepth) / 1000;
    const totalFloors = parseFloat(floors);
    const loadPerFloor = parseFloat(floorLoad);

    // RCC density
    const RCC_DENSITY = 25;

    // Column volume
    const columnVolume = width * depth * height;

    // Column self weight
    const selfWeight = columnVolume * RCC_DENSITY;

    // Load from floors
    const loadFromFloors = totalFloors * loadPerFloor;

    // Total load
    const totalLoad = selfWeight + loadFromFloors;

    setResult({
      selfWeight: selfWeight.toFixed(2),
      floorLoad: loadFromFloors.toFixed(2),
      totalLoad: totalLoad.toFixed(2),
    });
  }

  /* ---------------- RESET ERROR ON INPUT ---------------- */

  function handleChange(setter) {
    return (value) => {
      setError("");
      setter(value);
    };
  }

  return (
    <section
      className="rounded-xl p-6 space-y-10"
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)",
      }}
    >
      {/* ================= HEADER ================= */}

      <header>
        <h1 className="text-2xl font-bold mb-1">Column Load Calculator</h1>
        <p className="text-sm leading-relaxed">
          Estimate the structural load acting on an RCC column based on column
          dimensions, height, and number of floors.
        </p>
      </header>

      {/* ================= FORM ================= */}

      <form onSubmit={calculateColumnLoad} className="space-y-4">
        <AmountInput
          label="Column Height (meters)"
          value={columnHeight}
          onChange={handleChange(setColumnHeight)}
          placeholder="3"
          prefix=""
        />

        <AmountInput
          label="Column Width (mm)"
          value={columnWidth}
          onChange={handleChange(setColumnWidth)}
          placeholder="300"
          prefix=""
        />

        <AmountInput
          label="Column Depth (mm)"
          value={columnDepth}
          onChange={handleChange(setColumnDepth)}
          placeholder="450"
          prefix=""
        />

        <AmountInput
          label="Number of Floors"
          value={floors}
          onChange={handleChange(setFloors)}
          placeholder="2"
          prefix=""
        />

        <AmountInput
          label="Load per Floor (kN)"
          value={floorLoad}
          onChange={handleChange(setFloorLoad)}
          placeholder="10"
          prefix=""
        />

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          className="w-full py-2.5 rounded-md font-medium flex items-center justify-center gap-2"
          style={{
            backgroundColor: "var(--primary)",
            color: "#fff",
          }}
        >
          <Calculator size={18} />
          Calculate Column Load
        </button>
      </form>

      {/* ================= RESULT ================= */}

      {result && (
        <div className="grid md:grid-cols-3 gap-4" aria-live="polite">
          <ResultCard
            variant="neutral"
            icon={<BarChart size={20} />}
            label="Column Self Weight"
            value={`${result.selfWeight} kN`}
          />

          <ResultCard
            variant="neutral"
            icon={<BarChart size={20} />}
            label="Load from Floors"
            value={`${result.floorLoad} kN`}
          />

          <ResultCard
            variant="primary"
            icon={<BarChart size={20} />}
            label="Total Column Load"
            value={`${result.totalLoad} kN`}
          />
        </div>
      )}

      {/* ================= ARTICLE ================= */}

      <ColumnLoadCalculatorArticle />
    </section>
  );
}
