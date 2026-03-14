"use client";

import { useState } from "react";
import { Calculator, BarChart } from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { PercentageInput } from "../../inputs/PercentageInput";
import { ResultCard } from "../../ResultCard";
import RainwaterHarvestingCalculatorArticle from "../../content/construction/RainwaterHarvestingCalculatorArticle";

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

    const formatter = new Intl.NumberFormat("en-IN");

    setResult({
      volume: formatter.format(volumeM3.toFixed(2)),
      liters: formatter.format(Math.round(liters)),
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
          Rainwater Harvesting Calculator
        </h1>
        <p className="text-sm leading-relaxed">
          Use this Rainwater Harvesting Calculator to estimate how much
          rainwater you can collect from your rooftop annually.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateRainwater} className="space-y-4">
        <AmountInput
          label="Roof Area (square meters)"
          value={roofArea}
          onChange={setRoofArea}
          placeholder="100"
          prefix=""
        />

        <AmountInput
          label="Annual Rainfall (mm)"
          value={rainfall}
          onChange={setRainfall}
          placeholder="800"
          prefix=""
        />

        <AmountInput
          label="Runoff Coefficient (0 - 1)"
          value={runoffCoefficient}
          onChange={setRunoffCoefficient}
          placeholder="0.8"
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
      <RainwaterHarvestingCalculatorArticle />
    </section>
  );
}
