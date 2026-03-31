"use client";

import { useState } from "react";
import { Star } from "lucide-react";

import { calculateNakshatra } from "../../../lib/formulas";
import NakshatraCalculatorArticle from "../../content/astrology/NakshatraCalculatorArticle";

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

export default function NakshatraCalculator() {
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

  // ✅ REAL-TIME CALCULATION
  const result = calculateNakshatra(values);

  const safeResult = {
    nakshatra: result?.nakshatra || "N/A",
    name: result?.name || "User",
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
        <h1 className="text-2xl font-bold mb-1">Nakshatra Calculator</h1>
        <p className="text-sm leading-relaxed">
          Find your Nakshatra based on your birth details.
        </p>
      </header>

      {/* INPUTS */}
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

      {/* RESULT */}
      <div
        key={safeResult.nakshatra}
        className="p-4 rounded-lg flex items-center gap-3 transition-all duration-300"
        style={{
          backgroundColor: "var(--primary)",
          color: "#fff",
        }}>
        <Star size={20} />
        <div>
          <p className="text-sm opacity-80">{safeResult.name}'s Nakshatra</p>
          <p className="font-semibold">{safeResult.nakshatra}</p>
        </div>
      </div>

      {/* BLOG (UNCHANGED) */}
     <NakshatraCalculatorArticle/>
    </section>
  );
}
