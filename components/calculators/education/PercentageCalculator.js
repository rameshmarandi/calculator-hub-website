"use client";

import { useState } from "react";
import { Calculator, Percent } from "lucide-react";

import { PercentageInput } from "../../inputs/PercentageInput";
import { ResultCard } from "../../ResultCard";

export default function PercentageCalculator() {
  const [value, setValue] = useState("");
  const [percentage, setPercentage] = useState("");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    if (!value || isNaN(value)) {
      setError("Please enter a valid number.");
      return false;
    }

    if (!percentage || isNaN(percentage)) {
      setError("Please enter a valid percentage.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- CALCULATION ---------------- */
  function calculatePercentage(e) {
    e.preventDefault();
    if (!validate()) return;

    const v = Number(value);
    const p = Number(percentage);

    const calculatedValue = (v * p) / 100;

    setResult({
      value: calculatedValue.toFixed(2),
      percentage: p,
      base: v,
    });
  }

  return (
    <section
      className="rounded-xl p-6 space-y-10"
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)",
      }}>
      {/* ================= HEADER ================= */}
      <header>
        <h1 className="text-2xl font-bold mb-1">Percentage Calculator</h1>
        <p className="text-sm leading-relaxed">
          Use this Percentage Calculator to quickly calculate percentages,
          increases, discounts, and comparisons with accurate results.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculatePercentage} className="space-y-4">
        <PercentageInput
          label="Value"
          value={value}
          onChange={setValue}
          placeholder="200"
        />

        <PercentageInput
          label="Percentage (%)"
          value={percentage}
          onChange={setPercentage}
          placeholder="15"
        />

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          className="w-full py-2.5 rounded-md font-medium flex items-center justify-center gap-2"
          style={{
            backgroundColor: "var(--primary)",
            color: "#fff",
          }}>
          <Calculator size={18} />
          Calculate Percentage
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <div aria-live="polite">
          <ResultCard
            variant="primary"
            icon={<Percent size={20} />}
            label={`${result.percentage}% of ${result.base}`}
            value={result.value}
          />
        </div>
      )}

      {/* ================= SEO BLOG CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">What Is a Percentage?</h2>

        <p>
          A percentage represents a portion of a whole expressed as a fraction
          of 100. It is commonly used in finance, education, shopping discounts,
          statistics, and daily calculations.
        </p>

        <h3 className="font-semibold">Percentage Formula</h3>

        <p
          className="font-mono text-xs p-3 rounded"
          style={{ backgroundColor: "var(--surface-2)" }}>
          Percentage Value = (Base Value × Percentage) ÷ 100
        </p>

        <ul className="list-disc pl-5">
          <li>Helps calculate discounts and offers</li>
          <li>Used to find tax, interest, and growth</li>
          <li>Essential for comparisons and analysis</li>
        </ul>

        <h3 className="font-semibold">Why Use a Percentage Calculator?</h3>

        <ul className="list-disc pl-5">
          <li>Eliminates manual calculation errors</li>
          <li>Saves time in daily math tasks</li>
          <li>Useful for business, students, and professionals</li>
          <li>Instant and accurate results</li>
        </ul>

        <p>
          This percentage calculator provides quick results and is ideal for
          everyday calculations involving growth, reduction, or comparisons.
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ Results are calculated using standard mathematical formulas. Always
        verify important financial or academic calculations when precision is
        critical.
      </aside>
    </section>
  );
}
