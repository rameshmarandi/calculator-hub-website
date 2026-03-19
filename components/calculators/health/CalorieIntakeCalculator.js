"use client";

import { useState } from "react";
import { Calculator, BarChart } from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { ResultCard } from "../../ResultCard";
import CalorieIntakeCalculatorArticle from "../../content/health/CalorieIntakeCalculatorArticle";

export default function CalorieIntakeCalculator() {
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [activity, setActivity] = useState("1.2");
  const [goal, setGoal] = useState("maintain");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
 function validate() {
  const a = Number(age);
  const w = Number(weight);
  const h = Number(height);

  if (!a || a < 10 || a > 100) {
    setError("Age must be between 10 and 100 years.");
    return false;
  }

  if (!w || w < 30 || w > 300) {
    setError("Weight must be between 30 kg and 300 kg.");
    return false;
  }

  if (!h || h < 100 || h > 250) {
    setError("Height must be between 100 cm and 250 cm.");
    return false;
  }

  setError("");
  return true;
}

  /* ---------------- CALCULATION ---------------- */
  function calculateCalories(e) {
    e.preventDefault();
    if (!validate()) return;

    const a = Number(age);
    const w = Number(weight);
    const h = Number(height);
    const factor = Number(activity);

    /* -------- Mifflin-St Jeor BMR -------- */
    let bmr;

    if (gender === "male") {
      bmr = 10 * w + 6.25 * h - 5 * a + 5;
    } else {
      bmr = 10 * w + 6.25 * h - 5 * a - 161;
    }

    const tdee = bmr * factor;

    let targetCalories = tdee;

    if (goal === "lose") {
      targetCalories = tdee - 500;
    } else if (goal === "gain") {
      targetCalories = tdee + 500;
    }

    setResult({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      calories: Math.round(targetCalories),
    });
  }

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
        <h1 className="text-2xl font-bold mb-1">Calorie Intake Calculator</h1>
        <p className="text-sm leading-relaxed">
          Use this Calorie Intake Calculator to estimate how many calories you
          should eat daily to maintain, lose, or gain weight based on your body
          and activity level.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateCalories} className="space-y-4">

        {/* ===== Gender Tabs ===== */}
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

        {/* Inputs */}
        <AmountInput
          label="Age (years)"
          value={age}
          onChange={setAge}
          placeholder="30"
          prefix=""
          type="number"

        />

        <AmountInput
          label="Weight (kg)"
          value={weight}
          onChange={setWeight}
          placeholder="70"
          prefix=""
          type="number"
        />

        <AmountInput
          label="Height (cm)"
          value={height}
          onChange={setHeight}
          placeholder="170"
          prefix=""
          type="number"
        />

        {/* ===== Activity Level Select ===== */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Activity Level</label>
          <select
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            className="w-full rounded-md px-3 py-2 text-sm"
            style={{
              border: "1px solid var(--border)",
              backgroundColor: "var(--surface)",
              color: "var(--text)",
            }}
          >
            <option value="1.2">Sedentary</option>
            <option value="1.375">Lightly Active</option>
            <option value="1.55">Moderately Active</option>
            <option value="1.725">Very Active</option>
            <option value="1.9">Extra Active</option>
          </select>
        </div>

        {/* ===== Goal Select ===== */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Goal</label>
          <select
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="w-full rounded-md px-3 py-2 text-sm"
            style={{
              border: "1px solid var(--border)",
              backgroundColor: "var(--surface)",
              color: "var(--text)",
            }}
          >
            <option value="maintain">Maintain Weight</option>
            <option value="lose">Lose Weight</option>
            <option value="gain">Gain Weight</option>
          </select>
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        {/* Calculate Button */}
        <button
          type="submit"
          className="w-full py-2.5 rounded-md font-medium flex items-center justify-center gap-2"
          style={{
            backgroundColor: "var(--primary)",
            color: "#fff",
          }}
        >
          <Calculator size={18} />
          Calculate Daily Calories
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
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
      )}

      {/* ================= SEO ARTICLE ================= */}
      <CalorieIntakeCalculatorArticle />
    </section>
  );
}