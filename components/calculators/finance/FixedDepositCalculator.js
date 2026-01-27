"use client";

import { useState } from "react";
import {
  Calculator,
  Wallet,
  TrendingUp,
  IndianRupee,
  Calendar,
  Banknote,
} from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { PercentageInput } from "../../inputs/PercentageInput";
import { InputField } from "../../inputs/InputField";
import { ResultCard } from "../../ResultCard";

export default function FixedDepositCalculator() {
  const [depositAmount, setDepositAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [tenureYears, setTenureYears] = useState("");
  const [frequency, setFrequency] = useState("4"); // Quarterly default
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- BASIC VALIDATION ---------------- */
  function validate() {
    if (!depositAmount || Number(depositAmount) <= 0) {
      setError("Please enter a valid deposit amount.");
      return false;
    }

    if (
      interestRate === "" ||
      Number(interestRate) < 0 ||
      Number(interestRate) > 100
    ) {
      setError("Interest rate should be between 0% and 100%.");
      return false;
    }

    if (!tenureYears || Number(tenureYears) <= 0) {
      setError("Deposit tenure must be greater than 0.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- CALCULATION ---------------- */
  function calculateFD(e) {
    e.preventDefault();

    if (!validate()) {
      setResult(null);
      return;
    }

    const P = Number(depositAmount);
    const r = Number(interestRate) / 100;
    const t = Number(tenureYears);
    const n = Number(frequency);

    // Compound Interest formula for FD
    const maturityAmount = P * Math.pow(1 + r / n, n * t);
    const interestEarned = maturityAmount - P;

    setResult({
      principal: Math.round(P),
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
          <Banknote size={22} />
          Fixed Deposit Calculator
        </h1>

        <p className="text-sm leading-relaxed">
          Use this Fixed Deposit Calculator to estimate the maturity amount and
          interest earned on your FD investment based on deposit amount,
          interest rate, tenure, and compounding frequency.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateFD} className="space-y-4">
        <AmountInput
          label="Deposit Amount"
          value={depositAmount}
          onChange={setDepositAmount}
          placeholder="1,00,000"
          hasError={error.toLowerCase().includes("deposit")}
        />

        <PercentageInput
          label="Interest Rate (per annum)"
          value={interestRate}
          onChange={setInterestRate}
          placeholder="7.5"
          hasError={error.toLowerCase().includes("interest")}
        />

        <InputField
          icon={<Calendar size={18} />}
          label="Deposit Tenure (in years)"
          value={tenureYears}
          onChange={setTenureYears}
          placeholder="5"
          hasError={error.toLowerCase().includes("tenure")}
        />

        {/* Compounding Frequency */}
        <label className="block space-y-1">
          <span className="text-sm font-medium">
            Compounding Frequency
          </span>

          <select
            value={frequency}
            onChange={e => setFrequency(e.target.value)}
            className="w-full rounded-md px-3 py-2 border"
            style={{
              backgroundColor: "var(--surface-2)",
              borderColor: "var(--border)",
            }}
          >
            <option value="1">Yearly</option>
            <option value="2">Half-Yearly</option>
            <option value="4">Quarterly</option>
            <option value="12">Monthly</option>
          </select>
        </label>

        {/* Soft hint */}
        <p className="text-xs text-gray-500">
          Most bank FDs in India compound interest quarterly.
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
          Calculate FD Returns
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <div className="grid md:grid-cols-3 gap-4" aria-live="polite">
          <ResultCard
            variant="neutral"
            icon={<IndianRupee size={20} />}
            label="Deposit Amount"
            value={`₹ ${result.principal.toLocaleString("en-IN")}`}
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
          How Fixed Deposit Interest is Calculated
        </h2>

        <p>
          Fixed Deposit interest is calculated using compound interest,
          where interest earned is reinvested at regular intervals based on
          the chosen compounding frequency.
        </p>

        <p
          className="font-mono text-xs p-3 rounded"
          style={{ backgroundColor: "var(--surface-2)" }}
        >
          A = P × (1 + r / n)<sup>n × t</sup>
        </p>

        <ul className="list-disc pl-5">
          <li><strong>P</strong> = Deposit amount</li>
          <li><strong>r</strong> = Annual interest rate</li>
          <li><strong>n</strong> = Compounding frequency</li>
          <li><strong>t</strong> = Tenure in years</li>
        </ul>

        <p>
          Fixed Deposits are considered low-risk investments and are widely
          used for capital protection and predictable returns.
        </p>
      </article>

      {/* ================= BENEFITS ================= */}
      <aside className="text-sm space-y-2">
        <h3 className="font-semibold">
          Why use a Fixed Deposit Calculator?
        </h3>
        <ul className="list-disc pl-5">
          <li>Estimate FD maturity amount instantly</li>
          <li>Compare different interest rates and tenures</li>
          <li>Understand impact of compounding frequency</li>
          <li>Free, fast, and accurate</li>
        </ul>
      </aside>
    </section>
  );
}
