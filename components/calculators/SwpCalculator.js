"use client";

import { useState } from "react";
import {
  Calculator,
  Wallet,
  TrendingDown,
  IndianRupee,
  Repeat,
} from "lucide-react";

import { AmountInput } from "../inputs/AmountInput";
import { PercentageInput } from "../inputs/PercentageInput";
import { ResultCard } from "../ResultCard";

export default function SwpCalculator() {
  const [initialInvestment, setInitialInvestment] = useState("");
  const [monthlyWithdrawal, setMonthlyWithdrawal] = useState("");
  const [annualReturn, setAnnualReturn] = useState("8");
  const [years, setYears] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    if (!initialInvestment || Number(initialInvestment) <= 0) {
      setError("Please enter a valid initial investment amount.");
      return false;
    }

    if (!monthlyWithdrawal || Number(monthlyWithdrawal) <= 0) {
      setError("Please enter a valid monthly withdrawal amount.");
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

    if (!years || Number(years) <= 0) {
      setError("Withdrawal duration must be greater than 0 years.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- CALCULATION ---------------- */
  function calculateSWP(e) {
    e.preventDefault();

    if (!validate()) {
      setResult(null);
      return;
    }

    let balance = Number(initialInvestment);
    const withdrawal = Number(monthlyWithdrawal);
    const r = Number(annualReturn) / 12 / 100;
    const months = Number(years) * 12;

    let totalWithdrawn = 0;

    for (let i = 0; i < months; i++) {
      if (balance <= 0) break;

      balance = balance * (1 + r) - withdrawal;
      totalWithdrawn += withdrawal;
    }

    setResult({
      invested: Number(initialInvestment),
      withdrawn: Math.round(totalWithdrawn),
      finalBalance: Math.max(0, Math.round(balance)),
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
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Repeat size={22} />
          SWP Calculator
        </h1>

        <p className="text-sm leading-relaxed">
          Calculate how long your investment will last when you withdraw a
          fixed amount every month. Ideal for retirement income and passive
          cash flow planning.
        </p>
      </header>

      {/* FORM */}
      <form onSubmit={calculateSWP} className="space-y-4">
        <AmountInput
          label="Initial Investment"
          value={initialInvestment}
          onChange={setInitialInvestment}
          placeholder="10,00,000"
        />

        <AmountInput
          label="Monthly Withdrawal Amount"
          value={monthlyWithdrawal}
          onChange={setMonthlyWithdrawal}
          placeholder="10,000"
        />

        <PercentageInput
          label="Expected Annual Return (%)"
          value={annualReturn}
          onChange={setAnnualReturn}
          placeholder="8"
        />

        {/* ✅ Correct input for YEARS */}
        <label className="block space-y-1">
          <span className="text-sm font-medium">
            Withdrawal Duration (Years)
          </span>
          <input
            type="number"
            value={years}
            onChange={e => setYears(e.target.value)}
            placeholder="15"
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
          Calculate SWP
        </button>
      </form>

      {/* RESULT */}
      {result && (
        <div className="grid md:grid-cols-3 gap-4">
          <ResultCard
            variant="neutral"
            icon={<IndianRupee size={20} />}
            label="Initial Investment"
            value={`₹ ${result.invested.toLocaleString("en-IN")}`}
          />

          <ResultCard
            variant="warning"
            icon={<TrendingDown size={20} />}
            label="Total Withdrawn"
            value={`₹ ${result.withdrawn.toLocaleString("en-IN")}`}
          />

          <ResultCard
            variant="primary"
            icon={<Wallet size={20} />}
            label="Final Balance"
            value={`₹ ${result.finalBalance.toLocaleString("en-IN")}`}
          />
        </div>
      )}
    </section>
  );
}
