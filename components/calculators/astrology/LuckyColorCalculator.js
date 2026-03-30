"use client";

import { useState } from "react";
import { Palette } from "lucide-react";

import { calculateLuckyColor } from "../../../lib/formulas";

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
export default function LuckyColorCalculator() {
  const [values, setValues] = useState({
    name: "Ramesh Kumar",
    luckyNumber: "5",
  });

  const updateValue = (key, val) => {
    setValues((prev) => ({
      ...prev,
      [key]: val,
    }));
  };

  // ✅ REAL-TIME CALCULATION
  const result = calculateLuckyColor(values);

  const safeResult = {
    color: result?.primary || "N/A",
    info: result?.secondary || "",
    name: result?.meta?.name || "User",
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
        <h1 className="text-2xl font-bold mb-1">Lucky Color Calculator</h1>
        <p className="text-sm leading-relaxed">
          Find your Lucky Color based on your lucky number.
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
          label="Your Lucky Number (1–9)"
          type="number"
          value={values.luckyNumber}
          onChange={(v) => updateValue("luckyNumber", v)}
        />
      </div>

      {/* RESULT */}
      <div
        key={safeResult.color}
        className="p-4 rounded-lg flex items-center gap-3 transition-all duration-300"
        style={{
          backgroundColor: "var(--primary)",
          color: "#fff",
        }}>
        <Palette size={20} />
        <div>
          <p className="text-sm opacity-80">{safeResult.name}'s Lucky Color</p>
          <p className="font-semibold">{safeResult.color}</p>
          <p className="text-xs opacity-80">{safeResult.info}</p>
        </div>
      </div>

      {/* BLOG (UNCHANGED) */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">What Is a Lucky Color?</h2>

        <p>
          A Lucky Color is associated with numerology numbers and is believed to
          attract positive energy.
        </p>

        <ul className="list-disc pl-5">
          <li>1 → Red</li>
          <li>2 → White</li>
          <li>3 → Yellow</li>
          <li>4 → Blue</li>
          <li>5 → Green</li>
          <li>6 → Pink</li>
          <li>7 → Grey</li>
          <li>8 → Dark Blue / Black</li>
          <li>9 → Golden</li>
        </ul>

        <p>Lucky colors are symbolic and belief-based.</p>
      </article>

      {/* DISCLAIMER */}
      <aside className="text-xs text-muted">
        ⚠️ For guidance and entertainment only.
      </aside>
    </section>
  );
}
