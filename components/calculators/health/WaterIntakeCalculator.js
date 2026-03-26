"use client";

import { useMemo, useState } from "react";
import { BarChart } from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { ResultCard } from "../../ResultCard";
import WaterIntakeCalculatorArticle from "../../content/health/WaterIntakeCalculatorArticle";

import { calculateWaterIntake } from "../../../lib/formulas";

export default function WaterIntakeCalculator() {

  const [weight, setWeight] = useState("70");
  const [activity, setActivity] = useState("normal");

  const result = useMemo(() => {

    return calculateWaterIntake(
      weight,
      activity
    );

  }, [weight, activity]);

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
          Water Intake Calculator
        </h1>

        <p className="text-sm leading-relaxed">
          Estimate how much water you should drink daily based on body weight
          and activity level.
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
            className="w-full px-3 py-2 rounded text-sm"
            style={{
              border: "1px solid var(--border)",
              backgroundColor: "var(--surface)",
              color: "var(--text)"
            }}
          >
            <option value="normal">
              Normal — Office work / low activity
            </option>

            <option value="active">
              Active — Workout or physical job
            </option>

            <option value="veryActive">
              Very Active — Intense exercise / hot climate
            </option>
          </select>
        </div>

      </div>

      <div className="grid md:grid-cols-2 gap-4" aria-live="polite">

        <ResultCard
          variant="primary"
          icon={<BarChart size={20} />}
          label="Daily Water Intake"
          value={`${result.liters} liters`}
        />

        <ResultCard
          variant="neutral"
          icon={<BarChart size={20} />}
          label="Approx. Glasses of Water"
          value={`${result.glasses} glasses`}
        />

      </div>

      <WaterIntakeCalculatorArticle />

    </section>
  );
}