"use client";

import { useState } from "react";
import { Calculator, Calendar } from "lucide-react";

import { ResultCard } from "../../ResultCard";

export default function AgeCalculator() {
  const [dob, setDob] = useState("");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    if (!dob) {
      setError("Please select your date of birth.");
      return false;
    }

    const birthDate = new Date(dob);
    const today = new Date();

    if (birthDate > today) {
      setError("Date of birth cannot be in the future.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- AGE CALCULATION ---------------- */
  function calculateAge(e) {
    e.preventDefault();
    if (!validate()) return;

    const birthDate = new Date(dob);
    const today = new Date();

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      const prevMonthDays = new Date(
        today.getFullYear(),
        today.getMonth(),
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
          Age Calculator
        </h1>
        <p className="text-sm leading-relaxed">
          Calculate your exact age in years, months, and days using this
          Age Calculator. It helps you quickly find how old you are based
          on your date of birth.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateAge} className="space-y-4">
        {/* Date of Birth */}
        <div className="space-y-1">
          <label className="text-sm font-medium">
            Date of Birth
          </label>
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
          Calculate Age
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <div aria-live="polite">
          <ResultCard
            variant="primary"
            icon={<Calendar size={20} />}
            label="Your Exact Age"
            value={`${result.years} Years, ${result.months} Months, ${result.days} Days`}
          />
        </div>
      )}

      {/* ================= SEO BLOG CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          What Is an Age Calculator?
        </h2>

        <p>
          An age calculator is a simple online tool that calculates a
          person’s exact age based on their date of birth. It shows age
          in years, months, and days, which is useful for both personal
          and official purposes.
        </p>

        <h3 className="font-semibold">
          How Age Is Calculated
        </h3>

        <ul className="list-disc pl-5">
          <li>Calculates the difference between today’s date and birth date</li>
          <li>Adjusts months and days accurately</li>
          <li>Accounts for varying month lengths</li>
        </ul>

        <h3 className="font-semibold">
          Why Use an Age Calculator?
        </h3>

        <ul className="list-disc pl-5">
          <li>Find exact age instantly</li>
          <li>Useful for exams, jobs, and forms</li>
          <li>Eliminates manual calculation errors</li>
          <li>Works for any valid date of birth</li>
        </ul>

        <p>
          This age calculator gives precise results and is suitable for
          everyday use as well as official reference.
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ This age calculator provides results based on the selected
        date of birth and the current system date. Results are for
        informational purposes only.
      </aside>
    </section>
  );
}
