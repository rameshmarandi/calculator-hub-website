"use client";

import { useState } from "react";
import {
  Calculator,
  Wallet,
  TrendingUp,
  TrendingDown,
  IndianRupee,
} from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { PercentageInput } from "../../inputs/PercentageInput";
import { ResultCard } from "../../ResultCard";

export default function HomeLoanVsRentCalculator() {
  const [propertyPrice, setPropertyPrice] = useState("");
  const [monthlyRent, setMonthlyRent] = useState("");
  const [interestRate, setInterestRate] = useState("9");
  const [tenure, setTenure] = useState("20");
  const [downPaymentPercent, setDownPaymentPercent] = useState("20");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    if (!propertyPrice || Number(propertyPrice) <= 0) {
      setError("Please enter a valid property price.");
      return false;
    }

    if (!monthlyRent || Number(monthlyRent) <= 0) {
      setError("Please enter a valid monthly rent.");
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

    if (
      Number(downPaymentPercent) <= 0 ||
      Number(downPaymentPercent) >= 100
    ) {
      setError("Down payment must be between 1% and 99%.");
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
  function calculateComparison(e) {
    e.preventDefault();
    if (!validate()) return;

    const price = Number(propertyPrice);
    const rent = Number(monthlyRent);
    const rate = Number(interestRate) / 12 / 100;
    const months = Number(tenure) * 12;
    const downPayment =
      price * (Number(downPaymentPercent) / 100);

    const loanAmount = price - downPayment;

    const emi = calculateEMI(loanAmount, rate, months);
    const totalEMIPaid = emi * months;

    const totalRentPaid = rent * months;

    const betterOption =
      totalEMIPaid < totalRentPaid
        ? "Buying a Home is Better"
        : "Renting is Better";

    setResult({
      emi: Math.round(emi),
      totalEMIPaid: Math.round(totalEMIPaid),
      totalRentPaid: Math.round(totalRentPaid),
      verdict: betterOption,
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
          Home Loan vs Rent Calculator
        </h1>
        <p className="text-sm leading-relaxed">
          Compare the total cost of buying a home with a home loan
          versus renting over the same period.
        </p>
      </header>

      {/* FORM */}
      <form onSubmit={calculateComparison} className="space-y-4">
        <AmountInput
          label="Property Price"
          value={propertyPrice}
          onChange={setPropertyPrice}
          placeholder="60,00,000"
        />

        <AmountInput
          label="Monthly Rent"
          value={monthlyRent}
          onChange={setMonthlyRent}
          placeholder="25,000"
        />

        <PercentageInput
          label="Home Loan Interest Rate (% p.a.)"
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

        <PercentageInput
          label="Down Payment (%)"
          value={downPaymentPercent}
          onChange={setDownPaymentPercent}
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
          Compare Buy vs Rent
        </button>
      </form>

      {/* RESULT */}
      {result && (
        <div className="grid md:grid-cols-4 gap-4" aria-live="polite">
          <ResultCard
            variant="neutral"
            icon={<Wallet size={20} />}
            label="Monthly Home Loan EMI"
            value={`₹ ${result.emi.toLocaleString("en-IN")}`}
          />

          <ResultCard
            variant="primary"
            icon={<IndianRupee size={20} />}
            label="Total EMI Paid"
            value={`₹ ${result.totalEMIPaid.toLocaleString("en-IN")}`}
          />

          <ResultCard
            variant="warning"
            icon={<TrendingDown size={20} />}
            label="Total Rent Paid"
            value={`₹ ${result.totalRentPaid.toLocaleString("en-IN")}`}
          />

          <ResultCard
            variant="success"
            icon={<TrendingUp size={20} />}
            label="Better Option"
            value={result.verdict}
          />
        </div>
      )}

      {/* SEO CONTENT */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          Should You Buy a Home or Rent?
        </h2>

        <p>
          The decision to buy a house or continue renting depends on
          multiple factors like property price, rent amount, loan
          interest rate, and tenure.
        </p>

        <p
          className="font-mono text-xs p-3 rounded"
          style={{ backgroundColor: "var(--surface-2)" }}
        >
          Total Buying Cost = EMI × Loan Tenure  
          Total Renting Cost = Monthly Rent × Same Period
        </p>

        <ul className="list-disc pl-5">
          <li>Buying builds long-term ownership</li>
          <li>Renting offers flexibility</li>
          <li>Lower interest favors buying</li>
          <li>High property prices favor renting</li>
        </ul>

        <p>
          This calculator gives a cost-based comparison. Lifestyle,
          mobility, and investment returns should also be considered
          before making a decision.
        </p>
      </article>

      {/* DISCLAIMER */}
      <aside className="text-xs text-muted">
        ⚠️ This comparison is indicative only. Actual costs may vary
        based on property appreciation, maintenance, and tax benefits.
      </aside>
    </section>
  );
}
