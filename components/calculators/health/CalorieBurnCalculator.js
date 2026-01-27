"use client";

import { useState } from "react";
import { Calculator, Flame } from "lucide-react";

import { PercentageInput } from "../../inputs/PercentageInput";
import { ResultCard } from "../../ResultCard";

export default function CalorieBurnCalculator() {
  const [weight, setWeight] = useState("");
  const [duration, setDuration] = useState("");
  const [activity, setActivity] = useState("walking");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    if (!weight || Number(weight) <= 0) {
      setError("Please enter valid body weight.");
      return false;
    }

    if (!duration || Number(duration) <= 0) {
      setError("Please enter valid activity duration.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- CALCULATION ---------------- */
  function calculateCaloriesBurned(e) {
    e.preventDefault();
    if (!validate()) return;

    const w = Number(weight);
    const minutes = Number(duration);

    // MET values (standard)
    const metValues = {
      walking: 3.5,
      jogging: 7.0,
      running: 9.8,
      cycling: 6.8,
      swimming: 8.0,
      yoga: 2.5,
      strength: 6.0,
    };

    const met = metValues[activity];

    // Calories burned formula
    const caloriesBurned = (met * w * minutes) / 60;

    setResult({
      calories: Math.round(caloriesBurned),
      activity,
      duration: minutes,
    });
  }

  return (
    <section
      className="rounded-xl p-6 space-y-10"
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)",
      }}>
      {/* ================= HEADER ================= */}
      <header>
        <h1 className="text-2xl font-bold mb-1">Calorie Burn Calculator</h1>
        <p className="text-sm leading-relaxed">
          Use this Calorie Burn Calculator to estimate how many calories you
          burn during different physical activities based on your body weight
          and workout duration.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateCaloriesBurned} className="space-y-4">
        <PercentageInput
          label="Body Weight (kg)"
          value={weight}
          onChange={setWeight}
          placeholder="70"
        />

        <PercentageInput
          label="Duration (minutes)"
          value={duration}
          onChange={setDuration}
          placeholder="30"
        />

        {/* ===== Activity Selection ===== */}
        <div className="space-y-2">
          <p className="text-sm font-medium">Activity Type</p>

          {[
            { label: "Walking", value: "walking" },
            { label: "Jogging", value: "jogging" },
            { label: "Running", value: "running" },
            { label: "Cycling", value: "cycling" },
            { label: "Swimming", value: "swimming" },
            { label: "Yoga", value: "yoga" },
            { label: "Strength Training", value: "strength" },
          ].map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => setActivity(item.value)}
              className="w-full px-3 py-2 rounded text-sm text-left"
              style={{
                border: "1px solid var(--border)",
                backgroundColor:
                  activity === item.value ? "var(--primary)" : "transparent",
                color: activity === item.value ? "#fff" : "var(--text)",
              }}>
              {item.label}
            </button>
          ))}
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          className="w-full py-2.5 rounded-md font-medium flex items-center justify-center gap-2"
          style={{
            backgroundColor: "var(--primary)",
            color: "#fff",
          }}>
          <Calculator size={18} />
          Calculate Calories Burned
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <div aria-live="polite">
          <ResultCard
            variant="primary"
            icon={<Flame size={20} />}
            label="Calories Burned"
            value={`${result.calories} kcal`}
          />
        </div>
      )}

      {/* ================= SEO BLOG CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          How Calories Burned Are Calculated
        </h2>

        <p>
          Calories burned during exercise depend on your body weight, the type
          of activity performed, and how long the activity is done. More intense
          activities burn more calories in less time.
        </p>

        <h3 className="font-semibold">Calorie Burn Formula</h3>

        <p
          className="font-mono text-xs p-3 rounded"
          style={{ backgroundColor: "var(--surface-2)" }}>
          Calories Burned = MET × Weight (kg) × Time (hours)
        </p>

        <ul className="list-disc pl-5">
          <li>MET = Metabolic Equivalent of Task</li>
          <li>Higher MET = higher intensity</li>
          <li>Body weight directly affects calorie burn</li>
        </ul>

        <h3 className="font-semibold">Why Use a Calorie Burn Calculator?</h3>

        <ul className="list-disc pl-5">
          <li>Track workout effectiveness</li>
          <li>Support weight loss planning</li>
          <li>Understand energy expenditure</li>
          <li>Optimize fitness routines</li>
        </ul>

        <p>
          This calorie burn calculator provides an estimate. Actual calorie
          expenditure may vary based on fitness level, workout intensity, and
          metabolism.
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ Calorie burn values are estimates and should not be treated as
        medical advice. Consult a fitness or healthcare professional for
        personalized guidance.
      </aside>
    </section>
  );
}
