"use client";

import { useState } from "react";
import { Percent } from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { ResultCard } from "../../ResultCard";

import { marksToPercentageCalculator } from "../../../lib/formulas";

export default function MarksToPercentageCalculator() {

  /* ---------------- PREFILLED VALUES ---------------- */
  const [obtainedMarks, setObtainedMarks] = useState("425");
  const [totalMarks, setTotalMarks] = useState("500");

  /* ---------------- SAFE INPUTS ---------------- */
  const safeObtainedMarks = Number(obtainedMarks) || 0;
  const safeTotalMarks = Number(totalMarks) || 0;

  /* ---------------- CALCULATION ---------------- */
  const result = marksToPercentageCalculator({
    obtainedMarks: safeObtainedMarks,
    totalMarks: safeTotalMarks
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
          Marks to Percentage Calculator
        </h1>

        <p className="text-sm leading-relaxed">
          Convert your exam marks into percentage instantly using this
          Marks to Percentage Calculator. Works for any board or university.
        </p>
      </header>


      {/* INPUTS */}
      <div className="space-y-4">

        <AmountInput
          label="Obtained Marks"
          value={obtainedMarks}
          onChange={setObtainedMarks}
          prefix=""
          placeholder="425"
          min={0}
        />

        <AmountInput
          label="Total Marks"
          value={totalMarks}
          onChange={setTotalMarks}
          prefix=""
          placeholder="500"
          min={1}
        />

      </div>


      {/* RESULT */}
      <div aria-live="polite">
        <ResultCard
          variant="primary"
          icon={<Percent size={20} />}
          label={`${safeObtainedMarks} out of ${safeTotalMarks}`}
          value={`${result.percentage || 0}%`}
        />
      </div>


      {/* SEO CONTENT */}
      <article className="space-y-4 text-sm leading-relaxed">

        <h2 className="font-semibold text-base">
          How Marks Are Converted to Percentage
        </h2>

        <p>
          Percentage is a common way to represent academic performance.
          It shows how much of the total marks a student has achieved in
          an exam or assessment.
        </p>

        <h3 className="font-semibold">
          Marks to Percentage Formula
        </h3>

        <p
          className="font-mono text-xs p-3 rounded"
          style={{ backgroundColor: "var(--surface-2)" }}
        >
          Percentage = (Obtained Marks ÷ Total Marks) × 100
        </p>

        <ul className="list-disc pl-5">
          <li>Used by schools, colleges, and universities</li>
          <li>Helpful for admissions and applications</li>
          <li>Standard academic conversion method</li>
        </ul>

      </article>


      {/* DISCLAIMER */}
      <aside className="text-xs text-muted">
        ⚠️ Results are calculated using standard mathematical formulas.
        Academic evaluation rules may vary by institution.
      </aside>

    </section>
  );
}