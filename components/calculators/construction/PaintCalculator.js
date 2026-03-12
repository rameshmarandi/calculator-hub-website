"use client";

import { useState } from "react";
import { Calculator, BarChart } from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { ResultCard } from "../../ResultCard";
import PaintCalculatorArticle from "../../content/construction/PaintCalculatorArticle";

export default function PaintCalculator() {
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [coats, setCoats] = useState("2");
  const [coverage, setCoverage] = useState("10"); // sqm per liter

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    if (!length || Number(length) <= 0) {
      setError("Please enter valid room length.");
      return false;
    }

    if (!width || Number(width) <= 0) {
      setError("Please enter valid room width.");
      return false;
    }

    if (!height || Number(height) <= 0) {
      setError("Please enter valid wall height.");
      return false;
    }

    if (!coats || Number(coats) <= 0) {
      setError("Number of coats must be at least 1.");
      return false;
    }

    if (!coverage || Number(coverage) <= 0) {
      setError("Please enter valid paint coverage.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- CALCULATION ---------------- */
  function calculatePaint(e) {
    e.preventDefault();
    if (!validate()) return;

    const l = Number(length);
    const w = Number(width);
    const h = Number(height);
    const c = Number(coats);
    const cover = Number(coverage);

    // Wall Area
    const wallArea = 2 * (l + w) * h;

    // Total paintable area (including coats)
    const totalArea = wallArea * c;

    // Add 10% wastage factor
    const wastageFactor = 1.1;

    const paintLiters = (totalArea / cover) * wastageFactor;

    setResult({
      wallArea: wallArea.toFixed(2),
      totalArea: totalArea.toFixed(2),
      paint: paintLiters.toFixed(2),
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
          Paint Calculator – Estimate Paint Quantity
        </h1>

        <p className="text-sm leading-relaxed">
          Use this Paint Calculator to estimate how much paint you need for
          walls based on room size, number of coats, and paint coverage.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculatePaint} className="space-y-4">
        <AmountInput
          label="Room Length (meters)"
          value={length}
          onChange={setLength}
          placeholder="5"
          prefix=""
        />

        <AmountInput
          label="Room Width (meters)"
          value={width}
          onChange={setWidth}
          placeholder="4"
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
          label="Number of Coats"
          value={coats}
          onChange={setCoats}
          placeholder="2"
          prefix=""
        />

        <AmountInput
          label="Paint Coverage (sqm per liter)"
          value={coverage}
          onChange={setCoverage}
          placeholder="10"
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
          Calculate Paint Quantity
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <>
          <div className="grid md:grid-cols-3 gap-4" aria-live="polite">
            <ResultCard
              variant="neutral"
              icon={<BarChart size={20} />}
              label="Wall Area"
              value={`${result.wallArea} m²`}
            />

            <ResultCard
              variant="neutral"
              icon={<BarChart size={20} />}
              label="Total Paint Area"
              value={`${result.totalArea} m²`}
            />

            <ResultCard
              variant="primary"
              icon={<BarChart size={20} />}
              label="Paint Required"
              value={`${result.paint} liters`}
            />
          </div>

          <p className="text-xs opacity-70">
            Note: Paint estimate includes a 10% buffer for wastage and touch-ups.
          </p>
        </>
      )}

      {/* ================= ARTICLE CONTENT ================= */}
      <PaintCalculatorArticle />
    </section>
  );
}