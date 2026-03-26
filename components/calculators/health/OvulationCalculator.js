"use client";

import { useMemo, useState } from "react";
import { CalendarDays } from "lucide-react";

import { ResultCard } from "../../ResultCard";
import OvulationCalculatorArticle from "../../content/health/OvulationCalculatorArticle";
import { AmountInput } from "../../inputs/AmountInput";

import { calculateOvulation } from "../../../lib/formulas";

export default function OvulationCalculator() {

  const [lmp, setLmp] = useState("");
  const [cycleLength, setCycleLength] = useState("28");

  const result = useMemo(() => {

    return calculateOvulation(
      lmp,
      cycleLength
    );

  }, [lmp, cycleLength]);

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
          Ovulation Calculator
        </h1>

        <p className="text-sm leading-relaxed">
          Estimate your ovulation date and fertile window based on your
          menstrual cycle.
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
            onChange={(e) => setLmp(e.target.value)}
            className="w-full px-3 py-2 rounded-md text-sm"
            style={{
              backgroundColor: "var(--surface)",
              border: "1px solid var(--border)",
              color: "var(--text)"
            }}
          />
        </div>

        <AmountInput
          label="Average Cycle Length (days)"
          value={cycleLength}
          onChange={setCycleLength}
          prefix=""
        />

      </div>

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
          value={`${result.fertileStart} – ${result.fertileEnd}`}
        />

      </div>

      <OvulationCalculatorArticle />

    </section>
  );
}