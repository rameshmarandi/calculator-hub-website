"use client";

import { useState } from "react";
import { Calculator, GraduationCap } from "lucide-react";

import { PercentageInput } from "../../inputs/PercentageInput";
import { ResultCard } from "../../ResultCard";

export default function GPACalculator() {
  const [grades, setGrades] = useState([""]);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    const validGrades = grades.filter((g) => g !== "");

    if (validGrades.length === 0) {
      setError("Please enter at least one subject grade point.");
      return false;
    }

    for (let g of validGrades) {
      if (isNaN(g) || Number(g) < 0 || Number(g) > 10) {
        setError("Grade points must be between 0 and 10.");
        return false;
      }
    }

    setError("");
    return true;
  }

  /* ---------------- CALCULATION ---------------- */
  function calculateGPA(e) {
    e.preventDefault();
    if (!validate()) return;

    const values = grades
      .filter((g) => g !== "")
      .map((g) => Number(g));

    const total = values.reduce((sum, v) => sum + v, 0);
    const gpa = total / values.length;

    setResult({
      gpa: gpa.toFixed(2),
      subjects: values.length,
    });
  }

  function addSubject() {
    setGrades([...grades, ""]);
  }

  function updateGrade(index, value) {
    const updated = [...grades];
    updated[index] = value;
    setGrades(updated);
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
          GPA Calculator
        </h1>
        <p className="text-sm leading-relaxed">
          Calculate your Grade Point Average (GPA) easily by entering
          grade points for each subject using this GPA Calculator.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateGPA} className="space-y-4">
        {grades.map((value, index) => (
          <PercentageInput
            key={index}
            label={`Subject ${index + 1} Grade Point`}
            value={value}
            onChange={(v) => updateGrade(index, v)}
            placeholder="8.5"
          />
        ))}

        <button
          type="button"
          onClick={addSubject}
          className="w-full py-2 rounded-md text-sm"
          style={{
            border: "1px dashed var(--border)",
            color: "var(--text)",
          }}
        >
          + Add Another Subject
        </button>

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
          Calculate GPA
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <div aria-live="polite">
          <ResultCard
            variant="primary"
            icon={<GraduationCap size={20} />}
            label={`GPA for ${result.subjects} Subjects`}
            value={result.gpa}
          />
        </div>
      )}

      {/* ================= SEO BLOG CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          What Is GPA?
        </h2>

        <p>
          GPA (Grade Point Average) is a numerical representation of a
          student’s academic performance. It is calculated by averaging
          grade points obtained across subjects.
        </p>

        <h3 className="font-semibold">
          GPA Calculation Formula
        </h3>

        <p
          className="font-mono text-xs p-3 rounded"
          style={{ backgroundColor: "var(--surface-2)" }}
        >
          GPA = (Sum of Grade Points) ÷ (Number of Subjects)
        </p>

        <ul className="list-disc pl-5">
          <li>Used in schools, colleges, and universities</li>
          <li>Common GPA scale is 0 to 10 or 0 to 4</li>
          <li>Higher GPA indicates better academic performance</li>
        </ul>

        <h3 className="font-semibold">
          Why Use a GPA Calculator?
        </h3>

        <ul className="list-disc pl-5">
          <li>Quick GPA calculation</li>
          <li>Avoids manual averaging errors</li>
          <li>Useful for tracking academic progress</li>
          <li>Helps with applications and evaluations</li>
        </ul>

        <p>
          This GPA calculator uses a simple average method. Some
          institutions may use credit-weighted GPA calculations.
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ GPA calculation methods vary by institution. Always refer to
        your official academic guidelines for final GPA results.
      </aside>
    </section>
  );
}
