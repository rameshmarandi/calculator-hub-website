"use client";

import { useMemo, useState } from "react";
import { BarChart } from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { ResultCard } from "../../ResultCard";
import ExcavationCalculatorArticle from "../../content/construction/ExcavationCalculatorArticle";

export default function ExcavationCalculator() {

  const [length, setLength] = useState("5");
  const [width, setWidth] = useState("3");
  const [depth, setDepth] = useState("1.5");

  /* ---------- SAFE NUMBER PARSER ---------- */
  function parseNumber(value) {
    const num = Number(String(value).replace(/,/g, ""));
    return Number.isFinite(num) ? num : 0;
  }

  function formatNumber(value) {
    return Number(value).toLocaleString("en-IN");
  }

  /* ---------- LIVE CALCULATION ---------- */
  const result = useMemo(() => {

    const l = parseNumber(length);
    const w = parseNumber(width);
    const d = parseNumber(depth);

    const volume = l * w * d;
    const volumeCFT = volume * 35.3147;

    return {
      volume: volume.toFixed(3),
      cft: volumeCFT.toFixed(2)
    };

  }, [length, width, depth]);

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
          Excavation Calculator
        </h1>

        <p className="text-sm leading-relaxed">
          Calculate the volume of earthwork required for foundation,
          trench excavation or site preparation.
        </p>
      </header>

      {/* INPUTS */}

      <div className="grid md:grid-cols-2 gap-4">

        <AmountInput
          label="Excavation Length (meters)"
          value={length}
          onChange={setLength}
          prefix=""
        />

        <AmountInput
          label="Excavation Width (meters)"
          value={width}
          onChange={setWidth}
          prefix=""
        />

        <AmountInput
          label="Excavation Depth (meters)"
          value={depth}
          onChange={setDepth}
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
          label="Excavation Volume"
          value={`${formatNumber(result.volume)} m³`}
        />

        <ResultCard
          variant="primary"
          icon={<BarChart size={20} />}
          label="Excavation Volume (Cubic Feet)"
          value={`${formatNumber(result.cft)} CFT`}
        />

      </div>

      {/* ARTICLE */}

      <ExcavationCalculatorArticle />

    </section>
  );
}