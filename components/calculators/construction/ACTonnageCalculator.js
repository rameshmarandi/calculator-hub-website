"use client";

import { useState } from "react";
import { Calculator, BarChart } from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { ResultCard } from "../../ResultCard";
import ACTonnageCalculatorArticle from "../../content/construction/ACTonnageCalculatorArticle";

/* ---------------- HELPER FUNCTIONS ---------------- */

function parseNumber(value) {
  return Number(String(value).replace(/,/g, ""));
}

function formatNumber(value) {
  return Number(value).toLocaleString();
}

/* Standard AC sizes used in residential HVAC */

function getRecommendedAC(tonnage) {
  const sizes = [0.75, 1, 1.5, 2, 2.5, 3, 4, 5];

  for (let size of sizes) {
    if (tonnage <= size) return `${size} Ton`;
  }

  return `${Math.ceil(tonnage)} Ton (Commercial HVAC Required)`;
}

export default function ACTonnageCalculator() {
  const [roomLength, setRoomLength] = useState("");
  const [roomWidth, setRoomWidth] = useState("");
  const [roomHeight, setRoomHeight] = useState("3");
  const [people, setPeople] = useState("2");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */

  function validate() {
    const length = parseNumber(roomLength);
    const width = parseNumber(roomWidth);
    const height = parseNumber(roomHeight);
    const persons = parseNumber(people);

    if (!length || length <= 0) {
      setError("Please enter a valid room length.");
      return false;
    }

    if (!width || width <= 0) {
      setError("Please enter a valid room width.");
      return false;
    }

    if (!height || height <= 0) {
      setError("Please enter a valid room height.");
      return false;
    }

    if (persons < 0) {
      setError("Number of people cannot be negative.");
      return false;
    }

    if (length > 30 || width > 30) {
      setError(
        "Room dimensions seem unrealistic. Enter values below 30 meters.",
      );
      return false;
    }

    if (height > 6) {
      setError("Room height should normally be below 6 meters.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- CALCULATION ---------------- */

  function calculateACTonnage(e) {
    e.preventDefault();

    if (!validate()) return;

    const length = parseNumber(roomLength);
    const width = parseNumber(roomWidth);
    const height = parseNumber(roomHeight);
    const persons = parseNumber(people);

    const area = length * width;

    /* Base cooling load
       Industry quick estimate: 600 BTU per m² */

    let btu = area * 600;

    /* Ceiling height adjustment
       Standard height assumed = 3 meters */

    if (height > 3) {
      const heightFactor = height / 3;
      btu = btu * heightFactor;
    }

    /* Occupancy heat load
       Each extra person adds ~600 BTU */

    if (persons > 2) {
      btu += (persons - 2) * 600;
    }

    const tonnage = btu / 12000;

    setResult({
      area: area.toFixed(2),
      height: height,
      btu: Math.round(btu),
      tonnage: tonnage.toFixed(2),
      recommended: getRecommendedAC(tonnage),
      largeRoom: area > 80,
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
      {/* HEADER */}

      <header className="space-y-3">
        <h1 className="text-2xl font-bold">AC Tonnage Calculator</h1>

        <p className="text-sm leading-relaxed">
          Use this AC Tonnage Calculator to estimate the correct air conditioner
          capacity required for your room. Enter the room dimensions and number
          of occupants to determine the recommended AC size for efficient
          cooling.
        </p>
      </header>

      {/* FORM */}

      <form onSubmit={calculateACTonnage} className="space-y-4">
        <AmountInput
          label="Room Length (meters)"
          value={roomLength}
          onChange={setRoomLength}
          placeholder="5"
        />

        <AmountInput
          label="Room Width (meters)"
          value={roomWidth}
          onChange={setRoomWidth}
          placeholder="4"
        />

        <AmountInput
          label="Room Height (meters)"
          value={roomHeight}
          onChange={setRoomHeight}
          placeholder="3"
        />

        <AmountInput
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
          }}
        >
          <Calculator size={18} />
          Calculate AC Tonnage
        </button>
      </form>

      {/* RESULTS */}

      {result && (
        <>
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
            <h3 className="font-semibold text-lg">Understanding Your Result</h3>

            <p>
              The calculator estimates the cooling load based on room size,
              ceiling height, and occupancy. Cooling load is measured in BTU,
              which represents the amount of heat an air conditioner must remove
              from the room every hour.
            </p>

            <p>
              The calculated tonnage indicates the approximate cooling capacity
              required. Because air conditioners are available in standard
              sizes, the recommended AC size rounds the calculation to the
              nearest commonly available unit.
            </p>

            <p>
              For example, if the calculated capacity is 1.2 tons, a 1.5 ton air
              conditioner is usually recommended to ensure reliable cooling
              during very hot summer days.
            </p>

            {result.largeRoom && (
              <p className="text-amber-600">
                Your room area is quite large. For halls or commercial
                buildings, professional HVAC load calculations may be required
                for precise system design.
              </p>
            )}
          </div>
        </>
      )}

      {/* SEO ARTICLE */}

      <ACTonnageCalculatorArticle />
    </section>
  );
}
