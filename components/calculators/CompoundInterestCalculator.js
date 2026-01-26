"use client";

import { useState } from "react";
import {
  Calculator,
  Wallet,
  TrendingUp,
  IndianRupee,
  Calendar,
  Percent,
} from "lucide-react";

import { AmountInput } from "../inputs/AmountInput";
import { PercentageInput } from "../inputs/PercentageInput";
import { InputField } from "../inputs/InputField";
import { ResultCard } from "../ResultCard";

export default function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [time, setTime] = useState("");
  const [frequency, setFrequency] = useState("1"); // yearly by default
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- BASIC VALIDATION ---------------- */
  function validate() {
    if (!principal || Number(principal) <= 0) {
      setError("Please enter a valid principal amount.");
      return false;
    }

    if (rate === "" || Number(rate) < 0 || Number(rate) > 100) {
      setError("Interest rate should be between 0% and 100%.");
      return false;
    }

    if (!time || Number(time) <= 0) {
      setError("Time period must be greater than 0.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- CALCULATION ---------------- */
  function calculateCompoundInterest(e) {
    e.preventDefault();

    if (!validate()) {
      setResult(null);
      return;
    }

    const P = Number(principal);
    const r = Number(rate) / 100;
    const t = Number(time);
    const n = Number(frequency);

    // Compound Interest Formula
    const amount = P * Math.pow(1 + r / n, n * t);
    const interest = amount - P;

    setResult({
      principal: Math.round(P),
      interest: Math.round(interest),
      amount: Math.round(amount),
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
      <header>
        <h1 className="text-2xl font-bold">
          Compound Interest Calculator
        </h1>

        <p className="text-sm leading-relaxed">
          Use this Compound Interest Calculator to calculate the total interest
          earned and final amount on an investment based on compounding
          frequency, interest rate, and time period.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateCompoundInterest} className="space-y-4">
        <AmountInput
          label="Principal Amount"
          value={principal}
          onChange={setPrincipal}
          placeholder="1,00,000"
          hasError={error.toLowerCase().includes("principal")}
        />

        <PercentageInput
          label="Interest Rate (per annum)"
          value={rate}
          onChange={setRate}
          placeholder="8"
          hasError={error.toLowerCase().includes("rate")}
        />

        <InputField
          icon={<Calendar size={18} />}
          label="Time Period (in years)"
          value={time}
          onChange={setTime}
          placeholder="10"
          hasError={error.toLowerCase().includes("time")}
        />

        {/* Compounding Frequency */}
        <label className="block space-y-1">
          <span className="text-sm font-medium flex items-center gap-2">
            <Percent size={16} />
            Compounding Frequency
          </span>

          <select
            value={frequency}
            onChange={e => setFrequency(e.target.value)}
            className="w-full rounded-md px-3 py-2 border"
            style={{
              backgroundColor: "var(--surface-2)",
              borderColor: "var(--border)",
            }}
          >
            <option value="1">Yearly</option>
            <option value="2">Half-Yearly</option>
            <option value="4">Quarterly</option>
            <option value="12">Monthly</option>
          </select>
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
          Calculate Interest
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <div className="grid md:grid-cols-3 gap-4" aria-live="polite">
          <ResultCard
            variant="neutral"
            icon={<IndianRupee size={20} />}
            label="Principal Amount"
            value={`₹ ${result.principal.toLocaleString("en-IN")}`}
          />

          <ResultCard
            variant="warning"
            icon={<TrendingUp size={20} />}
            label="Total Interest Earned"
            value={`₹ ${result.interest.toLocaleString("en-IN")}`}
          />

          <ResultCard
            variant="primary"
            icon={<Wallet size={20} />}
            label="Maturity Amount"
            value={`₹ ${result.amount.toLocaleString("en-IN")}`}
          />
        </div>
      )}

      {/* ================= INFO (SEO CONTENT) ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          How Compound Interest is Calculated
        </h2>

        <p>
          Compound interest is calculated on the initial principal as well as
          the accumulated interest from previous periods. The more frequently
          interest is compounded, the higher the returns.
        </p>

        <p
          className="font-mono text-xs p-3 rounded"
          style={{ backgroundColor: "var(--surface-2)" }}
        >
          A = P × (1 + r / n)<sup>n × t</sup>
        </p>

        <ul className="list-disc pl-5">
          <li><strong>P</strong> = Principal amount</li>
          <li><strong>r</strong> = Annual interest rate</li>
          <li><strong>n</strong> = Compounding frequency</li>
          <li><strong>t</strong> = Time period in years</li>
        </ul>

        <p>
          Compound interest plays a crucial role in long-term wealth creation,
          especially for investments like fixed deposits, mutual funds, and
          retirement savings.
        </p>
      </article>

      {/* ================= BENEFITS ================= */}
      <aside className="text-sm space-y-2">
        <h3 className="font-semibold">
          Why use a Compound Interest Calculator?
        </h3>
        <ul className="list-disc pl-5">
          <li>Understand the power of compounding</li>
          <li>Compare different compounding frequencies</li>
          <li>Plan long-term investments effectively</li>
          <li>Fast, accurate, and free</li>
        </ul>
      </aside>
    </section>
  );
}
