"use client";

import { useState } from "react";
import { Calculator, Heart } from "lucide-react";

import { ResultCard } from "../../ResultCard";

export default function NameCompatibilityCalculator() {
  const [nameOne, setNameOne] = useState("");
  const [nameTwo, setNameTwo] = useState("");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    if (!nameOne.trim()) {
      setError("Please enter the first name.");
      return false;
    }

    if (!nameTwo.trim()) {
      setError("Please enter the second name.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- COMPATIBILITY LOGIC ---------------- */
  function calculateCompatibility(e) {
    e.preventDefault();
    if (!validate()) return;

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

    function getNameNumber(name) {
      let sum = 0;
      name
        .toUpperCase()
        .replace(/[^A-Z]/g, "")
        .split("")
        .forEach((char) => {
          sum += letterValues[char] || 0;
        });

      while (sum > 9 && sum !== 11 && sum !== 22) {
        sum = sum
          .toString()
          .split("")
          .reduce((a, b) => a + Number(b), 0);
      }
      return sum;
    }

    const numberOne = getNameNumber(nameOne);
    const numberTwo = getNameNumber(nameTwo);

    // Compatibility Score Logic
    const diff = Math.abs(numberOne - numberTwo);
    const compatibilityScore = Math.max(
      50,
      100 - diff * 10
    );

    let compatibilityLevel = "Average Compatibility";
    if (compatibilityScore >= 80) compatibilityLevel = "Excellent Compatibility ❤️";
    else if (compatibilityScore >= 65) compatibilityLevel = "Good Compatibility 😊";

    setResult({
      numberOne,
      numberTwo,
      score: compatibilityScore,
      level: compatibilityLevel,
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
          Name Compatibility Calculator
        </h1>
        <p className="text-sm leading-relaxed">
          Check name compatibility using numerology. This Name Compatibility
          Calculator analyzes the vibration of two names to estimate
          relationship harmony and bonding potential.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateCompatibility} className="space-y-4">
        {/* Name One */}
        <div className="space-y-1">
          <label className="text-sm font-medium">First Name</label>
          <input
            type="text"
            value={nameOne}
            onChange={(e) => setNameOne(e.target.value)}
            placeholder="Enter first name"
            className="w-full px-3 py-2 rounded"
            style={{
              border: "1px solid var(--border)",
              backgroundColor: "var(--surface)",
              color: "var(--text)",
            }}
          />
        </div>

        {/* Name Two */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Second Name</label>
          <input
            type="text"
            value={nameTwo}
            onChange={(e) => setNameTwo(e.target.value)}
            placeholder="Enter second name"
            className="w-full px-3 py-2 rounded"
            style={{
              border: "1px solid var(--border)",
              backgroundColor: "var(--surface)",
              color: "var(--text)",
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
          Check Compatibility
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <div aria-live="polite">
          <ResultCard
            variant="primary"
            icon={<Heart size={20} />}
            label={`Compatibility Score`}
            value={`${result.score}% – ${result.level}`}
          />
        </div>
      )}

      {/* ================= SEO BLOG CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          How Name Compatibility Works in Numerology
        </h2>

        <p>
          In numerology, each letter carries a numerical vibration.
          When two names are analyzed together, their combined vibrations
          indicate how well the individuals may connect emotionally,
          mentally, and spiritually.
        </p>

        <h3 className="font-semibold">
          Name Compatibility Calculation Method
        </h3>

        <ul className="list-disc pl-5">
          <li>Letters are converted into numerology numbers</li>
          <li>Each name gets a core vibration number</li>
          <li>Compatibility is calculated based on number harmony</li>
          <li>Lower number difference means higher compatibility</li>
        </ul>

        <h3 className="font-semibold">
          Why Use a Name Compatibility Calculator?
        </h3>

        <ul className="list-disc pl-5">
          <li>Quick relationship insight</li>
          <li>Popular for love and marriage checks</li>
          <li>Fun and meaningful numerology analysis</li>
          <li>Foundation for marriage matching tools</li>
        </ul>

        <p>
          This calculator provides a general compatibility estimate.
          True relationships depend on understanding, trust, and effort.
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ Numerology-based compatibility is rooted in traditional belief
        systems. Results are for guidance and entertainment purposes only
        and should not be considered factual or scientific.
      </aside>
    </section>
  );
}
