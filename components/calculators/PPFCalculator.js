"use client";

import { useState } from "react";
import {
  Calculator,
  Wallet,
  TrendingUp,
  IndianRupee,
  Calendar,
  ShieldCheck,
} from "lucide-react";

import { AmountInput } from "../inputs/AmountInput";
import { PercentageInput } from "../inputs/PercentageInput";
import { InputField } from "../inputs/InputField";
import { ResultCard } from "../ResultCard";

export default function PPFCalculator() {
  const [yearlyInvestment, setYearlyInvestment] = useState("");
  const [interestRate, setInterestRate] = useState("7.1"); // current PPF rate
  const [tenureYears, setTenureYears] = useState("15");   // default lock-in
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- BASIC VALIDATION ---------------- */
  function validate() {
    if (!yearlyInvestment || Number(yearlyInvestment) <= 0) {
      setError("Please enter a valid yearly investment amount.");
      return false;
    }

    if (
      interestRate === "" ||
      Number(interestRate) < 0 ||
      Number(interestRate) > 20
    ) {
      setError("PPF interest rate should be between 0% and 20%.");
      return false;
    }

    if (!tenureYears || Number(tenureYears) <= 0) {
      setError("PPF tenure must be greater than 0.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- CALCULATION ---------------- */
  function calculatePPF(e) {
    e.preventDefault();

    if (!validate()) {
      setResult(null);
      return;
    }

    const P = Number(yearlyInvestment);
    const r = Number(interestRate) / 100;
    const years = Number(tenureYears);

    let totalInvestment = 0;
    let maturityAmount = 0;

    /**
     * PPF formula logic:
     * Each yearly deposit earns interest till maturity
     */
    for (let i = 1; i <= years; i++) {
      maturityAmount += P * Math.pow(1 + r, years - i + 1);
      totalInvestment += P;
    }

    const interestEarned = maturityAmount - totalInvestment;

    setResult({
      invested: Math.round(totalInvestment),
      interest: Math.round(interestEarned),
      maturity: Math.round(maturityAmount),
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
          <ShieldCheck size={22} />
          PPF Calculator
        </h1>

        <p className="text-sm leading-relaxed">
          Use this PPF Calculator to estimate maturity amount, total investment,
          and interest earned on your Public Provident Fund investment.
          PPF is a government-backed, tax-saving investment scheme in India.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculatePPF} className="space-y-4">
        <AmountInput
          label="Yearly Investment Amount"
          value={yearlyInvestment}
          onChange={setYearlyInvestment}
          placeholder="1,50,000"
          hasError={error.toLowerCase().includes("yearly")}
        />

        <PercentageInput
          label="Interest Rate (per annum)"
          value={interestRate}
          onChange={setInterestRate}
          placeholder="7.1"
          hasError={error.toLowerCase().includes("interest")}
        />

        <InputField
          icon={<Calendar size={18} />}
          label="Investment Tenure (in years)"
          value={tenureYears}
          onChange={setTenureYears}
          placeholder="15"
          hasError={error.toLowerCase().includes("tenure")}
        />

        {/* PPF note */}
        <p className="text-xs text-gray-500">
          PPF has a minimum lock-in period of 15 years. Contributions can be
          extended in blocks of 5 years.
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
          Calculate PPF Returns
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
            label="Total Interest Earned"
            value={`₹ ${result.interest.toLocaleString("en-IN")}`}
          />

          <ResultCard
            variant="primary"
            icon={<Wallet size={20} />}
            label="Maturity Amount"
            value={`₹ ${result.maturity.toLocaleString("en-IN")}`}
          />
        </div>
      )}

      {/* ================= INFO (SEO CONTENT) ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          How PPF Interest is Calculated
        </h2>

        <p>
          Public Provident Fund (PPF) interest is compounded annually.
          Each yearly contribution earns interest till the end of the
          investment tenure.
        </p>

        <p
          className="font-mono text-xs p-3 rounded"
          style={{ backgroundColor: "var(--surface-2)" }}
        >
          Maturity = Σ [ Annual Investment × (1 + r)<sup>remaining years</sup> ]
        </p>

        <ul className="list-disc pl-5">
          <li><strong>P</strong> = Yearly investment amount</li>
          <li><strong>r</strong> = Annual interest rate</li>
          <li><strong>t</strong> = Investment tenure in years</li>
        </ul>

        <p>
          PPF falls under EEE (Exempt-Exempt-Exempt) category, meaning
          investment, interest, and maturity are tax-free under Section 80C.
        </p>
      </article>

      {/* ================= BENEFITS ================= */}
      <aside className="text-sm space-y-2">
        <h3 className="font-semibold">
          Why use a PPF Calculator?
        </h3>
        <ul className="list-disc pl-5">
          <li>Estimate tax-free maturity amount</li>
          <li>Plan long-term retirement savings</li>
          <li>Understand compounding benefits</li>
          <li>Government-backed & risk-free</li>
        </ul>
      </aside>
    </section>
  );
}
