"use client";

import { useState } from "react";
import { Trophy } from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { ResultCard } from "../../ResultCard";

import { jeePercentileCalculator } from "../../../lib/formulas";
import JEEPercentileCalculatorArticle from "../../content/education/JEEPercentileCalculatorArticle";

export default function JEEPercentileCalculator() {

  /* ---------------- PREFILLED VALUES ---------------- */
  const [yourMarks, setYourMarks] = useState("180");
  const [maxMarks, setMaxMarks] = useState("300");
  const [totalCandidates, setTotalCandidates] = useState("900000");
  const [candidatesBelow, setCandidatesBelow] = useState("850000");

  /* ---------------- SAFE INPUTS ---------------- */
  const safeYourMarks = Number(yourMarks) || 0;
  const safeMaxMarks = Number(maxMarks) || 0;
  const safeTotalCandidates = Number(totalCandidates) || 0;
  const safeCandidatesBelow = Number(candidatesBelow) || 0;

  /* ---------------- CALCULATION ---------------- */
  const result = jeePercentileCalculator({
    yourMarks: safeYourMarks,
    maxMarks: safeMaxMarks,
    totalCandidates: safeTotalCandidates,
    candidatesBelow: safeCandidatesBelow
  });

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
          JEE Percentile Calculator
        </h1>

        <p className="text-sm leading-relaxed">
          Estimate your JEE Main percentile using candidate ranking data.
        </p>
      </header>

      {/* INPUTS */}
      <div className="space-y-4">

        <AmountInput
          label="Marks Obtained"
          value={yourMarks}
          onChange={setYourMarks}
          prefix=""
          placeholder="180"
          min={0}
        />

        <AmountInput
          label="Maximum Marks"
          value={maxMarks}
          onChange={setMaxMarks}
          prefix=""
          placeholder="300"
          min={1}
        />

        <AmountInput
          label="Total Number of Candidates"
          value={totalCandidates}
          onChange={setTotalCandidates}
          prefix=""
          placeholder="900000"
          min={1}
        />

        <AmountInput
          label="Candidates Scoring Less Than You"
          value={candidatesBelow}
          onChange={setCandidatesBelow}
          prefix=""
          placeholder="850000"
          min={0}
        />

      </div>

      {/* RESULT */}
      <div aria-live="polite">
        <ResultCard
          variant="primary"
          icon={<Trophy size={20} />}
          label="Estimated JEE Percentile"
          value={`${result.percentile || 0}%`}
        />
      </div>

     <JEEPercentileCalculatorArticle/>

    </section>
  );
}