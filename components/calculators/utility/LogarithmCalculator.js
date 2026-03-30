"use client";

import { useMemo, useState } from "react";
import { LogOut } from "lucide-react";

import { ResultCard } from "../../ResultCard";
import { AmountInput } from "@/components/inputs/AmountInput";

export default function LogarithmCalculator() {
  /* ================= STATE ================= */

  const [number, setNumber] = useState(10);
  const [base, setBase] = useState(10);

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

  function calculate({ number, base }) {
    const n = Number(number) || 0;
    const b = Number(base) || 0;

    let output = 0;
    let error = null;

    // domain checks
    if (n <= 0) {
      error = "Number must be > 0";
      output = 0;
    } else if (b <= 0 || b === 1) {
      error = "Base must be > 0 and ≠ 1";
      output = 0;
    } else {
      // change of base formula
      output = Math.log(n) / Math.log(b);
    }

    return {
      primary: output,

      breakdown: {
        number: n,
        base: b,
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
    return calculate({ number, base });
  }, [number, base]);

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
          Logarithm Calculator
        </h1>
        <p className="text-sm leading-relaxed">
          Calculate logarithms for any base using standard mathematical formulas.
        </p>
      </header>

      {/* ================= INPUTS ================= */}
      <div className="space-y-4">
        <AmountInput
          label="Number (x)"
          value={number}
          onChange={handleValueChange(setNumber)}
          prefix=""
        />

        <AmountInput
          label="Base (b)"
          value={base}
          onChange={handleValueChange(setBase)}
          prefix=""
        />
      </div>

      {/* ================= RESULT ================= */}
      <div aria-live="polite">
        <ResultCard
          variant="primary"
          icon={<LogOut size={20} />}
          label={
            result?.meta?.error
              ? "Invalid Input"
              : "Logarithm Result"
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
          log<sub>{base}</sub>({number})
        </p>
      </div>

      {/* ================= SEO ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          What Is a Logarithm?
        </h2>

        <p>
          A logarithm determines the exponent required to raise a base to a given number.
        </p>

        <h3 className="font-semibold">Formula</h3>

        <p className="font-mono text-xs p-3 rounded ">
          log<sub>b</sub>(x) = ln(x) ÷ ln(b)
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        Results follow standard logarithmic rules.
      </aside>
    </section>
  );
}