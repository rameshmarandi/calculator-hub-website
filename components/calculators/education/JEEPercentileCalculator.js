"use client";

import { useState } from "react";
import { Calculator, Trophy } from "lucide-react";

import { PercentageInput } from "../../inputs/PercentageInput";
import { ResultCard } from "../../ResultCard";

export default function JEEPercentileCalculator() {
  const [yourMarks, setYourMarks] = useState("");
  const [maxMarks, setMaxMarks] = useState("300");
  const [totalCandidates, setTotalCandidates] = useState("");
  const [candidatesBelow, setCandidatesBelow] = useState("");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    if (!yourMarks || isNaN(yourMarks)) {
      setError("Please enter valid marks obtained.");
      return false;
    }

    if (!maxMarks || isNaN(maxMarks) || Number(maxMarks) <= 0) {
      setError("Please enter valid maximum marks.");
      return false;
    }

    if (Number(yourMarks) < 0 || Number(yourMarks) > Number(maxMarks)) {
      setError("Marks must be between 0 and maximum marks.");
      return false;
    }

    if (
      !totalCandidates ||
      isNaN(totalCandidates) ||
      Number(totalCandidates) <= 0
    ) {
      setError("Please enter valid total number of candidates.");
      return false;
    }

    if (
      !candidatesBelow ||
      isNaN(candidatesBelow) ||
      Number(candidatesBelow) < 0 ||
      Number(candidatesBelow) > Number(totalCandidates)
    ) {
      setError("Please enter valid number of candidates below your score.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- CALCULATION ---------------- */
  function calculatePercentile(e) {
    e.preventDefault();
    if (!validate()) return;

    const below = Number(candidatesBelow);
    const total = Number(totalCandidates);

    /*
      Official NTA Percentile Formula (Conceptual)
      Percentile = (Number of candidates with score ≤ yours ÷ Total candidates) × 100
    */

    const percentile = (below / total) * 100;

    setResult({
      percentile: percentile.toFixed(4),
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
        <h1 className="text-2xl font-bold mb-1">JEE Percentile Calculator</h1>
        <p className="text-sm leading-relaxed">
          Estimate your JEE Main percentile score using this JEE Percentile
          Calculator based on NTA’s percentile calculation methodology.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculatePercentile} className="space-y-4">
        <PercentageInput
          label="Marks Obtained"
          value={yourMarks}
          onChange={setYourMarks}
          placeholder="180"
        />

        <PercentageInput
          label="Maximum Marks"
          value={maxMarks}
          onChange={setMaxMarks}
          placeholder="300"
        />

        <PercentageInput
          label="Total Number of Candidates"
          value={totalCandidates}
          onChange={setTotalCandidates}
          placeholder="900000"
        />

        <PercentageInput
          label="Candidates Scoring Less Than You"
          value={candidatesBelow}
          onChange={setCandidatesBelow}
          placeholder="850000"
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
          Calculate Percentile
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <div aria-live="polite">
          <ResultCard
            variant="primary"
            icon={<Trophy size={20} />}
            label="Estimated JEE Percentile"
            value={`${result.percentile}%`}
          />
        </div>
      )}

      {/* ================= SEO BLOG CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">What Is JEE Percentile?</h2>

        <p>
          JEE percentile score indicates the percentage of candidates who scored
          equal to or below your score in the examination. It is not the same as
          percentage of marks.
        </p>

        <h3 className="font-semibold">JEE Percentile Formula</h3>

        <p
          className="font-mono text-xs p-3 rounded"
          style={{ backgroundColor: "var(--surface-2)" }}>
          Percentile = (Candidates with Score ≤ Yours ÷ Total Candidates) × 100
        </p>

        <ul className="list-disc pl-5">
          <li>Used by NTA for JEE Main ranking</li>
          <li>Normalizes difficulty across shifts</li>
          <li>Higher percentile means better rank</li>
        </ul>

        <h3 className="font-semibold">Why Use a JEE Percentile Calculator?</h3>

        <ul className="list-disc pl-5">
          <li>Estimate percentile before official results</li>
          <li>Understand relative performance</li>
          <li>Plan rank-based college options</li>
          <li>Reduce post-exam uncertainty</li>
        </ul>

        <p>
          This calculator provides an estimated percentile. Official JEE
          percentiles are calculated by NTA using shift-wise normalization.
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ This JEE percentile is an estimate only. Final percentile and rank
        are determined by NTA using official normalization methods.
      </aside>
    </section>
  );
}
