"use client";

import { useMemo, useState } from "react";
import { TrendingUp } from "lucide-react";

import { ResultCard } from "../../ResultCard";
import { AmountInput } from "@/components/inputs/AmountInput";
import PercentageIncreaseCalculatorArticle from "../../content/utility/PercentageIncreaseCalculatorArticle";

export default function PercentageIncreaseCalculator() {
  /* ================= STATE ================= */

  const [originalValue, setOriginalValue] = useState(100);
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

  function calculatePercentageIncrease({ originalValue, newValue }) {
    const original = Number(originalValue) || 0;
    const current = Number(newValue) || 0;

    // prevent division by zero
    if (original <= 0) {
      return {
        primary: 0,
        breakdown: {
          increase: 0,
          percentage: 0,
        },
        stats: {},
        meta: {
          error: "invalid_original",
        },
      };
    }

    const increase = current - original;
    const percentageIncrease = (increase / original) * 100;

    return {
      primary: percentageIncrease,

      breakdown: {
        increase,
        percentage: percentageIncrease,
      },

      stats: {
        roundedPercentage: Number(percentageIncrease.toFixed(2)),
        roundedIncrease: Number(increase.toFixed(2)),
      },

      meta: {
        unit: "%",
      },
    };
  }

  /* ================= DERIVED RESULT ================= */

  const result = useMemo(() => {
    return calculatePercentageIncrease({
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
          Percentage Increase Calculator
        </h1>
        <p className="text-sm leading-relaxed">
          Calculate percentage increase instantly between two values.
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
          variant="success"
          icon={<TrendingUp size={20} />}
          label="Percentage Increase"
          value={`${result?.stats?.roundedPercentage || 0}% (Increase: ${
            result?.stats?.roundedIncrease || 0
          })`}
        />
      </div>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="p-3 rounded border">
          <p className="text-muted">Increase</p>
          <p className="font-semibold">
            {result?.stats?.roundedIncrease || 0}
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
    <PercentageIncreaseCalculatorArticle/>
    </section>
  );
}