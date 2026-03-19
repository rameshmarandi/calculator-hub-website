"use client";

import { useState } from "react";
import { Calculator, BarChart } from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { ResultCard } from "../../ResultCard";
import WeightGainCalculatorArticle from "../../content/health/WeightGainCalculatorArticle";

export default function WeightGainCalculator() {
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  const [activity, setActivity] = useState("1.375");
  const [pace, setPace] = useState("slow");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    if (!age || Number(age) <= 0) {
      setError("Please enter a valid age.");
      return false;
    }

    if (!weight || Number(weight) <= 0) {
      setError("Please enter a valid weight.");
      return false;
    }

    if (!height || Number(height) <= 0) {
      setError("Please enter a valid height.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- CALCULATION ---------------- */
  function calculateWeightGain(e) {
    e.preventDefault();
    if (!validate()) return;

    const a = Number(age);
    const w = Number(weight);
    const h = Number(height);
    const factor = Number(activity);

    // Harris-Benedict Formula
    let bmr = 0;

    if (gender === "male") {
      bmr = 88.36 + 13.4 * w + 4.8 * h - 5.7 * a;
    } else {
      bmr = 447.6 + 9.2 * w + 3.1 * h - 4.3 * a;
    }

    const tdee = bmr * factor;

    let surplus = 300;

    if (pace === "moderate") surplus = 500;
    if (pace === "fast") surplus = 700;

    const targetCalories = tdee + surplus;

    setResult({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      calories: Math.round(targetCalories),
      surplus,
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
        <h1 className="text-2xl font-bold mb-1">Weight Gain Calculator</h1>

        <p className="text-sm leading-relaxed">
          Use this Weight Gain Calculator to estimate how many calories you
          should consume daily to gain weight safely based on your body
          measurements and activity level.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateWeightGain} className="space-y-4">
        {/* Gender Tabs */}
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
        />

        <AmountInput
          label="Current Weight (kg)"
          value={weight}
          onChange={setWeight}
          placeholder="70"
          prefix=""
        />

        <AmountInput
          label="Height (cm)"
          value={height}
          onChange={setHeight}
          placeholder="170"
          prefix=""
        />

        {/* Activity Level */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Activity Level</label>

          <select
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            className="w-full p-2 rounded-md text-sm"
            style={{
              border: "1px solid var(--border)",
              backgroundColor: "var(--surface)",
            }}
          >
            <option value="1.2">Sedentary — little or no exercise</option>
            <option value="1.375">Lightly Active — 1–3 days/week</option>
            <option value="1.55">Moderately Active — 3–5 days/week</option>
            <option value="1.725">Very Active — 6–7 days/week</option>
          </select>
        </div>

        {/* Weight Gain Pace */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Weight Gain Pace</label>

          <select
            value={pace}
            onChange={(e) => setPace(e.target.value)}
            className="w-full p-2 rounded-md text-sm"
            style={{
              border: "1px solid var(--border)",
              backgroundColor: "var(--surface)",
            }}
          >
            <option value="slow">Slow (Lean Gain) — +300 kcal/day</option>
            <option value="moderate">Moderate — +500 kcal/day</option>
            <option value="fast">Fast — +700 kcal/day</option>
          </select>
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-2.5 rounded-md font-medium flex items-center justify-center gap-2"
          style={{
            backgroundColor: "var(--primary)",
            color: "#fff",
          }}
        >
          <Calculator size={18} />
          Calculate Weight Gain Calories
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
            label="Target Calories"
            value={`${result.calories} cal/day`}
          />
        </div>
      )}

      {/* Article */}
      <WeightGainCalculatorArticle />
    </section>
  );
}
