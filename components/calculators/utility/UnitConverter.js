"use client";

import { useMemo, useState } from "react";
import { Ruler } from "lucide-react";

import { ResultCard } from "../../ResultCard";
import {AmountInput} from "@/components/inputs/AmountInput";
import UnitConverterArticle from "../../content/utility/UnitConverterArticle";

export default function UnitConverter() {
  /* ================= STATE ================= */

  const [value, setValue] = useState(10);
  const [category, setCategory] = useState("length");
  const [fromUnit, setFromUnit] = useState("meter");
  const [toUnit, setToUnit] = useState("kilometer");

  /* ================= UNIT DEFINITIONS ================= */

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

  /* ================= INPUT VALIDATION ================= */

  function handleValueChange(val) {
    let num = Number(val);

    if (isNaN(num) || !isFinite(num)) num = 0;

    // Prevent insane numbers
    if (num > 1_000_000_000) num = 1_000_000_000;
    if (num < -1_000_000_000) num = -1_000_000_000;

    setValue(num);
  }

  /* ================= INTERNAL FORMULA ================= */

  function convertUnits({ value, category, fromUnit, toUnit }) {
    const v = Number(value) || 0;

    // Safe fallback
    if (!fromUnit || !toUnit) {
      return {
        primary: 0,
        breakdown: {},
        stats: {},
        meta: {},
      };
    }

    let convertedValue = 0;

    if (category === "temperature") {
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
      const baseValue =
        v * (units?.[category]?.[fromUnit] || 1);

      convertedValue =
        baseValue / (units?.[category]?.[toUnit] || 1);
    }

    return {
      primary: convertedValue,

      breakdown: {
        from: fromUnit,
        to: toUnit,
      },

      stats: {
        rounded: Number(convertedValue.toFixed(4)),
      },

      meta: {
        unit: toUnit,
      },
    };
  }

  /* ================= DERIVED RESULT ================= */

  const result = useMemo(() => {
    return convertUnits({
      value,
      category,
      fromUnit,
      toUnit,
    });
  }, [value, category, fromUnit, toUnit]);

  /* ================= UNIT OPTIONS ================= */

  const unitOptions =
    category === "temperature"
      ? Object.keys(units.temperature)
      : Object.keys(units[category] || {});

  /* ================= UI ================= */

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
          Convert units instantly across length, weight, and temperature.
        </p>
      </header>

      {/* ================= INPUTS ================= */}
      <div className="space-y-4">
        <AmountInput
          label="Value"
          value={value}
          onChange={handleValueChange}
          prefix=""
        />

        {/* Category */}
        <select
          value={category}
          onChange={(e) => {
            const newCategory = e.target.value;
            setCategory(newCategory);

            const options = Object.keys(units[newCategory]);
            setFromUnit(options[0]);
            setToUnit(options[1] || options[0]);
          }}
          className="w-full px-3 py-2 rounded border"
        >
          <option value="length">Length</option>
          <option value="weight">Weight</option>
          <option value="temperature">Temperature</option>
        </select>

        {/* Units */}
        <div className="grid grid-cols-2 gap-4">
          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
            className="px-3 py-2 rounded border"
          >
            {unitOptions.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>

          <select
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
            className="px-3 py-2 rounded border"
          >
            {unitOptions.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ================= RESULT ================= */}
      <div aria-live="polite">
        <ResultCard
          variant="primary"
          icon={<Ruler size={20} />}
          label="Converted Value"
          value={`${result?.stats?.rounded || 0} ${
            result?.meta?.unit || ""
          }`}
        />
      </div>

      {/* ================= SEO ================= */}
     <UnitConverterArticle/>
    </section>
  );
}