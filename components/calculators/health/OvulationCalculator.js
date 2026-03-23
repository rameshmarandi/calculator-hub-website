"use client";

import { useState } from "react";
import { Calculator, CalendarDays } from "lucide-react";

import { PercentageInput } from "../../inputs/PercentageInput";
import { ResultCard } from "../../ResultCard";
import OvulationCalculatorArticle from "../../content/health/OvulationCalculatorArticle";
import { AmountInput } from "../../inputs/AmountInput";

export default function OvulationCalculator() {
  const [lmp, setLmp] = useState("");
  const [cycleLength, setCycleLength] = useState("28");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    if (!lmp) {
      setError("Please select the first day of your last period.");
      return false;
    }

    if (!cycleLength || Number(cycleLength) < 21 || Number(cycleLength) > 35) {
      setError("Cycle length should be between 21 and 35 days.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- CALCULATION ---------------- */
  function calculateOvulation(e) {
    e.preventDefault();
    if (!validate()) return;

    const lmpDate = new Date(lmp);
    const cycleDays = Number(cycleLength);

    // Ovulation occurs ~14 days before next period
    const ovulationDate = new Date(lmpDate);
    ovulationDate.setDate(ovulationDate.getDate() + (cycleDays - 14));

    // Fertile window: 5 days before ovulation + ovulation day
    const fertileStart = new Date(ovulationDate);
    fertileStart.setDate(fertileStart.getDate() - 5);

    const fertileEnd = new Date(ovulationDate);
    fertileEnd.setDate(fertileEnd.getDate() + 1);

    setResult({
      ovulation: ovulationDate.toDateString(),
      fertileWindow: `${fertileStart.toDateString()} – ${fertileEnd.toDateString()}`,
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
        <h1 className="text-2xl font-bold mb-1">Ovulation Calculator</h1>
        <p className="text-sm leading-relaxed">
          Use this Ovulation Calculator to estimate your ovulation date and
          fertile window based on your menstrual cycle.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateOvulation} className="space-y-4">
        <div className="space-y-1">
          <label className="text-sm font-medium">
            First Day of Last Menstrual Period
          </label>
          <input
            type="date"
            value={lmp}
            onChange={(e) => setLmp(e.target.value)}
            className="w-full px-3 py-2 rounded-md text-sm"
            style={{
              backgroundColor: "var(--surface)",
              border: "1px solid var(--border)",
              color: "var(--text)",
            }}
          />
        </div>

        <AmountInput
          label="Average Cycle Length (days)"
          value={cycleLength}
          onChange={setCycleLength}
          placeholder="28"
          prefix=""

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
          Calculate Ovulation
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <div className="grid md:grid-cols-2 gap-4" aria-live="polite">
          <ResultCard
            variant="primary"
            icon={<CalendarDays size={20} />}
            label="Estimated Ovulation Date"
            value={result.ovulation}
          />

          <ResultCard
            variant="neutral"
            icon={<CalendarDays size={20} />}
            label="Fertile Window"
            value={result.fertileWindow}
          />
        </div>
      )}

      {/* ================= SEO BLOG CONTENT ================= */}
      <OvulationCalculatorArticle/>
    </section>
  );
}
