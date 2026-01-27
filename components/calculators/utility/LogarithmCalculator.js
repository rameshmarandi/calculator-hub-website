"use client";

import { useState } from "react";
import { Calculator, LogOut } from "lucide-react";

import { ResultCard } from "../../ResultCard";

export default function LogarithmCalculator() {
  const [number, setNumber] = useState("");
  const [base, setBase] = useState("10");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    if (
      number === "" ||
      base === "" ||
      isNaN(number) ||
      isNaN(base)
    ) {
      setError("Please enter valid numeric values.");
      return false;
    }

    if (Number(number) <= 0) {
      setError("Logarithm is only defined for positive numbers.");
      return false;
    }

    if (Number(base) <= 0 || Number(base) === 1) {
      setError("Base must be greater than 0 and not equal to 1.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- CALCULATION ---------------- */
  function calculateLog(e) {
    e.preventDefault();
    if (!validate()) return;

    const n = Number(number);
    const b = Number(base);

    // Change of base formula
    const value = Math.log(n) / Math.log(b);

    setResult(value.toFixed(6));
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
          Logarithm Calculator
        </h1>
        <p className="text-sm leading-relaxed">
          Use this Logarithm Calculator to find the logarithm of a number
          for any valid base. It supports common logarithms, natural
          logarithms, and custom bases.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateLog} className="space-y-4">
        {/* Number */}
        <div className="space-y-1">
          <label className="text-sm font-medium">
            Number
          </label>
          <input
            type="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            placeholder="Enter number"
            className="w-full px-3 py-2 rounded"
            style={{
              border: "1px solid var(--border)",
              backgroundColor: "var(--surface)",
            }}
          />
        </div>

        {/* Base */}
        <div className="space-y-1">
          <label className="text-sm font-medium">
            Logarithm Base
          </label>
          <input
            type="number"
            value={base}
            onChange={(e) => setBase(e.target.value)}
            placeholder="10 for log, e for ln"
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
          Calculate Logarithm
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result !== null && (
        <div aria-live="polite">
          <ResultCard
            variant="primary"
            icon={<LogOut size={20} />}
            label="Logarithm Result"
            value={result}
          />
        </div>
      )}

      {/* ================= SEO BLOG CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          What Is a Logarithm?
        </h2>

        <p>
          A logarithm answers the question: <em>to what power must a base
          be raised to obtain a given number?</em> Logarithms are widely
          used in mathematics, science, engineering, and computing.
        </p>

        <h3 className="font-semibold">
          Logarithm Formula
        </h3>

        <p
          className="font-mono text-xs p-3 rounded"
          style={{ backgroundColor: "var(--surface-2)" }}
        >
          log<sub>b</sub>(x) = ln(x) ÷ ln(b)
        </p>

        <ul className="list-disc pl-5">
          <li>Base must be positive and not equal to 1</li>
          <li>Number must be greater than 0</li>
          <li>Common log uses base 10</li>
          <li>Natural log uses base e (≈ 2.718)</li>
        </ul>

        <h3 className="font-semibold">
          Why Use a Logarithm Calculator?
        </h3>

        <ul className="list-disc pl-5">
          <li>Instant and accurate results</li>
          <li>Supports custom bases</li>
          <li>Ideal for students and professionals</li>
          <li>Eliminates manual calculation errors</li>
        </ul>

        <p>
          This logarithm calculator provides precise results using
          standard mathematical formulas.
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ Logarithmic calculations are based on standard mathematical
        rules. Results are for educational and informational purposes
        only.
      </aside>
    </section>
  );
}
