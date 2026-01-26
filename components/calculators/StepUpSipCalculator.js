"use client";

import { useState } from "react";
import {
  Calendar,
  Calculator,
  Wallet,
  TrendingUp,
  IndianRupee,
  ArrowUpRight,
} from "lucide-react";

import { AmountInput } from "../inputs/AmountInput";
import { PercentageInput } from "../inputs/PercentageInput";
import { InputField } from "../inputs/InputField";
import { ResultCard } from "../ResultCard";

export default function StepUpSipCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState("");
  const [annualReturn, setAnnualReturn] = useState("");
  const [stepUpRate, setStepUpRate] = useState("");
  const [tenureYears, setTenureYears] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION (LOOSE) ---------------- */
  function validate() {
    if (!monthlyInvestment || Number(monthlyInvestment) <= 0) {
      setError("Please enter a valid monthly investment amount.");
      return false;
    }

    if (
      annualReturn === "" ||
      Number(annualReturn) < 0 ||
      Number(annualReturn) > 100
    ) {
      setError("Expected annual return should be between 0% and 100%.");
      return false;
    }

    if (
      stepUpRate === "" ||
      Number(stepUpRate) < 0 ||
      Number(stepUpRate) > 100
    ) {
      setError("Step-up rate should be between 0% and 100%.");
      return false;
    }

    if (!tenureYears || Number(tenureYears) <= 0) {
      setError("Investment duration must be greater than 0.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- CALCULATION ---------------- */
  function calculateStepUpSIP(e) {
    e.preventDefault();

    if (!validate()) {
      setResult(null);
      return;
    }

    const monthlyRate = Number(annualReturn) / 12 / 100;
    const stepUp = Number(stepUpRate) / 100;
    const years = Number(tenureYears);

    let totalInvestment = 0;
    let futureValue = 0;
    let monthlyAmount = Number(monthlyInvestment);

    for (let year = 1; year <= years; year++) {
      for (let month = 1; month <= 12; month++) {
        const remainingMonths = (years - year) * 12 + (12 - month + 1);
        futureValue +=
          monthlyAmount * Math.pow(1 + monthlyRate, remainingMonths);
        totalInvestment += monthlyAmount;
      }

      // Increase SIP amount at year end
      monthlyAmount += monthlyAmount * stepUp;
    }

    const totalGains = futureValue - totalInvestment;

    setResult({
      invested: Math.round(totalInvestment),
      gains: Math.round(totalGains),
      futureValue: Math.round(futureValue),
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
          <ArrowUpRight size={22} />
          Step-Up SIP Calculator
        </h1>

        <p className="text-sm leading-relaxed">
          Use this Step-Up SIP Calculator to estimate the future value of your
          investments when you increase your SIP amount every year. It helps
          you plan long-term wealth creation more effectively.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateStepUpSIP} className="space-y-4">
        <AmountInput
          label="Initial Monthly Investment"
          value={monthlyInvestment}
          onChange={setMonthlyInvestment}
          placeholder="5,000"
          hasError={error.toLowerCase().includes("investment")}
        />

        <PercentageInput
          label="Expected Annual Return (%)"
          value={annualReturn}
          onChange={setAnnualReturn}
          placeholder="12"
          hasError={error.toLowerCase().includes("return")}
        />

        <PercentageInput
          label="Annual Step-Up Rate (%)"
          value={stepUpRate}
          onChange={setStepUpRate}
          placeholder="10"
          hasError={error.toLowerCase().includes("step")}
        />

        <InputField
          icon={<Calendar size={18} />}
          label="Investment Duration (in years)"
          value={tenureYears}
          onChange={setTenureYears}
          placeholder="15"
          min={1}
          hasError={error.toLowerCase().includes("duration")}
        />

        {/* Soft guidance */}
        <p className="text-xs text-gray-500">
          A step-up of 5–10% annually helps align investments with income growth.
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
          Calculate Step-Up SIP
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
            label="Total Gains"
            value={`₹ ${result.gains.toLocaleString("en-IN")}`}
          />

          <ResultCard
            variant="primary"
            icon={<Wallet size={20} />}
            label="Future Value"
            value={`₹ ${result.futureValue.toLocaleString("en-IN")}`}
          />
        </div>
      )}

      {/* ================= INFO (SEO CONTENT) ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          How Step-Up SIP is Calculated
        </h2>

        <p>
          In a Step-Up SIP, your monthly investment amount increases by a fixed
          percentage every year. Each monthly investment grows at the expected
          rate of return until the end of the investment period.
        </p>

        <p
          className="font-mono text-xs p-3 rounded"
          style={{ backgroundColor: "var(--surface-2)" }}
        >
          FV = Σ [ SIP<sub>year</sub> × (1 + r)<sup>remaining months</sup> ]
        </p>

        <ul className="list-disc pl-5">
          <li><strong>SIP</strong> = Monthly investment amount</li>
          <li><strong>r</strong> = Monthly rate of return</li>
          <li><strong>Step-Up</strong> = Annual increment percentage</li>
        </ul>

        <p>
          Step-Up SIPs are ideal for investors expecting salary growth, as they
          help accelerate wealth creation without a large initial investment.
        </p>
      </article>

      {/* ================= BENEFITS ================= */}
      <aside className="text-sm space-y-2">
        <h3 className="font-semibold">
          Why use this Step-Up SIP Calculator?
        </h3>
        <ul className="list-disc pl-5">
          <li>Estimate returns with increasing SIP amounts</li>
          <li>Plan investments aligned with income growth</li>
          <li>Compare regular SIP vs Step-Up SIP</li>
          <li>Free, fast, and accurate calculation</li>
        </ul>
      </aside>
    </section>
  );
}
