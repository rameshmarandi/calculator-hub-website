"use client";

import { useState } from "react";
import { Calculator, BarChart } from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { ResultCard } from "../../ResultCard";
import IdealWeightCalculatorArticle from "../../content/health/IdealWeightCalculatorArticle";

export default function IdealWeightCalculator() {
  const [gender, setGender] = useState("male");
  const [height, setHeight] = useState("");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    const h = Number(height);

    if (!height || isNaN(h)) {
      setError("Please enter your height.");
      return false;
    }

    if (h < 120 || h > 230) {
      setError("Height must be between 120 cm and 230 cm.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- CALCULATION ---------------- */
  function calculateIdealWeight(e) {
    e.preventDefault();
    if (!validate()) return;

    const hCm = Number(height);
    const hInches = hCm / 2.54;

    let idealWeight = 0;

    // Devine Formula
    if (gender === "male") {
      idealWeight = 50 + 2.3 * (hInches - 60);
    } else {
      idealWeight = 45.5 + 2.3 * (hInches - 60);
    }

    const ideal = Number(idealWeight.toFixed(1));

    setResult({
      weight: ideal,
      min: (ideal - 7).toFixed(1),
      max: (ideal + 7).toFixed(1),
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
        <h1 className="text-2xl font-bold mb-1">Ideal Weight Calculator</h1>
        <p className="text-sm leading-relaxed">
          Use this Ideal Weight Calculator to estimate your healthy body weight
          based on height and gender.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateIdealWeight} className="space-y-4">
        {/* ===== Gender Tabs ===== */}
        <div
          className="flex rounded-md overflow-hidden"
          style={{ border: "1px solid var(--border)" }}
        >
          <button
            type="button"
            onClick={() => setGender("male")}
            className="flex-1 py-2 text-sm font-medium"
            style={{
              backgroundColor:
                gender === "male" ? "var(--primary)" : "transparent",
              color: gender === "male" ? "#fff" : "var(--text)",
            }}
          >
            Male
          </button>

          <button
            type="button"
            onClick={() => setGender("female")}
            className="flex-1 py-2 text-sm font-medium"
            style={{
              backgroundColor:
                gender === "female" ? "var(--primary)" : "transparent",
              color: gender === "female" ? "#fff" : "var(--text)",
              borderLeft: "1px solid var(--border)",
            }}
          >
            Female
          </button>
        </div>

        {/* ===== Height Input ===== */}
        <AmountInput
          label="Height (cm)"
          value={height}
          onChange={setHeight}
          placeholder="170"
          prefix=""
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
          Calculate Ideal Weight
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <div aria-live="polite" className="space-y-2">
          <ResultCard
            variant="primary"
            icon={<BarChart size={20} />}
            label="Your Ideal Weight"
            value={`${result.weight} kg`}
          />

          <p className="text-sm">
            Healthy range: <strong>{result.min} – {result.max} kg</strong>
          </p>
        </div>
      )}

      <IdealWeightCalculatorArticle />
    </section>
  );
}