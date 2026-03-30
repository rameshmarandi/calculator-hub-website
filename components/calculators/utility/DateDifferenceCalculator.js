"use client";

import { useMemo, useState } from "react";
import { CalendarDays } from "lucide-react";

import { ResultCard } from "../../ResultCard";

export default function DateDifferenceCalculator() {
  /* ================= STATE ================= */

  // ✅ Prefilled values (critical)
  const [startDate, setStartDate] = useState("2020-01-01");
  const [endDate, setEndDate] = useState("2025-01-01");

  /* ================= INTERNAL FORMULA ================= */

  function calculateDateDifference({ startDate, endDate }) {
    const start = startDate ? new Date(startDate) : new Date();
    const end = endDate ? new Date(endDate) : new Date();

    // Defensive: invalid range
    if (start > end) {
      return {
        primary: 0,
        breakdown: { years: 0, months: 0, days: 0 },
        stats: { totalDays: 0 },
        meta: { error: "Invalid range" },
      };
    }

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
        0,
      ).getDate();
      days += prevMonthDays;
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    return {
      primary: totalDays,
      breakdown: { years, months, days },
      stats: { totalDays },
      meta: { unit: "days" },
    };
  }

  /* ================= DERIVED RESULT ================= */

  const result = useMemo(() => {
    return calculateDateDifference({ startDate, endDate });
  }, [startDate, endDate]);

  /* ================= UI ================= */

  return (
    <section
      className="rounded-xl p-6 space-y-10"
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)",
      }}>
      {/* ================= HEADER ================= */}
      <header>
        <h1 className="text-2xl font-bold mb-1">Date Difference Calculator</h1>
        <p className="text-sm leading-relaxed">
          Calculate the difference between two dates in years, months, and days.
        </p>
      </header>

      {/* ================= INPUTS ================= */}
      <div className="space-y-4">
        <div className="space-y-1">
          <label className="text-sm font-medium">Start Date</label>
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

        <div className="space-y-1">
          <label className="text-sm font-medium">End Date</label>
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
      </div>

      {/* ================= RESULT (ALWAYS VISIBLE) ================= */}
      <div aria-live="polite">
        <ResultCard
          variant="primary"
          icon={<CalendarDays size={20} />}
          label="Date Difference"
          value={`${result?.breakdown?.years || 0} Years, ${
            result?.breakdown?.months || 0
          } Months, ${result?.breakdown?.days || 0} Days (${result?.stats?.totalDays || 0} Days)`}
        />
      </div>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="p-3 rounded border">
          <p className="text-muted">Total Days</p>
          <p className="font-semibold">{result?.stats?.totalDays || 0}</p>
        </div>

        <div className="p-3 rounded border">
          <p className="text-muted">Years</p>
          <p className="font-semibold">{result?.breakdown?.years || 0}</p>
        </div>
      </div>

      {/* ================= SEO ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          What Is a Date Difference Calculator?
        </h2>

        <p>
          This tool calculates the exact difference between two dates, breaking
          it into years, months, and days.
        </p>

        <h3 className="font-semibold">How It Works</h3>

        <ul className="list-disc pl-5">
          <li>Computes total days between dates</li>
          <li>Adjusts months and days accurately</li>
          <li>Handles calendar variations</li>
        </ul>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        Results are for informational purposes only.
      </aside>
    </section>
  );
}
