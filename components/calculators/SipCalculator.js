"use client";

import { useState } from "react";
import {
  Calendar,
  Calculator,
  Wallet,
  TrendingUp,
  IndianRupee,
  LineChart,
} from "lucide-react";

import { AmountInput } from "../inputs/AmountInput";
import { PercentageInput } from "../inputs/PercentageInput";
import { InputField } from "../inputs/InputField";
import { ResultCard } from "../ResultCard";

export default function SipCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState("");
  const [annualReturn, setAnnualReturn] = useState("");
  const [tenureYears, setTenureYears] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION (LOOSE & FRIENDLY) ---------------- */
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

    if (!tenureYears || Number(tenureYears) <= 0) {
      setError("Investment duration must be greater than 0.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- CALCULATION ---------------- */
  function calculateSIP(e) {
    e.preventDefault();

    if (!validate()) {
      setResult(null);
      return;
    }

    const P = Number(monthlyInvestment);
    const annualRate = Number(annualReturn);
    const years = Number(tenureYears);

    const n = years * 12;           // number of months
    const r = annualRate / 12 / 100; // monthly rate

    // SIP formula
    const futureValue =
      r === 0
        ? P * n
        : P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);

    const totalInvestment = P * n;
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
          <LineChart size={22} />
          SIP Calculator
        </h1>

        <p className="text-sm leading-relaxed">
          Use this SIP Calculator to estimate the future value of your
          Systematic Investment Plan. Calculate total investment,
          expected returns, and wealth gained over time.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateSIP} className="space-y-4">
        <AmountInput
          label="Monthly Investment"
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

        <InputField
          icon={<Calendar size={18} />}
          label="Investment Duration (in years)"
          value={tenureYears}
          onChange={setTenureYears}
          placeholder="10"
          min={1}
          hasError={error.toLowerCase().includes("duration")}
        />

        {/* Soft guidance */}
        <p className="text-xs text-gray-500">
          Typical equity SIP returns range between 10% to 15% annually over
          long periods.
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
          Calculate SIP Returns
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
          How SIP Returns are Calculated
        </h2>

        <p>
          SIP (Systematic Investment Plan) allows you to invest a fixed amount
          regularly in mutual funds. The future value of SIP investments is
          calculated using a compound interest formula that considers monthly
          investments and expected rate of return.
        </p>

        <p
          className="font-mono text-xs p-3 rounded"
          style={{ backgroundColor: "var(--surface-2)" }}
        >
          FV = P × ((1 + r)<sup>n</sup> − 1) / r × (1 + r)
        </p>

        <ul className="list-disc pl-5">
          <li><strong>P</strong> = Monthly SIP amount</li>
          <li><strong>r</strong> = Monthly rate of return</li>
          <li><strong>n</strong> = Total number of months</li>
        </ul>

        <p>
          SIPs benefit from compounding and rupee cost averaging, making them
          a popular long-term investment option for wealth creation.
        </p>
      </article>

      {/* ================= BENEFITS ================= */}
      <aside className="text-sm space-y-2">
        <h3 className="font-semibold">
          Why use this SIP Calculator?
        </h3>
        <ul className="list-disc pl-5">
          <li>Estimate long-term wealth creation</li>
          <li>Plan monthly investments smartly</li>
          <li>Compare different investment durations</li>
          <li>Free, fast, and accurate calculation</li>
        </ul>
      </aside>
    </section>
  );
}
