"use client";

import { useMemo, useState } from "react";
import { BarChart } from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { ResultCard } from "../../ResultCard";
import RainwaterHarvestingCalculatorArticle from "../../content/construction/RainwaterHarvestingCalculatorArticle";
import { calculateRainwaterHarvesting } from "../../../lib/formulas";


export default function RainwaterHarvestingCalculator() {

  const [roofArea, setRoofArea] = useState("100");
  const [rainfall, setRainfall] = useState("800");
  const [runoffCoefficient, setRunoffCoefficient] = useState("0.8");

  const results = useMemo(() => {

    const area = Number(roofArea) || 0;
    const rainMM = Number(rainfall) || 0;
    const coeff = Number(runoffCoefficient) || 0;

    const calc = calculateRainwaterHarvesting(area, rainMM, coeff);

    const formatter = new Intl.NumberFormat("en-IN");

    return {
      volume: formatter.format(calc.volumeM3.toFixed(2)),
      liters: formatter.format(Math.round(calc.liters))
    };

  }, [roofArea, rainfall, runoffCoefficient]);

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
          Rainwater Harvesting Calculator
        </h1>

        <p className="text-sm leading-relaxed">
          Estimate how much rainwater you can collect annually from your rooftop.
        </p>
      </header>

      <div className="space-y-4">

        <AmountInput
          label="Roof Area (square meters)"
          value={roofArea}
          onChange={setRoofArea}
          prefix=""
        />

        <AmountInput
          label="Annual Rainfall (mm)"
          value={rainfall}
          onChange={setRainfall}
          prefix=""
        />

        <AmountInput
          label="Runoff Coefficient (0 - 1)"
          value={runoffCoefficient}
          onChange={setRunoffCoefficient}
          prefix=""
        />

      </div>

      <div className="grid md:grid-cols-2 gap-4">

        <ResultCard
          variant="neutral"
          icon={<BarChart size={20} />}
          label="Harvested Water Volume"
          value={`${results.volume} m³`}
        />

        <ResultCard
          variant="primary"
          icon={<BarChart size={20} />}
          label="Harvested Water"
          value={`${results.liters} liters`}
        />

      </div>

      <RainwaterHarvestingCalculatorArticle />

    </section>
  );
}