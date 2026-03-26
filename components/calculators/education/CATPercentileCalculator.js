"use client";

import { useState } from "react";
import { BarChart3 } from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { ResultCard } from "../../ResultCard";

import { catPercentileCalculator } from "../../../lib/formulas";

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
      <article className="space-y-4 text-sm leading-relaxed">

        <h2 className="font-semibold text-base">
          What Is CAT Percentile?
        </h2>

        <p>
          CAT percentile represents the percentage of candidates who
          scored less than you in the CAT exam. It is the primary metric
          used by IIMs and top MBA colleges for shortlisting applicants.
        </p>

        <h3 className="font-semibold">
          CAT Percentile Formula
        </h3>

        <p
          className="font-mono text-xs p-3 rounded"
          style={{ backgroundColor: "var(--surface-2)" }}
        >
          Percentile = ((Total Candidates − Rank) ÷ Total Candidates) × 100
        </p>

      </article>

      <aside className="text-xs text-muted">
        ⚠️ This percentile is an estimate only. Official CAT percentiles
        are calculated after normalization.
      </aside>

    </section>
  );
}