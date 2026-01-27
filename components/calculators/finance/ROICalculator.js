"use client";

import { useState } from "react";
import {
  Calculator,
  TrendingUp,
  IndianRupee,
  Percent,
} from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { ResultCard } from "../../ResultCard";

export default function ROICalculator() {
  const [investment, setInvestment] = useState("");
  const [returns, setReturns] = useState("");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    if (!investment || Number(investment) <= 0) {
      setError("Please enter a valid investment amount.");
      return false;
    }

    if (!returns || Number(returns) < 0) {
      setError("Please enter valid returns amount.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- CALCULATION ---------------- */
  function calculateROI(e) {
    e.preventDefault();
    if (!validate()) return;

    const invest = Number(investment);
    const gain = Number(returns);

    const profit = gain - invest;
    const roi = (profit / invest) * 100;

    setResult({
      profit: Math.round(profit),
      roi: Math.round(roi * 100) / 100,
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
          ROI Calculator
        </h1>
        <p className="text-sm leading-relaxed">
          Use this ROI Calculator to measure the return on your
          investment and evaluate profitability easily.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateROI} className="space-y-4">
        <AmountInput
          label="Investment Amount"
          value={investment}
          onChange={setInvestment}
          placeholder="1,00,000"
        />

        <AmountInput
          label="Total Returns"
          value={returns}
          onChange={setReturns}
          placeholder="1,50,000"
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
          Calculate ROI
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <div className="grid md:grid-cols-3 gap-4" aria-live="polite">
          <ResultCard
            variant="primary"
            icon={<Percent size={20} />}
            label="Return on Investment (ROI)"
            value={`${result.roi}%`}
          />

          <ResultCard
            variant="neutral"
            icon={<TrendingUp size={20} />}
            label="Net Profit"
            value={`₹ ${result.profit.toLocaleString(
              "en-IN"
            )}`}
          />

          <ResultCard
            variant="success"
            icon={<IndianRupee size={20} />}
            label="Total Investment"
            value={`₹ ${Number(investment).toLocaleString(
              "en-IN"
            )}`}
          />
        </div>
      )}

      {/* ================= SEO BLOG CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          What is ROI (Return on Investment)?
        </h2>

        <p>
          ROI (Return on Investment) is a performance measure used to
          evaluate the efficiency or profitability of an investment.
          It shows how much return you earned compared to the amount
          you invested.
        </p>

        <p>
          ROI is commonly used in business decisions, marketing
          campaigns, real estate investments, and stock market
          analysis.
        </p>

        <h3 className="font-semibold">
          ROI Formula
        </h3>

        <p
          className="font-mono text-xs p-3 rounded"
          style={{ backgroundColor: "var(--surface-2)" }}
        >
          ROI (%) = [(Return − Investment) ÷ Investment] × 100
        </p>

        <ul className="list-disc pl-5">
          <li>
            <strong>Investment</strong> – Initial amount invested
          </li>
          <li>
            <strong>Return</strong> – Total amount received
          </li>
          <li>
            <strong>Profit</strong> – Return minus investment
          </li>
        </ul>

        <h3 className="font-semibold">
          Why ROI is Important
        </h3>

        <ul className="list-disc pl-5">
          <li>Helps compare multiple investment options</li>
          <li>Measures profitability clearly</li>
          <li>Supports business & financial planning</li>
          <li>Useful for startups, investors & marketers</li>
        </ul>

        <p>
          A higher ROI indicates a more profitable investment, while
          a lower or negative ROI indicates loss.
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ This ROI calculator provides an estimate only. Actual
        investment returns may vary due to market conditions and
        external factors.
      </aside>
    </section>
  );
}
