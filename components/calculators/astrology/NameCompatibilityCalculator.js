"use client";

import { useState } from "react";
import { Heart } from "lucide-react";

import { calculateNameCompatibility } from "../../../lib/formulas";

/* ================= INPUT ================= */
function InputField({ label, value, onChange }) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium">{label}</label>
      <input
        type="text"
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

export default function NameCompatibilityCalculator() {
  const [values, setValues] = useState({
    nameOne: "Ramesh",
    nameTwo: "Sita",
  });

  const updateValue = (key, val) => {
    setValues((prev) => ({
      ...prev,
      [key]: val,
    }));
  };

  // ✅ REAL-TIME CALCULATION
  const result = calculateNameCompatibility(values);

  const safeResult = {
    score: result?.primary || 0,
    level: result?.secondary || "N/A",
  };

  return (
    <section
      className="rounded-xl p-6 space-y-10"
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)",
      }}>
      {/* HEADER */}
      <header>
        <h1 className="text-2xl font-bold mb-1">
          Name Compatibility Calculator
        </h1>
        <p className="text-sm leading-relaxed">
          Check compatibility based on numerology.
        </p>
      </header>

      {/* INPUTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="First Name"
          value={values.nameOne}
          onChange={(val) => updateValue("nameOne", val)}
        />

        <InputField
          label="Second Name"
          value={values.nameTwo}
          onChange={(val) => updateValue("nameTwo", val)}
        />
      </div>

      {/* RESULT */}
      <div
        key={safeResult.score}
        className="p-4 rounded-lg flex items-center gap-3 transition-all duration-300"
        style={{
          backgroundColor: "var(--primary)",
          color: "#fff",
        }}>
        <Heart size={20} />
        <div>
          <p className="text-sm opacity-80">Compatibility Score</p>
          <p className="font-semibold">
            {safeResult.score}% – {safeResult.level}
          </p>
        </div>
      </div>

      {/* BLOG (UNCHANGED) */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          How Name Compatibility Works
        </h2>

        <p>
          Each letter carries a numerical vibration. Compatibility is based on
          harmony between numbers.
        </p>

        <ul className="list-disc pl-5">
          <li>Letters → numbers</li>
          <li>Numbers → reduced</li>
          <li>Difference → compatibility</li>
        </ul>

        <p>This provides a general estimate only.</p>
      </article>

      {/* DISCLAIMER */}
      <aside className="text-xs text-muted">
        ⚠️ For entertainment purposes only.
      </aside>
    </section>
  );
}
