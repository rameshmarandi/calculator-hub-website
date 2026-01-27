"use client";

import { useState } from "react";
import { Calculator, BarChart } from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { PercentageInput } from "../../inputs/PercentageInput";
import { ResultCard } from "../../ResultCard";

export default function PlasterCalculator() {
  const [length, setLength] = useState("");
  const [height, setHeight] = useState("");
  const [thickness, setThickness] = useState("12");
  const [mixRatio, setMixRatio] = useState("1:6");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    if (!length || Number(length) <= 0) {
      setError("Please enter valid wall length.");
      return false;
    }

    if (!height || Number(height) <= 0) {
      setError("Please enter valid wall height.");
      return false;
    }

    if (!thickness || Number(thickness) <= 0) {
      setError("Please enter valid plaster thickness.");
      return false;
    }

    if (!mixRatio.includes(":")) {
      setError("Please enter a valid mix ratio (e.g. 1:6).");
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
    const t = Number(thickness) / 1000; // mm → m

    const area = l * h;
    const wetVolume = area * t;
    const dryVolume = wetVolume * 1.33;

    const [cementPart, sandPart] = mixRatio.split(":").map(Number);

    const totalParts = cementPart + sandPart;

    const cementVolume = (cementPart / totalParts) * dryVolume;
    const sandVolume = (sandPart / totalParts) * dryVolume;

    const cementBags = cementVolume / 0.035;
    const sandBrass = sandVolume / 2.83;

    setResult({
      area: area.toFixed(2),
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
      }}>
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
        />

        <AmountInput
          label="Wall Height (meters)"
          value={height}
          onChange={setHeight}
          placeholder="3"
        />

        <AmountInput
          label="Plaster Thickness (mm)"
          value={thickness}
          onChange={setThickness}
          placeholder="12"
        />

        <PercentageInput
          label="Plaster Mix Ratio (Cement : Sand)"
          value={mixRatio}
          onChange={setMixRatio}
          placeholder="1:6"
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

      {/* ================= SEO BLOG CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          How to Calculate Plaster Quantity
        </h2>

        <p>
          Plaster quantity calculation helps estimate the amount of cement and
          sand required for wall plastering. Accurate calculation avoids
          material wastage and controls cost.
        </p>

        <h3 className="font-semibold">Plaster Calculation Formula</h3>

        <p
          className="font-mono text-xs p-3 rounded"
          style={{ backgroundColor: "var(--surface-2)" }}>
          Plaster Area = Length × Height Wet Volume = Area × Thickness Dry
          Volume = Wet Volume × 1.33 Cement / Sand = Ratio ÷ Total Ratio × Dry
          Volume
        </p>

        <ul className="list-disc pl-5">
          <li>Common plaster thickness: 12 mm</li>
          <li>Common plaster ratio: 1:6 (cement:sand)</li>
          <li>Dry volume factor for plaster: 1.33</li>
        </ul>

        <h3 className="font-semibold">Why Use a Plaster Calculator?</h3>

        <ul className="list-disc pl-5">
          <li>Accurate plaster material estimation</li>
          <li>Better cost planning</li>
          <li>Reduces construction wastage</li>
          <li>Useful for homes & commercial buildings</li>
        </ul>

        <p>
          This plaster calculator provides a quick and reliable estimate for
          internal and external wall plastering.
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ This calculator provides an estimate only. Actual plaster requirement
        may vary based on surface condition and workmanship.
      </aside>
    </section>
  );
}
