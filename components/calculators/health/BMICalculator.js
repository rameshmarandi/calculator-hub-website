"use client";

import { useMemo, useState } from "react";
import { BarChart } from "lucide-react";

import { ResultCard } from "../../ResultCard";
import BMICalculatorArticle from "../../content/health/BMICalculatorArticle";
import { AmountInput } from "../../inputs/AmountInput";

/* ---------- SAFE NUMBER PARSER ---------- */

function parseNumber(value) {
  const num = Number(String(value).replace(/,/g, ""));
  return Number.isFinite(num) ? num : 0;
}

export default function BMICalculator() {

  const [weight, setWeight] = useState("70");
  const [height, setHeight] = useState("170");

  /* ---------- LIVE CALCULATION ---------- */

  const result = useMemo(() => {

    const w = parseNumber(weight);
    const h = parseNumber(height) / 100;

    const bmi = h > 0 ? w / (h * h) : 0;

    let category = "—";

    if (bmi > 0) {
      if (bmi < 18.5) category = "Underweight";
      else if (bmi < 25) category = "Normal weight";
      else if (bmi < 30) category = "Overweight";
      else category = "Obese";
    }

    return {
      bmi: bmi > 0 ? bmi.toFixed(1) : "0",
      category
    };

  }, [weight, height]);

  return (
    <section
      className="rounded-xl p-6 space-y-10"
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)"
      }}
    >

      {/* HEADER */}

      <header>
        <h1 className="text-2xl font-bold mb-1">
          BMI Calculator
        </h1>

        <p className="text-sm leading-relaxed">
          Check your Body Mass Index (BMI) and understand whether
          your weight is healthy for your height.
        </p>
      </header>

      {/* INPUTS */}

      <div className="grid md:grid-cols-2 gap-4">

        <AmountInput
          label="Weight (kg)"
          value={weight}
          onChange={setWeight}
          prefix=""
        />

        <AmountInput
          label="Height (cm)"
          value={height}
          onChange={setHeight}
          prefix=""
        />

      </div>

      {/* RESULTS */}

      <div
        className="grid md:grid-cols-2 gap-4"
        aria-live="polite"
      >

        <ResultCard
          variant="primary"
          icon={<BarChart size={20} />}
          label="Your BMI"
          value={result.bmi}
        />

        <ResultCard
          variant="neutral"
          icon={<BarChart size={20} />}
          label="BMI Category"
          value={result.category}
        />

      </div>

      {/* ARTICLE */}

      <BMICalculatorArticle />

    </section>
  );
}