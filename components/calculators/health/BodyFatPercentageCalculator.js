"use client";

import { useState } from "react";
import { Calculator, BarChart } from "lucide-react";

import { PercentageInput } from "../../inputs/PercentageInput";
import { ResultCard } from "../../ResultCard";

export default function BodyFatPercentageCalculator() {
  const [gender, setGender] = useState("male");
  const [height, setHeight] = useState("");
  const [neck, setNeck] = useState("");
  const [waist, setWaist] = useState("");
  const [hip, setHip] = useState("");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    if (!height || Number(height) <= 0) {
      setError("Please enter valid height.");
      return false;
    }

    if (!neck || Number(neck) <= 0) {
      setError("Please enter valid neck measurement.");
      return false;
    }

    if (!waist || Number(waist) <= 0) {
      setError("Please enter valid waist measurement.");
      return false;
    }

    if (gender === "female" && (!hip || Number(hip) <= 0)) {
      setError("Please enter valid hip measurement.");
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
      bodyFat = 86.01 * Math.log10(w - n) - 70.041 * Math.log10(h) + 36.76;
    } else {
      bodyFat =
        163.205 * Math.log10(w + hp - n) - 97.684 * Math.log10(h) - 78.387;
    }

    setResult({
      bodyFat: bodyFat.toFixed(1),
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

        <PercentageInput
          label="Neck Circumference (cm)"
          value={neck}
          onChange={setNeck}
          placeholder="38"
        />

        <PercentageInput
          label="Waist Circumference (cm)"
          value={waist}
          onChange={setWaist}
          placeholder="85"
        />

        {gender === "female" && (
          <PercentageInput
            label="Hip Circumference (cm)"
            value={hip}
            onChange={setHip}
            placeholder="95"
          />
        )}

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          className="w-full py-2.5 rounded-md font-medium flex items-center justify-center gap-2"
          style={{
            backgroundColor: "var(--primary)",
            color: "#fff",
          }}>
          <Calculator size={18} />
          Calculate Body Fat %
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <div aria-live="polite">
          <ResultCard
            variant="primary"
            icon={<BarChart size={20} />}
            label="Body Fat Percentage"
            value={`${result.bodyFat} %`}
          />
        </div>
      )}

      {/* ================= SEO BLOG CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          What is Body Fat Percentage?
        </h2>

        <p>
          Body fat percentage represents the proportion of fat in your body
          compared to total body weight. It provides a more accurate health
          indicator than weight or BMI alone.
        </p>

        <h3 className="font-semibold">
          Body Fat Percentage Formula (US Navy Method)
        </h3>

        <p
          className="font-mono text-xs p-3 rounded"
          style={{ backgroundColor: "var(--surface-2)" }}>
          Men: 86.010 × log10(waist − neck) − 70.041 × log10(height) + 36.76
          Women: 163.205 × log10(waist + hip − neck) − 97.684 × log10(height) −
          78.387
        </p>

        <ul className="list-disc pl-5">
          <li>Measurements are taken in centimeters</li>
          <li>Method used by US Navy & fitness professionals</li>
          <li>No special equipment required</li>
        </ul>

        <h3 className="font-semibold">Healthy Body Fat Percentage Ranges</h3>

        <ul className="list-disc pl-5">
          <li>Men: 10% – 20%</li>
          <li>Women: 18% – 28%</li>
          <li>Athletes may have lower percentages</li>
        </ul>

        <h3 className="font-semibold">Why Use a Body Fat Calculator?</h3>

        <ul className="list-disc pl-5">
          <li>Track fitness progress</li>
          <li>Better health assessment than BMI</li>
          <li>Helps plan fat loss or muscle gain</li>
          <li>Useful for fitness & wellness goals</li>
        </ul>

        <p>
          This body fat percentage calculator provides a reliable estimate. For
          clinical accuracy, advanced body composition tests may be required.
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ This calculator provides an estimate only. Results may vary based on
        measurement accuracy and individual body composition.
      </aside>
    </section>
  );
}
