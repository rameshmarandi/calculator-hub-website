"use client";

import { useState } from "react";
import { Calculator, Target } from "lucide-react";

import { PercentageInput } from "../../inputs/PercentageInput";
import { ResultCard } from "../../ResultCard";

export default function CutOffCalculator() {
  const [maths, setMaths] = useState("");
  const [physics, setPhysics] = useState("");
  const [chemistry, setChemistry] = useState("");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    if (!maths || isNaN(maths) || Number(maths) < 0 || Number(maths) > 100) {
      setError("Please enter valid Maths marks (0–100).");
      return false;
    }

    if (
      !physics ||
      isNaN(physics) ||
      Number(physics) < 0 ||
      Number(physics) > 100
    ) {
      setError("Please enter valid Physics marks (0–100).");
      return false;
    }

    if (
      !chemistry ||
      isNaN(chemistry) ||
      Number(chemistry) < 0 ||
      Number(chemistry) > 100
    ) {
      setError("Please enter valid Chemistry marks (0–100).");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- CALCULATION ---------------- */
  function calculateCutOff(e) {
    e.preventDefault();
    if (!validate()) return;

    const m = Number(maths);
    const p = Number(physics);
    const c = Number(chemistry);

    // Standard Engineering Cut-Off Formula
    const cutOff = m + p / 2 + c / 2;

    setResult({
      cutOff: cutOff.toFixed(2),
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
        <h1 className="text-2xl font-bold mb-1">Cut Off Calculator</h1>
        <p className="text-sm leading-relaxed">
          Use this Cut Off Calculator to calculate your engineering or admission
          cutoff marks based on Maths, Physics, and Chemistry scores.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateCutOff} className="space-y-4">
        <PercentageInput
          label="Mathematics Marks"
          value={maths}
          onChange={setMaths}
          placeholder="95"
        />

        <PercentageInput
          label="Physics Marks"
          value={physics}
          onChange={setPhysics}
          placeholder="88"
        />

        <PercentageInput
          label="Chemistry Marks"
          value={chemistry}
          onChange={setChemistry}
          placeholder="90"
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
          Calculate Cut Off
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <div aria-live="polite">
          <ResultCard
            variant="primary"
            icon={<Target size={20} />}
            label="Your Cut Off Marks"
            value={result.cutOff}
          />
        </div>
      )}

      {/* ================= SEO BLOG CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">What Is Cut Off Marks?</h2>

        <p>
          Cut off marks are used by educational institutions to shortlist
          candidates for admissions. They are calculated using subject marks
          based on a predefined formula.
        </p>

        <h3 className="font-semibold">Cut Off Calculation Formula</h3>

        <p
          className="font-mono text-xs p-3 rounded"
          style={{ backgroundColor: "var(--surface-2)" }}>
          Cut Off = Maths + (Physics ÷ 2) + (Chemistry ÷ 2)
        </p>

        <ul className="list-disc pl-5">
          <li>Maths carries full weightage</li>
          <li>Physics and Chemistry carry half weightage</li>
          <li>Commonly used in engineering admissions</li>
        </ul>

        <h3 className="font-semibold">Why Use a Cut Off Calculator?</h3>

        <ul className="list-disc pl-5">
          <li>Instant cutoff calculation</li>
          <li>Eliminates manual errors</li>
          <li>Useful for counseling and admission planning</li>
          <li>Works for most Indian boards</li>
        </ul>

        <p>
          This cutoff calculator provides an estimated score. Actual cutoff
          requirements may vary by institution and category.
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ Cut off calculation methods differ across boards and universities.
        Always refer to official admission notifications for final criteria.
      </aside>
    </section>
  );
}
