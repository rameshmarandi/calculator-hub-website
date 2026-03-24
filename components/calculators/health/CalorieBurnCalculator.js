"use client";

import { useState, useEffect } from "react";
import { Flame } from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { ResultCard } from "../../ResultCard";
import CalorieBurnCalculatorArticle from "../../content/health/CalorieBurnCalculatorArticle";

export default function CalorieBurnCalculator() {

  /* ---------------- DEFAULT PREFILLED DATA ---------------- */
  const [weight, setWeight] = useState("70");
  const [duration, setDuration] = useState("30");
  const [activity, setActivity] = useState("walking");

  const [result, setResult] = useState({
    calories: 0,
  });

  const [error, setError] = useState("");

  /* ---------------- MET VALUES ---------------- */
  const metValues = {
    walking: 3.5,
    jogging: 7.0,
    running: 9.8,
    cycling: 6.8,
    swimming: 8.0,
    yoga: 2.5,
    strength: 6.0,
  };

  /* ---------------- CALCULATION ---------------- */
  function calculateCaloriesBurned() {
    const w = Number(weight);
    const minutes = Number(duration);

    if (!w || w <= 0) {
      setError("Please enter valid body weight.");
      return;
    }

    if (!minutes || minutes <= 0) {
      setError("Please enter valid activity duration.");
      return;
    }

    setError("");

    const met = metValues[activity];
    const caloriesBurned = (met * w * minutes) / 60;

    setResult({
      calories: Math.round(caloriesBurned),
    });
  }

  /* ---------------- AUTO RECALCULATE ---------------- */
  useEffect(() => {
    calculateCaloriesBurned();
  }, [weight, duration, activity]);

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
        <h1 className="text-2xl font-bold mb-1">
          Calorie Burn Calculator
        </h1>

        <p className="text-sm leading-relaxed">
          Estimate how many calories you burn during different physical
          activities based on your body weight, workout duration, and
          activity intensity.
        </p>
      </header>


      {/* ================= INPUTS ================= */}
      <div className="space-y-4">

        <AmountInput
          label="Body Weight (kg)"
          value={weight}
          onChange={setWeight}
          placeholder="70"
          prefix=""
        />

        <AmountInput
          label="Duration (minutes)"
          value={duration}
          onChange={setDuration}
          placeholder="30"
          prefix=""
        />


        {/* ===== Activity Dropdown ===== */}
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Activity Type
          </label>

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
            <option value="walking">Walking</option>
            <option value="jogging">Jogging</option>
            <option value="running">Running</option>
            <option value="cycling">Cycling</option>
            <option value="swimming">Swimming</option>
            <option value="yoga">Yoga</option>
            <option value="strength">Strength Training</option>
          </select>
        </div>

        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

      </div>


      {/* ================= RESULT ================= */}
      <div aria-live="polite">
        <ResultCard
          variant="primary"
          icon={<Flame size={20} />}
          label="Calories Burned"
          value={`${result.calories} kcal`}
        />
      </div>


      {/* ================= SEO ARTICLE ================= */}
      <CalorieBurnCalculatorArticle />

    </section>
  );
}