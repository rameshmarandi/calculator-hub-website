"use client";

import { useState, useCallback } from "react";
import { Calculator, BarChart } from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { ResultCard } from "../../ResultCard";
import SteelWeightCalculatorArticle from "../../content/construction/SteelWeightCalculatorArticle";

export default function SteelWeightCalculator() {
  const [diameter, setDiameter] = useState("");
  const [length, setLength] = useState("");
  const [quantity, setQuantity] = useState("1");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- SAFE NUMBER PARSE ---------------- */
  const parseNumber = (value) => {
    const num = Number(value);
    return Number.isFinite(num) ? num : 0;
  };

  /* ---------------- VALIDATION ---------------- */
  const validate = useCallback(() => {
    const d = parseNumber(diameter);
    const l = parseNumber(length);
    const q = parseNumber(quantity);

    if (!d || d <= 0) {
      setError("Please enter a valid bar diameter.");
      return false;
    }

    if (d > 100) {
      setError("Diameter seems unrealistic. Typical bars are below 50 mm.");
      return false;
    }

    if (!l || l <= 0) {
      setError("Please enter a valid bar length.");
      return false;
    }

    if (l > 50) {
      setError("Length seems too large. Please check your value.");
      return false;
    }

    if (!q || q <= 0) {
      setError("Quantity must be at least 1.");
      return false;
    }

    setError("");
    return true;
  }, [diameter, length, quantity]);

  /* ---------------- CALCULATION ---------------- */
  const calculateSteelWeight = useCallback(
    (e) => {
      e.preventDefault();

      if (!validate()) return;

      const d = parseNumber(diameter);
      const l = parseNumber(length);
      const q = parseNumber(quantity);

      // Standard rebar formula
      // Weight (kg/m) = D² / 162
      const weightPerBar = ((d * d) / 162) * l;
      const totalWeight = weightPerBar * q;

      setResult({
        perBar: weightPerBar.toFixed(2),
        total: totalWeight.toFixed(2),
      });
    },
    [diameter, length, quantity, validate]
  );

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
        <h1 className="text-2xl font-bold mb-1">Steel Weight Calculator</h1>
        <p className="text-sm leading-relaxed">
          Use this Steel Weight Calculator to calculate the weight of steel bars
          based on diameter, length, and quantity.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateSteelWeight} className="space-y-4">
        <AmountInput
          label="Bar Diameter (mm)"
          value={diameter}
          onChange={setDiameter}
          placeholder="12"
          prefix=""
        />

        <AmountInput
          label="Bar Length (meters)"
          value={length}
          onChange={setLength}
          placeholder="6"
          prefix=""
        />

        <AmountInput
          label="Number of Bars"
          value={quantity}
          onChange={setQuantity}
          placeholder="10"
          prefix=""
        />

        {error && (
          <p className="text-sm text-red-500" role="alert">
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
          Calculate Steel Weight
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <div className="grid md:grid-cols-2 gap-4" aria-live="polite">
          <ResultCard
            variant="neutral"
            icon={<BarChart size={20} />}
            label="Weight per Bar"
            value={`${result.perBar} kg`}
          />

          <ResultCard
            variant="primary"
            icon={<BarChart size={20} />}
            label="Total Steel Weight"
            value={`${result.total} kg`}
          />
        </div>
      )}

      {/* ================= ARTICLE ================= */}
      <SteelWeightCalculatorArticle />
    </section>
  );
}