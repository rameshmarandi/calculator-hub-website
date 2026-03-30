"use client";

import { useState } from "react";
import { Clover } from "lucide-react";

import { calculateLuckyNumber } from "../../../lib/formulas";

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
export default function LuckyNumberCalculator() {
  const [values, setValues] = useState({
    name: "Ramesh Kumar",
    date: "1998-05-12",
  });

  const updateValue = (key, val) => {
    setValues((prev) => ({
      ...prev,
      [key]: val,
    }));
  };

  // ✅ REAL-TIME CALCULATION
  const result = calculateLuckyNumber(values);

  const safeResult = {
    luckyNumber: result?.primary || 0,
    label: result?.secondary || "Lucky Number",
    name: result?.meta?.name || "User",
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
        <h1 className="text-2xl font-bold mb-1">Lucky Number Calculator</h1>
        <p className="text-sm leading-relaxed">
          Find your Lucky Number based on your date of birth.
        </p>
      </header>

      {/* ================= INPUTS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="Full Name"
          value={values.name}
          onChange={(v) => updateValue("name", v)}
        />

        <InputField
          label="Date of Birth"
          type="date"
          value={values.date}
          onChange={(v) => updateValue("date", v)}
        />
      </div>

      {/* ================= RESULT ================= */}
      <div
        key={safeResult.luckyNumber}
        className="p-4 rounded-lg flex items-center gap-3 transition-all duration-300"
        style={{
          backgroundColor: "var(--primary)",
          color: "#fff",
        }}>
        <Clover size={20} />
        <div>
          <p className="text-sm opacity-80">{safeResult.name}'s Lucky Number</p>
          <p className="font-semibold">{safeResult.luckyNumber}</p>
        </div>
      </div>

      {/* ================= SEO BLOG CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">What Is a Lucky Number?</h2>

        <p>
          A Lucky Number is derived from numerology using your date of birth. It
          represents positive vibrations and is believed to influence success
          and opportunities.
        </p>

        <h3 className="font-semibold">How Lucky Numbers Are Calculated</h3>

        <ul className="list-disc pl-5">
          <li>All digits of date of birth are added</li>
          <li>The sum is reduced to a single digit</li>
          <li>Master numbers like 11, 22, 33 are preserved</li>
        </ul>

        <h3 className="font-semibold">Why Use a Lucky Number Calculator?</h3>

        <ul className="list-disc pl-5">
          <li>Discover your favorable number</li>
          <li>Used in decisions and planning</li>
          <li>Popular in numerology</li>
        </ul>

        <p>This is a simplified numerology calculation.</p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ Results are based on numerology beliefs and are for informational
        purposes only.
      </aside>
    </section>
  );
}
