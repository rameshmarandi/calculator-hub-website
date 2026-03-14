"use client";

import { useState } from "react";
import { Calculator, BarChart } from "lucide-react";
import { PercentageInput } from "../../inputs/PercentageInput";
import { AmountInput } from "../../inputs/AmountInput";
import { ResultCard } from "../../ResultCard";
import BuiltUpAreaCalculatorArticle from "../../content/construction/BuiltUpAreaCalculatorArticle";

export default function BuiltUpAreaCalculator() {
  const [carpetArea, setCarpetArea] = useState("");
  const [wallPercentage, setWallPercentage] = useState("15");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- FORMAT HELPER ---------------- */
  function parseNumber(value) {
    return Number(value.toString().replace(/,/g, ""));
  }

  function formatNumber(value) {
    return new Intl.NumberFormat("en-IN").format(value);
  }

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    const carpet = parseNumber(carpetArea);

    if (!carpet || carpet <= 0) {
      setError("Please enter valid carpet area.");
      return false;
    }

    if (Number(wallPercentage) < 5 || Number(wallPercentage) > 30) {
      setError("Wall area percentage should be between 5% and 30%.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- CALCULATION ---------------- */
  function calculateBuiltUpArea(e) {
    e.preventDefault();
    if (!validate()) return;

    const carpet = parseNumber(carpetArea);
    const wallPercent = Number(wallPercentage);

    const wallArea = (carpet * wallPercent) / 100;
    const builtUpArea = carpet + wallArea;

    setResult({
      carpet: formatNumber(carpet.toFixed(2)),
      wall: formatNumber(wallArea.toFixed(2)),
      builtUp: formatNumber(builtUpArea.toFixed(2)),
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
        <h1 className="text-2xl font-bold mb-1">Built-Up Area Calculator</h1>
        <p className="text-sm leading-relaxed">
          Use this Built-Up Area Calculator to calculate the built-up area of a
          flat or house from the carpet area and wall thickness.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateBuiltUpArea} className="space-y-4">
        <AmountInput
          label="Carpet Area (sq.ft)"
          value={carpetArea}
          onChange={setCarpetArea}
          placeholder="12,000"
          prefix=""
        />

        <PercentageInput
          label="Wall Area Percentage (%)"
          value={wallPercentage}
          onChange={setWallPercentage}
          placeholder="15"
          // prefix=""
        />

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          className="w-full py-2.5 rounded-md font-medium flex items-center justify-center gap-2"
          style={{
            backgroundColor: "var(--primary)",
            color: "#fff",
          }}
        >
          <Calculator size={18} />
          Calculate Built-Up Area
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <div className="grid md:grid-cols-3 gap-4" aria-live="polite">
          <ResultCard
            variant="neutral"
            icon={<BarChart size={20} />}
            label="Carpet Area"
            value={`${result.carpet} sq.ft`}
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
            label="Built-Up Area"
            value={`${result.builtUp} sq.ft`}
          />
        </div>
      )}

      {/* ================= SEO ARTICLE ================= */}
      <BuiltUpAreaCalculatorArticle />
    </section>
  );
}
