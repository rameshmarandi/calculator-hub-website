"use client";

import { useState } from "react";
import { Calculator, BarChart } from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { PercentageInput } from "../../inputs/PercentageInput";
import { ResultCard } from "../../ResultCard";

export default function BeamLoadCalculator() {
  const [beamLength, setBeamLength] = useState("");
  const [beamWidth, setBeamWidth] = useState("");
  const [beamDepth, setBeamDepth] = useState("");
  const [liveLoad, setLiveLoad] = useState("3"); // kN/m² (residential)

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    if (!beamLength || Number(beamLength) <= 0) {
      setError("Please enter valid beam length.");
      return false;
    }

    if (!beamWidth || Number(beamWidth) <= 0) {
      setError("Please enter valid beam width.");
      return false;
    }

    if (!beamDepth || Number(beamDepth) <= 0) {
      setError("Please enter valid beam depth.");
      return false;
    }

    if (!liveLoad || Number(liveLoad) <= 0) {
      setError("Please enter valid live load.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- CALCULATION ---------------- */
  function calculateBeamLoad(e) {
    e.preventDefault();
    if (!validate()) return;

    const L = Number(beamLength);
    const B = Number(beamWidth);
    const D = Number(beamDepth);
    const LL = Number(liveLoad);

    // Convert mm → m
    const widthM = B / 1000;
    const depthM = D / 1000;

    // Self weight of RCC beam (25 kN/m³)
    const selfWeight = widthM * depthM * 25;

    // Total load per meter
    const totalLoadPerMeter = selfWeight + LL;

    // Total load on beam
    const totalLoad = totalLoadPerMeter * L;

    setResult({
      selfWeight: selfWeight.toFixed(2),
      loadPerMeter: totalLoadPerMeter.toFixed(2),
      totalLoad: totalLoad.toFixed(2),
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
          Beam Load Calculator
        </h1>
        <p className="text-sm leading-relaxed">
          Use this Beam Load Calculator to estimate self-weight and
          total load acting on an RCC beam for structural design.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateBeamLoad} className="space-y-4">
        <AmountInput
          label="Beam Length (meters)"
          value={beamLength}
          onChange={setBeamLength}
          placeholder="4"
        />

        <AmountInput
          label="Beam Width (mm)"
          value={beamWidth}
          onChange={setBeamWidth}
          placeholder="230"
        />

        <AmountInput
          label="Beam Depth (mm)"
          value={beamDepth}
          onChange={setBeamDepth}
          placeholder="450"
        />

        <PercentageInput
          label="Live Load (kN/m²)"
          value={liveLoad}
          onChange={setLiveLoad}
          placeholder="3"
        />

        {error && (
          <p className="text-sm text-red-500">{error}</p>
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
          Calculate Beam Load
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <div className="grid md:grid-cols-3 gap-4" aria-live="polite">
          <ResultCard
            variant="neutral"
            icon={<BarChart size={20} />}
            label="Beam Self Weight"
            value={`${result.selfWeight} kN/m`}
          />

          <ResultCard
            variant="primary"
            icon={<BarChart size={20} />}
            label="Total Load per Meter"
            value={`${result.loadPerMeter} kN/m`}
          />

          <ResultCard
            variant="neutral"
            icon={<BarChart size={20} />}
            label="Total Load on Beam"
            value={`${result.totalLoad} kN`}
          />
        </div>
      )}

      {/* ================= SEO BLOG CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          What is Beam Load?
        </h2>

        <p>
          Beam load refers to the total force acting on a beam due to
          its own weight, live load, and other applied loads. Accurate
          beam load calculation is essential for safe structural
          design.
        </p>

        <h3 className="font-semibold">
          Beam Load Calculation Formula
        </h3>

        <p
          className="font-mono text-xs p-3 rounded"
          style={{ backgroundColor: "var(--surface-2)" }}
        >
          Self Weight = Width × Depth × 25  
          Total Load per meter = Self Weight + Live Load  
          Total Load = Load per meter × Beam Length
        </p>

        <ul className="list-disc pl-5">
          <li>25 kN/m³ is unit weight of RCC</li>
          <li>Live load depends on building usage</li>
          <li>Residential live load ≈ 2–3 kN/m²</li>
        </ul>

        <h3 className="font-semibold">
          Why Use a Beam Load Calculator?
        </h3>

        <ul className="list-disc pl-5">
          <li>Ensures structural safety</li>
          <li>Helps in beam design & reinforcement</li>
          <li>Useful for engineers & contractors</li>
          <li>Prevents overloading failures</li>
        </ul>

        <p>
          This beam load calculator provides a simplified estimate for
          preliminary structural planning and analysis.
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ This calculator provides an estimate only. Final beam design
        should be done by a qualified structural engineer.
      </aside>
    </section>
  );
}
