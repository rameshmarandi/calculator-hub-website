"use client";

import { useState } from "react";
import { Calculator, BarChart } from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { ResultCard } from "../../ResultCard";
import BMRCalculatorArticle from "../../content/health/BMRCalculatorArticle";

export default function BMRCalculator() {
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    const a = Number(age);
    const w = Number(weight);
    const h = Number(height);

    if (!a || a <= 0 || a > 120) {
      setError("Please enter a valid age between 1 and 120.");
      return false;
    }

    if (!w || w <= 0 || w > 400) {
      setError("Please enter a valid weight.");
      return false;
    }

    if (!h || h <= 0 || h > 300) {
      setError("Please enter a valid height.");
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

    // Mifflin-St Jeor Formula (Modern Standard)
    if (gender === "male") {
      bmr = 10 * w + 6.25 * h - 5 * a + 5;
    } else {
      bmr = 10 * w + 6.25 * h - 5 * a - 161;
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
      }}
    >
      {/* ================= HEADER ================= */}
      <header>
        <h1 className="text-2xl font-bold mb-1">BMR Calculator</h1>
        <p className="text-sm leading-relaxed">
          Use this BMR Calculator to estimate your Basal Metabolic Rate and
          understand how many calories your body needs each day while at rest.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateBMR} className="space-y-4">
        {/* ===== Gender Tabs ===== */}
        <div
          className="flex rounded-md overflow-hidden"
          style={{ border: "1px solid var(--border)" }}
        >
          <button
            type="button"
            onClick={() => setGender("male")}
            className="flex-1 py-2 text-sm font-medium"
            style={{
              backgroundColor:
                gender === "male" ? "var(--primary)" : "transparent",
              color: gender === "male" ? "#fff" : "var(--text)",
            }}
          >
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
            }}
          >
            Female
          </button>
        </div>

        {/* Inputs */}
        <AmountInput
          label="Age (years)"
          value={age}
          onChange={setAge}
          placeholder="30"
          prefix=""
        />

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
          <div
            className="rounded-lg p-4 space-y-3 text-sm mt-3"
            style={{
              backgroundColor: "var(--surface-muted)",
              border: "1px solid var(--border)",
            }}
          >
            <h3 className="font-semibold">What Your BMR Means</h3>

            <p>
              If your BMR is <strong>{result.bmr} calories/day</strong>, your
              estimated daily calorie needs based on activity level could be:
            </p>

            <ul className="space-y-1">
              <li>Sedentary: ~{Math.round(result.bmr * 1.2)} calories/day</li>

              <li>
                Light Activity: ~{Math.round(result.bmr * 1.375)} calories/day
              </li>

              <li>
                Moderate Activity: ~{Math.round(result.bmr * 1.55)} calories/day
              </li>

              <li>
                Very Active: ~{Math.round(result.bmr * 1.725)} calories/day
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* ================= SEO ARTICLE ================= */}
      <BMRCalculatorArticle />
    </section>
  );
}
