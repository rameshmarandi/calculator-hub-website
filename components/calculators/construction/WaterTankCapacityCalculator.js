"use client";

import { useState } from "react";
import { Calculator, BarChart } from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { PercentageInput } from "../../inputs/PercentageInput";
import { ResultCard } from "../../ResultCard";

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

    setResult({
      volume: volumeM3.toFixed(2),
      liters: liters.toFixed(0),
      gallons: gallons.toFixed(0),
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
        <PercentageInput
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

      {/* ================= SEO BLOG CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          How to Calculate Water Tank Capacity
        </h2>

        <p>
          Calculating water tank capacity helps determine how much water can be
          stored for domestic, commercial, or agricultural use. It is especially
          useful when selecting overhead or underground water tanks.
        </p>

        <h3 className="font-semibold">Water Tank Capacity Formula</h3>

        <p
          className="font-mono text-xs p-3 rounded"
          style={{ backgroundColor: "var(--surface-2)" }}>
          Tank Volume (m³) = Length × Width × Height Capacity (Liters) = Volume
          × 1000 Capacity (Gallons) = Liters × 0.264
        </p>

        <ul className="list-disc pl-5">
          <li>1 cubic meter = 1000 liters</li>
          <li>1 liter = 0.264 gallons</li>
          <li>Used for rectangular water tanks</li>
        </ul>

        <h3 className="font-semibold">
          Why Use a Water Tank Capacity Calculator?
        </h3>

        <ul className="list-disc pl-5">
          <li>Choose the right tank size</li>
          <li>Plan water storage efficiently</li>
          <li>Avoid under-sized or over-sized tanks</li>
          <li>Useful for homes, apartments & farms</li>
        </ul>

        <p>
          This water tank capacity calculator gives a quick and accurate
          estimate for most rectangular water tanks.
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ This calculator provides an estimate only. Actual tank capacity may
        vary slightly due to internal design and manufacturing tolerance.
      </aside>
    </section>
  );
}
