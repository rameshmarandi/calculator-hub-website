"use client";

import { useState } from "react";
import { Calculator, HeartHandshake } from "lucide-react";

import { ResultCard } from "../../ResultCard";

export default function MarriageMatchingCalculator() {
  const [boyName, setBoyName] = useState("");
  const [girlName, setGirlName] = useState("");
  const [boyNakshatra, setBoyNakshatra] = useState("");
  const [girlNakshatra, setGirlNakshatra] = useState("");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const nakshatras = [
    "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashirsha",
    "Ardra", "Punarvasu", "Pushya", "Ashlesha", "Magha",
    "Purva Phalguni", "Uttara Phalguni", "Hasta", "Chitra",
    "Swati", "Vishakha", "Anuradha", "Jyeshtha", "Mula",
    "Purva Ashadha", "Uttara Ashadha", "Shravana", "Dhanishta",
    "Shatabhisha", "Purva Bhadrapada", "Uttara Bhadrapada", "Revati",
  ];

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    if (!boyName.trim()) {
      setError("Please enter groom's name.");
      return false;
    }
    if (!girlName.trim()) {
      setError("Please enter bride's name.");
      return false;
    }
    if (!boyNakshatra || !girlNakshatra) {
      setError("Please select Nakshatra for both bride and groom.");
      return false;
    }
    setError("");
    return true;
  }

  /* ---------------- GUNA MATCHING LOGIC (SIMPLIFIED) ---------------- */
  function calculateMatch(e) {
    e.preventDefault();
    if (!validate()) return;

    /*
      NOTE:
      Traditional Guna Milan has 8 Kootas totaling 36 Gunas.
      This simplified version estimates compatibility score
      used by many online tools for quick matching.
    */

    const boyIndex = nakshatras.indexOf(boyNakshatra);
    const girlIndex = nakshatras.indexOf(girlNakshatra);

    const diff = Math.abs(boyIndex - girlIndex);

    // Simplified Guna Score (0–36)
    const gunaScore = Math.max(18, 36 - diff);

    let verdict = "Average Match";
    if (gunaScore >= 28) verdict = "Excellent Match 💖";
    else if (gunaScore >= 18) verdict = "Good Match 👍";
    else verdict = "Low Match ⚠️";

    setResult({
      gunaScore,
      verdict,
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
          Marriage Matching Calculator
        </h1>
        <p className="text-sm leading-relaxed">
          Check marriage compatibility using the traditional Guna Milan
          system based on Nakshatra matching. This Marriage Matching
          Calculator provides quick insight into marital harmony.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateMatch} className="space-y-4">
        {/* Groom */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Groom's Name</label>
          <input
            type="text"
            value={boyName}
            onChange={(e) => setBoyName(e.target.value)}
            placeholder="Groom Name"
            className="w-full px-3 py-2 rounded"
            style={{
              border: "1px solid var(--border)",
              backgroundColor: "var(--surface)",
            }}
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Groom's Nakshatra</label>
          <select
            value={boyNakshatra}
            onChange={(e) => setBoyNakshatra(e.target.value)}
            className="w-full px-3 py-2 rounded"
            style={{
              border: "1px solid var(--border)",
              backgroundColor: "var(--surface)",
            }}
          >
            <option value="">Select Nakshatra</option>
            {nakshatras.map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>

        {/* Bride */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Bride's Name</label>
          <input
            type="text"
            value={girlName}
            onChange={(e) => setGirlName(e.target.value)}
            placeholder="Bride Name"
            className="w-full px-3 py-2 rounded"
            style={{
              border: "1px solid var(--border)",
              backgroundColor: "var(--surface)",
            }}
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Bride's Nakshatra</label>
          <select
            value={girlNakshatra}
            onChange={(e) => setGirlNakshatra(e.target.value)}
            className="w-full px-3 py-2 rounded"
            style={{
              border: "1px solid var(--border)",
              backgroundColor: "var(--surface)",
            }}
          >
            <option value="">Select Nakshatra</option>
            {nakshatras.map((n) => (
              <option key={n} value={n}>{n}</option>
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
          Check Marriage Compatibility
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <div aria-live="polite">
          <ResultCard
            variant="primary"
            icon={<HeartHandshake size={20} />}
            label="Marriage Compatibility Result"
            value={`${result.gunaScore}/36 – ${result.verdict}`}
          />
        </div>
      )}

      {/* ================= SEO BLOG CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          What Is Guna Milan?
        </h2>

        <p>
          Guna Milan is a traditional Vedic astrology method used to
          assess marriage compatibility. It evaluates harmony between
          the bride and groom based on their Nakshatras and assigns a
          score out of 36 Gunas.
        </p>

        <h3 className="font-semibold">
          Guna Milan Score Interpretation
        </h3>

        <ul className="list-disc pl-5">
          <li>36–28 Gunas: Excellent match</li>
          <li>27–18 Gunas: Good match</li>
          <li>Below 18: Compatibility concerns</li>
        </ul>

        <h3 className="font-semibold">
          Why Use a Marriage Matching Calculator?
        </h3>

        <ul className="list-disc pl-5">
          <li>Quick compatibility overview</li>
          <li>Based on traditional astrology principles</li>
          <li>Helpful before Kundli matching</li>
          <li>Widely used in arranged marriages</li>
        </ul>

        <p>
          This calculator provides a simplified Guna Milan score.
          Detailed marriage matching requires full Kundli analysis.
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ Marriage matching is based on traditional Vedic astrology
        belief systems. Results are for guidance only and should not be
        considered guarantees or scientific conclusions.
      </aside>
    </section>
  );
}
