"use client";

import { useMemo, useState } from "react";
import { BarChart } from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { ResultCard } from "../../ResultCard";
import WallAreaCalculatorArticle from "../../content/construction/WallAreaCalculatorArticle";

export default function WallAreaCalculator() {

  const [length, setLength] = useState("5");
  const [height, setHeight] = useState("3");
  const [openings, setOpenings] = useState("2");

  /* ---------- SAFE NUMBER PARSER ---------- */
  function parseNumber(value) {
    const num = Number(String(value).replace(/,/g, ""));
    return Number.isFinite(num) ? num : 0;
  }

  function formatNumber(value) {
    return Number(value).toLocaleString("en-IN", {
      maximumFractionDigits: 2
    });
  }

  /* ---------- LIVE CALCULATION ---------- */
  const result = useMemo(() => {

    const l = parseNumber(length);
    const h = parseNumber(height);
    const o = parseNumber(openings);

    const grossArea = l * h;
    const netArea = grossArea - o;

    return {
      gross: grossArea,
      net: netArea > 0 ? netArea : 0
    };

  }, [length, height, openings]);

  return (
    <section
      className="rounded-xl p-6 space-y-10"
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)"
      }}
    >

      {/* HEADER */}

      <header>
        <h1 className="text-2xl font-bold mb-1">
          Wall Area Calculator
        </h1>

        <p className="text-sm leading-relaxed">
          Calculate gross and net wall area required for painting,
          plastering, tiling or brickwork projects.
        </p>
      </header>

      {/* INPUTS */}

      <div className="grid md:grid-cols-2 gap-4">

        <AmountInput
          label="Wall Length (meters)"
          value={length}
          onChange={setLength}
          prefix=""
        />

        <AmountInput
          label="Wall Height (meters)"
          value={height}
          onChange={setHeight}
          prefix=""
        />

        <AmountInput
          label="Door / Window Area (sq.m)"
          value={openings}
          onChange={setOpenings}
          prefix=""
        />

      </div>

      {/* RESULTS */}

      <div
        className="grid md:grid-cols-2 gap-4"
        aria-live="polite"
      >

        <ResultCard
          variant="neutral"
          icon={<BarChart size={20} />}
          label="Gross Wall Area"
          value={`${formatNumber(result.gross)} m²`}
        />

        <ResultCard
          variant="primary"
          icon={<BarChart size={20} />}
          label="Net Wall Area"
          value={`${formatNumber(result.net)} m²`}
        />

      </div>

      {/* ARTICLE */}

      <WallAreaCalculatorArticle />

    </section>
  );
}