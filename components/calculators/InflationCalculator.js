"use client";

import { useState } from "react";
import {
  Calculator,
  TrendingUp,
  IndianRupee,
  Wallet,
} from "lucide-react";

import { PercentageInput } from "../inputs/PercentageInput";
import { AmountInput } from "../inputs/AmountInput";
import { ResultCard } from "../ResultCard";

export default function InflationCalculator() {
  const [currentAmount, setCurrentAmount] = useState("");
  const [inflationRate, setInflationRate] = useState("");
  const [years, setYears] = useState("");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    if (!currentAmount || Number(currentAmount) <= 0) {
      setError("Please enter a valid current amount.");
      return false;
    }

    if (
      inflationRate === "" ||
      Number(inflationRate) < 0 ||
      Number(inflationRate) > 50
    ) {
      setError("Inflation rate should be between 0% and 50%.");
      return false;
    }

    if (!years || Number(years) <= 0) {
      setError("Number of years must be greater than 0.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- CALCULATION ---------------- */
  function calculateInflation(e) {
    e.preventDefault();

    if (!validate()) {
      setResult(null);
      return;
    }

    const P = Number(currentAmount);
    const r = Number(inflationRate) / 100;
    const n = Number(years);

    const futureValue = P * Math.pow(1 + r, n);
    const lossInValue = futureValue - P;

    setResult({
      futureValue: Math.round(futureValue),
      lossInValue: Math.round(lossInValue),
      todayValue: Math.round(P),
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
          Inflation Calculator
        </h1>

        <p className="text-sm leading-relaxed">
          Use this Inflation Calculator to find out how inflation reduces
          the purchasing power of money over time. Know what today’s money
          will be worth in the future.
        </p>
      </header>

      {/* FORM */}
      <form onSubmit={calculateInflation} className="space-y-4">
        <AmountInput
          label="Current Amount"
          value={currentAmount}
          onChange={setCurrentAmount}
          placeholder="1,00,000"
          hasError={error.toLowerCase().includes("amount")}
        />

        <PercentageInput
          label="Expected Inflation Rate (%)"
          value={inflationRate}
          onChange={setInflationRate}
          placeholder="6"
          hasError={error.toLowerCase().includes("inflation")}
        />

        {/* Years – plain number input */}
        <label className="block space-y-1">
          <span className="text-sm font-medium">
            Time Period (Years)
          </span>
          <input
            type="number"
            value={years}
            onChange={e => setYears(e.target.value)}
            placeholder="10"
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
          Calculate Inflation Impact
        </button>
      </form>

      {/* RESULT */}
      {result && (
        <div className="grid md:grid-cols-3 gap-4" aria-live="polite">
          <ResultCard
            variant="primary"
            icon={<IndianRupee size={20} />}
            label="Future Value Needed"
            value={`₹ ${result.futureValue.toLocaleString("en-IN")}`}
          />

          <ResultCard
            variant="warning"
            icon={<TrendingUp size={20} />}
            label="Loss of Purchasing Power"
            value={`₹ ${result.lossInValue.toLocaleString("en-IN")}`}
          />

          <ResultCard
            variant="neutral"
            icon={<Wallet size={20} />}
            label="Today's Value"
            value={`₹ ${result.todayValue.toLocaleString("en-IN")}`}
          />
        </div>
      )}

      {/* INFO SECTION (SEO) */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          What is Inflation?
        </h2>

        <p>
          Inflation refers to the gradual increase in prices of goods and
          services over time. As inflation rises, the purchasing power of
          money decreases.
        </p>

        <p>
          This means you need more money in the future to buy the same
          things you can afford today.
        </p>

        <p className="font-medium">
          This calculator helps you understand how inflation affects
          your savings, expenses, and long-term financial planning.
        </p>
      </article>
    </section>
  );
}
