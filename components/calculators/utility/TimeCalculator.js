"use client";

import { useState } from "react";
import { Calculator, Clock } from "lucide-react";

import { ResultCard } from "../../ResultCard";

export default function TimeCalculator() {
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [addHours, setAddHours] = useState("");
  const [addMinutes, setAddMinutes] = useState("");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    if (
      hours === "" ||
      minutes === "" ||
      isNaN(hours) ||
      isNaN(minutes)
    ) {
      setError("Please enter a valid base time.");
      return false;
    }

    if (
      addHours === "" ||
      addMinutes === "" ||
      isNaN(addHours) ||
      isNaN(addMinutes)
    ) {
      setError("Please enter a valid time to add or subtract.");
      return false;
    }

    if (Number(minutes) < 0 || Number(minutes) > 59) {
      setError("Minutes must be between 0 and 59.");
      return false;
    }

    if (Number(addMinutes) < 0 || Number(addMinutes) > 59) {
      setError("Additional minutes must be between 0 and 59.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- TIME CALCULATION ---------------- */
  function calculateTime(e) {
    e.preventDefault();
    if (!validate()) return;

    const baseTotalMinutes =
      Number(hours) * 60 + Number(minutes);
    const addTotalMinutes =
      Number(addHours) * 60 + Number(addMinutes);

    const finalMinutes = baseTotalMinutes + addTotalMinutes;

    const resultHours = Math.floor(finalMinutes / 60);
    const resultMinutes = finalMinutes % 60;

    setResult({
      hours: resultHours,
      minutes: resultMinutes,
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
          Time Calculator
        </h1>
        <p className="text-sm leading-relaxed">
          Use this Time Calculator to add hours and minutes to a given
          time. It is useful for calculating work hours, schedules,
          durations, and time intervals.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateTime} className="space-y-4">
        {/* Base Time */}
        <div className="space-y-2">
          <p className="text-sm font-medium">Base Time</p>

          <div className="flex gap-3">
            <input
              type="number"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              placeholder="Hours"
              className="w-full px-3 py-2 rounded"
              style={{
                border: "1px solid var(--border)",
                backgroundColor: "var(--surface)",
              }}
            />

            <input
              type="number"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
              placeholder="Minutes"
              className="w-full px-3 py-2 rounded"
              style={{
                border: "1px solid var(--border)",
                backgroundColor: "var(--surface)",
              }}
            />
          </div>
        </div>

        {/* Add Time */}
        <div className="space-y-2">
          <p className="text-sm font-medium">Add Time</p>

          <div className="flex gap-3">
            <input
              type="number"
              value={addHours}
              onChange={(e) => setAddHours(e.target.value)}
              placeholder="Hours"
              className="w-full px-3 py-2 rounded"
              style={{
                border: "1px solid var(--border)",
                backgroundColor: "var(--surface)",
              }}
            />

            <input
              type="number"
              value={addMinutes}
              onChange={(e) => setAddMinutes(e.target.value)}
              placeholder="Minutes"
              className="w-full px-3 py-2 rounded"
              style={{
                border: "1px solid var(--border)",
                backgroundColor: "var(--surface)",
              }}
            />
          </div>
        </div>

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
          Calculate Time
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <div aria-live="polite">
          <ResultCard
            variant="primary"
            icon={<Clock size={20} />}
            label="Final Time"
            value={`${result.hours} Hours ${result.minutes} Minutes`}
          />
        </div>
      )}

      {/* ================= SEO BLOG CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          What Is a Time Calculator?
        </h2>

        <p>
          A Time Calculator helps you add or calculate time in hours and
          minutes. It is widely used for work schedules, travel planning,
          shift timing, and project duration calculations.
        </p>

        <h3 className="font-semibold">
          How Time Calculation Works
        </h3>

        <ul className="list-disc pl-5">
          <li>Converts hours into minutes</li>
          <li>Adds total minutes accurately</li>
          <li>Converts the result back into hours and minutes</li>
        </ul>

        <h3 className="font-semibold">
          Why Use a Time Calculator?
        </h3>

        <ul className="list-disc pl-5">
          <li>Fast and accurate time addition</li>
          <li>Eliminates manual errors</li>
          <li>Useful for work and personal planning</li>
          <li>Works with any valid time values</li>
        </ul>

        <p>
          This time calculator is designed for everyday use and provides
          reliable results instantly.
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ Time calculations are performed using standard arithmetic
        rules. Results are for informational purposes only.
      </aside>
    </section>
  );
}
