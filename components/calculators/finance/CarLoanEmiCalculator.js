"use client";

import { useState } from "react";
import {
  Calendar,
  Calculator,
  Wallet,
  TrendingUp,
  IndianRupee,
  Car,
} from "lucide-react";

import { PercentageInput } from "../../inputs/PercentageInput";
import { AmountInput } from "../../inputs/AmountInput";
import { ResultCard } from "../../ResultCard";
import { InputField } from "../../inputs/InputField";

export default function CarLoanEmiCalculator() {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [tenureYears, setTenureYears] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION (CAR LOAN SPECIFIC) ---------------- */
  function validate() {
    if (!loanAmount || Number(loanAmount) <= 0) {
      setError("Please enter a valid car loan amount.");
      return false;
    }

    if (
      interestRate === "" ||
      Number(interestRate) < 0 ||
      Number(interestRate) > 20
    ) {
      setError("Car loan interest rate should be between 0% and 20%.");
      return false;
    }

    if (
      !tenureYears ||
      Number(tenureYears) < 1 ||
      Number(tenureYears) > 7
    ) {
      setError("Car loan tenure should be between 1 and 7 years.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- CALCULATION ---------------- */
  function calculateEMI(e) {
    e.preventDefault();

    if (!validate()) {
      setResult(null);
      return;
    }

    const P = Number(loanAmount);
    const annualRate = Number(interestRate);
    const years = Number(tenureYears);

    const n = years * 12;            // tenure in months
    const r = annualRate / 12 / 100; // monthly interest rate

    const emi =
      r === 0
        ? P / n
        : (P * r * Math.pow(1 + r, n)) /
          (Math.pow(1 + r, n) - 1);

    const totalPayment = emi * n;
    const totalInterest = totalPayment - P;

    setResult({
      emi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalPayment: Math.round(totalPayment),
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
      <header className="space-y-2">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Car size={22} />
          Car Loan EMI Calculator
        </h1>

        <p className="text-sm leading-relaxed">
          Calculate your car loan EMI, total interest payable, and total
          repayment amount. This calculator helps you plan your vehicle
          purchase efficiently before applying for a car loan.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateEMI} className="space-y-4">
        <AmountInput
          label="Car Loan Amount"
          value={loanAmount}
          onChange={setLoanAmount}
          placeholder="8,00,000"
          hasError={error.toLowerCase().includes("loan")}
        />

        <PercentageInput
          label="Interest Rate (per annum)"
          value={interestRate}
          onChange={setInterestRate}
          placeholder="9.5"
          hasError={error.toLowerCase().includes("interest")}
        />

        <InputField
          icon={<Calendar size={18} />}
          label="Loan Tenure (in years)"
          value={tenureYears}
          onChange={setTenureYears}
          placeholder="5"
          min={1}
          max={7}
          hasError={error.toLowerCase().includes("tenure")}
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
          Calculate EMI
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <div className="grid md:grid-cols-3 gap-4" aria-live="polite">
          <ResultCard
            variant="primary"
            icon={<Wallet size={20} />}
            label="Monthly EMI"
            value={`₹ ${result.emi.toLocaleString("en-IN")}`}
          />

          <ResultCard
            variant="warning"
            icon={<TrendingUp size={20} />}
            label="Total Interest Payable"
            value={`₹ ${result.totalInterest.toLocaleString("en-IN")}`}
          />

          <ResultCard
            variant="neutral"
            icon={<IndianRupee size={20} />}
            label="Total Amount Payable"
            value={`₹ ${result.totalPayment.toLocaleString("en-IN")}`}
          />
        </div>
      )}

      {/* ================= INFO (SEO CONTENT) ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          How Car Loan EMI is Calculated
        </h2>

        <p>
          Car loan EMI (Equated Monthly Installment) is calculated using a
          standard formula that considers the loan amount, interest rate,
          and loan tenure. Banks and NBFCs use this formula to determine
          your monthly repayment.
        </p>

        <p
          className="font-mono text-xs p-3 rounded"
          style={{ backgroundColor: "var(--surface-2)" }}
        >
          EMI = P × r × (1 + r)<sup>n</sup> / ((1 + r)<sup>n</sup> − 1)
        </p>

        <ul className="list-disc pl-5">
          <li><strong>P</strong> = Car Loan Amount</li>
          <li><strong>r</strong> = Monthly Interest Rate</li>
          <li><strong>n</strong> = Loan Tenure in Months</li>
        </ul>

        <p>
          Car loans usually have shorter tenures compared to home loans.
          Choosing a shorter tenure can significantly reduce the total
          interest payable.
        </p>
      </article>

      {/* ================= BENEFITS ================= */}
      <aside className="text-sm space-y-2">
        <h3 className="font-semibold">
          Why use this Car Loan EMI Calculator?
        </h3>
        <ul className="list-disc pl-5">
          <li>Plan your car purchase budget accurately</li>
          <li>Compare car loan offers easily</li>
          <li>Understand total interest cost clearly</li>
          <li>Instant, accurate, and free calculation</li>
        </ul>
      </aside>
    </section>
  );
}
