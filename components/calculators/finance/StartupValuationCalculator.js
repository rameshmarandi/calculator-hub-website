"use client";

import { useState } from "react";
import {
  Calculator,
  TrendingUp,
  IndianRupee,
} from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { PercentageInput } from "../../inputs/PercentageInput";
import { ResultCard } from "../../ResultCard";

export default function StartupValuationCalculator() {
  const [annualRevenue, setAnnualRevenue] = useState("");
  const [growthRate, setGrowthRate] = useState("20");
  const [valuationMultiple, setValuationMultiple] = useState("5");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    if (!annualRevenue || Number(annualRevenue) <= 0) {
      setError("Please enter a valid annual revenue.");
      return false;
    }

    if (Number(growthRate) < 0) {
      setError("Growth rate cannot be negative.");
      return false;
    }

    if (!valuationMultiple || Number(valuationMultiple) <= 0) {
      setError("Please enter a valid valuation multiple.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- CALCULATION ---------------- */
  function calculateValuation(e) {
    e.preventDefault();
    if (!validate()) return;

    const revenue = Number(annualRevenue);
    const growth = Number(growthRate) / 100;
    const multiple = Number(valuationMultiple);

    // Simple revenue-based valuation
    const adjustedRevenue = revenue * (1 + growth);
    const valuation = adjustedRevenue * multiple;

    setResult({
      valuation: Math.round(valuation),
      adjustedRevenue: Math.round(adjustedRevenue),
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
          Startup Valuation Calculator
        </h1>
        <p className="text-sm leading-relaxed">
          Estimate your startup valuation based on revenue, growth
          rate, and industry valuation multiples.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateValuation} className="space-y-4">
        <AmountInput
          label="Annual Revenue"
          value={annualRevenue}
          onChange={setAnnualRevenue}
          placeholder="50,00,000"
        />

        <PercentageInput
          label="Expected Annual Growth Rate (%)"
          value={growthRate}
          onChange={setGrowthRate}
          placeholder="20"
        />

        <PercentageInput
          label="Revenue Multiple"
          value={valuationMultiple}
          onChange={setValuationMultiple}
          placeholder="5"
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
          Calculate Startup Valuation
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <div className="grid md:grid-cols-2 gap-4" aria-live="polite">
          <ResultCard
            variant="primary"
            icon={<IndianRupee size={20} />}
            label="Estimated Startup Valuation"
            value={`₹ ${result.valuation.toLocaleString(
              "en-IN"
            )}`}
          />

          <ResultCard
            variant="neutral"
            icon={<TrendingUp size={20} />}
            label="Adjusted Annual Revenue"
            value={`₹ ${result.adjustedRevenue.toLocaleString(
              "en-IN"
            )}`}
          />
        </div>
      )}

      {/* ================= SEO BLOG CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          What is Startup Valuation?
        </h2>

        <p>
          Startup valuation is the process of determining the economic
          value of a startup business. It plays a critical role during
          fundraising, investment discussions, and equity dilution
          decisions.
        </p>

        <p>
          Early-stage startups are often valued using revenue-based or
          growth-based models instead of profits.
        </p>

        <h3 className="font-semibold">
          Startup Valuation Formula (Revenue-Based)
        </h3>

        <p
          className="font-mono text-xs p-3 rounded"
          style={{ backgroundColor: "var(--surface-2)" }}
        >
          Startup Valuation = Adjusted Revenue × Valuation Multiple
        </p>

        <ul className="list-disc pl-5">
          <li>
            <strong>Revenue</strong> – Annual business revenue
          </li>
          <li>
            <strong>Growth Rate</strong> – Expected yearly growth
          </li>
          <li>
            <strong>Multiple</strong> – Industry-specific multiplier
          </li>
        </ul>

        <h3 className="font-semibold">
          Why Startup Valuation Matters
        </h3>

        <ul className="list-disc pl-5">
          <li>Helps founders negotiate funding rounds</li>
          <li>Determines equity dilution</li>
          <li>Builds investor confidence</li>
          <li>Guides long-term business planning</li>
        </ul>

        <p>
          This startup valuation calculator provides a simplified
          estimate. Actual valuation depends on market conditions,
          competition, traction, and investor sentiment.
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ This calculator provides an indicative valuation only.
        Actual startup valuation may vary significantly based on
        investors, market trends, and business fundamentals.
      </aside>
    </section>
  );
}
