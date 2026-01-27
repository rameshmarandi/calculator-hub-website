"use client";

import { useState } from "react";
import { Calculator, Palette } from "lucide-react";

import { ResultCard } from "../../ResultCard";

export default function LuckyColorCalculator() {
  const [name, setName] = useState("");
  const [luckyNumber, setLuckyNumber] = useState("");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    if (!name.trim()) {
      setError("Please enter your full name.");
      return false;
    }

    if (
      !luckyNumber ||
      isNaN(luckyNumber) ||
      Number(luckyNumber) < 1 ||
      Number(luckyNumber) > 9
    ) {
      setError("Please enter a valid lucky number (1–9).");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- LUCKY COLOR LOGIC ---------------- */
  function calculateLuckyColor(e) {
    e.preventDefault();
    if (!validate()) return;

    const colorMap = {
      1: "Red 🔴",
      2: "White ⚪",
      3: "Yellow 🟡",
      4: "Blue 🔵",
      5: "Green 🟢",
      6: "Pink 🌸",
      7: "Grey ⚫",
      8: "Dark Blue / Black ⚫",
      9: "Golden 🟠",
    };

    const luckyColor = colorMap[luckyNumber];

    setResult({
      name,
      luckyColor,
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
          Lucky Color Calculator
        </h1>
        <p className="text-sm leading-relaxed">
          Find your Lucky Color based on your lucky number using this
          Lucky Color Calculator. Lucky colors are believed to enhance
          positivity, confidence, and success in daily life.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateLuckyColor} className="space-y-4">
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

        {/* Lucky Number */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Your Lucky Number</label>
          <input
            type="number"
            value={luckyNumber}
            onChange={(e) => setLuckyNumber(e.target.value)}
            placeholder="Enter number (1–9)"
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
          Find Lucky Color
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <div aria-live="polite">
          <ResultCard
            variant="success"
            icon={<Palette size={20} />}
            label={`${result.name}'s Lucky Color`}
            value={result.luckyColor}
          />
        </div>
      )}

      {/* ================= SEO BLOG CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          What Is a Lucky Color?
        </h2>

        <p>
          A Lucky Color is derived from numerology and astrology principles.
          Each number is associated with a planet, and each planet governs
          specific colors that are believed to attract positive energy.
        </p>

        <h3 className="font-semibold">
          Lucky Color by Numerology Number
        </h3>

        <ul className="list-disc pl-5">
          <li>1 → Red (Sun)</li>
          <li>2 → White (Moon)</li>
          <li>3 → Yellow (Jupiter)</li>
          <li>4 → Blue (Rahu)</li>
          <li>5 → Green (Mercury)</li>
          <li>6 → Pink (Venus)</li>
          <li>7 → Grey (Ketu)</li>
          <li>8 → Dark Blue / Black (Saturn)</li>
          <li>9 → Golden (Mars)</li>
        </ul>

        <h3 className="font-semibold">
          Why Use a Lucky Color Calculator?
        </h3>

        <ul className="list-disc pl-5">
          <li>Choose favorable colors for important days</li>
          <li>Helpful for clothing, interviews, and events</li>
          <li>Widely used in astrology and numerology</li>
          <li>Fun, positive, and motivating tool</li>
        </ul>

        <p>
          Lucky colors are belief-based and symbolic. Their influence
          depends on personal belief and confidence.
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ Lucky Color calculations are based on traditional numerology
        and astrology belief systems. Results are for guidance and
        entertainment purposes only and should not be considered
        scientific facts.
      </aside>
    </section>
  );
}
