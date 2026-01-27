"use client";

import { useState } from "react";
import { Calculator, Activity } from "lucide-react";

import { PercentageInput } from "../../inputs/PercentageInput";
import { ResultCard } from "../../ResultCard";

export default function DiabetesRiskCalculator() {
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [familyHistory, setFamilyHistory] = useState("no");
  const [activity, setActivity] = useState("active");

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
  function calculateRisk(e) {
    e.preventDefault();
    if (!validate()) return;

    const a = Number(age);
    const w = Number(weight);
    const h = Number(height) / 100;

    // BMI calculation
    const bmi = w / (h * h);

    let score = 0;

    // Age factor
    if (a >= 35) score += 2;
    if (a >= 45) score += 2;

    // BMI factor
    if (bmi >= 25) score += 2;
    if (bmi >= 30) score += 3;

    // Family history
    if (familyHistory === "yes") score += 3;

    // Activity level
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
        <h1 className="text-2xl font-bold mb-1">Diabetes Risk Calculator</h1>
        <p className="text-sm leading-relaxed">
          Use this Diabetes Risk Calculator to estimate your risk of developing
          type 2 diabetes based on common lifestyle and health factors.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateRisk} className="space-y-4">
        <PercentageInput
          label="Age (years)"
          value={age}
          onChange={setAge}
          placeholder="40"
        />

        <PercentageInput
          label="Weight (kg)"
          value={weight}
          onChange={setWeight}
          placeholder="75"
        />

        <PercentageInput
          label="Height (cm)"
          value={height}
          onChange={setHeight}
          placeholder="170"
        />

        {/* ===== Family History ===== */}
        <div className="space-y-2">
          <p className="text-sm font-medium">Family History of Diabetes</p>

          {[
            { label: "No", value: "no" },
            { label: "Yes", value: "yes" },
          ].map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => setFamilyHistory(item.value)}
              className="w-full px-3 py-2 rounded text-sm text-left"
              style={{
                border: "1px solid var(--border)",
                backgroundColor:
                  familyHistory === item.value
                    ? "var(--primary)"
                    : "transparent",
                color: familyHistory === item.value ? "#fff" : "var(--text)",
              }}>
              {item.label}
            </button>
          ))}
        </div>

        {/* ===== Activity Level ===== */}
        <div className="space-y-2">
          <p className="text-sm font-medium">Physical Activity Level</p>

          {[
            { label: "Active", value: "active", desc: "Exercise regularly" },
            {
              label: "Moderately Active",
              value: "moderate",
              desc: "Occasional exercise",
            },
            {
              label: "Low Activity",
              value: "low",
              desc: "Sedentary lifestyle",
            },
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
          Check Diabetes Risk
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <div aria-live="polite">
          <ResultCard
            variant={result.variant}
            icon={<Activity size={20} />}
            label="Diabetes Risk Result"
            value={`${result.riskLevel} (BMI: ${result.bmi})`}
          />
        </div>
      )}

      {/* ================= SEO BLOG CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">What is Type 2 Diabetes?</h2>

        <p>
          Type 2 diabetes is a chronic condition that affects how your body
          processes blood sugar (glucose). It is strongly linked to lifestyle
          factors such as weight, physical activity, and family history.
        </p>

        <h3 className="font-semibold">How Diabetes Risk is Estimated</h3>

        <p
          className="font-mono text-xs p-3 rounded"
          style={{ backgroundColor: "var(--surface-2)" }}>
          Risk Factors = Age + BMI + Family History + Activity Level
        </p>

        <ul className="list-disc pl-5">
          <li>Higher age increases diabetes risk</li>
          <li>Overweight and obesity are major risk factors</li>
          <li>Family history raises genetic risk</li>
          <li>Physical inactivity increases insulin resistance</li>
        </ul>

        <h3 className="font-semibold">How to Reduce Diabetes Risk</h3>

        <ul className="list-disc pl-5">
          <li>Maintain a healthy body weight</li>
          <li>Exercise regularly</li>
          <li>Eat a balanced, low-sugar diet</li>
          <li>Monitor blood sugar levels if advised</li>
        </ul>

        <p>
          This diabetes risk calculator helps identify whether you may be at
          risk. Early lifestyle changes can significantly reduce the chances of
          developing type 2 diabetes.
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ This calculator provides an estimate only and is not a medical
        diagnosis. For accurate assessment, consult a doctor and get blood
        glucose testing done.
      </aside>
    </section>
  );
}
