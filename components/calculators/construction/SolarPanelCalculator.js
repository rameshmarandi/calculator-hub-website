"use client";

import { useMemo, useState } from "react";
import { BarChart } from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { ResultCard } from "../../ResultCard";
import SolarPanelCalculatorArticle from "../../content/construction/SolarPanelCalculatorArticle";

/* ---------- SAFE PARSER ---------- */

function parseNumber(value) {
  const num = Number(String(value).replace(/,/g, ""));
  return Number.isFinite(num) ? num : 0;
}

function formatNumber(value) {
  return Number(value).toLocaleString("en-IN");
}

export default function SolarPanelCalculator() {

  const [monthlyUnits, setMonthlyUnits] = useState("300");
  const [sunHours, setSunHours] = useState("5");
  const [panelWatt, setPanelWatt] = useState("550");

  const result = useMemo(() => {

    const monthly = parseNumber(monthlyUnits);
    const hours = parseNumber(sunHours);
    const watt = parseNumber(panelWatt);

    const unitsPerDay = monthly / 30;

    const systemKW = hours > 0 ? unitsPerDay / hours : 0;

    const panelsRequired =
      watt > 0 ? (systemKW * 1000) / watt : 0;

    return {
      monthly,
      system: systemKW.toFixed(2),
      panels: Math.ceil(panelsRequired)
    };

  }, [monthlyUnits, sunHours, panelWatt]);

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
          Solar Panel Calculator
        </h1>

        <p className="text-sm leading-relaxed">
          Estimate the solar system size and number of panels required
          based on your monthly electricity usage.
        </p>
      </header>

      {/* INPUTS */}

      <div className="grid md:grid-cols-2 gap-4">

        <AmountInput
          label="Monthly Electricity Consumption (Units / kWh)"
          value={monthlyUnits}
          onChange={setMonthlyUnits}
          prefix=""
        />

        <AmountInput
          label="Average Sunlight Hours (per day)"
          value={sunHours}
          onChange={setSunHours}
          prefix=""
        />

        <AmountInput
          label="Solar Panel Wattage (W)"
          value={panelWatt}
          onChange={setPanelWatt}
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
          label="Monthly Consumption"
          value={`${formatNumber(result.monthly)} units`}
        />

        <ResultCard
          variant="neutral"
          icon={<BarChart size={20} />}
          label="Required System Size"
          value={`${result.system} kW`}
        />

        <ResultCard
          variant="primary"
          icon={<BarChart size={20} />}
          label="Solar Panels Required"
          value={`${result.panels} panels`}
        />

      </div>

      {/* ARTICLE */}

      <SolarPanelCalculatorArticle />

    </section>
  );
}