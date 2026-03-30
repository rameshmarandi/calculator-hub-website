"use client";

import { useState } from "react";
import { GraduationCap } from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { ResultCard } from "../../ResultCard";

import { cgpaToPercentageCalculator } from "../../../lib/formulas";
import { InputField } from "../../inputs/InputField";
import CGPAToPercentageCalculatorArticle from "../../content/education/CGPAToPercentageCalculatorArticle";

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
     <CGPAToPercentageCalculatorArticle/>

    </section>
  );
}