"use client";

import { useState } from "react";
import { Calculator, CalendarDays } from "lucide-react";

import { ResultCard } from "../../ResultCard";

export default function DateDifferenceCalculator() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    if (!startDate || !endDate) {
      setError("Please select both start date and end date.");
      return false;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start > end) {
      setError("Start date cannot be after end date.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- DATE DIFFERENCE LOGIC ---------------- */
  function calculateDifference(e) {
    e.preventDefault();
    if (!validate()) return;

    const start = new Date(startDate);
    const end = new Date(endDate);

    const diffTime = end.getTime() - start.getTime();
    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();

    if (days < 0) {
      months--;
      const prevMonthDays = new Date(
        end.getFullYear(),
        end.getMonth(),
        0
      ).getDate();
      days += prevMonthDays;
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    setResult({
      years,
      months,
      days,
      totalDays,
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
          Date Difference Calculator
        </h1>
        <p className="text-sm leading-relaxed">
          Calculate the difference between two dates in years, months,
          days, and total days using this Date Difference Calculator.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateDifference} className="space-y-4">
        {/* Start Date */}
        <div className="space-y-1">
          <label className="text-sm font-medium">
            Start Date
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full px-3 py-2 rounded"
            style={{
              border: "1px solid var(--border)",
              backgroundColor: "var(--surface)",
            }}
          />
        </div>

        {/* End Date */}
        <div className="space-y-1">
          <label className="text-sm font-medium">
            End Date
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full px-3 py-2 rounded"
            style={{
              border: "1px solid var(--border)",
              backgroundColor: "var(--surface)",
            }}
          />
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
          Calculate Difference
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <div aria-live="polite">
          <ResultCard
            variant="primary"
            icon={<CalendarDays size={20} />}
            label="Date Difference"
            value={`${result.years} Years, ${result.months} Months, ${result.days} Days (${result.totalDays} Days Total)`}
          />
        </div>
      )}

      {/* ================= SEO BLOG CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          What Is a Date Difference Calculator?
        </h2>

        <p>
          A Date Difference Calculator helps you find the exact time gap
          between two dates. It is commonly used for calculating age gaps,
          project durations, work experience, and time intervals.
        </p>

        <h3 className="font-semibold">
          How Date Difference Is Calculated
        </h3>

        <ul className="list-disc pl-5">
          <li>Counts total number of days between two dates</li>
          <li>Breaks the difference into years, months, and days</li>
          <li>Adjusts for varying month lengths and leap years</li>
        </ul>

        <h3 className="font-semibold">
          Why Use a Date Difference Calculator?
        </h3>

        <ul className="list-disc pl-5">
          <li>Instant and accurate results</li>
          <li>Useful for official and personal purposes</li>
          <li>Eliminates manual calculation errors</li>
          <li>Works for past and future dates</li>
        </ul>

        <p>
          This calculator ensures precise date difference calculations
          and is suitable for everyday use.
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ Date difference results are calculated using standard calendar
        rules and are provided for informational purposes only.
      </aside>
    </section>
  );
}
