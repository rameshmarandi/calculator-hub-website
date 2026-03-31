"use client";

import { useState } from "react";
import { Timer } from "lucide-react";

import { calculateDasha } from "../../../lib/formulas";
import DashaCalculatorArticle from "../../content/astrology/DashaCalculatorArticle";

const nakshatraList = [
  "Ashwini",
  "Bharani",
  "Krittika",
  "Rohini",
  "Mrigashirsha",
  "Ardra",
  "Punarvasu",
  "Pushya",
  "Ashlesha",
  "Magha",
  "Purva Phalguni",
  "Uttara Phalguni",
  "Hasta",
  "Chitra",
  "Swati",
  "Vishakha",
  "Anuradha",
  "Jyeshtha",
  "Mula",
  "Purva Ashadha",
  "Uttara Ashadha",
  "Shravana",
  "Dhanishta",
  "Shatabhisha",
  "Purva Bhadrapada",
  "Uttara Bhadrapada",
  "Revati",
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
        {nakshatraList.map((n) => (
          <option key={n} value={n}>
            {n}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function DashaCalculator() {
  const [values, setValues] = useState({
    name: "Ramesh",
    nakshatra: "Ashwini",
  });

  const updateValue = (key, val) => {
    setValues((prev) => ({
      ...prev,
      [key]: val,
    }));
  };

  // ✅ REAL-TIME
  const result = calculateDasha(values);

  const safeResult = {
    lord: result?.primary || "N/A",
    duration: result?.secondary || "0 Years",
    name: result?.meta?.name || "User",
  };

  return (
    <section className="rounded-xl p-6 space-y-10">
      {/* HEADER */}
      <header>
        <h1 className="text-2xl font-bold mb-1">Dasha Calculator</h1>
        <p className="text-sm">Find your starting Mahadasha instantly.</p>
      </header>

      {/* INPUTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="Full Name"
          value={values.name}
          onChange={(v) => updateValue("name", v)}
        />

        <SelectField
          label="Nakshatra"
          value={values.nakshatra}
          onChange={(v) => updateValue("nakshatra", v)}
        />
      </div>

      {/* RESULT */}
      <div
        key={safeResult.lord}
        className="p-4 rounded-lg flex items-center gap-3 transition-all duration-300"
        style={{
          backgroundColor: "var(--primary)",
          color: "#fff",
        }}>
        <Timer size={20} />
        <div>
          <p className="text-sm opacity-80">{safeResult.name}'s Mahadasha</p>
          <p className="font-semibold">
            {safeResult.lord} – {safeResult.duration}
          </p>
        </div>
      </div>

      {/* BLOG (UNCHANGED) */}
      <DashaCalculatorArticle/>
    </section>
  );
}
