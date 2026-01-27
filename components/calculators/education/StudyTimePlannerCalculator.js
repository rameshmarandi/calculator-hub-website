"use client";

import { useState } from "react";
import { Calculator, Clock } from "lucide-react";

import { PercentageInput } from "../../inputs/PercentageInput";
import { ResultCard } from "../../ResultCard";

export default function StudyTimePlannerCalculator() {
  const [totalSyllabusHours, setTotalSyllabusHours] = useState("");
  const [daysAvailable, setDaysAvailable] = useState("");
  const [dailyFreeHours, setDailyFreeHours] = useState("");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    if (!totalSyllabusHours || isNaN(totalSyllabusHours) || Number(totalSyllabusHours) <= 0) {
      setError("Please enter valid total syllabus hours.");
      return false;
    }

    if (!daysAvailable || isNaN(daysAvailable) || Number(daysAvailable) <= 0) {
      setError("Please enter valid number of days.");
      return false;
    }

    if (!dailyFreeHours || isNaN(dailyFreeHours) || Number(dailyFreeHours) <= 0) {
      setError("Please enter valid daily free hours.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- CALCULATION ---------------- */
  function calculateStudyPlan(e) {
    e.preventDefault();
    if (!validate()) return;

    const syllabus = Number(totalSyllabusHours);
    const days = Number(daysAvailable);
    const freeHours = Number(dailyFreeHours);

    const requiredDailyHours = syllabus / days;
    const feasible = requiredDailyHours <= freeHours;

    setResult({
      dailyHours: requiredDailyHours.toFixed(2),
      feasible,
    });
  }

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
          Study Time Planner Calculator
        </h1>
        <p className="text-sm leading-relaxed">
          Plan your daily study time efficiently using this Study Time
          Planner Calculator. Find out how many hours you need to study
          each day to complete your syllabus on time.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateStudyPlan} className="space-y-4">
        <PercentageInput
          label="Total Syllabus Study Hours"
          value={totalSyllabusHours}
          onChange={setTotalSyllabusHours}
          placeholder="300"
        />

        <PercentageInput
          label="Days Available"
          value={daysAvailable}
          onChange={setDaysAvailable}
          placeholder="90"
        />

        <PercentageInput
          label="Daily Free Hours Available"
          value={dailyFreeHours}
          onChange={setDailyFreeHours}
          placeholder="6"
        />

        {error && (
          <p className="text-sm text-red-500">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full py-2.5 rounded-md font-medium flex items-center justify-center gap-2"
          style={{
            backgroundColor: "var(--primary)",
            color: "#fff",
          }}
        >
          <Calculator size={18} />
          Plan Study Time
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <div aria-live="polite">
          <ResultCard
            variant={result.feasible ? "success" : "danger"}
            icon={<Clock size={20} />}
            label="Required Daily Study Time"
            value={`${result.dailyHours} hours/day`}
          />
        </div>
      )}

      {/* ================= SEO BLOG CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          How a Study Time Planner Works
        </h2>

        <p>
          A study time planner helps students distribute their syllabus
          workload evenly across the available days. This prevents
          last-minute cramming and improves long-term retention.
        </p>

        <h3 className="font-semibold">
          Study Time Calculation Formula
        </h3>

        <p
          className="font-mono text-xs p-3 rounded"
          style={{ backgroundColor: "var(--surface-2)" }}
        >
          Daily Study Hours = Total Syllabus Hours ÷ Days Available
        </p>

        <ul className="list-disc pl-5">
          <li>Helps set realistic daily study goals</li>
          <li>Balances study with rest and revision</li>
          <li>Improves consistency and discipline</li>
        </ul>

        <h3 className="font-semibold">
          Why Use a Study Time Planner Calculator?
        </h3>

        <ul className="list-disc pl-5">
          <li>Avoids last-minute exam stress</li>
          <li>Improves time management</li>
          <li>Helps plan long-term preparation</li>
          <li>Useful for board, competitive, and entrance exams</li>
        </ul>

        <p>
          This calculator provides a practical daily study estimate.
          Adjust your plan based on breaks, revision days, and mock tests.
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ Study plans are estimates. Actual productivity depends on
        focus, study quality, and consistency. Adjust your schedule as
        needed.
      </aside>
    </section>
  );
}
