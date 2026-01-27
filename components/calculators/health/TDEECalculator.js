"use client";

import { useState } from "react";
import { Calculator, BarChart } from "lucide-react";

import { PercentageInput } from "../../inputs/PercentageInput";
import { ResultCard } from "../../ResultCard";

export default function TDEECalculator() {
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [activity, setActivity] = useState("1.2");

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
  function calculateTDEE(e) {
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

    setResult({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
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
        <h1 className="text-2xl font-bold mb-1">TDEE Calculator</h1>
        <p className="text-sm leading-relaxed">
          Use this TDEE Calculator to find your Total Daily Energy Expenditure —
          the total calories you burn per day based on your activity level.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateTDEE} className="space-y-4">
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

        {/* ===== Activity Level Tabs ===== */}
        <div className="space-y-2">
          <p className="text-sm font-medium">Activity Level</p>

          {[
            { label: "Sedentary", value: "1.2", desc: "Little or no exercise" },
            { label: "Lightly Active", value: "1.375", desc: "1–3 days/week" },
            {
              label: "Moderately Active",
              value: "1.55",
              desc: "3–5 days/week",
            },
            { label: "Very Active", value: "1.725", desc: "6–7 days/week" },
            {
              label: "Extra Active",
              value: "1.9",
              desc: "Physical job / athlete",
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
          Calculate TDEE
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <div className="grid md:grid-cols-2 gap-4" aria-live="polite">
          <ResultCard
            variant="neutral"
            icon={<BarChart size={20} />}
            label="Your BMR"
            value={`${result.bmr} calories/day`}
          />

          <ResultCard
            variant="primary"
            icon={<BarChart size={20} />}
            label="Your TDEE"
            value={`${result.tdee} calories/day`}
          />
        </div>
      )}

      {/* ================= SEO BLOG CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          What is TDEE (Total Daily Energy Expenditure)?
        </h2>

        <p>
          Total Daily Energy Expenditure (TDEE) is the total number of calories
          your body burns in a day, including basic functions, physical
          activity, and exercise.
        </p>

        <h3 className="font-semibold">TDEE Calculation Formula</h3>

        <p
          className="font-mono text-xs p-3 rounded"
          style={{ backgroundColor: "var(--surface-2)" }}>
          TDEE = BMR × Activity Factor
        </p>

        <ul className="list-disc pl-5">
          <li>Sedentary: 1.2</li>
          <li>Lightly active: 1.375</li>
          <li>Moderately active: 1.55</li>
          <li>Very active: 1.725</li>
          <li>Extra active: 1.9</li>
        </ul>

        <h3 className="font-semibold">Why Use a TDEE Calculator?</h3>

        <ul className="list-disc pl-5">
          <li>Plan weight loss or weight gain</li>
          <li>Set daily calorie targets</li>
          <li>Design fitness & diet plans</li>
          <li>Understand energy needs accurately</li>
        </ul>

        <p>
          This TDEE calculator gives a reliable estimate for daily calorie
          needs. Adjust intake above or below TDEE to gain or lose weight.
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ TDEE is an estimate only. Actual calorie needs may vary based on
        metabolism, body composition, and lifestyle.
      </aside>
    </section>
  );
}
