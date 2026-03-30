"use client";

import { useState } from "react";
import { HeartHandshake } from "lucide-react";

import { calculateMarriageMatching } from "../../../lib/formulas";

const nakshatras = [
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
        <option value="">Select Nakshatra</option>
        {nakshatras.map((n) => (
          <option key={n} value={n}>
            {n}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function MarriageMatchingCalculator() {
  const [values, setValues] = useState({
    boyName: "Ramesh",
    girlName: "Sita",
    boyNakshatra: "Ashwini",
    girlNakshatra: "Rohini",
  });

  const updateValue = (key, val) => {
    setValues((prev) => ({
      ...prev,
      [key]: val,
    }));
  };

  // ✅ REAL-TIME CALCULATION
  const result = calculateMarriageMatching(values);

  const safeResult = {
    score: result?.primary || 0,
    verdict: result?.secondary || "N/A",
    boy: result?.meta?.boyName || "Groom",
    girl: result?.meta?.girlName || "Bride",
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
          Marriage Matching Calculator
        </h1>
        <p className="text-sm leading-relaxed">
          Check compatibility using Guna Milan.
        </p>
      </header>

      {/* INPUTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="Groom Name"
          value={values.boyName}
          onChange={(val) => updateValue("boyName", val)}
        />

        <SelectField
          label="Groom Nakshatra"
          value={values.boyNakshatra}
          onChange={(val) => updateValue("boyNakshatra", val)}
        />

        <InputField
          label="Bride Name"
          value={values.girlName}
          onChange={(val) => updateValue("girlName", val)}
        />

        <SelectField
          label="Bride Nakshatra"
          value={values.girlNakshatra}
          onChange={(val) => updateValue("girlNakshatra", val)}
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
        <HeartHandshake size={20} />
        <div>
          <p className="text-sm opacity-80">
            {safeResult.boy} ❤️ {safeResult.girl}
          </p>
          <p className="font-semibold">
            {safeResult.score}/36 – {safeResult.verdict}
          </p>
        </div>
      </div>

      {/* BLOG (UNCHANGED) */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">What Is Guna Milan?</h2>

        <p>Guna Milan evaluates compatibility based on Nakshatra matching.</p>

        <ul className="list-disc pl-5">
          <li>36–28: Excellent</li>
          <li>27–18: Good</li>
          <li>Below 18: Concern</li>
        </ul>

        <p>This is a simplified calculation.</p>
      </article>

      {/* DISCLAIMER */}
      <aside className="text-xs text-muted">
        ⚠️ For guidance purposes only.
      </aside>
    </section>
  );
}
