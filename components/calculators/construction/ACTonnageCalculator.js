"use client";

import { useState } from "react";
import { Calculator, BarChart } from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { PercentageInput } from "../../inputs/PercentageInput";
import { ResultCard } from "../../ResultCard";

export default function ACTonnageCalculator() {
  const [roomLength, setRoomLength] = useState("");
  const [roomWidth, setRoomWidth] = useState("");
  const [roomHeight, setRoomHeight] = useState("3");
  const [people, setPeople] = useState("2");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    if (!roomLength || Number(roomLength) <= 0) {
      setError("Please enter valid room length.");
      return false;
    }

    if (!roomWidth || Number(roomWidth) <= 0) {
      setError("Please enter valid room width.");
      return false;
    }

    if (!roomHeight || Number(roomHeight) <= 0) {
      setError("Please enter valid room height.");
      return false;
    }

    if (Number(people) < 0) {
      setError("Number of people cannot be negative.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- CALCULATION ---------------- */
  function calculateACTonnage(e) {
    e.preventDefault();
    if (!validate()) return;

    const length = Number(roomLength);
    const width = Number(roomWidth);
    const height = Number(roomHeight);
    const persons = Number(people);

    // Room volume (meters)
    const roomVolume = length * width * height;

    // Base cooling load (BTU)
    let btu = roomVolume * 141;

    // Extra load for people (600 BTU per person beyond 2)
    if (persons > 2) {
      btu += (persons - 2) * 600;
    }

    // Convert BTU to tons (1 ton = 12,000 BTU)
    const tonnage = btu / 12000;

    setResult({
      volume: roomVolume.toFixed(2),
      btu: btu.toFixed(0),
      tonnage: tonnage.toFixed(2),
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
        <h1 className="text-2xl font-bold mb-1">AC Tonnage Calculator</h1>
        <p className="text-sm leading-relaxed">
          Use this AC Tonnage Calculator to find the right air conditioner size
          based on your room dimensions and occupancy.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateACTonnage} className="space-y-4">
        <PercentageInput
          label="Room Length (meters)"
          value={roomLength}
          onChange={setRoomLength}
          placeholder="5"
        />

        <PercentageInput
          label="Room Width (meters)"
          value={roomWidth}
          onChange={setRoomWidth}
          placeholder="4"
        />

        <PercentageInput
          label="Room Height (meters)"
          value={roomHeight}
          onChange={setRoomHeight}
          placeholder="3"
        />

        <PercentageInput
          label="Number of People"
          value={people}
          onChange={setPeople}
          placeholder="2"
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
          Calculate AC Tonnage
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <div className="grid md:grid-cols-3 gap-4" aria-live="polite">
          <ResultCard
            variant="neutral"
            icon={<BarChart size={20} />}
            label="Room Volume"
            value={`${result.volume} m³`}
          />

          <ResultCard
            variant="neutral"
            icon={<BarChart size={20} />}
            label="Cooling Load"
            value={`${result.btu} BTU`}
          />

          <ResultCard
            variant="primary"
            icon={<BarChart size={20} />}
            label="Recommended AC Size"
            value={`${result.tonnage} Ton`}
          />
        </div>
      )}

      {/* ================= SEO BLOG CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">How to Calculate AC Tonnage</h2>

        <p>
          AC tonnage calculation helps you choose the correct air conditioner
          capacity for your room. Selecting the right AC size ensures efficient
          cooling, lower electricity bills, and longer AC life.
        </p>

        <h3 className="font-semibold">AC Tonnage Calculation Formula</h3>

        <p
          className="font-mono text-xs p-3 rounded"
          style={{ backgroundColor: "var(--surface-2)" }}>
          Room Volume = Length × Width × Height Cooling Load (BTU) = Room Volume
          × 141 AC Tonnage = BTU ÷ 12,000
        </p>

        <ul className="list-disc pl-5">
          <li>1 Ton AC = 12,000 BTU/hour</li>
          <li>Extra occupants increase cooling load</li>
          <li>Higher ceiling height needs higher tonnage</li>
        </ul>

        <h3 className="font-semibold">Recommended AC Size by Room Area</h3>

        <ul className="list-disc pl-5">
          <li>Up to 120 sq.ft → 1 Ton AC</li>
          <li>120 – 180 sq.ft → 1.5 Ton AC</li>
          <li>180 – 250 sq.ft → 2 Ton AC</li>
        </ul>

        <p>
          This AC tonnage calculator gives a practical estimate for residential
          rooms. For commercial spaces, additional heat sources should be
          considered.
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ This calculator provides an estimate only. Actual AC requirement may
        vary based on insulation, sunlight exposure, and climate.
      </aside>
    </section>
  );
}
