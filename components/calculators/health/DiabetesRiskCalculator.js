"use client";

import { useState, useEffect } from "react";
import { Activity } from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { ResultCard } from "../../ResultCard";
import DiabetesRiskCalculatorArticle from "../../content/health/DiabetesRiskCalculatorArticle";

export default function DiabetesRiskCalculator() {

  /* ---------------- PREFILLED VALUES ---------------- */
  const [age, setAge] = useState("40");
  const [weight, setWeight] = useState("75");
  const [height, setHeight] = useState("170");
  const [familyHistory, setFamilyHistory] = useState("no");
  const [activity, setActivity] = useState("moderate");

  const [result, setResult] = useState(null);

  /* ---------------- AUTO CALCULATION ---------------- */
  useEffect(() => {

    if (!age || !weight || !height) return;

    const a = Number(age);
    const w = Number(weight);
    const h = Number(height) / 100;

    if (a <= 0 || w <= 0 || h <= 0) return;

    const bmi = w / (h * h);

    let score = 0;

    /* Age factor */
    if (a >= 35) score += 2;
    if (a >= 45) score += 2;

    /* BMI factor */
    if (bmi >= 25) score += 2;
    if (bmi >= 30) score += 3;

    /* Family history */
    if (familyHistory === "yes") score += 3;

    /* Activity level */
    if (activity === "moderate") score += 1;
    if (activity === "low") score += 2;

    let riskLevel = "Low Risk";
    let variant = "primary";

    if (score >= 5 && score <= 8) {
      riskLevel = "Moderate Risk";
      variant = "warning";
    }

    if (score > 8) {
      riskLevel = "High Risk";
      variant = "danger";
    }

    setResult({
      bmi: bmi.toFixed(1),
      riskLevel,
      variant,
    });

  }, [age, weight, height, familyHistory, activity]);

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
        <h1 className="text-2xl font-bold mb-1">
          Diabetes Risk Calculator
        </h1>

        <p className="text-sm leading-relaxed">
          Estimate your risk of developing type 2 diabetes based on
          body measurements, lifestyle habits, and family history.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <div className="space-y-4">

        <AmountInput
          label="Age (years)"
          value={age}
          onChange={setAge}
          prefix=""
        />

        <AmountInput
          label="Weight (kg)"
          value={weight}
          onChange={setWeight}
          prefix=""
        />

        <AmountInput
          label="Height (cm)"
          value={height}
          onChange={setHeight}
          prefix=""
        />

        {/* ===== Family History ===== */}
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Family History of Diabetes
          </label>

          <select
            value={familyHistory}
            onChange={(e) => setFamilyHistory(e.target.value)}
            className="w-full px-3 py-2 rounded text-sm"
            style={{
              border: "1px solid var(--border)",
              backgroundColor: "var(--surface)",
              color: "var(--text)",
            }}
          >
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>

        {/* ===== Physical Activity ===== */}
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Physical Activity Level
          </label>

          <select
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            className="w-full px-3 py-2 rounded text-sm"
            style={{
              border: "1px solid var(--border)",
              backgroundColor: "var(--surface)",
              color: "var(--text)",
            }}
          >
            <option value="active">
              Active — Exercise regularly
            </option>

            <option value="moderate">
              Moderately Active — Occasional exercise
            </option>

            <option value="low">
              Low Activity — Sedentary lifestyle
            </option>
          </select>
        </div>

      </div>

      {/* ================= RESULT ================= */}
      <div aria-live="polite">
        <ResultCard
          variant={result?.variant}
          icon={<Activity size={20} />}
          label="Diabetes Risk Result"
          value={`${result?.riskLevel} (BMI: ${result?.bmi})`}
        />
      </div>

      {/* ================= ARTICLE ================= */}
      <DiabetesRiskCalculatorArticle />

    </section>
  );
}