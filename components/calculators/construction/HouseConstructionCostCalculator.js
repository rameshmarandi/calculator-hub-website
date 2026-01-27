"use client";

import { useState } from "react";
import { Calculator, BarChart } from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { PercentageInput } from "../../inputs/PercentageInput";
import { ResultCard } from "../../ResultCard";

export default function HouseConstructionCostCalculator() {
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [costPerSqFt, setCostPerSqFt] = useState("1800");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    if (!length || Number(length) <= 0) {
      setError("Please enter valid plot length.");
      return false;
    }

    if (!width || Number(width) <= 0) {
      setError("Please enter valid plot width.");
      return false;
    }

    if (!costPerSqFt || Number(costPerSqFt) <= 0) {
      setError("Please enter valid construction cost per sq.ft.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- CALCULATION ---------------- */
  function calculateHouseCost(e) {
    e.preventDefault();
    if (!validate()) return;

    const l = Number(length);
    const w = Number(width);
    const rate = Number(costPerSqFt);

    const builtUpAreaSqFt = l * w;
    const totalCost = builtUpAreaSqFt * rate;

    setResult({
      area: builtUpAreaSqFt.toFixed(2),
      rate: rate.toFixed(0),
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
        <h1 className="text-2xl font-bold mb-1">
          House Construction Cost Calculator
        </h1>
        <p className="text-sm leading-relaxed">
          Use this House Construction Cost Calculator to estimate the total cost
          of building a house based on built-up area and construction rate per
          square foot.
        </p>
      </header>

      {/* ================= FORM ================= */}
      {/* <form onSubmit={calculateHouseCost} className="space-y-4">
        <AmountInput
          label="Plot Length (feet)"
          value={length}
          onChange={setLength}
          placeholder="30"
        />

        <AmountInput
          label="Plot Width (feet)"
          value={width}
          onChange={setWidth}
          placeholder="40"
        />

        <AmountInput
          label="Construction Cost (₹ per sq.ft)"
          value={costPerSqFt}
          onChange={setCostPerSqFt}
          placeholder="1800"
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
          Calculate House Construction Cost
        </button>
      </form> */}

      <form onSubmit={calculateHouseCost} className="space-y-4">
        <PercentageInput
          label="Plot Length (feet)"
          value={length}
          onChange={setLength}
          placeholder="30"
        />

        <PercentageInput
          label="Plot Width (feet)"
          value={width}
          onChange={setWidth}
          placeholder="40"
        />

        <AmountInput
          label="Construction Cost (₹ per sq.ft)"
          value={costPerSqFt}
          onChange={setCostPerSqFt}
          placeholder="1800"
        />

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          className="w-full py-2.5 rounded-md font-medium"
          style={{
            backgroundColor: "var(--primary)",
            color: "#fff",
          }}>
          Calculate House Construction Cost
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <div className="grid md:grid-cols-3 gap-4" aria-live="polite">
          <ResultCard
            variant="neutral"
            icon={<BarChart size={20} />}
            label="Built-Up Area"
            value={`${result.area} sq.ft`}
          />

          <ResultCard
            variant="neutral"
            icon={<BarChart size={20} />}
            label="Cost per Sq.Ft"
            value={`₹ ${result.rate}`}
          />

          <ResultCard
            variant="primary"
            icon={<BarChart size={20} />}
            label="Total Construction Cost"
            value={`₹ ${result.total}`}
          />
        </div>
      )}

      {/* ================= SEO BLOG CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          How to Calculate House Construction Cost
        </h2>

        <p>
          House construction cost depends on multiple factors such as built-up
          area, material quality, labor charges, and location. This calculator
          helps you estimate the approximate cost of constructing a house in
          India.
        </p>

        <h3 className="font-semibold">House Construction Cost Formula</h3>

        <p
          className="font-mono text-xs p-3 rounded"
          style={{ backgroundColor: "var(--surface-2)" }}>
          Built-Up Area (sq.ft) = Length × Width Total Cost = Built-Up Area ×
          Cost per sq.ft
        </p>

        <ul className="list-disc pl-5">
          <li>Basic construction: ₹1,600 – ₹1,900 per sq.ft</li>
          <li>Standard construction: ₹2,000 – ₹2,500 per sq.ft</li>
          <li>Premium construction: ₹2,800+ per sq.ft</li>
        </ul>

        <h3 className="font-semibold">
          What is Included in Construction Cost?
        </h3>

        <ul className="list-disc pl-5">
          <li>Foundation & RCC structure</li>
          <li>Brickwork & plastering</li>
          <li>Flooring & tiling</li>
          <li>Electrical & plumbing</li>
          <li>Painting & finishing</li>
        </ul>

        <h3 className="font-semibold">
          Why Use a House Construction Cost Calculator?
        </h3>

        <ul className="list-disc pl-5">
          <li>Quick budget estimation</li>
          <li>Helps plan home loans</li>
          <li>Easy comparison of construction quality</li>
          <li>Ideal for homeowners & builders</li>
        </ul>

        <p>
          This house construction cost calculator gives a realistic estimate for
          planning residential construction projects in India.
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ This calculator provides an approximate estimate only. Actual
        construction cost may vary based on location, design, material quality,
        and contractor charges.
      </aside>
    </section>
  );
}
