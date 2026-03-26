"use client";

import { useState } from "react";

import CalculatorLayout from "@/components/core/CalculatorLayout";
import StatsGrid from "@/components/core/StatsGrid";
import ExplanationText from "@/components/core/ExplanationText";

import { AmountInput } from "@/components/inputs/AmountInput";

import { gradeCalculator } from "@/lib/formulas";

import GradeCalculatorArticle from "../../content/education/GradeCalculatorArticle";

export default function GradeCalculator() {

  /* ---------------- PREFILLED VALUE ---------------- */
  const [marks, setMarks] = useState("85");

  /* ---------------- SAFE INPUT ---------------- */
  const safeMarks = Number(marks) || 0;

  /* ---------------- CALCULATION ---------------- */
  const result = gradeCalculator({
    marks: safeMarks
  });

  return (
    <CalculatorLayout
      title="Grade Calculator"
      subtitle="Convert marks or percentage into academic grade instantly."
      badges={[
        "100% Free",
        "Instant Results",
        "Standard Scale",
        "No Signup Required",
      ]}
    >

      {/* INPUT */}
      <AmountInput
        label="Marks / Percentage"
        value={marks}
        onChange={setMarks}
        prefix=""
        placeholder="85"
      />

      {/* HERO */}
      <div className="text-center py-8 rounded-2xl border bg-[var(--surface-2)]">
        <p className="text-xs uppercase text-gray-500 tracking-wider">
          Final Grade
        </p>

        <p className="text-5xl font-extrabold mt-2 text-indigo-600">
          {result.grade}
        </p>

        <p className="text-sm text-gray-500 mt-2">
          {result.remark}
        </p>
      </div>

      {/* STATS */}
      <StatsGrid
        items={[
          { label: "Marks", value: `${safeMarks}%`, variant: "info" },
          { label: "Remark", value: result.remark, variant: "success" },
        ]}
      />

      <ExplanationText
        text={`With ${safeMarks}% marks, your grade is ${result.grade} (${result.remark}).`}
      />

      <GradeCalculatorArticle />

    </CalculatorLayout>
  );
}