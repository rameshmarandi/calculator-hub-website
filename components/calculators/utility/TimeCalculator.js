"use client";

import { useMemo, useState } from "react";
import { Clock } from "lucide-react";

import { ResultCard } from "../../ResultCard";
import {AmountInput} from "@/components/inputs/AmountInput";
import TimeCalculatorArticle from "../../content/utility/TimeCalculatorArticle";

export default function TimeCalculator() {
  /* ================= STATE ================= */

  const [hours, setHours] = useState(2);
  const [minutes, setMinutes] = useState(30);
  const [addHours, setAddHours] = useState(1);
  const [addMinutes, setAddMinutes] = useState(45);

  /* ================= INPUT VALIDATION HANDLERS ================= */

  function handleHoursChange(setter) {
    return (value) => {
      let num = Number(value);

      if (isNaN(num) || num < 0) num = 0;

      // Limit max hours (prevent insane values)
      if (num > 10000) num = 10000;

      setter(num);
    };
  }

  function handleMinutesChange(setter) {
    return (value) => {
      let num = Number(value);

      if (isNaN(num) || num < 0) num = 0;

      // Strict minute validation
      if (num > 59) num = 59;

      setter(num);
    };
  }

  /* ================= INTERNAL FORMULA ================= */

  function calculateTime({ hours, minutes, addHours, addMinutes }) {
    const h = Number(hours) || 0;
    const m = Number(minutes) || 0;
    const ah = Number(addHours) || 0;
    const am = Number(addMinutes) || 0;

    const baseTotal = h * 60 + m;
    const addTotal = ah * 60 + am;

    const finalMinutes = baseTotal + addTotal;

    const resultHours = Math.floor(finalMinutes / 60);
    const resultMinutes = finalMinutes % 60;

    return {
      primary: finalMinutes,

      breakdown: {
        hours: resultHours,
        minutes: resultMinutes,
      },

      stats: {
        totalMinutes: finalMinutes,
        totalHours: resultHours,
      },

      meta: {
        unit: "time",
      },
    };
  }

  /* ================= DERIVED RESULT ================= */

  const result = useMemo(() => {
    return calculateTime({
      hours,
      minutes,
      addHours,
      addMinutes,
    });
  }, [hours, minutes, addHours, addMinutes]);

  /* ================= UI ================= */

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
          Time Calculator
        </h1>
        <p className="text-sm leading-relaxed">
          Add hours and minutes instantly with strict input validation.
        </p>
      </header>

      {/* ================= INPUTS ================= */}
      <div className="space-y-6">
        {/* Base Time */}
        <div>
          <p className="text-sm font-medium mb-2">Base Time</p>

          <div className="grid grid-cols-2 gap-4">
            <AmountInput
              label="Hours"
              value={hours}
              onChange={handleHoursChange(setHours)}
              prefix=""
            />

            <AmountInput
              label="Minutes"
              value={minutes}
              onChange={handleMinutesChange(setMinutes)}
              prefix=""
            />
          </div>
        </div>

        {/* Add Time */}
        <div>
          <p className="text-sm font-medium mb-2">Add Time</p>

          <div className="grid grid-cols-2 gap-4">
            <AmountInput
              label="Add Hours"
              value={addHours}
              onChange={handleHoursChange(setAddHours)}
              prefix=""
            />

            <AmountInput
              label="Add Minutes"
              value={addMinutes}
              onChange={handleMinutesChange(setAddMinutes)}
              prefix=""
            />
          </div>
        </div>
      </div>

      {/* ================= RESULT ================= */}
      <div aria-live="polite">
        <ResultCard
          variant="primary"
          icon={<Clock size={20} />}
          label="Final Time"
          value={`${result?.breakdown?.hours || 0} Hours ${
            result?.breakdown?.minutes || 0
          } Minutes`}
        />
      </div>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="p-3 rounded border">
          <p className="text-muted">Total Minutes</p>
          <p className="font-semibold">
            {result?.stats?.totalMinutes || 0}
          </p>
        </div>

        <div className="p-3 rounded border">
          <p className="text-muted">Total Hours</p>
          <p className="font-semibold">
            {result?.stats?.totalHours || 0}
          </p>
        </div>
      </div>

      {/* ================= SEO ================= */}
     <TimeCalculatorArticle/>
    </section>
  );
}