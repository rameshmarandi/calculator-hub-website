"use client";

import { useMemo, useState } from "react";
import { Activity } from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { ResultCard } from "../../ResultCard";
import DiabetesRiskCalculatorArticle from "../../content/health/DiabetesRiskCalculatorArticle";

import { calculateDiabetesRisk } from "../../../lib/formulas";

export default function DiabetesRiskCalculator() {

  const [age, setAge] = useState("40");
  const [weight, setWeight] = useState("75");
  const [height, setHeight] = useState("170");
  const [familyHistory, setFamilyHistory] = useState("no");
  const [activity, setActivity] = useState("moderate");

  const result = useMemo(() => {

    return calculateDiabetesRisk(
      age,
      weight,
      height,
      familyHistory,
      activity
    );

  }, [age, weight, height, familyHistory, activity]);

  return (
    <section
      className="rounded-xl p-6 space-y-10"
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)"
      }}
    >

      <header>
        <h1 className="text-2xl font-bold mb-1">
          Diabetes Risk Calculator
        </h1>

        <p className="text-sm leading-relaxed">
          Estimate your risk of developing type 2 diabetes based on
          body measurements, lifestyle habits, and family history.
        </p>
      </header>

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
              color: "var(--text)"
            }}
          >
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>

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
              backgroundColor: "var(--surface)"
            }}
          >
            <option value="active">Active — Exercise regularly</option>
            <option value="moderate">Moderately Active</option>
            <option value="low">Low Activity — Sedentary</option>
          </select>
        </div>

      </div>

      <div aria-live="polite">

        <ResultCard
          variant={result.variant}
          icon={<Activity size={20} />}
          label="Diabetes Risk Result"
          value={`${result.riskLevel} (BMI: ${result.bmi})`}
        />

      </div>

      <DiabetesRiskCalculatorArticle />

    </section>
  );
}