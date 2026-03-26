"use client";

import { useState } from "react";
import { CheckCircle } from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { PercentageInput } from "../../inputs/PercentageInput";
import { ResultCard } from "../../ResultCard";

import { passingMarksCalculator } from "../../../lib/formulas";

export default function PassingMarksCalculator() {

  /* ---------------- PREFILLED VALUES ---------------- */
  const [totalMarks, setTotalMarks] = useState("100");
  const [passingPercentage, setPassingPercentage] = useState("40");

  /* ---------------- SAFE INPUTS ---------------- */
  const safeTotalMarks = Number(totalMarks) || 0;
  const safePercentage = Number(passingPercentage) || 0;

  /* ---------------- CALCULATION ---------------- */
  const result = passingMarksCalculator({
    totalMarks: safeTotalMarks,
    passingPercentage: safePercentage
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
          Passing Marks Calculator
        </h1>

        <p className="text-sm leading-relaxed">
          Calculate the minimum marks required to pass an exam
          based on total marks and passing percentage.
        </p>
      </header>


      {/* INPUTS */}
      <div className="space-y-4">

        <AmountInput
          label="Total Marks"
          value={totalMarks}
          onChange={setTotalMarks}
          prefix=""
          placeholder="100"
          min={1}
        />

        <PercentageInput
          label="Passing Percentage (%)"
          value={passingPercentage}
          onChange={setPassingPercentage}
          placeholder="40"
        />

      </div>


      {/* RESULT */}
      <div aria-live="polite">
        <ResultCard
          variant="success"
          icon={<CheckCircle size={20} />}
          label={`Passing Marks (${safePercentage}%)`}
          value={`${result.passingMarks || 0} out of ${safeTotalMarks}`}
        />
      </div>


      {/* SEO CONTENT */}
      <article className="space-y-4 text-sm leading-relaxed">

        <h2 className="font-semibold text-base">
          How Passing Marks Are Calculated
        </h2>

        <p>
          Passing marks represent the minimum score required to
          successfully pass an examination. Most institutions
          define passing marks as a percentage of the total marks.
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

      </article>


      <aside className="text-xs text-muted">
        ⚠️ Passing criteria vary by board and university.
      </aside>

    </section>
  );
}