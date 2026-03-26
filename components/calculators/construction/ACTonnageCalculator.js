"use client";

import { useMemo, useState } from "react";
import { BarChart } from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { ResultCard } from "../../ResultCard";
import ACTonnageCalculatorArticle from "../../content/construction/ACTonnageCalculatorArticle";

/* ---------- SAFE PARSER ---------- */

function parseNumber(value) {
  const num = Number(String(value).replace(/,/g, ""));
  return Number.isFinite(num) ? num : 0;
}

function formatNumber(value) {
  return Number(value).toLocaleString();
}

/* ---------- AC SIZE RECOMMENDATION ---------- */

function getRecommendedAC(tonnage) {
  const sizes = [0.75, 1, 1.5, 2, 2.5, 3, 4, 5];

  for (let size of sizes) {
    if (tonnage <= size) return `${size} Ton`;
  }

  return `${Math.ceil(tonnage)} Ton (Commercial HVAC Required)`;
}

export default function ACTonnageCalculator() {

  const [roomLength, setRoomLength] = useState("5");
  const [roomWidth, setRoomWidth] = useState("4");
  const [roomHeight, setRoomHeight] = useState("3");
  const [people, setPeople] = useState("2");

  const result = useMemo(() => {

    const length = parseNumber(roomLength);
    const width = parseNumber(roomWidth);
    const height = parseNumber(roomHeight);
    const persons = parseNumber(people);

    const area = length * width;

    let btu = area * 600;

    if (height > 3) {
      const heightFactor = height / 3;
      btu = btu * heightFactor;
    }

    if (persons > 2) {
      btu += (persons - 2) * 600;
    }

    const tonnage = btu / 12000;

    return {
      area: area.toFixed(2),
      btu: Math.round(btu),
      tonnage: tonnage.toFixed(2),
      recommended: getRecommendedAC(tonnage),
      largeRoom: area > 80
    };

  }, [roomLength, roomWidth, roomHeight, people]);

  return (
    <section
      className="rounded-xl p-6 space-y-10"
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)"
      }}
    >

      <header className="space-y-3">
        <h1 className="text-2xl font-bold">AC Tonnage Calculator</h1>

        <p className="text-sm leading-relaxed">
          Estimate the correct air conditioner capacity required for your
          room based on room size, ceiling height and occupancy.
        </p>
      </header>

      {/* INPUTS */}

      <div className="grid md:grid-cols-2 gap-4">

        <AmountInput
          label="Room Length (meters)"
          value={roomLength}
          onChange={setRoomLength}
          prefix=""
        />

        <AmountInput
          label="Room Width (meters)"
          value={roomWidth}
          onChange={setRoomWidth}
          prefix=""
        />

        <AmountInput
          label="Room Height (meters)"
          value={roomHeight}
          onChange={setRoomHeight}
          prefix=""
        />

        <AmountInput
          label="Number of People"
          value={people}
          onChange={setPeople}
          prefix=""
        />

      </div>

      {/* RESULTS */}

      <div className="grid md:grid-cols-3 gap-4" aria-live="polite">

        <ResultCard
          variant="neutral"
          icon={<BarChart size={20} />}
          label="Room Area"
          value={`${formatNumber(result.area)} m²`}
        />

        <ResultCard
          variant="neutral"
          icon={<BarChart size={20} />}
          label="Cooling Load"
          value={`${formatNumber(result.btu)} BTU`}
        />

        <ResultCard
          variant="primary"
          icon={<BarChart size={20} />}
          label="Recommended AC Size"
          value={result.recommended}
        />

      </div>

      {/* RESULT EXPLANATION */}

      <div className="space-y-3 text-sm leading-relaxed">
        <h3 className="font-semibold text-lg">
          Understanding Your Result
        </h3>

        <p>
          The calculator estimates cooling load based on room size,
          ceiling height and number of occupants.
        </p>

        <p>
          Air conditioners are sold in standard tonnage sizes.
          The recommended value rounds the calculated load to the
          nearest available AC size.
        </p>

        {result.largeRoom && (
          <p className="text-amber-600">
            Your room area is large. For halls or commercial spaces,
            professional HVAC load calculations are recommended.
          </p>
        )}
      </div>

      <ACTonnageCalculatorArticle />

    </section>
  );
}