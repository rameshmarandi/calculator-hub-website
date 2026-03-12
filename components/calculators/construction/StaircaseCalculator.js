"use client";

import { useState } from "react";
import { Calculator, BarChart, RotateCcw } from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { ResultCard } from "../../ResultCard";
import StaircaseCalculatorArticle from "../../content/construction/StaircaseCalculatorArticle";

export default function StaircaseCalculator() {
  const [floorHeight, setFloorHeight] = useState("");
  const [riserHeight, setRiserHeight] = useState("150");
  const [treadDepth, setTreadDepth] = useState("270");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  // Used to force form reset
  const [formKey, setFormKey] = useState(0);

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    const height = Number(floorHeight);
    const riser = Number(riserHeight);
    const tread = Number(treadDepth);

    if (!height || height <= 0) {
      setError("Please enter a valid floor height.");
      return false;
    }

    if (!riser || riser <= 0) {
      setError("Please enter a valid riser height.");
      return false;
    }

    if (!tread || tread <= 0) {
      setError("Please enter a valid tread depth.");
      return false;
    }

    if (riser < 120 || riser > 220) {
      setError("Riser height should be between 120mm and 220mm.");
      return false;
    }

    if (tread < 200 || tread > 350) {
      setError("Tread depth should be between 200mm and 350mm.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- CALCULATION ---------------- */
  function calculateStaircase(e) {
    e.preventDefault();
    if (!validate()) return;

    const heightMM = Number(floorHeight);
    const riserMM = Number(riserHeight);
    const treadMM = Number(treadDepth);

    const steps = Math.max(1, Math.round(heightMM / riserMM));
    const actualRiser = heightMM / steps;

    // Correct stair run formula
    const totalRun = (steps - 1) * treadMM;

    setResult({
      steps,
      riser: actualRiser.toFixed(1),
      tread: treadMM,
      run: (totalRun / 1000).toFixed(2),
    });
  }

  /* ---------------- RESET ---------------- */
  function resetCalculator() {
    setFloorHeight("");
    setRiserHeight("150");
    setTreadDepth("270");
    setResult(null);
    setError("");

    // Force full form re-render (fixes reset issues)
    setFormKey((prev) => prev + 1);
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
        <h1 className="text-2xl font-bold mb-1">Staircase Calculator</h1>
        <p className="text-sm leading-relaxed">
          Use this Staircase Calculator to calculate the number of steps,
          riser height, tread depth, and total staircase length.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form
        key={formKey}
        onSubmit={calculateStaircase}
        className="space-y-4"
      >
        <AmountInput
          label="Floor Height (mm)"
          value={floorHeight}
          onChange={setFloorHeight}
          placeholder="3000"
          prefix=""
        />

        <AmountInput
          label="Preferred Riser Height (mm)"
          value={riserHeight}
          onChange={setRiserHeight}
          placeholder="150"
          prefix=""
        />

        <AmountInput
          label="Tread Depth (mm)"
          value={treadDepth}
          onChange={setTreadDepth}
          placeholder="270"
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
          Calculate Staircase
        </button>

        <button
          type="button"
          onClick={resetCalculator}
          className="w-full py-2.5 rounded-md font-medium flex items-center justify-center gap-2 border"
        >
          <RotateCcw size={16} />
          Reset
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <div className="grid md:grid-cols-4 gap-4" aria-live="polite">
          <ResultCard
            variant="primary"
            icon={<BarChart size={20} />}
            label="Number of Steps"
            value={`${result.steps}`}
          />

          <ResultCard
            variant="neutral"
            icon={<BarChart size={20} />}
            label="Actual Riser Height"
            value={`${result.riser} mm`}
          />

          <ResultCard
            variant="neutral"
            icon={<BarChart size={20} />}
            label="Tread Depth"
            value={`${result.tread} mm`}
          />

          <ResultCard
            variant="neutral"
            icon={<BarChart size={20} />}
            label="Total Staircase Run"
            value={`${result.run} m`}
          />
        </div>
      )}

      {/* ================= SEO ARTICLE ================= */}
      <StaircaseCalculatorArticle />
    </section>
  );
}