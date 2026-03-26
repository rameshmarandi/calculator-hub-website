"use client";

import { useMemo, useState } from "react";
import { BarChart } from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { ResultCard } from "../../ResultCard";
import WaterTankCapacityCalculatorArticle from "../../content/construction/WaterTankCapacityCalculatorArticle";
import { calculateWaterTankCapacity } from "../../../lib/formulas";


export default function WaterTankCapacityCalculator() {

  const [length, setLength] = useState("2");
  const [width, setWidth] = useState("1.5");
  const [height, setHeight] = useState("1.5");

  const results = useMemo(() => {

    const l = Number(length) || 0;
    const w = Number(width) || 0;
    const h = Number(height) || 0;

    const calc = calculateWaterTankCapacity(l, w, h);

    return {
      volume: calc.volume.toFixed(2),
      liters: Math.round(calc.liters).toLocaleString(),
      gallons: Math.round(calc.gallons).toLocaleString()
    };

  }, [length, width, height]);

  return (
    <section
      className="rounded-xl p-6 space-y-10"
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)",
      }}
    >

      <header>
        <h1 className="text-2xl font-bold mb-1">
          Water Tank Capacity Calculator
        </h1>

        <p className="text-sm leading-relaxed">
          Calculate the capacity of a rectangular water tank in liters and gallons.
        </p>
      </header>

      <div className="space-y-4">

        <AmountInput
          label="Tank Length (meters)"
          value={length}
          onChange={setLength}
          prefix=""
        />

        <AmountInput
          label="Tank Width (meters)"
          value={width}
          onChange={setWidth}
          prefix=""
        />

        <AmountInput
          label="Tank Height (meters)"
          value={height}
          onChange={setHeight}
          prefix=""
        />

      </div>

      <div className="grid md:grid-cols-3 gap-4">

        <ResultCard
          variant="neutral"
          icon={<BarChart size={20} />}
          label="Tank Volume"
          value={`${results.volume} m³`}
        />

        <ResultCard
          variant="primary"
          icon={<BarChart size={20} />}
          label="Capacity (Liters)"
          value={`${results.liters} L`}
        />

        <ResultCard
          variant="neutral"
          icon={<BarChart size={20} />}
          label="Capacity (Gallons)"
          value={`${results.gallons} gal`}
        />

      </div>

      <WaterTankCapacityCalculatorArticle />

    </section>
  );
}