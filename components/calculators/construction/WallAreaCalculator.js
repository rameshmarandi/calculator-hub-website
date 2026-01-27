"use client";

import { useState } from "react";
import { Calculator, BarChart } from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { PercentageInput } from "../../inputs/PercentageInput";
import { ResultCard } from "../../ResultCard";

export default function WallAreaCalculator() {
  const [length, setLength] = useState("");
  const [height, setHeight] = useState("");
  const [openings, setOpenings] = useState("0");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    if (!length || Number(length) <= 0) {
      setError("Please enter valid wall length.");
      return false;
    }

    if (!height || Number(height) <= 0) {
      setError("Please enter valid wall height.");
      return false;
    }

    if (Number(openings) < 0) {
      setError("Opening area cannot be negative.");
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
    const openingArea = Number(openings);

    const grossArea = l * h;
    const netArea = grossArea - openingArea;

    setResult({
      gross: grossArea.toFixed(2),
      net: netArea > 0 ? netArea.toFixed(2) : "0.00",
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
        <h1 className="text-2xl font-bold mb-1">Wall Area Calculator</h1>
        <p className="text-sm leading-relaxed">
          Use this Wall Area Calculator to calculate the total and net wall area
          for painting, plastering, or brickwork.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateWallArea} className="space-y-4">
        <PercentageInput
          label="Wall Length (meters)"
          value={length}
          onChange={setLength}
          placeholder="5"
        />

        <PercentageInput
          label="Wall Height (meters)"
          value={height}
          onChange={setHeight}
          placeholder="3"
        />

        <PercentageInput
          label="Door / Window Area (sq.m)"
          value={openings}
          onChange={setOpenings}
          placeholder="2"
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

      {/* ================= SEO BLOG CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">How to Calculate Wall Area</h2>

        <p>
          Wall area calculation is essential before starting painting,
          plastering, wallpaper, or brickwork. It helps determine the exact
          material quantity required and prevents wastage.
        </p>

        <h3 className="font-semibold">Wall Area Calculation Formula</h3>

        <p
          className="font-mono text-xs p-3 rounded"
          style={{ backgroundColor: "var(--surface-2)" }}>
          Gross Wall Area = Length × Height Net Wall Area = Gross Area − Door &
          Window Area
        </p>

        <ul className="list-disc pl-5">
          <li>Length and height are measured in meters</li>
          <li>Opening area includes doors and windows</li>
          <li>Net wall area is used for material calculation</li>
        </ul>

        <h3 className="font-semibold">Why Use a Wall Area Calculator?</h3>

        <ul className="list-disc pl-5">
          <li>Accurate paint & plaster estimation</li>
          <li>Reduces construction material wastage</li>
          <li>Supports cost planning</li>
          <li>Useful for homes and commercial buildings</li>
        </ul>

        <p>
          This wall area calculator provides a quick and reliable estimate for
          most residential and commercial projects.
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ This calculator provides an estimate only. Actual wall area may vary
        based on site measurement accuracy.
      </aside>
    </section>
  );
}
