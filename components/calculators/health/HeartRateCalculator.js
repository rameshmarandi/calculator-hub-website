"use client";

import { useState } from "react";
import { Calculator, Activity } from "lucide-react";

import { PercentageInput } from "../../inputs/PercentageInput";
import { ResultCard } from "../../ResultCard";
import HeartRateCalculatorArticle from "./HeartRateCalculatorArticle";
import { AmountInput } from "../../inputs/AmountInput";

export default function HeartRateCalculator() {
  const [age, setAge] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    if (!age || Number(age) <= 0 || Number(age) > 120) {
      setError("Please enter a valid age.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- CALCULATION ---------------- */
  function calculateHeartRate(e) {
    e.preventDefault();
    if (!validate()) return;

    const a = Number(age);

    // Standard formula
    const maxHR = 220 - a;

    const zones = {
      fatBurn: {
        min: Math.round(maxHR * 0.5),
        max: Math.round(maxHR * 0.6),
      },
      cardio: {
        min: Math.round(maxHR * 0.6),
        max: Math.round(maxHR * 0.75),
      },
      peak: {
        min: Math.round(maxHR * 0.75),
        max: Math.round(maxHR * 0.9),
      },
    };

    setResult({
      maxHR,
      zones,
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
        <h1 className="text-2xl font-bold mb-1">Heart Rate Calculator</h1>
        <p className="text-sm leading-relaxed">
          Use this Heart Rate Calculator to find your maximum heart rate and
          target heart rate zones for fat burn, cardio, and peak training.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateHeartRate} className="space-y-4">
        <AmountInput
          label="Age (years)"
          value={age}
          onChange={setAge}
          placeholder="30"
          prefix=""
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
          Calculate Heart Rate
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {/* {result && ( */}
        <div className="grid md:grid-cols-3 gap-4" aria-live="polite">
          <ResultCard
            variant="primary"
            icon={<Activity size={20} />}
            label="Maximum Heart Rate"
            value={ result?.maxHR ? `${result?.maxHR} bpm` : "-" }
          />

          <ResultCard
            variant="neutral"
            icon={<Activity size={20} />}
            label="Fat Burn Zone"
            value={`${result?.zones?.fatBurn?.min} – ${result?.zones?.fatBurn.max} bpm`}
          />

          <ResultCard
            variant="neutral"
            icon={<Activity size={20} />}
            label="Cardio Zone"
            value={`${result?.zones?.cardio.min} – ${result?.zones?.cardio.max} bpm`}
          />

          <ResultCard
            variant="warning"
            icon={<Activity size={20} />}
            label="Peak Zone"
            value={`${result?.zones.peak.min} – ${result?.zones.peak.max} bpm`}
          />
        </div>
      {/* )} */}

      {/* ================= SEO BLOG CONTENT ================= */}
      <HeartRateCalculatorArticle/>
    </section>
  );
}
