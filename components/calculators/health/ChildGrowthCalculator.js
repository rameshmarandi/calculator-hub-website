"use client";

import { useState, useMemo } from "react";
import { Activity } from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { ResultCard } from "../../ResultCard";
import ChildGrowthCalculatorArticle from "../../content/health/ChildGrowthCalculatorArticle";

import { calculateChildGrowth } from "../../../lib/formulas";

export default function ChildGrowthCalculator() {
  /* ---------------- DEFAULT PREFILLED DATA ---------------- */
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("6");
  const [height, setHeight] = useState("120");
  const [weight, setWeight] = useState("22");

  /* ---------------- LIVE CALCULATION ---------------- */
  const result = useMemo(() => {
    return calculateChildGrowth({
      gender,
      age,
      height,
      weight,
    });
  }, [gender, age, height, weight]);

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
        <h1 className="text-2xl font-bold mb-1">Child Growth Calculator</h1>
        <p className="text-sm leading-relaxed">
          Use this Child Growth Calculator to get a quick understanding of your
          child’s growth status based on age, height, and weight.
        </p>
      </header>

      {/* ================= INPUTS ================= */}
      <div className="space-y-4">
        {/* Gender */}
        <div
          className="flex rounded-md overflow-hidden"
          style={{ border: "1px solid var(--border)" }}
        >
          <button
            type="button"
            onClick={() => setGender("male")}
            className="flex-1 py-2 text-sm font-medium"
            style={{
              backgroundColor:
                gender === "male" ? "var(--primary)" : "transparent",
              color: gender === "male" ? "#fff" : "var(--text)",
            }}
          >
            Boy
          </button>

          <button
            type="button"
            onClick={() => setGender("female")}
            className="flex-1 py-2 text-sm font-medium"
            style={{
              backgroundColor:
                gender === "female" ? "var(--primary)" : "transparent",
              color: gender === "female" ? "#fff" : "var(--text)",
              borderLeft: "1px solid var(--border)",
            }}
          >
            Girl
          </button>
        </div>

        <AmountInput
          label="Age (years)"
          value={age}
          onChange={setAge}
          prefix=""
        />

        <AmountInput
          label="Height (cm)"
          value={height}
          onChange={setHeight}
          prefix=""
        />

        <AmountInput
          label="Weight (kg)"
          value={weight}
          onChange={setWeight}
          prefix=""
        />
      </div>

      {/* ================= RESULT ================= */}
      <div aria-live="polite">
        <ResultCard
          variant={result.variant}
          icon={<Activity size={20} />}
          label="Growth Result"
          value={`BMI: ${result.bmi} — ${result.status}`}
        />
      </div>

      {/* ================= SEO ARTICLE ================= */}
      <ChildGrowthCalculatorArticle />
    </section>
  );
}