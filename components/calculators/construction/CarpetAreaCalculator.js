"use client";

import { useMemo, useState } from "react";
import { BarChart } from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { ResultCard } from "../../ResultCard";
import CarpetAreaCalculatorArticle from "../../content/construction/CarpetAreaCalculatorArticle";

/* ---------- SAFE NUMBER PARSER ---------- */

function parseNumber(value) {
  const num = Number(String(value).replace(/,/g, ""));
  return Number.isFinite(num) ? num : 0;
}

function formatNumber(num) {
  return Number(num).toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  });
}

export default function CarpetAreaCalculator() {

  const [builtUpArea, setBuiltUpArea] = useState("1200");
  const [wallPercentage, setWallPercentage] = useState("15");

  /* ---------- LIVE CALCULATION ---------- */

  const result = useMemo(() => {

    const builtUp = parseNumber(builtUpArea);
    const wallPercent = parseNumber(wallPercentage);

    const wallArea = (builtUp * wallPercent) / 100;
    const carpetArea = builtUp - wallArea;

    return {
      builtUp,
      wall: wallArea,
      carpet: carpetArea > 0 ? carpetArea : 0
    };

  }, [builtUpArea, wallPercentage]);

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
          Carpet Area Calculator
        </h1>

        <p className="text-sm leading-relaxed">
          Estimate the usable carpet area of a flat or house from the
          built-up area by accounting for wall thickness.
        </p>
      </header>

      {/* INPUTS */}

      <div className="grid md:grid-cols-2 gap-4">

        <AmountInput
          label="Built-Up Area (sq.ft)"
          value={builtUpArea}
          onChange={setBuiltUpArea}
          prefix=""
        />

        <AmountInput
          label="Wall Area Percentage (%)"
          value={wallPercentage}
          onChange={setWallPercentage}
          prefix=""
        />

      </div>

      {/* RESULTS */}

      <div
        className="grid md:grid-cols-3 gap-4"
        aria-live="polite"
      >

        <ResultCard
          variant="neutral"
          icon={<BarChart size={20} />}
          label="Built-Up Area"
          value={`${formatNumber(result.builtUp)} sq.ft`}
        />

        <ResultCard
          variant="neutral"
          icon={<BarChart size={20} />}
          label="Wall Area"
          value={`${formatNumber(result.wall)} sq.ft`}
        />

        <ResultCard
          variant="primary"
          icon={<BarChart size={20} />}
          label="Carpet Area"
          value={`${formatNumber(result.carpet)} sq.ft`}
        />

      </div>

      {/* ARTICLE */}

      <CarpetAreaCalculatorArticle />

    </section>
  );
}