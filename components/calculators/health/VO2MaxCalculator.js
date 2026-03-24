"use client";

import { useState, useEffect } from "react";
import { HeartPulse } from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { ResultCard } from "../../ResultCard";
import VO2MaxCalculatorArticle from "../../content/health/VO2MaxCalculatorArticle";

export default function VO2MaxCalculator() {
 const [weight, setWeight] = useState(70);
const [age, setAge] = useState(30);
const [time, setTime] = useState(15);
const [heartRate, setHeartRate] = useState(140);
const [gender, setGender] = useState("male");
  const [result, setResult] = useState("—");

  /* ---------------- CALCULATION ---------------- */
  function calculateVO2Max() {
    if (!age || !weight || !time || !heartRate) {
      setResult("—");
      return;
    }

    const a = Number(age);
    const w = Number(weight);
    const t = Number(time);
    const hr = Number(heartRate);
    const g = gender === "male" ? 1 : 0;

    if (a <= 0 || w <= 0 || t <= 0 || hr <= 0) {
      setResult("—");
      return;
    }

    const weightLb = w * 2.20462;

    const vo2Max =
      132.853 -
      0.0769 * weightLb -
      0.3877 * a +
      6.315 * g -
      3.2649 * t -
      0.1565 * hr;

    setResult(vo2Max.toFixed(1));
  }

  /* ---------------- AUTO CALCULATE ---------------- */
  useEffect(() => {
    calculateVO2Max();
  }, [age, weight, time, heartRate, gender]);

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
        <h1 className="text-2xl font-bold mb-1">VO₂ Max Calculator</h1>
        <p className="text-sm leading-relaxed">
          Estimate your cardiovascular fitness using the Rockport 1-Mile Walk
          Test formula.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <div className="space-y-4">
        <AmountInput
          label="Age (years)"
          value={age}
          onChange={setAge}
          placeholder="30"
          prefix=""
        />

        <AmountInput
          label="Body Weight (kg)"
          value={weight}
          onChange={setWeight}
          placeholder="70"
          prefix=""
        />

        <AmountInput
          label="1-Mile Walk Time (minutes)"
          value={time}
          onChange={setTime}
          placeholder="15"
          prefix=""
        />

        <AmountInput
          label="Heart Rate After Walk (bpm)"
          value={heartRate}
          onChange={setHeartRate}
          placeholder="140"
          prefix=""
        />

        {/* ===== Gender Dropdown ===== */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Gender</label>

          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full px-3 py-2 rounded-md text-sm"
            style={{
              border: "1px solid var(--border)",
              backgroundColor: "var(--surface)",
            }}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      </div>

      {/* ================= RESULT ================= */}
      <div aria-live="polite">
        <ResultCard
          variant="primary"
          icon={<HeartPulse size={20} />}
          label="Estimated VO₂ Max"
          value={
            result === "—"
              ? "Enter your details to see the result"
              : `${result} ml/kg/min`
          }
        />
      </div>

      {/* ================= SEO ARTICLE ================= */}
      <VO2MaxCalculatorArticle />
    </section>
  );
}
