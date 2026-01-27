"use client";

import { useState } from "react";
import { Calculator, BarChart } from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { PercentageInput } from "../../inputs/PercentageInput";
import { ResultCard } from "../../ResultCard";

export default function AggregateQuantityCalculator() {
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [thickness, setThickness] = useState("");
  const [mixRatio, setMixRatio] = useState("1:1.5:3");

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
      setError(
        "Please enter a valid mix ratio (e.g. 1:1.5:3)."
      );
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- CALCULATION ---------------- */
  function calculateAggregate(e) {
    e.preventDefault();
    if (!validate()) return;

    const l = Number(length);
    const w = Number(width);
    const t = Number(thickness) / 1000; // mm → meter

    const wetVolume = l * w * t;
    const dryVolume = wetVolume * 1.54;

    const parts = mixRatio.split(":").map(Number);
    const cementPart = parts[0];
    const aggregatePart = parts[2]; // Cement : Sand : Aggregate

    const totalParts = parts.reduce(
      (sum, val) => sum + val,
      0
    );

    const aggregateVolume =
      (aggregatePart / totalParts) * dryVolume;

    const aggregateBrass = aggregateVolume / 2.83;

    setResult({
      volume: aggregateVolume.toFixed(3),
      brass: aggregateBrass.toFixed(2),
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
          Aggregate Quantity Calculator
        </h1>
        <p className="text-sm leading-relaxed">
          Use this Aggregate Quantity Calculator to estimate the amount
          of coarse aggregate required for concrete works like slab,
          beam, and column.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateAggregate} className="space-y-4">
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
          label="Concrete Mix Ratio (Cement : Sand : Aggregate)"
          value={mixRatio}
          onChange={setMixRatio}
          placeholder="1:1.5:3"
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
          Calculate Aggregate Quantity
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <div className="grid md:grid-cols-2 gap-4" aria-live="polite">
          <ResultCard
            variant="neutral"
            icon={<BarChart size={20} />}
            label="Aggregate Volume"
            value={`${result.volume} m³`}
          />

          <ResultCard
            variant="primary"
            icon={<BarChart size={20} />}
            label="Aggregate Required (Brass)"
            value={`${result.brass} brass`}
          />
        </div>
      )}

      {/* ================= SEO BLOG CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          How to Calculate Aggregate Quantity
        </h2>

        <p>
          Aggregate is a major component of concrete and plays a vital
          role in strength and durability. Accurate aggregate quantity
          calculation is essential for concrete slabs, beams, columns,
          and footings.
        </p>

        <h3 className="font-semibold">
          Aggregate Quantity Formula
        </h3>

        <p
          className="font-mono text-xs p-3 rounded"
          style={{ backgroundColor: "var(--surface-2)" }}
        >
          Wet Volume = Length × Width × Thickness  
          Dry Volume = Wet Volume × 1.54  
          Aggregate Volume = (Aggregate Ratio ÷ Total Ratio) × Dry Volume  
          Aggregate (Brass) = Aggregate Volume ÷ 2.83
        </p>

        <ul className="list-disc pl-5">
          <li>1 brass = 2.83 cubic meters</li>
          <li>Dry volume factor = 1.54</li>
          <li>Common concrete ratios: 1:1.5:3, 1:2:4</li>
        </ul>

        <h3 className="font-semibold">
          Why Use an Aggregate Quantity Calculator?
        </h3>

        <ul className="list-disc pl-5">
          <li>Ensures accurate aggregate estimation</li>
          <li>Prevents material shortage</li>
          <li>Controls construction cost</li>
          <li>Essential for structural concrete work</li>
        </ul>

        <p>
          This aggregate quantity calculator provides a quick and
          reliable estimate for most construction projects.
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ This calculator provides an estimate only. Actual aggregate
        requirement may vary based on site conditions and compaction.
      </aside>
    </section>
  );
}
