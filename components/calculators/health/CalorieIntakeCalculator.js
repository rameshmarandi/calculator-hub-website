"use client";

import { useMemo, useState } from "react";
import { BarChart } from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { ResultCard } from "../../ResultCard";
import CalorieIntakeCalculatorArticle from "../../content/health/CalorieIntakeCalculatorArticle";

import { calculateCalorieIntake } from "../../../lib/formulas";

export default function CalorieIntakeCalculator() {

  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("30");
  const [weight, setWeight] = useState("70");
  const [height, setHeight] = useState("170");
  const [activity, setActivity] = useState("1.55");
  const [goal, setGoal] = useState("maintain");

  const result = useMemo(() => {

    return calculateCalorieIntake(
      gender,
      age,
      weight,
      height,
      activity,
      goal
    );

  }, [gender, age, weight, height, activity, goal]);

  return (
    <section
      className="rounded-xl p-6 space-y-10"
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)"
      }}
    >

      <header>
        <h1 className="text-2xl font-bold mb-1">Calorie Intake Calculator</h1>

        <p className="text-sm leading-relaxed">
          Estimate how many calories you should consume daily to maintain,
          lose, or gain weight.
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

        <div className="space-y-1">
          <label className="text-sm font-medium">Activity Level</label>

          <select
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            className="w-full rounded-md px-3 py-2 text-sm"
            style={{
              border: "1px solid var(--border)",
              backgroundColor: "var(--surface)"
            }}
          >
            <option value="1.2">Sedentary</option>
            <option value="1.375">Lightly Active</option>
            <option value="1.55">Moderately Active</option>
            <option value="1.725">Very Active</option>
            <option value="1.9">Extra Active</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Goal</label>

          <select
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="w-full rounded-md px-3 py-2 text-sm"
            style={{
              border: "1px solid var(--border)",
              backgroundColor: "var(--surface)"
            }}
          >
            <option value="maintain">Maintain Weight</option>
            <option value="lose">Lose Weight</option>
            <option value="gain">Gain Weight</option>
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
          label="Recommended Intake"
          value={`${result.calories} cal/day`}
        />

      </div>

      <CalorieIntakeCalculatorArticle />

    </section>
  );
}