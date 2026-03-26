"use client";

import { useMemo, useState } from "react";
import { BarChart } from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { ResultCard } from "../../ResultCard";
import PlasterCalculatorArticle from "../../content/construction/PlasterCalculatorArticle";
import { calculatePlaster } from "../../../lib/formulas";


export default function PlasterCalculator() {

  const [length, setLength] = useState("5");
  const [height, setHeight] = useState("3");
  const [thickness, setThickness] = useState("12");
  const [mixRatio, setMixRatio] = useState("1:6");

  const results = useMemo(() => {

    const l = Number(length) || 0;
    const h = Number(height) || 0;
    const t = Number(thickness) || 0;

    const parts = mixRatio.split(":");

    const cementPart = Number(parts[0]) || 0;
    const sandPart = Number(parts[1]) || 0;

    const calc = calculatePlaster(l, h, t, cementPart, sandPart);

    return {
      area: calc.area || 0,
      cement: Math.ceil(calc.cementBags || 0),
      sand: calc.sandBrass || 0
    };

  }, [length, height, thickness, mixRatio]);

  return (
    <section
      className="rounded-xl p-6 space-y-10"
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)",
      }}
    >

      <header>
        <h1 className="text-2xl font-bold mb-1">Plaster Calculator</h1>
        <p className="text-sm leading-relaxed">
          Estimate cement and sand required for wall plastering work.
        </p>
      </header>

      <div className="space-y-4">

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
          label="Plaster Thickness (mm)"
          value={thickness}
          onChange={setThickness}
          prefix=""
        />

        <div className="space-y-1">
          <label className="text-sm font-medium">
            Plaster Mix Ratio (Cement : Sand)
          </label>

          <input
            type="text"
            value={mixRatio}
            onChange={(e) => setMixRatio(e.target.value)}
            placeholder="1:6"
            className="w-full border rounded-md px-3 py-2 text-sm"
          />
        </div>

      </div>

      <div className="grid md:grid-cols-3 gap-4">

        <ResultCard
          variant="neutral"
          icon={<BarChart size={20} />}
          label="Plaster Area"
          value={`${results.area.toFixed(2)} m²`}
        />

        <ResultCard
          variant="primary"
          icon={<BarChart size={20} />}
          label="Cement Required"
          value={`${results.cement} bags`}
        />

        <ResultCard
          variant="neutral"
          icon={<BarChart size={20} />}
          label="Sand Required"
          value={`${results.sand.toFixed(2)} brass`}
        />

      </div>

      <PlasterCalculatorArticle />

    </section>
  );
}