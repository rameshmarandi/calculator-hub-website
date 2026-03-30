"use client";

import { useMemo, useState } from "react";
import { Calendar } from "lucide-react";

import { ResultCard } from "../../ResultCard";

export default function AgeCalculator() {
  /* ================= STATE ================= */

  // ✅ Prefilled (critical for UX + SEO)
  const [dob, setDob] = useState("2000-01-01");

  /* ================= INTERNAL FORMULA ================= */
  // ✅ Logic isolated inside function (not inside JSX)
  function calculateAge({ dob }) {
    const birthDate = dob ? new Date(dob) : new Date();
    const today = new Date();

    if (birthDate > today) {
      return {
        primary: 0,
        breakdown: { years: 0, months: 0, days: 0 },
        stats: {},
        meta: { error: "Future date" },
      };
    }

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      const prevMonthDays = new Date(
        today.getFullYear(),
        today.getMonth(),
        0,
      ).getDate();
      days += prevMonthDays;
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    const totalDays = Math.floor((today - birthDate) / (1000 * 60 * 60 * 24));

    return {
      primary: years,
      breakdown: { years, months, days },
      stats: {
        totalMonths: years * 12 + months,
        totalDays,
      },
      meta: { unit: "years" },
    };
  }

  /* ================= DERIVED RESULT ================= */
  // ✅ Always computed, no button needed
  const result = useMemo(() => {
    return calculateAge({ dob });
  }, [dob]);

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
        <h1 className="text-2xl font-bold mb-1">Age Calculator</h1>
        <p className="text-sm leading-relaxed">
          Calculate your exact age in years, months, and days instantly.
        </p>
      </header>

      {/* ================= INPUT ================= */}
      <div className="space-y-1">
        <label className="text-sm font-medium">Date of Birth</label>

        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className="w-full px-3 py-2 rounded"
          style={{
            border: "1px solid var(--border)",
            backgroundColor: "var(--surface)",
          }}
        />
      </div>

      {/* ================= RESULT (ALWAYS VISIBLE) ================= */}
      <div aria-live="polite">
        <ResultCard
          variant="primary"
          icon={<Calendar size={20} />}
          label="Your Exact Age"
          value={`${result?.breakdown?.years || 0} Years, ${
            result?.breakdown?.months || 0
          } Months, ${result?.breakdown?.days || 0} Days`}
        />
      </div>

      {/* ================= EXTRA STATS ================= */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="p-3 rounded border">
          <p className="text-muted">Total Months</p>
          <p className="font-semibold">{result?.stats?.totalMonths || 0}</p>
        </div>

        <div className="p-3 rounded border">
          <p className="text-muted">Total Days</p>
          <p className="font-semibold">{result?.stats?.totalDays || 0}</p>
        </div>
      </div>

      {/* ================= SEO CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">What Is an Age Calculator?</h2>

        <p>
          An age calculator determines your exact age based on your date of
          birth. It calculates years, months, and days accurately using calendar
          differences.
        </p>

        <h3 className="font-semibold">How It Works</h3>

        <ul className="list-disc pl-5">
          <li>Compares current date with birth date</li>
          <li>Adjusts months and days dynamically</li>
          <li>Handles varying month lengths</li>
        </ul>

        <h3 className="font-semibold">Use Cases</h3>

        <ul className="list-disc pl-5">
          <li>Government forms</li>
          <li>Job eligibility</li>
          <li>Personal tracking</li>
        </ul>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        Results are based on system date and are for informational use only.
      </aside>
    </section>
  );
}
