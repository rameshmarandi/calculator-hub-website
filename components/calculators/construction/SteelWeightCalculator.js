"use client";

import { useState } from "react";
import { Calculator, BarChart } from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { PercentageInput } from "../../inputs/PercentageInput";
import { ResultCard } from "../../ResultCard";

export default function SteelWeightCalculator() {
  const [diameter, setDiameter] = useState("");
  const [length, setLength] = useState("");
  const [quantity, setQuantity] = useState("1");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    if (!diameter || Number(diameter) <= 0) {
      setError("Please enter valid bar diameter.");
      return false;
    }

    if (!length || Number(length) <= 0) {
      setError("Please enter valid bar length.");
      return false;
    }

    if (!quantity || Number(quantity) <= 0) {
      setError("Quantity must be at least 1.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- CALCULATION ---------------- */
  function calculateSteelWeight(e) {
    e.preventDefault();
    if (!validate()) return;

    const d = Number(diameter);
    const l = Number(length);
    const q = Number(quantity);

    // Standard steel weight formula
    // Weight (kg) = (D² / 162) × Length
    const weightPerBar = (d * d / 162) * l;
    const totalWeight = weightPerBar * q;

    setResult({
      perBar: weightPerBar.toFixed(2),
      total: totalWeight.toFixed(2),
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
          Steel Weight Calculator
        </h1>
        <p className="text-sm leading-relaxed">
          Use this Steel Weight Calculator to calculate the weight of
          steel bars based on diameter, length, and quantity.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form
        onSubmit={calculateSteelWeight}
        className="space-y-4"
      >
        <AmountInput
          label="Bar Diameter (mm)"
          value={diameter}
          onChange={setDiameter}
          placeholder="12"
        />

        <AmountInput
          label="Bar Length (meters)"
          value={length}
          onChange={setLength}
          placeholder="6"
        />

        <PercentageInput
          label="Number of Bars"
          value={quantity}
          onChange={setQuantity}
          placeholder="10"
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
          Calculate Steel Weight
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <div className="grid md:grid-cols-2 gap-4" aria-live="polite">
          <ResultCard
            variant="neutral"
            icon={<BarChart size={20} />}
            label="Weight per Bar"
            value={`${result.perBar} kg`}
          />

          <ResultCard
            variant="primary"
            icon={<BarChart size={20} />}
            label="Total Steel Weight"
            value={`${result.total} kg`}
          />
        </div>
      )}

      {/* ================= SEO BLOG CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          How to Calculate Steel Weight
        </h2>

        <p>
          Steel weight calculation is essential in construction to
          estimate material quantity, control cost, and ensure
          structural safety. It is commonly used for RCC slabs, beams,
          columns, and footings.
        </p>

        <h3 className="font-semibold">
          Steel Weight Formula
        </h3>

        <p
          className="font-mono text-xs p-3 rounded"
          style={{ backgroundColor: "var(--surface-2)" }}
        >
          Weight (kg) = (Diameter² ÷ 162) × Length  
          Total Weight = Weight per bar × Number of bars
        </p>

        <ul className="list-disc pl-5">
          <li>Diameter is in millimeters (mm)</li>
          <li>Length is in meters</li>
          <li>162 is a constant derived from steel density</li>
        </ul>

        <h3 className="font-semibold">
          Why Use a Steel Weight Calculator?
        </h3>

        <ul className="list-disc pl-5">
          <li>Accurate steel quantity estimation</li>
          <li>Helps prepare BOQ and costing</li>
          <li>Reduces material wastage</li>
          <li>Essential for civil engineers & contractors</li>
        </ul>

        <p>
          This steel weight calculator provides a quick and reliable
          estimate for most residential and commercial construction
          works.
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ This calculator provides an estimate only. Actual steel
        weight may vary slightly based on manufacturer tolerance.
      </aside>
    </section>
  );
}
