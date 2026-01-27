"use client";

import { useState } from "react";
import {
  Calculator,
  Wallet,
  TrendingUp,
  IndianRupee,
} from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { PercentageInput } from "../../inputs/PercentageInput";
import { ResultCard } from "../../ResultCard";

export default function RetirementPlanningCalculator() {
  const [currentExpense, setCurrentExpense] = useState("");
  const [inflationRate, setInflationRate] = useState("");
  const [yearsToRetire, setYearsToRetire] = useState("");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    if (!currentExpense || Number(currentExpense) <= 0) {
      setError("Please enter a valid current monthly expense.");
      return false;
    }

    if (
      inflationRate === "" ||
      Number(inflationRate) < 0 ||
      Number(inflationRate) > 20
    ) {
      setError("Please enter a realistic inflation rate (0–20%).");
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

    // Future value of monthly expenses
    const futureMonthlyExpense =
      monthlyExpense * Math.pow(1 + inflation, years);

    const annualExpenseAtRetirement = futureMonthlyExpense * 12;

    // Rule of 25
    const retirementCorpus = annualExpenseAtRetirement * 25;

    setResult({
      futureMonthlyExpense: Math.round(futureMonthlyExpense),
      annualExpense: Math.round(annualExpenseAtRetirement),
      corpus: Math.round(retirementCorpus),
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
      <header className="space-y-2">
        <h1 className="text-2xl font-bold">
          Retirement Planning Calculator
        </h1>

        <p className="text-sm leading-relaxed">
          This Retirement Planning Calculator helps you estimate the amount
          of money you will need to retire comfortably by considering your
          current expenses, inflation rate, and years left until retirement.
        </p>
      </header>

      {/* ================= FORM ================= */}
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

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          className="w-full py-2.5 rounded-md font-medium flex items-center justify-center gap-2"
          style={{ backgroundColor: "var(--primary)", color: "#fff" }}
        >
          <Calculator size={18} />
          Calculate Retirement Corpus
        </button>
      </form>

      {/* ================= RESULT ================= */}
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

      {/* ================= ARTICLE CONTENT ================= */}
      <article className="space-y-6 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          What is Retirement Planning?
        </h2>

        <p>
          Retirement planning is the process of estimating future financial
          needs after you stop working and creating a strategy to meet those
          needs. It ensures that you can maintain your lifestyle without
          depending on active income.
        </p>

        <h2 className="font-semibold text-base">
          How This Retirement Calculator Works
        </h2>

        <p>
          This calculator projects your future expenses by adjusting your
          current monthly expenses for inflation. It then applies the
          <strong> Rule of 25</strong> to estimate the retirement corpus.
        </p>

        <pre
          className="text-xs p-3 rounded font-mono"
          style={{ backgroundColor: "var(--surface-2)" }}
        >
Future Expense = Current Expense × (1 + Inflation) ^ Years  
Retirement Corpus = Annual Expense × 25
        </pre>

        <h2 className="font-semibold text-base">
          Retirement Planning Example
        </h2>

        <p>
          If your current monthly expense is ₹30,000, inflation is 6%, and
          retirement is 25 years away:
        </p>

        <ul className="list-disc pl-5">
          <li>Future monthly expense ≈ ₹1,28,000</li>
          <li>Annual expense ≈ ₹15.4 lakh</li>
          <li>Required corpus ≈ ₹3.85 crore</li>
        </ul>

        <h2 className="font-semibold text-base">
          Why Retirement Planning Is Important
        </h2>

        <ul className="list-disc pl-5 space-y-1">
          <li>Protects against rising inflation</li>
          <li>Ensures financial independence</li>
          <li>Reduces stress after retirement</li>
          <li>Helps plan investments early</li>
        </ul>

        <h2 className="font-semibold text-base">
          Who Should Use This Calculator?
        </h2>

        <p>
          This retirement planning calculator is useful for salaried
          individuals, business owners, freelancers, and anyone who wants
          to understand how much they need to save for a secure retirement.
        </p>
      </article>
    </section>
  );
}
