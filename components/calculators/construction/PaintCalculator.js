"use client";

import { useState } from "react";
import { Calculator, BarChart } from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { PercentageInput } from "../../inputs/PercentageInput";
import { ResultCard } from "../../ResultCard";

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

    // Wall area = perimeter × height
    const wallArea = 2 * (l + w) * h;
    const totalArea = wallArea * c;

    const paintLiters = totalArea / cover;

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
          Paint Calculator
        </h1>
        <p className="text-sm leading-relaxed">
          Use this Paint Calculator to estimate how much paint you need
          for walls based on room size, number of coats, and coverage.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculatePaint} className="space-y-4">
        <AmountInput
          label="Room Length (meters)"
          value={length}
          onChange={setLength}
          placeholder="5"
        />

        <AmountInput
          label="Room Width (meters)"
          value={width}
          onChange={setWidth}
          placeholder="4"
        />

        <AmountInput
          label="Wall Height (meters)"
          value={height}
          onChange={setHeight}
          placeholder="3"
        />

        <PercentageInput
          label="Number of Coats"
          value={coats}
          onChange={setCoats}
          placeholder="2"
        />

        <PercentageInput
          label="Paint Coverage (sqm per liter)"
          value={coverage}
          onChange={setCoverage}
          placeholder="10"
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
          Calculate Paint Quantity
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
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
      )}

      {/* ================= SEO BLOG CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          How to Calculate Paint Quantity
        </h2>

        <p>
          Paint quantity calculation helps determine how much paint is
          required before starting interior or exterior painting work.
          It prevents excess purchase and avoids paint shortage.
        </p>

        <h3 className="font-semibold">
          Paint Calculation Formula
        </h3>

        <p
          className="font-mono text-xs p-3 rounded"
          style={{ backgroundColor: "var(--surface-2)" }}
        >
          Wall Area = 2 × (Length + Width) × Height  
          Total Area = Wall Area × Number of Coats  
          Paint Required (liters) = Total Area ÷ Coverage
        </p>

        <ul className="list-disc pl-5">
          <li>Average paint coverage: 8–12 m² per liter</li>
          <li>2 coats are recommended for best finish</li>
          <li>Coverage varies by paint brand & surface</li>
        </ul>

        <h3 className="font-semibold">
          Why Use a Paint Calculator?
        </h3>

        <ul className="list-disc pl-5">
          <li>Accurate paint estimation</li>
          <li>Better budget planning</li>
          <li>Reduces paint wastage</li>
          <li>Ideal for home & commercial projects</li>
        </ul>

        <p>
          This paint calculator provides a quick and reliable estimate
          for most residential and commercial painting works.
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ This calculator provides an estimate only. Actual paint
        requirement may vary based on surface texture and paint brand.
      </aside>
    </section>
  );
}
