"use client";

import { useState } from "react";
import { GraduationCap } from "lucide-react";

import { InputField } from "../../inputs/InputField";
import { ResultCard } from "../../ResultCard";

import { gpaCalculator } from "../../../lib/formulas";
import GpaCalculatorArticle from "../../content/education/GPACalculatorArticle";

export default function GPACalculator() {

  /* ---------------- PREFILLED VALUES ---------------- */
  const [grades, setGrades] = useState(["8.5", "7.8", "9.0"]);

  /* ---------------- SAFE INPUTS ---------------- */
  const safeGrades = grades
    .filter((g) => g !== "")
    .map((g) => Number(g) || 0);

  /* ---------------- CALCULATION ---------------- */
  const result = gpaCalculator({
    grades: safeGrades
  });

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

      {/* HEADER */}
      <header>
        <h1 className="text-2xl font-bold mb-1">
          GPA Calculator
        </h1>

        <p className="text-sm leading-relaxed">
          Calculate your Grade Point Average by entering
          grade points for each subject.
        </p>
      </header>


      {/* INPUTS */}
      <div className="space-y-4">

        {grades.map((value, index) => (
          <InputField
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

      </div>


      {/* RESULT */}
      <div aria-live="polite">
        <ResultCard
          variant="primary"
          icon={<GraduationCap size={20} />}
          label={`GPA for ${result.subjects || 0} Subjects`}
          value={result.gpa || 0}
        />
      </div>


      {/* SEO CONTENT */}
      <GpaCalculatorArticle/>

    </section>
  );
}