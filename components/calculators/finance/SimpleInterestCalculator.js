"use client";

import { useState } from "react";
import {
  Calculator,
  Wallet,
  TrendingUp,
  IndianRupee,
  Calendar,
} from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { PercentageInput } from "../../inputs/PercentageInput";
import { InputField } from "../../inputs/InputField";
import { ResultCard } from "../../ResultCard";

export default function SimpleInterestCalculator() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [time, setTime] = useState("");
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
  function calculateSimpleInterest(e) {
    e.preventDefault();

    if (!validate()) {
      setResult(null);
      return;
    }

    const P = Number(principal);
    const r = Number(rate) / 100;
    const t = Number(time);

    // Simple Interest Formula
    const interest = P * r * t;
    const totalAmount = P + interest;

    setResult({
      principal: Math.round(P),
      interest: Math.round(interest),
      total: Math.round(totalAmount),
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
          Simple Interest Calculator
        </h1>

        <p className="text-sm leading-relaxed">
          Use this Simple Interest Calculator to calculate the interest earned
          and total amount payable based on principal amount, interest rate,
          and time period.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateSimpleInterest} className="space-y-4">
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
          placeholder="10"
          hasError={error.toLowerCase().includes("interest")}
        />

        <InputField
          icon={<Calendar size={18} />}
          label="Time Period (in years)"
          value={time}
          onChange={setTime}
          placeholder="5"
          hasError={error.toLowerCase().includes("time")}
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
            label="Total Interest"
            value={`₹ ${result.interest.toLocaleString("en-IN")}`}
          />

          <ResultCard
            variant="primary"
            icon={<Wallet size={20} />}
            label="Total Amount"
            value={`₹ ${result.total.toLocaleString("en-IN")}`}
          />
        </div>
      )}

      {/* ================= INFO (SEO CONTENT) ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          How Simple Interest is Calculated
        </h2>

        <p>
          Simple interest is calculated only on the original principal amount
          for the entire duration of the investment or loan. Unlike compound
          interest, it does not earn interest on accumulated interest.
        </p>

        <p
          className="font-mono text-xs p-3 rounded"
          style={{ backgroundColor: "var(--surface-2)" }}
        >
          Simple Interest = P × r × t
        </p>

        <ul className="list-disc pl-5">
          <li><strong>P</strong> = Principal amount</li>
          <li><strong>r</strong> = Annual interest rate</li>
          <li><strong>t</strong> = Time period in years</li>
        </ul>

        <p>
          Simple interest is commonly used for short-term loans, personal
          borrowings, and basic financial calculations.
        </p>
      </article>

      {/* ================= BENEFITS ================= */}
      <aside className="text-sm space-y-2">
        <h3 className="font-semibold">
          Why use a Simple Interest Calculator?
        </h3>
        <ul className="list-disc pl-5">
          <li>Quickly calculate interest for short-term investments</li>
          <li>Understand difference between simple and compound interest</li>
          <li>Plan repayments or returns easily</li>
          <li>Fast, accurate, and free</li>
        </ul>
      </aside>
    </section>
  );
}
