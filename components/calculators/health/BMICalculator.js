"use client";

import { useState } from "react";
import { Calculator, BarChart } from "lucide-react";

import { ResultCard } from "../../ResultCard";
import BMICalculatorArticle from "../../content/health/BMICalculatorArticle";
import { AmountInput } from "../../inputs/AmountInput";

export default function BMICalculator() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    const w = Number(weight);
    const h = Number(height);

    if (!w || w < 20 || w > 300) {
      setError("Please enter a valid weight between 20 kg and 300 kg.");
      return false;
    }

    if (!h || h < 100 || h > 250) {
      setError("Please enter a valid height between 100 cm and 250 cm.");
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
      }}
    >
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

        <AmountInput
          label="Weight (kg)"
          value={weight}
          onChange={setWeight}
          placeholder="70"
          prefix=""
        />

        <AmountInput
          label="Height (cm)"
          value={height}
          onChange={setHeight}
          placeholder="170"
          prefix=""
        />

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          className="w-full py-2.5 rounded-md font-medium flex items-center justify-center gap-2"
          style={{
            backgroundColor: "var(--primary)",
            color: "#fff",
          }}
        >
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

      {/* ================= SEO ARTICLE ================= */}
      <BMICalculatorArticle />

    </section>
  );
}