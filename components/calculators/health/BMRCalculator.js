"use client";

import { useMemo, useState } from "react";
import { BarChart } from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { ResultCard } from "../../ResultCard";
import BMRCalculatorArticle from "../../content/health/BMRCalculatorArticle";

/* ---------- SAFE PARSER ---------- */

function parseNumber(value) {
  const num = Number(String(value).replace(/,/g, ""));
  return Number.isFinite(num) ? num : 0;
}

export default function BMRCalculator() {

  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("30");
  const [weight, setWeight] = useState("70");
  const [height, setHeight] = useState("170");

  const result = useMemo(() => {

    const a = parseNumber(age);
    const w = parseNumber(weight);
    const h = parseNumber(height);

    let bmr = 0;

    if (gender === "male") {
      bmr = 10 * w + 6.25 * h - 5 * a + 5;
    } else {
      bmr = 10 * w + 6.25 * h - 5 * a - 161;
    }

    return {
      bmr: Math.round(bmr)
    };

  }, [gender, age, weight, height]);

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
          BMR Calculator
        </h1>

        <p className="text-sm leading-relaxed">
          Estimate your Basal Metabolic Rate and daily calorie needs
          based on age, weight, height and gender.
        </p>
      </header>

      {/* GENDER SWITCH */}

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
            backgroundColor:
              gender === "female" ? "var(--primary)" : "transparent",
            color: gender === "female" ? "#fff" : "var(--text)",
            borderLeft: "1px solid var(--border)"
          }}
        >
          Female
        </button>

      </div>

      {/* INPUTS */}

      <div className="grid md:grid-cols-3 gap-4">

        <AmountInput
          label="Age (years)"
          value={age}
          onChange={setAge}
          prefix=""
        />

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

      {/* RESULT */}

      <div aria-live="polite">

        <ResultCard
          variant="primary"
          icon={<BarChart size={20} />}
          label="Your BMR"
          value={`${result.bmr} calories/day`}
        />

        <div
          className="rounded-lg p-4 space-y-3 text-sm mt-3"
          style={{
            backgroundColor: "var(--surface-muted)",
            border: "1px solid var(--border)"
          }}
        >

          <h3 className="font-semibold">
            Estimated Daily Calorie Needs
          </h3>

          <ul className="space-y-1">

            <li>
              Sedentary: ~{Math.round(result.bmr * 1.2)} calories/day
            </li>

            <li>
              Light Activity: ~{Math.round(result.bmr * 1.375)} calories/day
            </li>

            <li>
              Moderate Activity: ~{Math.round(result.bmr * 1.55)} calories/day
            </li>

            <li>
              Very Active: ~{Math.round(result.bmr * 1.725)} calories/day
            </li>

          </ul>

        </div>

      </div>

      <BMRCalculatorArticle />

    </section>
  );
}