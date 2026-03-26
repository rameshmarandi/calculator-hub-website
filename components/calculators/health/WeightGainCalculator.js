"use client";

import { useMemo, useState } from "react";
import { BarChart } from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { ResultCard } from "../../ResultCard";
import WeightGainCalculatorArticle from "../../content/health/WeightGainCalculatorArticle";

import { calculateWeightGain } from "../../../lib/formulas";

export default function WeightGainCalculator() {

  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("30");
  const [weight, setWeight] = useState("70");
  const [height, setHeight] = useState("170");
  const [activity, setActivity] = useState("1.375");
  const [pace, setPace] = useState("slow");

  const result = useMemo(() => {

    return calculateWeightGain(
      gender,
      age,
      weight,
      height,
      activity,
      pace
    );

  }, [gender, age, weight, height, activity, pace]);

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
          Weight Gain Calculator
        </h1>

        <p className="text-sm leading-relaxed">
          Estimate how many calories you should consume daily to gain weight safely.
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
          label="Current Weight (kg)"
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

        <div className="space-y-2">
          <label className="text-sm font-medium">Activity Level</label>

          <select
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            className="w-full p-2 rounded-md text-sm"
            style={{
              border: "1px solid var(--border)",
              backgroundColor: "var(--surface)"
            }}
          >
            <option value="1.2">Sedentary</option>
            <option value="1.375">Lightly Active</option>
            <option value="1.55">Moderately Active</option>
            <option value="1.725">Very Active</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Weight Gain Pace</label>

          <select
            value={pace}
            onChange={(e) => setPace(e.target.value)}
            className="w-full p-2 rounded-md text-sm"
            style={{
              border: "1px solid var(--border)",
              backgroundColor: "var(--surface)"
            }}
          >
            <option value="slow">Slow (Lean Gain) — +300 kcal/day</option>
            <option value="moderate">Moderate — +500 kcal/day</option>
            <option value="fast">Fast — +700 kcal/day</option>
          </select>
        </div>

      </div>

      <div className="grid md:grid-cols-3 gap-4" aria-live="polite">

        <ResultCard
          variant="neutral"
          icon={<BarChart size={20} />}
          label="Your BMR"
          value={`${result.bmr} cal/day`}
        />

        <ResultCard
          variant="neutral"
          icon={<BarChart size={20} />}
          label="Your TDEE"
          value={`${result.tdee} cal/day`}
        />

        <ResultCard
          variant="primary"
          icon={<BarChart size={20} />}
          label="Target Calories"
          value={`${result.calories} cal/day`}
        />

      </div>

      <WeightGainCalculatorArticle />

    </section>
  );
}