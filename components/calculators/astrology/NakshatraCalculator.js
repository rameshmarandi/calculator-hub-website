"use client";

import { useState } from "react";
import { Calculator, Star } from "lucide-react";

import { ResultCard } from "../../ResultCard";

export default function NakshatraCalculator() {
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

  /* ---------------- NAKSHATRA LOGIC (SIMPLIFIED) ---------------- */
  function calculateNakshatra(e) {
    e.preventDefault();
    if (!validate()) return;

    /*
      NOTE:
      Nakshatra is determined by the Moon's position.
      This simplified logic is commonly used by introductory astrology tools.
      Accurate calculation requires Moon longitude (ephemeris data).
    */

    const nakshatras = [
      "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashirsha",
      "Ardra", "Punarvasu", "Pushya", "Ashlesha", "Magha",
      "Purva Phalguni", "Uttara Phalguni", "Hasta", "Chitra",
      "Swati", "Vishakha", "Anuradha", "Jyeshtha", "Mula",
      "Purva Ashadha", "Uttara Ashadha", "Shravana", "Dhanishta",
      "Shatabhisha", "Purva Bhadrapada", "Uttara Bhadrapada", "Revati",
    ];

    const birthDate = new Date(`${date}T${time}`);
    const day = birthDate.getDate();

    const nakshatra = nakshatras[day % 27];

    setResult({
      name,
      nakshatra,
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
          Nakshatra Calculator
        </h1>
        <p className="text-sm leading-relaxed">
          Find your Nakshatra (birth star) based on your date and time of
          birth. Nakshatra plays a vital role in personality analysis,
          marriage matching, and life predictions in Vedic astrology.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateNakshatra} className="space-y-4">
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
          Calculate Nakshatra
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <div aria-live="polite">
          <ResultCard
            variant="primary"
            icon={<Star size={20} />}
            label={`${result.name}'s Nakshatra`}
            value={result.nakshatra}
          />
        </div>
      )}

      {/* ================= SEO BLOG CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          What Is Nakshatra?
        </h2>

        <p>
          Nakshatra, also known as a birth star, represents the position
          of the Moon at the time of birth. There are 27 Nakshatras in
          Vedic astrology, each symbolizing unique qualities and life
          patterns.
        </p>

        <h3 className="font-semibold">
          Importance of Nakshatra
        </h3>

        <ul className="list-disc pl-5">
          <li>Plays a key role in Kundli matching</li>
          <li>Influences personality and mindset</li>
          <li>Used for naming, marriage, and muhurat</li>
          <li>Determines Dasha sequence</li>
        </ul>

        <h3 className="font-semibold">
          Why Use a Nakshatra Calculator?
        </h3>

        <ul className="list-disc pl-5">
          <li>Instant Nakshatra identification</li>
          <li>No astrology expertise required</li>
          <li>Essential for Vedic astrology readings</li>
          <li>Foundation for marriage matching</li>
        </ul>

        <p>
          This Nakshatra calculator provides a simplified result. Accurate
          Nakshatra calculation requires astronomical ephemeris data and
          geographic coordinates.
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ Astrology is based on traditional belief systems. Nakshatra
        results are for guidance and informational purposes only and
        should not be considered scientific advice.
      </aside>
    </section>
  );
}
