"use client";

import { useMemo, useState } from "react";
import { Calculator, BarChart } from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { ResultCard } from "../../ResultCard";
import ElectricalLoadCalculatorArticle from "../../content/construction/ElectricalLoadCalculatorArticle";

/* ---------- STANDARD APPLIANCE LOADS (WATTS) ---------- */
const LOAD_CONFIG = {
  LIGHT: 60,
  FAN: 75,
  AC: 1500,
  FRIDGE: 300,
};

export default function ElectricalLoadCalculator() {

  const [lights, setLights] = useState("10");
  const [fans, setFans] = useState("5");
  const [ac, setAC] = useState("1");
  const [refrigerator, setRefrigerator] = useState("1");
  const [otherLoad, setOtherLoad] = useState("500");

  /* ---------- SAFE NUMBER PARSER ---------- */
  const parseValue = (value) => {
    const num = Number(value);
    return Number.isFinite(num) && num > 0 ? num : 0;
  };

  /* ---------- LIVE CALCULATION ---------- */
  const result = useMemo(() => {

    const lightLoad = parseValue(lights) * LOAD_CONFIG.LIGHT;
    const fanLoad = parseValue(fans) * LOAD_CONFIG.FAN;
    const acLoad = parseValue(ac) * LOAD_CONFIG.AC;
    const fridgeLoad = parseValue(refrigerator) * LOAD_CONFIG.FRIDGE;
    const extraLoad = parseValue(otherLoad);

    const totalWatts =
      lightLoad +
      fanLoad +
      acLoad +
      fridgeLoad +
      extraLoad;

    const totalKW = totalWatts / 1000;

    return {
      watts: totalWatts.toFixed(0),
      kw: totalKW.toFixed(2),
    };

  }, [lights, fans, ac, refrigerator, otherLoad]);

  return (
    <section
      className="rounded-xl p-6 space-y-10"
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)",
      }}
    >

      {/* ---------- HEADER ---------- */}
      <header>
        <h1 className="text-2xl font-bold mb-1">
          Electrical Load Calculator
        </h1>
        <p className="text-sm leading-relaxed">
          Estimate the total electrical demand of your home by entering
          the number of appliances. The calculator automatically updates
          the total load in watts and kilowatts.
        </p>
      </header>

      {/* ---------- INPUTS ---------- */}
      <div className="grid md:grid-cols-2 gap-4">

        <AmountInput
          label="Number of Lights"
          value={lights}
          onChange={setLights}
          prefix=""
        />

        <AmountInput
          label="Number of Fans"
          value={fans}
          onChange={setFans}
          prefix=""
        />

        <AmountInput
          label="Number of Air Conditioners"
          value={ac}
          onChange={setAC}
          prefix=""
        />

        <AmountInput
          label="Number of Refrigerators"
          value={refrigerator}
          onChange={setRefrigerator}
          prefix=""
        />

        <AmountInput
          label="Other Load (Watts)"
          value={otherLoad}
          onChange={setOtherLoad}
          prefix=""
        />

      </div>

      {/* ---------- RESULT (ALWAYS VISIBLE) ---------- */}
      <div
        className="grid md:grid-cols-2 gap-4"
        aria-live="polite"
      >
        <ResultCard
          variant="neutral"
          icon={<BarChart size={20} />}
          label="Total Load (Watts)"
          value={`${result.watts} W`}
        />

        <ResultCard
          variant="primary"
          icon={<BarChart size={20} />}
          label="Total Load (Kilowatts)"
          value={`${result.kw} kW`}
        />
      </div>

      {/* ---------- ARTICLE ---------- */}
      <ElectricalLoadCalculatorArticle />

    </section>
  );
}