"use client";

import { useState } from "react";
import { Calculator, BarChart } from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { ResultCard } from "../../ResultCard";
import BrickCalculatorArticle from "../../content/construction/Brick CalculatorArticle";

export default function BrickCalculator() {
  const [length, setLength] = useState("");
  const [height, setHeight] = useState("");
  const [brickType, setBrickType] = useState("standard");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    const l = Number(length);
    const h = Number(height);

    if (!l || l <= 0) {
      setError("Please enter valid wall length.");
      return false;
    }

    if (!h || h <= 0) {
      setError("Please enter valid wall height.");
      return false;
    }

    if (l > 1000 || h > 50) {
      setError("Wall dimensions seem unusually large.");
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

    /* ----------- WALL THICKNESS ----------- */
    const wallThickness = 0.23; // 230mm standard brick wall

    /* ----------- BRICK SIZE ----------- */
    let brickLength = 0.19;
    let brickWidth = 0.09;
    let brickHeight = 0.09;

    if (brickType === "modular") {
      brickLength = 0.2;
      brickWidth = 0.1;
      brickHeight = 0.1;
    }

    /* ----------- MORTAR JOINT ----------- */
    const mortar = 0.01; // 10mm

    /* ----------- WALL VOLUME ----------- */
    const wallVolume = wallLength * wallHeight * wallThickness;

    /* ----------- BRICK VOLUME WITH MORTAR ----------- */
    const brickVolume =
      (brickLength + mortar) * (brickWidth + mortar) * (brickHeight + mortar);

    /* ----------- BRICK COUNT ----------- */
    let bricks = wallVolume / brickVolume;

    /* ----------- WASTAGE ----------- */
    bricks = bricks * 1.05;

    /* ----------- ACTUAL BRICK VOLUME ----------- */
    const brickActualVolume = brickLength * brickWidth * brickHeight;

    /* ----------- MORTAR VOLUME ----------- */
    const mortarVolume = wallVolume - bricks * brickActualVolume;

    setResult({
      area: (wallLength * wallHeight).toFixed(2),
      bricks: Math.ceil(bricks),
      mortar: mortarVolume.toFixed(3),
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
        <h1 className="text-2xl font-bold mb-1">Brick Calculator</h1>
        <p className="text-sm leading-relaxed">
          Estimate the number of bricks and mortar required for wall
          construction.
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

        {/* Brick Type */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Brick Type</label>

          <select
            value={brickType}
            onChange={(e) => setBrickType(e.target.value)}
            className="w-full border rounded-md px-3 py-2"
          >
            <option value="standard">Standard Brick</option>
            <option value="modular">Modular Brick</option>
          </select>
        </div>

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

      <BrickCalculatorArticle />
    </section>
  );
}
