"use client";

import { useState } from "react";
import { Calculator, CalendarDays } from "lucide-react";

import { ResultCard } from "../../ResultCard";

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

    setError("");
    return true;
  }

  /* ---------------- CALCULATION ---------------- */
  function calculateDueDate(e) {
    e.preventDefault();
    if (!validate()) return;

    const lmpDate = new Date(lmp);

    // Add 280 days (40 weeks)
    const dueDate = new Date(lmpDate);
    dueDate.setDate(dueDate.getDate() + 280);

    // Calculate current pregnancy week
    const today = new Date();
    const diffTime = today - lmpDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(diffDays / 7);
    const days = diffDays % 7;

    setResult({
      dueDate: dueDate.toDateString(),
      weeks,
      days,
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
            onChange={(e) => setLmp(e.target.value)}
            className="w-full px-3 py-2 rounded-md text-sm"
            style={{
              backgroundColor: "var(--surface)",
              border: "1px solid var(--border)",
              color: "var(--text)",
            }}
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          className="w-full py-2.5 rounded-md font-medium flex items-center justify-center gap-2"
          style={{
            backgroundColor: "var(--primary)",
            color: "#fff",
          }}>
          <Calculator size={18} />
          Calculate Due Date
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <div className="grid md:grid-cols-2 gap-4" aria-live="polite">
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
        </div>
      )}

      {/* ================= SEO BLOG CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          How Pregnancy Due Date is Calculated
        </h2>

        <p>
          Pregnancy due date is usually calculated based on the first day of the
          last menstrual period (LMP). This method assumes a regular 28-day
          cycle and a pregnancy length of 40 weeks (280 days).
        </p>

        <h3 className="font-semibold">Pregnancy Due Date Formula</h3>

        <p
          className="font-mono text-xs p-3 rounded"
          style={{ backgroundColor: "var(--surface-2)" }}>
          Due Date = First Day of LMP + 280 days (40 weeks)
        </p>

        <ul className="list-disc pl-5">
          <li>Pregnancy lasts about 40 weeks</li>
          <li>Ovulation usually occurs ~2 weeks after LMP</li>
          <li>Only about 5% of babies are born on the exact due date</li>
        </ul>

        <h3 className="font-semibold">Pregnancy Trimesters</h3>

        <ul className="list-disc pl-5">
          <li>
            <strong>First Trimester:</strong> Weeks 1 – 12
          </li>
          <li>
            <strong>Second Trimester:</strong> Weeks 13 – 26
          </li>
          <li>
            <strong>Third Trimester:</strong> Weeks 27 – 40
          </li>
        </ul>

        <h3 className="font-semibold">
          Why Use a Pregnancy Due Date Calculator?
        </h3>

        <ul className="list-disc pl-5">
          <li>Estimate baby’s arrival date</li>
          <li>Track pregnancy progress week by week</li>
          <li>Plan prenatal appointments</li>
          <li>Prepare for delivery and maternity care</li>
        </ul>

        <p>
          This pregnancy due date calculator provides an estimate. Actual
          delivery may occur before or after the calculated due date.
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ This calculator provides an estimate only. Actual due date may vary
        based on cycle length, ovulation timing, and medical factors. Always
        consult your doctor or gynecologist.
      </aside>
    </section>
  );
}
