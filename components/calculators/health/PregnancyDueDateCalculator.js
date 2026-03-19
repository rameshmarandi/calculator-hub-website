"use client";

import { useState } from "react";
import { Calculator, CalendarDays } from "lucide-react";

import { ResultCard } from "../../ResultCard";
import PregnancyDueDateCalculatorArticle from "../../content/health/PregnancyDueDateCalculatorArticle";

export default function PregnancyDueDateCalculator() {
  const [lmp, setLmp] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    if (!lmp) {
      setError("Please select the first day of your last period.");
      return false;
    }

    const lmpDate = new Date(lmp);
    const today = new Date();

    if (lmpDate > today) {
      setError("Last menstrual period cannot be in the future.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- CALCULATION ---------------- */
  function calculateDueDate(e) {
    e.preventDefault();

    if (!validate()) return;

    const lmpDate = new Date(lmp);

    /* ---- DUE DATE (280 DAYS) ---- */
    const dueDate = new Date(lmpDate);
    dueDate.setDate(dueDate.getDate() + 280);

    /* ---- PREGNANCY AGE ---- */
    const today = new Date();

    const diffTime = today.getTime() - lmpDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    const weeks = Math.floor(diffDays / 7);
    const days = diffDays % 7;

    /* ---- TRIMESTER ---- */
    let trimester = "First Trimester";

    if (weeks >= 13 && weeks < 27) trimester = "Second Trimester";
    if (weeks >= 27) trimester = "Third Trimester";

    /* ---- FORMAT DATE ---- */
    const formattedDueDate = dueDate.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    setResult({
      dueDate: formattedDueDate,
      weeks,
      days,
      trimester,
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
        <h1 className="text-2xl font-bold mb-1">
          Pregnancy Due Date Calculator
        </h1>
        <p className="text-sm leading-relaxed">
          Use this Pregnancy Due Date Calculator to estimate your baby’s due
          date based on the first day of your last menstrual period (LMP).
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateDueDate} className="space-y-4">
        <div className="space-y-1">
          <label className="text-sm font-medium">
            First Day of Last Menstrual Period
          </label>

          <input
            type="date"
            value={lmp}
            max={new Date().toISOString().split("T")[0]}
            onChange={(e) => setLmp(e.target.value)}
            className="w-full px-3 py-2 rounded-md text-sm"
            style={{
              backgroundColor: "var(--surface)",
              border: "1px solid var(--border)",
              color: "var(--text)",
            }}
          />
        </div>

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
          Calculate Due Date
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <div className="grid md:grid-cols-3 gap-4" aria-live="polite">
          <ResultCard
            variant="primary"
            icon={<CalendarDays size={20} />}
            label="Estimated Due Date"
            value={result.dueDate}
          />

          <ResultCard
            variant="neutral"
            icon={<CalendarDays size={20} />}
            label="Current Pregnancy"
            value={`${result.weeks} weeks ${result.days} days`}
          />

          <ResultCard
            variant="neutral"
            icon={<CalendarDays size={20} />}
            label="Current Trimester"
            value={result.trimester}
          />
        </div>
      )}

      {/* ================= ARTICLE ================= */}
      <PregnancyDueDateCalculatorArticle />
    </section>
  );
}