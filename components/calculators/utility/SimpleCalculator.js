"use client";

import { useState } from "react";
import { Calculator } from "lucide-react";

import { ResultCard } from "../../ResultCard";

export default function SimpleCalculator() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [operation, setOperation] = useState("add");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    if (
      num1 === "" ||
      num2 === "" ||
      isNaN(num1) ||
      isNaN(num2)
    ) {
      setError("Please enter valid numbers.");
      return false;
    }

    if (operation === "divide" && Number(num2) === 0) {
      setError("Division by zero is not allowed.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- CALCULATION ---------------- */
  function calculate(e) {
    e.preventDefault();
    if (!validate()) return;

    const a = Number(num1);
    const b = Number(num2);
    let output = 0;

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
        output = a / b;
        break;
      default:
        break;
    }

    setResult(output);
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
          Simple Calculator
        </h1>
        <p className="text-sm leading-relaxed">
          Use this Simple Calculator to perform basic arithmetic
          operations like addition, subtraction, multiplication, and
          division quickly and accurately.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculate} className="space-y-4">
        {/* Number 1 */}
        <div className="space-y-1">
          <label className="text-sm font-medium">First Number</label>
          <input
            type="number"
            value={num1}
            onChange={(e) => setNum1(e.target.value)}
            placeholder="Enter first number"
            className="w-full px-3 py-2 rounded"
            style={{
              border: "1px solid var(--border)",
              backgroundColor: "var(--surface)",
            }}
          />
        </div>

        {/* Number 2 */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Second Number</label>
          <input
            type="number"
            value={num2}
            onChange={(e) => setNum2(e.target.value)}
            placeholder="Enter second number"
            className="w-full px-3 py-2 rounded"
            style={{
              border: "1px solid var(--border)",
              backgroundColor: "var(--surface)",
            }}
          />
        </div>

        {/* Operation */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Operation</label>
          <select
            value={operation}
            onChange={(e) => setOperation(e.target.value)}
            className="w-full px-3 py-2 rounded"
            style={{
              border: "1px solid var(--border)",
              backgroundColor: "var(--surface)",
            }}
          >
            <option value="add">Addition (+)</option>
            <option value="subtract">Subtraction (−)</option>
            <option value="multiply">Multiplication (×)</option>
            <option value="divide">Division (÷)</option>
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
            icon={<Calculator size={20} />}
            label="Result"
            value={result}
          />
        </div>
      )}

      {/* ================= SEO BLOG CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          What Is a Simple Calculator?
        </h2>

        <p>
          A Simple Calculator is a basic mathematical tool used to
          perform everyday arithmetic operations such as addition,
          subtraction, multiplication, and division.
        </p>

        <h3 className="font-semibold">
          Operations Supported
        </h3>

        <ul className="list-disc pl-5">
          <li>Addition (+)</li>
          <li>Subtraction (−)</li>
          <li>Multiplication (×)</li>
          <li>Division (÷)</li>
        </ul>

        <h3 className="font-semibold">
          Why Use a Simple Calculator?
        </h3>

        <ul className="list-disc pl-5">
          <li>Quick and accurate calculations</li>
          <li>Useful for daily tasks</li>
          <li>Eliminates manual errors</li>
          <li>Works for students and professionals</li>
        </ul>

        <p>
          This simple calculator is designed for fast, reliable
          arithmetic calculations with a clean and easy-to-use interface.
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ This calculator performs basic arithmetic calculations using
        standard mathematical rules. Results are for informational
        purposes only.
      </aside>
    </section>
  );
}
