"use client";

import { useState } from "react";
import {
  Calculator,
  Wallet,
  TrendingUp,
  IndianRupee,
  Calendar,
  PieChart,
} from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { PercentageInput } from "../../inputs/PercentageInput";
import { InputField } from "../../inputs/InputField";
import { ResultCard } from "../../ResultCard";

export default function MutualFundReturnCalculator() {
  const [mode, setMode] = useState("sip"); // sip | lumpsum
  const [amount, setAmount] = useState("");
  const [annualReturn, setAnnualReturn] = useState("12");
  const [years, setYears] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    if (!amount || Number(amount) <= 0) {
      setError(
        mode === "sip"
          ? "Please enter a valid monthly SIP amount."
          : "Please enter a valid lumpsum investment amount."
      );
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

    if (!years || Number(years) <= 0) {
      setError("Investment duration must be greater than 0 years.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- CALCULATION ---------------- */
  function calculateReturns(e) {
    e.preventDefault();

    if (!validate()) {
      setResult(null);
      return;
    }

    const P = Number(amount);
    const r = Number(annualReturn) / 12 / 100;
    const n = Number(years) * 12;

    let invested = 0;
    let finalValue = 0;

    if (mode === "sip") {
      invested = P * n;

      finalValue =
        r === 0
          ? invested
          : P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    } else {
      invested = P;

      finalValue =
        r === 0
          ? invested
          : P * Math.pow(1 + annualReturn / 100, years);
    }

    const gains = finalValue - invested;

    setResult({
      invested: Math.round(invested),
      gains: Math.round(gains),
      finalValue: Math.round(finalValue),
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
          <PieChart size={22} />
          Mutual Fund Return Calculator
        </h1>

        <p className="text-sm leading-relaxed">
          Calculate expected returns from mutual fund investments using SIP
          or lumpsum method. This calculator helps you estimate future value,
          total investment, and wealth gained.
        </p>
      </header>

      {/* ================= MODE TOGGLE ================= */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setMode("sip")}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            mode === "sip"
              ? "bg-[var(--primary)] text-white"
              : "bg-[var(--surface-2)]"
          }`}
        >
          SIP
        </button>

        <button
          type="button"
          onClick={() => setMode("lumpsum")}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            mode === "lumpsum"
              ? "bg-[var(--primary)] text-white"
              : "bg-[var(--surface-2)]"
          }`}
        >
          Lumpsum
        </button>
      </div>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateReturns} className="space-y-4">
        <AmountInput
          label={
            mode === "sip"
              ? "Monthly SIP Amount"
              : "Lumpsum Investment Amount"
          }
          value={amount}
          onChange={setAmount}
          placeholder={mode === "sip" ? "5,000" : "1,00,000"}
          hasError={error.toLowerCase().includes("amount")}
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
          value={years}
          onChange={setYears}
          placeholder="10"
          hasError={error.toLowerCase().includes("duration")}
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
          Calculate Returns
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
            label="Final Value"
            value={`₹ ${result.finalValue.toLocaleString("en-IN")}`}
          />
        </div>
      )}

      {/* ================= INFO (SEO) ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          How Mutual Fund Returns are Calculated
        </h2>

        <p>
          Mutual fund returns depend on the investment amount, duration, and
          expected rate of return. SIP investments benefit from rupee cost
          averaging, while lumpsum investments benefit from early compounding.
        </p>

        <p
          className="font-mono text-xs p-3 rounded"
          style={{ backgroundColor: "var(--surface-2)" }}
        >
          SIP Future Value = P × ((1 + r)<sup>n</sup> − 1) / r × (1 + r)
        </p>
      </article>

      {/* ================= BENEFITS ================= */}
      <aside className="text-sm space-y-2">
        <h3 className="font-semibold">
          Why use a Mutual Fund Calculator?
        </h3>
        <ul className="list-disc pl-5">
          <li>Estimate future wealth easily</li>
          <li>Compare SIP vs Lumpsum returns</li>
          <li>Plan long-term financial goals</li>
          <li>Free, fast, and accurate</li>
        </ul>
      </aside>
    </section>
  );
}
