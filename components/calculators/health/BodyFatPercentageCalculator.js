"use client";

import { useMemo, useState } from "react";
import { BarChart } from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { ResultCard } from "../../ResultCard";
import BodyFatPercentageCalculatorArticle from "../../content/health/BodyFatPercentageCalculatorArticle";

import { calculateBodyFat } from "../../../lib/formulas";

export default function BodyFatPercentageCalculator() {

  const [gender, setGender] = useState("male");

  const [age, setAge] = useState("30");
  const [height, setHeight] = useState("170");
  const [neck, setNeck] = useState("38");
  const [waist, setWaist] = useState("85");
  const [hip, setHip] = useState("95");

  const result = useMemo(() => {

    return calculateBodyFat(
      gender,
      height,
      neck,
      waist,
      hip
    );

  }, [gender, height, neck, waist, hip]);

  return (
    <section
      className="rounded-xl p-6 space-y-10"
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)"
      }}
    >

      <header>
        <h1 className="text-2xl font-bold mb-1">
          Body Fat Percentage Calculator
        </h1>

        <p className="text-sm leading-relaxed">
          Estimate your body fat percentage using the US Navy method based on body measurements.
        </p>
      </header>

      <div className="space-y-4">

        <div
          className="flex rounded-md overflow-hidden"
          style={{ border: "1px solid var(--border)" }}
        >

          <button
            type="button"
            onClick={() => setGender("male")}
            className="flex-1 py-2 text-sm font-medium"
            style={{
              backgroundColor: gender === "male" ? "var(--primary)" : "transparent",
              color: gender === "male" ? "#fff" : "var(--text)"
            }}
          >
            Male
          </button>

          <button
            type="button"
            onClick={() => setGender("female")}
            className="flex-1 py-2 text-sm font-medium"
            style={{
              backgroundColor: gender === "female" ? "var(--primary)" : "transparent",
              color: gender === "female" ? "#fff" : "var(--text)",
              borderLeft: "1px solid var(--border)"
            }}
          >
            Female
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
          label="Neck Circumference (cm)"
          value={neck}
          onChange={setNeck}
          prefix=""
        />

        <AmountInput
          label="Waist Circumference (cm)"
          value={waist}
          onChange={setWaist}
          prefix=""
        />

        {gender === "female" && (
          <AmountInput
            label="Hip Circumference (cm)"
            value={hip}
            onChange={setHip}
            prefix=""
          />
        )}

      </div>

      <div className="space-y-3" aria-live="polite">

        <ResultCard
          variant="primary"
          icon={<BarChart size={20} />}
          label="Body Fat Percentage"
          value={`${result.bodyFat} %`}
        />

        <ResultCard
          variant="secondary"
          label="Category"
          value={result.category}
        />

      </div>

      <BodyFatPercentageCalculatorArticle />

    </section>
  );
}