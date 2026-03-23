"use client";

import { useState, useEffect } from "react";
import { Activity } from "lucide-react";

import { ResultCard } from "../../ResultCard";
import KetoCalculatorArticle from "../../content/health/KetoCalculatorArticle";

export default function KetoCalculator() {
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState(30);
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(170);
  const [activity, setActivity] = useState("1.375");
  const [goal, setGoal] = useState("maintain");

  const [result, setResult] = useState(null);

  /* ================= AUTO CALCULATION ================= */
  useEffect(() => {
    if (!age || !weight || !height) return;

    const a = Number(age);
    const w = Number(weight);
    const h = Number(height);
    const factor = Number(activity);

    let bmr = 0;

    // Harris-Benedict Formula
    if (gender === "male") {
      bmr = 88.36 + 13.4 * w + 4.8 * h - 5.7 * a;
    } else {
      bmr = 447.6 + 9.2 * w + 3.1 * h - 4.3 * a;
    }

    let calories = bmr * factor;

    if (goal === "lose") calories -= 500;
    if (goal === "gain") calories += 500;

    calories = Math.round(calories);

    // Keto macros
    const carbsGrams = 25;
    const carbsCalories = carbsGrams * 4;

    const proteinGrams = Math.round(w * 1.5);
    const proteinCalories = proteinGrams * 4;

    const fatCalories = calories - (carbsCalories + proteinCalories);
    const fatGrams = Math.max(0, Math.round(fatCalories / 9));

    setResult({
      calories,
      fat: fatGrams,
      protein: proteinGrams,
      carbs: carbsGrams,
    });
  }, [age, weight, height, gender, activity, goal]);

  return (
    <section
      className="rounded-xl p-6 space-y-10"
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)",
      }}
    >
      {/* ================= HEADER ================= */}
      <header>
        <h1 className="text-2xl font-bold mb-1">Keto Calculator</h1>
        <p className="text-sm leading-relaxed">
          Calculate your daily calories and ketogenic macros based on your
          body, activity level, and goal.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <div className="space-y-4">
        {/* Gender */}
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
              color: gender === "male" ? "#fff" : "var(--text)",
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
              borderLeft: "1px solid var(--border)",
            }}
          >
            Female
          </button>
        </div>

        {/* Age */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Age (years)</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full px-3 py-2 rounded"
            style={{ border: "1px solid var(--border)" }}
          />
        </div>

        {/* Weight */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Weight (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full px-3 py-2 rounded"
            style={{ border: "1px solid var(--border)" }}
          />
        </div>

        {/* Height */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Height (cm)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full px-3 py-2 rounded"
            style={{ border: "1px solid var(--border)" }}
          />
        </div>

        {/* Activity Dropdown */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Activity Level</label>
          <select
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            className="w-full px-3 py-2 rounded text-sm"
            style={{ border: "1px solid var(--border)" }}
          >
            <option value="1.2">Sedentary</option>
            <option value="1.375">Lightly Active</option>
            <option value="1.55">Moderately Active</option>
            <option value="1.725">Very Active</option>
          </select>
        </div>

        {/* Goal Dropdown */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Goal</label>
          <select
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="w-full px-3 py-2 rounded text-sm"
            style={{ border: "1px solid var(--border)" }}
          >
            <option value="lose">Weight Loss</option>
            <option value="maintain">Maintain Weight</option>
            <option value="gain">Weight Gain</option>
          </select>
        </div>
      </div>

      {/* ================= RESULT ================= */}
      {result && (
        <div className="grid md:grid-cols-4 gap-4" aria-live="polite">
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
      )}

      {/* ================= ARTICLE ================= */}
      <KetoCalculatorArticle />
    </section>
  );
}