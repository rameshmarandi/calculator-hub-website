"use client";

import { useState } from "react";
import { Activity } from "lucide-react";

import { PercentageInput } from "../../inputs/PercentageInput";
import { AmountInput } from "../../inputs/AmountInput";
import { ResultCard } from "../../ResultCard";

import { neetRankPredictorCalculator } from "../../../lib/formulas";
import NEETRankPredictorCalculatorArticle from "../../content/education/NEETRankPredictorCalculatorArticle";

export default function NEETRankPredictorCalculator() {

  /* ---------------- PREFILLED VALUES ---------------- */
  const [percentage, setPercentage] = useState("94");
  const [totalCandidates, setTotalCandidates] = useState("2000000");

  /* ---------------- SAFE INPUTS ---------------- */
  const safePercentage = Number(percentage) || 0;
  const safeTotalCandidates = Number(totalCandidates) || 0;

  /* ---------------- CALCULATION ---------------- */
  const result = neetRankPredictorCalculator({
    percentage: safePercentage,
    totalCandidates: safeTotalCandidates
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
        <h1 className="text-2xl font-bold mb-1">
          NEET Rank Predictor
        </h1>

        <p className="text-sm leading-relaxed">
          Estimate your expected NEET rank using your percentage score
          and the total number of candidates appearing in the exam.
        </p>
      </header>


      {/* INPUTS */}
      <div className="space-y-4">

        <PercentageInput
          label="Your Percentage (%)"
          value={percentage}
          onChange={setPercentage}
          placeholder="94"
        />

        <AmountInput
          label="Total Number of Candidates"
          value={totalCandidates}
          onChange={setTotalCandidates}
          prefix=""
          placeholder="2000000"
          min={1}
        />

      </div>


      {/* RESULT */}
      <div aria-live="polite">
        <ResultCard
          variant="primary"
          icon={<Activity size={20} />}
          label={`Predicted NEET Rank for ${safePercentage}%`}
          value={`~ ${result.rank || 0}`}
        />
      </div>


      {/* SEO CONTENT */}
      <NEETRankPredictorCalculatorArticle/>

    </section>
  );
}