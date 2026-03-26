"use client";

import { useMemo, useState } from "react";
import { BarChart } from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { ResultCard } from "../../ResultCard";
import TDEECalculatorArticle from "../../content/health/TDEECalculatorArticle";

/* ---------- SAFE NUMBER PARSER ---------- */

function parseNumber(value) {
  const num = Number(String(value).replace(/,/g, ""));
  return Number.isFinite(num) ? num : 0;
}

export default function TDEECalculator() {

  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("30");
  const [weight, setWeight] = useState("70");
  const [height, setHeight] = useState("170");
  const [activity, setActivity] = useState("1.2");

  const result = useMemo(() => {

    const a = parseNumber(age);
    const w = parseNumber(weight);
    const h = parseNumber(height);
    const factor = parseNumber(activity);

    let bmr = 0;

    if (gender === "male") {
      bmr = 10 * w + 6.25 * h - 5 * a + 5;
    } else {
      bmr = 10 * w + 6.25 * h - 5 * a - 161;
    }

    const tdee = bmr * factor;

    return {
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      weightLoss: Math.round(tdee - 500),
      weightGain: Math.round(tdee + 300)
    };

  }, [gender, age, weight, height, activity]);

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
          TDEE Calculator
        </h1>

        <p className="text-sm leading-relaxed">
          Estimate your Total Daily Energy Expenditure based on body
          measurements and activity level.
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

      {/* ACTIVITY LEVEL */}

      <div className="space-y-1">
        <label className="text-sm font-medium">
          Activity Level
        </label>

        <select
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          className="w-full px-3 py-2 rounded-md text-sm"
          style={{
            border: "1px solid var(--border)",
            backgroundColor: "var(--surface)"
          }}
        >

          <option value="1.2">
            Sedentary — Little or no exercise
          </option>

          <option value="1.375">
            Lightly Active — Light exercise
          </option>

          <option value="1.55">
            Moderately Active — Regular exercise
          </option>

          <option value="1.725">
            Very Active — Hard exercise
          </option>

          <option value="1.9">
            Extra Active — Athlete / physical job
          </option>

        </select>
      </div>

      {/* RESULTS */}

      <div
        className="grid md:grid-cols-2 gap-4"
        aria-live="polite"
      >

        <ResultCard
          variant="neutral"
          icon={<BarChart size={20} />}
          label="Basal Metabolic Rate (BMR)"
          value={`${result.bmr} calories/day`}
        />

        <ResultCard
          variant="primary"
          icon={<BarChart size={20} />}
          label="Total Daily Energy Expenditure (TDEE)"
          value={`${result.tdee} calories/day`}
        />

        <ResultCard
          variant="neutral"
          icon={<BarChart size={20} />}
          label="Calories for Weight Loss"
          value={`${result.weightLoss} calories/day`}
        />

        <ResultCard
          variant="neutral"
          icon={<BarChart size={20} />}
          label="Calories for Weight Gain"
          value={`${result.weightGain} calories/day`}
        />

      </div>

      <TDEECalculatorArticle />

    </section>
  );
}