"use client";

import { useState } from "react";
import { Calculator, BarChart } from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { ResultCard } from "../../ResultCard";
import PlasterCalculatorArticle from "../../content/construction/PlasterCalculatorArticle";

export default function PlasterCalculator() {
  const [length, setLength] = useState("");
  const [height, setHeight] = useState("");
  const [thickness, setThickness] = useState("12");
  const [mixRatio, setMixRatio] = useState("1:6");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    const l = Number(length);
    const h = Number(height);
    const t = Number(thickness);

    if (!l || l <= 0) {
      setError("Please enter a valid wall length.");
      return false;
    }

    if (!h || h <= 0) {
      setError("Please enter a valid wall height.");
      return false;
    }

    if (!t || t <= 0) {
      setError("Please enter a valid plaster thickness.");
      return false;
    }

    const parts = mixRatio.split(":");

    if (parts.length !== 2) {
      setError("Mix ratio must be in format like 1:6");
      return false;
    }

    const cement = Number(parts[0]);
    const sand = Number(parts[1]);

    if (!cement || !sand) {
      setError("Invalid mix ratio values.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- CALCULATION ---------------- */
  function calculatePlaster(e) {
    e.preventDefault();
    if (!validate()) return;

    const l = Number(length);
    const h = Number(height);
    const t = Number(thickness) / 1000;

    const [cementPart, sandPart] = mixRatio.split(":").map(Number);

    const wallArea = l * h;

    const wetVolume = wallArea * t;

    const dryVolumeFactor = 1.33;
    const dryVolume = wetVolume * dryVolumeFactor;

    const totalParts = cementPart + sandPart;

    const cementVolume = (cementPart / totalParts) * dryVolume;
    const sandVolume = (sandPart / totalParts) * dryVolume;

    const cementBagVolume = 0.035;
    const cementBags = cementVolume / cementBagVolume;

    const cubicMeterToBrass = 2.83;
    const sandBrass = sandVolume / cubicMeterToBrass;

    setResult({
      area: wallArea.toFixed(2),
      cement: Math.ceil(cementBags),
      sand: sandBrass.toFixed(2),
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
        <h1 className="text-2xl font-bold mb-1">Plaster Calculator</h1>
        <p className="text-sm leading-relaxed">
          Use this Plaster Calculator to estimate cement and sand required for
          wall plastering work.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculatePlaster} className="space-y-4">
        <AmountInput
          label="Wall Length (meters)"
          value={length}
          onChange={setLength}
          placeholder="5"
          prefix=""
        />

        <AmountInput
          label="Wall Height (meters)"
          value={height}
          onChange={setHeight}
          placeholder="3"
          prefix=""
        />

        <AmountInput
          label="Plaster Thickness (mm)"
          value={thickness}
          onChange={setThickness}
          placeholder="12"
          prefix=""
        />

        {/* Mix Ratio Input */}
        <div className="space-y-1">
          <label className="text-sm font-medium">
            Plaster Mix Ratio (Cement : Sand)
          </label>
          <input
            type="text"
            value={mixRatio}
            onChange={(e) => setMixRatio(e.target.value)}
            placeholder="1:6"
            className="w-full border rounded-md px-3 py-2 text-sm"
          />
        </div>

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
          Calculate Plaster Quantity
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <div className="grid md:grid-cols-3 gap-4" aria-live="polite">
          <ResultCard
            variant="neutral"
            icon={<BarChart size={20} />}
            label="Plaster Area"
            value={`${result.area} m²`}
          />

          <ResultCard
            variant="primary"
            icon={<BarChart size={20} />}
            label="Cement Required"
            value={`${result.cement} bags`}
          />

          <ResultCard
            variant="neutral"
            icon={<BarChart size={20} />}
            label="Sand Required"
            value={`${result.sand} brass`}
          />
        </div>
      )}

      {/* ================= ARTICLE ================= */}
      <PlasterCalculatorArticle />
    </section>
  );
}