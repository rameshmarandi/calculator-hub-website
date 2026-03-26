"use client";

import { useMemo, useState } from "react";
import { Activity } from "lucide-react";

import CalculatorLayout from "@/components/core/CalculatorLayout";
import InputsGrid from "@/components/core/InputsGrid";

import { AmountInput } from "../../inputs/AmountInput";
import { ResultCard } from "../../ResultCard";

import KetoCalculatorArticle from "../../content/health/KetoCalculatorArticle";
import { calculateKetoMacros } from "../../../lib/formulas";



export default function KetoCalculator() {

  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("30");
  const [weight, setWeight] = useState("70");
  const [height, setHeight] = useState("170");
  const [activity, setActivity] = useState("1.375");
  const [goal, setGoal] = useState("maintain");

  const result = useMemo(() => {
    return calculateKetoMacros({
      gender,
      age,
      weight,
      height,
      activity,
      goal
    });
  }, [gender, age, weight, height, activity, goal]);

  return (
    <CalculatorLayout
      title="Keto Calculator"
      description="Calculate daily ketogenic calories and macros based on your body metrics."
    >

      <InputsGrid>

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

      </InputsGrid>

      {/* Gender */}
      <div className="flex rounded-md overflow-hidden border border-[var(--border)]">

        <button
          type="button"
          onClick={() => setGender("male")}
          className={`flex-1 py-2 text-sm font-medium ${
            gender === "male"
              ? "bg-[var(--primary)] text-white"
              : "bg-transparent text-[var(--text)]"
          }`}
        >
          Male
        </button>

        <button
          type="button"
          onClick={() => setGender("female")}
          className={`flex-1 py-2 text-sm font-medium border-l border-[var(--border)] ${
            gender === "female"
              ? "bg-[var(--primary)] text-white"
              : "bg-transparent text-[var(--text)]"
          }`}
        >
          Female
        </button>

      </div>

      {/* Activity */}
      <div>

        <label className="text-sm font-medium">Activity Level</label>

        <select
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          className="w-full mt-1 px-3 py-2 rounded border border-[var(--border)]"
        >
          <option value="1.2">Sedentary</option>
          <option value="1.375">Lightly Active</option>
          <option value="1.55">Moderately Active</option>
          <option value="1.725">Very Active</option>
        </select>

      </div>

      {/* Goal */}
      <div>

        <label className="text-sm font-medium">Goal</label>

        <select
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          className="w-full mt-1 px-3 py-2 rounded border border-[var(--border)]"
        >
          <option value="lose">Weight Loss</option>
          <option value="maintain">Maintain Weight</option>
          <option value="gain">Weight Gain</option>
        </select>

      </div>

      {/* RESULT (Always Render) */}
      <div className="grid md:grid-cols-4 gap-4">

        <ResultCard
          variant="primary"
          icon={<Activity size={20} />}
          label="Daily Calories"
          value={`${result.calories} kcal`}
        />

        <ResultCard
          variant="neutral"
          icon={<Activity size={20} />}
          label="Fat"
          value={`${result.fat} g`}
        />

        <ResultCard
          variant="neutral"
          icon={<Activity size={20} />}
          label="Protein"
          value={`${result.protein} g`}
        />

        <ResultCard
          variant="neutral"
          icon={<Activity size={20} />}
          label="Net Carbs"
          value={`${result.carbs} g`}
        />

      </div>

      <KetoCalculatorArticle />

    </CalculatorLayout>
  );
}