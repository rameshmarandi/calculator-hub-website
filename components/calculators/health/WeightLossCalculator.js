"use client";

import { useState } from "react";
import { Calculator, BarChart } from "lucide-react";

import { PercentageInput } from "../../inputs/PercentageInput";
import { ResultCard } from "../../ResultCard";

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

    let deficit = 300; // slow fat loss
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
      }}>
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
          style={{ border: "1px solid var(--border)" }}>
          <button
            type="button"
            onClick={() => setGender("male")}
            className="flex-1 py-2 text-sm font-medium"
            style={{
              backgroundColor:
                gender === "male" ? "var(--primary)" : "transparent",
              color: gender === "male" ? "#fff" : "var(--text)",
            }}>
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
            }}>
            Female
          </button>
        </div>

        <PercentageInput
          label="Age (years)"
          value={age}
          onChange={setAge}
          placeholder="30"
        />

        <PercentageInput
          label="Current Weight (kg)"
          value={weight}
          onChange={setWeight}
          placeholder="75"
        />

        <PercentageInput
          label="Height (cm)"
          value={height}
          onChange={setHeight}
          placeholder="170"
        />

        {/* ===== Activity Level ===== */}
        <div className="space-y-2">
          <p className="text-sm font-medium">Activity Level</p>

          {[
            { label: "Sedentary", value: "1.2" },
            { label: "Lightly Active", value: "1.375" },
            { label: "Moderately Active", value: "1.55" },
            { label: "Very Active", value: "1.725" },
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
              {item.label}
            </button>
          ))}
        </div>

        {/* ===== Weight Loss Pace ===== */}
        <div className="space-y-2">
          <p className="text-sm font-medium">Weight Loss Pace</p>

          {[
            {
              label: "Slow (sustainable)",
              value: "slow",
              desc: "−300 kcal/day",
            },
            { label: "Moderate", value: "moderate", desc: "−500 kcal/day" },
            { label: "Aggressive", value: "aggressive", desc: "−700 kcal/day" },
          ].map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => setPace(item.value)}
              className="w-full text-left px-3 py-2 rounded text-sm"
              style={{
                border: "1px solid var(--border)",
                backgroundColor:
                  pace === item.value ? "var(--primary)" : "transparent",
                color: pace === item.value ? "#fff" : "var(--text)",
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
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">How to Lose Weight Safely</h2>

        <p>
          Healthy weight loss is achieved by consuming fewer calories than your
          body burns while maintaining proper nutrition and activity. Extreme
          calorie cuts can harm metabolism and health.
        </p>

        <h3 className="font-semibold">Weight Loss Formula</h3>

        <p
          className="font-mono text-xs p-3 rounded"
          style={{ backgroundColor: "var(--surface-2)" }}>
          BMR = Basal Metabolic Rate TDEE = BMR × Activity Factor Weight Loss
          Calories = TDEE − Calorie Deficit
        </p>

        <ul className="list-disc pl-5">
          <li>−300 kcal/day → slow, sustainable fat loss</li>
          <li>−500 kcal/day → standard weight loss</li>
          <li>−700 kcal/day → faster loss (medical supervision advised)</li>
        </ul>

        <h3 className="font-semibold">Tips for Effective Weight Loss</h3>

        <ul className="list-disc pl-5">
          <li>Eat protein-rich foods</li>
          <li>Strength train to preserve muscle</li>
          <li>Track calories consistently</li>
          <li>Stay hydrated and sleep well</li>
        </ul>

        <p>
          This weight loss calculator provides a safe daily calorie target.
          Combine it with healthy habits for long-term success.
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ Weight loss results vary by individual. Avoid extreme dieting.
        Consult a healthcare professional if you have medical conditions.
      </aside>
    </section>
  );
}
