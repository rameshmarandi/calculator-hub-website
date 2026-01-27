"use client";

import { useState } from "react";
import { Calculator, Zap } from "lucide-react";

import { ResultCard } from "../../ResultCard";

export default function PowerCalculator() {
  const [base, setBase] = useState("");
  const [exponent, setExponent] = useState("");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    if (
      base === "" ||
      exponent === "" ||
      isNaN(base) ||
      isNaN(exponent)
    ) {
      setError("Please enter valid numeric values.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- CALCULATION ---------------- */
  function calculatePower(e) {
    e.preventDefault();
    if (!validate()) return;

    const b = Number(base);
    const eValue = Number(exponent);

    const value = Math.pow(b, eValue);

    setResult(value);
  }

  return (
    <section
      className="rounded-xl p-6 space-y-10"
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)",
      }}
    >
      {/* ================= HEADER ================= */}
      <header>
        <h1 className="text-2xl font-bold mb-1">
          Power Calculator
        </h1>
        <p className="text-sm leading-relaxed">
          Use this Power Calculator to calculate the value of a number
          raised to the power of another number. It helps you solve
          exponential expressions quickly and accurately.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculatePower} className="space-y-4">
        {/* Base */}
        <div className="space-y-1">
          <label className="text-sm font-medium">
            Base Value
          </label>
          <input
            type="number"
            value={base}
            onChange={(e) => setBase(e.target.value)}
            placeholder="Enter base"
            className="w-full px-3 py-2 rounded"
            style={{
              border: "1px solid var(--border)",
              backgroundColor: "var(--surface)",
            }}
          />
        </div>

        {/* Exponent */}
        <div className="space-y-1">
          <label className="text-sm font-medium">
            Exponent (Power)
          </label>
          <input
            type="number"
            value={exponent}
            onChange={(e) => setExponent(e.target.value)}
            placeholder="Enter exponent"
            className="w-full px-3 py-2 rounded"
            style={{
              border: "1px solid var(--border)",
              backgroundColor: "var(--surface)",
            }}
          />
        </div>

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
          Calculate Power
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result !== null && (
        <div aria-live="polite">
          <ResultCard
            variant="primary"
            icon={<Zap size={20} />}
            label="Result"
            value={result}
          />
        </div>
      )}

      {/* ================= SEO BLOG CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          What Is a Power Calculator?
        </h2>

        <p>
          A Power Calculator is a mathematical tool used to calculate
          exponential expressions where a base number is raised to the
          power of an exponent. It is commonly used in mathematics,
          science, engineering, and finance.
        </p>

        <h3 className="font-semibold">
          Power Formula
        </h3>

        <p
          className="font-mono text-xs p-3 rounded"
          style={{ backgroundColor: "var(--surface-2)" }}
        >
          Result = Base<sup>Exponent</sup>
        </p>

        <ul className="list-disc pl-5">
          <li>Positive exponent → repeated multiplication</li>
          <li>Zero exponent → result is 1</li>
          <li>Negative exponent → reciprocal value</li>
        </ul>

        <h3 className="font-semibold">
          Why Use a Power Calculator?
        </h3>

        <ul className="list-disc pl-5">
          <li>Instant exponential calculations</li>
          <li>Accurate and reliable results</li>
          <li>Useful for students and professionals</li>
          <li>Eliminates manual calculation errors</li>
        </ul>

        <p>
          This power calculator uses standard mathematical rules to
          deliver fast and precise results.
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ Power calculations are based on standard mathematical
        formulas. Results are for educational and informational purposes
        only.
      </aside>
    </section>
  );
}
