"use client";

import { useState } from "react";
import { Orbit } from "lucide-react";
import { calculateBirthChart } from "../../../lib/formulas";

/* ================= FORMULA ================= */

/* ================= INPUT ================= */
function InputField({ label, type = "text", value, onChange }) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 rounded"
        style={{
          border: "1px solid var(--border)",
          backgroundColor: "var(--surface)",
          color: "var(--text)",
        }}
      />
    </div>
  );
}

/* ================= MAIN ================= */
export default function BirthChartCalculator() {
  const [values, setValues] = useState({
    name: "Ramesh",
    date: "1998-05-12",
    time: "10:30",
    place: "Pune",
  });

  const updateValue = (key, val) => {
    setValues((prev) => ({
      ...prev,
      [key]: val,
    }));
  };

  // REAL-TIME RESULT
  const result = calculateBirthChart(values);

  const safeResult = {
    sunSign: result?.sunSign || "N/A",
    ascendant: result?.ascendant || "N/A",
    name: result?.name || "User",
  };

  return (
    <section
      className="rounded-xl p-6 space-y-10"
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)",
      }}>
      {/* ================= HEADER ================= */}
      <header>
        <h1 className="text-2xl font-bold mb-1">Birth Chart Calculator</h1>
        <p className="text-sm leading-relaxed">
          Generate your Birth Chart (Natal Chart) instantly using your date,
          time, and place of birth. This chart reveals your core personality,
          mindset, and life tendencies.
        </p>
      </header>

      {/* ================= INPUTS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="Full Name"
          value={values.name}
          onChange={(val) => updateValue("name", val)}
        />

        <InputField
          label="Date of Birth"
          type="date"
          value={values.date}
          onChange={(val) => updateValue("date", val)}
        />

        <InputField
          label="Time of Birth"
          type="time"
          value={values.time}
          onChange={(val) => updateValue("time", val)}
        />

        <InputField
          label="Place of Birth"
          value={values.place}
          onChange={(val) => updateValue("place", val)}
        />
      </div>

      {/* ================= RESULT ================= */}
      <div
        key={safeResult.sunSign + safeResult.ascendant}
        className="p-4 rounded-lg flex items-center gap-3 transition-all duration-300"
        style={{
          backgroundColor: "var(--primary)",
          color: "#fff",
        }}>
        <Orbit size={20} />
        <div>
          <p className="text-sm opacity-80">{safeResult.name}'s Birth Chart</p>
          <p className="font-semibold">Sun Sign: {safeResult.sunSign}</p>
          <p className="text-sm">Ascendant: {safeResult.ascendant}</p>
        </div>
      </div>

      {/* ================= SEO BLOG CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">What Is a Birth Chart?</h2>

        <p>
          A Birth Chart, also known as a Natal Chart, is a snapshot of the sky
          at the exact moment you were born. It shows the positions of the Sun,
          Moon, and Ascendant, which together describe your personality and life
          direction.
        </p>

        <h3 className="font-semibold">Key Elements in a Birth Chart</h3>

        <ul className="list-disc pl-5">
          <li>
            <strong>Sun Sign</strong> – Core personality and ego
          </li>
          <li>
            <strong>Ascendant (Lagna)</strong> – How the world sees you
          </li>
          <li>Foundation for planet & house analysis</li>
        </ul>

        <h3 className="font-semibold">Why Use a Birth Chart Calculator?</h3>

        <ul className="list-disc pl-5">
          <li>Instant chart generation</li>
          <li>Understand personality traits</li>
          <li>Basis for career, love, and life readings</li>
          <li>No astrology expertise needed</li>
        </ul>

        <p>
          This birth chart calculator provides a simplified overview. Detailed
          birth charts require precise astronomical ephemeris data.
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ Astrology is based on traditional belief systems. Birth chart results
        are for guidance and informational purposes only and should not be
        considered scientific advice.
      </aside>
    </section>
  );
}
