"use client";

import { useState } from "react";
import { Hash } from "lucide-react";

import { calculateNumerology } from "../../../lib/formulas";

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

export default function NumerologyCalculator() {
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
  const result = calculateNumerology(values);

  const safeResult = {
    destinyNumber: result?.destinyNumber || 0,
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
        <h1 className="text-2xl font-bold mb-1">Numerology Calculator</h1>
        <p className="text-sm leading-relaxed">
          Discover your Numerology number based on your name and birth details.
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
      </div>

      {/* RESULT */}
      <div
        key={safeResult.destinyNumber}
        className="p-4 rounded-lg flex items-center gap-3 transition-all duration-300"
        style={{
          backgroundColor: "var(--primary)",
          color: "#fff",
        }}>
        <Hash size={20} />
        <div>
          <p className="text-sm opacity-80">
            {safeResult.name}'s Numerology Number
          </p>
          <p className="font-semibold">{safeResult.destinyNumber}</p>
        </div>
      </div>

      {/* BLOG (UNCHANGED) */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">What Is Numerology?</h2>

        <p>
          Numerology is the study of numbers and their influence on human life.
        </p>

        <h3 className="font-semibold">Numerology Number Calculation</h3>

        <ul className="list-disc pl-5">
          <li>Letters are converted into numbers</li>
          <li>Numbers are reduced to a single digit</li>
          <li>Master numbers like 11 and 22 are preserved</li>
        </ul>

        <h3 className="font-semibold">Why Use a Numerology Calculator?</h3>

        <ul className="list-disc pl-5">
          <li>Understand personality</li>
          <li>Identify strengths</li>
          <li>Plan life decisions</li>
        </ul>

        <p>This calculator provides a basic interpretation.</p>
      </article>

      {/* DISCLAIMER */}
      <aside className="text-xs text-muted">
        ⚠️ Numerology is based on traditional belief systems.
      </aside>
    </section>
  );
}
