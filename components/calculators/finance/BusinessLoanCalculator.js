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

export default function BusinessLoanCalculator() {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("12");
  const [tenure, setTenure] = useState("5");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    if (!loanAmount || Number(loanAmount) <= 0) {
      setError("Please enter a valid loan amount.");
      return false;
    }

    if (!interestRate || Number(interestRate) <= 0) {
      setError("Please enter a valid interest rate.");
      return false;
    }

    if (!tenure || Number(tenure) <= 0) {
      setError("Please enter a valid loan tenure.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- EMI CALCULATION ---------------- */
  function calculateEMI(principal, rate, months) {
    return (
      (principal *
        rate *
        Math.pow(1 + rate, months)) /
      (Math.pow(1 + rate, months) - 1)
    );
  }

  /* ---------------- CALCULATE ---------------- */
  function calculateBusinessLoan(e) {
    e.preventDefault();
    if (!validate()) return;

    const principal = Number(loanAmount);
    const monthlyRate = Number(interestRate) / 12 / 100;
    const months = Number(tenure) * 12;

    const emi = calculateEMI(principal, monthlyRate, months);
    const totalPayable = emi * months;
    const interestPaid = totalPayable - principal;

    setResult({
      emi: Math.round(emi),
      totalPayable: Math.round(totalPayable),
      interestPaid: Math.round(interestPaid),
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
      <header>
        <h1 className="text-2xl font-bold mb-1">
          Business Loan Calculator
        </h1>
        <p className="text-sm leading-relaxed">
          Use this Business Loan Calculator to estimate EMI, total
          interest, and repayment amount for business loans.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateBusinessLoan} className="space-y-4">
        <AmountInput
          label="Loan Amount"
          value={loanAmount}
          onChange={setLoanAmount}
          placeholder="10,00,000"
        />

        <PercentageInput
          label="Interest Rate (% per annum)"
          value={interestRate}
          onChange={setInterestRate}
          placeholder="12"
        />

        <PercentageInput
          label="Loan Tenure (Years)"
          value={tenure}
          onChange={setTenure}
          placeholder="5"
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
          Calculate Business Loan EMI
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <div className="grid md:grid-cols-3 gap-4" aria-live="polite">
          <ResultCard
            variant="primary"
            icon={<Wallet size={20} />}
            label="Monthly EMI"
            value={`₹ ${result.emi.toLocaleString(
              "en-IN"
            )}`}
          />

          <ResultCard
            variant="neutral"
            icon={<IndianRupee size={20} />}
            label="Total Interest Payable"
            value={`₹ ${result.interestPaid.toLocaleString(
              "en-IN"
            )}`}
          />

          <ResultCard
            variant="warning"
            icon={<TrendingUp size={20} />}
            label="Total Amount Payable"
            value={`₹ ${result.totalPayable.toLocaleString(
              "en-IN"
            )}`}
          />
        </div>
      )}

      {/* ================= SEO BLOG CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          What is a Business Loan?
        </h2>

        <p>
          A business loan is a financial product offered by banks and
          NBFCs to help businesses meet working capital needs, expand
          operations, purchase equipment, or manage cash flow.
        </p>

        <p>
          Business loans are usually repaid through fixed monthly EMIs
          over a specified tenure at an agreed interest rate.
        </p>

        <h3 className="font-semibold">
          Business Loan EMI Formula
        </h3>

        <p
          className="font-mono text-xs p-3 rounded"
          style={{ backgroundColor: "var(--surface-2)" }}
        >
          EMI = [P × R × (1 + R)<sup>N</sup>] ÷ [(1 + R)<sup>N</sup> − 1]
        </p>

        <ul className="list-disc pl-5">
          <li><strong>P</strong> = Loan Amount</li>
          <li><strong>R</strong> = Monthly Interest Rate</li>
          <li><strong>N</strong> = Loan Tenure in Months</li>
        </ul>

        <h3 className="font-semibold">
          Why Use a Business Loan Calculator?
        </h3>

        <ul className="list-disc pl-5">
          <li>Plan monthly cash flow</li>
          <li>Estimate total loan cost</li>
          <li>Compare different loan offers</li>
          <li>Avoid over-borrowing</li>
        </ul>

        <p>
          This business loan calculator helps entrepreneurs and small
          business owners make informed borrowing decisions before
          applying for a loan.
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ This calculator provides an estimate only. Actual EMI and
        loan terms may vary based on lender policies and credit
        profile.
      </aside>
    </section>
  );
}
