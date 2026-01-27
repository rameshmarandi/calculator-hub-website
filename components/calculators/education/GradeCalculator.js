"use client";

import { useState } from "react";
import { Calculator, Award } from "lucide-react";

import { PercentageInput } from "../../inputs/PercentageInput";
import { ResultCard } from "../../ResultCard";

export default function GradeCalculator() {
  const [marks, setMarks] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    if (!marks || isNaN(marks)) {
      setError("Please enter valid marks.");
      return false;
    }

    if (Number(marks) < 0 || Number(marks) > 100) {
      setError("Marks must be between 0 and 100.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- CALCULATION ---------------- */
  function calculateGrade(e) {
    e.preventDefault();
    if (!validate()) return;

    const m = Number(marks);
    let grade = "";
    let remark = "";

    if (m >= 90) {
      grade = "A+";
      remark = "Outstanding";
    } else if (m >= 80) {
      grade = "A";
      remark = "Excellent";
    } else if (m >= 70) {
      grade = "B+";
      remark = "Very Good";
    } else if (m >= 60) {
      grade = "B";
      remark = "Good";
    } else if (m >= 50) {
      grade = "C";
      remark = "Average";
    } else if (m >= 40) {
      grade = "D";
      remark = "Pass";
    } else {
      grade = "F";
      remark = "Fail";
    }

    setResult({
      marks: m,
      grade,
      remark,
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
        <h1 className="text-2xl font-bold mb-1">Grade Calculator</h1>
        <p className="text-sm leading-relaxed">
          Use this Grade Calculator to convert your marks or percentage into
          academic grades instantly based on standard grading systems.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateGrade} className="space-y-4">
        <PercentageInput
          label="Marks / Percentage"
          value={marks}
          onChange={setMarks}
          placeholder="85"
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
          Calculate Grade
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <div aria-live="polite">
          <ResultCard
            variant="primary"
            icon={<Award size={20} />}
            label={`Grade for ${result.marks}%`}
            value={`${result.grade} (${result.remark})`}
          />
        </div>
      )}

      {/* ================= SEO BLOG CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">How Grades Are Calculated</h2>

        <p>
          Academic grades are used to evaluate student performance based on
          marks or percentage obtained in exams. Different institutions may
          follow slightly different grading scales.
        </p>

        <h3 className="font-semibold">Standard Grade Scale</h3>

        <ul className="list-disc pl-5">
          <li>90–100% → A+ (Outstanding)</li>
          <li>80–89% → A (Excellent)</li>
          <li>70–79% → B+ (Very Good)</li>
          <li>60–69% → B (Good)</li>
          <li>50–59% → C (Average)</li>
          <li>40–49% → D (Pass)</li>
          <li>Below 40% → F (Fail)</li>
        </ul>

        <h3 className="font-semibold">Why Use a Grade Calculator?</h3>

        <ul className="list-disc pl-5">
          <li>Instant grade conversion</li>
          <li>Eliminates confusion in grading</li>
          <li>Useful for students and teachers</li>
          <li>Helps track academic performance</li>
        </ul>

        <p>
          This grade calculator uses a commonly accepted grading scale. Always
          refer to your institution’s official grading policy for final
          evaluation.
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ Grading systems may vary by school, board, or university. This
        calculator provides an estimated grade for reference only.
      </aside>
    </section>
  );
}
