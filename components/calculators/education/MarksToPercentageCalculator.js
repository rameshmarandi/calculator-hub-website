"use client";

import { useState } from "react";
import { Calculator, Percent } from "lucide-react";

import { PercentageInput } from "../../inputs/PercentageInput";
import { ResultCard } from "../../ResultCard";

export default function MarksToPercentageCalculator() {
  const [obtainedMarks, setObtainedMarks] = useState("");
  const [totalMarks, setTotalMarks] = useState("");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    if (!obtainedMarks || isNaN(obtainedMarks)) {
      setError("Please enter valid obtained marks.");
      return false;
    }

    if (!totalMarks || isNaN(totalMarks)) {
      setError("Please enter valid total marks.");
      return false;
    }

    if (Number(obtainedMarks) < 0) {
      setError("Obtained marks cannot be negative.");
      return false;
    }

    if (Number(totalMarks) <= 0) {
      setError("Total marks must be greater than zero.");
      return false;
    }

    if (Number(obtainedMarks) > Number(totalMarks)) {
      setError("Obtained marks cannot exceed total marks.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- CALCULATION ---------------- */
  function calculatePercentage(e) {
    e.preventDefault();
    if (!validate()) return;

    const obtained = Number(obtainedMarks);
    const total = Number(totalMarks);

    const percentage = (obtained / total) * 100;

    setResult({
      obtained,
      total,
      percentage: percentage.toFixed(2),
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
        <h1 className="text-2xl font-bold mb-1">
          Marks to Percentage Calculator
        </h1>
        <p className="text-sm leading-relaxed">
          Convert your exam marks into percentage instantly using this Marks to
          Percentage Calculator. Suitable for all boards and universities.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculatePercentage} className="space-y-4">
        <PercentageInput
          label="Obtained Marks"
          value={obtainedMarks}
          onChange={setObtainedMarks}
          placeholder="425"
        />

        <PercentageInput
          label="Total Marks"
          value={totalMarks}
          onChange={setTotalMarks}
          placeholder="500"
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
          Calculate Percentage
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <div aria-live="polite">
          <ResultCard
            variant="primary"
            icon={<Percent size={20} />}
            label={`${result.obtained} out of ${result.total}`}
            value={`${result.percentage}%`}
          />
        </div>
      )}

      {/* ================= SEO BLOG CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          How Marks Are Converted to Percentage
        </h2>

        <p>
          Percentage is one of the most common ways to represent academic
          performance. It shows how much of the total marks a student has scored
          in an exam or assessment.
        </p>

        <h3 className="font-semibold">Marks to Percentage Formula</h3>

        <p
          className="font-mono text-xs p-3 rounded"
          style={{ backgroundColor: "var(--surface-2)" }}>
          Percentage = (Obtained Marks ÷ Total Marks) × 100
        </p>

        <ul className="list-disc pl-5">
          <li>Used by schools, colleges, and universities</li>
          <li>Helpful for results, admissions, and applications</li>
          <li>Standard academic conversion method</li>
        </ul>

        <h3 className="font-semibold">
          Why Use a Marks to Percentage Calculator?
        </h3>

        <ul className="list-disc pl-5">
          <li>Instant and accurate results</li>
          <li>Eliminates manual calculation errors</li>
          <li>Works for any exam pattern</li>
          <li>Simple and easy to use</li>
        </ul>

        <p>
          This calculator provides quick percentage results based on the marks
          entered. Always verify results with official scorecards when required.
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ This calculator uses standard mathematical formulas. Academic
        evaluation rules may vary by board or institution.
      </aside>
    </section>
  );
}
