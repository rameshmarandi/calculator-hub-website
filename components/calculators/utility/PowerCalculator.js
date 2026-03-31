"use client";

import { useMemo, useState } from "react";
import { Zap } from "lucide-react";

import { ResultCard } from "../../ResultCard";
import { AmountInput } from "@/components/inputs/AmountInput";
import PowerCalculatorArticle from "../../content/utility/PowerCalculatorArticle";

export default function PowerCalculator() {
  /* ================= STATE ================= */

  const [base, setBase] = useState(2);
  const [exponent, setExponent] = useState(3);

  /* ================= INPUT VALIDATION ================= */

  function handleValueChange(setter) {
    return (value) => {
      let num = Number(value);

      if (isNaN(num) || !isFinite(num)) num = 0;

      if (num > 1_000_000_000) num = 1_000_000_000;
      if (num < -1_000_000_000) num = -1_000_000_000;

      setter(num);
    };
  }

  /* ================= INTERNAL FORMULA ================= */

  function calculate({ base, exponent }) {
    const b = Number(base) || 0;
    const e = Number(exponent) || 0;

    let output = 0;
    let error = null;

    // edge case
    if (b === 0 && e === 0) {
      error = "0^0 is undefined";
      output = 0;
    } else {
      output = Math.pow(b, e);
    }

    return {
      primary: output,

      breakdown: {
        base: b,
        exponent: e,
      },

      stats: {
        rounded: Number(output.toFixed(6)),
      },

      meta: {
        error,
      },
    };
  }

  /* ================= DERIVED RESULT ================= */

  const result = useMemo(() => {
    return calculate({ base, exponent });
  }, [base, exponent]);

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
          Power Calculator
        </h1>
        <p className="text-sm leading-relaxed">
          Calculate exponential values instantly using base and exponent.
        </p>
      </header>

      {/* ================= INPUTS ================= */}
      <div className="space-y-4">
        <AmountInput
          label="Base"
          value={base}
          onChange={handleValueChange(setBase)}
          prefix=""
        />

        <AmountInput
          label="Exponent"
          value={exponent}
          onChange={handleValueChange(setExponent)}
          prefix=""
        />
      </div>

      {/* ================= RESULT ================= */}
      <div aria-live="polite">
        <ResultCard
          variant="primary"
          icon={<Zap size={20} />}
          label={
            result?.meta?.error
              ? "Invalid Input"
              : "Result"
          }
          value={
            result?.meta?.error
              ? result.meta.error
              : result?.stats?.rounded || 0
          }
        />
      </div>

      {/* ================= STATS ================= */}
      <div className="p-3 rounded border text-sm">
        <p className="text-muted">Expression</p>
        <p className="font-semibold">
          {base}
          <sup>{exponent}</sup>
        </p>
      </div>

      {/* ================= SEO ================= */}
     <PowerCalculatorArticle/>
    </section>
  );
}