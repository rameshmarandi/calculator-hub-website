"use client";

import { useState } from "react";
import { Calculator, BarChart } from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { ResultCard } from "../../ResultCard";
import CalorieCalculatorArticle from "../../content/health/CalorieCalculatorArticle";

export default function CalorieCalculator() {
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [activity, setActivity] = useState("1.2");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  function validate() {
    if (!age || Number(age) <= 0) {
      setError("Please enter valid age.");
      return false;
    }

    if (!weight || Number(weight) <= 0) {
      setError("Please enter valid weight.");
      return false;
    }

    if (!height || Number(height) <= 0) {
      setError("Please enter valid height.");
      return false;
    }

    setError("");
    return true;
  }

  function calculateCalories(e) {
    e.preventDefault();
    if (!validate()) return;

    const a = Number(age);
    const w = Number(weight);
    const h = Number(height);
    const activityLevel = Number(activity);

    let bmr;

    // Mifflin-St Jeor
    if (gender === "male") {
      bmr = 10 * w + 6.25 * h - 5 * a + 5;
    } else {
      bmr = 10 * w + 6.25 * h - 5 * a - 161;
    }

    const calories = bmr * activityLevel;

    setResult({
      bmr: Math.round(bmr),
      calories: Math.round(calories),
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
      {/* HEADER */}
      <header>
        <h1 className="text-2xl font-bold mb-1">Calorie Calculator</h1>
        <p className="text-sm leading-relaxed">
          Estimate how many calories you should consume each day based on your
          age, gender, body measurements, and activity level.
        </p>
      </header>

      {/* FORM */}
      <form onSubmit={calculateCalories} className="space-y-4">
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

        <AmountInput
          label="Age (years)"
          value={age}
          onChange={setAge}
          placeholder="30"
          prefix=""
        />

        <AmountInput
          label="Weight (kg)"
          value={weight}
          onChange={setWeight}
          placeholder="70"
           prefix=""
        />

        <AmountInput
          label="Height (cm)"
          value={height}
          onChange={setHeight}
          placeholder="175"
           prefix=""
        />

        {/* Activity Level */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Activity Level</label>

          <select
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            className="w-full p-2 rounded-md"
            style={{
              backgroundColor: "var(--surface)",
              border: "1px solid var(--border)",
            }}
          >
            <option value="1.2">Sedentary (little or no exercise)</option>
            <option value="1.375">Light Exercise (1–3 days/week)</option>
            <option value="1.55">Moderate Exercise (3–5 days/week)</option>
            <option value="1.725">Heavy Exercise (6–7 days/week)</option>
            <option value="1.9">Athlete / Very Active</option>
          </select>
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          className="w-full py-2.5 rounded-md font-medium flex items-center justify-center gap-2"
          style={{
            backgroundColor: "var(--primary)",
            color: "#fff",
          }}
        >
          <Calculator size={18} />
          Calculate Calories
        </button>
      </form>

      {/* RESULT */}
      {result && (
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
      )}

      <CalorieCalculatorArticle/>
    </section>
  );
}