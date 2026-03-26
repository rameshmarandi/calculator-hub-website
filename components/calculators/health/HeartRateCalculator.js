"use client";

import { useMemo, useState } from "react";
import { Activity } from "lucide-react";

import { ResultCard } from "../../ResultCard";
import { AmountInput } from "../../inputs/AmountInput";
import HeartRateCalculatorArticle from "./HeartRateCalculatorArticle";

import { calculateHeartRate } from "../../../lib/formulas";

export default function HeartRateCalculator() {

  const [age, setAge] = useState("30");

  const result = useMemo(() => {

    return calculateHeartRate(age);

  }, [age]);

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
          Heart Rate Calculator
        </h1>

        <p className="text-sm leading-relaxed">
          Calculate your maximum heart rate and training zones for fat burn,
          cardio, and peak intensity workouts.
        </p>
      </header>

      <div className="space-y-4">

        <AmountInput
          label="Age (years)"
          value={age}
          onChange={setAge}
          prefix=""
        />

      </div>

      <div className="grid md:grid-cols-4 gap-4" aria-live="polite">

        <ResultCard
          variant="primary"
          icon={<Activity size={20} />}
          label="Maximum Heart Rate"
          value={`${result.maxHR} bpm`}
        />

        <ResultCard
          variant="neutral"
          icon={<Activity size={20} />}
          label="Fat Burn Zone"
          value={`${result.zones.fatBurn.min} – ${result.zones.fatBurn.max} bpm`}
        />

        <ResultCard
          variant="neutral"
          icon={<Activity size={20} />}
          label="Cardio Zone"
          value={`${result.zones.cardio.min} – ${result.zones.cardio.max} bpm`}
        />

        <ResultCard
          variant="warning"
          icon={<Activity size={20} />}
          label="Peak Zone"
          value={`${result.zones.peak.min} – ${result.zones.peak.max} bpm`}
        />

      </div>

      <HeartRateCalculatorArticle />

    </section>
  );
}