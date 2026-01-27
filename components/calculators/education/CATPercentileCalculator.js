"use client";

import { useState } from "react";
import { Calculator, BarChart3 } from "lucide-react";

import { PercentageInput } from "../../inputs/PercentageInput";
import { ResultCard } from "../../ResultCard";

export default function CATPercentileCalculator() {
  const [rank, setRank] = useState("");
  const [totalCandidates, setTotalCandidates] = useState("");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    if (!rank || isNaN(rank)) {
      setError("Please enter a valid rank.");
      return false;
    }

    if (Number(rank) <= 0) {
      setError("Rank must be greater than zero.");
      return false;
    }

    if (!totalCandidates || isNaN(totalCandidates)) {
      setError("Please enter valid total number of candidates.");
      return false;
    }

    if (Number(totalCandidates) <= 0) {
      setError("Total candidates must be greater than zero.");
      return false;
    }

    if (Number(rank) > Number(totalCandidates)) {
      setError("Rank cannot be greater than total candidates.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- CALCULATION ---------------- */
  function calculatePercentile(e) {
    e.preventDefault();
    if (!validate()) return;

    const r = Number(rank);
    const total = Number(totalCandidates);

    /*
      CAT Percentile Formula (Conceptual)
      Percentile = ((Total Candidates − Rank) ÷ Total Candidates) × 100
    */

    const percentile =
      ((total - r) / total) * 100;

    setResult({
      percentile: percentile.toFixed(2),
      rank: r,
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
          CAT Percentile Calculator
        </h1>
        <p className="text-sm leading-relaxed">
          Estimate your CAT percentile based on your expected rank and
          total number of test-takers using this CAT Percentile Calculator.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculatePercentile} className="space-y-4">
        <PercentageInput
          label="Your Expected Rank"
          value={rank}
          onChange={setRank}
          placeholder="1200"
        />

        <PercentageInput
          label="Total Number of Candidates"
          value={totalCandidates}
          onChange={setTotalCandidates}
          placeholder="300000"
        />

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
          Calculate Percentile
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <div aria-live="polite">
          <ResultCard
            variant="primary"
            icon={<BarChart3 size={20} />}
            label={`Estimated CAT Percentile (Rank ${result.rank})`}
            value={`${result.percentile}%`}
          />
        </div>
      )}

      {/* ================= SEO BLOG CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          What Is CAT Percentile?
        </h2>

        <p>
          CAT percentile indicates the percentage of candidates who
          scored less than you in the CAT examination. It is the most
          important metric used by IIMs and other top B-schools for
          shortlisting candidates.
        </p>

        <h3 className="font-semibold">
          CAT Percentile Calculation Formula
        </h3>

        <p
          className="font-mono text-xs p-3 rounded"
          style={{ backgroundColor: "var(--surface-2)" }}
        >
          Percentile = ((Total Candidates − Rank) ÷ Total Candidates) × 100
        </p>

        <ul className="list-disc pl-5">
          <li>Higher percentile means better performance</li>
          <li>Used by IIMs and top MBA colleges</li>
          <li>Calculated after score normalization</li>
        </ul>

        <h3 className="font-semibold">
          Why Use a CAT Percentile Calculator?
        </h3>

        <ul className="list-disc pl-5">
          <li>Estimate percentile before results</li>
          <li>Plan IIM and MBA college targets</li>
          <li>Understand competition level</li>
          <li>Reduce post-exam uncertainty</li>
        </ul>

        <p>
          This CAT percentile calculator provides an approximate result.
          Final CAT percentiles are released officially after normalization.
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ This CAT percentile is an estimate only. Actual percentile may
        vary based on normalization, slot difficulty, and official CAT
        evaluation methods.
      </aside>
    </section>
  );
}
