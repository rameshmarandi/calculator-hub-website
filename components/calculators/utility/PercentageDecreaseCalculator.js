"use client";

import { useState } from "react";
import { Calculator, TrendingDown } from "lucide-react";

import { ResultCard } from "../../ResultCard";

export default function PercentageDecreaseCalculator() {
  const [originalValue, setOriginalValue] = useState("");
  const [newValue, setNewValue] = useState("");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    if (
      originalValue === "" ||
      newValue === "" ||
      isNaN(originalValue) ||
      isNaN(newValue)
    ) {
      setError("Please enter valid numeric values.");
      return false;
    }

    if (Number(originalValue) <= 0) {
      setError("Original value must be greater than zero.");
      return false;
    }

    if (Number(newValue) > Number(originalValue)) {
      setError("New value must be less than or equal to original value.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- CALCULATION ---------------- */
  function calculatePercentageDecrease(e) {
    e.preventDefault();
    if (!validate()) return;

    const original = Number(originalValue);
    const current = Number(newValue);

    const decrease = original - current;
    const percentageDecrease = (decrease / original) * 100;

    setResult({
      decrease: decrease.toFixed(2),
      percentage: percentageDecrease.toFixed(2),
    });
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
          Percentage Decrease Calculator
        </h1>
        <p className="text-sm leading-relaxed">
          Use this Percentage Decrease Calculator to find how much a value
          has decreased in percentage terms from its original value.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculatePercentageDecrease} className="space-y-4">
        {/* Original Value */}
        <div className="space-y-1">
          <label className="text-sm font-medium">
            Original Value
          </label>
          <input
            type="number"
            value={originalValue}
            onChange={(e) => setOriginalValue(e.target.value)}
            placeholder="Enter original value"
            className="w-full px-3 py-2 rounded"
            style={{
              border: "1px solid var(--border)",
              backgroundColor: "var(--surface)",
            }}
          />
        </div>

        {/* New Value */}
        <div className="space-y-1">
          <label className="text-sm font-medium">
            New Value
          </label>
          <input
            type="number"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            placeholder="Enter new value"
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
          Calculate Percentage Decrease
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <div aria-live="polite">
          <ResultCard
            variant="danger"
            icon={<TrendingDown size={20} />}
            label="Percentage Decrease"
            value={`${result.percentage}% (Decrease: ${result.decrease})`}
          />
        </div>
      )}

      {/* ================= SEO BLOG CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          What Is Percentage Decrease?
        </h2>

        <p>
          Percentage decrease measures how much a value has reduced
          compared to its original value. It is commonly used in price
          drops, discounts, depreciation, and performance analysis.
        </p>

        <h3 className="font-semibold">
          Percentage Decrease Formula
        </h3>

        <p
          className="font-mono text-xs p-3 rounded"
          style={{ backgroundColor: "var(--surface-2)" }}
        >
          Percentage Decrease = (Original Value − New Value) ÷ Original
          Value × 100
        </p>

        <ul className="list-disc pl-5">
          <li>Original value must be greater than zero</li>
          <li>Result is always a positive percentage</li>
          <li>Higher percentage means larger reduction</li>
        </ul>

        <h3 className="font-semibold">
          Why Use a Percentage Decrease Calculator?
        </h3>

        <ul className="list-disc pl-5">
          <li>Quick and accurate reduction calculations</li>
          <li>Useful for discounts and loss analysis</li>
          <li>Eliminates manual calculation errors</li>
          <li>Works for any numeric values</li>
        </ul>

        <p>
          This calculator helps you instantly determine the percentage
          decrease between two values with precision.
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ Percentage decrease results are calculated using standard
        mathematical formulas and are for informational purposes only.
      </aside>
    </section>
  );
}
