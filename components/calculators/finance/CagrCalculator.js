"use client";

import { useState } from "react";
import {
  Calculator,
  TrendingUp,
  IndianRupee,
  Calendar,
  LineChart,
} from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { PercentageInput } from "../../inputs/PercentageInput";
import { InputField } from "../../inputs/InputField";
import { ResultCard } from "../../ResultCard";

export default function CagrCalculator() {
  const [initialValue, setInitialValue] = useState("");
  const [finalValue, setFinalValue] = useState("");
  const [years, setYears] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    if (!initialValue || Number(initialValue) <= 0) {
      setError("Please enter a valid initial investment value.");
      return false;
    }

    if (!finalValue || Number(finalValue) <= 0) {
      setError("Please enter a valid final value.");
      return false;
    }

    if (Number(finalValue) <= Number(initialValue)) {
      setError("Final value should be greater than initial value.");
      return false;
    }

    if (!years || Number(years) <= 0) {
      setError("Time period must be greater than 0 years.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- CALCULATION ---------------- */
  function calculateCAGR(e) {
    e.preventDefault();

    if (!validate()) {
      setResult(null);
      return;
    }

    const start = Number(initialValue);
    const end = Number(finalValue);
    const t = Number(years);

    const cagr = (Math.pow(end / start, 1 / t) - 1) * 100;
    const absoluteGrowth = end - start;

    setResult({
      cagr: cagr.toFixed(2),
      growth: Math.round(absoluteGrowth),
      years: t,
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
          <LineChart size={22} />
          CAGR Calculator
        </h1>

        <p className="text-sm leading-relaxed">
          Use this CAGR Calculator to measure the annual growth rate of an
          investment over a specific period. CAGR gives you the true annual
          return assuming steady growth.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateCAGR} className="space-y-4">
        <AmountInput
          label="Initial Investment Value"
          value={initialValue}
          onChange={setInitialValue}
          placeholder="1,00,000"
          hasError={error.toLowerCase().includes("initial")}
        />

        <AmountInput
          label="Final Investment Value"
          value={finalValue}
          onChange={setFinalValue}
          placeholder="2,50,000"
          hasError={error.toLowerCase().includes("final")}
        />

        <InputField
          icon={<Calendar size={18} />}
          label="Investment Duration (in years)"
          value={years}
          onChange={setYears}
          placeholder="5"
          hasError={error.toLowerCase().includes("period")}
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
          Calculate CAGR
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <div className="grid md:grid-cols-3 gap-4" aria-live="polite">
          <ResultCard
            variant="primary"
            icon={<TrendingUp size={20} />}
            label="CAGR"
            value={`${result.cagr}%`}
          />

          <ResultCard
            variant="warning"
            icon={<IndianRupee size={20} />}
            label="Absolute Growth"
            value={`₹ ${result.growth.toLocaleString("en-IN")}`}
          />

          <ResultCard
            variant="neutral"
            icon={<Calendar size={20} />}
            label="Investment Period"
            value={`${result.years} Years`}
          />
        </div>
      )}

      {/* ================= INFO (SEO) ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          What is CAGR?
        </h2>

        <p>
          CAGR (Compound Annual Growth Rate) represents the average annual
          growth rate of an investment over a specific period of time,
          assuming the investment grows at a steady rate each year.
        </p>

        <p
          className="font-mono text-xs p-3 rounded"
          style={{ backgroundColor: "var(--surface-2)" }}
        >
          CAGR = (Final Value / Initial Value)<sup>1 / n</sup> − 1
        </p>

        <p>
          CAGR is widely used to compare the performance of mutual funds,
          stocks, portfolios, and business growth over time.
        </p>
      </article>

      {/* ================= BENEFITS ================= */}
      <aside className="text-sm space-y-2">
        <h3 className="font-semibold">
          Why use a CAGR Calculator?
        </h3>
        <ul className="list-disc pl-5">
          <li>Understand true annual investment returns</li>
          <li>Compare different investment options</li>
          <li>Measure long-term performance accurately</li>
          <li>Simple, fast, and reliable</li>
        </ul>
      </aside>
    </section>
  );
}
