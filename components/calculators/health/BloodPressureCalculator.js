"use client";

import { useState, useEffect } from "react";
import { Activity } from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { ResultCard } from "../../ResultCard";
import BloodPressureCalculatorArticle from "./BloodPressureCalculatorArticle";

export default function BloodPressureCalculator() {

  /* ---------------- PREFILLED VALUES ---------------- */
  const [systolic, setSystolic] = useState("120");
  const [diastolic, setDiastolic] = useState("80");

  const [result, setResult] = useState(null);

  /* ---------------- AUTO CALCULATION ---------------- */
  useEffect(() => {

    if (!systolic || !diastolic) return;

    const sys = Number(systolic);
    const dia = Number(diastolic);

    if (sys <= 0 || dia <= 0) return;

    let category = "";
    let variant = "neutral";

    if (sys < 120 && dia < 80) {
      category = "Normal Blood Pressure";
      variant = "primary";
    } else if (sys < 130 && dia < 80) {
      category = "Elevated Blood Pressure";
      variant = "warning";
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

  }, [systolic, diastolic]);

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
          Blood Pressure Calculator
        </h1>

        <p className="text-sm leading-relaxed">
          Understand your blood pressure reading and identify whether it falls
          under normal, elevated, or high blood pressure categories.
        </p>
      </header>

      {/* ================= INPUTS ================= */}
      <div className="space-y-4">

        <AmountInput
          label="Systolic Pressure (mmHg)"
          value={systolic}
          onChange={setSystolic}
          prefix=""
        />

        <AmountInput
          label="Diastolic Pressure (mmHg)"
          value={diastolic}
          onChange={setDiastolic}
          prefix=""
        />

      </div>

      {/* ================= RESULT ================= */}
      <div aria-live="polite">
        <ResultCard
          variant={result?.variant}
          icon={<Activity size={20} />}
          label="Blood Pressure Result"
          value={`${result?.reading} — ${result?.category}`}
        />
      </div>

      {/* ================= ARTICLE ================= */}
      <BloodPressureCalculatorArticle />

    </section>
  );
}