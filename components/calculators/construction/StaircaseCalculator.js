"use client";

import { useState } from "react";
import { Calculator, BarChart } from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { PercentageInput } from "../../inputs/PercentageInput";
import { ResultCard } from "../../ResultCard";

export default function StaircaseCalculator() {
  const [floorHeight, setFloorHeight] = useState("");
  const [riserHeight, setRiserHeight] = useState("150");
  const [treadDepth, setTreadDepth] = useState("270");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    if (!floorHeight || Number(floorHeight) <= 0) {
      setError("Please enter valid floor height.");
      return false;
    }

    if (!riserHeight || Number(riserHeight) <= 0) {
      setError("Please enter valid riser height.");
      return false;
    }

    if (!treadDepth || Number(treadDepth) <= 0) {
      setError("Please enter valid tread depth.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- CALCULATION ---------------- */
  function calculateStaircase(e) {
    e.preventDefault();
    if (!validate()) return;

    const heightMM = Number(floorHeight);
    const riserMM = Number(riserHeight);
    const treadMM = Number(treadDepth);

    const steps = Math.round(heightMM / riserMM);
    const actualRiser = heightMM / steps;
    const totalRun = steps * treadMM;

    setResult({
      steps,
      riser: actualRiser.toFixed(1),
      tread: treadMM,
      run: (totalRun / 1000).toFixed(2),
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
        <h1 className="text-2xl font-bold mb-1">Staircase Calculator</h1>
        <p className="text-sm leading-relaxed">
          Use this Staircase Calculator to calculate the number of steps, riser
          height, tread depth, and total staircase length.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateStaircase} className="space-y-4">
        <AmountInput
          label="Floor Height (mm)"
          value={floorHeight}
          onChange={setFloorHeight}
          placeholder="3000"
        />

        <PercentageInput
          label="Preferred Riser Height (mm)"
          value={riserHeight}
          onChange={setRiserHeight}
          placeholder="150"
        />

        <PercentageInput
          label="Tread Depth (mm)"
          value={treadDepth}
          onChange={setTreadDepth}
          placeholder="270"
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
          Calculate Staircase
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <div className="grid md:grid-cols-4 gap-4" aria-live="polite">
          <ResultCard
            variant="primary"
            icon={<BarChart size={20} />}
            label="Number of Steps"
            value={`${result.steps}`}
          />

          <ResultCard
            variant="neutral"
            icon={<BarChart size={20} />}
            label="Actual Riser Height"
            value={`${result.riser} mm`}
          />

          <ResultCard
            variant="neutral"
            icon={<BarChart size={20} />}
            label="Tread Depth"
            value={`${result.tread} mm`}
          />

          <ResultCard
            variant="neutral"
            icon={<BarChart size={20} />}
            label="Total Staircase Run"
            value={`${result.run} m`}
          />
        </div>
      )}

      {/* ================= SEO BLOG CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          How to Calculate Staircase Dimensions
        </h2>

        <p>
          Staircase calculation is essential for comfortable and safe movement
          between floors. Proper riser height and tread depth ensure ease of
          walking and compliance with building norms.
        </p>

        <h3 className="font-semibold">Staircase Calculation Formula</h3>

        <p
          className="font-mono text-xs p-3 rounded"
          style={{ backgroundColor: "var(--surface-2)" }}>
          Number of Steps = Floor Height ÷ Riser Height Actual Riser = Floor
          Height ÷ Number of Steps Total Run = Number of Steps × Tread Depth
        </p>

        <ul className="list-disc pl-5">
          <li>Ideal riser height: 150–175 mm</li>
          <li>Ideal tread depth: 250–300 mm</li>
          <li>2R + T ≈ 600–630 mm for comfort</li>
        </ul>

        <h3 className="font-semibold">Why Use a Staircase Calculator?</h3>

        <ul className="list-disc pl-5">
          <li>Ensures comfortable stair design</li>
          <li>Helps follow building standards</li>
          <li>Prevents steep or unsafe stairs</li>
          <li>Useful for houses & commercial buildings</li>
        </ul>

        <p>
          This staircase calculator provides a quick and reliable estimate for
          planning residential and commercial staircases.
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ This calculator provides an estimate only. Final staircase design
        should comply with local building codes and regulations.
      </aside>
    </section>
  );
}
