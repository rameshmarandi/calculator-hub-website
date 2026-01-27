"use client";

import { useState } from "react";
import { Calculator, BarChart } from "lucide-react";

import { PercentageInput } from "../../inputs/PercentageInput";
import { ResultCard } from "../../ResultCard";

export default function BMRCalculator() {
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

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
  function calculateBMR(e) {
    e.preventDefault();
    if (!validate()) return;

    const a = Number(age);
    const w = Number(weight);
    const h = Number(height);

    let bmr = 0;

    // Harris-Benedict Formula
    if (gender === "male") {
      bmr = 88.36 + 13.4 * w + 4.8 * h - 5.7 * a;
    } else {
      bmr = 447.6 + 9.2 * w + 3.1 * h - 4.3 * a;
    }

    setResult({
      bmr: Math.round(bmr),
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
        <h1 className="text-2xl font-bold mb-1">BMR Calculator</h1>
        <p className="text-sm leading-relaxed">
          Use this BMR Calculator to find your Basal Metabolic Rate and
          understand how many calories your body needs at rest.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateBMR} className="space-y-4">
        {/* ===== Gender Tabs (FIXED) ===== */}
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

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          className="w-full py-2.5 rounded-md font-medium flex items-center justify-center gap-2"
          style={{
            backgroundColor: "var(--primary)",
            color: "#fff",
          }}>
          <Calculator size={18} />
          Calculate BMR
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <div aria-live="polite">
          <ResultCard
            variant="primary"
            icon={<BarChart size={20} />}
            label="Your BMR"
            value={`${result.bmr} calories/day`}
          />
        </div>
      )}

      {/* ================= SEO BLOG CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          What is BMR (Basal Metabolic Rate)?
        </h2>

        <p>
          Basal Metabolic Rate (BMR) is the number of calories your body needs
          to perform basic life-sustaining functions like breathing, blood
          circulation, and cell repair while at rest.
        </p>

        <h3 className="font-semibold">BMR Calculation Formula</h3>

        <p
          className="font-mono text-xs p-3 rounded"
          style={{ backgroundColor: "var(--surface-2)" }}>
          Men: BMR = 88.36 + (13.4 × weight) + (4.8 × height) − (5.7 × age)
          Women: BMR = 447.6 + (9.2 × weight) + (3.1 × height) − (4.3 × age)
        </p>

        <ul className="list-disc pl-5">
          <li>Weight in kilograms (kg)</li>
          <li>Height in centimeters (cm)</li>
          <li>Age in years</li>
        </ul>

        <h3 className="font-semibold">Why Use a BMR Calculator?</h3>

        <ul className="list-disc pl-5">
          <li>Determine daily calorie needs</li>
          <li>Supports weight loss or muscle gain goals</li>
          <li>Helps plan diet and fitness routines</li>
          <li>Useful for health & wellness tracking</li>
        </ul>

        <p>
          This BMR calculator provides a reliable estimate for most adults.
          Combine BMR with activity level to calculate your total daily calorie
          requirement.
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ BMR is an estimate only. Actual calorie needs may vary based on body
        composition, activity level, and metabolism.
      </aside>
    </section>
  );
}
