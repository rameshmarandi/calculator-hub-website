"use client";

import { useMemo, useState } from "react";
import { Activity } from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { ResultCard } from "../../ResultCard";
import BloodPressureCalculatorArticle from "./BloodPressureCalculatorArticle";

import { calculateBloodPressure } from "../../../lib/formulas";

export default function BloodPressureCalculator() {

  const [systolic, setSystolic] = useState("120");
  const [diastolic, setDiastolic] = useState("80");

  const result = useMemo(() => {

    return calculateBloodPressure(
      systolic,
      diastolic
    );

  }, [systolic, diastolic]);

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
          Blood Pressure Calculator
        </h1>

        <p className="text-sm leading-relaxed">
          Understand your blood pressure reading and identify whether it falls
          under normal, elevated, or high blood pressure categories.
        </p>
      </header>

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

      <div aria-live="polite">

        <ResultCard
          variant={result.variant}
          icon={<Activity size={20} />}
          label="Blood Pressure Result"
          value={`${result.reading} — ${result.category}`}
        />

      </div>

      <BloodPressureCalculatorArticle />

    </section>
  );
}