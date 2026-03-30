"use client";

import { useState } from "react";
import { BarChart3 } from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { ResultCard } from "../../ResultCard";

import { catPercentileCalculator } from "../../../lib/formulas";
import CATPercentileCalculatorArticle from "../../content/education/CATPercentileCalculatorArticle";

export default function CATPercentileCalculator() {

  /* ---------------- PREFILLED VALUES ---------------- */
  const [rank, setRank] = useState("1200");
  const [totalCandidates, setTotalCandidates] = useState("300000");

  /* ---------------- SAFE INPUTS ---------------- */
  const safeRank = Number(rank) || 0;
  const safeTotalCandidates = Number(totalCandidates) || 0;

  /* ---------------- CALCULATION ---------------- */
  const result = catPercentileCalculator({
    rank: safeRank,
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
          CAT Percentile Calculator
        </h1>

        <p className="text-sm leading-relaxed">
          Estimate your CAT percentile using your expected rank and
          the total number of test-takers.
        </p>
      </header>

      {/* INPUTS */}
      <div className="space-y-4">

        <AmountInput
          label="Your Expected Rank"
          value={rank}
          onChange={setRank}
          prefix=""
          placeholder="1200"
          min={1}
        />

        <AmountInput
          label="Total Number of Candidates"
          value={totalCandidates}
          onChange={setTotalCandidates}
          prefix=""
          placeholder="300000"
          min={1}
        />

      </div>

      {/* RESULT */}
      <div aria-live="polite">
        <ResultCard
          variant="primary"
          icon={<BarChart3 size={20} />}
          label={`Estimated CAT Percentile (Rank ${safeRank})`}
          value={`${result.percentile || 0}%`}
        />
      </div>

      {/* SEO CONTENT */}
      <CATPercentileCalculatorArticle/>

    </section>
  );
}