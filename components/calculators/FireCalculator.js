"use client";

import { useState } from "react";
import {
  Calculator,
  Wallet,
  TrendingUp,
  IndianRupee,
  Flame,
} from "lucide-react";

import { AmountInput } from "../inputs/AmountInput";
import { PercentageInput } from "../inputs/PercentageInput";
import { ResultCard } from "../ResultCard";

export default function FireCalculator() {
  const [monthlyExpense, setMonthlyExpense] = useState("");
  const [withdrawalRate, setWithdrawalRate] = useState("4"); // default SWR
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
      setError("Safe withdrawal rate should be between 1% and 10%.");
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
    const swr = Number(withdrawalRate) / 100;

    const fireCorpus = annualExpense / swr;

    setResult({
      monthlyExpense: Math.round(monthly),
      annualExpense: Math.round(annualExpense),
      corpus: Math.round(fireCorpus),
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
      {/* HEADER */}
      <header className="space-y-2">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Flame size={22} />
          FIRE Calculator
        </h1>

        <p className="text-sm leading-relaxed">
          Use this FIRE (Financial Independence, Retire Early) Calculator
          to estimate how much wealth you need to retire early and live
          off your investments safely.
        </p>
      </header>

      {/* FORM */}
      <form onSubmit={calculateFire} className="space-y-4">
        <AmountInput
          label="Current Monthly Expense"
          value={monthlyExpense}
          onChange={setMonthlyExpense}
          placeholder="40,000"
          hasError={error.toLowerCase().includes("expense")}
        />

        <PercentageInput
          label="Safe Withdrawal Rate (SWR %)"
          value={withdrawalRate}
          onChange={setWithdrawalRate}
          placeholder="4"
          hasError={error.toLowerCase().includes("withdrawal")}
        />

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
          Calculate FIRE Corpus
        </button>
      </form>

      {/* RESULT */}
      {result && (
        <div className="grid md:grid-cols-3 gap-4" aria-live="polite">
          <ResultCard
            variant="primary"
            icon={<Wallet size={20} />}
            label="Monthly Expense"
            value={`₹ ${result.monthlyExpense.toLocaleString("en-IN")}`}
          />

          <ResultCard
            variant="warning"
            icon={<TrendingUp size={20} />}
            label="Annual Expense"
            value={`₹ ${result.annualExpense.toLocaleString("en-IN")}`}
          />

          <ResultCard
            variant="neutral"
            icon={<IndianRupee size={20} />}
            label="FIRE Corpus Required"
            value={`₹ ${result.corpus.toLocaleString("en-IN")}`}
          />
        </div>
      )}

      {/* INFO SECTION (SEO GOLD) */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          What is FIRE (Financial Independence, Retire Early)?
        </h2>

        <p>
          FIRE is a financial movement focused on aggressive saving and
          investing to achieve financial independence and retire much
          earlier than traditional retirement age.
        </p>

        <p>
          The FIRE corpus is calculated using a safe withdrawal rate (SWR),
          which indicates how much of your investment you can withdraw
          annually without running out of money.
        </p>

        <p className="font-medium">
          A lower SWR means higher safety but a larger required corpus.
        </p>
      </article>
    </section>
  );
}
