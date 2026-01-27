"use client";

import { useState } from "react";
import { Calculator, BarChart } from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { PercentageInput } from "../../inputs/PercentageInput";
import { ResultCard } from "../../ResultCard";

export default function FlooringCostCalculator() {
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [tileCost, setTileCost] = useState("");
  const [laborCost, setLaborCost] = useState("50");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    if (!length || Number(length) <= 0) {
      setError("Please enter valid floor length.");
      return false;
    }

    if (!width || Number(width) <= 0) {
      setError("Please enter valid floor width.");
      return false;
    }

    if (!tileCost || Number(tileCost) <= 0) {
      setError("Please enter valid flooring cost per sq.ft.");
      return false;
    }

    if (Number(laborCost) < 0) {
      setError("Labor cost cannot be negative.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- CALCULATION ---------------- */
  function calculateFlooringCost(e) {
    e.preventDefault();
    if (!validate()) return;

    const l = Number(length);
    const w = Number(width);
    const materialRate = Number(tileCost);
    const laborRate = Number(laborCost);

    const areaSqM = l * w;
    const areaSqFt = areaSqM * 10.764;

    const materialCost = areaSqFt * materialRate;
    const laborTotal = areaSqFt * laborRate;
    const totalCost = materialCost + laborTotal;

    setResult({
      area: areaSqFt.toFixed(2),
      material: materialCost.toFixed(0),
      labor: laborTotal.toFixed(0),
      total: totalCost.toFixed(0),
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
        <h1 className="text-2xl font-bold mb-1">Flooring Cost Calculator</h1>
        <p className="text-sm leading-relaxed">
          Use this Flooring Cost Calculator to estimate total flooring cost
          including material and labor for your home or office.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateFlooringCost} className="space-y-4">
        <AmountInput
          label="Floor Length (meters)"
          value={length}
          onChange={setLength}
          placeholder="5"
        />

        <AmountInput
          label="Floor Width (meters)"
          value={width}
          onChange={setWidth}
          placeholder="4"
        />

        <AmountInput
          label="Flooring Cost (₹ per sq.ft)"
          value={tileCost}
          onChange={setTileCost}
          placeholder="120"
        />

        <PercentageInput
          label="Labor Cost (₹ per sq.ft)"
          value={laborCost}
          onChange={setLaborCost}
          placeholder="50"
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
          Calculate Flooring Cost
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <div className="grid md:grid-cols-2 gap-4" aria-live="polite">
          <ResultCard
            variant="neutral"
            icon={<BarChart size={20} />}
            label="Floor Area"
            value={`${result.area} sq.ft`}
          />

          <ResultCard
            variant="neutral"
            icon={<BarChart size={20} />}
            label="Material Cost"
            value={`₹ ${result.material}`}
          />

          <ResultCard
            variant="neutral"
            icon={<BarChart size={20} />}
            label="Labor Cost"
            value={`₹ ${result.labor}`}
          />

          <ResultCard
            variant="primary"
            icon={<BarChart size={20} />}
            label="Total Flooring Cost"
            value={`₹ ${result.total}`}
          />
        </div>
      )}

      {/* ================= SEO BLOG CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          How to Calculate Flooring Cost
        </h2>

        <p>
          Flooring cost calculation helps homeowners and builders estimate the
          total expense involved in installing tiles, marble, granite, or wooden
          flooring. It includes material cost and labor charges.
        </p>

        <h3 className="font-semibold">Flooring Cost Formula</h3>

        <p
          className="font-mono text-xs p-3 rounded"
          style={{ backgroundColor: "var(--surface-2)" }}>
          Floor Area (sq.ft) = Length × Width × 10.764 Material Cost = Area ×
          Rate per sq.ft Labor Cost = Area × Labor Rate Total Cost = Material
          Cost + Labor Cost
        </p>

        <ul className="list-disc pl-5">
          <li>Tile cost varies by material and brand</li>
          <li>Labor charges depend on city and tile type</li>
          <li>Extra cost may apply for patterns or skirting</li>
        </ul>

        <h3 className="font-semibold">Why Use a Flooring Cost Calculator?</h3>

        <ul className="list-disc pl-5">
          <li>Accurate flooring budget planning</li>
          <li>Easy comparison between materials</li>
          <li>Prevents cost overruns</li>
          <li>Useful for homes & commercial spaces</li>
        </ul>

        <p>
          This flooring cost calculator provides a quick and reliable estimate
          for most residential and commercial flooring works.
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ This calculator provides an estimate only. Actual flooring cost may
        vary based on material brand, design, and site conditions.
      </aside>
    </section>
  );
}
