"use client";

import { useState } from "react";
import { Calculator, BarChart } from "lucide-react";

import { PercentageInput } from "../../inputs/PercentageInput";
import { ResultCard } from "../../ResultCard";

export default function CarpetAreaCalculator() {
  const [builtUpArea, setBuiltUpArea] = useState("");
  const [wallPercentage, setWallPercentage] = useState("15");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    if (!builtUpArea || Number(builtUpArea) <= 0) {
      setError("Please enter valid built-up area.");
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
  function calculateCarpetArea(e) {
    e.preventDefault();
    if (!validate()) return;

    const builtUp = Number(builtUpArea);
    const wallPercent = Number(wallPercentage);

    const wallArea = (builtUp * wallPercent) / 100;
    const carpetArea = builtUp - wallArea;

    setResult({
      builtUp: builtUp.toFixed(2),
      wall: wallArea.toFixed(2),
      carpet: carpetArea.toFixed(2),
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
        <h1 className="text-2xl font-bold mb-1">Carpet Area Calculator</h1>
        <p className="text-sm leading-relaxed">
          Use this Carpet Area Calculator to calculate the usable carpet area
          from the built-up area of a flat or house.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateCarpetArea} className="space-y-4">
        <PercentageInput
          label="Built-Up Area (sq.ft)"
          value={builtUpArea}
          onChange={setBuiltUpArea}
          placeholder="1200"
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
          Calculate Carpet Area
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <div className="grid md:grid-cols-3 gap-4" aria-live="polite">
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
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">What is Carpet Area?</h2>

        <p>
          Carpet area is the actual usable floor area inside a house or
          apartment where a carpet can be laid. It excludes wall thickness,
          balconies, terraces, and common areas.
        </p>

        <h3 className="font-semibold">Carpet Area Calculation Formula</h3>

        <p
          className="font-mono text-xs p-3 rounded"
          style={{ backgroundColor: "var(--surface-2)" }}>
          Wall Area = Built-Up Area × Wall % Carpet Area = Built-Up Area − Wall
          Area
        </p>

        <ul className="list-disc pl-5">
          <li>Typical wall area: 10% – 20%</li>
          <li>RERA mandates clear carpet area disclosure</li>
          <li>Carpet area defines actual usable space</li>
        </ul>

        <h3 className="font-semibold">Carpet Area vs Built-Up Area</h3>

        <ul className="list-disc pl-5">
          <li>
            <strong>Built-Up Area:</strong> Carpet area + walls
          </li>
          <li>
            <strong>Carpet Area:</strong> Usable internal space
          </li>
        </ul>

        <h3 className="font-semibold">Why Use a Carpet Area Calculator?</h3>

        <ul className="list-disc pl-5">
          <li>Understand real usable space</li>
          <li>Compare flats accurately</li>
          <li>Avoid misleading area claims</li>
          <li>Useful for buyers & investors</li>
        </ul>

        <p>
          This carpet area calculator gives a quick and practical estimate for
          residential apartments and houses.
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ This calculator provides an estimate only. Actual carpet area may
        vary based on design, layout, and local regulations.
      </aside>
    </section>
  );
}
