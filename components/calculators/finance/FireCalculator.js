"use client";

import { useState } from "react";
import {
  Calculator,
  Wallet,
  TrendingUp,
  IndianRupee,
  Flame,
} from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { PercentageInput } from "../../inputs/PercentageInput";
import { ResultCard } from "../../ResultCard";
import { InputField } from "../../inputs/InputField";

export default function FireCalculator() {
  const [monthlyExpense, setMonthlyExpense] = useState("");
  const [withdrawalRate, setWithdrawalRate] = useState("4");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    if (!monthlyExpense || Number(monthlyExpense) <= 0) {
      setError("Please enter a valid monthly expense.");
      return false;
    }

    if (
      withdrawalRate === "" ||
      Number(withdrawalRate) <= 0 ||
      Number(withdrawalRate) > 10
    ) {
      setError("Withdrawal rate should be between 0.5% and 10%.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- CALCULATION ---------------- */
  function calculateFire(e) {
    e.preventDefault();

    if (!validate()) {
      setResult(null);
      return;
    }

    const monthly = Number(monthlyExpense);
    const annualExpense = monthly * 12;
    const rate = Number(withdrawalRate) / 100;

    const fireCorpus = annualExpense / rate;

    setResult({
      monthlyExpense: monthly,
      annualExpense,
      fireCorpus: Math.round(fireCorpus),
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
          <Flame size={22} />
          FIRE Calculator (Financial Independence Retire Early)
        </h1>

        <p className="text-sm leading-relaxed">
          Use this FIRE Calculator to estimate how much money you need to
          achieve Financial Independence and retire early based on your
          monthly expenses and safe withdrawal rate.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateFire} className="space-y-4">
        <AmountInput
          label="Monthly Living Expenses"
          value={monthlyExpense}
          onChange={setMonthlyExpense}
          placeholder="40,000"
          hasError={error.toLowerCase().includes("expense")}
        />

        <PercentageInput
          label="Safe Withdrawal Rate (%)"
          value={withdrawalRate}
          onChange={setWithdrawalRate}
          placeholder="4"
          hasError={error.toLowerCase().includes("withdrawal")}
        />

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          className="w-full py-2.5 rounded-md font-medium flex items-center justify-center gap-2"
          style={{ backgroundColor: "var(--primary)", color: "#fff" }}
        >
          <Calculator size={18} />
          Calculate FIRE Corpus
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <div className="grid md:grid-cols-3 gap-4" aria-live="polite">
          <ResultCard
            variant="primary"
            icon={<Wallet size={20} />}
            label="Monthly Expenses"
            value={`₹ ${result.monthlyExpense.toLocaleString("en-IN")}`}
          />

          <ResultCard
            variant="neutral"
            icon={<TrendingUp size={20} />}
            label="Annual Expenses"
            value={`₹ ${result.annualExpense.toLocaleString("en-IN")}`}
          />

          <ResultCard
            variant="warning"
            icon={<IndianRupee size={20} />}
            label="Required FIRE Corpus"
            value={`₹ ${result.fireCorpus.toLocaleString("en-IN")}`}
          />
        </div>
      )}

      {/* ================= SEO CONTENT ================= */}
      <article className="space-y-6 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          What is FIRE (Financial Independence, Retire Early)?
        </h2>

        <p>
          FIRE stands for <strong>Financial Independence, Retire Early</strong>.
          It is a financial strategy where individuals save and invest
          aggressively so that their investment income can cover living
          expenses, allowing them to retire much earlier than the traditional
          retirement age.
        </p>

        <h2 className="font-semibold text-base">
          FIRE Calculator Formula
        </h2>

        <p>
          The FIRE Calculator uses the Safe Withdrawal Rate (SWR) principle
          to estimate the retirement corpus required.
        </p>

        <pre
          className="text-xs p-3 rounded font-mono"
          style={{ backgroundColor: "var(--surface-2)" }}
        >
FIRE Corpus = Annual Expenses ÷ Withdrawal Rate
        </pre>

        <h2 className="font-semibold text-base">
          FIRE Calculator Example
        </h2>

        <p>
          If your monthly expense is ₹40,000, your annual expense becomes
          ₹4,80,000. With a 4% withdrawal rate, the FIRE corpus required is:
        </p>

        <p>
          <strong>₹4,80,000 ÷ 0.04 = ₹1,20,00,000 (₹1.2 Crore)</strong>
        </p>

        <h2 className="font-semibold text-base">
          Important Things to Know About FIRE
        </h2>

        <ul className="list-disc pl-5 space-y-1">
          <li>Lower withdrawal rates increase safety</li>
          <li>Inflation can reduce purchasing power</li>
          <li>Healthcare costs may rise after retirement</li>
          <li>Market returns are not guaranteed</li>
        </ul>

        <h2 className="font-semibold text-base">
          Why Use This FIRE Calculator?
        </h2>

        <ul className="list-disc pl-5 space-y-1">
          <li>Simple and beginner-friendly</li>
          <li>Based on globally accepted FIRE principles</li>
          <li>Instant results with no signup</li>
          <li>Optimized for Indian expenses</li>
        </ul>
      </article>
    </section>
  );
}
