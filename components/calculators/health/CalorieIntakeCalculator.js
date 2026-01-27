"use client";

import { useState } from "react";
import { Calculator, BarChart } from "lucide-react";

import { PercentageInput } from "../../inputs/PercentageInput";
import { ResultCard } from "../../ResultCard";

export default function CalorieIntakeCalculator() {
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [activity, setActivity] = useState("1.2");
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
  function calculateCalories(e) {
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

    let targetCalories = tdee;

    // Goal adjustment
    if (goal === "lose") {
      targetCalories = tdee - 500;
    } else if (goal === "gain") {
      targetCalories = tdee + 500;
    }

    setResult({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      calories: Math.round(targetCalories),
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
        <h1 className="text-2xl font-bold mb-1">Calorie Intake Calculator</h1>
        <p className="text-sm leading-relaxed">
          Use this Calorie Intake Calculator to find how many calories you
          should eat daily to maintain, lose, or gain weight.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateCalories} className="space-y-4">
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

        {/* ===== Activity Level ===== */}
        <div className="space-y-2">
          <p className="text-sm font-medium">Activity Level</p>

          {[
            { label: "Sedentary", value: "1.2" },
            { label: "Lightly Active", value: "1.375" },
            { label: "Moderately Active", value: "1.55" },
            { label: "Very Active", value: "1.725" },
            { label: "Extra Active", value: "1.9" },
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

        {/* ===== Goal Selection ===== */}
        <div className="space-y-2">
          <p className="text-sm font-medium">Goal</p>

          {[
            { label: "Maintain Weight", value: "maintain" },
            { label: "Lose Weight", value: "lose" },
            { label: "Gain Weight", value: "gain" },
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
          Calculate Daily Calories
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
            label="Recommended Intake"
            value={`${result.calories} cal/day`}
          />
        </div>
      )}

      {/* ================= SEO BLOG CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          How to Calculate Daily Calorie Intake
        </h2>

        <p>
          Daily calorie intake is the number of calories you should eat each day
          based on your body, activity level, and fitness goal. Eating the right
          number of calories helps you maintain, lose, or gain weight safely.
        </p>

        <h3 className="font-semibold">Calorie Intake Formula</h3>

        <p
          className="font-mono text-xs p-3 rounded"
          style={{ backgroundColor: "var(--surface-2)" }}>
          BMR = Basal Metabolic Rate TDEE = BMR × Activity Factor Daily Calories
          = TDEE ± Goal Adjustment
        </p>

        <ul className="list-disc pl-5">
          <li>500 calorie deficit ≈ weight loss</li>
          <li>500 calorie surplus ≈ weight gain</li>
          <li>Maintenance calories keep weight stable</li>
        </ul>

        <h3 className="font-semibold">Why Use a Calorie Intake Calculator?</h3>

        <ul className="list-disc pl-5">
          <li>Plan diet effectively</li>
          <li>Support fat loss or muscle gain</li>
          <li>Avoid under-eating or overeating</li>
          <li>Useful for fitness & nutrition tracking</li>
        </ul>

        <p>
          This calorie intake calculator provides a realistic daily calorie
          target. For best results, combine it with balanced nutrition and
          regular exercise.
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ Calorie needs are estimates and may vary based on metabolism, body
        composition, and health conditions. Consult a professional for
        personalized advice.
      </aside>
    </section>
  );
}
