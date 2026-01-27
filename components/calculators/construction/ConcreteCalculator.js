"use client";

import { useState } from "react";
import { Calculator, BarChart } from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { PercentageInput } from "../../inputs/PercentageInput";
import { ResultCard } from "../../ResultCard";

export default function ConcreteCalculator() {
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
      setError("Please enter a valid mix ratio (e.g. 1:1.5:3).");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- CALCULATION ---------------- */
  function calculateConcrete(e) {
    e.preventDefault();
    if (!validate()) return;

    const l = Number(length);
    const w = Number(width);
    const t = Number(thickness) / 1000; // mm → meter

    const wetVolume = l * w * t;
    const dryVolume = wetVolume * 1.54;

    const parts = mixRatio.split(":").map(Number);
    const cementPart = parts[0];
    const sandPart = parts[1];
    const aggregatePart = parts[2];

    const totalParts = parts.reduce((sum, v) => sum + v, 0);

    const cementVolume = (cementPart / totalParts) * dryVolume;
    const sandVolume = (sandPart / totalParts) * dryVolume;
    const aggregateVolume = (aggregatePart / totalParts) * dryVolume;

    const cementBags = cementVolume / 0.035;
    const sandBrass = sandVolume / 2.83;
    const aggregateBrass = aggregateVolume / 2.83;

    setResult({
      concreteVolume: wetVolume.toFixed(3),
      cementBags: Math.ceil(cementBags),
      sandBrass: sandBrass.toFixed(2),
      aggregateBrass: aggregateBrass.toFixed(2),
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
          Concrete Calculator
        </h1>
        <p className="text-sm leading-relaxed">
          Use this Concrete Calculator to estimate concrete volume and
          material requirements for slab, beam, column, and footing work.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateConcrete} className="space-y-4">
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
          Calculate Concrete
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <div className="grid md:grid-cols-2 gap-4" aria-live="polite">
          <ResultCard
            variant="neutral"
            icon={<BarChart size={20} />}
            label="Concrete Volume"
            value={`${result.concreteVolume} m³`}
          />

          <ResultCard
            variant="primary"
            icon={<BarChart size={20} />}
            label="Cement Required"
            value={`${result.cementBags} bags`}
          />

          <ResultCard
            variant="neutral"
            icon={<BarChart size={20} />}
            label="Sand Required"
            value={`${result.sandBrass} brass`}
          />

          <ResultCard
            variant="primary"
            icon={<BarChart size={20} />}
            label="Aggregate Required"
            value={`${result.aggregateBrass} brass`}
          />
        </div>
      )}

      {/* ================= SEO BLOG CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          How to Calculate Concrete Quantity
        </h2>

        <p>
          Concrete quantity calculation is essential for construction
          projects such as slabs, beams, columns, and footings. It helps
          estimate material requirements accurately and control costs.
        </p>

        <h3 className="font-semibold">
          Concrete Calculation Formula
        </h3>

        <p
          className="font-mono text-xs p-3 rounded"
          style={{ backgroundColor: "var(--surface-2)" }}
        >
          Wet Volume = Length × Width × Thickness  
          Dry Volume = Wet Volume × 1.54  
          Cement / Sand / Aggregate = Ratio ÷ Total Ratio × Dry Volume
        </p>

        <ul className="list-disc pl-5">
          <li>1 cement bag = 50 kg = 0.035 m³</li>
          <li>1 brass = 2.83 cubic meters</li>
          <li>Dry volume factor = 1.54</li>
          <li>Common mix ratios: 1:1.5:3, 1:2:4</li>
        </ul>

        <p>
          This concrete calculator gives a quick and reliable estimate
          for most residential and commercial construction works.
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ This calculator provides an estimate only. Actual material
        quantity may vary based on workmanship, compaction, and site
        conditions.
      </aside>
    </section>
  );
}
