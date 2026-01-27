"use client";

import { useState } from "react";
import { Calculator, GraduationCap } from "lucide-react";

import { PercentageInput } from "../../inputs/PercentageInput";
import { ResultCard } from "../../ResultCard";

export default function CGPAToPercentageCalculator() {
  const [cgpa, setCgpa] = useState("");
  const [scale, setScale] = useState("10");
  const [multiplier, setMultiplier] = useState("9.5");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    if (!cgpa || Number(cgpa) <= 0) {
      setError("Please enter a valid CGPA.");
      return false;
    }

    if (Number(cgpa) > Number(scale)) {
      setError("CGPA cannot be greater than the grading scale.");
      return false;
    }

    if (!multiplier || Number(multiplier) <= 0) {
      setError("Please enter a valid conversion factor.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- CALCULATION ---------------- */
  function calculatePercentage(e) {
    e.preventDefault();
    if (!validate()) return;

    const c = Number(cgpa);
    const m = Number(multiplier);

    const percentage = c * m;

    setResult({
      cgpa: c,
      percentage: percentage.toFixed(2),
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
        <h1 className="text-2xl font-bold mb-1">
          CGPA to Percentage Calculator
        </h1>
        <p className="text-sm leading-relaxed">
          Convert your CGPA into percentage easily using this calculator.
          Supports standard university conversion methods with customizable
          grading scales.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculatePercentage} className="space-y-4">
        <PercentageInput
          label="CGPA"
          value={cgpa}
          onChange={setCgpa}
          placeholder="8.2"
        />

        <PercentageInput
          label="CGPA Scale"
          value={scale}
          onChange={setScale}
          placeholder="10"
        />

        <PercentageInput
          label="Conversion Factor"
          value={multiplier}
          onChange={setMultiplier}
          placeholder="9.5"
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
          Convert to Percentage
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <div aria-live="polite">
          <ResultCard
            variant="primary"
            icon={<GraduationCap size={20} />}
            label={`CGPA ${result.cgpa} in Percentage`}
            value={`${result.percentage}%`}
          />
        </div>
      )}

      {/* ================= SEO BLOG CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          How CGPA Is Converted to Percentage
        </h2>

        <p>
          CGPA (Cumulative Grade Point Average) is commonly used by schools and
          universities to evaluate academic performance. Many institutions
          convert CGPA into a percentage format for job applications, higher
          education, or official documentation.
        </p>

        <h3 className="font-semibold">CGPA to Percentage Formula</h3>

        <p
          className="font-mono text-xs p-3 rounded"
          style={{ backgroundColor: "var(--surface-2)" }}>
          Percentage = CGPA × Conversion Factor
        </p>

        <ul className="list-disc pl-5">
          <li>Most Indian universities use a factor of 9.5</li>
          <li>Some institutions use 10 or custom multipliers</li>
          <li>Always verify your university’s official rule</li>
        </ul>

        <h3 className="font-semibold">
          Why Use a CGPA to Percentage Calculator?
        </h3>

        <ul className="list-disc pl-5">
          <li>Quick and accurate conversion</li>
          <li>Eliminates manual calculation errors</li>
          <li>Useful for resumes and applications</li>
          <li>Supports different grading systems</li>
        </ul>

        <p>
          This calculator provides an estimated percentage based on the
          conversion factor selected. Official results may vary by institution.
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ Conversion rules differ by university and board. Always refer to your
        institution’s official grading policy for final results.
      </aside>
    </section>
  );
}
