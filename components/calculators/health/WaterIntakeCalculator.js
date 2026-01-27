"use client";

import { useState } from "react";
import { Calculator, BarChart } from "lucide-react";

import { PercentageInput } from "../../inputs/PercentageInput";
import { ResultCard } from "../../ResultCard";

export default function WaterIntakeCalculator() {
  const [weight, setWeight] = useState("");
  const [activity, setActivity] = useState("normal");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    if (!weight || Number(weight) <= 0) {
      setError("Please enter valid body weight.");
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

    // Base water requirement (ml per kg)
    let mlPerKg = 35; // normal adult

    if (activity === "active") mlPerKg = 40;
    if (activity === "veryActive") mlPerKg = 45;

    const totalMl = w * mlPerKg;
    const liters = totalMl / 1000;
    const glasses = liters / 0.25; // 250ml glass

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
      }}>
      {/* ================= HEADER ================= */}
      <header>
        <h1 className="text-2xl font-bold mb-1">Water Intake Calculator</h1>
        <p className="text-sm leading-relaxed">
          Use this Water Intake Calculator to estimate how much water you should
          drink daily based on your body weight and activity level.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateWater} className="space-y-4">
        <PercentageInput
          label="Body Weight (kg)"
          value={weight}
          onChange={setWeight}
          placeholder="70"
        />

        {/* ===== Activity Level ===== */}
        <div className="space-y-2">
          <p className="text-sm font-medium">Activity Level</p>

          {[
            {
              label: "Normal",
              value: "normal",
              desc: "Office work / low activity",
            },
            {
              label: "Active",
              value: "active",
              desc: "Workout or physical job",
            },
            {
              label: "Very Active",
              value: "veryActive",
              desc: "Intense exercise / hot climate",
            },
          ].map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => setActivity(item.value)}
              className="w-full text-left px-3 py-2 rounded text-sm"
              style={{
                border: "1px solid var(--border)",
                backgroundColor:
                  activity === item.value ? "var(--primary)" : "transparent",
                color: activity === item.value ? "#fff" : "var(--text)",
              }}>
              <strong>{item.label}</strong> — {item.desc}
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

      {/* ================= SEO BLOG CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          How Much Water Should You Drink Per Day?
        </h2>

        <p>
          Daily water intake depends on body weight, physical activity, climate,
          and overall health. Drinking enough water helps regulate body
          temperature, improve digestion, and maintain energy levels.
        </p>

        <h3 className="font-semibold">Water Intake Calculation Formula</h3>

        <p
          className="font-mono text-xs p-3 rounded"
          style={{ backgroundColor: "var(--surface-2)" }}>
          Daily Water (ml) = Body Weight (kg) × Water per kg Daily Water
          (liters) = ml ÷ 1000
        </p>

        <ul className="list-disc pl-5">
          <li>Normal adults: ~35 ml per kg</li>
          <li>Active individuals: ~40 ml per kg</li>
          <li>Very active / hot climate: ~45 ml per kg</li>
        </ul>

        <h3 className="font-semibold">Why Use a Water Intake Calculator?</h3>

        <ul className="list-disc pl-5">
          <li>Maintain proper hydration</li>
          <li>Improve digestion & metabolism</li>
          <li>Support workouts & recovery</li>
          <li>Prevent dehydration-related issues</li>
        </ul>

        <p>
          This water intake calculator provides a practical daily hydration
          target. Increase intake during exercise, illness, or hot weather.
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ Water needs vary by individual. Pregnant women, athletes, and people
        with medical conditions should consult a healthcare professional for
        personalized hydration advice.
      </aside>
    </section>
  );
}
