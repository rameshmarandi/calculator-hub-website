"use client";

import { useMemo, useState } from "react";
import { Sigma } from "lucide-react";

import { ResultCard } from "../../ResultCard";
import { AmountInput } from "@/components/inputs/AmountInput";
import EquationSolverArticle from "../../content/utility/EquationSolverArticle";

export default function EquationSolver() {
  /* ================= STATE ================= */

  const [a, setA] = useState(2);
  const [b, setB] = useState(4);
  const [c, setC] = useState(10);

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

  function solve({ a, b, c }) {
    const A = Number(a) || 0;
    const B = Number(b) || 0;
    const C = Number(c) || 0;

    let x = 0;
    let error = null;

    if (A === 0) {
      error = "Invalid: a cannot be 0";
      x = 0;
    } else {
      x = (C - B) / A;
    }

    return {
      primary: x,

      breakdown: {
        a: A,
        b: B,
        c: C,
      },

      stats: {
        rounded: Number(x.toFixed(4)),
      },

      meta: {
        error,
      },
    };
  }

  /* ================= DERIVED RESULT ================= */

  const result = useMemo(() => {
    return solve({ a, b, c });
  }, [a, b, c]);

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
          Equation Solver
        </h1>
        <p className="text-sm leading-relaxed">
          Solve linear equations of the form ax + b = c instantly.
        </p>
      </header>

      {/* ================= INPUTS ================= */}
      <div className="space-y-4">
        <AmountInput
          label="Coefficient a"
          value={a}
          onChange={handleValueChange(setA)}
          prefix=""
        />

        <AmountInput
          label="Constant b"
          value={b}
          onChange={handleValueChange(setB)}
          prefix=""
        />

        <AmountInput
          label="Constant c"
          value={c}
          onChange={handleValueChange(setC)}
          prefix=""
        />
      </div>

      {/* ================= RESULT ================= */}
      <div aria-live="polite">
        <ResultCard
          variant="primary"
          icon={<Sigma size={20} />}
          label={
            result?.meta?.error
              ? "Invalid Equation"
              : "Solution"
          }
          value={
            result?.meta?.error
              ? result.meta.error
              : `x = ${result?.stats?.rounded || 0}`
          }
        />
      </div>

      {/* ================= STATS ================= */}
      <div className="p-3 rounded border text-sm">
        <p className="text-muted">Equation</p>
        <p className="font-semibold">
          {a}x + {b} = {c}
        </p>
      </div>

      {/* ================= SEO ================= */}
     <EquationSolverArticle/>
    </section>
  );
}