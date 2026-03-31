"use client";

import { useMemo, useState } from "react";
import { Calculator } from "lucide-react";

import { ResultCard } from "../../ResultCard";
import { AmountInput } from "@/components/inputs/AmountInput";
import SimpleCalculatorArticle from "../../content/utility/SimpleCalculatorArticle";

export default function SimpleCalculator() {
  /* ================= STATE ================= */

  const [num1, setNum1] = useState(10);
  const [num2, setNum2] = useState(5);
  const [operation, setOperation] = useState("add");

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

  function calculate({ num1, num2, operation }) {
    const a = Number(num1) || 0;
    const b = Number(num2) || 0;

    let output = 0;
    let error = null;

    switch (operation) {
      case "add":
        output = a + b;
        break;

      case "subtract":
        output = a - b;
        break;

      case "multiply":
        output = a * b;
        break;

      case "divide":
        if (b === 0) {
          error = "Division by zero";
          output = 0;
        } else {
          output = a / b;
        }
        break;

      default:
        output = 0;
    }

    return {
      primary: output,

      breakdown: {
        a,
        b,
        operation,
      },

      stats: {
        rounded: Number(output.toFixed(4)),
      },

      meta: {
        error,
      },
    };
  }

  /* ================= DERIVED RESULT ================= */

  const result = useMemo(() => {
    return calculate({ num1, num2, operation });
  }, [num1, num2, operation]);

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
          Simple Calculator
        </h1>
        <p className="text-sm leading-relaxed">
          Perform addition, subtraction, multiplication, and division instantly.
        </p>
      </header>

      {/* ================= INPUTS ================= */}
      <div className="space-y-4">
        <AmountInput
          label="First Number"
          value={num1}
          onChange={handleValueChange(setNum1)}
          prefix=""
        />

        <AmountInput
          label="Second Number"
          value={num2}
          onChange={handleValueChange(setNum2)}
          prefix=""
        />

        {/* Operation */}
        <select
          value={operation}
          onChange={(e) => setOperation(e.target.value)}
          className="w-full px-3 py-2 rounded border"
        >
          <option value="add">Addition (+)</option>
          <option value="subtract">Subtraction (−)</option>
          <option value="multiply">Multiplication (×)</option>
          <option value="divide">Division (÷)</option>
        </select>
      </div>

      {/* ================= RESULT ================= */}
      <div aria-live="polite">
        <ResultCard
          variant="primary"
          icon={<Calculator size={20} />}
          label={
            result?.meta?.error
              ? "Invalid Operation"
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
        <p className="font-semibold">
          {operation}
        </p>
      </div>

      {/* ================= SEO ================= */}
      <SimpleCalculatorArticle/>
    </section>
  );
}