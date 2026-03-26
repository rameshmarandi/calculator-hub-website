"use client";

import { useMemo, useState } from "react";
import { CalendarDays } from "lucide-react";

import { ResultCard } from "../../ResultCard";
import PregnancyDueDateCalculatorArticle from "../../content/health/PregnancyDueDateCalculatorArticle";

import { calculatePregnancyDueDate } from "../../../lib/formulas";

export default function PregnancyDueDateCalculator() {

  const [lmp, setLmp] = useState("");

  const result = useMemo(() => {

    return calculatePregnancyDueDate(lmp);

  }, [lmp]);

  return (
    <section
      className="rounded-xl p-6 space-y-10"
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)"
      }}
    >

      <header>
        <h1 className="text-2xl font-bold mb-1">
          Pregnancy Due Date Calculator
        </h1>

        <p className="text-sm leading-relaxed">
          Estimate your baby's due date based on the first day of your last
          menstrual period.
        </p>
      </header>

      <div className="space-y-4">

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
              color: "var(--text)"
            }}
          />
        </div>

      </div>

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

      <PregnancyDueDateCalculatorArticle />

    </section>
  );
}