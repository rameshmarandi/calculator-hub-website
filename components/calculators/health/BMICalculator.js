"use client";

import { useState } from "react";
import { Calculator, BarChart } from "lucide-react";

import { PercentageInput } from "../../inputs/PercentageInput";
import { ResultCard } from "../../ResultCard";

export default function BMICalculator() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    if (!weight || Number(weight) <= 0) {
      setError("Please enter valid body weight.");
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
  function calculateBMI(e) {
    e.preventDefault();
    if (!validate()) return;

    const w = Number(weight);
    const hMeters = Number(height) / 100;

    const bmi = w / (hMeters * hMeters);

    let category = "";
    if (bmi < 18.5) category = "Underweight";
    else if (bmi < 25) category = "Normal weight";
    else if (bmi < 30) category = "Overweight";
    else category = "Obese";

    setResult({
      bmi: bmi.toFixed(1),
      category,
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
        <h1 className="text-2xl font-bold mb-1">BMI Calculator</h1>
        <p className="text-sm leading-relaxed">
          Use this BMI Calculator to check your Body Mass Index and understand
          whether your weight is healthy for your height.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateBMI} className="space-y-4">
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
          Calculate BMI
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <div className="grid md:grid-cols-2 gap-4" aria-live="polite">
          <ResultCard
            variant="primary"
            icon={<BarChart size={20} />}
            label="Your BMI"
            value={result.bmi}
          />

          <ResultCard
            variant="neutral"
            icon={<BarChart size={20} />}
            label="BMI Category"
            value={result.category}
          />
        </div>
      )}

      {/* ================= SEO BLOG CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          What is BMI (Body Mass Index)?
        </h2>

        <p>
          Body Mass Index (BMI) is a simple measure used to assess whether a
          person has a healthy body weight for a given height. It is widely used
          by doctors and health professionals worldwide.
        </p>

        <h3 className="font-semibold">BMI Calculation Formula</h3>

        <p
          className="font-mono text-xs p-3 rounded"
          style={{ backgroundColor: "var(--surface-2)" }}>
          BMI = Weight (kg) ÷ Height² (meters)
        </p>

        <ul className="list-disc pl-5">
          <li>Underweight: BMI &lt; 18.5</li>
          <li>Normal weight: BMI 18.5 – 24.9</li>
          <li>Overweight: BMI 25 – 29.9</li>
          <li>Obese: BMI ≥ 30</li>
        </ul>

        <h3 className="font-semibold">Why Use a BMI Calculator?</h3>

        <ul className="list-disc pl-5">
          <li>Quick health assessment</li>
          <li>Helps track weight goals</li>
          <li>Useful for fitness planning</li>
          <li>Identifies health risk levels</li>
        </ul>

        <p>
          This BMI calculator provides a fast and easy way to understand your
          weight status. For medical advice, consult a healthcare professional.
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ BMI is a screening tool and does not directly measure body fat or
        overall health. Always consult a doctor for medical guidance.
      </aside>
    </section>
  );
}
