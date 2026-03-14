"use client";

import { useState } from "react";
import { Calculator, BarChart } from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { ResultCard } from "../../ResultCard";
import FlooringCostCalculatorArticle from "../../content/construction/FlooringCostCalculatorArticle";

export default function FlooringCostCalculator() {
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [tileCost, setTileCost] = useState("");
  const [laborCost, setLaborCost] = useState("50");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    const l = Number(length);
    const w = Number(width);
    const m = Number(tileCost);
    const labor = Number(laborCost);

    if (!l || l <= 0 || l > 100) {
      setError("Floor length must be between 1 and 100 meters.");
      return false;
    }

    if (!w || w <= 0 || w > 100) {
      setError("Floor width must be between 1 and 100 meters.");
      return false;
    }

    if (!m || m <= 0) {
      setError("Enter a valid flooring cost per sq.ft.");
      return false;
    }

    if (labor < 0) {
      setError("Labor cost cannot be negative.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- CALCULATION ---------------- *//* ---------------- CALCULATION ---------------- */
function calculateFlooringCost(e) {
  e.preventDefault();

  if (!validate()) return;

  const l = Number(length);
  const w = Number(width);
  const materialRate = Number(tileCost);
  const laborRate = Number(laborCost);

  const SQM_TO_SQFT = 10.7639;

  const areaSqM = l * w;
  const areaSqFt = areaSqM * SQM_TO_SQFT;

  const materialCost = areaSqFt * materialRate;
  const laborTotal = areaSqFt * laborRate;
  const totalCost = materialCost + laborTotal;

  const formatter = new Intl.NumberFormat("en-IN");

  setResult({
    area: formatter.format(areaSqFt.toFixed(2)),
    material: formatter.format(materialCost.toFixed(0)),
    labor: formatter.format(laborTotal.toFixed(0)),
    total: formatter.format(totalCost.toFixed(0)),
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
          Flooring Cost Calculator
        </h1>

        <p className="text-sm leading-relaxed">
          Estimate the total flooring cost including material and labor
          charges for your home, office, or renovation project.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateFlooringCost} className="space-y-4">
        <AmountInput
          label="Floor Length (meters)"
          value={length}
          onChange={setLength}
          placeholder="5"
          prefix=""
        />

        <AmountInput
          label="Floor Width (meters)"
          value={width}
          onChange={setWidth}
          placeholder="4"
               prefix=""
        />

        <AmountInput
          label="Flooring Cost (₹ per sq.ft)"
          value={tileCost}
          onChange={setTileCost}
          placeholder="120"
        />

        <AmountInput
          label="Labor Cost (₹ per sq.ft)"
          value={laborCost}
          onChange={setLaborCost}
          placeholder="50"
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

      {/* ================= SEO ARTICLE ================= */}
      <FlooringCostCalculatorArticle />
    </section>
  );
}