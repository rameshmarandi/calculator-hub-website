"use client";

import { useState } from "react";
import { Calculator, Ruler } from "lucide-react";

import { ResultCard } from "../../ResultCard";

export default function UnitConverter() {
  const [value, setValue] = useState("");
  const [category, setCategory] = useState("length");
  const [fromUnit, setFromUnit] = useState("");
  const [toUnit, setToUnit] = useState("");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- UNIT DEFINITIONS ---------------- */
  const units = {
    length: {
      meter: 1,
      kilometer: 1000,
      centimeter: 0.01,
      millimeter: 0.001,
      mile: 1609.34,
      foot: 0.3048,
      inch: 0.0254,
    },
    weight: {
      kilogram: 1,
      gram: 0.001,
      milligram: 0.000001,
      pound: 0.453592,
      ounce: 0.0283495,
    },
    temperature: {
      celsius: "celsius",
      fahrenheit: "fahrenheit",
      kelvin: "kelvin",
    },
  };

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    if (value === "" || isNaN(value)) {
      setError("Please enter a valid numeric value.");
      return false;
    }

    if (!fromUnit || !toUnit) {
      setError("Please select both units.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- CONVERSION LOGIC ---------------- */
  function convertUnits(e) {
    e.preventDefault();
    if (!validate()) return;

    let convertedValue = 0;

    if (category === "temperature") {
      const v = Number(value);

      if (fromUnit === toUnit) {
        convertedValue = v;
      } else if (fromUnit === "celsius") {
        convertedValue =
          toUnit === "fahrenheit"
            ? (v * 9) / 5 + 32
            : v + 273.15;
      } else if (fromUnit === "fahrenheit") {
        convertedValue =
          toUnit === "celsius"
            ? ((v - 32) * 5) / 9
            : ((v - 32) * 5) / 9 + 273.15;
      } else if (fromUnit === "kelvin") {
        convertedValue =
          toUnit === "celsius"
            ? v - 273.15
            : (v - 273.15) * (9 / 5) + 32;
      }
    } else {
      const baseValue = Number(value) * units[category][fromUnit];
      convertedValue = baseValue / units[category][toUnit];
    }

    setResult({
      convertedValue: convertedValue.toFixed(4),
      fromUnit,
      toUnit,
    });
  }

  const unitOptions =
    category === "temperature"
      ? Object.keys(units.temperature)
      : Object.keys(units[category]);

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
          Unit Converter
        </h1>
        <p className="text-sm leading-relaxed">
          Convert units instantly using this Unit Converter. It supports
          length, weight, and temperature conversions with accurate
          results.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={convertUnits} className="space-y-4">
        {/* Value */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Value</label>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter value"
            className="w-full px-3 py-2 rounded"
            style={{
              border: "1px solid var(--border)",
              backgroundColor: "var(--surface)",
            }}
          />
        </div>

        {/* Category */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Unit Category</label>
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setFromUnit("");
              setToUnit("");
              setResult(null);
            }}
            className="w-full px-3 py-2 rounded"
            style={{
              border: "1px solid var(--border)",
              backgroundColor: "var(--surface)",
            }}
          >
            <option value="length">Length</option>
            <option value="weight">Weight</option>
            <option value="temperature">Temperature</option>
          </select>
        </div>

        {/* Units */}
        <div className="flex gap-3">
          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
            className="w-full px-3 py-2 rounded"
            style={{
              border: "1px solid var(--border)",
              backgroundColor: "var(--surface)",
            }}
          >
            <option value="">From</option>
            {unitOptions.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>

          <select
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
            className="w-full px-3 py-2 rounded"
            style={{
              border: "1px solid var(--border)",
              backgroundColor: "var(--surface)",
            }}
          >
            <option value="">To</option>
            {unitOptions.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
        </div>

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
          Convert Units
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <div aria-live="polite">
          <ResultCard
            variant="primary"
            icon={<Ruler size={20} />}
            label="Converted Value"
            value={`${result.convertedValue} ${result.toUnit}`}
          />
        </div>
      )}

      {/* ================= SEO BLOG CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          What Is a Unit Converter?
        </h2>

        <p>
          A Unit Converter is a utility tool that allows you to convert
          measurements from one unit to another. It is commonly used in
          education, engineering, science, travel, and daily activities.
        </p>

        <h3 className="font-semibold">
          Supported Unit Conversions
        </h3>

        <ul className="list-disc pl-5">
          <li>Length (meter, kilometer, mile, inch, etc.)</li>
          <li>Weight (kilogram, gram, pound, ounce)</li>
          <li>Temperature (Celsius, Fahrenheit, Kelvin)</li>
        </ul>

        <h3 className="font-semibold">
          Why Use a Unit Converter?
        </h3>

        <ul className="list-disc pl-5">
          <li>Fast and accurate conversions</li>
          <li>Eliminates manual calculation errors</li>
          <li>Useful for students and professionals</li>
          <li>Works for multiple unit categories</li>
        </ul>

        <p>
          This unit converter uses standard conversion formulas to
          provide reliable and precise results.
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ Unit conversion results are calculated using standard
        mathematical formulas and are provided for informational
        purposes only.
      </aside>
    </section>
  );
}
