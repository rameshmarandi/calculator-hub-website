"use client";

import { useState } from "react";
import { Calculator, AlertTriangle } from "lucide-react";

import { ResultCard } from "../../ResultCard";

export default function SadeSatiCalculator() {
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

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    if (!name.trim()) {
      setError("Please enter your name.");
      return false;
    }

    if (!rashi) {
      setError("Please select your Rashi (Moon Sign).");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- SADE SATI LOGIC (SIMPLIFIED) ---------------- */
  function calculateSadeSati(e) {
    e.preventDefault();
    if (!validate()) return;

    /*
      NOTE:
      Sade Sati occurs when Saturn transits:
      - 12th house from Moon
      - Moon sign
      - 2nd house from Moon
      Duration ≈ 7.5 years (3 phases)
      This is a simplified status-based checker.
    */

    const activeRashis = [
      "Capricorn (Makara)",
      "Aquarius (Kumbha)",
      "Pisces (Meena)",
    ];

    const isSadeSati = activeRashis.includes(rashi);

    let phase = "No Sade Sati";
    if (isSadeSati) {
      if (rashi === "Capricorn (Makara)") phase = "Rising Phase (Initial)";
      if (rashi === "Aquarius (Kumbha)") phase = "Peak Phase (Middle)";
      if (rashi === "Pisces (Meena)") phase = "Setting Phase (Final)";
    }

    setResult({
      isSadeSati,
      phase,
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
          Sade Sati Calculator
        </h1>
        <p className="text-sm leading-relaxed">
          Check whether Sade Sati is active for you based on your Rashi
          (Moon Sign). Sade Sati is a 7.5-year Saturn transit period that
          influences life challenges, discipline, and growth.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateSadeSati} className="space-y-4">
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
          Check Sade Sati
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <div aria-live="polite">
          <ResultCard
            variant={result.isSadeSati ? "danger" : "success"}
            icon={<AlertTriangle size={20} />}
            label="Sade Sati Status"
            value={
              result.isSadeSati
                ? `Active – ${result.phase}`
                : "Not Active"
            }
          />
        </div>
      )}

      {/* ================= SEO BLOG CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          What Is Sade Sati?
        </h2>

        <p>
          Sade Sati is a significant astrological phase that occurs when
          Saturn (Shani) transits the 12th, 1st, and 2nd houses from the
          Moon sign. This period lasts approximately 7.5 years and is
          believed to bring karmic lessons and life transformations.
        </p>

        <h3 className="font-semibold">
          Phases of Sade Sati
        </h3>

        <ul className="list-disc pl-5">
          <li><strong>Rising Phase</strong> – Preparation and challenges</li>
          <li><strong>Peak Phase</strong> – Intense life lessons</li>
          <li><strong>Setting Phase</strong> – Resolution and stability</li>
        </ul>

        <h3 className="font-semibold">
          Why Use a Sade Sati Calculator?
        </h3>

        <ul className="list-disc pl-5">
          <li>Check Sade Sati status instantly</li>
          <li>Understand Saturn’s influence</li>
          <li>Useful for planning major life decisions</li>
          <li>Widely consulted in Vedic astrology</li>
        </ul>

        <p>
          Sade Sati is not always negative. For disciplined individuals,
          it can bring maturity, wisdom, and long-term success.
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ Sade Sati calculations are based on traditional Vedic astrology
        belief systems. Results are for guidance only and should not be
        considered guarantees or scientific conclusions.
      </aside>
    </section>
  );
}
