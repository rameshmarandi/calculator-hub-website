"use client";

import { useState } from "react";
import { Calculator, Grid } from "lucide-react";

import { ResultCard } from "../../ResultCard";

export default function MatrixCalculator() {
  const [size, setSize] = useState(2);
  const [operation, setOperation] = useState("add");

  const [a, setA] = useState(
    Array.from({ length: 2 }, () => Array(2).fill(""))
  );
  const [b, setB] = useState(
    Array.from({ length: 2 }, () => Array(2).fill(""))
  );

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- HELPERS ---------------- */
  function createEmptyMatrix(n) {
    return Array.from({ length: n }, () => Array(n).fill(""));
  }

  function updateMatrix(setter, i, j, value) {
    setter((prev) => {
      const copy = prev.map((row) => [...row]);
      copy[i][j] = value;
      return copy;
    });
  }

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (
          a[i][j] === "" ||
          b[i][j] === "" ||
          isNaN(a[i][j]) ||
          isNaN(b[i][j])
        ) {
          setError("Please enter valid numbers in all matrix fields.");
          return false;
        }
      }
    }
    setError("");
    return true;
  }

  /* ---------------- MATRIX OPERATIONS ---------------- */
  function addMatrices(A, B) {
    return A.map((row, i) =>
      row.map((val, j) => val + B[i][j])
    );
  }

  function subtractMatrices(A, B) {
    return A.map((row, i) =>
      row.map((val, j) => val - B[i][j])
    );
  }

  function multiplyMatrices(A, B) {
    const R = Array.from({ length: size }, () =>
      Array(size).fill(0)
    );

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        for (let k = 0; k < size; k++) {
          R[i][j] += A[i][k] * B[k][j];
        }
      }
    }
    return R;
  }

  /* ---------------- CALCULATION ---------------- */
  function calculate(e) {
    e.preventDefault();
    if (!validate()) return;

    const A = a.map((row) => row.map(Number));
    const B = b.map((row) => row.map(Number));

    let R;

    if (operation === "add") R = addMatrices(A, B);
    if (operation === "subtract") R = subtractMatrices(A, B);
    if (operation === "multiply") R = multiplyMatrices(A, B);

    setResult(R);
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
          Matrix Calculator
        </h1>
        <p className="text-sm leading-relaxed">
          Use this Matrix Calculator to perform addition, subtraction,
          and multiplication of matrices. The calculator supports both
          2×2 and 3×3 matrices, making it ideal for students, exams,
          and learning linear algebra concepts.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculate} className="space-y-6">
        {/* Matrix Size */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Matrix Size</label>
          <select
            value={size}
            onChange={(e) => {
              const s = Number(e.target.value);
              setSize(s);
              setA(createEmptyMatrix(s));
              setB(createEmptyMatrix(s));
              setResult(null);
            }}
            className="w-full px-3 py-2 rounded"
            style={{
              border: "1px solid var(--border)",
              backgroundColor: "var(--surface)",
            }}
          >
            <option value={2}>2 × 2</option>
            <option value={3}>3 × 3</option>
          </select>
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
            <option value="add">Addition</option>
            <option value="subtract">Subtraction</option>
            <option value="multiply">Multiplication</option>
          </select>
        </div>

        {/* Matrix A */}
        <div>
          <p className="font-medium mb-2">Matrix A</p>
          <div
            className="grid gap-2"
            style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}
          >
            {a.map((row, i) =>
              row.map((val, j) => (
                <input
                  key={`a-${i}-${j}`}
                  type="number"
                  value={val}
                  onChange={(e) =>
                    updateMatrix(setA, i, j, e.target.value)
                  }
                  className="px-3 py-2 rounded"
                  style={{
                    border: "1px solid var(--border)",
                    backgroundColor: "var(--surface)",
                  }}
                />
              ))
            )}
          </div>
        </div>

        {/* Matrix B */}
        <div>
          <p className="font-medium mb-2">Matrix B</p>
          <div
            className="grid gap-2"
            style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}
          >
            {b.map((row, i) =>
              row.map((val, j) => (
                <input
                  key={`b-${i}-${j}`}
                  type="number"
                  value={val}
                  onChange={(e) =>
                    updateMatrix(setB, i, j, e.target.value)
                  }
                  className="px-3 py-2 rounded"
                  style={{
                    border: "1px solid var(--border)",
                    backgroundColor: "var(--surface)",
                  }}
                />
              ))
            )}
          </div>
        </div>

        {error && (
          <p className="text-sm text-red-500">{error}</p>
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
          Calculate Matrix
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <div aria-live="polite">
          <ResultCard
            variant="primary"
            icon={<Grid size={20} />}
            label="Result Matrix"
            value={result
              .map((row) => `[ ${row.join("  ")} ]`)
              .join("\n")}
          />
        </div>
      )}

      {/* ================= SEO BLOG CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          What Is a Matrix Calculator?
        </h2>

        <p>
          A Matrix Calculator is a mathematical tool used to perform
          operations such as addition, subtraction, and multiplication
          on matrices. It is widely used in algebra, engineering,
          computer science, and physics.
        </p>

        <h3 className="font-semibold">
          Supported Matrix Operations
        </h3>

        <ul className="list-disc pl-5">
          <li>Addition of matrices</li>
          <li>Subtraction of matrices</li>
          <li>Multiplication of 2×2 and 3×3 matrices</li>
        </ul>

        <h3 className="font-semibold">
          Why Use a Matrix Calculator?
        </h3>

        <ul className="list-disc pl-5">
          <li>Accurate and instant results</li>
          <li>Ideal for students and exams</li>
          <li>Eliminates manual calculation errors</li>
          <li>Supports linear algebra learning</li>
        </ul>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ Matrix calculations are based on standard linear algebra
        rules. Results are for educational and informational purposes
        only.
      </aside>
    </section>
  );
}
