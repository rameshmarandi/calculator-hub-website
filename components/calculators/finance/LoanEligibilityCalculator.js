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

export default function LoanEligibilityCalculator() {
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [existingEMI, setExistingEMI] = useState("");
  const [interestRate, setInterestRate] = useState("9");
  const [tenure, setTenure] = useState("20");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    if (!monthlyIncome || Number(monthlyIncome) <= 0) {
      setError("Please enter a valid monthly income.");
      return false;
    }

    if (Number(existingEMI) < 0) {
      setError("Existing EMI cannot be negative.");
      return false;
    }

    if (Number(interestRate) <= 0) {
      setError("Please enter a valid interest rate.");
      return false;
    }

    if (Number(tenure) <= 0) {
      setError("Please enter a valid loan tenure.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- CALCULATION ---------------- */
  function calculateEligibility(e) {
    e.preventDefault();
    if (!validate()) return;

    const income = Number(monthlyIncome);
    const emiRunning = Number(existingEMI || 0);
    const rate = Number(interestRate) / 12 / 100;
    const months = Number(tenure) * 12;

    // Banks allow ~40% of income as EMI
    const maxAllowedEMI = income * 0.4;
    const availableEMI = maxAllowedEMI - emiRunning;

    if (availableEMI <= 0) {
      setResult({
        eligibleAmount: 0,
        emi: 0,
        message: "Not eligible due to high existing EMI.",
      });
      return;
    }

    // Loan eligibility formula
    const eligibleLoan =
      (availableEMI *
        (Math.pow(1 + rate, months) - 1)) /
      (rate * Math.pow(1 + rate, months));

    setResult({
      eligibleAmount: Math.round(eligibleLoan),
      emi: Math.round(availableEMI),
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
      {/* HEADER */}
      <header>
        <h1 className="text-2xl font-bold mb-1">
          Loan Eligibility Calculator
        </h1>
        <p className="text-sm leading-relaxed">
          Check how much loan amount you are eligible for based on
          income, EMI capacity, interest rate, and tenure.
        </p>
      </header>

      {/* FORM */}
      <form onSubmit={calculateEligibility} className="space-y-4">
        <AmountInput
          label="Monthly Income"
          value={monthlyIncome}
          onChange={setMonthlyIncome}
          placeholder="50,000"
        />

        <AmountInput
          label="Existing EMI (if any)"
          value={existingEMI}
          onChange={setExistingEMI}
          placeholder="5,000"
        />

        <PercentageInput
          label="Interest Rate (% per annum)"
          value={interestRate}
          onChange={setInterestRate}
          placeholder="9"
        />

        <PercentageInput
          label="Loan Tenure (Years)"
          value={tenure}
          onChange={setTenure}
          placeholder="20"
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
          Calculate Loan Eligibility
        </button>
      </form>

      {/* RESULT */}
      {result && (
        <div className="grid md:grid-cols-3 gap-4" aria-live="polite">
          <ResultCard
            variant="primary"
            icon={<IndianRupee size={20} />}
            label="Eligible Loan Amount"
            value={`₹ ${result.eligibleAmount.toLocaleString("en-IN")}`}
          />

          <ResultCard
            variant="neutral"
            icon={<Wallet size={20} />}
            label="Affordable Monthly EMI"
            value={`₹ ${result.emi.toLocaleString("en-IN")}`}
          />

          <ResultCard
            variant="warning"
            icon={<TrendingUp size={20} />}
            label="Loan Tenure"
            value={`${tenure} Years`}
          />
        </div>
      )}

      {/* SEO CONTENT */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          How Loan Eligibility Is Calculated
        </h2>

        <p>
          Loan eligibility refers to the maximum loan amount a bank or
          financial institution can offer based on your income and
          repayment capacity.
        </p>

        <p
          className="font-mono text-xs p-3 rounded"
          style={{ backgroundColor: "var(--surface-2)" }}
        >
          Eligible EMI ≈ 40% of Monthly Income − Existing EMI
        </p>

        <ul className="list-disc pl-5">
          <li>Banks usually allow up to 40% of income as EMI</li>
          <li>Existing EMIs reduce eligibility</li>
          <li>Lower interest rate increases loan amount</li>
          <li>Longer tenure improves eligibility</li>
        </ul>

        <p>
          This calculator gives an approximate loan eligibility.
          Actual loan approval depends on credit score, bank policy,
          and employment profile.
        </p>
      </article>

      {/* DISCLAIMER */}
      <aside className="text-xs text-muted">
        ⚠️ Results are indicative only. Final loan eligibility is
        subject to bank approval and credit assessment.
      </aside>
    </section>
  );
}
