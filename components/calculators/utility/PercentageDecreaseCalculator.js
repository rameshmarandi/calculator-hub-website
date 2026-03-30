"use client";

import { useMemo, useState } from "react";
import { TrendingDown } from "lucide-react";

import { ResultCard } from "../../ResultCard";
import { AmountInput } from "@/components/inputs/AmountInput";

export default function PercentageDecreaseCalculator() {
  /* ================= STATE ================= */

  const [originalValue, setOriginalValue] = useState(200);
  const [newValue, setNewValue] = useState(150);

  /* ================= INPUT VALIDATION ================= */

  function handleValueChange(setter) {
    return (value) => {
      let num = Number(value);

      if (isNaN(num) || !isFinite(num)) num = 0;

      // prevent extreme values
      if (num > 1_000_000_000) num = 1_000_000_000;
      if (num < 0) num = 0;

      setter(num);
    };
  }

  /* ================= INTERNAL FORMULA ================= */

  function calculatePercentageDecrease({ originalValue, newValue }) {
    const original = Number(originalValue) || 0;
    const current = Number(newValue) || 0;

    // prevent division issues
    if (original <= 0) {
      return {
        primary: 0,
        breakdown: {
          decrease: 0,
          percentage: 0,
        },
        stats: {},
        meta: {
          error: "invalid_original",
        },
      };
    }

    // ensure logical decrease (not increase)
    const safeCurrent = current > original ? original : current;

    const decrease = original - safeCurrent;
    const percentageDecrease = (decrease / original) * 100;

    return {
      primary: percentageDecrease,

      breakdown: {
        decrease,
        percentage: percentageDecrease,
      },

      stats: {
        roundedPercentage: Number(percentageDecrease.toFixed(2)),
        roundedDecrease: Number(decrease.toFixed(2)),
      },

      meta: {
        unit: "%",
      },
    };
  }

  /* ================= DERIVED RESULT ================= */

  const result = useMemo(() => {
    return calculatePercentageDecrease({
      originalValue,
      newValue,
    });
  }, [originalValue, newValue]);

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
          Percentage Decrease Calculator
        </h1>
        <p className="text-sm leading-relaxed">
          Calculate percentage decrease instantly between two values.
        </p>
      </header>

      {/* ================= INPUTS ================= */}
      <div className="space-y-4">
        <AmountInput
          label="Original Value"
          value={originalValue}
          onChange={handleValueChange(setOriginalValue)}
          prefix=""
        />

        <AmountInput
          label="New Value"
          value={newValue}
          onChange={handleValueChange(setNewValue)}
          prefix=""
        />
      </div>

      {/* ================= RESULT (ALWAYS VISIBLE) ================= */}
      <div aria-live="polite">
        <ResultCard
          variant="danger"
          icon={<TrendingDown size={20} />}
          label="Percentage Decrease"
          value={`${result?.stats?.roundedPercentage || 0}% (Decrease: ${
            result?.stats?.roundedDecrease || 0
          })`}
        />
      </div>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="p-3 rounded border">
          <p className="text-muted">Decrease</p>
          <p className="font-semibold">
            {result?.stats?.roundedDecrease || 0}
          </p>
        </div>

        <div className="p-3 rounded border">
          <p className="text-muted">Percentage</p>
          <p className="font-semibold">
            {result?.stats?.roundedPercentage || 0}%
          </p>
        </div>
      </div>

      {/* ================= SEO ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          What Is Percentage Decrease?
        </h2>

        <p>
          Percentage decrease measures how much a value has reduced compared to its original value.
        </p>

        <h3 className="font-semibold">Formula</h3>

        <p className="font-mono text-xs p-3 rounded bg-gray-100">
          (Original Value − New Value) ÷ Original Value × 100
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        Results are calculated using standard mathematical formulas.
      </aside>
    </section>
  );
}