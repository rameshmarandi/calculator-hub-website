"use client";

import { useState } from "react";
import {
  Calculator,
  Wallet,
  TrendingUp,
  IndianRupee,
  Calendar,
  Shield,
} from "lucide-react";

import { AmountInput } from "../inputs/AmountInput";
import { PercentageInput } from "../inputs/PercentageInput";
import { InputField } from "../inputs/InputField";
import { ResultCard } from "../ResultCard";

export default function NpsCalculator() {
  const [monthlyContribution, setMonthlyContribution] = useState("");
  const [annualReturn, setAnnualReturn] = useState("10");
  const [currentAge, setCurrentAge] = useState("");
  const [retirementAge, setRetirementAge] = useState("60");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    if (!monthlyContribution || Number(monthlyContribution) <= 0) {
      setError("Please enter a valid monthly contribution.");
      return false;
    }

    if (
      annualReturn === "" ||
      Number(annualReturn) < 0 ||
      Number(annualReturn) > 100
    ) {
      setError("Expected return should be between 0% and 100%.");
      return false;
    }

    if (!currentAge || Number(currentAge) <= 0) {
      setError("Please enter a valid current age.");
      return false;
    }

    if (
      !retirementAge ||
      Number(retirementAge) <= Number(currentAge)
    ) {
      setError("Retirement age must be greater than current age.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- CALCULATION ---------------- */
  function calculateNPS(e) {
    e.preventDefault();

    if (!validate()) {
      setResult(null);
      return;
    }

    const P = Number(monthlyContribution);
    const r = Number(annualReturn) / 12 / 100;
    const years = Number(retirementAge) - Number(currentAge);
    const months = years * 12;

    // SIP-style compounding (monthly)
    const corpus =
      r === 0
        ? P * months
        : P * ((Math.pow(1 + r, months) - 1) / r) * (1 + r);

    const totalInvestment = P * months;
    const totalGains = corpus - totalInvestment;

    setResult({
      invested: Math.round(totalInvestment),
      gains: Math.round(totalGains),
      corpus: Math.round(corpus),
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
      <header>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Shield size={22} />
          NPS Calculator
        </h1>

        <p className="text-sm leading-relaxed">
          Use this NPS Calculator to estimate your retirement corpus based on
          monthly contribution, expected returns, and retirement age.
          National Pension System (NPS) is a government-backed retirement scheme.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateNPS} className="space-y-4">
        <AmountInput
          label="Monthly Contribution"
          value={monthlyContribution}
          onChange={setMonthlyContribution}
          placeholder="5,000"
          hasError={error.toLowerCase().includes("monthly")}
        />

        <PercentageInput
          label="Expected Annual Return (%)"
          value={annualReturn}
          onChange={setAnnualReturn}
          placeholder="10"
          hasError={error.toLowerCase().includes("return")}
        />

        <InputField
          icon={<Calendar size={18} />}
          label="Current Age"
          value={currentAge}
          onChange={setCurrentAge}
          placeholder="30"
          hasError={error.toLowerCase().includes("current")}
        />

        <InputField
          icon={<Calendar size={18} />}
          label="Retirement Age"
          value={retirementAge}
          onChange={setRetirementAge}
          placeholder="60"
          hasError={error.toLowerCase().includes("retirement")}
        />

        {/* Soft hint */}
        <p className="text-xs text-gray-500">
          NPS allows contribution till age 70. Typical retirement age is 60.
        </p>

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
          Calculate NPS Corpus
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <div className="grid md:grid-cols-3 gap-4" aria-live="polite">
          <ResultCard
            variant="neutral"
            icon={<IndianRupee size={20} />}
            label="Total Investment"
            value={`₹ ${result.invested.toLocaleString("en-IN")}`}
          />

          <ResultCard
            variant="warning"
            icon={<TrendingUp size={20} />}
            label="Total Returns"
            value={`₹ ${result.gains.toLocaleString("en-IN")}`}
          />

          <ResultCard
            variant="primary"
            icon={<Wallet size={20} />}
            label="Retirement Corpus"
            value={`₹ ${result.corpus.toLocaleString("en-IN")}`}
          />
        </div>
      )}

      {/* ================= INFO (SEO) ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          How NPS Returns are Calculated
        </h2>

        <p>
          NPS works like a long-term SIP where you invest regularly until
          retirement. Each monthly contribution grows based on market-linked
          returns and compounds over time.
        </p>

        <p
          className="font-mono text-xs p-3 rounded"
          style={{ backgroundColor: "var(--surface-2)" }}
        >
          Corpus = SIP × ((1 + r)<sup>n</sup> − 1) / r × (1 + r)
        </p>

        <p>
          At retirement, up to 60% of the corpus can be withdrawn tax-free,
          while 40% is used to purchase an annuity.
        </p>
      </article>

      {/* ================= BENEFITS ================= */}
      <aside className="text-sm space-y-2">
        <h3 className="font-semibold">
          Why use an NPS Calculator?
        </h3>
        <ul className="list-disc pl-5">
          <li>Estimate retirement corpus early</li>
          <li>Plan long-term pension savings</li>
          <li>Understand power of compounding</li>
          <li>Government-backed & tax-efficient</li>
        </ul>
      </aside>
    </section>
  );
}
