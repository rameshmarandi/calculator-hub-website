"use client";

import { useState } from "react";
import { Calculator, TrendingUp } from "lucide-react";

import { PercentageInput } from "../../inputs/PercentageInput";
import { ResultCard } from "../../ResultCard";

export default function RankPredictorCalculator() {
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
      Standard Rank Predictor Logic
      Higher percentage → better rank
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
        <h1 className="text-2xl font-bold mb-1">Rank Predictor Calculator</h1>
        <p className="text-sm leading-relaxed">
          Predict your expected rank based on your percentage score and the
          total number of candidates using this Rank Predictor Calculator.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateRank} className="space-y-4">
        <PercentageInput
          label="Your Percentage (%)"
          value={percentage}
          onChange={setPercentage}
          placeholder="92"
        />

        <PercentageInput
          label="Total Number of Candidates"
          value={totalCandidates}
          onChange={setTotalCandidates}
          placeholder="150000"
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
            icon={<TrendingUp size={20} />}
            label={`Predicted Rank for ${result.percentage}%`}
            value={`~ ${result.rank}`}
          />
        </div>
      )}

      {/* ================= SEO BLOG CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">What Is a Rank Predictor?</h2>

        <p>
          A rank predictor estimates your possible exam rank based on your
          percentage score and the total number of candidates appearing for the
          exam. It helps students understand their relative standing before
          official results are announced.
        </p>

        <h3 className="font-semibold">Rank Prediction Formula</h3>

        <p
          className="font-mono text-xs p-3 rounded"
          style={{ backgroundColor: "var(--surface-2)" }}>
          Predicted Rank ≈ (100 − Percentage) × Total Candidates ÷ 100
        </p>

        <ul className="list-disc pl-5">
          <li>Higher percentage results in better rank</li>
          <li>Commonly used for competitive exam prediction</li>
          <li>Provides an estimated rank range</li>
        </ul>

        <h3 className="font-semibold">Why Use a Rank Predictor?</h3>

        <ul className="list-disc pl-5">
          <li>Estimate rank before results</li>
          <li>Plan counseling and college choices</li>
          <li>Understand competition level</li>
          <li>Reduce anxiety with early insights</li>
        </ul>

        <p>
          This rank predictor provides an approximate result. Actual ranks may
          vary depending on normalization methods, exam difficulty, and
          category-based reservations.
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ This rank prediction is an estimate only. Actual exam ranks may
        differ based on official evaluation and normalization procedures.
      </aside>
    </section>
  );
}
