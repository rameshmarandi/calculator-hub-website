"use client";

import { useState } from "react";
import { Calculator, Moon } from "lucide-react";

import { ResultCard } from "../../ResultCard";

export default function MoonSignCalculator() {
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

  /* ---------------- MOON SIGN LOGIC (SIMPLIFIED) ---------------- */
  function calculateMoonSign(e) {
    e.preventDefault();
    if (!validate()) return;

    /*
      NOTE:
      This is a simplified Moon Sign (Rashi) logic used by many
      introductory astrology tools. Accurate Moon longitude requires
      astronomical ephemeris data.
    */

    const moonSigns = [
      "Aries", "Taurus", "Gemini", "Cancer",
      "Leo", "Virgo", "Libra", "Scorpio",
      "Sagittarius", "Capricorn", "Aquarius", "Pisces",
    ];

    const birthDate = new Date(`${date}T${time}`);
    const day = birthDate.getDate();

    const moonSign = moonSigns[day % 12];

    setResult({
      name,
      moonSign,
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
          Moon Sign Calculator
        </h1>
        <p className="text-sm leading-relaxed">
          Find your Moon Sign (Rashi) based on your date and time of birth.
          The Moon Sign represents your emotions, mind, and inner personality
          in Vedic astrology.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateMoonSign} className="space-y-4">
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

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          className="w-full py-2.5 rounded-md font-medium flex items-center justify-center gap-2"
          style={{
            backgroundColor: "var(--primary)",
            color: "#fff",
          }}
        >
          <Calculator size={18} />
          Calculate Moon Sign
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <div aria-live="polite">
          <ResultCard
            variant="primary"
            icon={<Moon size={20} />}
            label={`${result.name}'s Moon Sign`}
            value={result.moonSign}
          />
        </div>
      )}

      {/* ================= SEO BLOG CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          What Is a Moon Sign?
        </h2>

        <p>
          Your Moon Sign, also known as Rashi in Vedic astrology, is
          determined by the position of the Moon at the time of your
          birth. It governs emotions, mental reactions, instincts,
          and inner feelings.
        </p>

        <h3 className="font-semibold">
          Moon Sign vs Sun Sign
        </h3>

        <ul className="list-disc pl-5">
          <li><strong>Moon Sign</strong> – Emotional nature and mind</li>
          <li><strong>Sun Sign</strong> – Ego and outer personality</li>
          <li>Moon Sign changes every ~2.5 days</li>
        </ul>

        <h3 className="font-semibold">
          Why Use a Moon Sign Calculator?
        </h3>

        <ul className="list-disc pl-5">
          <li>Understand emotional behavior</li>
          <li>Better relationship compatibility insights</li>
          <li>Used for Kundli, Dasha, and horoscope analysis</li>
          <li>More accurate than Sun Sign for daily predictions</li>
        </ul>

        <p>
          This Moon Sign calculator provides a simplified result.
          Accurate Moon Sign calculation requires astronomical ephemeris
          and geographic coordinates.
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ Astrology is based on traditional belief systems. Moon Sign
        results are for guidance and informational purposes only and
        should not be considered scientific advice.
      </aside>
    </section>
  );
}
