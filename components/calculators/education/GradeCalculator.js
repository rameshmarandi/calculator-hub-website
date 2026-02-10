"use client";

import { useMemo, useState } from "react";

import CalculatorLayout from "@/components/core/CalculatorLayout";
import StatsGrid from "@/components/core/StatsGrid";
import ExplanationText from "@/components/core/ExplanationText";

import { PercentageInput } from "@/components/inputs/PercentageInput";
import GradeCalculatorArticle from "../../content/education/GradeCalculatorArticle";

/* ======================================================
   PURE FUNCTION
====================================================== */

function getGrade(marks) {
  if (marks >= 90) return ["A+", "Outstanding"];
  if (marks >= 80) return ["A", "Excellent"];
  if (marks >= 70) return ["B+", "Very Good"];
  if (marks >= 60) return ["B", "Good"];
  if (marks >= 50) return ["C", "Average"];
  if (marks >= 40) return ["D", "Pass"];
  return ["F", "Fail"];
}

/* ======================================================
   COMPONENT
====================================================== */

export default function GradeCalculator() {
  const [marks, setMarks] = useState("");

  const numeric = Number(marks);

  /* ---------- AUTO RESULT ---------- */
  const result = useMemo(() => {
    if (marks === "" || Number.isNaN(numeric)) return null;
    if (numeric < 0 || numeric > 100) return null;

    const [grade, remark] = getGrade(numeric);

    return { marks: numeric, grade, remark };
  }, [marks, numeric]);

  /* ======================================================
     UI
  ====================================================== */

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
      <PercentageInput
        label="Marks / Percentage"
        value={marks}
        onChange={setMarks}
        placeholder="85"
      />

      {/* RESULT (AUTO) */}
      {result && (
        <>
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
              { label: "Marks", value: `${result.marks}%`, variant: "info" },
              { label: "Remark", value: result.remark, variant: "success" },
            ]}
          />

          <ExplanationText
            text={`With ${result.marks}% marks, your grade is ${result.grade} (${result.remark}).`}
          />
        </>
      )}

      <GradeCalculatorArticle />
    </CalculatorLayout>
  );
}
