"use client";

import { useState } from "react";
import { Calculator, BarChart } from "lucide-react";

import { PercentageInput } from "../../inputs/PercentageInput";
import { ResultCard } from "../../ResultCard";

export default function BuiltUpAreaCalculator() {
  const [carpetArea, setCarpetArea] = useState("");
  const [wallPercentage, setWallPercentage] = useState("15");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    if (!carpetArea || Number(carpetArea) <= 0) {
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

    const carpet = Number(carpetArea);
    const wallPercent = Number(wallPercentage);

    const wallArea = (carpet * wallPercent) / 100;
    const builtUpArea = carpet + wallArea;

    setResult({
      carpet: carpet.toFixed(2),
      wall: wallArea.toFixed(2),
      builtUp: builtUpArea.toFixed(2),
    });
  }

  return (
    <section
      className="rounded-xl p-6 space-y-10"
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)",
      }}>
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
        <PercentageInput
          label="Carpet Area (sq.ft)"
          value={carpetArea}
          onChange={setCarpetArea}
          placeholder="1000"
        />

        <PercentageInput
          label="Wall Area Percentage (%)"
          value={wallPercentage}
          onChange={setWallPercentage}
          placeholder="15"
        />

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          className="w-full py-2.5 rounded-md font-medium flex items-center justify-center gap-2"
          style={{
            backgroundColor: "var(--primary)",
            color: "#fff",
          }}>
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

      {/* ================= SEO BLOG CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">What is Built-Up Area?</h2>

        <p>
          Built-up area includes the carpet area plus the thickness of all
          internal and external walls. It represents the total area covered by
          the apartment or house structure.
        </p>

        <h3 className="font-semibold">Built-Up Area Calculation Formula</h3>

        <p
          className="font-mono text-xs p-3 rounded"
          style={{ backgroundColor: "var(--surface-2)" }}>
          Wall Area = Carpet Area × Wall Percentage Built-Up Area = Carpet Area
          + Wall Area
        </p>

        <ul className="list-disc pl-5">
          <li>Typical wall percentage: 10% – 20%</li>
          <li>Built-up area includes walls only</li>
          <li>Does not include common areas</li>
        </ul>

        <h3 className="font-semibold">Built-Up Area vs Carpet Area</h3>

        <ul className="list-disc pl-5">
          <li>
            <strong>Carpet Area:</strong> Usable internal space
          </li>
          <li>
            <strong>Built-Up Area:</strong> Carpet area + walls
          </li>
        </ul>

        <h3 className="font-semibold">Why Use a Built-Up Area Calculator?</h3>

        <ul className="list-disc pl-5">
          <li>Understand actual flat size</li>
          <li>Compare property listings correctly</li>
          <li>Helpful for buyers & real estate planning</li>
          <li>Supports cost and valuation calculations</li>
        </ul>

        <p>
          This built-up area calculator gives a quick and realistic estimate
          commonly used in residential real estate.
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ This calculator provides an estimate only. Actual built-up area may
        vary based on design, wall thickness, and local regulations.
      </aside>
    </section>
  );
}
