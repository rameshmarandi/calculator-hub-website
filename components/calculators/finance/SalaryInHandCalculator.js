"use client";

import { useState } from "react";
import {
  Calculator,
  Wallet,
  TrendingUp,
  IndianRupee,
  Percent,
} from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { PercentageInput } from "../../inputs/PercentageInput";
import { ResultCard } from "../../ResultCard";

export default function SalaryInHandCalculator() {
  const [ctc, setCtc] = useState("");
  const [basicPercent, setBasicPercent] = useState("40");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    if (!ctc || Number(ctc) <= 0) {
      setError("Please enter a valid CTC amount.");
      return false;
    }

    if (
      basicPercent === "" ||
      Number(basicPercent) <= 0 ||
      Number(basicPercent) > 100
    ) {
      setError("Basic salary percentage must be between 1% and 100%.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- CALCULATION ---------------- */
  function calculateSalary(e) {
    e.preventDefault();

    if (!validate()) {
      setResult(null);
      return;
    }

    const annualCTC = Number(ctc);
    const basic = (annualCTC * Number(basicPercent)) / 100;

    // Employee PF = 12% of Basic
    const employeePF = basic * 0.12;

    // Standard Deduction
    const standardDeduction = 50000;

    // Taxable income
    const taxableIncome =
      annualCTC - employeePF - standardDeduction;

    // Income Tax (Old Regime – simplified)
    let incomeTax = 0;

    if (taxableIncome <= 250000) {
      incomeTax = 0;
    } else if (taxableIncome <= 500000) {
      incomeTax = (taxableIncome - 250000) * 0.05;
    } else if (taxableIncome <= 1000000) {
      incomeTax =
        12500 + (taxableIncome - 500000) * 0.2;
    } else {
      incomeTax =
        112500 + (taxableIncome - 1000000) * 0.3;
    }

    // Professional tax (average)
    const professionalTax = 2500;

    const totalDeductions =
      employeePF + incomeTax + professionalTax;

    const annualInHand = annualCTC - totalDeductions;
    const monthlyInHand = annualInHand / 12;

    setResult({
      basic: Math.round(basic),
      pf: Math.round(employeePF),
      tax: Math.round(incomeTax),
      annualInHand: Math.round(annualInHand),
      monthlyInHand: Math.round(monthlyInHand),
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
          Salary In Hand Calculator
        </h1>

        <p className="text-sm leading-relaxed">
          Use this Salary In Hand Calculator to estimate your monthly
          and annual take-home salary from CTC after tax, PF, and
          standard deductions.
        </p>
      </header>

      {/* FORM */}
      <form onSubmit={calculateSalary} className="space-y-4">
        <AmountInput
          label="Annual CTC"
          value={ctc}
          onChange={setCtc}
          placeholder="10,00,000"
          hasError={error.toLowerCase().includes("ctc")}
        />

        <PercentageInput
          label="Basic Salary (% of CTC)"
          value={basicPercent}
          onChange={setBasicPercent}
          placeholder="40"
        />

        {error && (
          <p className="text-sm text-red-500">
            {error}
          </p>
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
          Calculate Salary In Hand
        </button>
      </form>

      {/* RESULT */}
      {result && (
        <div className="grid md:grid-cols-3 gap-4" aria-live="polite">
          <ResultCard
            variant="primary"
            icon={<Wallet size={20} />}
            label="Monthly In-Hand Salary"
            value={`₹ ${result.monthlyInHand.toLocaleString(
              "en-IN"
            )}`}
          />

          <ResultCard
            variant="neutral"
            icon={<IndianRupee size={20} />}
            label="Annual In-Hand Salary"
            value={`₹ ${result.annualInHand.toLocaleString(
              "en-IN"
            )}`}
          />

          <ResultCard
            variant="warning"
            icon={<TrendingUp size={20} />}
            label="Annual Income Tax"
            value={`₹ ${result.tax.toLocaleString("en-IN")}`}
          />
        </div>
      )}

      {/* SEO / ARTICLE SECTION */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          How Salary In Hand is Calculated
        </h2>

        <p>
          Salary In Hand (also known as take-home salary) is the actual
          amount credited to your bank account after deducting
          provident fund, income tax, and professional tax from your
          CTC.
        </p>

        <p className="font-mono text-xs p-3 rounded"
          style={{ backgroundColor: "var(--surface-2)" }}
        >
          Salary In Hand = CTC − (PF + Income Tax + Professional Tax)
        </p>

        <ul className="list-disc pl-5">
          <li>
            <strong>Basic Salary</strong> = CTC × Basic %
          </li>
          <li>
            <strong>Employee PF</strong> = 12% of Basic
          </li>
          <li>
            <strong>Standard Deduction</strong> = ₹50,000
          </li>
          <li>
            <strong>Professional Tax</strong> ≈ ₹2,500 / year
          </li>
        </ul>

        <p>
          This calculator uses the old income tax regime for
          estimation. Actual take-home salary may vary based on
          exemptions, bonuses, and company salary structure.
        </p>
      </article>

      {/* DISCLAIMER */}
      <aside className="text-xs text-muted">
        <p>
          ⚠️ This calculator provides an estimate only. Actual salary
          may differ based on tax regime, exemptions, HRA, and company
          payroll policies.
        </p>
      </aside>
    </section>
  );
}
