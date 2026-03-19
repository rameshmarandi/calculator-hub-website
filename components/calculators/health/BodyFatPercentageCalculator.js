"use client";

import { useState } from "react";
import { Calculator, BarChart } from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { ResultCard } from "../../ResultCard";
import BodyFatPercentageCalculatorArticle from "../../content/health/BodyFatPercentageCalculatorArticle";

export default function BodyFatPercentageCalculator() {

  const [gender, setGender] = useState("male");

  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [neck, setNeck] = useState("");
  const [waist, setWaist] = useState("");
  const [hip, setHip] = useState("");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- CATEGORY ---------------- */

  function getCategory(bf, gender) {

    if (gender === "male") {
      if (bf < 6) return "Essential Fat";
      if (bf < 14) return "Athletic";
      if (bf < 18) return "Fitness";
      if (bf < 25) return "Average";
      return "Obese";
    }

    if (bf < 14) return "Essential Fat";
    if (bf < 21) return "Athletic";
    if (bf < 25) return "Fitness";
    if (bf < 32) return "Average";
    return "Obese";
  }

  /* ---------------- VALIDATION ---------------- */

  function validate() {

    const h = Number(height);
    const n = Number(neck);
    const w = Number(waist);
    const hp = Number(hip);
    const a = Number(age);

    if (!a || a < 5 || a > 120) {
      setError("Please enter a valid age.");
      return false;
    }

    if (h < 120 || h > 230) {
      setError("Height must be between 120 cm and 230 cm.");
      return false;
    }

    if (n < 20 || n > 60) {
      setError("Neck measurement seems unrealistic.");
      return false;
    }

    if (w < 50 || w > 200) {
      setError("Waist measurement seems unrealistic.");
      return false;
    }

    if (gender === "female" && (hp < 60 || hp > 200)) {
      setError("Hip measurement seems unrealistic.");
      return false;
    }

    if (gender === "male" && w <= n) {
      setError("Waist must be larger than neck.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- CALCULATION ---------------- */

  function calculateBodyFat(e) {

    e.preventDefault();

    if (!validate()) return;

    const h = Number(height);
    const n = Number(neck);
    const w = Number(waist);
    const hp = Number(hip);

    let bodyFat = 0;

    // US Navy Method

    if (gender === "male") {

      bodyFat =
        86.01 * Math.log10(w - n) -
        70.041 * Math.log10(h) +
        36.76;

    } else {

      bodyFat =
        163.205 * Math.log10(w + hp - n) -
        97.684 * Math.log10(h) -
        78.387;

    }

    const bf = Number(bodyFat.toFixed(1));

    setResult({
      bodyFat: bf,
      category: getCategory(bf, gender)
    });

  }

  return (
    <section
      className="rounded-xl p-6 space-y-10"
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)"
      }}
    >

      {/* ================= HEADER ================= */}

      <header>
        <h1 className="text-2xl font-bold mb-1">
          Body Fat Percentage Calculator
        </h1>

        <p className="text-sm leading-relaxed">
          Use this Body Fat Percentage Calculator to estimate your body fat
          using the US Navy method based on body measurements.
        </p>
      </header>

      {/* ================= FORM ================= */}

      <form onSubmit={calculateBodyFat} className="space-y-4">

        {/* Gender Tabs */}

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
              color: gender === "male" ? "#fff" : "var(--text)"
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
              borderLeft: "1px solid var(--border)"
            }}
          >
            Female
          </button>

        </div>


        {/* Inputs */}

        <AmountInput
          label="Age (years)"
          value={age}
          onChange={setAge}
          placeholder="30"
          prefix=""
        />

        <AmountInput
          label="Height (cm)"
          value={height}
          onChange={setHeight}
          placeholder="170"
          prefix=""
        />

        <AmountInput
          label="Neck Circumference (cm)"
          value={neck}
          onChange={setNeck}
          placeholder="38"
          prefix=""
        />

        <AmountInput
          label="Waist Circumference (cm)"
          value={waist}
          onChange={setWaist}
          placeholder="85"
          prefix=""
        />

        {gender === "female" && (
          <AmountInput
            label="Hip Circumference (cm)"
            value={hip}
            onChange={setHip}
            placeholder="95"
            prefix=""
          />
        )}

        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        <button
          type="submit"
          className="w-full py-2.5 rounded-md font-medium flex items-center justify-center gap-2"
          style={{
            backgroundColor: "var(--primary)",
            color: "#fff"
          }}
        >
          <Calculator size={18} />
          Calculate Body Fat %
        </button>

      </form>


      {/* ================= RESULT ================= */}

      {result && (

        <div className="space-y-3" aria-live="polite">

          <ResultCard
            variant="primary"
            icon={<BarChart size={20} />}
            label="Body Fat Percentage"
            value={`${result.bodyFat} %`}
          />

          <ResultCard
            variant="secondary"
            label="Category"
            value={result.category}
          />

        </div>

      )}

      {/* ================= ARTICLE ================= */}

      <BodyFatPercentageCalculatorArticle />

    </section>
  );
}