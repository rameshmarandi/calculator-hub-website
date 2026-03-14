"use client";

import { useState } from "react";
import { Calculator, BarChart } from "lucide-react";

import { PercentageInput } from "../../inputs/PercentageInput";
import { ResultCard } from "../../ResultCard";
import ExcavationCalculatorArticle from "../../content/construction/ExcavationCalculatorArticle";
import { AmountInput } from "../../inputs/AmountInput";

export default function ExcavationCalculator() {
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [depth, setDepth] = useState("");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- FORMAT NUMBER ---------------- */
  function formatNumber(value) {
    if (!value) return "";

    const num = value.toString().replace(/,/g, "");
    if (isNaN(num)) return value;

    return Number(num).toLocaleString("en-IN");
  }

  /* ---------------- INPUT HANDLER ---------------- */
  function handleInput(setter) {
    return (value) => {
      const clean = value.toString().replace(/,/g, "");

      // allow only numbers + decimal
      if (/^\d*\.?\d*$/.test(clean)) {
        setter(clean);
      }
    };
  }

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    if (!length || Number(length) <= 0) {
      setError("Please enter valid excavation length.");
      return false;
    }

    if (!width || Number(width) <= 0) {
      setError("Please enter valid excavation width.");
      return false;
    }

    if (!depth || Number(depth) <= 0) {
      setError("Please enter valid excavation depth.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- CALCULATION ---------------- */
  function calculateExcavation(e) {
    e.preventDefault();

    if (!validate()) return;

    const l = Number(length);
    const w = Number(width);
    const d = Number(depth);

    const volume = l * w * d;
    const volumeCFT = volume * 35.3147;

    setResult({
      volume: Number(volume.toFixed(3)).toLocaleString("en-US"),
      cft: Number(volumeCFT.toFixed(2)).toLocaleString("en-US"),
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
        <h1 className="text-2xl font-bold mb-1">Excavation Calculator</h1>

        <p className="text-sm leading-relaxed">
          Use this Excavation Calculator to calculate the quantity of earthwork
          required for foundation, footing, trench excavation, or site
          preparation.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateExcavation} className="space-y-4">
        <AmountInput
          label="Excavation Length (meters)"
          value={formatNumber(length)}
          onChange={handleInput(setLength)}
          placeholder="5"
          prefix=""
        />

        <AmountInput
          label="Excavation Width (meters)"
          value={formatNumber(width)}
          onChange={handleInput(setWidth)}
          placeholder="3"
          prefix=""
        />

        <AmountInput
          label="Excavation Depth (meters)"
          value={formatNumber(depth)}
          onChange={handleInput(setDepth)}
          placeholder="1.5"
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
          Calculate Excavation
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <div className="grid md:grid-cols-2 gap-4" aria-live="polite">
          <ResultCard
            variant="neutral"
            icon={<BarChart size={20} />}
            label="Excavation Volume"
            value={`${result.volume} m³`}
          />

          <ResultCard
            variant="primary"
            icon={<BarChart size={20} />}
            label="Excavation Volume (Cubic Feet)"
            value={`${result.cft} CFT`}
          />
        </div>
      )}

      {/* ================= SEO ARTICLE ================= */}
      <ExcavationCalculatorArticle />
    </section>
  );
}
