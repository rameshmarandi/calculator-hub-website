"use client";

import { useState } from "react";
import { Calculator, Route } from "lucide-react";

import { ResultCard } from "../../ResultCard";

export default function LifePathNumberCalculator() {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    if (!name.trim()) {
      setError("Please enter your full name.");
      return false;
    }

    if (!date) {
      setError("Please select your date of birth.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- LIFE PATH LOGIC ---------------- */
  function calculateLifePath(e) {
    e.preventDefault();
    if (!validate()) return;

    const dobDigits = date
      .replaceAll("-", "")
      .split("")
      .map(Number);

    function reduceToSingleDigit(num) {
      while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
        num = num
          .toString()
          .split("")
          .reduce((sum, d) => sum + Number(d), 0);
      }
      return num;
    }

    const total = dobDigits.reduce((sum, d) => sum + d, 0);
    const lifePathNumber = reduceToSingleDigit(total);

    setResult({
      name,
      lifePathNumber,
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
          Life Path Number Calculator
        </h1>
        <p className="text-sm leading-relaxed">
          Find your Life Path Number using your date of birth. The Life
          Path Number reveals your purpose, strengths, challenges, and
          the direction of your life journey according to numerology.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateLifePath} className="space-y-4">
        {/* Name */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Full Name"
            className="w-full px-3 py-2 rounded"
            style={{
              border: "1px solid var(--border)",
              backgroundColor: "var(--surface)",
              color: "var(--text)",
            }}
          />
        </div>

        {/* Date of Birth */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Date of Birth</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
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
          Calculate Life Path Number
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <div aria-live="polite">
          <ResultCard
            variant="primary"
            icon={<Route size={20} />}
            label={`${result.name}'s Life Path Number`}
            value={result.lifePathNumber}
          />
        </div>
      )}

      {/* ================= SEO BLOG CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          What Is a Life Path Number?
        </h2>

        <p>
          The Life Path Number is one of the most important numbers in
          numerology. It is calculated using your full date of birth and
          represents your life purpose, core personality traits, and the
          lessons you are meant to learn in this lifetime.
        </p>

        <h3 className="font-semibold">
          Life Path Number Calculation Formula
        </h3>

        <p
          className="font-mono text-xs p-3 rounded"
          style={{ backgroundColor: "var(--surface-2)" }}
        >
          Life Path Number = Sum of all digits in Date of Birth → Reduced
          to a single digit (except 11, 22, 33)
        </p>

        <ul className="list-disc pl-5">
          <li>Based purely on date of birth</li>
          <li>Master numbers (11, 22, 33) are not reduced</li>
          <li>Represents destiny and life direction</li>
        </ul>

        <h3 className="font-semibold">
          Why Use a Life Path Number Calculator?
        </h3>

        <ul className="list-disc pl-5">
          <li>Discover your life purpose</li>
          <li>Understand strengths and challenges</li>
          <li>Helpful for career and relationship insights</li>
          <li>Foundation of numerology analysis</li>
        </ul>

        <p>
          This Life Path Number calculator provides a basic numerology
          interpretation. Advanced numerology includes additional core
          numbers and charts.
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ Numerology is based on traditional belief systems. Life Path
        Number results are for guidance and informational purposes only
        and should not be considered scientific advice.
      </aside>
    </section>
  );
}
