"use client";

import { useMemo, useState } from "react";
import { Grid } from "lucide-react";

import { ResultCard } from "../../ResultCard";
import { AmountInput } from "@/components/inputs/AmountInput";
import MatrixCalculatorArticle from "../../content/utility/MatrixCalculatorArticle";

export default function MatrixCalculator() {
  /* ================= STATE ================= */

  const [size, setSize] = useState(2);
  const [operation, setOperation] = useState("add");

  const createMatrix = (n, defaultVal = 0) =>
    Array.from({ length: n }, () =>
      Array.from({ length: n }, () => defaultVal)
    );

  const [a, setA] = useState(createMatrix(2));
  const [b, setB] = useState(createMatrix(2));

  /* ================= HELPERS ================= */

  function updateMatrix(setter, i, j, value) {
    setter((prev) => {
      const copy = prev.map((row) => [...row]);

      let num = Number(value);
      if (isNaN(num) || !isFinite(num)) num = 0;

      if (num > 1_000_000) num = 1_000_000;
      if (num < -1_000_000) num = -1_000_000;

      copy[i][j] = num;
      return copy;
    });
  }

  function handleSizeChange(val) {
    const s = Number(val);
    setSize(s);
    setA(createMatrix(s));
    setB(createMatrix(s));
  }

  /* ================= MATRIX OPERATIONS ================= */

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
    const R = createMatrix(size);

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        for (let k = 0; k < size; k++) {
          R[i][j] += A[i][k] * B[k][j];
        }
      }
    }
    return R;
  }

  /* ================= INTERNAL FORMULA ================= */

  function calculate({ a, b, operation }) {
    let R = createMatrix(size);

    if (operation === "add") R = addMatrices(a, b);
    if (operation === "subtract") R = subtractMatrices(a, b);
    if (operation === "multiply") R = multiplyMatrices(a, b);

    return {
      primary: R,

      breakdown: {
        operation,
        size,
      },

      stats: {
        matrix: R,
      },

      meta: {},
    };
  }

  /* ================= DERIVED RESULT ================= */

  const result = useMemo(() => {
    return calculate({ a, b, operation });
  }, [a, b, operation, size]);

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
          Matrix Calculator
        </h1>
        <p className="text-sm leading-relaxed">
          Perform matrix addition, subtraction, and multiplication instantly.
        </p>
      </header>

      {/* ================= CONTROLS ================= */}
      <div className="space-y-4">
        <select
          value={size}
          onChange={(e) => handleSizeChange(e.target.value)}
          className="w-full px-3 py-2 rounded border"
        >
          <option value={2}>2 × 2</option>
          <option value={3}>3 × 3</option>
        </select>

        <select
          value={operation}
          onChange={(e) => setOperation(e.target.value)}
          className="w-full px-3 py-2 rounded border"
        >
          <option value="add">Addition</option>
          <option value="subtract">Subtraction</option>
          <option value="multiply">Multiplication</option>
        </select>
      </div>

      {/* ================= MATRICES ================= */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Matrix A */}
        <div>
          <p className="font-medium mb-2">Matrix A</p>
          <div
            className="grid gap-2"
            style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}
          >
            {a.map((row, i) =>
              row.map((val, j) => (
                <AmountInput
                  key={`a-${i}-${j}`}
                  label=""
                  value={val}
                  onChange={(v) => updateMatrix(setA, i, j, v)}
                  prefix=""
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
                <AmountInput
                  key={`b-${i}-${j}`}
                  label=""
                  value={val}
                  onChange={(v) => updateMatrix(setB, i, j, v)}
                  prefix=""
                />
              ))
            )}
          </div>
        </div>
      </div>

      {/* ================= RESULT ================= */}
      <div aria-live="polite">
        <ResultCard
          variant="primary"
          icon={<Grid size={20} />}
          label="Result Matrix"
          value={result?.stats?.matrix
            ?.map((row) => `[ ${row.join("  ")} ]`)
            .join("\n")}
        />
      </div>

      {/* ================= SEO ================= */}
      <MatrixCalculatorArticle/>
    </section>
  );
}