"use client";

import { useState } from "react";
import { Calculator, FunctionSquare } from "lucide-react";

import { ResultCard } from "../../ResultCard";

export default function ScientificCalculator() {
  const [value, setValue] = useState("");
  const [operation, setOperation] = useState("sin");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    if (value === "" || isNaN(value)) {
      setError("Please enter a valid number.");
      return false;
    }
    setError("");
    return true;
  }

  /* ---------------- SCIENTIFIC CALCULATION ---------------- */
  function calculate(e) {
    e.preventDefault();
    if (!validate()) return;

    const num = Number(value);
    let output;

    switch (operation) {
      case "sin":
        output = Math.sin(num * (Math.PI / 180));
        break;
      case "cos":
        output = Math.cos(num * (Math.PI / 180));
        break;
      case "tan":
        output = Math.tan(num * (Math.PI / 180));
        break;
      case "log":
        if (num <= 0) {
          setError("Logarithm is only defined for positive numbers.");
          return;
        }
        output = Math.log10(num);
        break;
      case "ln":
        if (num <= 0) {
          setError("Natural log is only defined for positive numbers.");
          return;
        }
        output = Math.log(num);
        break;
      case "sqrt":
        if (num < 0) {
          setError("Square root of negative number is not real.");
          return;
        }
        output = Math.sqrt(num);
        break;
      case "square":
        output = Math.pow(num, 2);
        break;
      case "cube":
        output = Math.pow(num, 3);
        break;
      default:
        return;
    }

    setResult(output.toFixed(6));
  }

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
          Use this Scientific Calculator to perform advanced mathematical
          calculations such as trigonometric functions, logarithms,
          square roots, and powers.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculate} className="space-y-4">
        {/* Input Value */}
        <div className="space-y-1">
          <label className="text-sm font-medium">
            Enter Value
          </label>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter number"
            className="w-full px-3 py-2 rounded"
            style={{
              border: "1px solid var(--border)",
              backgroundColor: "var(--surface)",
            }}
          />
        </div>

        {/* Operation */}
        <div className="space-y-1">
          <label className="text-sm font-medium">
            Select Operation
          </label>
          <select
            value={operation}
            onChange={(e) => setOperation(e.target.value)}
            className="w-full px-3 py-2 rounded"
            style={{
              border: "1px solid var(--border)",
              backgroundColor: "var(--surface)",
            }}
          >
            <option value="sin">sin (degrees)</option>
            <option value="cos">cos (degrees)</option>
            <option value="tan">tan (degrees)</option>
            <option value="log">log₁₀</option>
            <option value="ln">ln (natural log)</option>
            <option value="sqrt">√ Square Root</option>
            <option value="square">x² (Square)</option>
            <option value="cube">x³ (Cube)</option>
          </select>
        </div>

        {error && (
          <p className="text-sm text-red-500">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full py-2.5 rounded-md font-medium flex items-center justify-center gap-2"
          style={{
            backgroundColor: "var(--primary)",
            color: "#fff",
          }}
        >
          <Calculator size={18} />
          Calculate
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result !== null && (
        <div aria-live="polite">
          <ResultCard
            variant="primary"
            icon={<FunctionSquare size={20} />}
            label="Result"
            value={result}
          />
        </div>
      )}

      {/* ================= SEO BLOG CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          What Is a Scientific Calculator?
        </h2>

        <p>
          A Scientific Calculator is an advanced mathematical tool used to
          perform trigonometric, logarithmic, exponential, and power
          calculations. It is commonly used by students, engineers,
          scientists, and professionals.
        </p>

        <h3 className="font-semibold">
          Functions Supported
        </h3>

        <ul className="list-disc pl-5">
          <li>Trigonometric: sin, cos, tan</li>
          <li>Logarithmic: log₁₀, ln</li>
          <li>Roots and powers</li>
          <li>Square and cube calculations</li>
        </ul>

        <h3 className="font-semibold">
          Why Use a Scientific Calculator?
        </h3>

        <ul className="list-disc pl-5">
          <li>Accurate advanced calculations</li>
          <li>Useful for education and research</li>
          <li>Eliminates manual computation errors</li>
          <li>Supports complex math operations</li>
        </ul>

        <p>
          This scientific calculator uses standard mathematical formulas
          to deliver precise and reliable results instantly.
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ Scientific calculations are based on standard mathematical
        functions. Results are for informational and educational purposes
        only.
      </aside>
    </section>
  );
}
