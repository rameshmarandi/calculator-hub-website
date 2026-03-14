"use client";

import { useState } from "react";
import { Calculator, BarChart } from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { PercentageInput } from "../../inputs/PercentageInput";
import { ResultCard } from "../../ResultCard";
import WaterTankCapacityCalculatorArticle from "../../content/construction/WaterTankCapacityCalculatorArticle";

export default function WaterTankCapacityCalculator() {
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    if (!length || Number(length) <= 0) {
      setError("Please enter valid tank length.");
      return false;
    }

    if (!width || Number(width) <= 0) {
      setError("Please enter valid tank width.");
      return false;
    }

    if (!height || Number(height) <= 0) {
      setError("Please enter valid tank height.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- CALCULATION ---------------- */
  function calculateTankCapacity(e) {
    e.preventDefault();
    if (!validate()) return;

    const l = Number(length);
    const w = Number(width);
    const h = Number(height);

    // Volume in cubic meters
    const volumeM3 = l * w * h;

    // Conversions
    const liters = volumeM3 * 1000;
    const gallons = liters * 0.264;

    // setResult({
    //   volume: volumeM3.toFixed(2),
    //   liters: liters.toFixed(0),
    //   gallons: gallons.toFixed(0),
    // });

    setResult({
      volume: volumeM3.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
      liters: Math.round(liters).toLocaleString(),
      gallons: Math.round(gallons).toLocaleString(),
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
      {/* ================= HEADER ================= */}
      <header>
        <h1 className="text-2xl font-bold mb-1">
          Water Tank Capacity Calculator
        </h1>
        <p className="text-sm leading-relaxed">
          Use this Water Tank Capacity Calculator to calculate the capacity of a
          rectangular water tank in liters and gallons.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateTankCapacity} className="space-y-4">
        <AmountInput
  label="Tank Length (meters)"
  value={length}
  onChange={setLength}
  placeholder="2"
  prefix=""
/>

<AmountInput
  label="Tank Width (meters)"
  value={width}
  onChange={setWidth}
  placeholder="1.5"
   prefix=""
/>

<AmountInput
  label="Tank Height (meters)"
  value={height}
  onChange={setHeight}
  placeholder="1.5"
   prefix=""
/>
        {/* <PercentageInput
          label="Tank Length (meters)"
          value={length}
          onChange={setLength}
          placeholder="2"
        />

        <PercentageInput
          label="Tank Width (meters)"
          value={width}
          onChange={setWidth}
          placeholder="1.5"
        />

        <PercentageInput
          label="Tank Height (meters)"
          value={height}
          onChange={setHeight}
          placeholder="1.5"
        /> */}

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          className="w-full py-2.5 rounded-md font-medium flex items-center justify-center gap-2"
          style={{
            backgroundColor: "var(--primary)",
            color: "#fff",
          }}
        >
          <Calculator size={18} />
          Calculate Tank Capacity
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <div className="grid md:grid-cols-3 gap-4" aria-live="polite">
          <ResultCard
            variant="neutral"
            icon={<BarChart size={20} />}
            label="Tank Volume"
            value={`${result.volume} m³`}
          />

          <ResultCard
            variant="primary"
            icon={<BarChart size={20} />}
            label="Capacity (Liters)"
            value={`${result.liters} L`}
          />

          <ResultCard
            variant="neutral"
            icon={<BarChart size={20} />}
            label="Capacity (Gallons)"
            value={`${result.gallons} gal`}
          />
        </div>
      )}

      <WaterTankCapacityCalculatorArticle />
    </section>
  );
}
