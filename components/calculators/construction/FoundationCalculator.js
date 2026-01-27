"use client";

import { useState } from "react";
import { Calculator, BarChart } from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { PercentageInput } from "../../inputs/PercentageInput";
import { ResultCard } from "../../ResultCard";

export default function FoundationCalculator() {
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [depth, setDepth] = useState("");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    if (!length || Number(length) <= 0) {
      setError("Please enter valid foundation length.");
      return false;
    }

    if (!width || Number(width) <= 0) {
      setError("Please enter valid foundation width.");
      return false;
    }

    if (!depth || Number(depth) <= 0) {
      setError("Please enter valid foundation depth.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- CALCULATION ---------------- */
  function calculateFoundation(e) {
    e.preventDefault();
    if (!validate()) return;

    const l = Number(length);
    const w = Number(width);
    const d = Number(depth);

    // Concrete volume
    const concreteVolume = l * w * d;
    const dryVolume = concreteVolume * 1.54;

    // PCC / RCC footing mix assumed → 1 : 3 : 6
    const totalParts = 10;

    const cementVolume = (1 / totalParts) * dryVolume;
    const sandVolume = (3 / totalParts) * dryVolume;
    const aggregateVolume = (6 / totalParts) * dryVolume;

    const cementBags = cementVolume / 0.035;
    const sandBrass = sandVolume / 2.83;
    const aggregateBrass = aggregateVolume / 2.83;

    setResult({
      concrete: concreteVolume.toFixed(3),
      cement: Math.ceil(cementBags),
      sand: sandBrass.toFixed(2),
      aggregate: aggregateBrass.toFixed(2),
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
          Foundation Calculator
        </h1>
        <p className="text-sm leading-relaxed">
          Use this Foundation Calculator to estimate concrete, cement,
          sand, and aggregate required for footing or foundation work.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateFoundation} className="space-y-4">
        <AmountInput
          label="Foundation Length (meters)"
          value={length}
          onChange={setLength}
          placeholder="1.5"
        />

        <AmountInput
          label="Foundation Width (meters)"
          value={width}
          onChange={setWidth}
          placeholder="1.5"
        />

        <AmountInput
          label="Foundation Depth (meters)"
          value={depth}
          onChange={setDepth}
          placeholder="0.45"
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
          Calculate Foundation Quantity
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <div className="grid md:grid-cols-2 gap-4" aria-live="polite">
          <ResultCard
            variant="neutral"
            icon={<BarChart size={20} />}
            label="Concrete Volume"
            value={`${result.concrete} m³`}
          />

          <ResultCard
            variant="primary"
            icon={<BarChart size={20} />}
            label="Cement Required"
            value={`${result.cement} bags`}
          />

          <ResultCard
            variant="neutral"
            icon={<BarChart size={20} />}
            label="Sand Required"
            value={`${result.sand} brass`}
          />

          <ResultCard
            variant="neutral"
            icon={<BarChart size={20} />}
            label="Aggregate Required"
            value={`${result.aggregate} brass`}
          />
        </div>
      )}

      {/* ================= SEO BLOG CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          How to Calculate Foundation Quantity
        </h2>

        <p>
          Foundation calculation is one of the most critical steps in
          building construction. It ensures proper load transfer from
          the structure to the soil and prevents settlement issues.
        </p>

        <h3 className="font-semibold">
          Foundation Calculation Formula
        </h3>

        <p
          className="font-mono text-xs p-3 rounded"
          style={{ backgroundColor: "var(--surface-2)" }}
        >
          Concrete Volume = Length × Width × Depth  
          Dry Volume = Concrete Volume × 1.54  
          Cement / Sand / Aggregate = Ratio ÷ Total Ratio × Dry Volume
        </p>

        <ul className="list-disc pl-5">
          <li>Common footing mix ratio: 1:3:6</li>
          <li>Dry volume factor = 1.54</li>
          <li>1 cement bag = 50 kg = 0.035 m³</li>
          <li>1 brass = 2.83 m³</li>
        </ul>

        <h3 className="font-semibold">
          Why Use a Foundation Calculator?
        </h3>

        <ul className="list-disc pl-5">
          <li>Accurate foundation material estimation</li>
          <li>Helps plan excavation & concreting work</li>
          <li>Reduces construction cost overruns</li>
          <li>Essential for safe structural planning</li>
        </ul>

        <p>
          This foundation calculator provides a quick and reliable
          estimate for residential and commercial building foundations.
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ This calculator provides an estimate only. Final foundation
        design should be done by a qualified structural engineer based
        on soil test reports.
      </aside>
    </section>
  );
}
