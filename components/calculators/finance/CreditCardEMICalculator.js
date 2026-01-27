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

export default function CreditCardEMICalculator() {
  const [purchaseAmount, setPurchaseAmount] = useState("");
  const [interestRate, setInterestRate] = useState("18");
  const [tenure, setTenure] = useState("12");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    if (!purchaseAmount || Number(purchaseAmount) <= 0) {
      setError("Please enter a valid purchase amount.");
      return false;
    }

    if (!interestRate || Number(interestRate) <= 0) {
      setError("Please enter a valid interest rate.");
      return false;
    }

    if (!tenure || Number(tenure) <= 0) {
      setError("Please enter a valid EMI tenure.");
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
  function calculateCreditCardEMI(e) {
    e.preventDefault();
    if (!validate()) return;

    const principal = Number(purchaseAmount);
    const monthlyRate = Number(interestRate) / 12 / 100;
    const months = Number(tenure);

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
      {/* HEADER */}
      <header>
        <h1 className="text-2xl font-bold mb-1">
          Credit Card EMI Calculator
        </h1>
        <p className="text-sm leading-relaxed">
          Calculate your monthly EMI, total payable amount, and
          interest for credit card purchases converted into EMI.
        </p>
      </header>

      {/* FORM */}
      <form onSubmit={calculateCreditCardEMI} className="space-y-4">
        <AmountInput
          label="Purchase Amount"
          value={purchaseAmount}
          onChange={setPurchaseAmount}
          placeholder="50,000"
        />

        <PercentageInput
          label="Interest Rate (% per annum)"
          value={interestRate}
          onChange={setInterestRate}
          placeholder="18"
        />

        <PercentageInput
          label="EMI Tenure (Months)"
          value={tenure}
          onChange={setTenure}
          placeholder="12"
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
          Calculate Credit Card EMI
        </button>
      </form>

      {/* RESULT */}
      {result && (
        <div className="grid md:grid-cols-3 gap-4" aria-live="polite">
          <ResultCard
            variant="primary"
            icon={<Wallet size={20} />}
            label="Monthly EMI"
            value={`₹ ${result.emi.toLocaleString("en-IN")}`}
          />

          <ResultCard
            variant="neutral"
            icon={<IndianRupee size={20} />}
            label="Total Amount Payable"
            value={`₹ ${result.totalPayable.toLocaleString(
              "en-IN"
            )}`}
          />

          <ResultCard
            variant="warning"
            icon={<TrendingUp size={20} />}
            label="Total Interest Paid"
            value={`₹ ${result.interestPaid.toLocaleString(
              "en-IN"
            )}`}
          />
        </div>
      )}

      {/* SEO CONTENT */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          How Credit Card EMI Is Calculated
        </h2>

        <p>
          Credit card EMI allows you to convert a high-value purchase
          into fixed monthly installments instead of paying the full
          amount upfront.
        </p>

        <p
          className="font-mono text-xs p-3 rounded"
          style={{ backgroundColor: "var(--surface-2)" }}
        >
          EMI = [P × R × (1 + R)<sup>N</sup>] ÷ [(1 + R)<sup>N</sup> − 1]
        </p>

        <ul className="list-disc pl-5">
          <li>P = Purchase Amount</li>
          <li>R = Monthly Interest Rate</li>
          <li>N = EMI Tenure (Months)</li>
        </ul>

        <p>
          Credit card EMI interest rates are usually higher than home
          or personal loans. Always compare EMI cost before opting
          for conversion.
        </p>
      </article>

      {/* DISCLAIMER */}
      <aside className="text-xs text-muted">
        ⚠️ Results are indicative only. Actual EMI may vary based on
        card issuer, processing fees, and promotional offers.
      </aside>
    </section>
  );
}
