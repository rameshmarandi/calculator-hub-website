"use client";

import { useState } from "react";
import { Calculator, BarChart } from "lucide-react";

import { PercentageInput } from "../../inputs/PercentageInput";
import { ResultCard } from "../../ResultCard";

export default function ProteinIntakeCalculator() {
  const [weight, setWeight] = useState("");
  const [activity, setActivity] = useState("sedentary");
  const [goal, setGoal] = useState("maintain");

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
  function calculateProtein(e) {
    e.preventDefault();
    if (!validate()) return;

    const w = Number(weight);

    // Base protein per kg
    let proteinPerKg = 0.8;

    if (activity === "light") proteinPerKg = 1.0;
    if (activity === "moderate") proteinPerKg = 1.2;
    if (activity === "active") proteinPerKg = 1.5;

    // Goal adjustment
    if (goal === "lose") proteinPerKg += 0.2;
    if (goal === "gain") proteinPerKg += 0.4;

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
      }}>
      {/* ================= HEADER ================= */}
      <header>
        <h1 className="text-2xl font-bold mb-1">Protein Intake Calculator</h1>
        <p className="text-sm leading-relaxed">
          Use this Protein Intake Calculator to find how much protein you should
          consume daily based on your body weight, activity level, and fitness
          goal.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateProtein} className="space-y-4">
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
              label: "Sedentary",
              value: "sedentary",
              desc: "Little or no exercise",
            },
            { label: "Lightly Active", value: "light", desc: "1–3 days/week" },
            {
              label: "Moderately Active",
              value: "moderate",
              desc: "3–5 days/week",
            },
            {
              label: "Very Active",
              value: "active",
              desc: "6–7 days/week / training",
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

        {/* ===== Goal ===== */}
        <div className="space-y-2">
          <p className="text-sm font-medium">Fitness Goal</p>

          {[
            { label: "Maintain Weight", value: "maintain" },
            { label: "Lose Fat", value: "lose" },
            { label: "Gain Muscle", value: "gain" },
          ].map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => setGoal(item.value)}
              className="w-full text-left px-3 py-2 rounded text-sm"
              style={{
                border: "1px solid var(--border)",
                backgroundColor:
                  goal === item.value ? "var(--primary)" : "transparent",
                color: goal === item.value ? "#fff" : "var(--text)",
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

      {/* ================= SEO BLOG CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          How Much Protein Do You Need Per Day?
        </h2>

        <p>
          Protein intake depends on body weight, physical activity, and fitness
          goals. Protein is essential for muscle repair, metabolism, immunity,
          and overall health.
        </p>

        <h3 className="font-semibold">Protein Intake Formula</h3>

        <p
          className="font-mono text-xs p-3 rounded"
          style={{ backgroundColor: "var(--surface-2)" }}>
          Daily Protein (g) = Body Weight (kg) × Protein per kg
        </p>

        <ul className="list-disc pl-5">
          <li>Sedentary adults: 0.8 g/kg</li>
          <li>Active individuals: 1.2 – 1.5 g/kg</li>
          <li>Muscle gain: up to 2.0 g/kg</li>
        </ul>

        <h3 className="font-semibold">Why Use a Protein Intake Calculator?</h3>

        <ul className="list-disc pl-5">
          <li>Support muscle growth & recovery</li>
          <li>Improve fat loss results</li>
          <li>Prevent muscle loss during dieting</li>
          <li>Plan balanced nutrition</li>
        </ul>

        <p>
          This protein intake calculator provides a practical daily protein
          target. Spread protein intake evenly across meals for best results.
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ Protein needs are estimates. Excess protein intake may not be
        suitable for individuals with kidney or medical conditions. Consult a
        healthcare professional if needed.
      </aside>
    </section>
  );
}
