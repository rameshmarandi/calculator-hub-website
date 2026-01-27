"use client";

import { useState } from "react";
import { Calculator, Binary } from "lucide-react";

import { ResultCard } from "../../ResultCard";

export default function BinaryCalculator() {
  const [binary, setBinary] = useState("");
  const [decimal, setDecimal] = useState("");
  const [mode, setMode] = useState("binaryToDecimal");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    if (mode === "binaryToDecimal") {
      if (!binary || !/^[01]+$/.test(binary)) {
        setError("Please enter a valid binary number (0s and 1s only).");
        return false;
      }
    }

    if (mode === "decimalToBinary") {
      if (decimal === "" || isNaN(decimal) || Number(decimal) < 0) {
        setError("Please enter a valid non-negative decimal number.");
        return false;
      }
    }

    setError("");
    return true;
  }

  /* ---------------- CALCULATION ---------------- */
  function calculate(e) {
    e.preventDefault();
    if (!validate()) return;

    let output;

    if (mode === "binaryToDecimal") {
      output = parseInt(binary, 2);
    } else {
      output = Number(decimal).toString(2);
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
          Binary Calculator
        </h1>
        <p className="text-sm leading-relaxed">
          Use this Binary Calculator to convert numbers between binary
          and decimal formats. It is useful for computer science,
          programming, and digital electronics.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculate} className="space-y-4">
        {/* Mode */}
        <div className="space-y-1">
          <label className="text-sm font-medium">
            Conversion Type
          </label>
          <select
            value={mode}
            onChange={(e) => {
              setMode(e.target.value);
              setBinary("");
              setDecimal("");
              setResult(null);
              setError("");
            }}
            className="w-full px-3 py-2 rounded"
            style={{
              border: "1px solid var(--border)",
              backgroundColor: "var(--surface)",
            }}
          >
            <option value="binaryToDecimal">
              Binary → Decimal
            </option>
            <option value="decimalToBinary">
              Decimal → Binary
            </option>
          </select>
        </div>

        {/* Input */}
        {mode === "binaryToDecimal" ? (
          <div className="space-y-1">
            <label className="text-sm font-medium">
              Binary Number
            </label>
            <input
              type="text"
              value={binary}
              onChange={(e) => setBinary(e.target.value)}
              placeholder="e.g. 101101"
              className="w-full px-3 py-2 rounded"
              style={{
                border: "1px solid var(--border)",
                backgroundColor: "var(--surface)",
              }}
            />
          </div>
        ) : (
          <div className="space-y-1">
            <label className="text-sm font-medium">
              Decimal Number
            </label>
            <input
              type="number"
              value={decimal}
              onChange={(e) => setDecimal(e.target.value)}
              placeholder="e.g. 45"
              className="w-full px-3 py-2 rounded"
              style={{
                border: "1px solid var(--border)",
                backgroundColor: "var(--surface)",
              }}
            />
          </div>
        )}

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
          Convert
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result !== null && (
        <div aria-live="polite">
          <ResultCard
            variant="primary"
            icon={<Binary size={20} />}
            label="Conversion Result"
            value={result}
          />
        </div>
      )}

      {/* ================= SEO BLOG CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          What Is a Binary Calculator?
        </h2>

        <p>
          A Binary Calculator is a tool that converts numbers between
          binary (base-2) and decimal (base-10) systems. Binary numbers
          are fundamental to computer systems and digital electronics.
        </p>

        <h3 className="font-semibold">
          Binary and Decimal Number Systems
        </h3>

        <ul className="list-disc pl-5">
          <li>Binary uses only 0 and 1</li>
          <li>Decimal uses digits from 0 to 9</li>
          <li>Computers operate internally using binary</li>
        </ul>

        <h3 className="font-semibold">
          Why Use a Binary Calculator?
        </h3>

        <ul className="list-disc pl-5">
          <li>Quick number conversions</li>
          <li>Helpful for computer science students</li>
          <li>Used in programming and networking</li>
          <li>Eliminates manual conversion errors</li>
        </ul>

        <p>
          This binary calculator provides fast and accurate conversions
          suitable for learning and professional use.
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ Binary conversions are calculated using standard base-2 and
        base-10 number system rules. Results are for informational
        purposes only.
      </aside>
    </section>
  );
}
