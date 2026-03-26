"use client";

import { useState } from "react";
import { Percent } from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { ResultCard } from "../../ResultCard";

import { percentageCalculator } from "../../../lib/formulas";

export default function PercentageCalculator() {

  /* ---------------- PREFILLED VALUES ---------------- */
  const [totalNumber, setTotalNumber] = useState("200");
  const [percentage, setPercentage] = useState("15");

  /* ---------------- SAFE INPUTS ---------------- */
  const safeTotalNumber = Number(totalNumber) || 0;
  const safePercentage = Number(percentage) || 0;

  /* ---------------- CALCULATION ---------------- */
  const result = percentageCalculator({
    totalNumber: safeTotalNumber,
    percentage: safePercentage
  });

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
          Percentage Calculator
        </h1>

        <p className="text-sm leading-relaxed">
          Use this Percentage Calculator to quickly calculate what
          percentage of a number is. Enter a total number and the
          percentage to get instant results.
        </p>
      </header>


      {/* ================= INPUTS ================= */}
      <div className="space-y-4">

        <AmountInput
          label="Total Number"
          value={totalNumber}
          onChange={setTotalNumber}
          prefix=""
          placeholder="200"
        />

        <AmountInput
          label="Percentage (%)"
          value={percentage}
          onChange={setPercentage}
          prefix=""
          placeholder="15"
        />

      </div>


      {/* ================= RESULT ================= */}
      <div aria-live="polite">
        <ResultCard
          variant="primary"
          icon={<Percent size={20} />}
          label={`${safePercentage}% of ${safeTotalNumber}`}
          value={result.percentageValue || 0}
        />
      </div>


      {/* ================= SEO CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">

        <h2 className="font-semibold text-base">
          What Is a Percentage?
        </h2>

        <p>
          A percentage represents a portion of a number expressed
          as a fraction of 100. It is widely used in mathematics,
          education, statistics, finance, and daily life to compare
          quantities and measure change.
        </p>

        <h3 className="font-semibold">
          Percentage Formula
        </h3>

        <p
          className="font-mono text-xs p-3 rounded"
          style={{ backgroundColor: "var(--surface-2)" }}
        >
          Percentage Value = (Total Number × Percentage) ÷ 100
        </p>

        <ul className="list-disc pl-5">
          <li>Used to calculate discounts and price reductions</li>
          <li>Helps determine tax, growth, and interest</li>
          <li>Common in academic math problems</li>
          <li>Useful for comparisons and data analysis</li>
        </ul>

        <h3 className="font-semibold">
          Why Use a Percentage Calculator?
        </h3>

        <ul className="list-disc pl-5">
          <li>Provides instant and accurate results</li>
          <li>Reduces manual calculation mistakes</li>
          <li>Helpful for students and professionals</li>
          <li>Simplifies everyday percentage calculations</li>
        </ul>

        <p>
          This calculator instantly determines the percentage value
          of a number using a simple mathematical formula.
        </p>

      </article>


      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ Results are calculated using standard mathematical
        formulas. Always verify important academic or financial
        calculations when precision is critical.
      </aside>

    </section>
  );
}