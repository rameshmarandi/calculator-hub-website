"use client";

import { useState } from "react";
import { Calculator, CheckCircle } from "lucide-react";

import { PercentageInput } from "../../inputs/PercentageInput";
import { ResultCard } from "../../ResultCard";

export default function PassingMarksCalculator() {
  const [totalMarks, setTotalMarks] = useState("");
  const [passingPercentage, setPassingPercentage] = useState("40");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    if (!totalMarks || isNaN(totalMarks) || Number(totalMarks) <= 0) {
      setError("Please enter valid total marks.");
      return false;
    }

    if (
      !passingPercentage ||
      isNaN(passingPercentage) ||
      Number(passingPercentage) <= 0 ||
      Number(passingPercentage) > 100
    ) {
      setError("Please enter valid passing percentage (1–100).");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- CALCULATION ---------------- */
  function calculatePassingMarks(e) {
    e.preventDefault();
    if (!validate()) return;

    const total = Number(totalMarks);
    const percent = Number(passingPercentage);

    const passingMarks = (total * percent) / 100;

    setResult({
      passingMarks: Math.ceil(passingMarks),
      percentage: percent,
      total,
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
          Passing Marks Calculator
        </h1>
        <p className="text-sm leading-relaxed">
          Use this Passing Marks Calculator to find the minimum marks
          required to pass an exam based on total marks and passing
          percentage.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculatePassingMarks} className="space-y-4">
        <PercentageInput
          label="Total Marks"
          value={totalMarks}
          onChange={setTotalMarks}
          placeholder="100"
        />

        <PercentageInput
          label="Passing Percentage (%)"
          value={passingPercentage}
          onChange={setPassingPercentage}
          placeholder="40"
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
          Calculate Passing Marks
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <div aria-live="polite">
          <ResultCard
            variant="success"
            icon={<CheckCircle size={20} />}
            label={`Passing Marks (${result.percentage}%)`}
            value={`${result.passingMarks} out of ${result.total}`}
          />
        </div>
      )}

      {/* ================= SEO BLOG CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          How Passing Marks Are Calculated
        </h2>

        <p>
          Passing marks represent the minimum score a student must achieve
          to successfully pass an examination. Most boards and universities
          define passing marks as a fixed percentage of the total marks.
        </p>

        <h3 className="font-semibold">
          Passing Marks Formula
        </h3>

        <p
          className="font-mono text-xs p-3 rounded"
          style={{ backgroundColor: "var(--surface-2)" }}
        >
          Passing Marks = (Total Marks × Passing Percentage) ÷ 100
        </p>

        <ul className="list-disc pl-5">
          <li>Common passing percentage is 40%</li>
          <li>Some exams use 33% or 50%</li>
          <li>Rules vary by board and institution</li>
        </ul>

        <h3 className="font-semibold">
          Why Use a Passing Marks Calculator?
        </h3>

        <ul className="list-disc pl-5">
          <li>Quickly find minimum marks required</li>
          <li>Helps set clear exam targets</li>
          <li>Eliminates manual calculation errors</li>
          <li>Useful for students and teachers</li>
        </ul>

        <p>
          This calculator gives a general estimate. Always follow your
          institution’s official passing criteria.
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ Passing criteria may differ by exam, board, or university.
        This calculator is for reference purposes only.
      </aside>
    </section>
  );
}
