"use client";

import { useState } from "react";
import {
  Calculator,
  TrendingUp,
  Percent,
  Plus,
  Trash2,
  Calendar,
} from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { ResultCard } from "../../ResultCard";

/* ---------------- XIRR HELPERS ---------------- */
function daysBetween(d1, d2) {
  return (d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24);
}

function computeXIRR(cashFlows) {
  let rate = 0.1; // initial guess 10%

  for (let i = 0; i < 100; i++) {
    let f = 0;
    let df = 0;

    for (let j = 0; j < cashFlows.length; j++) {
      const days = daysBetween(cashFlows[0].date, cashFlows[j].date) / 365;
      const amount = cashFlows[j].amount;

      f += amount / Math.pow(1 + rate, days);
      df += (-days * amount) / Math.pow(1 + rate, days + 1);
    }

    const newRate = rate - f / df;
    if (Math.abs(newRate - rate) < 0.000001) {
      return newRate * 100;
    }
    rate = newRate;
  }

  return rate * 100;
}

export default function XirrCalculator() {
  const [cashFlows, setCashFlows] = useState([
    { amount: "", date: "" },
    { amount: "", date: "" },
  ]);

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    let hasNegative = false;
    let hasPositive = false;

    for (const flow of cashFlows) {
      if (!flow.amount || !flow.date) {
        setError("Please enter amount and date for all cash flows.");
        return false;
      }

      if (Number(flow.amount) < 0) hasNegative = true;
      if (Number(flow.amount) > 0) hasPositive = true;
    }

    if (!hasNegative || !hasPositive) {
      setError(
        "XIRR requires at least one investment (negative) and one return (positive)."
      );
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- CALCULATION ---------------- */
  function calculateXirr(e) {
    e.preventDefault();

    if (!validate()) {
      setResult(null);
      return;
    }

    const flows = cashFlows
      .map(f => ({
        amount: Number(f.amount),
        date: new Date(f.date),
      }))
      .sort((a, b) => a.date - b.date);

    const xirr = computeXIRR(flows);

    setResult({
      xirr: xirr.toFixed(2),
    });
  }

  function addRow() {
    setCashFlows([...cashFlows, { amount: "", date: "" }]);
  }

  function removeRow(index) {
    if (cashFlows.length <= 2) return;
    setCashFlows(cashFlows.filter((_, i) => i !== index));
  }

  return (
    <section
      className="rounded-xl p-6 space-y-8"
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)",
      }}
    >
      {/* ================= HEADER ================= */}
      <header>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Percent size={22} />
          XIRR Calculator
        </h1>

        <p className="text-sm leading-relaxed">
          Calculate XIRR (Extended Internal Rate of Return) for investments
          with irregular cash flows such as SIPs, mutual funds, stocks,
          and real-world investments.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateXirr} className="space-y-4">
        {cashFlows.map((flow, index) => (
          <div
            key={index}
            className="grid md:grid-cols-3 gap-3 items-end"
          >
            {/* Amount */}
            <AmountInput
              label={index === 0 ? "Cash Flow Amount" : undefined}
              value={flow.amount}
              onChange={val => {
                const updated = [...cashFlows];
                updated[index].amount = val;
                setCashFlows(updated);
              }}
              placeholder="-10,000 or 15,000"
            />

            {/* ✅ Native Date Input ONLY */}
            <label className="block space-y-1">
              {index === 0 && (
                <span className="text-sm font-medium flex items-center gap-1">
                  <Calendar size={14} />
                  Date
                </span>
              )}
              <input
                type="date"
                value={flow.date}
                onChange={e => {
                  const updated = [...cashFlows];
                  updated[index].date = e.target.value;
                  setCashFlows(updated);
                }}
                className="w-full rounded-md px-3 py-2 border"
                style={{
                  backgroundColor: "var(--surface-2)",
                  borderColor: "var(--border)",
                  color: "var(--text-main)",
                }}
              />
            </label>

            {/* Remove */}
            <button
              type="button"
              onClick={() => removeRow(index)}
              className="text-red-500"
              disabled={cashFlows.length <= 2}
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addRow}
          className="flex items-center gap-2 text-sm text-blue-600"
        >
          <Plus size={16} />
          Add Cash Flow
        </button>

        {error && (
          <p className="text-sm text-red-500">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full py-2.5 rounded-md font-medium flex items-center justify-center gap-2"
          style={{ backgroundColor: "var(--primary)", color: "#fff" }}
        >
          <Calculator size={18} />
          Calculate XIRR
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <ResultCard
          variant="primary"
          icon={<TrendingUp size={20} />}
          label="XIRR (Annualized Return)"
          value={`${result.xirr}%`}
        />
      )}

      {/* ================= SEO INFO ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          What is XIRR?
        </h2>

        <p>
          XIRR (Extended Internal Rate of Return) measures the annualized
          return of investments made at different dates. It is more accurate
          than CAGR for SIPs and irregular cash flows.
        </p>

        <p>
          XIRR is widely used by mutual fund investors, financial advisors,
          and chartered accountants to evaluate real investment performance.
        </p>
      </article>
    </section>
  );
}
