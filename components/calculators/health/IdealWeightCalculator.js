"use client";

import { useState } from "react";
import { Calculator, BarChart } from "lucide-react";

import { PercentageInput } from "../../inputs/PercentageInput";
import { ResultCard } from "../../ResultCard";

export default function IdealWeightCalculator() {
  const [gender, setGender] = useState("male");
  const [height, setHeight] = useState("");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    if (!height || Number(height) <= 0) {
      setError("Please enter valid height.");
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

    setResult({
      weight: idealWeight.toFixed(1),
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
          style={{ border: "1px solid var(--border)" }}>
          <button
            type="button"
            onClick={() => setGender("male")}
            className="flex-1 py-2 text-sm font-medium"
            style={{
              backgroundColor:
                gender === "male" ? "var(--primary)" : "transparent",
              color: gender === "male" ? "#fff" : "var(--text)",
            }}>
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
            }}>
            Female
          </button>
        </div>

        <PercentageInput
          label="Height (cm)"
          value={height}
          onChange={setHeight}
          placeholder="170"
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
          Calculate Ideal Weight
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <div aria-live="polite">
          <ResultCard
            variant="primary"
            icon={<BarChart size={20} />}
            label="Your Ideal Weight"
            value={`${result.weight} kg`}
          />
        </div>
      )}

      {/* ================= SEO BLOG CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">What is Ideal Body Weight?</h2>

        <p>
          Ideal body weight is an estimated weight range associated with the
          lowest risk of health problems. It depends mainly on height and
          gender.
        </p>

        <h3 className="font-semibold">Ideal Weight Calculation Formula</h3>

        <p
          className="font-mono text-xs p-3 rounded"
          style={{ backgroundColor: "var(--surface-2)" }}>
          Men: 50 + 2.3 × (Height in inches − 60) Women: 45.5 + 2.3 × (Height in
          inches − 60)
        </p>

        <ul className="list-disc pl-5">
          <li>Height is converted from cm to inches</li>
          <li>Formula is known as the Devine Formula</li>
          <li>Commonly used by doctors & dietitians</li>
        </ul>

        <h3 className="font-semibold">Ideal Weight vs BMI</h3>

        <ul className="list-disc pl-5">
          <li>
            <strong>Ideal Weight:</strong> Target weight estimate
          </li>
          <li>
            <strong>BMI:</strong> Weight-to-height ratio
          </li>
        </ul>

        <h3 className="font-semibold">Why Use an Ideal Weight Calculator?</h3>

        <ul className="list-disc pl-5">
          <li>Set realistic fitness goals</li>
          <li>Plan weight loss or weight gain</li>
          <li>Track health progress</li>
          <li>Useful for diet & exercise planning</li>
        </ul>

        <p>
          This ideal weight calculator gives a healthy reference value. Actual
          ideal weight may vary based on body composition and lifestyle.
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ Ideal weight is an estimate and should not be treated as a medical
        diagnosis. Consult a healthcare professional for personalized advice.
      </aside>
    </section>
  );
}
