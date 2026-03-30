"use client";

import { useState } from "react";
import { Route } from "lucide-react";

import { calculateLifePathNumber } from "../../../lib/formulas";

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

export default function LifePathNumberCalculator() {
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
  const result = calculateLifePathNumber(values);

  const safeResult = {
    lifePathNumber: result?.lifePathNumber || 0,
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
        <h1 className="text-2xl font-bold mb-1">Life Path Number Calculator</h1>
        <p className="text-sm leading-relaxed">
          Discover your life path number based on your date of birth.
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
        key={safeResult.lifePathNumber}
        className="p-4 rounded-lg flex items-center gap-3 transition-all duration-300"
        style={{
          backgroundColor: "var(--primary)",
          color: "#fff",
        }}>
        <Route size={20} />
        <div>
          <p className="text-sm opacity-80">
            {safeResult.name}'s Life Path Number
          </p>
          <p className="font-semibold">{safeResult.lifePathNumber}</p>
        </div>
      </div>

      {/* BLOG (UNCHANGED) */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">What Is a Life Path Number?</h2>

        <p>The Life Path Number represents your life purpose and direction.</p>

        <h3 className="font-semibold">Life Path Number Calculation</h3>

        <p className="font-mono text-xs p-3 rounded">
          Sum of DOB digits → Reduce to single digit (11, 22, 33 preserved)
        </p>

        <ul className="list-disc pl-5">
          <li>Based on date of birth</li>
          <li>Represents destiny</li>
        </ul>

        <h3 className="font-semibold">Why Use This Calculator?</h3>

        <ul className="list-disc pl-5">
          <li>Understand life direction</li>
          <li>Discover strengths</li>
        </ul>

        <p>This is a simplified numerology calculator.</p>
      </article>

      {/* DISCLAIMER */}
      <aside className="text-xs text-muted">
        ⚠️ Numerology is based on traditional belief systems.
      </aside>
    </section>
  );
}
