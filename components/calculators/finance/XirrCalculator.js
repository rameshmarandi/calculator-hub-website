"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/core/CalculatorLayout";
import StatsGrid from "@/components/core/StatsGrid";
import ResultHero from "@/components/core/ResultHero";
import DonutBreakdownChart from "@/components/core/DonutBreakdownChart";
import { AmountInput } from "@/components/inputs/AmountInput";
import { calculateXirr } from "../../../lib/formulas";
import { formatINR } from "@/lib/format";
import ComparisonMatrix from "@/components/core/ComparisonMatrix";
import ExplanationText from "@/components/core/ExplanationText";
import XirrCalculatorArticle from "../../content/finance/XirrCalculatorArticle";

const DAY = 1000 * 60 * 60 * 24;

export default function XirrCalculator() {
  /* ================= STATE ================= */

  const [flows, setFlows] = useState([
    { amount: "", date: "" },
    { amount: "", date: "" },
  ]);

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [warning, setWarning] = useState("");

  /* ================= HELPERS ================= */

  function update(i, key, value) {
    const copy = [...flows];
    copy[i][key] = value;
    setFlows(copy);
  }

  function addRow() {
    setFlows((p) => [...p, { amount: "", date: "" }]);
  }

  function removeRow(i) {
    if (flows.length <= 2) return;
    setFlows((p) => p.filter((_, idx) => idx !== i));
  }

  /* ================= VALIDATION ================= */

  function validate() {
    let hasNeg = false;
    let hasPos = false;

    for (const f of flows) {
      if (!f.amount || !f.date) {
        setError("Enter amount and date for all rows.");
        return false;
      }

      if (Number(f.amount) < 0) hasNeg = true;
      if (Number(f.amount) > 0) hasPos = true;
    }

    if (!hasNeg || !hasPos) {
      setError("Add at least one negative and one positive cash flow.");
      return false;
    }

    setError("");
    return true;
  }

  /* ================= CALCULATION ================= */

  function handleCalculate() {
    if (!validate()) {
      setResult(null);
      return;
    }

    const normalized = flows
      .map((f) => ({
        amount: Number(f.amount),
        date: new Date(f.date),
      }))
      .sort((a, b) => a.date - b.date);

    const firstDate = normalized[0].date;
    const lastDate = normalized.at(-1).date;

    const days = (lastDate - firstDate) / DAY;

    const invested = Math.abs(
      normalized.filter(f => f.amount < 0).reduce((s, f) => s + f.amount, 0)
    );

    const returned = normalized
      .filter(f => f.amount > 0)
      .reduce((s, f) => s + f.amount, 0);

    const profit = returned - invested;

    const absolutePercent = (profit / invested) * 100;

    let xirr = null;

    /* ---------- guard ---------- */
    if (days >= 90) {
      const val = calculateXirr(normalized);

      if (Number.isFinite(val)) xirr = val;
    } else {
      setWarning("XIRR requires at least 3 months of data");
    }

    setResult({
      invested,
      returned,
      profit,
      absolutePercent,
      xirr,
    });
  }

  /* ================= UI ================= */

  return (
    <CalculatorLayout
      title="XIRR Calculator"
      subtitle="Calculate annualized return for irregular cash flows."
      badges={[
        "100% Free",
        "Instant Results",
        "Accurate Returns",
        "No Signup Required",
      ]}
    >
      {/* FLOWS */}
      <div className="space-y-4">
        {flows.map((f, i) => (
          <div key={i} className="grid md:grid-cols-3 gap-3 items-end">
            <AmountInput
              label={i === 0 ? "Cash Flow Amount" : undefined}
              value={f.amount}
              onChange={(v) => update(i, "amount", v)}
              allowNegative
              placeholder="-10,000 or 15,000"
            />

            <input
              type="date"
              value={f.date}
              onChange={(e) => update(i, "date", e.target.value)}
              className="rounded-lg border px-3 py-2"
            />

            <button onClick={() => removeRow(i)} className="text-red-500">
              Remove
            </button>
          </div>
        ))}

        <button onClick={addRow} className="text-blue-600 text-sm">
          + Add Cash Flow
        </button>
      </div>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      {warning && <p className="text-yellow-600 text-sm mt-2">{warning}</p>}

      <button
        onClick={handleCalculate}
        className="w-full py-2.5 rounded-lg bg-[var(--primary)] text-white mt-4"
      >
        Calculate XIRR
      </button>

      {/* RESULTS */}
     {/* ================= RESULTS ================= */}
{result && (
  <>
    {/* HERO */}
    {result.xirr !== null && (
      <ResultHero
        label="XIRR (Annualized Return)"
        value={result.xirr}
      />
    )}

    {/* DONUT BREAKDOWN */}
    <DonutBreakdownChart
      data={[
        { name: "Investment", value: result.invested },
        { name: "Returns", value: result.returned },
      ]}
    />

    {/* STATS */}
    <StatsGrid
      items={[
        {
          label: "Total Investment",
          value: formatINR(result.invested),
        },
        {
          label: "Total Returns",
          value: formatINR(result.returned),
        },
        {
          label: result.profit >= 0 ? "Profit" : "Loss",
          value: formatINR(Math.abs(result.profit)),
          variant: result.profit >= 0 ? "success" : "danger",
        },
        {
          label: "Absolute Return %",
          value: `${result.absolutePercent.toFixed(2)}%`,
        },
        ...(result.xirr !== null
          ? [
              {
                label: "XIRR %",
                value: `${result.xirr.toFixed(2)}%`,
                variant: "primary",
              },
            ]
          : []),
      ]}
    />

    {/* EXPLANATION */}
    <ExplanationText
      text={`You invested ${formatINR(
        result.invested
      )} and received ${formatINR(
        result.returned
      )}. Your net ${
        result.profit >= 0 ? "profit" : "loss"
      } is ${formatINR(Math.abs(result.profit))}. ${
        result.xirr !== null
          ? `Your annualized return (XIRR) is ${result.xirr.toFixed(2)}%.`
          : "XIRR requires at least 3 months of data for meaningful calculation."
      }`}
    />

    {/* COMPARISON */}
    <ComparisonMatrix
      columns={["Metric", "Value"]}
      rows={[
        ["Absolute Return", `${result.absolutePercent.toFixed(2)}%`],
        [
          "Annualized (XIRR)",
          result.xirr !== null
            ? `${result.xirr.toFixed(2)}%`
            : "Not available",
        ],
      ]}
    />
  </>
)}
<XirrCalculatorArticle/>
    </CalculatorLayout>
  );
}
