"use client";

import { useState } from "react";
import { Calculator, BarChart } from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { PercentageInput } from "../../inputs/PercentageInput";
import { ResultCard } from "../../ResultCard";
import WallAreaCalculatorArticle from "../../content/construction/WallAreaCalculatorArticle";

export default function WallAreaCalculator() {
  const [length, setLength] = useState("");
  const [height, setHeight] = useState("");
  const [openings, setOpenings] = useState("0");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- NUMBER FORMAT ---------------- */
  function formatNumber(value) {
    return Number(value).toLocaleString("en-US", {
      maximumFractionDigits: 2,
    });
  }

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    const l = Number(length);
    const h = Number(height);
    const o = Number(openings);

    if (!l || l <= 0) {
      setError("Please enter valid wall length.");
      return false;
    }

    if (!h || h <= 0) {
      setError("Please enter valid wall height.");
      return false;
    }

    if (o < 0) {
      setError("Opening area cannot be negative.");
      return false;
    }

    if (o > l * h) {
      setError("Opening area cannot be larger than wall area.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- CALCULATION ---------------- */
  function calculateWallArea(e) {
    e.preventDefault();
    if (!validate()) return;

    const l = Number(length);
    const h = Number(height);
    const o = Number(openings);

    const grossArea = l * h;
    const netArea = grossArea - o;

    setResult({
      gross: formatNumber(grossArea),
      net: formatNumber(netArea > 0 ? netArea : 0),
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
        <h1 className="text-2xl font-bold mb-1">Wall Area Calculator</h1>

        <p className="text-sm leading-relaxed">
          Use this Wall Area Calculator to determine the gross and net wall
          surface area required for painting, plastering, tiling, or brickwork
          projects.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateWallArea} className="space-y-4">
        <AmountInput
          label="Wall Length (meters)"
          value={length}
          onChange={setLength}
          placeholder="5"
          prefix=""
        />

        <AmountInput
          label="Wall Height (meters)"
          value={height}
          onChange={setHeight}
          placeholder="3"
          prefix=""
        />

        <AmountInput
          label="Door / Window Area (sq.m)"
          value={openings}
          onChange={setOpenings}
          placeholder="2"
          prefix=""
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
          Calculate Wall Area
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <div className="grid md:grid-cols-2 gap-4" aria-live="polite">
          <ResultCard
            variant="neutral"
            icon={<BarChart size={20} />}
            label="Gross Wall Area"
            value={`${result.gross} m²`}
          />

          <ResultCard
            variant="primary"
            icon={<BarChart size={20} />}
            label="Net Wall Area"
            value={`${result.net} m²`}
          />
        </div>
      )}

      {/* ================= SEO CONTENT ================= */}
      <WallAreaCalculatorArticle />
    </section>
  );
}
