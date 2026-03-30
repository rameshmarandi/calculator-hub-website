"use client";

import { useState } from "react";
import { TrendingUp } from "lucide-react";

import { PercentageInput } from "../../inputs/PercentageInput";
import { AmountInput } from "../../inputs/AmountInput";
import { ResultCard } from "../../ResultCard";

import { rankPredictorCalculator } from "../../../lib/formulas";
import RankPredictorCalculatorArticle from "../../content/education/RankPredictorCalculatorArticle";

export default function RankPredictorCalculator() {
  /* ---------------- PREFILLED VALUES ---------------- */
  const [percentage, setPercentage] = useState("92");
  const [totalCandidates, setTotalCandidates] = useState("150000");

  /* ---------------- SAFE INPUTS ---------------- */
  const safePercentage = Number(percentage) || 0;
  const safeTotalCandidates = Number(totalCandidates) || 0;

  /* ---------------- CALCULATION ---------------- */
  const result = rankPredictorCalculator({
    percentage: safePercentage,
    totalCandidates: safeTotalCandidates,
  });

  return (
    <section
      className="rounded-xl p-6 space-y-10"
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)",
      }}
    >
      {/* HEADER */}
      <header>
        <h1 className="text-2xl font-bold mb-1">Rank Predictor Calculator</h1>

        <p className="text-sm leading-relaxed">
          Predict your approximate exam rank using your percentage score and the
          total number of candidates.
        </p>
      </header>

      {/* INPUTS */}
      <div className="space-y-4">
        <PercentageInput
          label="Your Percentage (%)"
          value={percentage}
          onChange={setPercentage}
          placeholder="92"
        />

        <AmountInput
          label="Total Number of Candidates"
          value={totalCandidates}
          onChange={setTotalCandidates}
          prefix=""
          placeholder="150000"
          min={1}
        />
      </div>

      {/* RESULT */}
      <div aria-live="polite">
        <ResultCard
          variant="primary"
          icon={<TrendingUp size={20} />}
          label={`Predicted Rank for ${safePercentage}%`}
          value={`~ ${result.rank || 0}`}
        />
      </div>

      <RankPredictorCalculatorArticle />
    </section>
  );
}
