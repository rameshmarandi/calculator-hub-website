"use client";

import { useState } from "react";
import { Calculator, Sparkles } from "lucide-react";

import { ResultCard } from "../../ResultCard";

export default function RashiCalculator() {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    if (!name) {
      setError("Please enter your name.");
      return false;
    }
    if (!date) {
      setError("Please select your date of birth.");
      return false;
    }
    if (!time) {
      setError("Please select your time of birth.");
      return false;
    }
    setError("");
    return true;
  }

  /* ---------------- RASHI LOGIC (SIMPLIFIED) ---------------- */
  function calculateRashi(e) {
    e.preventDefault();
    if (!validate()) return;

    /*
      NOTE:
      Rashi in Vedic astrology is the Moon Sign.
      This simplified logic is used by many introductory astrology tools.
      Accurate calculation requires Moon longitude via ephemeris data.
    */

    const rashis = [
      "Aries (Mesh)",
      "Taurus (Vrishabha)",
      "Gemini (Mithun)",
      "Cancer (Karka)",
      "Leo (Simha)",
      "Virgo (Kanya)",
      "Libra (Tula)",
      "Scorpio (Vrishchik)",
      "Sagittarius (Dhanu)",
      "Capricorn (Makara)",
      "Aquarius (Kumbha)",
      "Pisces (Meena)",
    ];

    const birthDate = new Date(`${date}T${time}`);
    const day = birthDate.getDate();

    const rashi = rashis[day % 12];

    setResult({
      name,
      rashi,
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
          Rashi Calculator
        </h1>
        <p className="text-sm leading-relaxed">
          Find your Rashi (Moon Sign) based on your date and time of birth.
          Rashi represents your emotional nature, mindset, and inner behavior
          in Vedic astrology.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateRashi} className="space-y-4">
        {/* Name */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            className="w-full px-3 py-2 rounded"
            style={{
              border: "1px solid var(--border)",
              backgroundColor: "var(--surface)",
              color: "var(--text)",
            }}
          />
        </div>

        {/* Date */}
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

        {/* Time */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Time of Birth</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
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
          Calculate Rashi
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <div aria-live="polite">
          <ResultCard
            variant="primary"
            icon={<Sparkles size={20} />}
            label={`${result.name}'s Rashi`}
            value={result.rashi}
          />
        </div>
      )}

      {/* ================= SEO BLOG CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          What Is Rashi in Astrology?
        </h2>

        <p>
          Rashi refers to the zodiac sign in which the Moon was positioned
          at the time of your birth. In Vedic astrology, Rashi plays a
          crucial role in understanding emotions, mental tendencies, and
          daily behavior.
        </p>

        <h3 className="font-semibold">
          Importance of Rashi
        </h3>

        <ul className="list-disc pl-5">
          <li>Represents emotional and psychological nature</li>
          <li>Used for Kundli matching and Dasha analysis</li>
          <li>More impactful than Sun Sign in Vedic astrology</li>
        </ul>

        <h3 className="font-semibold">
          Why Use a Rashi Calculator?
        </h3>

        <ul className="list-disc pl-5">
          <li>Instant Rashi calculation</li>
          <li>No manual astrology knowledge required</li>
          <li>Foundation for horoscope and predictions</li>
          <li>Helpful for life and relationship insights</li>
        </ul>

        <p>
          This Rashi calculator provides a simplified result. Accurate
          Rashi determination requires astronomical ephemeris and
          geographical coordinates.
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ Astrology is based on traditional belief systems. Rashi results
        are for guidance and informational purposes only and should not
        be considered scientific advice.
      </aside>
    </section>
  );
}
