"use client";

import { useState } from "react";
import { Percent } from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { ResultCard } from "../../ResultCard";

import { percentageCalculator } from "../../../lib/formulas";
import PercentageCalculatorArticle from "../../content/education/PercentageCalculatorArticle";

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
    percentage: safePercentage,
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
        <h1 className="text-2xl font-bold mb-1">Percentage Calculator</h1>

        <p className="text-sm leading-relaxed">
          Use this Percentage Calculator to quickly calculate what percentage of
          a number is. Enter a total number and the percentage to get instant
          results.
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

      <PercentageCalculatorArticle />
    </section>
  );
}
