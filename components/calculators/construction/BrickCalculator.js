"use client";

import { useState } from "react";
import { Calculator, BarChart } from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { PercentageInput } from "../../inputs/PercentageInput";
import { ResultCard } from "../../ResultCard";

export default function BrickCalculator() {
  const [length, setLength] = useState("");
  const [height, setHeight] = useState("");
  const [brickType, setBrickType] = useState("standard");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    if (!length || Number(length) <= 0) {
      setError("Please enter valid wall length.");
      return false;
    }

    if (!height || Number(height) <= 0) {
      setError("Please enter valid wall height.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- CALCULATION ---------------- */
  function calculateBricks(e) {
    e.preventDefault();
    if (!validate()) return;

    const wallLength = Number(length);
    const wallHeight = Number(height);

    // Standard Indian brick size with mortar
    // 1 sq.m ≈ 500 bricks (for 230mm wall thickness)
    const bricksPerSqMeter =
      brickType === "standard" ? 500 : 450;

    const wallArea = wallLength * wallHeight;
    const totalBricks = wallArea * bricksPerSqMeter;

    // Mortar approx 25% of brickwork volume
    const mortarVolume = wallArea * 0.3;

    setResult({
      area: wallArea.toFixed(2),
      bricks: Math.ceil(totalBricks),
      mortar: mortarVolume.toFixed(2),
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
          Brick Calculator
        </h1>
        <p className="text-sm leading-relaxed">
          Use this Brick Calculator to estimate the number of bricks
          and mortar required for wall construction.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateBricks} className="space-y-4">
        <AmountInput
          label="Wall Length (meters)"
          value={length}
          onChange={setLength}
          placeholder="5"
        />

        <AmountInput
          label="Wall Height (meters)"
          value={height}
          onChange={setHeight}
          placeholder="3"
        />

        <PercentageInput
          label="Brick Type"
          value={brickType}
          onChange={setBrickType}
          placeholder="standard"
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
          Calculate Bricks
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <div className="grid md:grid-cols-3 gap-4" aria-live="polite">
          <ResultCard
            variant="neutral"
            icon={<BarChart size={20} />}
            label="Wall Area"
            value={`${result.area} m²`}
          />

          <ResultCard
            variant="primary"
            icon={<BarChart size={20} />}
            label="Bricks Required"
            value={`${result.bricks} bricks`}
          />

          <ResultCard
            variant="neutral"
            icon={<BarChart size={20} />}
            label="Mortar Required"
            value={`${result.mortar} m³`}
          />
        </div>
      )}

      {/* ================= SEO BLOG CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          How to Calculate Number of Bricks
        </h2>

        <p>
          Brick calculation is essential before starting wall
          construction to estimate material cost and avoid shortages.
          The number of bricks depends on wall area, brick size, and
          mortar thickness.
        </p>

        <h3 className="font-semibold">
          Brick Calculation Formula
        </h3>

        <p
          className="font-mono text-xs p-3 rounded"
          style={{ backgroundColor: "var(--surface-2)" }}
        >
          Wall Area = Length × Height  
          Total Bricks = Wall Area × Bricks per m²  
          Mortar Volume ≈ 25–30% of brickwork volume
        </p>

        <ul className="list-disc pl-5">
          <li>Standard brick size: 190 × 90 × 90 mm</li>
          <li>Approx. 500 bricks per m² (230mm wall)</li>
          <li>Mortar ratio usually 1:6 (cement:sand)</li>
        </ul>

        <h3 className="font-semibold">
          Why Use a Brick Calculator?
        </h3>

        <ul className="list-disc pl-5">
          <li>Accurate estimation of bricks</li>
          <li>Better construction cost planning</li>
          <li>Reduces material wastage</li>
          <li>Useful for contractors & homeowners</li>
        </ul>

        <p>
          This brick calculator provides a quick and reliable estimate
          for residential and commercial construction projects.
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ This calculator provides an estimate only. Actual brick
        requirement may vary based on workmanship and mortar thickness.
      </aside>
    </section>
  );
}
