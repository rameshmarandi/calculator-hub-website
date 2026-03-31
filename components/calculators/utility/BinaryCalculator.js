"use client";

import { useMemo, useState } from "react";
import { Binary } from "lucide-react";

import { ResultCard } from "../../ResultCard";
import { AmountInput } from "@/components/inputs/AmountInput";
import BinaryCalculatorArticle from "../../content/utility/BinaryCalculatorArticle";

export default function BinaryCalculator() {
  /* ================= STATE ================= */

  const [binary, setBinary] = useState("1010");
  const [decimal, setDecimal] = useState(10);
  const [mode, setMode] = useState("binaryToDecimal");

  /* ================= INPUT VALIDATION ================= */

  function handleBinaryChange(val) {
    // allow only 0 and 1
    const sanitized = val.replace(/[^01]/g, "");
    setBinary(sanitized);
  }

  function handleDecimalChange(val) {
    let num = Number(val);

    if (isNaN(num) || !isFinite(num)) num = 0;
    if (num < 0) num = 0;
    if (num > 1_000_000_000) num = 1_000_000_000;

    setDecimal(num);
  }

  /* ================= INTERNAL FORMULA ================= */

  function convert({ binary, decimal, mode }) {
    let output = 0;
    let error = null;

    if (mode === "binaryToDecimal") {
      if (!binary) {
        return {
          primary: 0,
          stats: { value: 0 },
          meta: {},
        };
      }

      output = parseInt(binary, 2);
    } else {
      const num = Number(decimal) || 0;
      output = num.toString(2);
    }

    return {
      primary: output,

      breakdown: {
        mode,
      },

      stats: {
        value: output,
      },

      meta: {
        error,
      },
    };
  }

  /* ================= DERIVED RESULT ================= */

  const result = useMemo(() => {
    return convert({ binary, decimal, mode });
  }, [binary, decimal, mode]);

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
          Binary Calculator
        </h1>
        <p className="text-sm leading-relaxed">
          Convert between binary and decimal instantly.
        </p>
      </header>

      {/* ================= INPUTS ================= */}
      <div className="space-y-4">
        {/* Mode */}
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          className="w-full px-3 py-2 rounded border"
        >
          <option value="binaryToDecimal">
            Binary → Decimal
          </option>
          <option value="decimalToBinary">
            Decimal → Binary
          </option>
        </select>

        {/* Dynamic Input */}
        {mode === "binaryToDecimal" ? (
          <div>
            <label className="text-sm font-medium">
              Binary Number
            </label>
            <input
              type="text"
              value={binary}
              onChange={(e) => handleBinaryChange(e.target.value)}
              className="w-full px-3 py-2 rounded border"
              placeholder="e.g. 1010"
            />
          </div>
        ) : (
          <AmountInput
            label="Decimal Number"
            value={decimal}
            onChange={handleDecimalChange}
            prefix=""
          />
        )}
      </div>

      {/* ================= RESULT ================= */}
      <div aria-live="polite">
        <ResultCard
          variant="primary"
          icon={<Binary size={20} />}
          label="Conversion Result"
          value={result?.stats?.value || 0}
        />
      </div>

      {/* ================= STATS ================= */}
      <div className="p-3 rounded border text-sm">
        <p className="text-muted">Mode</p>
        <p className="font-semibold">{mode}</p>
      </div>

      {/* ================= SEO ================= */}
      <BinaryCalculatorArticle/>
    </section>
  );
}