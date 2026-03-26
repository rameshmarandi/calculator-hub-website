"use client";

import { useState } from "react";
import { GraduationCap } from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { ResultCard } from "../../ResultCard";

import { cgpaToPercentageCalculator } from "../../../lib/formulas";
import { InputField } from "../../inputs/InputField";

export default function CGPAToPercentageCalculator() {

  /* ---------------- PREFILLED VALUES ---------------- */
  const [cgpa, setCgpa] = useState("8.2");
  const [scale, setScale] = useState("10");
  const [conversionFactor, setConversionFactor] = useState("9.5");

  /* ---------------- SAFE INPUTS ---------------- */
  const safeCgpa = Number(cgpa) || 0;
  const safeScale = Number(scale) || 0;
  const safeConversionFactor = Number(conversionFactor) || 0;

  /* ---------------- CALCULATION ---------------- */
  const result = cgpaToPercentageCalculator({
    cgpa: safeCgpa,
    scale: safeScale,
    conversionFactor: safeConversionFactor
  });

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
          CGPA to Percentage Calculator
        </h1>

        <p className="text-sm leading-relaxed">
          Convert your CGPA into percentage easily using this calculator.
          Many universities use a multiplier to convert CGPA scores into
          percentage values.
        </p>
      </header>


      {/* ================= INPUTS ================= */}
      <div className="space-y-4">

        <InputField
          label="CGPA"
          value={cgpa}
          onChange={setCgpa}
          prefix=""
          placeholder="8.2"
        />

        <AmountInput
          label="CGPA Scale"
          value={scale}
          onChange={setScale}
          prefix=""
          placeholder="10"
        />

        <InputField
          label="Conversion Factor"
          value={conversionFactor}
          onChange={setConversionFactor}
          prefix=""
          placeholder="9.5"
        />

      </div>


      {/* ================= RESULT ================= */}
      <div aria-live="polite">
        <ResultCard
          variant="primary"
          icon={<GraduationCap size={20} />}
          label={`CGPA ${safeCgpa} in Percentage`}
          value={`${result.percentage || 0}%`}
        />
      </div>


      {/* ================= SEO CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">

        <h2 className="font-semibold text-base">
          How CGPA Is Converted to Percentage
        </h2>

        <p>
          CGPA (Cumulative Grade Point Average) is widely used by schools
          and universities to measure academic performance. Some institutions
          convert CGPA scores into percentage format for transcripts,
          job applications, and higher education admissions.
        </p>

        <h3 className="font-semibold">
          CGPA to Percentage Formula
        </h3>

        <p
          className="font-mono text-xs p-3 rounded"
          style={{ backgroundColor: "var(--surface-2)" }}
        >
          Percentage = CGPA × Conversion Factor
        </p>

        <ul className="list-disc pl-5">
          <li>Most Indian boards use a factor of 9.5</li>
          <li>Some universities use custom multipliers</li>
          <li>Always verify the official rule of your institution</li>
        </ul>

        <h3 className="font-semibold">
          Why Use a CGPA to Percentage Calculator?
        </h3>

        <ul className="list-disc pl-5">
          <li>Provides quick conversion of CGPA scores</li>
          <li>Helps students estimate their percentage</li>
          <li>Useful for resumes and college applications</li>
          <li>Eliminates manual calculation mistakes</li>
        </ul>

        <p>
          This calculator estimates the percentage equivalent of your CGPA
          using a configurable conversion factor.
        </p>

      </article>


      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ CGPA conversion rules differ by university and education board.
        Always verify official grading policies before submitting academic
        records.
      </aside>

    </section>
  );
}