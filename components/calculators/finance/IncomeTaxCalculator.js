"use client";

import { useState } from "react";
import {
  Calculator,
  IndianRupee,
  Wallet,
  TrendingUp,
  Scale,
} from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { ResultCard } from "../../ResultCard";

export default function IncomeTaxCalculator() {
  const [annualIncome, setAnnualIncome] = useState("");
  const [regime, setRegime] = useState("new");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    if (!annualIncome || Number(annualIncome) <= 0) {
      setError("Please enter a valid annual income.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- TAX LOGIC ---------------- */
  function calculateTax(e) {
    e.preventDefault();

    if (!validate()) {
      setResult(null);
      return;
    }

    const income = Number(annualIncome);
    let tax = 0;

    if (regime === "new") {
      // New Tax Regime (FY 2024–25 simplified slabs)
      if (income <= 300000) tax = 0;
      else if (income <= 600000) tax = (income - 300000) * 0.05;
      else if (income <= 900000) tax = 15000 + (income - 600000) * 0.1;
      else if (income <= 1200000) tax = 45000 + (income - 900000) * 0.15;
      else if (income <= 1500000) tax = 90000 + (income - 1200000) * 0.2;
      else tax = 150000 + (income - 1500000) * 0.3;
    } else {
      // Old Tax Regime
      if (income <= 250000) tax = 0;
      else if (income <= 500000) tax = (income - 250000) * 0.05;
      else if (income <= 1000000)
        tax = 12500 + (income - 500000) * 0.2;
      else
        tax = 112500 + (income - 1000000) * 0.3;
    }

    const cess = tax * 0.04;
    const totalTax = tax + cess;
    const netIncome = income - totalTax;

    setResult({
      income,
      tax: Math.round(tax),
      cess: Math.round(cess),
      totalTax: Math.round(totalTax),
      netIncome: Math.round(netIncome),
    });
  }

  return (
    <section
      className="rounded-xl p-6 space-y-12"
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)",
      }}
    >
      {/* ================= HEADER ================= */}
      <header className="space-y-2">
        <h1 className="text-2xl font-bold">
          Income Tax Calculator (India)
        </h1>

        <p className="text-sm leading-relaxed">
          Use this Income Tax Calculator to estimate your income tax
          liability under the new and old tax regimes. This calculator
          helps you understand how much tax you need to pay and your
          take-home income after tax.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateTax} className="space-y-4">
        <AmountInput
          label="Annual Income"
          value={annualIncome}
          onChange={setAnnualIncome}
          placeholder="10,00,000"
          hasError={error.toLowerCase().includes("income")}
        />

        {/* Regime selector */}
        <label className="block space-y-1">
          <span className="text-sm font-medium">Tax Regime</span>
          <select
            value={regime}
            onChange={e => setRegime(e.target.value)}
            className="w-full rounded-md px-3 py-2 border"
            style={{
              backgroundColor: "var(--surface-2)",
              borderColor: "var(--border)",
            }}
          >
            <option value="new">New Tax Regime</option>
            <option value="old">Old Tax Regime</option>
          </select>
        </label>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          className="w-full py-2.5 rounded-md font-medium flex items-center justify-center gap-2"
          style={{ backgroundColor: "var(--primary)", color: "#fff" }}
        >
          <Calculator size={18} />
          Calculate Income Tax
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <div className="grid md:grid-cols-3 gap-4" aria-live="polite">
          <ResultCard
            variant="primary"
            icon={<Scale size={20} />}
            label="Income Tax"
            value={`₹ ${result.tax.toLocaleString("en-IN")}`}
          />

          <ResultCard
            variant="warning"
            icon={<TrendingUp size={20} />}
            label="Health & Education Cess (4%)"
            value={`₹ ${result.cess.toLocaleString("en-IN")}`}
          />

          <ResultCard
            variant="neutral"
            icon={<IndianRupee size={20} />}
            label="Total Tax Payable"
            value={`₹ ${result.totalTax.toLocaleString("en-IN")}`}
          />

          <ResultCard
            variant="success"
            icon={<Wallet size={20} />}
            label="Net Income After Tax"
            value={`₹ ${result.netIncome.toLocaleString("en-IN")}`}
          />
        </div>
      )}

      {/* ================= ARTICLE (SEO) ================= */}
      <article className="space-y-6 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          What is an Income Tax Calculator?
        </h2>

        <p>
          An income tax calculator helps you estimate the tax payable on
          your annual income based on the prevailing income tax slabs.
          It provides a quick way to understand how much tax you need
          to pay and your net income after taxes.
        </p>

        <h2 className="font-semibold text-base">
          Old vs New Tax Regime
        </h2>

        <p>
          The old tax regime allows deductions such as HRA, 80C, and 80D,
          while the new tax regime offers lower tax rates but removes
          most deductions. Choosing the right regime depends on your
          income structure and investments.
        </p>

        <h2 className="font-semibold text-base">
          How Income Tax is Calculated
        </h2>

        <pre
          className="text-xs p-3 rounded font-mono"
          style={{ backgroundColor: "var(--surface-2)" }}
        >
Tax = Slab-wise calculation  
Cess = Tax × 4%  
Total Tax = Tax + Cess
        </pre>

        <h2 className="font-semibold text-base">
          Why Use This Income Tax Calculator?
        </h2>

        <ul className="list-disc pl-5 space-y-1">
          <li>Instant tax estimation</li>
          <li>Compare old and new tax regimes</li>
          <li>Helps in salary and investment planning</li>
          <li>Free, accurate, and easy to use</li>
        </ul>

        <h2 className="font-semibold text-base">
          Who Should Use This Calculator?
        </h2>

        <p>
          This calculator is useful for salaried employees, freelancers,
          business owners, and anyone who wants to estimate income tax
          before filing returns.
        </p>
      </article>
    </section>
  );
}
