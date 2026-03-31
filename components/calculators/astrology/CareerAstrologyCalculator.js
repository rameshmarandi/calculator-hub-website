"use client";

import { useState } from "react";
import { Briefcase } from "lucide-react";

import { calculateCareerAstrology } from "../../../lib/formulas";
import CareerAstrologyCalculatorArticle from "../../content/astrology/CareerAstrologyCalculatorArticle";

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

export default function CareerAstrologyCalculator() {
  const [values, setValues] = useState({
    name: "Ramesh Kumar",
    lifePathNumber: "5",
    rashi: "Aries (Mesh)",
  });

  const updateValue = (key, val) => {
    setValues((prev) => ({
      ...prev,
      [key]: val,
    }));
  };

  // ✅ REAL-TIME CALCULATION
  const result = calculateCareerAstrology(values);

  const safeResult = {
    lifePath: result?.primary || "",
    rashiCareer: result?.secondary || "",
    name: result?.meta?.name || "User",
    number: result?.meta?.number || 1,
  };

  return (
    <section className="rounded-xl p-6 space-y-10">
      {/* HEADER */}
      <header>
        <h1 className="text-2xl font-bold mb-1">Career Astrology Calculator</h1>
        <p className="text-sm">
          Discover career paths based on numerology and astrology.
        </p>
      </header>

      {/* INPUTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="Full Name"
          value={values.name}
          onChange={(v) => updateValue("name", v)}
        />

        <InputField
          label="Life Path Number (1–9)"
          type="number"
          value={values.lifePathNumber}
          onChange={(v) => updateValue("lifePathNumber", v)}
        />

        <SelectField
          label="Rashi (Moon Sign)"
          value={values.rashi}
          onChange={(v) => updateValue("rashi", v)}
        />
      </div>

      {/* RESULT */}
      <div
        key={safeResult.number + safeResult.rashiCareer}
        className="p-4 rounded-lg flex items-center gap-3 transition-all duration-300"
        style={{
          backgroundColor: "var(--primary)",
          color: "#fff",
        }}>
        <Briefcase size={20} />
        <div>
          <p className="text-sm opacity-80">
            {safeResult.name}'s Career Guidance
          </p>
          <p className="font-semibold">Life Path Suggestion:</p>
          <p className="text-sm">{safeResult.lifePath}</p>

          <p className="font-semibold mt-2">Rashi Suggestion:</p>
          <p className="text-sm">{safeResult.rashiCareer}</p>
        </div>
      </div>

      {/* BLOG (UNCHANGED) */}
      <CareerAstrologyCalculatorArticle/>
    </section>
  );
}
