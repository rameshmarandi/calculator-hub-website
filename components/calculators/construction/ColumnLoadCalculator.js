"use client";

import { useState } from "react";
import { Calculator, BarChart } from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { PercentageInput } from "../../inputs/PercentageInput";
import { ResultCard } from "../../ResultCard";

export default function ColumnLoadCalculator() {
  const [columnHeight, setColumnHeight] = useState("");
  const [columnWidth, setColumnWidth] = useState("");
  const [columnDepth, setColumnDepth] = useState("");
  const [floors, setFloors] = useState("1");
  const [floorLoad, setFloorLoad] = useState("10"); // kN per floor (avg)

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    if (!columnHeight || Number(columnHeight) <= 0) {
      setError("Please enter valid column height.");
      return false;
    }

    if (!columnWidth || Number(columnWidth) <= 0) {
      setError("Please enter valid column width.");
      return false;
    }

    if (!columnDepth || Number(columnDepth) <= 0) {
      setError("Please enter valid column depth.");
      return false;
    }

    if (!floors || Number(floors) <= 0) {
      setError("Number of floors must be at least 1.");
      return false;
    }

    if (!floorLoad || Number(floorLoad) <= 0) {
      setError("Please enter valid floor load.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- CALCULATION ---------------- */
  function calculateColumnLoad(e) {
    e.preventDefault();
    if (!validate()) return;

    const h = Number(columnHeight);
    const b = Number(columnWidth) / 1000; // mm → m
    const d = Number(columnDepth) / 1000; // mm → m
    const f = Number(floors);
    const flLoad = Number(floorLoad);

    // Self weight of column (RCC = 25 kN/m³)
    const selfWeight = b * d * h * 25;

    // Load from floors
    const loadFromFloors = f * flLoad;

    const totalLoad = selfWeight + loadFromFloors;

    setResult({
      selfWeight: selfWeight.toFixed(2),
      floorLoad: loadFromFloors.toFixed(2),
      totalLoad: totalLoad.toFixed(2),
    });
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
        <h1 className="text-2xl font-bold mb-1">
          Column Load Calculator
        </h1>
        <p className="text-sm leading-relaxed">
          Use this Column Load Calculator to estimate the load acting on
          an RCC column based on size, height, and number of floors.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateColumnLoad} className="space-y-4">
        <AmountInput
          label="Column Height (meters)"
          value={columnHeight}
          onChange={setColumnHeight}
          placeholder="3"
        />

        <AmountInput
          label="Column Width (mm)"
          value={columnWidth}
          onChange={setColumnWidth}
          placeholder="300"
        />

        <AmountInput
          label="Column Depth (mm)"
          value={columnDepth}
          onChange={setColumnDepth}
          placeholder="450"
        />

        <PercentageInput
          label="Number of Floors"
          value={floors}
          onChange={setFloors}
          placeholder="2"
        />

        <PercentageInput
          label="Load per Floor (kN)"
          value={floorLoad}
          onChange={setFloorLoad}
          placeholder="10"
        />

        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

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

      {/* ================= SEO BLOG CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          What is Column Load?
        </h2>

        <p>
          Column load is the total load transferred from slabs, beams,
          and floors down to the foundation through a column. Proper
          column load calculation is critical for safe structural
          design.
        </p>

        <h3 className="font-semibold">
          Column Load Calculation Formula
        </h3>

        <p
          className="font-mono text-xs p-3 rounded"
          style={{ backgroundColor: "var(--surface-2)" }}
        >
          Column Self Weight = Width × Depth × Height × 25  
          Load from Floors = Number of Floors × Load per Floor  
          Total Column Load = Self Weight + Floor Load
        </p>

        <ul className="list-disc pl-5">
          <li>25 kN/m³ is the unit weight of RCC</li>
          <li>Floor load includes slab + live load</li>
          <li>Column size depends on total load</li>
        </ul>

        <h3 className="font-semibold">
          Why Use a Column Load Calculator?
        </h3>

        <ul className="list-disc pl-5">
          <li>Ensures safe column sizing</li>
          <li>Helps design footing and foundation</li>
          <li>Useful for engineers & site planning</li>
          <li>Prevents structural failure</li>
        </ul>

        <p>
          This column load calculator provides a simplified estimate
          for preliminary design and construction planning.
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ This calculator provides an estimate only. Final column
        design must be carried out by a qualified structural engineer.
      </aside>
    </section>
  );
}
