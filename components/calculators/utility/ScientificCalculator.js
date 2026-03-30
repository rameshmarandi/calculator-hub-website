"use client";

import { useMemo, useState } from "react";
import { FunctionSquare } from "lucide-react";

import { ResultCard } from "../../ResultCard";
import { AmountInput } from "@/components/inputs/AmountInput";

export default function ScientificCalculator() {
  /* ================= STATE ================= */

  const [value, setValue] = useState(45);
  const [operation, setOperation] = useState("sin");

  /* ================= INPUT VALIDATION ================= */

  function handleValueChange(val) {
    let num = Number(val);

    if (isNaN(num) || !isFinite(num)) num = 0;

    if (num > 1_000_000_000) num = 1_000_000_000;
    if (num < -1_000_000_000) num = -1_000_000_000;

    setValue(num);
  }

  /* ================= INTERNAL FORMULA ================= */

  function calculate({ value, operation }) {
    const num = Number(value) || 0;

    let output = 0;
    let error = null;

    switch (operation) {
      case "sin":
        output = Math.sin((num * Math.PI) / 180);
        break;

      case "cos":
        output = Math.cos((num * Math.PI) / 180);
        break;

      case "tan":
        output = Math.tan((num * Math.PI) / 180);
        break;

      case "log":
        if (num <= 0) {
          error = "Log undefined for ≤ 0";
          output = 0;
        } else {
          output = Math.log10(num);
        }
        break;

      case "ln":
        if (num <= 0) {
          error = "ln undefined for ≤ 0";
          output = 0;
        } else {
          output = Math.log(num);
        }
        break;

      case "sqrt":
        if (num < 0) {
          error = "√ negative not real";
          output = 0;
        } else {
          output = Math.sqrt(num);
        }
        break;

      case "square":
        output = Math.pow(num, 2);
        break;

      case "cube":
        output = Math.pow(num, 3);
        break;

      default:
        output = 0;
    }

    return {
      primary: output,

      breakdown: {
        input: num,
        operation,
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
    return calculate({ value, operation });
  }, [value, operation]);

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
          Scientific Calculator
        </h1>
        <p className="text-sm leading-relaxed">
          Perform trigonometric, logarithmic, and power calculations instantly.
        </p>
      </header>

      {/* ================= INPUTS ================= */}
      <div className="space-y-4">
        <AmountInput
          label="Enter Value"
          value={value}
          onChange={handleValueChange}
          prefix=""
        />

        <select
          value={operation}
          onChange={(e) => setOperation(e.target.value)}
          className="w-full px-3 py-2 rounded border"
        >
          <option value="sin">sin (degrees)</option>
          <option value="cos">cos (degrees)</option>
          <option value="tan">tan (degrees)</option>
          <option value="log">log₁₀</option>
          <option value="ln">ln</option>
          <option value="sqrt">√ Square Root</option>
          <option value="square">x²</option>
          <option value="cube">x³</option>
        </select>
      </div>

      {/* ================= RESULT ================= */}
      <div aria-live="polite">
        <ResultCard
          variant="primary"
          icon={<FunctionSquare size={20} />}
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
        <p className="text-muted">Operation</p>
        <p className="font-semibold">{operation}</p>
      </div>

      {/* ================= SEO ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          What Is a Scientific Calculator?
        </h2>

        <p>
          A scientific calculator performs advanced mathematical operations such as trigonometry, logarithms, and powers.
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        Results are based on standard mathematical functions.
      </aside>
    </section>
  );
}