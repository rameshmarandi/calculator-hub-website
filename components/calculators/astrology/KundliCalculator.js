"use client";

import { useState } from "react";
import { Stars } from "lucide-react";
import CalculateKundliArticle from "../../content/astrology/CalculateKundliArticle";

/* ================= FORMULA ================= */
function calculateKundli({ name, date, time, place }) {
  const parsedDate = new Date(date);
  const isValidDate = !isNaN(parsedDate);

  const zodiacSigns = [
    "Aries",
    "Taurus",
    "Gemini",
    "Cancer",
    "Leo",
    "Virgo",
    "Libra",
    "Scorpio",
    "Sagittarius",
    "Capricorn",
    "Aquarius",
    "Pisces",
  ];

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

  // ---------------- SAFE VALUES ----------------
  const safeName = name || "";
  const safePlace = place || "";
  const safeTime = time || "00:00";

  const day = isValidDate ? parsedDate.getDate() : 1;
  const month = isValidDate ? parsedDate.getMonth() + 1 : 1;
  const year = isValidDate ? parsedDate.getFullYear() : 2000;

  // ---------------- STRING → NUMBER ----------------
  const strToNum = (str) => {
    let total = 0;
    for (let i = 0; i < str.length; i++) {
      total += str.charCodeAt(i);
    }
    return total;
  };

  // ---------------- TIME → NUMBER ----------------
  const [h, m] = safeTime.split(":").map(Number);
  const timeVal = (h || 0) * 60 + (m || 0);

  // ---------------- FINAL SEED ----------------
  const seed =
    day + month + year + strToNum(safeName) + strToNum(safePlace) + timeVal;

  return {
    rashi: zodiacSigns[seed % 12] || "N/A",
    nakshatra: nakshatras[seed % 27] || "N/A",
    name: safeName || "User",
  };
}
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
export default function KundliCalculator() {
  const [values, setValues] = useState({
    name: "Ramesh",
    date: "1998-05-12",
    time: "10:30",
    place: "Odisha",
  });

  const updateValue = (key, val) => {
    setValues((prev) => ({
      ...prev,
      [key]: val,
    }));
  };

  // ✅ ALWAYS recalculates on every change
  const result = calculateKundli(values);

  const safeResult = {
    rashi: result?.rashi || "N/A",
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
        <h1 className="text-2xl font-bold mb-1">Kundli Calculator</h1>
        <p className="text-sm">
          Live Kundli generation based on your birth details.
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

        <InputField
          label="Place of Birth"
          value={values.place}
          onChange={(val) => updateValue("place", val)}
        />
      </div>

      {/* RESULT - ALWAYS UPDATES */}
      <div
        className="p-4 rounded-lg flex items-center gap-3"
        style={{
          backgroundColor: "var(--primary)",
          color: "#fff",
        }}>
        <Stars size={20} />
        <div>
          <p className="text-sm opacity-80">{safeResult.name}'s Kundli</p>
          <p className="font-semibold">Rashi: {safeResult.rashi}</p>
          <p className="text-sm">Nakshatra: {safeResult.nakshatra}</p>
        </div>
      </div>

      {/* INFO */}
      <p className="text-sm text-muted">
        Result updates instantly as you change values.
      </p>
      <CalculateKundliArticle/>
    </section>
  );
}
