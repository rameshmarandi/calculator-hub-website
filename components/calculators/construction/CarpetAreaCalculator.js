"use client";

import { useState } from "react";
import { Calculator, BarChart } from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { ResultCard } from "../../ResultCard";
import CarpetAreaCalculatorArticle from "../../content/construction/CarpetAreaCalculatorArticle";

/* ---------- NUMBER HELPERS ---------- */

function parseNumber(value) {
  if (!value) return 0;
  return Number(value.toString().replace(/,/g, ""));
}

function formatNumber(num) {
  if (num === null || num === undefined) return "";
  return Number(num).toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  });
}

export default function CarpetAreaCalculator() {
  const [builtUpArea, setBuiltUpArea] = useState("");
  const [wallPercentage, setWallPercentage] = useState("15");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */

  function validate() {
    const builtUp = parseNumber(builtUpArea);
    const wallPercent = parseNumber(wallPercentage);

    if (!builtUp || builtUp <= 0) {
      setError("Please enter valid built-up area.");
      return false;
    }

    if (wallPercent < 5 || wallPercent > 30) {
      setError("Wall area percentage should be between 5% and 30%.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- CALCULATION ---------------- */

  function calculateCarpetArea(e) {
    e.preventDefault();

    if (!validate()) return;

    const builtUp = parseNumber(builtUpArea);
    const wallPercent = parseNumber(wallPercentage);

    const wallArea = (builtUp * wallPercent) / 100;
    const carpetArea = builtUp - wallArea;

    setResult({
      builtUp: formatNumber(builtUp),
      wall: formatNumber(wallArea),
      carpet: formatNumber(carpetArea),
    });
  }

  return (
    <section
      className="rounded-xl p-6 space-y-10"
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)",
      }}
    >
      {/* ================= HEADER ================= */}

      <header>
        <h1 className="text-2xl font-bold mb-1">
          Carpet Area Calculator
        </h1>

        <p className="text-sm leading-relaxed">
          Use this Carpet Area Calculator to estimate the usable carpet
          area from the built-up area of a flat or house.
        </p>
      </header>

      {/* ================= FORM ================= */}

      <form onSubmit={calculateCarpetArea} className="space-y-4">

        <AmountInput
          label="Built-Up Area (sq.ft)"
          value={builtUpArea}
          onChange={setBuiltUpArea}
          prefix=""
          placeholder="1,200"
        />

        <AmountInput
          label="Wall Area Percentage (%)"
          value={wallPercentage}
          onChange={setWallPercentage}
          prefix=""
          placeholder="15"
        />

        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        <button
          type="submit"
          className="w-full py-2.5 rounded-md font-medium flex items-center justify-center gap-2"
          style={{
            backgroundColor: "var(--primary)",
            color: "#fff",
          }}
        >
          <Calculator size={18} />
          Calculate Carpet Area
        </button>

      </form>

      {/* ================= RESULT ================= */}

      {result && (
        <div
          className="grid md:grid-cols-3 gap-4"
          aria-live="polite"
        >

          <ResultCard
            variant="neutral"
            icon={<BarChart size={20} />}
            label="Built-Up Area"
            value={`${result.builtUp} sq.ft`}
          />

          <ResultCard
            variant="neutral"
            icon={<BarChart size={20} />}
            label="Wall Area"
            value={`${result.wall} sq.ft`}
          />

          <ResultCard
            variant="primary"
            icon={<BarChart size={20} />}
            label="Carpet Area"
            value={`${result.carpet} sq.ft`}
          />

        </div>
      )}

      {/* ================= SEO BLOG CONTENT ================= */}

      <CarpetAreaCalculatorArticle />

    </section>
  );
}