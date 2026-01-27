"use client";

import { useState } from "react";
import { Calculator, Sun } from "lucide-react";

import { ResultCard } from "../../ResultCard";

export default function HoroscopeCalculator() {
  const [name, setName] = useState("");
  const [rashi, setRashi] = useState("");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

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

  const horoscopeMessages = {
    "Aries (Mesh)": "Today is favorable for taking initiative. Avoid impulsive decisions.",
    "Taurus (Vrishabha)": "Focus on stability and finances. Patience will bring rewards.",
    "Gemini (Mithun)": "Communication is your strength today. New ideas may emerge.",
    "Cancer (Karka)": "Emotional balance is important. Spend time with family.",
    "Leo (Simha)": "Leadership opportunities may arise. Stay humble and confident.",
    "Virgo (Kanya)": "Good day for planning and organizing. Health needs attention.",
    "Libra (Tula)": "Harmony in relationships improves. Avoid unnecessary arguments.",
    "Scorpio (Vrishchik)": "Trust your intuition. Transformation is on the horizon.",
    "Sagittarius (Dhanu)": "Travel or learning opportunities may appear. Stay optimistic.",
    "Capricorn (Makara)": "Hard work pays off. Focus on long-term goals.",
    "Aquarius (Kumbha)": "Innovative ideas bring progress. Be open to change.",
    "Pisces (Meena)": "Creativity and spirituality are highlighted today.",
  };

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    if (!name.trim()) {
      setError("Please enter your name.");
      return false;
    }

    if (!rashi) {
      setError("Please select your Rashi.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- HOROSCOPE LOGIC ---------------- */
  function generateHoroscope(e) {
    e.preventDefault();
    if (!validate()) return;

    const message = horoscopeMessages[rashi];

    setResult({
      name,
      rashi,
      message,
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
          Horoscope Calculator
        </h1>
        <p className="text-sm leading-relaxed">
          Get your daily horoscope based on your Rashi (Moon Sign).
          This Horoscope Calculator provides quick insights into your
          day related to career, relationships, and personal growth.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={generateHoroscope} className="space-y-4">
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
            }}
          />
        </div>

        {/* Rashi */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Your Rashi (Moon Sign)</label>
          <select
            value={rashi}
            onChange={(e) => setRashi(e.target.value)}
            className="w-full px-3 py-2 rounded"
            style={{
              border: "1px solid var(--border)",
              backgroundColor: "var(--surface)",
            }}
          >
            <option value="">Select Rashi</option>
            {rashis.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
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
          Get Horoscope
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <div aria-live="polite">
          <ResultCard
            variant="primary"
            icon={<Sun size={20} />}
            label={`${result.name}'s Horoscope`}
            value={result.message}
          />
        </div>
      )}

      {/* ================= SEO BLOG CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          What Is a Horoscope?
        </h2>

        <p>
          A horoscope is an astrological forecast based on the position
          of celestial bodies relative to your Rashi (Moon Sign).
          It provides daily guidance on emotions, decisions, and life
          direction.
        </p>

        <h3 className="font-semibold">
          Horoscope in Vedic Astrology
        </h3>

        <ul className="list-disc pl-5">
          <li>Based primarily on Moon Sign (Rashi)</li>
          <li>Reflects daily planetary influences</li>
          <li>Used for planning actions and decisions</li>
        </ul>

        <h3 className="font-semibold">
          Why Use a Horoscope Calculator?
        </h3>

        <ul className="list-disc pl-5">
          <li>Quick daily insight</li>
          <li>Emotionally engaging and motivating</li>
          <li>Popular for daily routines</li>
          <li>Supports personal awareness</li>
        </ul>

        <p>
          This horoscope calculator provides a general daily message.
          Detailed predictions require complete birth charts and
          planetary transits.
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ Horoscope predictions are based on traditional astrology
        belief systems. Results are for guidance and entertainment
        purposes only and should not be considered factual or scientific.
      </aside>
    </section>
  );
}
