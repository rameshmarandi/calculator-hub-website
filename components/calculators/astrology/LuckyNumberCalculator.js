"use client";

import { useState } from "react";
import { Calculator, Clover } from "lucide-react";

import { ResultCard } from "../../ResultCard";

export default function LuckyNumberCalculator() {
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

  /* ---------------- LUCKY NUMBER LOGIC ---------------- */
  function calculateLuckyNumber(e) {
    e.preventDefault();
    if (!validate()) return;

    // Lucky Number based on DOB (Numerology method)
    const digits = date
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

    const total = digits.reduce((sum, d) => sum + d, 0);
    const luckyNumber = reduceToSingleDigit(total);

    setResult({
      name,
      luckyNumber,
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
          Lucky Number Calculator
        </h1>
        <p className="text-sm leading-relaxed">
          Find your Lucky Number based on your date of birth using this
          Lucky Number Calculator. Lucky numbers are believed to bring
          positivity, success, and favorable opportunities.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateLuckyNumber} className="space-y-4">
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
          Find Lucky Number
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <div aria-live="polite">
          <ResultCard
            variant="success"
            icon={<Clover size={20} />}
            label={`${result.name}'s Lucky Number`}
            value={result.luckyNumber}
          />
        </div>
      )}

      {/* ================= SEO BLOG CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          What Is a Lucky Number?
        </h2>

        <p>
          A Lucky Number is derived from numerology using your date of
          birth. It represents positive vibrations and is believed to
          influence success, confidence, and favorable outcomes in life.
        </p>

        <h3 className="font-semibold">
          How Lucky Numbers Are Calculated
        </h3>

        <ul className="list-disc pl-5">
          <li>All digits of date of birth are added</li>
          <li>The sum is reduced to a single digit</li>
          <li>Master numbers like 11, 22, and 33 are preserved</li>
        </ul>

        <h3 className="font-semibold">
          Why Use a Lucky Number Calculator?
        </h3>

        <ul className="list-disc pl-5">
          <li>Discover your favorable number</li>
          <li>Used for important decisions and dates</li>
          <li>Popular in numerology and astrology</li>
          <li>Fun and insightful tool</li>
        </ul>

        <p>
          Lucky numbers are symbolic and belief-based. Their influence
          depends on personal faith and mindset.
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ Lucky Number calculations are based on traditional numerology
        belief systems. Results are for guidance and entertainment
        purposes only and should not be considered scientific facts.
      </aside>
    </section>
  );
}
