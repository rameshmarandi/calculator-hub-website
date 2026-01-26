"use client";

import { useState } from "react";
import {
  Calculator,
  Wallet,
  TrendingUp,
  IndianRupee,
  Calendar,
  Repeat,
} from "lucide-react";

import { AmountInput } from "../inputs/AmountInput";
import { PercentageInput } from "../inputs/PercentageInput";
import { InputField } from "../inputs/InputField";
import { ResultCard } from "../ResultCard";

export default function RecurringDepositCalculator() {
  const [monthlyDeposit, setMonthlyDeposit] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [tenureYears, setTenureYears] = useState("");
  const [frequency, setFrequency] = useState("4"); // Quarterly default
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- BASIC VALIDATION ---------------- */
  function validate() {
    if (!monthlyDeposit || Number(monthlyDeposit) <= 0) {
      setError("Please enter a valid monthly deposit amount.");
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
  function calculateRD(e) {
    e.preventDefault();

    if (!validate()) {
      setResult(null);
      return;
    }

    const P = Number(monthlyDeposit);
    const r = Number(interestRate) / 100;
    const t = Number(tenureYears);
    const n = Number(frequency);

    const months = t * 12;
    const monthlyRate = r / 12;

    let maturityAmount = 0;

    for (let i = 0; i < months; i++) {
      const remainingMonths = months - i;
      maturityAmount +=
        P * Math.pow(1 + monthlyRate / n * 12, (n * remainingMonths) / 12);
    }

    const totalInvestment = P * months;
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
          <Repeat size={22} />
          Recurring Deposit Calculator
        </h1>

        <p className="text-sm leading-relaxed">
          Use this Recurring Deposit Calculator to estimate the maturity amount
          and interest earned on your RD investment based on monthly deposit,
          interest rate, and tenure.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateRD} className="space-y-4">
        <AmountInput
          label="Monthly Deposit Amount"
          value={monthlyDeposit}
          onChange={setMonthlyDeposit}
          placeholder="5,000"
          hasError={error.toLowerCase().includes("monthly")}
        />

        <PercentageInput
          label="Interest Rate (per annum)"
          value={interestRate}
          onChange={setInterestRate}
          placeholder="7"
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

        {/* Soft guidance */}
        <p className="text-xs text-gray-500">
          Most Indian banks compound RD interest quarterly.
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
          Calculate RD Returns
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
          How Recurring Deposit Interest is Calculated
        </h2>

        <p>
          In a Recurring Deposit, a fixed amount is deposited every month.
          Each deposit earns interest for a different duration depending on
          when it was deposited.
        </p>

        <p
          className="font-mono text-xs p-3 rounded"
          style={{ backgroundColor: "var(--surface-2)" }}
        >
          Maturity = Σ [ Monthly Deposit × (1 + r / n)<sup>n × remaining time</sup> ]
        </p>

        <ul className="list-disc pl-5">
          <li><strong>P</strong> = Monthly deposit</li>
          <li><strong>r</strong> = Annual interest rate</li>
          <li><strong>n</strong> = Compounding frequency</li>
          <li><strong>t</strong> = Tenure in years</li>
        </ul>

        <p>
          RD is ideal for disciplined savers who want guaranteed returns
          with monthly investments.
        </p>
      </article>

      {/* ================= BENEFITS ================= */}
      <aside className="text-sm space-y-2">
        <h3 className="font-semibold">
          Why use a Recurring Deposit Calculator?
        </h3>
        <ul className="list-disc pl-5">
          <li>Estimate RD maturity instantly</li>
          <li>Understand interest accumulation month-wise</li>
          <li>Compare tenures and rates easily</li>
          <li>Free, accurate, and easy to use</li>
        </ul>
      </aside>
    </section>
  );
}
