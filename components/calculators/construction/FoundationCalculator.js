"use client";

import { useState } from "react";
import { Calculator, BarChart, RotateCcw } from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { ResultCard } from "../../ResultCard";
import FoundationCalculatorArticle from "../../content/construction/FoundationCalculatorArticle";

export default function FoundationCalculator() {
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [depth, setDepth] = useState("");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate(l, w, d) {
    if (isNaN(l) || l <= 0 || l > 100) {
      setError("Foundation length should be between 0.1 and 100 meters.");
      return false;
    }

    if (isNaN(w) || w <= 0 || w > 10) {
      setError("Foundation width should be between 0.1 and 10 meters.");
      return false;
    }

    if (isNaN(d) || d <= 0 || d > 5) {
      setError("Foundation depth should be between 0.1 and 5 meters.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- CALCULATION ---------------- */
  function calculateFoundation(e) {
    e.preventDefault();

    const l = parseFloat(length);
    const w = parseFloat(width);
    const d = parseFloat(depth);

    if (!validate(l, w, d)) return;

    /* Wet concrete volume */
    const concreteVolume = l * w * d;

    /* Dry volume factor */
    const dryVolume = concreteVolume * 1.54;

    /* Mix ratio 1:3:6 */
    const cementPart = 1;
    const sandPart = 3;
    const aggregatePart = 6;

    const totalParts = cementPart + sandPart + aggregatePart;

    const cementVolume = (cementPart / totalParts) * dryVolume;
    const sandVolume = (sandPart / totalParts) * dryVolume;
    const aggregateVolume = (aggregatePart / totalParts) * dryVolume;

    /* Conversions */
    const cementBags = cementVolume / 0.035;
    const sandBrass = sandVolume / 2.83;
    const aggregateBrass = aggregateVolume / 2.83;

    setResult({
      concrete: concreteVolume,
      cement: Math.ceil(cementBags),
      sand: sandBrass,
      aggregate: aggregateBrass,
    });
  }

  /* ---------------- RESET ---------------- */
  function resetCalculator() {
    setLength("");
    setWidth("");
    setDepth("");
    setResult(null);
    setError("");
  }

  /* ---------------- FORMATTER ---------------- */
  function formatNumber(num, digits = 2) {
    return Number(num.toFixed(digits)).toLocaleString();
  }

  return (
    <section
      className="rounded-xl p-6 space-y-10"
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)",
      }}
    >
      {/* HEADER */}
      <header>
        <h1 className="text-2xl font-bold mb-1">Foundation Calculator</h1>
        <p className="text-sm leading-relaxed">
          Estimate concrete, cement, sand, and aggregate required for footing
          or foundation construction using foundation dimensions.
        </p>
      </header>

      {/* FORM */}
      <form onSubmit={calculateFoundation} className="space-y-4">
        <AmountInput
          label="Foundation Length (meters)"
          value={length}
          onChange={setLength}
          placeholder="10"
          prefix=""
        />

        <AmountInput
          label="Foundation Width (meters)"
          value={width}
          onChange={setWidth}
          placeholder="0.6"
          prefix=""
        />

        <AmountInput
          label="Foundation Depth (meters)"
          value={depth}
          onChange={setDepth}
          placeholder="0.4"
          prefix=""
        />

        {error && <p className="text-sm text-red-500">{error}</p>}

        <div className="flex gap-3">
          <button
            type="submit"
            className="flex-1 py-2.5 rounded-md font-medium flex items-center justify-center gap-2"
            style={{
              backgroundColor: "var(--primary)",
              color: "#fff",
            }}
          >
            <Calculator size={18} />
            Calculate
          </button>

          <button
            type="button"
            onClick={resetCalculator}
            className="px-4 py-2.5 rounded-md font-medium flex items-center gap-2"
            style={{
              border: "1px solid var(--border)",
            }}
          >
            <RotateCcw size={18} />
            Reset
          </button>
        </div>
      </form>

      {/* RESULT */}
      {result && (
        <>
          <div className="grid md:grid-cols-2 gap-4" aria-live="polite">
            <ResultCard
              variant="neutral"
              icon={<BarChart size={20} />}
              label="Concrete Volume"
              value={`${formatNumber(result.concrete, 3)} m³`}
            />

            <ResultCard
              variant="primary"
              icon={<BarChart size={20} />}
              label="Cement Required"
              value={`${formatNumber(result.cement, 0)} bags`}
            />

            <ResultCard
              variant="neutral"
              icon={<BarChart size={20} />}
              label="Sand Required"
              value={`${formatNumber(result.sand)} brass`}
            />

            <ResultCard
              variant="neutral"
              icon={<BarChart size={20} />}
              label="Aggregate Required"
              value={`${formatNumber(result.aggregate)} brass`}
            />
          </div>

          {/* CALCULATION ASSUMPTIONS */}
          <div className="text-xs opacity-70 space-y-1">
            <p><strong>Calculation Assumptions</strong></p>
            <p>Concrete Mix Ratio: 1 : 3 : 6</p>
            <p>Dry Volume Factor: 1.54</p>
            <p>Cement Bag Volume: 0.035 m³</p>
            <p>1 Brass = 2.83 m³</p>
          </div>
        </>
      )}

      {/* ARTICLE */}
      <FoundationCalculatorArticle />
    </section>
  );
}