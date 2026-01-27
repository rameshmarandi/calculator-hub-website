"use client";

import { useState } from "react";
import { Calculator, GraduationCap } from "lucide-react";

import { PercentageInput } from "../../inputs/PercentageInput";
import { ResultCard } from "../../ResultCard";

export default function SGPAToCGPACalculator() {
  const [sgpaList, setSgpaList] = useState([""]);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    const validValues = sgpaList.filter((v) => v !== "");

    if (validValues.length === 0) {
      setError("Please enter at least one SGPA value.");
      return false;
    }

    for (let sgpa of validValues) {
      if (Number(sgpa) <= 0 || Number(sgpa) > 10) {
        setError("SGPA values must be between 0 and 10.");
        return false;
      }
    }

    setError("");
    return true;
  }

  /* ---------------- CALCULATION ---------------- */
  function calculateCGPA(e) {
    e.preventDefault();
    if (!validate()) return;

    const values = sgpaList.filter((v) => v !== "").map((v) => Number(v));

    const total = values.reduce((sum, v) => sum + v, 0);
    const cgpa = total / values.length;

    setResult({
      cgpa: cgpa.toFixed(2),
      semesters: values.length,
    });
  }

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
      }}>
      {/* ================= HEADER ================= */}
      <header>
        <h1 className="text-2xl font-bold mb-1">SGPA to CGPA Calculator</h1>
        <p className="text-sm leading-relaxed">
          Calculate your CGPA easily by entering SGPA values from multiple
          semesters using this SGPA to CGPA Calculator.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateCGPA} className="space-y-4">
        {sgpaList.map((value, index) => (
          <PercentageInput
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
          }}>
          + Add Another Semester
        </button>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          className="w-full py-2.5 rounded-md font-medium flex items-center justify-center gap-2"
          style={{
            backgroundColor: "var(--primary)",
            color: "#fff",
          }}>
          <Calculator size={18} />
          Calculate CGPA
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <div aria-live="polite">
          <ResultCard
            variant="primary"
            icon={<GraduationCap size={20} />}
            label={`CGPA after ${result.semesters} Semesters`}
            value={result.cgpa}
          />
        </div>
      )}

      {/* ================= SEO BLOG CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          How SGPA Is Converted to CGPA
        </h2>

        <p>
          SGPA (Semester Grade Point Average) represents academic performance in
          a single semester. CGPA (Cumulative Grade Point Average) is the
          average of all SGPA values across semesters.
        </p>

        <h3 className="font-semibold">SGPA to CGPA Formula</h3>

        <p
          className="font-mono text-xs p-3 rounded"
          style={{ backgroundColor: "var(--surface-2)" }}>
          CGPA = (Sum of All SGPA Values) ÷ (Number of Semesters)
        </p>

        <ul className="list-disc pl-5">
          <li>Each semester contributes equally</li>
          <li>Commonly used in Indian universities</li>
          <li>Simple average method</li>
        </ul>

        <h3 className="font-semibold">Why Use an SGPA to CGPA Calculator?</h3>

        <ul className="list-disc pl-5">
          <li>Quick calculation for multiple semesters</li>
          <li>Avoids manual averaging errors</li>
          <li>Useful for resumes and applications</li>
          <li>Tracks academic progress</li>
        </ul>

        <p>
          This calculator uses the standard averaging method. Some universities
          may apply credit-weighted calculations.
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ CGPA calculation rules may vary by institution. Always confirm with
        your university’s official grading policy.
      </aside>
    </section>
  );
}
