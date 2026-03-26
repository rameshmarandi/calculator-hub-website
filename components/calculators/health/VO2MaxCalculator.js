"use client";

import { useState, useMemo } from "react";
import { HeartPulse } from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { ResultCard } from "../../ResultCard";
import VO2MaxCalculatorArticle from "../../content/health/VO2MaxCalculatorArticle";

import { calculateVO2Max } from "../../../lib/formulas";

export default function VO2MaxCalculator() {

  /* ---------------- PREFILLED DATA ---------------- */
  const [weight, setWeight] = useState("70");
  const [age, setAge] = useState("30");
  const [time, setTime] = useState("15");
  const [heartRate, setHeartRate] = useState("140");
  const [gender, setGender] = useState("male");

  /* ---------------- CALCULATION ---------------- */
  const result = useMemo(() => {
    return calculateVO2Max({
      age,
      weight,
      time,
      heartRate,
      gender
    });
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
        <h1 className="text-2xl font-bold mb-1">
          VO₂ Max Calculator
        </h1>

        <p className="text-sm leading-relaxed">
          Estimate your cardiovascular fitness using the Rockport 1-Mile Walk Test formula.
        </p>
      </header>

      {/* ================= INPUTS ================= */}
      <div className="space-y-4">

        <AmountInput
          label="Age (years)"
          value={age}
          onChange={setAge}
          prefix=""
        />

        <AmountInput
          label="Body Weight (kg)"
          value={weight}
          onChange={setWeight}
          prefix=""
        />

        <AmountInput
          label="1-Mile Walk Time (minutes)"
          value={time}
          onChange={setTime}
          prefix=""
        />

        <AmountInput
          label="Heart Rate After Walk (bpm)"
          value={heartRate}
          onChange={setHeartRate}
          prefix=""
        />

        {/* Gender */}
        <div className="space-y-2">

          <label className="text-sm font-medium">
            Gender
          </label>

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
          value={`${result.vo2max} ml/kg/min`}
        />

      </div>

      {/* ================= SEO ARTICLE ================= */}
      <VO2MaxCalculatorArticle />

    </section>
  );
}