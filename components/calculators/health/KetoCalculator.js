"use client";

import { useState } from "react";
import { Calculator, Activity } from "lucide-react";

import { PercentageInput } from "../../inputs/PercentageInput";
import { ResultCard } from "../../ResultCard";

export default function KetoCalculator() {
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [activity, setActivity] = useState("1.375");
  const [goal, setGoal] = useState("maintain");

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
  function calculateKeto(e) {
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

    let calories = bmr * factor;

    if (goal === "lose") calories -= 500;
    if (goal === "gain") calories += 500;

    calories = Math.round(calories);

    // Keto macro split
    const carbsGrams = 25; // strict keto
    const carbsCalories = carbsGrams * 4;

    const proteinGrams = Math.round(w * 1.5);
    const proteinCalories = proteinGrams * 4;

    const fatCalories = calories - (carbsCalories + proteinCalories);

    const fatGrams = Math.round(fatCalories / 9);

    setResult({
      calories,
      fat: fatGrams,
      protein: proteinGrams,
      carbs: carbsGrams,
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
        <h1 className="text-2xl font-bold mb-1">Keto Calculator</h1>
        <p className="text-sm leading-relaxed">
          Use this Keto Calculator to find your daily calories and ketogenic
          diet macros (fat, protein, and carbs) based on your body, activity
          level, and goal.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateKeto} className="space-y-4">
        {/* Gender Tabs */}
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
          label="Weight (kg)"
          value={weight}
          onChange={setWeight}
          placeholder="70"
        />

        <PercentageInput
          label="Height (cm)"
          value={height}
          onChange={setHeight}
          placeholder="170"
        />

        {/* Activity */}
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

        {/* Goal */}
        <div className="space-y-2">
          <p className="text-sm font-medium">Goal</p>
          {[
            { label: "Weight Loss", value: "lose" },
            { label: "Maintain Weight", value: "maintain" },
            { label: "Weight Gain", value: "gain" },
          ].map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => setGoal(item.value)}
              className="w-full px-3 py-2 rounded text-sm text-left"
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
          Calculate Keto Macros
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <div className="grid md:grid-cols-4 gap-4" aria-live="polite">
          <ResultCard
            variant="primary"
            icon={<Activity size={20} />}
            label="Daily Calories"
            value={`${result.calories} kcal`}
          />
          <ResultCard
            variant="neutral"
            icon={<Activity size={20} />}
            label="Fat"
            value={`${result.fat} g`}
          />
          <ResultCard
            variant="neutral"
            icon={<Activity size={20} />}
            label="Protein"
            value={`${result.protein} g`}
          />
          <ResultCard
            variant="neutral"
            icon={<Activity size={20} />}
            label="Net Carbs"
            value={`${result.carbs} g`}
          />
        </div>
      )}

      {/* ================= SEO BLOG CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">What is the Keto Diet?</h2>

        <p>
          The ketogenic (keto) diet is a low-carbohydrate, high-fat diet that
          shifts the body into a metabolic state called ketosis, where fat is
          burned for energy instead of carbohydrates.
        </p>

        <h3 className="font-semibold">Keto Macro Breakdown</h3>

        <ul className="list-disc pl-5">
          <li>Fat: 70–75% of total calories</li>
          <li>Protein: 20–25% of total calories</li>
          <li>Carbs: 5–10% (usually under 30g/day)</li>
        </ul>

        <h3 className="font-semibold">How Keto Macros Are Calculated</h3>

        <p
          className="font-mono text-xs p-3 rounded"
          style={{ backgroundColor: "var(--surface-2)" }}>
          Calories → Protein → Carbs → Remaining Calories from Fat
        </p>

        <h3 className="font-semibold">Why Use a Keto Calculator?</h3>

        <ul className="list-disc pl-5">
          <li>Enter ketosis faster</li>
          <li>Avoid excess protein or carbs</li>
          <li>Optimize fat loss</li>
          <li>Plan keto-friendly meals accurately</li>
        </ul>

        <p>
          This keto calculator provides practical macro targets. Adjust food
          choices based on progress and personal tolerance.
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ Keto diet may not be suitable for everyone. People with medical
        conditions should consult a healthcare professional before starting a
        ketogenic diet.
      </aside>
    </section>
  );
}
