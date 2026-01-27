"use client";

import { useState } from "react";
import { Calculator, BarChart } from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { PercentageInput } from "../../inputs/PercentageInput";
import { ResultCard } from "../../ResultCard";

export default function RainwaterHarvestingCalculator() {
  const [roofArea, setRoofArea] = useState("");
  const [rainfall, setRainfall] = useState("");
  const [runoffCoefficient, setRunoffCoefficient] = useState("0.8");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    if (!roofArea || Number(roofArea) <= 0) {
      setError("Please enter valid roof area.");
      return false;
    }

    if (!rainfall || Number(rainfall) <= 0) {
      setError("Please enter valid annual rainfall.");
      return false;
    }

    if (
      !runoffCoefficient ||
      Number(runoffCoefficient) <= 0 ||
      Number(runoffCoefficient) > 1
    ) {
      setError("Runoff coefficient must be between 0 and 1.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- CALCULATION ---------------- */
  function calculateRainwater(e) {
    e.preventDefault();
    if (!validate()) return;

    const area = Number(roofArea);
    const rainMM = Number(rainfall);
    const coeff = Number(runoffCoefficient);

    // Convert rainfall mm → meters
    const rainM = rainMM / 1000;

    // Harvestable water volume
    const volumeM3 = area * rainM * coeff;
    const liters = volumeM3 * 1000;

    setResult({
      volume: volumeM3.toFixed(2),
      liters: liters.toFixed(0),
    });
  }

  return (
    <section
      className="rounded-xl p-6 space-y-10"
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)",
      }}>
      {/* ================= HEADER ================= */}
      <header>
        <h1 className="text-2xl font-bold mb-1">
          Rainwater Harvesting Calculator
        </h1>
        <p className="text-sm leading-relaxed">
          Use this Rainwater Harvesting Calculator to estimate how much
          rainwater you can collect from your rooftop annually.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateRainwater} className="space-y-4">
        <PercentageInput
          label="Roof Area (square meters)"
          value={roofArea}
          onChange={setRoofArea}
          placeholder="100"
        />

        <PercentageInput
          label="Annual Rainfall (mm)"
          value={rainfall}
          onChange={setRainfall}
          placeholder="800"
        />

        <PercentageInput
          label="Runoff Coefficient"
          value={runoffCoefficient}
          onChange={setRunoffCoefficient}
          placeholder="0.8"
        />

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          className="w-full py-2.5 rounded-md font-medium flex items-center justify-center gap-2"
          style={{
            backgroundColor: "var(--primary)",
            color: "#fff",
          }}>
          <Calculator size={18} />
          Calculate Harvested Rainwater
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <div className="grid md:grid-cols-2 gap-4" aria-live="polite">
          <ResultCard
            variant="neutral"
            icon={<BarChart size={20} />}
            label="Harvested Water Volume"
            value={`${result.volume} m³`}
          />

          <ResultCard
            variant="primary"
            icon={<BarChart size={20} />}
            label="Harvested Water"
            value={`${result.liters} liters`}
          />
        </div>
      )}

      {/* ================= SEO BLOG CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          How to Calculate Rainwater Harvesting Potential
        </h2>

        <p>
          Rainwater harvesting calculation helps estimate the amount of
          rainwater that can be collected from rooftops. This helps in planning
          water storage systems and reducing dependency on groundwater.
        </p>

        <h3 className="font-semibold">Rainwater Harvesting Formula</h3>

        <p
          className="font-mono text-xs p-3 rounded"
          style={{ backgroundColor: "var(--surface-2)" }}>
          Harvested Water (m³) = Roof Area × Rainfall × Runoff Coefficient
          Harvested Water (liters) = Volume × 1000
        </p>

        <ul className="list-disc pl-5">
          <li>Runoff coefficient varies by roof type</li>
          <li>Concrete roof: 0.7 – 0.9</li>
          <li>Metal sheet roof: 0.8 – 0.95</li>
          <li>Tiled roof: 0.6 – 0.8</li>
        </ul>

        <h3 className="font-semibold">
          Why Use a Rainwater Harvesting Calculator?
        </h3>

        <ul className="list-disc pl-5">
          <li>Estimate yearly water savings</li>
          <li>Plan tank and recharge pit size</li>
          <li>Reduce water bills</li>
          <li>Promotes sustainable water usage</li>
        </ul>

        <p>
          This rainwater harvesting calculator gives a quick and reliable
          estimate for residential, commercial, and institutional buildings.
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ This calculator provides an estimate only. Actual harvested rainwater
        may vary based on rainfall pattern and system efficiency.
      </aside>
    </section>
  );
}
