"use client";

import { useState } from "react";
import { Calculator, BarChart } from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { ResultCard } from "../../ResultCard";
import WeightLossCalculatorArticle from "../../content/health/WeightLossCalculatorArticle";

export default function WeightLossCalculator() {
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
    const a = Number(age);
    const w = Number(weight);
    const h = Number(height);

    if (!a || a <= 0) {
      setError("Please enter a valid age.");
      return false;
    }

    if (!w || w <= 0) {
      setError("Please enter a valid weight.");
      return false;
    }

    if (!h || h <= 0) {
      setError("Please enter a valid height.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- CALCULATION ---------------- */
  function calculateWeightLoss(e) {
    e.preventDefault();
    if (!validate()) return;

    const a = Number(age);
    const w = Number(weight);
    const h = Number(height);
    const factor = Number(activity);

    // Harris-Benedict BMR
    let bmr = 0;

    if (gender === "male") {
      bmr = 88.36 + 13.4 * w + 4.8 * h - 5.7 * a;
    } else {
      bmr = 447.6 + 9.2 * w + 3.1 * h - 4.3 * a;
    }

    const tdee = bmr * factor;

    let deficit = 300;

    if (pace === "moderate") deficit = 500;
    if (pace === "aggressive") deficit = 700;

    const targetCalories = Math.max(tdee - deficit, 1200);

    setResult({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      calories: Math.round(targetCalories),
      deficit,
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
        <h1 className="text-2xl font-bold mb-1">Weight Loss Calculator</h1>
        <p className="text-sm leading-relaxed">
          Use this Weight Loss Calculator to estimate how many calories you
          should eat daily to lose weight safely and sustainably.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateWeightLoss} className="space-y-4">
        
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

        {/* ===== Age ===== */}
        <AmountInput
          label="Age (years)"
          value={age}
          onChange={setAge}
          placeholder="30"
          prefix=""
        />

        {/* ===== Weight ===== */}
        <AmountInput
          label="Current Weight (kg)"
          value={weight}
          onChange={setWeight}
          placeholder="75"
          prefix=""
        />

        {/* ===== Height ===== */}
        <AmountInput
          label="Height (cm)"
          value={height}
          onChange={setHeight}
          placeholder="170"
          prefix=""
        />

        {/* ===== Activity Level Dropdown ===== */}
        <div className="space-y-2">
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
            <option value="1.2">Sedentary — little or no exercise</option>
            <option value="1.375">Lightly Active — 1–3 days/week</option>
            <option value="1.55">Moderately Active — 3–5 days/week</option>
            <option value="1.725">Very Active — 6–7 days/week</option>
          </select>
        </div>

        {/* ===== Weight Loss Pace Dropdown ===== */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Weight Loss Pace</label>

          <select
            value={pace}
            onChange={(e) => setPace(e.target.value)}
            className="w-full rounded-md px-3 py-2 text-sm"
            style={{
              border: "1px solid var(--border)",
              backgroundColor: "var(--surface)",
              color: "var(--text)",
            }}
          >
            <option value="slow">Slow (Sustainable) — −300 kcal/day</option>
            <option value="moderate">Moderate — −500 kcal/day</option>
            <option value="aggressive">Aggressive — −700 kcal/day</option>
          </select>
        </div>

        {/* ===== Error ===== */}
        {error && <p className="text-sm text-red-500">{error}</p>}

        {/* ===== Submit Button ===== */}
        <button
          type="submit"
          className="w-full py-2.5 rounded-md font-medium flex items-center justify-center gap-2"
          style={{
            backgroundColor: "var(--primary)",
            color: "#fff",
          }}
        >
          <Calculator size={18} />
          Calculate Weight Loss Calories
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

      {/* ================= SEO BLOG CONTENT ================= */}
      <WeightLossCalculatorArticle />
    </section>
  );
}