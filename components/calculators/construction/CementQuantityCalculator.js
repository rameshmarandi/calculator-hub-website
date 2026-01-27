"use client";

import { useState } from "react";
import {
  Calculator,
  BarChart,
  IndianRupee,
} from "lucide-react";



import { AmountInput } from "../../inputs/AmountInput";
import { PercentageInput } from "../../inputs/PercentageInput";
import { ResultCard } from "../../ResultCard";

export default function CementQuantityCalculator() {
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
    setError("");
    return true;
  }

  /* ---------------- CALCULATION ---------------- */
  function calculateCement(e) {
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
    const cementVolume = (cementPart / totalParts) * dryVolume;

    const cementBags = cementVolume / 0.035;

    setResult({
      volume: wetVolume.toFixed(3),
      cementBags: Math.ceil(cementBags),
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
          Cement Quantity Calculator
        </h1>
        <p className="text-sm leading-relaxed">
          Use this Cement Quantity Calculator to estimate the number of
          cement bags required for slab, plaster, or flooring work.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateCement} className="space-y-4">
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
          label="Cement : Sand Mix Ratio"
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
          Calculate Cement Quantity
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <div className="grid md:grid-cols-2 gap-4" aria-live="polite">
          <ResultCard
            variant="neutral"
            icon={<BarChart size={20} />}
            label="Concrete Volume"
            value={`${result.volume} m³`}
          />

          <ResultCard
            variant="primary"
            icon={<IndianRupee size={20} />}
            label="Cement Bags Required"
            value={`${result.cementBags} bags`}
          />
        </div>
      )}

      {/* ================= SEO BLOG CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          How to Calculate Cement Quantity
        </h2>

        <p>
          Cement quantity calculation is essential for construction
          work such as slab casting, plastering, and flooring. It
          helps estimate material cost and prevents wastage.
        </p>

        <h3 className="font-semibold">
          Cement Quantity Formula
        </h3>

        <p
          className="font-mono text-xs p-3 rounded"
          style={{ backgroundColor: "var(--surface-2)" }}
        >
          Wet Volume = Length × Width × Thickness  
          Dry Volume = Wet Volume × 1.54  
          Cement Volume = (Cement Ratio ÷ Total Ratio) × Dry Volume  
          Cement Bags = Cement Volume ÷ 0.035
        </p>

        <ul className="list-disc pl-5">
          <li>1 cement bag = 50 kg = 0.035 m³</li>
          <li>Dry volume factor = 1.54</li>
          <li>Common mix ratios: 1:3, 1:4, 1:5</li>
        </ul>

        <h3 className="font-semibold">
          Why Use a Cement Quantity Calculator?
        </h3>

        <ul className="list-disc pl-5">
          <li>Accurate estimation of cement bags</li>
          <li>Reduces construction material waste</li>
          <li>Helps plan project budget</li>
          <li>Useful for contractors & homeowners</li>
        </ul>

        <p>
          This cement quantity calculator provides a quick and
          reliable estimate for construction projects.
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ This calculator provides an estimate only. Actual cement
        requirement may vary based on site conditions and workmanship.
      </aside>
    </section>
  );
}
