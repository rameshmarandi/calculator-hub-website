"use client";

import { useState } from "react";
import { Calculator, BarChart } from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { PercentageInput } from "../../inputs/PercentageInput";
import { ResultCard } from "../../ResultCard";

export default function SandQuantityCalculator() {
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [thickness, setThickness] = useState("");
  const [mixRatio, setMixRatio] = useState("1:4");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    if (!length || Number(length) <= 0) {
      setError("Please enter valid length.");
      return false;
    }

    if (!width || Number(width) <= 0) {
      setError("Please enter valid width.");
      return false;
    }

    if (!thickness || Number(thickness) <= 0) {
      setError("Please enter valid thickness.");
      return false;
    }

    if (!mixRatio.includes(":")) {
      setError("Please enter a valid mix ratio (e.g. 1:4).");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- CALCULATION ---------------- */
  function calculateSand(e) {
    e.preventDefault();
    if (!validate()) return;

    const l = Number(length);
    const w = Number(width);
    const t = Number(thickness) / 1000; // mm → meter

    const wetVolume = l * w * t;
    const dryVolume = wetVolume * 1.54;

    const [cementPart, sandPart] = mixRatio
      .split(":")
      .map(Number);

    const totalParts = cementPart + sandPart;

    const sandVolume =
      (sandPart / totalParts) * dryVolume;

    const sandBrass = sandVolume / 2.83;

    setResult({
      volume: sandVolume.toFixed(3),
      brass: sandBrass.toFixed(2),
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
          Sand Quantity Calculator
        </h1>
        <p className="text-sm leading-relaxed">
          Use this Sand Quantity Calculator to estimate the amount of
          sand required for slab, plastering, or flooring work.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateSand} className="space-y-4">
        <AmountInput
          label="Length (meters)"
          value={length}
          onChange={setLength}
          placeholder="5"
        />

        <AmountInput
          label="Width (meters)"
          value={width}
          onChange={setWidth}
          placeholder="4"
        />

        <AmountInput
          label="Thickness (mm)"
          value={thickness}
          onChange={setThickness}
          placeholder="100"
        />

        <PercentageInput
          label="Cement : Sand Ratio"
          value={mixRatio}
          onChange={setMixRatio}
          placeholder="1:4"
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
          Calculate Sand Quantity
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <div className="grid md:grid-cols-2 gap-4" aria-live="polite">
          <ResultCard
            variant="neutral"
            icon={<BarChart size={20} />}
            label="Sand Volume"
            value={`${result.volume} m³`}
          />

          <ResultCard
            variant="primary"
            icon={<BarChart size={20} />}
            label="Sand Required (Brass)"
            value={`${result.brass} brass`}
          />
        </div>
      )}

      {/* ================= SEO BLOG CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          How to Calculate Sand Quantity
        </h2>

        <p>
          Sand quantity calculation is an essential step in
          construction work such as concrete mixing, plastering, and
          masonry. Accurate estimation helps avoid shortages and
          material wastage.
        </p>

        <h3 className="font-semibold">
          Sand Quantity Formula
        </h3>

        <p
          className="font-mono text-xs p-3 rounded"
          style={{ backgroundColor: "var(--surface-2)" }}
        >
          Wet Volume = Length × Width × Thickness  
          Dry Volume = Wet Volume × 1.54  
          Sand Volume = (Sand Ratio ÷ Total Ratio) × Dry Volume  
          Sand (Brass) = Sand Volume ÷ 2.83
        </p>

        <ul className="list-disc pl-5">
          <li>1 brass = 2.83 cubic meters</li>
          <li>Dry volume factor = 1.54</li>
          <li>Common mix ratios: 1:3, 1:4, 1:5</li>
        </ul>

        <h3 className="font-semibold">
          Why Use a Sand Quantity Calculator?
        </h3>

        <ul className="list-disc pl-5">
          <li>Ensures accurate sand estimation</li>
          <li>Helps control construction costs</li>
          <li>Reduces material wastage</li>
          <li>Useful for contractors & homeowners</li>
        </ul>

        <p>
          This sand quantity calculator gives a quick and reliable
          estimate for most residential and commercial construction
          projects.
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ This calculator provides an estimate only. Actual sand
        requirement may vary based on workmanship and site conditions.
      </aside>
    </section>
  );
}
