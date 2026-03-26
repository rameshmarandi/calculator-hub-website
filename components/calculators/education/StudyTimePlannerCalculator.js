"use client";

import { useState } from "react";
import { Clock } from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { ResultCard } from "../../ResultCard";

import { studyTimePlannerCalculator } from "../../../lib/formulas";

export default function StudyTimePlannerCalculator() {

  /* ---------------- PREFILLED VALUES ---------------- */
  const [totalSyllabusHours, setTotalSyllabusHours] = useState("300");
  const [daysAvailable, setDaysAvailable] = useState("90");
  const [dailyFreeHours, setDailyFreeHours] = useState("6");

  /* ---------------- SAFE INPUTS ---------------- */
  const safeSyllabus = Number(totalSyllabusHours) || 0;
  const safeDays = Number(daysAvailable) || 0;
  const safeFreeHours = Number(dailyFreeHours) || 0;

  /* ---------------- CALCULATION ---------------- */
  const result = studyTimePlannerCalculator({
    totalSyllabusHours: safeSyllabus,
    daysAvailable: safeDays,
    dailyFreeHours: safeFreeHours
  });

  return (
    <section
      className="rounded-xl p-6 space-y-10"
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)",
      }}
    >

      {/* HEADER */}
      <header>
        <h1 className="text-2xl font-bold mb-1">
          Study Time Planner Calculator
        </h1>

        <p className="text-sm leading-relaxed">
          Estimate how many hours you need to study daily to complete
          your syllabus within the available time.
        </p>
      </header>


      {/* INPUTS */}
      <div className="space-y-4">

        <AmountInput
          label="Total Syllabus Study Hours"
          value={totalSyllabusHours}
          onChange={setTotalSyllabusHours}
          prefix=""
          placeholder="300"
          min={1}
        />

        <AmountInput
          label="Days Available"
          value={daysAvailable}
          onChange={setDaysAvailable}
          prefix=""
          placeholder="90"
          min={1}
        />

        <AmountInput
          label="Daily Free Hours Available"
          value={dailyFreeHours}
          onChange={setDailyFreeHours}
          prefix=""
          placeholder="6"
          min={1}
        />

      </div>


      {/* RESULT */}
      <div aria-live="polite">
        <ResultCard
          variant={result.feasible ? "success" : "danger"}
          icon={<Clock size={20} />}
          label="Required Daily Study Time"
          value={`${result.dailyHours || 0} hours/day`}
        />
      </div>


      {/* SEO CONTENT */}
      <article className="space-y-4 text-sm leading-relaxed">

        <h2 className="font-semibold text-base">
          How Study Planning Works
        </h2>

        <p>
          A study planner distributes the total syllabus workload
          across the available preparation days. This helps maintain
          consistency and prevents last-minute exam stress.
        </p>

        <h3 className="font-semibold">
          Study Time Formula
        </h3>

        <p
          className="font-mono text-xs p-3 rounded"
          style={{ backgroundColor: "var(--surface-2)" }}
        >
          Daily Study Hours = Total Syllabus Hours ÷ Days Available
        </p>

      </article>


      <aside className="text-xs text-muted">
        ⚠️ Study schedules are estimates. Adjust for revision,
        practice tests, and rest days.
      </aside>

    </section>
  );
}