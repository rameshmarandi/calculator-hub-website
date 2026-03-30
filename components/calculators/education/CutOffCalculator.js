"use client";

import { useState } from "react";
import { Target } from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { ResultCard } from "../../ResultCard";

import { cutoffCalculator } from "../../../lib/formulas";
import CutOffCalculatorArticle from "../../content/education/CutOffCalculatorArticle";

export default function CutOffCalculator() {

  /* ---------------- PREFILLED VALUES ---------------- */
  const [maths, setMaths] = useState("95");
  const [physics, setPhysics] = useState("88");
  const [chemistry, setChemistry] = useState("90");

  /* ---------------- SAFE INPUTS ---------------- */
  const safeMaths = Number(maths) || 0;
  const safePhysics = Number(physics) || 0;
  const safeChemistry = Number(chemistry) || 0;

  /* ---------------- CALCULATION ---------------- */
  const result = cutoffCalculator({
    maths: safeMaths,
    physics: safePhysics,
    chemistry: safeChemistry
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
          Cut Off Calculator
        </h1>

        <p className="text-sm leading-relaxed">
          Calculate engineering cutoff marks using Mathematics,
          Physics, and Chemistry scores.
        </p>
      </header>


      {/* INPUTS */}
      <div className="space-y-4">

        <AmountInput
          label="Mathematics Marks"
          value={maths}
          onChange={setMaths}
          prefix=""
          placeholder="95"
          min={0}
          max={100}
        />

        <AmountInput
          label="Physics Marks"
          value={physics}
          onChange={setPhysics}
          prefix=""
          placeholder="88"
          min={0}
          max={100}
        />

        <AmountInput
          label="Chemistry Marks"
          value={chemistry}
          onChange={setChemistry}
          prefix=""
          placeholder="90"
          min={0}
          max={100}
        />

      </div>


      {/* RESULT */}
      <div aria-live="polite">
        <ResultCard
          variant="primary"
          icon={<Target size={20} />}
          label="Your Cut Off Marks"
          value={result.cutOff || 0}
        />
      </div>


      {/* SEO CONTENT */}
     <CutOffCalculatorArticle/>
    </section>
  );
}