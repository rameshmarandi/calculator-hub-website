"use client";

import { useState } from "react";
import { Calculator, HeartPulse } from "lucide-react";

import { PercentageInput } from "../../inputs/PercentageInput";
import { ResultCard } from "../../ResultCard";

export default function VO2MaxCalculator() {
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [time, setTime] = useState("");
  const [heartRate, setHeartRate] = useState("");
  const [gender, setGender] = useState("male");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    if (!age || Number(age) <= 0) {
      setError("Please enter a valid age.");
      return false;
    }

    if (!weight || Number(weight) <= 0) {
      setError("Please enter a valid body weight.");
      return false;
    }

    if (!time || Number(time) <= 0) {
      setError("Please enter valid walk time.");
      return false;
    }

    if (!heartRate || Number(heartRate) <= 0) {
      setError("Please enter a valid heart rate.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- CALCULATION ---------------- */
  function calculateVO2Max(e) {
    e.preventDefault();
    if (!validate()) return;

    const a = Number(age);
    const w = Number(weight);
    const t = Number(time);
    const hr = Number(heartRate);
    const g = gender === "male" ? 1 : 0;

    /*
      Rockport 1-Mile Walk Test Formula
      VO2 Max = 132.853
                − (0.0769 × weight in lb)
                − (0.3877 × age)
                + (6.315 × gender)
                − (3.2649 × time in minutes)
                − (0.1565 × heart rate)
    */

    const weightLb = w * 2.20462;

    const vo2Max =
      132.853 -
      0.0769 * weightLb -
      0.3877 * a +
      6.315 * g -
      3.2649 * t -
      0.1565 * hr;

    setResult({
      vo2: vo2Max.toFixed(1),
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
        <h1 className="text-2xl font-bold mb-1">VO₂ Max Calculator</h1>
        <p className="text-sm leading-relaxed">
          Use this VO₂ Max Calculator to estimate your cardiovascular fitness
          level based on the Rockport 1-Mile Walk Test.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateVO2Max} className="space-y-4">
        <PercentageInput
          label="Age (years)"
          value={age}
          onChange={setAge}
          placeholder="30"
        />

        <PercentageInput
          label="Body Weight (kg)"
          value={weight}
          onChange={setWeight}
          placeholder="70"
        />

        <PercentageInput
          label="1-Mile Walk Time (minutes)"
          value={time}
          onChange={setTime}
          placeholder="15"
        />

        <PercentageInput
          label="Heart Rate After Walk (bpm)"
          value={heartRate}
          onChange={setHeartRate}
          placeholder="140"
        />

        {/* ===== Gender Selection ===== */}
        <div className="space-y-2">
          <p className="text-sm font-medium">Gender</p>

          {[
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
          ].map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => setGender(item.value)}
              className="w-full px-3 py-2 rounded text-sm text-left"
              style={{
                border: "1px solid var(--border)",
                backgroundColor:
                  gender === item.value ? "var(--primary)" : "transparent",
                color: gender === item.value ? "#fff" : "var(--text)",
              }}>
              {item.label}
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
          Calculate VO₂ Max
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <div aria-live="polite">
          <ResultCard
            variant="primary"
            icon={<HeartPulse size={20} />}
            label="Estimated VO₂ Max"
            value={`${result.vo2} ml/kg/min`}
          />
        </div>
      )}

      {/* ================= SEO BLOG CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">What Is VO₂ Max?</h2>

        <p>
          VO₂ Max represents the maximum amount of oxygen your body can use
          during intense exercise. It is one of the best indicators of
          cardiovascular fitness and aerobic endurance.
        </p>

        <h3 className="font-semibold">How VO₂ Max Is Calculated</h3>

        <p
          className="font-mono text-xs p-3 rounded"
          style={{ backgroundColor: "var(--surface-2)" }}>
          VO₂ Max = 132.853 − (0.0769 × weight(lb)) − (0.3877 × age) + (6.315 ×
          gender) − (3.2649 × time) − (0.1565 × heart rate)
        </p>

        <ul className="list-disc pl-5">
          <li>Based on the Rockport 1-Mile Walk Test</li>
          <li>Uses post-exercise heart rate</li>
          <li>Accounts for age, gender, and body weight</li>
        </ul>

        <h3 className="font-semibold">Why VO₂ Max Matters</h3>

        <ul className="list-disc pl-5">
          <li>Measures aerobic fitness level</li>
          <li>Helps track endurance improvement</li>
          <li>Useful for athletes and beginners</li>
          <li>Predicts cardiovascular health</li>
        </ul>

        <p>
          This VO₂ Max calculator provides an estimate and is suitable for
          general fitness tracking. Laboratory testing offers the most accurate
          measurement.
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ VO₂ Max values are estimates and not a medical diagnosis. Consult a
        healthcare or fitness professional for precise assessment and advice.
      </aside>
    </section>
  );
}
