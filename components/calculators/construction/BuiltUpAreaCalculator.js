"use client";

import { useMemo, useState } from "react";
import { BarChart } from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { PercentageInput } from "../../inputs/PercentageInput";
import { ResultCard } from "../../ResultCard";
import BuiltUpAreaCalculatorArticle from "../../content/construction/BuiltUpAreaCalculatorArticle";

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

export default function BuiltUpAreaCalculator() {

  const [carpetArea, setCarpetArea] = useState("1200");
  const [wallPercentage, setWallPercentage] = useState("15");

  /* ---------- LIVE CALCULATION ---------- */

  const result = useMemo(() => {

    const carpet = parseNumber(carpetArea);
    const wallPercent = parseNumber(wallPercentage);

    const wallArea = (carpet * wallPercent) / 100;
    const builtUpArea = carpet + wallArea;

    return {
      carpet,
      wall: wallArea,
      builtUp: builtUpArea
    };

  }, [carpetArea, wallPercentage]);

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
          Built-Up Area Calculator
        </h1>

        <p className="text-sm leading-relaxed">
          Calculate the built-up area of a house or apartment from
          the carpet area and wall thickness percentage.
        </p>
      </header>

      {/* INPUTS */}

      <div className="grid md:grid-cols-2 gap-4">

        <AmountInput
          label="Carpet Area (sq.ft)"
          value={carpetArea}
          onChange={setCarpetArea}
          prefix=""
        />

        <PercentageInput
          label="Wall Area Percentage (%)"
          value={wallPercentage}
          onChange={setWallPercentage}
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
          label="Carpet Area"
          value={`${formatNumber(result.carpet)} sq.ft`}
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
          label="Built-Up Area"
          value={`${formatNumber(result.builtUp)} sq.ft`}
        />

      </div>

      {/* ARTICLE */}

      <BuiltUpAreaCalculatorArticle />

    </section>
  );
}