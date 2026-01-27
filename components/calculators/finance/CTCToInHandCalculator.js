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

export default function CTCToInHandCalculator() {
  const [ctc, setCtc] = useState("");
  const [basicPercent, setBasicPercent] = useState("40");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    if (!ctc || Number(ctc) <= 0) {
      setError("Please enter a valid annual CTC.");
      return false;
    }

    if (Number(basicPercent) <= 0 || Number(basicPercent) > 100) {
      setError("Basic salary percentage must be between 1 and 100.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- TAX CALCULATION (OLD REGIME) ---------------- */
  function calculateIncomeTax(taxableIncome) {
    let tax = 0;

    if (taxableIncome <= 250000) {
      tax = 0;
    } else if (taxableIncome <= 500000) {
      tax = (taxableIncome - 250000) * 0.05;
    } else if (taxableIncome <= 1000000) {
      tax = 12500 + (taxableIncome - 500000) * 0.2;
    } else {
      tax = 112500 + (taxableIncome - 1000000) * 0.3;
    }

    return tax + tax * 0.04; // 4% cess
  }

  /* ---------------- CALCULATION ---------------- */
  function calculateSalary(e) {
    e.preventDefault();
    if (!validate()) return;

    const annualCTC = Number(ctc);

    // Salary structure
    const basic = (annualCTC * Number(basicPercent)) / 100;
    const employeePF = basic * 0.12;
    const employerPF = basic * 0.12;

    // Gross salary (Employer PF removed from CTC)
    const grossSalary = annualCTC - employerPF;

    const standardDeduction = 50000;
    const professionalTax = 2500;

    const taxableIncome =
      grossSalary - employeePF - standardDeduction;

    const incomeTax = calculateIncomeTax(taxableIncome);

    const totalDeductions =
      employeePF + incomeTax + professionalTax;

    const annualInHand = grossSalary - totalDeductions;
    const monthlyInHand = annualInHand / 12;

    setResult({
      monthlyInHand: Math.round(monthlyInHand),
      annualInHand: Math.round(annualInHand),
      tax: Math.round(incomeTax),
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
          CTC to In Hand Calculator
        </h1>
        <p className="text-sm leading-relaxed">
          Calculate your monthly and annual in-hand salary from CTC
          after PF, income tax, and professional tax deductions.
        </p>
      </header>

      {/* FORM */}
      <form onSubmit={calculateSalary} className="space-y-4">
        <AmountInput
          label="Annual CTC"
          value={ctc}
          onChange={setCtc}
          placeholder="10,00,000"
        />

        <PercentageInput
          label="Basic Salary (% of CTC)"
          value={basicPercent}
          onChange={setBasicPercent}
          placeholder="40"
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
          Calculate In-Hand Salary
        </button>
      </form>

      {/* RESULT */}
      {result && (
        <div className="grid md:grid-cols-3 gap-4" aria-live="polite">
          <ResultCard
            variant="primary"
            icon={<Wallet size={20} />}
            label="Monthly In-Hand Salary"
            value={`₹ ${result.monthlyInHand.toLocaleString("en-IN")}`}
          />

          <ResultCard
            variant="neutral"
            icon={<IndianRupee size={20} />}
            label="Annual In-Hand Salary"
            value={`₹ ${result.annualInHand.toLocaleString("en-IN")}`}
          />

          <ResultCard
            variant="warning"
            icon={<TrendingUp size={20} />}
            label="Annual Income Tax"
            value={`₹ ${result.tax.toLocaleString("en-IN")}`}
          />
        </div>
      )}

      {/* SEO CONTENT */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          How CTC to In-Hand Salary Is Calculated
        </h2>

        <p>
          CTC (Cost to Company) includes basic salary, allowances,
          bonuses, and employer contributions like PF. In-hand salary
          is the actual amount credited to your bank account after all
          deductions.
        </p>

        <p
          className="font-mono text-xs p-3 rounded"
          style={{ backgroundColor: "var(--surface-2)" }}
        >
          In-Hand Salary = CTC − (Employer PF + Employee PF + Income Tax
          + Professional Tax)
        </p>

        <ul className="list-disc pl-5">
          <li>Employee PF = 12% of Basic Salary</li>
          <li>Employer PF is part of CTC but not paid monthly</li>
          <li>Standard Deduction = ₹50,000</li>
          <li>Professional Tax ≈ ₹2,500 per year</li>
        </ul>

        <p>
          This calculator uses the old income tax regime and provides a
          realistic estimate suitable for most salaried employees in
          India.
        </p>
      </article>

      {/* DISCLAIMER */}
      <aside className="text-xs text-muted">
        ⚠️ This calculator provides an estimate only. Actual in-hand
        salary may vary based on exemptions, bonuses, and company
        payroll structure.
      </aside>
    </section>
  );
}
