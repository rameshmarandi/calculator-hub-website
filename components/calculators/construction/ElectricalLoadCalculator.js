"use client";

import { useState } from "react";
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
  const [lights, setLights] = useState("");
  const [fans, setFans] = useState("");
  const [ac, setAC] = useState("");
  const [refrigerator, setRefrigerator] = useState("");
  const [otherLoad, setOtherLoad] = useState("");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------- NUMBER PARSER ---------- */
  const parseValue = (value) => {
    if (!value) return 0;
    const cleaned = value.toString().replace(/,/g, "");
    return Math.max(0, Number(cleaned) || 0);
  };

  /* ---------- VALIDATION ---------- */
  function validate() {
    if (
      parseValue(lights) < 0 ||
      parseValue(fans) < 0 ||
      parseValue(ac) < 0 ||
      parseValue(refrigerator) < 0 ||
      parseValue(otherLoad) < 0
    ) {
      setError("Values cannot be negative.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------- CALCULATION ---------- */
  function calculateElectricalLoad(e) {
    e.preventDefault();
    if (!validate()) return;

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

    setResult({
      watts: totalWatts.toFixed(0),
      kw: totalKW.toFixed(2),
    });
  }

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
          Use this Electrical Load Calculator to estimate the total
          electricity demand of your house or building. Enter the
          number of appliances to calculate the total electrical
          load in watts and kilowatts.
        </p>
      </header>

      {/* ---------- FORM ---------- */}
      <form
        onSubmit={calculateElectricalLoad}
        className="space-y-4"
      >
        <AmountInput
          label="Number of Lights"
          value={lights}
          onChange={setLights}
          placeholder="10"
          prefix=""
        />

        <AmountInput
          label="Number of Fans"
          value={fans}
          onChange={setFans}
          placeholder="5"
          prefix=""
        />

        <AmountInput
          label="Number of Air Conditioners"
          value={ac}
          onChange={setAC}
          placeholder="1"
          prefix=""
        />

        <AmountInput
          label="Number of Refrigerators"
          value={refrigerator}
          onChange={setRefrigerator}
          placeholder="1"
          prefix=""
        />

        <AmountInput
          label="Other Load (Watts)"
          value={otherLoad}
          onChange={setOtherLoad}
          placeholder="500"
          prefix=""
        />

        {error && (
          <p className="text-sm text-red-500">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full py-2.5 rounded-md font-medium flex items-center justify-center gap-2"
          style={{
            backgroundColor: "var(--primary)",
            color: "#fff",
          }}
        >
          <Calculator size={18} />
          Calculate Electrical Load
        </button>
      </form>

      {/* ---------- RESULT ---------- */}
      {result && (
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
      )}

      {/* ---------- ARTICLE CONTENT ---------- */}
      <ElectricalLoadCalculatorArticle />
    </section>
  );
}