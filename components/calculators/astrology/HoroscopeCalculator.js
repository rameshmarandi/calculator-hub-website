"use client";

import { useState } from "react";
import { Sun } from "lucide-react";

import { calculateHoroscope } from "../../../lib/formulas";
import HoroscopeCalculatorArticle from "../../content/astrology/HoroscopeCalculatorArticle";

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

export default function HoroscopeCalculator() {
  const [values, setValues] = useState({
    name: "Ramesh",
    rashi: "Aries (Mesh)",
  });

  const updateValue = (key, val) => {
    setValues((prev) => ({
      ...prev,
      [key]: val,
    }));
  };

  // ✅ REAL-TIME CALCULATION
  const result = calculateHoroscope(values);

  const safeResult = {
    message: result?.primary || "",
    rashi: result?.secondary || "",
    name: result?.meta?.name || "User",
  };

  return (
    <section className="rounded-xl p-6 space-y-10">
      {/* HEADER */}
      <header>
        <h1 className="text-2xl font-bold mb-1">Horoscope Calculator</h1>
        <p className="text-sm">Get your daily horoscope instantly.</p>
      </header>

      {/* INPUTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="Full Name"
          value={values.name}
          onChange={(v) => updateValue("name", v)}
        />

        <SelectField
          label="Rashi"
          value={values.rashi}
          onChange={(v) => updateValue("rashi", v)}
        />
      </div>

      {/* RESULT */}
      <div
        key={safeResult.message}
        className="p-4 rounded-lg flex items-start gap-3 transition-all duration-300"
        style={{
          backgroundColor: "var(--primary)",
          color: "#fff",
        }}>
        <Sun size={20} />
        <div>
          <p className="text-sm opacity-80">
            {safeResult.name}'s Horoscope ({safeResult.rashi})
          </p>
          <p className="font-semibold">{safeResult.message}</p>
        </div>
      </div>

      {/* BLOG (UNCHANGED) */}
      <HoroscopeCalculatorArticle/>
    </section>
  );
}
