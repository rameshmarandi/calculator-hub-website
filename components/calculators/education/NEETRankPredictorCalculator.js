"use client";

import { useState } from "react";
import { Calculator, Activity } from "lucide-react";

import { PercentageInput } from "../../inputs/PercentageInput";
import { ResultCard } from "../../ResultCard";

export default function NEETRankPredictorCalculator() {
  const [percentage, setPercentage] = useState("");
  const [totalCandidates, setTotalCandidates] = useState("");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    if (!percentage || isNaN(percentage)) {
      setError("Please enter a valid percentage.");
      return false;
    }

    if (Number(percentage) < 0 || Number(percentage) > 100) {
      setError("Percentage must be between 0 and 100.");
      return false;
    }

    if (!totalCandidates || isNaN(totalCandidates)) {
      setError("Please enter valid total candidates.");
      return false;
    }

    if (Number(totalCandidates) <= 0) {
      setError("Total candidates must be greater than zero.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- CALCULATION ---------------- */
  function calculateRank(e) {
    e.preventDefault();
    if (!validate()) return;

    const p = Number(percentage);
    const total = Number(totalCandidates);

    /*
      NEET Rank Predictor Logic (Approximation)
      Rank ≈ (100 − Percentage) × Total Candidates ÷ 100
    */

    const predictedRank = Math.max(1, Math.round(((100 - p) * total) / 100));

    setResult({
      rank: predictedRank,
      percentage: p,
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
        <h1 className="text-2xl font-bold mb-1">NEET Rank Predictor</h1>
        <p className="text-sm leading-relaxed">
          Predict your expected NEET rank based on your percentage score and the
          total number of candidates using this NEET Rank Predictor.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateRank} className="space-y-4">
        <PercentageInput
          label="Your Percentage (%)"
          value={percentage}
          onChange={setPercentage}
          placeholder="94"
        />

        <PercentageInput
          label="Total Number of Candidates"
          value={totalCandidates}
          onChange={setTotalCandidates}
          placeholder="2000000"
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
          Predict Rank
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <div aria-live="polite">
          <ResultCard
            variant="primary"
            icon={<Activity size={20} />}
            label={`Predicted NEET Rank for ${result.percentage}%`}
            value={`~ ${result.rank}`}
          />
        </div>
      )}

      {/* ================= SEO BLOG CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">What Is NEET Rank?</h2>

        <p>
          NEET rank represents your position among all candidates who appeared
          for the NEET examination. It is determined based on percentile score,
          normalization, and official evaluation by NTA.
        </p>

        <h3 className="font-semibold">NEET Rank Prediction Formula</h3>

        <p
          className="font-mono text-xs p-3 rounded"
          style={{ backgroundColor: "var(--surface-2)" }}>
          Predicted Rank ≈ (100 − Percentage) × Total Candidates ÷ 100
        </p>

        <ul className="list-disc pl-5">
          <li>Higher percentage leads to better rank</li>
          <li>Used for preliminary estimation</li>
          <li>Helps understand competition level</li>
        </ul>

        <h3 className="font-semibold">Why Use a NEET Rank Predictor?</h3>

        <ul className="list-disc pl-5">
          <li>Estimate rank before official results</li>
          <li>Plan MBBS/BDS college options</li>
          <li>Understand admission chances</li>
          <li>Reduce post-exam anxiety</li>
        </ul>

        <p>
          This NEET rank predictor provides an approximate rank. Final ranks are
          published by NTA after official normalization.
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ This NEET rank prediction is an estimate only. Actual NEET ranks may
        vary based on official normalization, tie-breaking rules, and
        category-wise allocation.
      </aside>
    </section>
  );
}
