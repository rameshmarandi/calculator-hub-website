"use client";

import { useState } from "react";
import { Calculator, BarChart } from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { ResultCard } from "../../ResultCard";
import BeamLoadCalculatorArticle from "../../content/construction/BeamLoadCalculatorArticle";

export default function BeamLoadCalculator() {
  const [beamLength, setBeamLength] = useState("");
  const [beamWidth, setBeamWidth] = useState("");
  const [beamDepth, setBeamDepth] = useState("");
  const [liveLoad, setLiveLoad] = useState("3"); // kN/m

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */

  function validate() {
    const L = Number(beamLength);
    const B = Number(beamWidth);
    const D = Number(beamDepth);
    const LL = Number(liveLoad);

    if (!L || L <= 0) {
      setError("Please enter a valid beam length.");
      return false;
    }

    if (!B || B <= 0) {
      setError("Please enter a valid beam width.");
      return false;
    }

    if (!D || D <= 0) {
      setError("Please enter a valid beam depth.");
      return false;
    }

    if (!LL || LL <= 0) {
      setError("Please enter a valid live load.");
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
    const liveLoadPerMeter = Number(liveLoad);

    // Convert mm → meters
    const widthM = B / 1000;
    const depthM = D / 1000;

    // RCC density ≈ 25 kN/m³
    const concreteDensity = 25;

    // Self weight of beam per meter
    const selfWeight = widthM * depthM * concreteDensity;

    // Total load per meter
    const totalLoadPerMeter = selfWeight + liveLoadPerMeter;

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
          Estimate the self weight and total structural load acting on an RCC
          beam. Enter the beam dimensions and live load to quickly calculate
          load per meter and total load on the beam.
        </p>
      </header>

      {/* ================= FORM ================= */}

      <form onSubmit={calculateBeamLoad} className="space-y-4">

        <AmountInput
          label="Beam Length (meters)"
          value={beamLength}
          onChange={setBeamLength}
          placeholder="4"
          prefix=""
        />

        <AmountInput
          label="Beam Width (mm)"
          value={beamWidth}
          onChange={setBeamWidth}
          placeholder="230"
           prefix=""
        />

        <AmountInput
          label="Beam Depth (mm)"
          value={beamDepth}
          onChange={setBeamDepth}
          placeholder="450"
           prefix=""
        />

        <AmountInput
          label="Live Load (kN/m)"
          value={liveLoad}
          onChange={setLiveLoad}
          placeholder="3"
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
          Calculate Beam Load
        </button>
      </form>

      {/* ================= RESULTS ================= */}

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

      {/* ================= ARTICLE ================= */}

      <BeamLoadCalculatorArticle />

    </section>
  );
}