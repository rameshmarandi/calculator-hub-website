"use client";

import { useState } from "react";
import { AlertTriangle } from "lucide-react";

import { calculateSadeSati } from "../../../lib/formulas";

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

/* ================= INPUT ================= */
function InputField({ label, value, onChange }) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 rounded"
        style={{
          border: "1px solid var(--border)",
          backgroundColor: "var(--surface)",
        }}
      />
    </div>
  );
}

function SelectField({ label, value, onChange }) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 rounded"
        style={{
          border: "1px solid var(--border)",
          backgroundColor: "var(--surface)",
        }}>
        {rashis.map((r) => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </select>
    </div>
  );
}

/* ================= MAIN ================= */
export default function SadeSatiCalculator() {
  const [values, setValues] = useState({
    name: "Ramesh",
    rashi: "Capricorn (Makara)",
  });

  const updateValue = (key, val) => {
    setValues((prev) => ({
      ...prev,
      [key]: val,
    }));
  };

  // ✅ REAL-TIME CALCULATION
  const result = calculateSadeSati(values);

  const safeResult = {
    status: result?.primary || "Not Active",
    phase: result?.secondary || "",
    name: result?.meta?.name || "User",
    isActive: result?.meta?.isActive || false,
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
        <h1 className="text-2xl font-bold mb-1">Sade Sati Calculator</h1>
        <p className="text-sm leading-relaxed">
          Check whether Sade Sati is active for you based on your Rashi.
        </p>
      </header>

      {/* INPUTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="Full Name"
          value={values.name}
          onChange={(v) => updateValue("name", v)}
        />

        <SelectField
          label="Your Rashi (Moon Sign)"
          value={values.rashi}
          onChange={(v) => updateValue("rashi", v)}
        />
      </div>

      {/* RESULT */}
      <div
        key={safeResult.status + safeResult.phase}
        className="p-4 rounded-lg flex items-center gap-3 transition-all duration-300"
        style={{
          backgroundColor: safeResult.isActive ? "#ef4444" : "var(--primary)",
          color: "#fff",
        }}>
        <AlertTriangle size={20} />
        <div>
          <p className="text-sm opacity-80">
            {safeResult.name}'s Sade Sati Status
          </p>
          <p className="font-semibold">
            {safeResult.status}
            {safeResult.phase ? ` – ${safeResult.phase}` : ""}
          </p>
        </div>
      </div>

      {/* BLOG (UNCHANGED) */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">What Is Sade Sati?</h2>

        <p>Sade Sati is a 7.5-year Saturn transit affecting life phases.</p>

        <ul className="list-disc pl-5">
          <li>Rising Phase</li>
          <li>Peak Phase</li>
          <li>Setting Phase</li>
        </ul>

        <p>It can bring growth, discipline, and transformation.</p>
      </article>

      {/* DISCLAIMER */}
      <aside className="text-xs text-muted">
        ⚠️ Astrology results are for guidance only.
      </aside>
    </section>
  );
}
