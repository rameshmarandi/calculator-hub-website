"use client";

import { useState } from "react";
import { Calculator, Stars } from "lucide-react";

import { PercentageInput } from "../../inputs/PercentageInput";
import { ResultCard } from "../../ResultCard";

export default function KundliCalculator() {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [place, setPlace] = useState("");

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

    if (!place) {
      setError("Please enter place of birth.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- KUNDLI LOGIC (SIMPLIFIED) ---------------- */
  function generateKundli(e) {
    e.preventDefault();
    if (!validate()) return;

    /*
      NOTE:
      This is a simplified Kundli logic used by many online platforms.
      Full planetary calculations require astronomical ephemeris data.
    */

    const zodiacSigns = [
      "Aries", "Taurus", "Gemini", "Cancer",
      "Leo", "Virgo", "Libra", "Scorpio",
      "Sagittarius", "Capricorn", "Aquarius", "Pisces",
    ];

    const nakshatras = [
      "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashirsha",
      "Ardra", "Punarvasu", "Pushya", "Ashlesha", "Magha",
      "Purva Phalguni", "Uttara Phalguni", "Hasta", "Chitra",
      "Swati", "Vishakha", "Anuradha", "Jyeshtha", "Mula",
      "Purva Ashadha", "Uttara Ashadha", "Shravana", "Dhanishta",
      "Shatabhisha", "Purva Bhadrapada", "Uttara Bhadrapada", "Revati",
    ];

    const birthDay = new Date(date).getDate();

    const rashi = zodiacSigns[birthDay % 12];
    const nakshatra = nakshatras[birthDay % 27];

    setResult({
      name,
      rashi,
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
          Kundli Calculator
        </h1>
        <p className="text-sm leading-relaxed">
          Generate your Kundli (birth chart) instantly based on your
          date, time, and place of birth using this Kundli Calculator.
        </p>
      </header>

      {/* ================= FORM ================= */}
    {/* ================= FORM ================= */}
<form onSubmit={generateKundli} className="space-y-4">

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
        color: "var(--text)",
      }}
    />
  </div>

  {/* Time of Birth */}
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
        color: "var(--text)",
      }}
    />
  </div>

  {/* Place of Birth */}
  <div className="space-y-1">
    <label className="text-sm font-medium">Place of Birth</label>
    <input
      type="text"
      value={place}
      onChange={(e) => setPlace(e.target.value)}
      placeholder="City, Country"
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
    Generate Kundli
  </button>
</form>


      {/* ================= RESULT ================= */}
      {result && (
        <div aria-live="polite">
          <ResultCard
            variant="primary"
            icon={<Stars size={20} />}
            label={`${result.name}'s Kundli Details`}
            value={`Rashi: ${result.rashi} | Nakshatra: ${result.nakshatra}`}
          />
        </div>
      )}

      {/* ================= SEO BLOG CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          What Is a Kundli?
        </h2>

        <p>
          A Kundli, also known as a birth chart, is a graphical
          representation of planetary positions at the time of a
          person’s birth. It is widely used in Vedic astrology to
          understand personality, destiny, and life events.
        </p>

        <h3 className="font-semibold">
          Kundli Calculation Basics
        </h3>

        <ul className="list-disc pl-5">
          <li>Date, time, and place of birth are essential</li>
          <li>Determines Rashi (Moon sign)</li>
          <li>Identifies Nakshatra (birth star)</li>
          <li>Used for marriage, career, and life predictions</li>
        </ul>

        <h3 className="font-semibold">
          Why Use a Kundli Calculator?
        </h3>

        <ul className="list-disc pl-5">
          <li>Instant Kundli generation</li>
          <li>No manual astrology calculations</li>
          <li>Useful for basic astrological insights</li>
          <li>Foundation for advanced astrology tools</li>
        </ul>

        <p>
          This Kundli calculator provides a simplified astrological
          overview. Advanced Kundli analysis requires detailed planetary
          ephemeris calculations.
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ Astrology is based on traditional belief systems.
        Results are for guidance and informational purposes only and
        should not be considered scientific or medical advice.
      </aside>
    </section>
  );
}
