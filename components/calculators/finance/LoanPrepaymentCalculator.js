"use client";

import { useState } from "react";
import {
  Calculator,
  Wallet,
  TrendingDown,
  IndianRupee,
} from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { PercentageInput } from "../../inputs/PercentageInput";
import { ResultCard } from "../../ResultCard";

export default function LoanPrepaymentCalculator() {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("9");
  const [tenure, setTenure] = useState("20");
  const [prepayment, setPrepayment] = useState("");

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

    if (!prepayment || Number(prepayment) <= 0) {
      setError("Please enter a valid prepayment amount.");
      return false;
    }

    if (Number(prepayment) >= Number(loanAmount)) {
      setError("Prepayment amount must be less than loan amount.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- EMI CALC ---------------- */
  function calculateEMI(principal, rate, months) {
    return (
      (principal *
        rate *
        Math.pow(1 + rate, months)) /
      (Math.pow(1 + rate, months) - 1)
    );
  }

  /* ---------------- CALCULATION ---------------- */
  function calculatePrepayment(e) {
    e.preventDefault();
    if (!validate()) return;

    const principal = Number(loanAmount);
    const rate = Number(interestRate) / 12 / 100;
    const months = Number(tenure) * 12;
    const prepay = Number(prepayment);

    const originalEMI = calculateEMI(principal, rate, months);
    const totalPayable = originalEMI * months;

    const newPrincipal = principal - prepay;
    const newEMI = calculateEMI(newPrincipal, rate, months);
    const newTotalPayable = newEMI * months;

    const interestSaved =
      totalPayable - newTotalPayable;

    setResult({
      originalEMI: Math.round(originalEMI),
      newEMI: Math.round(newEMI),
      interestSaved: Math.round(interestSaved),
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
          Loan Prepayment Calculator
        </h1>
        <p className="text-sm leading-relaxed">
          Calculate how much interest you can save by making a loan
          prepayment and how it impacts your EMI.
        </p>
      </header>

      {/* FORM */}
      <form onSubmit={calculatePrepayment} className="space-y-4">
        <AmountInput
          label="Loan Amount"
          value={loanAmount}
          onChange={setLoanAmount}
          placeholder="30,00,000"
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

        <AmountInput
          label="Prepayment Amount"
          value={prepayment}
          onChange={setPrepayment}
          placeholder="5,00,000"
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
          Calculate Prepayment Impact
        </button>
      </form>

      {/* RESULT */}
      {result && (
        <div className="grid md:grid-cols-3 gap-4" aria-live="polite">
          <ResultCard
            variant="neutral"
            icon={<Wallet size={20} />}
            label="Original EMI"
            value={`₹ ${result.originalEMI.toLocaleString("en-IN")}`}
          />

          <ResultCard
            variant="primary"
            icon={<IndianRupee size={20} />}
            label="New EMI After Prepayment"
            value={`₹ ${result.newEMI.toLocaleString("en-IN")}`}
          />

          <ResultCard
            variant="warning"
            icon={<TrendingDown size={20} />}
            label="Total Interest Saved"
            value={`₹ ${result.interestSaved.toLocaleString("en-IN")}`}
          />
        </div>
      )}

      {/* SEO CONTENT */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          How Loan Prepayment Helps You Save Money
        </h2>

        <p>
          Loan prepayment allows borrowers to reduce the outstanding
          principal by paying an extra amount over the regular EMI.
          This reduces the interest burden significantly.
        </p>

        <p
          className="font-mono text-xs p-3 rounded"
          style={{ backgroundColor: "var(--surface-2)" }}
        >
          Interest Saved = Total Interest (Before) − Total Interest
          (After Prepayment)
        </p>

        <ul className="list-disc pl-5">
          <li>Prepayment reduces principal immediately</li>
          <li>Lower principal means lower interest</li>
          <li>Early prepayment gives maximum benefit</li>
          <li>Most banks allow partial prepayment</li>
        </ul>

        <p>
          This calculator assumes EMI reduction after prepayment.
          Actual results may vary based on bank policy and loan type.
        </p>
      </article>

      {/* DISCLAIMER */}
      <aside className="text-xs text-muted">
        ⚠️ Results are indicative only. Actual savings may vary based
        on loan terms and bank policies.
      </aside>
    </section>
  );
}
