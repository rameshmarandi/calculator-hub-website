"use client";

import { useState } from "react";
import { Calculator, Timer } from "lucide-react";

import { ResultCard } from "../../ResultCard";

export default function DashaCalculator() {
  const [name, setName] = useState("");
  const [nakshatra, setNakshatra] = useState("");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const nakshatras = [
    { name: "Ashwini", lord: "Ketu" },
    { name: "Bharani", lord: "Venus" },
    { name: "Krittika", lord: "Sun" },
    { name: "Rohini", lord: "Moon" },
    { name: "Mrigashirsha", lord: "Mars" },
    { name: "Ardra", lord: "Rahu" },
    { name: "Punarvasu", lord: "Jupiter" },
    { name: "Pushya", lord: "Saturn" },
    { name: "Ashlesha", lord: "Mercury" },
    { name: "Magha", lord: "Ketu" },
    { name: "Purva Phalguni", lord: "Venus" },
    { name: "Uttara Phalguni", lord: "Sun" },
    { name: "Hasta", lord: "Moon" },
    { name: "Chitra", lord: "Mars" },
    { name: "Swati", lord: "Rahu" },
    { name: "Vishakha", lord: "Jupiter" },
    { name: "Anuradha", lord: "Saturn" },
    { name: "Jyeshtha", lord: "Mercury" },
    { name: "Mula", lord: "Ketu" },
    { name: "Purva Ashadha", lord: "Venus" },
    { name: "Uttara Ashadha", lord: "Sun" },
    { name: "Shravana", lord: "Moon" },
    { name: "Dhanishta", lord: "Mars" },
    { name: "Shatabhisha", lord: "Rahu" },
    { name: "Purva Bhadrapada", lord: "Jupiter" },
    { name: "Uttara Bhadrapada", lord: "Saturn" },
    { name: "Revati", lord: "Mercury" },
  ];

  const dashaPeriods = {
    Ketu: 7,
    Venus: 20,
    Sun: 6,
    Moon: 10,
    Mars: 7,
    Rahu: 18,
    Jupiter: 16,
    Saturn: 19,
    Mercury: 17,
  };

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    if (!name.trim()) {
      setError("Please enter your name.");
      return false;
    }

    if (!nakshatra) {
      setError("Please select your Nakshatra.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- DASHA LOGIC (SIMPLIFIED) ---------------- */
  function calculateDasha(e) {
    e.preventDefault();
    if (!validate()) return;

    const selected = nakshatras.find((n) => n.name === nakshatra);
    const dashaLord = selected.lord;
    const duration = dashaPeriods[dashaLord];

    setResult({
      name,
      dashaLord,
      duration,
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
          Dasha Calculator
        </h1>
        <p className="text-sm leading-relaxed">
          Find your starting Mahadasha based on your birth Nakshatra using
          the traditional Vimshottari Dasha system. Dasha periods play a
          crucial role in predicting life events in Vedic astrology.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateDasha} className="space-y-4">
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

        {/* Nakshatra */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Birth Nakshatra</label>
          <select
            value={nakshatra}
            onChange={(e) => setNakshatra(e.target.value)}
            className="w-full px-3 py-2 rounded"
            style={{
              border: "1px solid var(--border)",
              backgroundColor: "var(--surface)",
            }}
          >
            <option value="">Select Nakshatra</option>
            {nakshatras.map((n) => (
              <option key={n.name} value={n.name}>
                {n.name}
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
          Calculate Dasha
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <div aria-live="polite">
          <ResultCard
            variant="primary"
            icon={<Timer size={20} />}
            label={`${result.name}'s Starting Mahadasha`}
            value={`${result.dashaLord} Dasha – ${result.duration} Years`}
          />
        </div>
      )}

      {/* ================= SEO BLOG CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          What Is Dasha in Astrology?
        </h2>

        <p>
          Dasha refers to planetary time periods that influence different
          phases of life. The Vimshottari Dasha system divides life into
          periods ruled by planets, each bringing specific results.
        </p>

        <h3 className="font-semibold">
          Vimshottari Dasha System
        </h3>

        <ul className="list-disc pl-5">
          <li>Total cycle of 120 years</li>
          <li>9 planetary Mahadashas</li>
          <li>Determined by Moon’s Nakshatra</li>
          <li>Used for career, marriage, and major events</li>
        </ul>

        <h3 className="font-semibold">
          Why Use a Dasha Calculator?
        </h3>

        <ul className="list-disc pl-5">
          <li>Identify current and upcoming life phases</li>
          <li>Understand planetary influences</li>
          <li>Helpful for timing important decisions → Muhurat</li>
          <li>Foundation for advanced astrology predictions</li>
        </ul>

        <p>
          This Dasha calculator provides a simplified starting Mahadasha.
          Accurate Dasha timelines require exact birth time and ephemeris
          calculations.
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ Dasha calculations are based on traditional Vedic astrology
        belief systems. Results are for guidance only and should not be
        considered guarantees or scientific conclusions.
      </aside>
    </section>
  );
}
