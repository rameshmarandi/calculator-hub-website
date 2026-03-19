"use client";

import { useState } from "react";
import { Calculator, BarChart } from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { ResultCard } from "../../ResultCard";
import ProteinIntakeCalculatorArticle from "../../content/health/ProteinIntakeCalculatorArticle";

export default function ProteinIntakeCalculator() {
  const [weight, setWeight] = useState("");
  const [activity, setActivity] = useState("sedentary");
  const [goal, setGoal] = useState("maintain");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    const w = Number(weight);

    if (!weight || isNaN(w) || w <= 0) {
      setError("Please enter a valid body weight.");
      return false;
    }

    if (w > 400) {
      setError("Weight value seems unrealistic.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- CALCULATION ---------------- */
  function calculateProtein(e) {
    e.preventDefault();

    if (!validate()) return;

    const w = Number(weight);

    const activityFactor = {
      sedentary: 0.8,
      light: 1.0,
      moderate: 1.2,
      active: 1.5,
    };

    const goalAdjustment = {
      maintain: 0,
      lose: 0.2,
      gain: 0.4,
    };

    const proteinPerKg = activityFactor[activity] + goalAdjustment[goal];

    const protein = w * proteinPerKg;

    setResult({
      protein: protein.toFixed(0),
      perKg: proteinPerKg.toFixed(1),
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
        <h1 className="text-2xl font-bold mb-1">Protein Intake Calculator</h1>

        <p className="text-sm leading-relaxed">
          Estimate how much protein your body needs daily based on your body
          weight, activity level, and fitness goal.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateProtein} className="space-y-4">
        {/* Weight */}
        <AmountInput
          label="Body Weight (kg)"
          value={weight}
          onChange={setWeight}
          placeholder="70"
          prefix=""
        />

        {/* Activity Level */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Activity Level</label>

          <select
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            className="w-full px-3 py-2 rounded-md text-sm"
            style={{
              border: "1px solid var(--border)",
              backgroundColor: "var(--surface)",
            }}
          >
            <option value="sedentary">Sedentary (little or no exercise)</option>

            <option value="light">Lightly Active (1–3 days/week)</option>

            <option value="moderate">Moderately Active (3–5 days/week)</option>

            <option value="active">
              Very Active (6–7 days/week / training)
            </option>
          </select>
        </div>

        {/* Goal */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Fitness Goal</label>

          <select
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="w-full px-3 py-2 rounded-md text-sm"
            style={{
              border: "1px solid var(--border)",
              backgroundColor: "var(--surface)",
            }}
          >
            <option value="maintain">Maintain Weight</option>
            <option value="lose">Lose Fat</option>
            <option value="gain">Gain Muscle</option>
          </select>
        </div>

        {/* Error */}
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
          Calculate Protein Intake
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
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
      )}

      {/* ================= ARTICLE ================= */}
      <ProteinIntakeCalculatorArticle />
    </section>
  );
}
