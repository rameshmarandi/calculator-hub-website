"use client";

import { useMemo, useState } from "react";
import { Calculator, BarChart } from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { ResultCard } from "../../ResultCard";
import CalorieCalculatorArticle from "../../content/health/CalorieCalculatorArticle";

export default function CalorieCalculator() {

  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("30");
  const [weight, setWeight] = useState("70");
  const [height, setHeight] = useState("175");
  const [activity, setActivity] = useState("1.55");

  const result = useMemo(() => {

    const a = parseFloat(age) || 0;
    const w = parseFloat(weight) || 0;
    const h = parseFloat(height) || 0;
    const act = parseFloat(activity) || 0;

    let bmr = 0;

    if (gender === "male") {
      bmr = 10 * w + 6.25 * h - 5 * a + 5;
    } else {
      bmr = 10 * w + 6.25 * h - 5 * a - 161;
    }

    const calories = bmr * act;

    return {
      bmr: Math.round(bmr) || 0,
      calories: Math.round(calories) || 0
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

      <header>
        <h1 className="text-2xl font-bold mb-1">Calorie Calculator</h1>
        <p className="text-sm leading-relaxed">
          Estimate how many calories you should consume each day based on your
          age, gender, body measurements, and activity level.
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
            className="w-full p-2 rounded-md"
            style={{
              backgroundColor: "var(--surface)",
              border: "1px solid var(--border)"
            }}
          >
            <option value="1.2">Sedentary (little or no exercise)</option>
            <option value="1.375">Light Exercise (1–3 days/week)</option>
            <option value="1.55">Moderate Exercise (3–5 days/week)</option>
            <option value="1.725">Heavy Exercise (6–7 days/week)</option>
            <option value="1.9">Athlete / Very Active</option>
          </select>
        </div>

      </div>

      <div className="space-y-4">

        <ResultCard
          variant="primary"
          icon={<BarChart size={20} />}
          label="Estimated Daily Calories"
          value={`${result.calories} calories/day`}
        />

        <p className="text-sm opacity-80">
          Your Basal Metabolic Rate is approximately{" "}
          <strong>{result.bmr} calories/day</strong>. Based on your activity
          level, your estimated daily calorie requirement is{" "}
          <strong>{result.calories} calories/day</strong>.
        </p>

      </div>

      <CalorieCalculatorArticle />

    </section>
  );
}