"use client";

import { useState } from "react";
import { Calculator, Sigma } from "lucide-react";

import { ResultCard } from "../../ResultCard";

export default function EquationSolver() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    if (
      a === "" ||
      b === "" ||
      c === "" ||
      isNaN(a) ||
      isNaN(b) ||
      isNaN(c)
    ) {
      setError("Please enter valid numeric values.");
      return false;
    }

    if (Number(a) === 0) {
      setError("Coefficient 'a' cannot be zero.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- EQUATION SOLVER ---------------- */
  function solveEquation(e) {
    e.preventDefault();
    if (!validate()) return;

    const A = Number(a);
    const B = Number(b);
    const C = Number(c);

    // ax + b = c  →  x = (c - b) / a
    const x = (C - B) / A;

    setResult(x.toFixed(4));
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
          Equation Solver
        </h1>
        <p className="text-sm leading-relaxed">
          Use this Equation Solver to solve linear equations of the form
          <strong> ax + b = c</strong>. It is ideal for students,
          exams, and learning algebra fundamentals.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={solveEquation} className="space-y-4">
        {/* a */}
        <div className="space-y-1">
          <label className="text-sm font-medium">
            Coefficient a
          </label>
          <input
            type="number"
            value={a}
            onChange={(e) => setA(e.target.value)}
            placeholder="Enter a"
            className="w-full px-3 py-2 rounded"
            style={{
              border: "1px solid var(--border)",
              backgroundColor: "var(--surface)",
            }}
          />
        </div>

        {/* b */}
        <div className="space-y-1">
          <label className="text-sm font-medium">
            Constant b
          </label>
          <input
            type="number"
            value={b}
            onChange={(e) => setB(e.target.value)}
            placeholder="Enter b"
            className="w-full px-3 py-2 rounded"
            style={{
              border: "1px solid var(--border)",
              backgroundColor: "var(--surface)",
            }}
          />
        </div>

        {/* c */}
        <div className="space-y-1">
          <label className="text-sm font-medium">
            Constant c
          </label>
          <input
            type="number"
            value={c}
            onChange={(e) => setC(e.target.value)}
            placeholder="Enter c"
            className="w-full px-3 py-2 rounded"
            style={{
              border: "1px solid var(--border)",
              backgroundColor: "var(--surface)",
            }}
          />
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
          Solve Equation
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result !== null && (
        <div aria-live="polite">
          <ResultCard
            variant="primary"
            icon={<Sigma size={20} />}
            label="Solution"
            value={`x = ${result}`}
          />
        </div>
      )}

      {/* ================= SEO BLOG CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          What Is an Equation Solver?
        </h2>

        <p>
          An Equation Solver is a mathematical tool that finds the value
          of an unknown variable that satisfies a given equation.
          This calculator solves simple linear equations involving one
          variable.
        </p>

        <h3 className="font-semibold">
          Linear Equation Formula
        </h3>

        <p
          className="font-mono text-xs p-3 rounded"
          style={{ backgroundColor: "var(--surface-2)" }}
        >
          ax + b = c  
          <br />
          x = (c − b) ÷ a
        </p>

        <ul className="list-disc pl-5">
          <li>a must not be zero</li>
          <li>b and c are constants</li>
          <li>Solution gives the value of x</li>
        </ul>

        <h3 className="font-semibold">
          Why Use an Equation Solver?
        </h3>

        <ul className="list-disc pl-5">
          <li>Instant and accurate solutions</li>
          <li>Ideal for students and exams</li>
          <li>Eliminates manual algebra errors</li>
          <li>Useful for learning fundamentals</li>
        </ul>

        <p>
          This equation solver is designed for simplicity and accuracy,
          making it perfect for everyday algebra problems.
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ This calculator solves basic linear equations only.
        Results are for educational and informational purposes.
      </aside>
    </section>
  );
}
