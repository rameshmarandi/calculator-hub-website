"use client";

import { useMemo, useState } from "react";
import { BarChart } from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { ResultCard } from "../../ResultCard";
import HouseConstructionCostArticle from "../../content/construction/HouseConstructionCostCalculatorArticle";
import { calculateHouseConstructionCost } from "../../../lib/formulas";


export default function HouseConstructionCostCalculator() {

  const [length, setLength] = useState("30");
  const [width, setWidth] = useState("40");
  const [costPerSqFt, setCostPerSqFt] = useState("1800");

  const results = useMemo(() => {

    const l = Number(length) || 0;
    const w = Number(width) || 0;
    const rate = Number(costPerSqFt) || 0;

    const calc = calculateHouseConstructionCost(l, w, rate);

    return {
      area: calc.area.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }),
      rate: calc.rate.toLocaleString(),
      total: calc.total.toLocaleString()
    };

  }, [length, width, costPerSqFt]);

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
          House Construction Cost Calculator
        </h1>

        <p className="text-sm leading-relaxed">
          Estimate total house construction cost based on built-up area and
          cost per square foot.
        </p>
      </header>

      <div className="space-y-4">

        <AmountInput
          label="Plot Length (feet)"
          value={length}
          onChange={setLength}
          prefix=""
        />

        <AmountInput
          label="Plot Width (feet)"
          value={width}
          onChange={setWidth}
          prefix=""
        />

        <AmountInput
          label="Construction Cost (₹ per sq.ft)"
          value={costPerSqFt}
          onChange={setCostPerSqFt}
          prefix=""
        />

      </div>

      <div className="grid md:grid-cols-3 gap-4">

        <ResultCard
          variant="neutral"
          icon={<BarChart size={20} />}
          label="Built-Up Area"
          value={`${results.area} sq.ft`}
        />

        <ResultCard
          variant="neutral"
          icon={<BarChart size={20} />}
          label="Cost per Sq.Ft"
          value={`₹ ${results.rate}`}
        />

        <ResultCard
          variant="primary"
          icon={<BarChart size={20} />}
          label="Total Construction Cost"
          value={`₹ ${results.total}`}
        />

      </div>

      <HouseConstructionCostArticle />

    </section>
  );
}