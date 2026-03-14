"use client";

import { useState } from "react";
import { Calculator, BarChart } from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { PercentageInput } from "../../inputs/PercentageInput";
import { ResultCard } from "../../ResultCard";
import HouseConstructionCostArticle from "../../content/construction/HouseConstructionCostCalculatorArticle";

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
      area: builtUpAreaSqFt.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
      rate: rate.toLocaleString(),
      total: totalCost.toLocaleString(),
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
          House Construction Cost Calculator
        </h1>
        <p className="text-sm leading-relaxed">
          Use this House Construction Cost Calculator to estimate the total cost
          of building a house based on built-up area and construction rate per
          square foot.
        </p>
      </header>

      <form onSubmit={calculateHouseCost} className="space-y-4">
        <AmountInput
          label="Plot Length (feet)"
          value={length}
          onChange={setLength}
          placeholder="30"
          prefix=""
        />

        <AmountInput
          label="Plot Width (feet)"
          value={width}
          onChange={setWidth}
          placeholder="40"
          prefix=""
        />

        <AmountInput
          label="Construction Cost (₹ per sq.ft)"
          value={costPerSqFt}
          onChange={setCostPerSqFt}
          placeholder="1800"
          prefix=""
        />
        {/* <PercentageInput
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
        /> */}

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          className="w-full py-2.5 rounded-md font-medium"
          style={{
            backgroundColor: "var(--primary)",
            color: "#fff",
          }}
        >
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
      <HouseConstructionCostArticle />
    </section>
  );
}
