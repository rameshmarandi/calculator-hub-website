"use client";

import { useState } from "react";
import { Calculator, Hash } from "lucide-react";

import { ResultCard } from "../../ResultCard";

export default function NumerologyCalculator() {
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

  /* ---------------- NUMEROLOGY LOGIC ---------------- */
  function calculateNumerology(e) {
    e.preventDefault();
    if (!validate()) return;

    // Name Numerology (Expression/Destiny Number)
    const letterValues = {
      A: 1, J: 1, S: 1,
      B: 2, K: 2, T: 2,
      C: 3, L: 3, U: 3,
      D: 4, M: 4, V: 4,
      E: 5, N: 5, W: 5,
      F: 6, O: 6, X: 6,
      G: 7, P: 7, Y: 7,
      H: 8, Q: 8, Z: 8,
      I: 9, R: 9,
    };

    let nameSum = 0;
    name
      .toUpperCase()
      .replace(/[^A-Z]/g, "")
      .split("")
      .forEach((char) => {
        nameSum += letterValues[char] || 0;
      });

    function reduceToSingleDigit(num) {
      while (num > 9 && num !== 11 && num !== 22) {
        num = num
          .toString()
          .split("")
          .reduce((sum, d) => sum + Number(d), 0);
      }
      return num;
    }

    const destinyNumber = reduceToSingleDigit(nameSum);

    setResult({
      name,
      destinyNumber,
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
          Numerology Calculator
        </h1>
        <p className="text-sm leading-relaxed">
          Discover your Numerology number based on your name and birth
          details. Numerology helps reveal personality traits, strengths,
          and life direction through numbers.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateNumerology} className="space-y-4">
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

        {/* DOB */}
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
          Calculate Numerology
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <div aria-live="polite">
          <ResultCard
            variant="primary"
            icon={<Hash size={20} />}
            label={`${result.name}'s Numerology Number`}
            value={result.destinyNumber}
          />
        </div>
      )}

      {/* ================= SEO BLOG CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          What Is Numerology?
        </h2>

        <p>
          Numerology is the study of numbers and their influence on human
          life. Each number carries a unique vibration that affects
          personality, behavior, and destiny.
        </p>

        <h3 className="font-semibold">
          Numerology Number Calculation
        </h3>

        <ul className="list-disc pl-5">
          <li>Letters in your name are converted into numbers</li>
          <li>Numbers are added and reduced to a single digit</li>
          <li>Master numbers like 11 and 22 are preserved</li>
        </ul>

        <h3 className="font-semibold">
          Why Use a Numerology Calculator?
        </h3>

        <ul className="list-disc pl-5">
          <li>Understand personality traits</li>
          <li>Identify strengths and challenges</li>
          <li>Useful for naming, career, and life planning</li>
          <li>Foundation for compatibility analysis</li>
        </ul>

        <p>
          This numerology calculator provides a basic interpretation.
          Advanced numerology may involve additional numbers and charts.
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ Numerology is based on traditional belief systems. Results are
        for guidance and informational purposes only and should not be
        considered scientific advice.
      </aside>
    </section>
  );
}
