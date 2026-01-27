"use client";

import { useState } from "react";
import { Calculator, Orbit } from "lucide-react";

import { ResultCard } from "../../ResultCard";

export default function BirthChartCalculator() {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [place, setPlace] = useState("");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    if (!name) {
      setError("Please enter your full name.");
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
      setError("Please enter your place of birth.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- BIRTH CHART LOGIC (SIMPLIFIED) ---------------- */
  function generateBirthChart(e) {
    e.preventDefault();
    if (!validate()) return;

    const zodiacSigns = [
      "Aries", "Taurus", "Gemini", "Cancer",
      "Leo", "Virgo", "Libra", "Scorpio",
      "Sagittarius", "Capricorn", "Aquarius", "Pisces",
    ];

    const ascendants = [
      "Aries", "Taurus", "Gemini", "Cancer",
      "Leo", "Virgo", "Libra", "Scorpio",
      "Sagittarius", "Capricorn", "Aquarius", "Pisces",
    ];

    const birthDate = new Date(`${date}T${time}`);
    const ascIndex = birthDate.getHours() % 12;
    const sunIndex = birthDate.getMonth();

    setResult({
      name,
      sunSign: zodiacSigns[sunIndex],
      ascendant: ascendants[ascIndex],
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
          Birth Chart Calculator
        </h1>
        <p className="text-sm leading-relaxed">
          Generate your Birth Chart (Natal Chart) instantly using your
          date, time, and place of birth. This chart reveals your core
          personality, mindset, and life tendencies.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={generateBirthChart} className="space-y-4">
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

        {/* Place */}
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
          Generate Birth Chart
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <div aria-live="polite">
          <ResultCard
            variant="primary"
            icon={<Orbit size={20} />}
            label={`${result.name}'s Birth Chart`}
            value={`Sun Sign: ${result.sunSign} | Ascendant: ${result.ascendant}`}
          />
        </div>
      )}

      {/* ================= SEO BLOG CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          What Is a Birth Chart?
        </h2>

        <p>
          A Birth Chart, also known as a Natal Chart, is a snapshot of the
          sky at the exact moment you were born. It shows the positions
          of the Sun, Moon, and Ascendant, which together describe your
          personality and life direction.
        </p>

        <h3 className="font-semibold">
          Key Elements in a Birth Chart
        </h3>

        <ul className="list-disc pl-5">
          <li><strong>Sun Sign</strong> – Core personality and ego</li>
          <li><strong>Ascendant (Lagna)</strong> – How the world sees you</li>
          <li>Foundation for planet & house analysis</li>
        </ul>

        <h3 className="font-semibold">
          Why Use a Birth Chart Calculator?
        </h3>

        <ul className="list-disc pl-5">
          <li>Instant chart generation</li>
          <li>Understand personality traits</li>
          <li>Basis for career, love, and life readings</li>
          <li>No astrology expertise needed</li>
        </ul>

        <p>
          This birth chart calculator provides a simplified overview.
          Detailed birth charts require precise astronomical ephemeris data.
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ Astrology is based on traditional belief systems. Birth chart
        results are for guidance and informational purposes only and
        should not be considered scientific advice.
      </aside>
    </section>
  );
}
