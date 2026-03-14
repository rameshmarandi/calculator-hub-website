"use client";

import { useState } from "react";
import { Calculator, BarChart } from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { ResultCard } from "../../ResultCard";
import SolarPanelCalculatorArticle from "../../content/construction/SolarPanelCalculatorArticle";

/* ---------- FORMAT HELPERS ---------- */

function formatNumber(value) {
  if (!value) return "";
  const num = value.toString().replace(/,/g, "");
  if (isNaN(num)) return "";
  return Number(num).toLocaleString("en-IN");
}

function parseNumber(value) {
  if (!value) return "";
  return value.toString().replace(/,/g, "");
}

export default function SolarPanelCalculator() {
  const [monthlyUnits, setMonthlyUnits] = useState("");
  const [sunHours, setSunHours] = useState("5");
  const [panelWatt, setPanelWatt] = useState("550");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */

  function validate() {
    const monthly = Number(parseNumber(monthlyUnits));
    const hours = Number(parseNumber(sunHours));
    const watt = Number(parseNumber(panelWatt));

    if (!monthly || monthly <= 0) {
      setError("Please enter valid monthly electricity consumption.");
      return false;
    }

    if (!hours || hours <= 0) {
      setError("Please enter valid sun hours.");
      return false;
    }

    if (!watt || watt <= 0) {
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

    const monthly = Number(parseNumber(monthlyUnits));
    const hours = Number(parseNumber(sunHours));
    const watt = Number(parseNumber(panelWatt));

    // Convert monthly usage → daily usage
    const unitsPerDay = monthly / 30;

    // Required system size
    const systemKW = unitsPerDay / hours;

    // Panels required
    const panelsRequired = (systemKW * 1000) / watt;

    setResult({
      monthly: monthly.toLocaleString("en-IN"),
      system: systemKW.toLocaleString("en-IN", {
        maximumFractionDigits: 2,
      }),
      panels: Math.ceil(panelsRequired).toLocaleString("en-IN"),
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
        <h1 className="text-2xl font-bold mb-1">Solar Panel Calculator</h1>

        <p className="text-sm leading-relaxed">
          Use this Solar Panel Calculator to estimate the solar system size and
          number of panels required based on your monthly electricity usage.
        </p>
      </header>

      {/* ================= FORM ================= */}

      <form onSubmit={calculateSolar} className="space-y-4">
        <AmountInput
          label="Monthly Electricity Consumption (Units / kWh)"
          value={formatNumber(monthlyUnits)}
          onChange={(val) => setMonthlyUnits(parseNumber(val))}
          placeholder="300"
          prefix=""
        />

        <AmountInput
          label="Average Sunlight Hours (per day)"
          value={formatNumber(sunHours)}
          onChange={(val) => setSunHours(parseNumber(val))}
          placeholder="5"
          prefix=""
        />

        <AmountInput
          label="Solar Panel Wattage (W)"
          value={formatNumber(panelWatt)}
          onChange={(val) => setPanelWatt(parseNumber(val))}
          placeholder="550"
          prefix=""
        />

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
          Calculate Solar Panels
        </button>
      </form>

      {/* ================= RESULT ================= */}

      {result && (
        <div className="grid md:grid-cols-3 gap-4" aria-live="polite">
          <ResultCard
            variant="neutral"
            icon={<BarChart size={20} />}
            label="Monthly Consumption"
            value={`${result.monthly} units`}
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

      {/* ================= ARTICLE ================= */}

      <SolarPanelCalculatorArticle />
    </section>
  );
}