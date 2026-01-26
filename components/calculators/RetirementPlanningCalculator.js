"use client";

import { useState } from "react";
import {
  Calculator,
  Wallet,
  TrendingUp,
  IndianRupee,
  Calendar,
} from "lucide-react";

import { AmountInput } from "../inputs/AmountInput";
import { PercentageInput } from "../inputs/PercentageInput";
import { ResultCard } from "../ResultCard";

export default function RetirementPlanningCalculator() {
  const [currentExpense, setCurrentExpense] = useState("");
  const [inflationRate, setInflationRate] = useState("");
  const [yearsToRetire, setYearsToRetire] = useState("");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    if (!currentExpense || Number(currentExpense) <= 0) {
      setError("Please enter a valid monthly expense.");
      return false;
    }

    if (
      inflationRate === "" ||
      Number(inflationRate) < 0 ||
      Number(inflationRate) > 15
    ) {
      setError("Inflation rate should be between 0% and 15%.");
      return false;
    }

    if (!yearsToRetire || Number(yearsToRetire) <= 0) {
      setError("Years to retirement must be greater than 0.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- CALCULATION ---------------- */
  function calculateRetirement(e) {
    e.preventDefault();

    if (!validate()) {
      setResult(null);
      return;
    }

    const monthlyExpense = Number(currentExpense);
    const inflation = Number(inflationRate) / 100;
    const years = Number(yearsToRetire);

    const futureMonthlyExpense =
      monthlyExpense * Math.pow(1 + inflation, years);

    const annualExpenseAtRetirement = futureMonthlyExpense * 12;

    const retirementCorpus = annualExpenseAtRetirement * 25;

    setResult({
      futureMonthlyExpense: Math.round(futureMonthlyExpense),
      annualExpense: Math.round(annualExpenseAtRetirement),
      corpus: Math.round(retirementCorpus),
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
      <header>
        <h1 className="text-2xl font-bold mb-1">
          Retirement Planning Calculator
        </h1>

        <p className="text-sm leading-relaxed">
          Use this Retirement Planning Calculator to estimate how much money
          you will need to retire comfortably based on your current expenses
          and expected inflation.
        </p>
      </header>

      {/* FORM */}
      <form onSubmit={calculateRetirement} className="space-y-4">
        <AmountInput
          label="Current Monthly Expense"
          value={currentExpense}
          onChange={setCurrentExpense}
          placeholder="30,000"
          hasError={error.toLowerCase().includes("expense")}
        />

        <PercentageInput
          label="Expected Inflation Rate (%)"
          value={inflationRate}
          onChange={setInflationRate}
          placeholder="6"
          hasError={error.toLowerCase().includes("inflation")}
        />

        {/* Years to retire (plain input) */}
        <label className="block space-y-1">
          <span className="text-sm font-medium">
            Years Left Until Retirement
          </span>
          <input
            type="number"
            value={yearsToRetire}
            onChange={e => setYearsToRetire(e.target.value)}
            placeholder="25"
            className="w-full rounded-md px-3 py-2 border"
            style={{
              backgroundColor: "var(--surface-2)",
              borderColor: "var(--border)",
            }}
          />
        </label>

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
          Calculate Retirement Corpus
        </button>
      </form>

      {/* RESULT */}
      {result && (
        <div className="grid md:grid-cols-3 gap-4" aria-live="polite">
          <ResultCard
            variant="primary"
            icon={<Wallet size={20} />}
            label="Monthly Expense at Retirement"
            value={`₹ ${result.futureMonthlyExpense.toLocaleString("en-IN")}`}
          />

          <ResultCard
            variant="warning"
            icon={<TrendingUp size={20} />}
            label="Annual Expense at Retirement"
            value={`₹ ${result.annualExpense.toLocaleString("en-IN")}`}
          />

          <ResultCard
            variant="neutral"
            icon={<IndianRupee size={20} />}
            label="Required Retirement Corpus"
            value={`₹ ${result.corpus.toLocaleString("en-IN")}`}
          />
        </div>
      )}

      {/* INFO SECTION (SEO) */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          How Retirement Planning Works
        </h2>

        <p>
          Retirement planning helps you estimate how much money you will need
          to maintain your lifestyle after you stop working. Inflation plays
          a major role in increasing expenses over time.
        </p>

        <p>
          This calculator uses the widely accepted <strong>Rule of 25</strong>,
          which suggests that you need 25 times your annual expenses as a
          retirement corpus.
        </p>

        <p>
          Proper retirement planning ensures financial independence,
          stress-free living, and protection against rising costs.
        </p>
      </article>
    </section>
  );
}
