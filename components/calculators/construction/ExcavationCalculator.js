"use client";

import { useState } from "react";
import { Calculator, BarChart } from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { PercentageInput } from "../../inputs/PercentageInput";
import { ResultCard } from "../../ResultCard";

export default function ExcavationCalculator() {
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [depth, setDepth] = useState("");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    if (!length || Number(length) <= 0) {
      setError("Please enter valid excavation length.");
      return false;
    }

    if (!width || Number(width) <= 0) {
      setError("Please enter valid excavation width.");
      return false;
    }

    if (!depth || Number(depth) <= 0) {
      setError("Please enter valid excavation depth.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- CALCULATION ---------------- */
  function calculateExcavation(e) {
    e.preventDefault();
    if (!validate()) return;

    const l = Number(length);
    const w = Number(width);
    const d = Number(depth);

    // Volume in cubic meters
    const volume = l * w * d;

    // Conversions
    const volumeCFT = volume * 35.3147;

    setResult({
      volume: volume.toFixed(3),
      cft: volumeCFT.toFixed(2),
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
        <h1 className="text-2xl font-bold mb-1">Excavation Calculator</h1>
        <p className="text-sm leading-relaxed">
          Use this Excavation Calculator to calculate the quantity of earthwork
          required for foundation, footing, or trench excavation.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateExcavation} className="space-y-4">
        <PercentageInput
          label="Excavation Length (meters)"
          value={length}
          onChange={setLength}
          placeholder="5"
        />

        <PercentageInput
          label="Excavation Width (meters)"
          value={width}
          onChange={setWidth}
          placeholder="3"
        />

        <PercentageInput
          label="Excavation Depth (meters)"
          value={depth}
          onChange={setDepth}
          placeholder="1.5"
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
          Calculate Excavation
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <div className="grid md:grid-cols-2 gap-4" aria-live="polite">
          <ResultCard
            variant="neutral"
            icon={<BarChart size={20} />}
            label="Excavation Volume"
            value={`${result.volume} m³`}
          />

          <ResultCard
            variant="primary"
            icon={<BarChart size={20} />}
            label="Excavation Volume"
            value={`${result.cft} CFT`}
          />
        </div>
      )}

      {/* ================= SEO BLOG CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          How to Calculate Excavation Quantity
        </h2>

        <p>
          Excavation calculation is required to estimate the quantity of soil to
          be removed for foundations, footings, basements, and trenches.
          Accurate excavation estimation helps control construction cost and
          planning.
        </p>

        <h3 className="font-semibold">Excavation Calculation Formula</h3>

        <p
          className="font-mono text-xs p-3 rounded"
          style={{ backgroundColor: "var(--surface-2)" }}>
          Excavation Volume (m³) = Length × Width × Depth Excavation Volume
          (CFT) = Volume × 35.3147
        </p>

        <ul className="list-disc pl-5">
          <li>1 cubic meter = 35.3147 cubic feet</li>
          <li>Used for foundation & trench excavation</li>
          <li>Helps estimate earthwork cost</li>
        </ul>

        <h3 className="font-semibold">Why Use an Excavation Calculator?</h3>

        <ul className="list-disc pl-5">
          <li>Accurate earthwork estimation</li>
          <li>Plan excavation machinery & labor</li>
          <li>Prevents over-excavation</li>
          <li>Useful for contractors & engineers</li>
        </ul>

        <p>
          This excavation calculator provides a quick and reliable estimate for
          residential and commercial construction projects.
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ This calculator provides an estimate only. Actual excavation quantity
        may vary based on soil condition and site layout.
      </aside>
    </section>
  );
}
