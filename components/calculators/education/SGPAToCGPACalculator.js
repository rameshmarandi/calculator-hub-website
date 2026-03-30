"use client";

import { useState } from "react";
import { GraduationCap } from "lucide-react";

import { InputField } from "../../inputs/InputField";
import { ResultCard } from "../../ResultCard";

import { sgpaToCgpaCalculator } from "../../../lib/formulas";
import SGPAToCGPACalculatorArticle from "../../content/education/SGPAToCGPACalculatorArticle";

export default function SGPAToCGPACalculator() {

  /* ---------------- PREFILLED VALUES ---------------- */
  const [sgpaList, setSgpaList] = useState(["8.2", "7.9"]);

  /* ---------------- SAFE INPUTS ---------------- */
  const safeValues = sgpaList
    .filter((v) => v !== "")
    .map((v) => Number(v) || 0);

  /* ---------------- CALCULATION ---------------- */
  const result = sgpaToCgpaCalculator({
    sgpaList: safeValues
  });

  function addSemester() {
    setSgpaList([...sgpaList, ""]);
  }

  function updateSGPA(index, value) {
    const updated = [...sgpaList];
    updated[index] = value;
    setSgpaList(updated);
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
          SGPA to CGPA Calculator
        </h1>

        <p className="text-sm leading-relaxed">
          Calculate your CGPA by entering SGPA values from each semester.
          This tool averages your SGPA scores to estimate cumulative CGPA.
        </p>
      </header>


      {/* ================= INPUTS ================= */}
      <div className="space-y-4">

        {sgpaList.map((value, index) => (
          <InputField
            key={index}
            label={`Semester ${index + 1} SGPA`}
            value={value}
            onChange={(v) => updateSGPA(index, v)}
            placeholder="8.0"
          />
        ))}

        <button
          type="button"
          onClick={addSemester}
          className="w-full py-2 rounded-md text-sm"
          style={{
            border: "1px dashed var(--border)",
            color: "var(--text)",
          }}
        >
          + Add Another Semester
        </button>

      </div>


      {/* ================= RESULT ================= */}
      <div aria-live="polite">
        <ResultCard
          variant="primary"
          icon={<GraduationCap size={20} />}
          label={`CGPA after ${result.semesters || 0} Semesters`}
          value={result.cgpa || 0}
        />
      </div>


      {/* ================= SEO CONTENT ================= */}
     <SGPAToCGPACalculatorArticle/>

    </section>
  );
}