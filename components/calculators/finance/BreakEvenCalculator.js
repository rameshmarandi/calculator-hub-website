"use client";

import { useState } from "react";
import {
  Calculator,
  BarChart,
  IndianRupee,
} from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { ResultCard } from "../../ResultCard";

export default function BreakEvenCalculator() {
  const [fixedCost, setFixedCost] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [variableCost, setVariableCost] = useState("");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    if (!fixedCost || Number(fixedCost) <= 0) {
      setError("Please enter valid fixed costs.");
      return false;
    }

    if (!sellingPrice || Number(sellingPrice) <= 0) {
      setError("Please enter a valid selling price.");
      return false;
    }

    if (variableCost === "" || Number(variableCost) < 0) {
      setError("Please enter a valid variable cost.");
      return false;
    }

    if (Number(variableCost) >= Number(sellingPrice)) {
      setError(
        "Selling price must be greater than variable cost."
      );
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- CALCULATION ---------------- */
  function calculateBreakEven(e) {
    e.preventDefault();
    if (!validate()) return;

    const fixed = Number(fixedCost);
    const price = Number(sellingPrice);
    const variable = Number(variableCost);

    const contributionMargin = price - variable;
    const breakEvenUnits = fixed / contributionMargin;
    const breakEvenRevenue = breakEvenUnits * price;

    setResult({
      units: Math.ceil(breakEvenUnits),
      revenue: Math.round(breakEvenRevenue),
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
          Break Even Calculator
        </h1>
        <p className="text-sm leading-relaxed">
          Use this Break Even Calculator to find the minimum number of
          units you need to sell to cover all your business costs.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateBreakEven} className="space-y-4">
        <AmountInput
          label="Fixed Costs"
          value={fixedCost}
          onChange={setFixedCost}
          placeholder="1,00,000"
        />

        <AmountInput
          label="Selling Price per Unit"
          value={sellingPrice}
          onChange={setSellingPrice}
          placeholder="500"
        />

        <AmountInput
          label="Variable Cost per Unit"
          value={variableCost}
          onChange={setVariableCost}
          placeholder="300"
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
          Calculate Break Even Point
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <div className="grid md:grid-cols-2 gap-4" aria-live="polite">
          <ResultCard
            variant="primary"
            icon={<BarChart size={20} />}
            label="Break Even Units"
            value={`${result.units.toLocaleString(
              "en-IN"
            )} units`}
          />

          <ResultCard
            variant="neutral"
            icon={<IndianRupee size={20} />}
            label="Break Even Revenue"
            value={`₹ ${result.revenue.toLocaleString(
              "en-IN"
            )}`}
          />
        </div>
      )}

      {/* ================= SEO BLOG CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          What is Break Even Point?
        </h2>

        <p>
          The break-even point is the stage where a business’s total
          revenue equals its total costs. At this point, the business
          neither makes a profit nor incurs a loss.
        </p>

        <p>
          Understanding your break-even point helps you make better
          decisions related to pricing, cost control, and sales
          targets.
        </p>

        <h3 className="font-semibold">
          Break Even Formula
        </h3>

        <p
          className="font-mono text-xs p-3 rounded"
          style={{ backgroundColor: "var(--surface-2)" }}
        >
          Break Even Units = Fixed Costs ÷ (Selling Price − Variable Cost)
        </p>

        <ul className="list-disc pl-5">
          <li>
            <strong>Fixed Costs</strong> – Expenses that do not change
            with production (rent, salaries, software, etc.)
          </li>
          <li>
            <strong>Variable Costs</strong> – Costs that vary per unit
            (materials, packaging, delivery)
          </li>
          <li>
            <strong>Selling Price</strong> – Price at which one unit is
            sold
          </li>
        </ul>

        <h3 className="font-semibold">
          Why Break Even Analysis Is Important
        </h3>

        <ul className="list-disc pl-5">
          <li>Helps set realistic sales targets</li>
          <li>Improves pricing decisions</li>
          <li>Identifies cost inefficiencies</li>
          <li>Essential for startups & small businesses</li>
        </ul>

        <h3 className="font-semibold">
          Who Should Use This Break Even Calculator?
        </h3>

        <p>
          This calculator is ideal for entrepreneurs, startups, small
          business owners, and anyone planning a new product or
          service.
        </p>

        <p>
          By knowing your break-even point, you can clearly understand
          how much you need to sell before your business starts making
          profit.
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ This calculator provides an estimate only. Actual break-even
        figures may vary based on market conditions and business
        operations.
      </aside>
    </section>
  );
}
