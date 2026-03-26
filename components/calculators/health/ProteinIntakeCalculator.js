"use client";

import { useMemo, useState } from "react";
import { BarChart } from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { ResultCard } from "../../ResultCard";
import ProteinIntakeCalculatorArticle from "../../content/health/ProteinIntakeCalculatorArticle";

import { calculateProteinIntake } from "../../../lib/formulas";

export default function ProteinIntakeCalculator() {

  const [weight, setWeight] = useState("70");
  const [activity, setActivity] = useState("moderate");
  const [goal, setGoal] = useState("maintain");

  const result = useMemo(() => {

    return calculateProteinIntake(
      weight,
      activity,
      goal
    );

  }, [weight, activity, goal]);

  return (
    <section
      className="rounded-xl p-6 space-y-10"
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)"
      }}
    >

      <header>
        <h1 className="text-2xl font-bold mb-1">Protein Intake Calculator</h1>

        <p className="text-sm leading-relaxed">
          Estimate how much protein your body needs daily based on body weight,
          activity level and fitness goal.
        </p>
      </header>

      <div className="space-y-4">

        <AmountInput
          label="Body Weight (kg)"
          value={weight}
          onChange={setWeight}
          prefix=""
        />

        <div className="space-y-2">
          <label className="text-sm font-medium">Activity Level</label>

          <select
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            className="w-full px-3 py-2 rounded-md text-sm"
            style={{
              border: "1px solid var(--border)",
              backgroundColor: "var(--surface)"
            }}
          >
            <option value="sedentary">Sedentary</option>
            <option value="light">Lightly Active</option>
            <option value="moderate">Moderately Active</option>
            <option value="active">Very Active</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Fitness Goal</label>

          <select
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="w-full px-3 py-2 rounded-md text-sm"
            style={{
              border: "1px solid var(--border)",
              backgroundColor: "var(--surface)"
            }}
          >
            <option value="maintain">Maintain Weight</option>
            <option value="lose">Lose Fat</option>
            <option value="gain">Gain Muscle</option>
          </select>
        </div>

      </div>

      <div className="grid md:grid-cols-2 gap-4" aria-live="polite">

        <ResultCard
          variant="primary"
          icon={<BarChart size={20} />}
          label="Daily Protein Intake"
          value={`${result.protein} g/day`}
        />

        <ResultCard
          variant="neutral"
          icon={<BarChart size={20} />}
          label="Protein per kg"
          value={`${result.perKg} g/kg`}
        />

      </div>

      <ProteinIntakeCalculatorArticle />

    </section>
  );
}