"use client";

import { useMemo, useState } from "react";
import { BarChart } from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { ResultCard } from "../../ResultCard";
import FlooringCostCalculatorArticle from "../../content/construction/FlooringCostCalculatorArticle";
import { calculateFlooringCost } from "../../../lib/formulas";


export default function FlooringCostCalculator() {

  const [length, setLength] = useState("5");
  const [width, setWidth] = useState("4");
  const [tileCost, setTileCost] = useState("120");
  const [laborCost, setLaborCost] = useState("50");

  const results = useMemo(() => {

    const l = Number(length) || 0;
    const w = Number(width) || 0;
    const materialRate = Number(tileCost) || 0;
    const laborRate = Number(laborCost) || 0;

    const calc = calculateFlooringCost(l, w, materialRate, laborRate);

    const formatter = new Intl.NumberFormat("en-IN");

    return {
      area: formatter.format(calc.areaSqFt.toFixed(2)),
      material: formatter.format(calc.materialCost.toFixed(0)),
      labor: formatter.format(calc.laborCost.toFixed(0)),
      total: formatter.format(calc.totalCost.toFixed(0))
    };

  }, [length, width, tileCost, laborCost]);

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
          Flooring Cost Calculator
        </h1>

        <p className="text-sm leading-relaxed">
          Estimate flooring material and labor cost for your home or renovation project.
        </p>
      </header>

      <div className="space-y-4">

        <AmountInput
          label="Floor Length (meters)"
          value={length}
          onChange={setLength}
          prefix=""
        />

        <AmountInput
          label="Floor Width (meters)"
          value={width}
          onChange={setWidth}
             prefix=""
        />

        <AmountInput
          label="Flooring Cost (₹ per sq.ft)"
          value={tileCost}
          onChange={setTileCost}
             prefix=""
        />

        <AmountInput
          label="Labor Cost (₹ per sq.ft)"
          value={laborCost}
          onChange={setLaborCost}
             prefix=""
        />

      </div>

      <div className="grid md:grid-cols-2 gap-4">

        <ResultCard
          variant="neutral"
          icon={<BarChart size={20} />}
          label="Floor Area"
          value={`${results.area} sq.ft`}
        />

        <ResultCard
          variant="neutral"
          icon={<BarChart size={20} />}
          label="Material Cost"
          value={`₹ ${results.material}`}
        />

        <ResultCard
          variant="neutral"
          icon={<BarChart size={20} />}
          label="Labor Cost"
          value={`₹ ${results.labor}`}
        />

        <ResultCard
          variant="primary"
          icon={<BarChart size={20} />}
          label="Total Flooring Cost"
          value={`₹ ${results.total}`}
        />

      </div>

      <FlooringCostCalculatorArticle />

    </section>
  );
}