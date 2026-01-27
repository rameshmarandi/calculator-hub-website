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

export default function EducationLoanRepaymentCalculator() {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("9");
  const [tenure, setTenure] = useState("10");

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
  function calculateEducationLoan(e) {
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
      interestPaid: Math.round(interestPaid),
      totalPayable: Math.round(totalPayable),
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
          Education Loan Repayment Calculator
        </h1>
        <p className="text-sm leading-relaxed">
          Use this Education Loan Repayment Calculator to estimate your
          monthly EMI, total interest, and overall repayment amount.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateEducationLoan} className="space-y-4">
        <AmountInput
          label="Education Loan Amount"
          value={loanAmount}
          onChange={setLoanAmount}
          placeholder="10,00,000"
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
          placeholder="10"
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
          Calculate Education Loan EMI
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
            label="Total Repayment Amount"
            value={`₹ ${result.totalPayable.toLocaleString(
              "en-IN"
            )}`}
          />
        </div>
      )}

      {/* ================= SEO BLOG CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          What is an Education Loan?
        </h2>

        <p>
          An education loan is a financial assistance provided by
          banks and NBFCs to help students fund higher education in
          India or abroad. Repayment usually begins after course
          completion.
        </p>

        <p>
          Education loans generally offer lower interest rates and
          longer repayment tenures compared to personal loans.
        </p>

        <h3 className="font-semibold">
          Education Loan EMI Formula
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
          Why Use an Education Loan Repayment Calculator?
        </h3>

        <ul className="list-disc pl-5">
          <li>Plan EMIs before repayment starts</li>
          <li>Understand total loan cost</li>
          <li>Compare education loan offers</li>
          <li>Avoid financial stress after graduation</li>
        </ul>

        <p>
          This education loan repayment calculator helps students and
          parents plan finances responsibly and choose the right loan
          tenure.
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ This calculator provides an estimate only. Actual EMI and
        repayment amount may vary based on lender policies and grace
        period terms.
      </aside>
    </section>
  );
}
