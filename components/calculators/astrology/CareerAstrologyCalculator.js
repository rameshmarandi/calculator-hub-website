"use client";

import { useState } from "react";
import { Calculator, Briefcase } from "lucide-react";

import { ResultCard } from "../../ResultCard";

export default function CareerAstrologyCalculator() {
  const [name, setName] = useState("");
  const [lifePathNumber, setLifePathNumber] = useState("");
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
      setError("Please enter your full name.");
      return false;
    }

    if (
      !lifePathNumber ||
      isNaN(lifePathNumber) ||
      Number(lifePathNumber) < 1 ||
      Number(lifePathNumber) > 9
    ) {
      setError("Please enter a valid Life Path Number (1–9).");
      return false;
    }

    if (!rashi) {
      setError("Please select your Rashi (Moon Sign).");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- CAREER ASTROLOGY LOGIC ---------------- */
  function calculateCareer(e) {
    e.preventDefault();
    if (!validate()) return;

    const careerByLifePath = {
      1: "Leadership roles, Entrepreneurship, Government, Management",
      2: "Counseling, Teaching, HR, Diplomacy, Psychology",
      3: "Media, Acting, Writing, Marketing, Content Creation",
      4: "Engineering, Architecture, Banking, Administration",
      5: "Sales, Travel, Marketing, Journalism, Public Relations",
      6: "Healthcare, Design, Fashion, Teaching, Hospitality",
      7: "Research, Astrology, IT, Data Science, Spiritual fields",
      8: "Business, Finance, Law, Corporate Leadership",
      9: "Social Work, NGOs, Politics, Creative Arts",
    };

    const careerByRashi = {
      "Aries (Mesh)": "Defense, Sports, Entrepreneurship",
      "Taurus (Vrishabha)": "Finance, Luxury, Banking",
      "Gemini (Mithun)": "Communication, IT, Media",
      "Cancer (Karka)": "Healthcare, Hospitality, Real Estate",
      "Leo (Simha)": "Leadership, Politics, Entertainment",
      "Virgo (Kanya)": "Analytics, Medicine, Accounting",
      "Libra (Tula)": "Law, Fashion, Design, Public Relations",
      "Scorpio (Vrishchik)": "Research, Investigation, Psychology",
      "Sagittarius (Dhanu)": "Teaching, Law, Travel",
      "Capricorn (Makara)": "Corporate, Government, Management",
      "Aquarius (Kumbha)": "Technology, Innovation, Social Reform",
      "Pisces (Meena)": "Art, Healing, Spiritual professions",
    };

    setResult({
      name,
      lifePath: careerByLifePath[lifePathNumber],
      rashiCareer: careerByRashi[rashi],
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
          Career Astrology Calculator
        </h1>
        <p className="text-sm leading-relaxed">
          Discover career paths best suited for you based on astrology
          and numerology. This Career Astrology Calculator combines Life
          Path Number and Rashi to suggest suitable professions.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateCareer} className="space-y-4">
        {/* Name */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Full Name"
            className="w-full px-3 py-2 rounded"
            style={{
              border: "1px solid var(--border)",
              backgroundColor: "var(--surface)",
            }}
          />
        </div>

        {/* Life Path Number */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Life Path Number</label>
          <input
            type="number"
            value={lifePathNumber}
            onChange={(e) => setLifePathNumber(e.target.value)}
            placeholder="Enter number (1–9)"
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
          Find Career Path
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <div aria-live="polite">
          <ResultCard
            variant="primary"
            icon={<Briefcase size={20} />}
            label={`${result.name}'s Career Guidance`}
            value={`Based on Life Path: ${result.lifePath} | Based on Rashi: ${result.rashiCareer}`}
          />
        </div>
      )}

      {/* ================= SEO BLOG CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          How Career Astrology Works
        </h2>

        <p>
          Career astrology analyzes planetary influences and numerology
          to understand professional strengths. Your Life Path Number
          shows natural talents, while your Rashi reflects mindset and
          working style.
        </p>

        <h3 className="font-semibold">
          Factors Used in Career Astrology
        </h3>

        <ul className="list-disc pl-5">
          <li>Life Path Number – core abilities</li>
          <li>Rashi (Moon Sign) – emotional working style</li>
          <li>Planetary associations with professions</li>
        </ul>

        <h3 className="font-semibold">
          Why Use a Career Astrology Calculator?
        </h3>

        <ul className="list-disc pl-5">
          <li>Career clarity and direction</li>
          <li>Helpful for students and professionals</li>
          <li>Popular for career switches and planning</li>
          <li>Foundation for advanced astrology consultation</li>
        </ul>

        <p>
          This calculator provides general career suggestions. Detailed
          career predictions require a full Kundli and planetary analysis.
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ Career astrology is based on traditional belief systems.
        Results are for guidance only and should not be considered
        professional or scientific career advice.
      </aside>
    </section>
  );
}
