"use client";

import { useState } from "react";
import { Calculator, BarChart } from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { PercentageInput } from "../../inputs/PercentageInput";
import { ResultCard } from "../../ResultCard";

export default function RCCSlabCalculator() {
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [thickness, setThickness] = useState("");
  const [steelPercent, setSteelPercent] = useState("1");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    if (!length || Number(length) <= 0) {
      setError("Please enter valid slab length.");
      return false;
    }
    if (!width || Number(width) <= 0) {
      setError("Please enter valid slab width.");
      return false;
    }
    if (!thickness || Number(thickness) <= 0) {
      setError("Please enter valid slab thickness.");
      return false;
    }
    if (Number(steelPercent) <= 0) {
      setError("Steel percentage must be greater than 0.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- CALCULATION ---------------- */
  function calculateRCCSlab(e) {
    e.preventDefault();
    if (!validate()) return;

    const l = Number(length);
    const w = Number(width);
    const t = Number(thickness) / 1000; // mm → meter
    const steelPct = Number(steelPercent);

    // Concrete volume
    const concreteVolume = l * w * t;
    const dryVolume = concreteVolume * 1.54;

    // M20 mix assumed → 1 : 1.5 : 3
    const totalParts = 5.5;

    const cementVolume = (1 / totalParts) * dryVolume;
    const sandVolume = (1.5 / totalParts) * dryVolume;
    const aggregateVolume = (3 / totalParts) * dryVolume;

    const cementBags = cementVolume / 0.035;
    const sandBrass = sandVolume / 2.83;
    const aggregateBrass = aggregateVolume / 2.83;

    // Steel weight (approx % of concrete volume)
    const steelWeight =
      concreteVolume * 7850 * (steelPct / 100);

    setResult({
      concrete: concreteVolume.toFixed(3),
      cement: Math.ceil(cementBags),
      sand: sandBrass.toFixed(2),
      aggregate: aggregateBrass.toFixed(2),
      steel: steelWeight.toFixed(0),
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
          RCC Slab Calculator
        </h1>
        <p className="text-sm leading-relaxed">
          Use this RCC Slab Calculator to estimate concrete volume,
          cement, sand, aggregate, and steel required for slab
          construction.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateRCCSlab} className="space-y-4">
        <AmountInput
          label="Slab Length (meters)"
          value={length}
          onChange={setLength}
          placeholder="5"
        />

        <AmountInput
          label="Slab Width (meters)"
          value={width}
          onChange={setWidth}
          placeholder="4"
        />

        <AmountInput
          label="Slab Thickness (mm)"
          value={thickness}
          onChange={setThickness}
          placeholder="125"
        />

        <PercentageInput
          label="Steel Percentage (%)"
          value={steelPercent}
          onChange={setSteelPercent}
          placeholder="1"
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
          Calculate RCC Slab
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

          <ResultCard
            variant="primary"
            icon={<BarChart size={20} />}
            label="Steel Required"
            value={`${result.steel} kg`}
          />
        </div>
      )}

      {/* ================= SEO BLOG CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          How to Calculate RCC Slab Quantity
        </h2>

        <p>
          RCC slab calculation is essential for estimating material
          requirements before slab casting. It includes concrete,
          cement, sand, aggregate, and steel reinforcement.
        </p>

        <h3 className="font-semibold">
          RCC Slab Calculation Formula
        </h3>

        <p
          className="font-mono text-xs p-3 rounded"
          style={{ backgroundColor: "var(--surface-2)" }}
        >
          Concrete Volume = Length × Width × Thickness  
          Dry Volume = Concrete Volume × 1.54  
          Cement / Sand / Aggregate = Ratio ÷ Total Ratio × Dry Volume  
          Steel Weight ≈ Concrete Volume × 7850 × Steel %
        </p>

        <ul className="list-disc pl-5">
          <li>Common slab thickness: 100–150 mm</li>
          <li>Steel percentage usually ranges from 0.8% to 1.5%</li>
          <li>M20 concrete mix is commonly used for slabs</li>
        </ul>

        <p>
          This RCC slab calculator provides a quick and reliable
          estimate for residential and commercial slab construction.
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ This calculator provides an estimate only. Actual quantities
        may vary based on structural design and site conditions.
      </aside>
    </section>
  );
}
