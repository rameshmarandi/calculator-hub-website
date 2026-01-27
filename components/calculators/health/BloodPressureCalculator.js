"use client";

import { useState } from "react";
import { Calculator, Activity } from "lucide-react";

import { PercentageInput } from "../../inputs/PercentageInput";
import { ResultCard } from "../../ResultCard";

export default function BloodPressureCalculator() {
  const [systolic, setSystolic] = useState("");
  const [diastolic, setDiastolic] = useState("");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    if (!systolic || Number(systolic) <= 0) {
      setError("Please enter valid systolic pressure.");
      return false;
    }

    if (!diastolic || Number(diastolic) <= 0) {
      setError("Please enter valid diastolic pressure.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- CALCULATION ---------------- */
  function calculateBP(e) {
    e.preventDefault();
    if (!validate()) return;

    const sys = Number(systolic);
    const dia = Number(diastolic);

    let category = "";
    let variant = "neutral";

    if (sys < 120 && dia < 80) {
      category = "Normal Blood Pressure";
      variant = "primary";
    } else if (sys < 130 && dia < 80) {
      category = "Elevated Blood Pressure";
    } else if (sys < 140 || dia < 90) {
      category = "High Blood Pressure (Stage 1)";
      variant = "warning";
    } else if (sys < 180 || dia < 120) {
      category = "High Blood Pressure (Stage 2)";
      variant = "danger";
    } else {
      category = "Hypertensive Crisis (Seek medical help)";
      variant = "danger";
    }

    setResult({
      reading: `${sys}/${dia} mmHg`,
      category,
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
        <h1 className="text-2xl font-bold mb-1">Blood Pressure Calculator</h1>
        <p className="text-sm leading-relaxed">
          Use this Blood Pressure Calculator to understand your blood pressure
          reading and identify whether it falls under normal, elevated, or high
          blood pressure categories.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateBP} className="space-y-4">
        <PercentageInput
          label="Systolic Pressure (mmHg)"
          value={systolic}
          onChange={setSystolic}
          placeholder="120"
        />

        <PercentageInput
          label="Diastolic Pressure (mmHg)"
          value={diastolic}
          onChange={setDiastolic}
          placeholder="80"
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
          Check Blood Pressure
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <div aria-live="polite">
          <ResultCard
            variant={result.variant}
            icon={<Activity size={20} />}
            label="Blood Pressure Result"
            value={`${result.reading} — ${result.category}`}
          />
        </div>
      )}

      {/* ================= SEO BLOG CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">What is Blood Pressure?</h2>

        <p>
          Blood pressure is the force of blood pushing against the walls of your
          arteries as your heart pumps blood. It is recorded as two numbers:
          systolic pressure over diastolic pressure.
        </p>

        <h3 className="font-semibold">Blood Pressure Categories</h3>

        <ul className="list-disc pl-5">
          <li>
            <strong>Normal:</strong> Below 120 / 80 mmHg
          </li>
          <li>
            <strong>Elevated:</strong> 120–129 / &lt;80 mmHg
          </li>
          <li>
            <strong>High BP Stage 1:</strong> 130–139 / 80–89 mmHg
          </li>
          <li>
            <strong>High BP Stage 2:</strong> ≥140 / ≥90 mmHg
          </li>
          <li>
            <strong>Hypertensive Crisis:</strong> ≥180 / ≥120 mmHg
          </li>
        </ul>

        <h3 className="font-semibold">Why Monitor Blood Pressure?</h3>

        <ul className="list-disc pl-5">
          <li>Reduce risk of heart disease and stroke</li>
          <li>Detect hypertension early</li>
          <li>Track effectiveness of lifestyle changes</li>
          <li>Improve long-term cardiovascular health</li>
        </ul>

        <p>
          This blood pressure calculator helps you quickly interpret your
          readings. Regular monitoring and healthy habits can help keep your
          blood pressure under control.
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ This calculator is for informational purposes only and does not
        replace medical advice. Always consult a healthcare professional for
        diagnosis or treatment.
      </aside>
    </section>
  );
}
