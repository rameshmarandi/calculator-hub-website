"use client";

import { useState } from "react";
import { Calculator, BarChart } from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { PercentageInput } from "../../inputs/PercentageInput";
import { ResultCard } from "../../ResultCard";

export default function SolarPanelCalculator() {
  const [dailyUnits, setDailyUnits] = useState("");
  const [sunHours, setSunHours] = useState("5");
  const [panelWatt, setPanelWatt] = useState("550");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    if (!dailyUnits || Number(dailyUnits) <= 0) {
      setError("Please enter valid daily electricity consumption.");
      return false;
    }

    if (!sunHours || Number(sunHours) <= 0) {
      setError("Please enter valid sun hours.");
      return false;
    }

    if (!panelWatt || Number(panelWatt) <= 0) {
      setError("Please enter valid panel wattage.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- CALCULATION ---------------- */
  function calculateSolar(e) {
    e.preventDefault();
    if (!validate()) return;

    const unitsPerDay = Number(dailyUnits);
    const hours = Number(sunHours);
    const watt = Number(panelWatt);

    // Required system size (kW)
    const systemKW = unitsPerDay / hours;

    // Number of panels
    const panelsRequired = (systemKW * 1000) / watt;

    setResult({
      units: unitsPerDay.toFixed(1),
      system: systemKW.toFixed(2),
      panels: Math.ceil(panelsRequired),
    });
  }

  return (
    <section
      className="rounded-xl p-6 space-y-10"
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)",
      }}>
      {/* ================= HEADER ================= */}
      <header>
        <h1 className="text-2xl font-bold mb-1">Solar Panel Calculator</h1>
        <p className="text-sm leading-relaxed">
          Use this Solar Panel Calculator to estimate the solar system size and
          number of panels required based on your electricity usage.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateSolar} className="space-y-4">
        <PercentageInput
          label="Daily Electricity Consumption (Units / kWh)"
          value={dailyUnits}
          onChange={setDailyUnits}
          placeholder="10"
        />

        <PercentageInput
          label="Average Sunlight Hours (per day)"
          value={sunHours}
          onChange={setSunHours}
          placeholder="5"
        />

        <PercentageInput
          label="Solar Panel Wattage (W)"
          value={panelWatt}
          onChange={setPanelWatt}
          placeholder="550"
        />

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          className="w-full py-2.5 rounded-md font-medium flex items-center justify-center gap-2"
          style={{
            backgroundColor: "var(--primary)",
            color: "#fff",
          }}>
          <Calculator size={18} />
          Calculate Solar Panels
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <div className="grid md:grid-cols-3 gap-4" aria-live="polite">
          <ResultCard
            variant="neutral"
            icon={<BarChart size={20} />}
            label="Daily Consumption"
            value={`${result.units} units`}
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
      )}

      {/* ================= SEO BLOG CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          How to Calculate Solar Panel Requirement
        </h2>

        <p>
          Solar panel calculation helps determine the right solar system size
          for your home or business. Choosing the correct system size ensures
          maximum savings and efficient power generation.
        </p>

        <h3 className="font-semibold">Solar Panel Calculation Formula</h3>

        <p
          className="font-mono text-xs p-3 rounded"
          style={{ backgroundColor: "var(--surface-2)" }}>
          System Size (kW) = Daily Units ÷ Sunlight Hours Number of Panels =
          (System Size × 1000) ÷ Panel Wattage
        </p>

        <ul className="list-disc pl-5">
          <li>1 unit = 1 kWh</li>
          <li>Average sunlight in India: 4–6 hours/day</li>
          <li>Common panel sizes: 450W, 500W, 550W</li>
        </ul>

        <h3 className="font-semibold">Why Use a Solar Panel Calculator?</h3>

        <ul className="list-disc pl-5">
          <li>Estimate solar system capacity</li>
          <li>Plan rooftop space efficiently</li>
          <li>Reduce electricity bills</li>
          <li>Helpful for subsidy & net-metering planning</li>
        </ul>

        <p>
          This solar panel calculator provides a practical estimate for
          residential rooftop solar installations.
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ This calculator provides an estimate only. Actual solar system size
        may vary based on location, panel efficiency, and system losses.
      </aside>
    </section>
  );
}
