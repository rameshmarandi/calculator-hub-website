"use client";

import { useState } from "react";
import { Calculator, BarChart } from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { PercentageInput } from "../../inputs/PercentageInput";
import { ResultCard } from "../../ResultCard";
import RCCSlabCalculatorArticle from "../../content/construction/RCCSlabCalculatorArticle";

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

    if (!thickness || Number(thickness) < 50) {
      setError("Slab thickness should be at least 50 mm.");
      return false;
    }

    if (!steelPercent || Number(steelPercent) <= 0) {
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
    const t = Number(thickness) / 1000; // mm → meters
    const steelPct = Number(steelPercent);

    /* Concrete Volume */

    const concreteVolume = l * w * t;

    /* Dry Volume Adjustment */

    const dryVolume = concreteVolume * 1.54;

    /* M20 Concrete Mix Ratio → 1 : 1.5 : 3 */

    const totalParts = 5.5;

    const cementVolume = (1 / totalParts) * dryVolume;
    const sandVolume = (1.5 / totalParts) * dryVolume;
    const aggregateVolume = (3 / totalParts) * dryVolume;

    /* Cement Bags */

    const cementBags = cementVolume / 0.035;

    /* Convert Sand / Aggregate to Brass */

    const sandBrass = sandVolume / 2.83;
    const aggregateBrass = aggregateVolume / 2.83;

    /* Steel Estimate */

    const steelWeight = concreteVolume * steelPct * 10;

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
          cement bags, sand, aggregate, and steel required for slab construction.
        </p>
      </header>

      {/* ================= FORM ================= */}

      <form onSubmit={calculateRCCSlab} className="space-y-4">

        <AmountInput
          label="Slab Length (meters)"
          value={length}
          onChange={(v) => {
            setLength(v);
            setError("");
          }}
          placeholder="5"
          prefix=""
        />

        <AmountInput
          label="Slab Width (meters)"
          value={width}
          onChange={(v) => {
            setWidth(v);
            setError("");
          }}
          placeholder="4"
          prefix=""
        />

        <AmountInput
          label="Slab Thickness (mm)"
          value={thickness}
          onChange={(v) => {
            setThickness(v);
            setError("");
          }}
          placeholder="125"
          prefix=""
        />

        <PercentageInput
          label="Steel Percentage (%)"
          value={steelPercent}
          onChange={(v) => {
            setSteelPercent(v);
            setError("");
          }}
          placeholder="1"
          prefix=""
        />

        {error && (
          <p className="text-sm text-red-500">
            {error}
          </p>
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
        <div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
          aria-live="polite"
        >

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

      {/* ================= ARTICLE ================= */}

      <RCCSlabCalculatorArticle />

    </section>
  );
}