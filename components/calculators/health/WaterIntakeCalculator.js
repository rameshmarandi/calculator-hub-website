"use client";

import { useState } from "react";
import { Calculator, BarChart } from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { ResultCard } from "../../ResultCard";
import WaterIntakeCalculatorArticle from "../../content/health/WaterIntakeCalculatorArticle";

export default function WaterIntakeCalculator() {
  const [weight, setWeight] = useState("");
  const [activity, setActivity] = useState("normal");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    const w = Number(weight);

    if (!weight || isNaN(w) || w <= 0) {
      setError("Please enter a valid body weight.");
      return false;
    }

    if (w < 20 || w > 300) {
      setError("Body weight must be between 20 kg and 300 kg.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- CALCULATION ---------------- */
  function calculateWater(e) {
    e.preventDefault();

    if (!validate()) return;

    const w = Number(weight);

    // Base hydration multiplier
    let mlPerKg = 35;

    if (activity === "active") mlPerKg = 40;
    if (activity === "veryActive") mlPerKg = 45;

    const totalMl = w * mlPerKg;
    const liters = totalMl / 1000;
    const glasses = totalMl / 250;

    setResult({
      liters: liters.toFixed(2),
      glasses: Math.round(glasses),
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
        <h1 className="text-2xl font-bold mb-1">Water Intake Calculator</h1>

        <p className="text-sm leading-relaxed">
          Estimate how much water you should drink daily based on body weight
          and activity level.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateWater} className="space-y-4">
        {/* ===== Body Weight ===== */}
        <AmountInput
          label="Body Weight (kg)"
          value={weight}
          onChange={setWeight}
          placeholder="70"
          prefix=""
        />

        {/* ===== Activity Level ===== */}
        {/* ===== Activity Level ===== */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Activity Level</label>

          <select
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            className="w-full px-3 py-2 rounded text-sm"
            style={{
              border: "1px solid var(--border)",
              backgroundColor: "var(--surface)",
              color: "var(--text)",
            }}
          >
            <option value="normal">Normal — Office work / low activity</option>

            <option value="active">Active — Workout or physical job</option>

            <option value="veryActive">
              Very Active — Intense exercise / hot climate
            </option>
          </select>
        </div>

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
          Calculate Water Intake
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
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
      )}

      {/* ================= SEO ARTICLE ================= */}
      <WaterIntakeCalculatorArticle />
    </section>
  );
}
