"use client";

import { useState } from "react";
import {
  Calculator,
  Wallet,
  TrendingUp,
  IndianRupee,
  Calendar,
  PiggyBank,
} from "lucide-react";

import { AmountInput } from "../inputs/AmountInput";
import { PercentageInput } from "../inputs/PercentageInput";
import { InputField } from "../inputs/InputField";
import { ResultCard } from "../ResultCard";

export default function LumpsumInvestmentCalculator() {
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [annualReturn, setAnnualReturn] = useState("");
  const [tenureYears, setTenureYears] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- BASIC VALIDATION (NOT STRICT) ---------------- */
  function validate() {
    if (!investmentAmount || Number(investmentAmount) <= 0) {
      setError("Please enter a valid investment amount.");
      return false;
    }

    if (
      annualReturn === "" ||
      Number(annualReturn) < 0 ||
      Number(annualReturn) > 100
    ) {
      setError("Expected return should be between 0% and 100%.");
      return false;
    }

    if (!tenureYears || Number(tenureYears) <= 0) {
      setError("Investment duration must be greater than 0.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- CALCULATION ---------------- */
  function calculateLumpsum(e) {
    e.preventDefault();

    if (!validate()) {
      setResult(null);
      return;
    }

    const P = Number(investmentAmount);
    const r = Number(annualReturn) / 100;
    const t = Number(tenureYears);

    // Lumpsum compound interest formula
    const futureValue = P * Math.pow(1 + r, t);
    const gains = futureValue - P;

    setResult({
      invested: Math.round(P),
      gains: Math.round(gains),
      futureValue: Math.round(futureValue),
    });
  }

  return (
    <section
      className="rounded-xl p-6 space-y-8"
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)",
      }}
    >
      {/* ================= HEADER ================= */}
      <header className="space-y-2">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <PiggyBank size={22} />
          Lumpsum Investment Calculator
        </h1>

        <p className="text-sm leading-relaxed">
          Use this Lumpsum Investment Calculator to estimate the future value
          of a one-time investment based on expected annual returns and
          investment duration.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateLumpsum} className="space-y-4">
        <AmountInput
          label="Investment Amount"
          value={investmentAmount}
          onChange={setInvestmentAmount}
          placeholder="1,00,000"
          hasError={error.toLowerCase().includes("investment")}
        />

        <PercentageInput
          label="Expected Annual Return (%)"
          value={annualReturn}
          onChange={setAnnualReturn}
          placeholder="12"
          hasError={error.toLowerCase().includes("return")}
        />

        <InputField
          icon={<Calendar size={18} />}
          label="Investment Duration (in years)"
          value={tenureYears}
          onChange={setTenureYears}
          placeholder="10"
          hasError={error.toLowerCase().includes("duration")}
        />

        {/* Soft guidance */}
        <p className="text-xs text-gray-500">
          Equity investments typically deliver 10–15% annual returns over
          long periods.
        </p>

        {error && (
          <p className="text-sm text-red-500">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full py-2.5 rounded-md font-medium flex items-center justify-center gap-2"
          style={{ backgroundColor: "var(--primary)", color: "#fff" }}
        >
          <Calculator size={18} />
          Calculate Returns
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <div className="grid md:grid-cols-3 gap-4" aria-live="polite">
          <ResultCard
            variant="neutral"
            icon={<IndianRupee size={20} />}
            label="Total Investment"
            value={`₹ ${result.invested.toLocaleString("en-IN")}`}
          />

          <ResultCard
            variant="warning"
            icon={<TrendingUp size={20} />}
            label="Total Gains"
            value={`₹ ${result.gains.toLocaleString("en-IN")}`}
          />

          <ResultCard
            variant="primary"
            icon={<Wallet size={20} />}
            label="Future Value"
            value={`₹ ${result.futureValue.toLocaleString("en-IN")}`}
          />
        </div>
      )}

      {/* ================= INFO (SEO) ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          How Lumpsum Investment Returns are Calculated
        </h2>

        <p>
          A lumpsum investment is a one-time investment where returns grow
          through compounding over time. The future value depends on the
          annual rate of return and investment duration.
        </p>

        <p
          className="font-mono text-xs p-3 rounded"
          style={{ backgroundColor: "var(--surface-2)" }}
        >
          FV = P × (1 + r)<sup>t</sup>
        </p>

        <ul className="list-disc pl-5">
          <li><strong>P</strong> = Initial investment amount</li>
          <li><strong>r</strong> = Annual rate of return</li>
          <li><strong>t</strong> = Investment duration in years</li>
        </ul>

        <p>
          Longer investment duration significantly increases returns due to
          the power of compounding.
        </p>
      </article>

      {/* ================= BENEFITS ================= */}
      <aside className="text-sm space-y-2">
        <h3 className="font-semibold">
          Why use a Lumpsum Investment Calculator?
        </h3>
        <ul className="list-disc pl-5">
          <li>Estimate future value of one-time investments</li>
          <li>Compare different return rates and durations</li>
          <li>Understand compounding impact clearly</li>
          <li>Fast, free, and accurate</li>
        </ul>
      </aside>
    </section>
  );
}
