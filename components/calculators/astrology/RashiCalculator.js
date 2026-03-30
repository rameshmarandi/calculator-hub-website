"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { calculateRashi } from "../../../lib/formulas";

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
export default function RashiCalculator() {
  const [values, setValues] = useState({
    name: "Ramesh",
    date: "1998-05-12",
    time: "10:30",
  });

  const updateValue = (key, val) => {
    setValues((prev) => ({
      ...prev,
      [key]: val,
    }));
  };

  // ✅ REAL-TIME RESULT
  const result = calculateRashi(values);

  const safeResult = {
    rashi: result?.rashi || "N/A",
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
        <h1 className="text-2xl font-bold mb-1">Rashi Calculator</h1>
        <p className="text-sm leading-relaxed">
          Find your Rashi (Moon Sign) based on your date and time of birth.
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
      </div>

      {/* ================= RESULT ================= */}
      <div
        key={safeResult.rashi}
        className="p-4 rounded-lg flex items-center gap-3 transition-all duration-300"
        style={{
          backgroundColor: "var(--primary)",
          color: "#fff",
        }}>
        <Sparkles size={20} />
        <div>
          <p className="text-sm opacity-80">{safeResult.name}'s Rashi</p>
          <p className="font-semibold">{safeResult.rashi}</p>
        </div>
      </div>

      {/* ================= SEO BLOG CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">What Is Rashi in Astrology?</h2>

        <p>
          Rashi refers to the zodiac sign in which the Moon was positioned at
          the time of your birth.
        </p>

        <h3 className="font-semibold">Importance of Rashi</h3>

        <ul className="list-disc pl-5">
          <li>Represents emotional nature</li>
          <li>Used in Kundli matching</li>
          <li>Important in Vedic astrology</li>
        </ul>

        <h3 className="font-semibold">Why Use a Rashi Calculator?</h3>

        <ul className="list-disc pl-5">
          <li>Instant calculation</li>
          <li>No astrology knowledge needed</li>
          <li>Useful for insights</li>
        </ul>

        <p>
          This is a simplified calculator. Accurate results require astronomical
          data.
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ Astrology is based on traditional belief systems.
      </aside>
    </section>
  );
}
