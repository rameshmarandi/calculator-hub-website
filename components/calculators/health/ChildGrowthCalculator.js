"use client";

import { useState } from "react";
import { Calculator, Activity } from "lucide-react";

import { PercentageInput } from "../../inputs/PercentageInput";
import { ResultCard } from "../../ResultCard";

export default function ChildGrowthCalculator() {
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    if (!age || Number(age) <= 0 || Number(age) > 18) {
      setError("Please enter a valid child age (0–18 years).");
      return false;
    }

    if (!height || Number(height) <= 0) {
      setError("Please enter valid height.");
      return false;
    }

    if (!weight || Number(weight) <= 0) {
      setError("Please enter valid weight.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- CALCULATION ---------------- */
  function calculateGrowth(e) {
    e.preventDefault();
    if (!validate()) return;

    const hMeters = Number(height) / 100;
    const w = Number(weight);
    const a = Number(age);

    const bmi = w / (hMeters * hMeters);

    let status = "Normal Growth";
    let variant = "primary";

    // Simplified BMI-for-age screening (non-diagnostic)
    if (bmi < 14) {
      status = "Underweight for Age";
      variant = "warning";
    } else if (bmi > 20 && a < 10) {
      status = "Overweight for Age";
      variant = "warning";
    } else if (bmi > 23 && a >= 10) {
      status = "Overweight for Age";
      variant = "warning";
    }

    setResult({
      bmi: bmi.toFixed(1),
      status,
      variant,
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
        <h1 className="text-2xl font-bold mb-1">Child Growth Calculator</h1>
        <p className="text-sm leading-relaxed">
          Use this Child Growth Calculator to get a basic understanding of your
          child’s growth status based on age, height, and weight.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateGrowth} className="space-y-4">
        {/* Gender */}
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
            Boy
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
            Girl
          </button>
        </div>

        <PercentageInput
          label="Age (years)"
          value={age}
          onChange={setAge}
          placeholder="6"
        />

        <PercentageInput
          label="Height (cm)"
          value={height}
          onChange={setHeight}
          placeholder="120"
        />

        <PercentageInput
          label="Weight (kg)"
          value={weight}
          onChange={setWeight}
          placeholder="22"
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
          Check Child Growth
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <div aria-live="polite">
          <ResultCard
            variant={result.variant}
            icon={<Activity size={20} />}
            label="Growth Result"
            value={`BMI: ${result.bmi} — ${result.status}`}
          />
        </div>
      )}

      {/* ================= SEO BLOG CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          How Child Growth is Assessed
        </h2>

        <p>
          Child growth is typically monitored using height, weight, and age.
          These measurements help identify whether a child is growing at a
          healthy rate compared to age-based standards.
        </p>

        <h3 className="font-semibold">Growth Calculation Method</h3>

        <p
          className="font-mono text-xs p-3 rounded"
          style={{ backgroundColor: "var(--surface-2)" }}>
          BMI = Weight (kg) ÷ Height² (meters)
        </p>

        <ul className="list-disc pl-5">
          <li>Used as a screening indicator</li>
          <li>Adjusted for child age</li>
          <li>Helps identify growth concerns early</li>
        </ul>

        <h3 className="font-semibold">Why Monitor Child Growth?</h3>

        <ul className="list-disc pl-5">
          <li>Ensure healthy physical development</li>
          <li>Detect undernutrition or overweight early</li>
          <li>Support proper diet and activity planning</li>
          <li>Track long-term growth patterns</li>
        </ul>

        <p>
          Regular growth monitoring helps parents and caregivers understand a
          child’s development. Sudden changes in growth should always be
          discussed with a pediatrician.
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ This child growth calculator provides a basic screening only and does
        not replace professional medical assessment. For accurate growth
        percentiles and diagnosis, consult a pediatrician and use WHO or CDC
        growth charts.
      </aside>
    </section>
  );
}
