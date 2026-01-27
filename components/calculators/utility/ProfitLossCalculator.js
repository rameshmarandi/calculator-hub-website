"use client";

import { useState } from "react";
import { Calculator, BarChart2 } from "lucide-react";

import { ResultCard } from "../../ResultCard";

export default function ProfitLossCalculator() {
  const [costPrice, setCostPrice] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    if (
      costPrice === "" ||
      sellingPrice === "" ||
      isNaN(costPrice) ||
      isNaN(sellingPrice)
    ) {
      setError("Please enter valid numeric values.");
      return false;
    }

    if (Number(costPrice) <= 0) {
      setError("Cost price must be greater than zero.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- PROFIT / LOSS CALCULATION ---------------- */
  function calculateProfitLoss(e) {
    e.preventDefault();
    if (!validate()) return;

    const cp = Number(costPrice);
    const sp = Number(sellingPrice);

    if (sp > cp) {
      const profit = sp - cp;
      const profitPercent = (profit / cp) * 100;

      setResult({
        type: "profit",
        amount: profit.toFixed(2),
        percentage: profitPercent.toFixed(2),
      });
    } else if (cp > sp) {
      const loss = cp - sp;
      const lossPercent = (loss / cp) * 100;

      setResult({
        type: "loss",
        amount: loss.toFixed(2),
        percentage: lossPercent.toFixed(2),
      });
    } else {
      setResult({
        type: "neutral",
        amount: "0.00",
        percentage: "0.00",
      });
    }
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
          Profit and Loss Calculator
        </h1>
        <p className="text-sm leading-relaxed">
          Use this Profit and Loss Calculator to determine whether you
          made a profit or loss based on cost price and selling price.
          It also calculates profit or loss percentage.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateProfitLoss} className="space-y-4">
        {/* Cost Price */}
        <div className="space-y-1">
          <label className="text-sm font-medium">
            Cost Price
          </label>
          <input
            type="number"
            value={costPrice}
            onChange={(e) => setCostPrice(e.target.value)}
            placeholder="Enter cost price"
            className="w-full px-3 py-2 rounded"
            style={{
              border: "1px solid var(--border)",
              backgroundColor: "var(--surface)",
            }}
          />
        </div>

        {/* Selling Price */}
        <div className="space-y-1">
          <label className="text-sm font-medium">
            Selling Price
          </label>
          <input
            type="number"
            value={sellingPrice}
            onChange={(e) => setSellingPrice(e.target.value)}
            placeholder="Enter selling price"
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
          Calculate Profit / Loss
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <div aria-live="polite">
          <ResultCard
            variant={
              result.type === "profit"
                ? "success"
                : result.type === "loss"
                ? "danger"
                : "primary"
            }
            icon={<BarChart2 size={20} />}
            label={
              result.type === "profit"
                ? "Profit"
                : result.type === "loss"
                ? "Loss"
                : "No Profit No Loss"
            }
            value={`${result.amount} (${result.percentage}%)`}
          />
        </div>
      )}

      {/* ================= SEO BLOG CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          What Is a Profit and Loss Calculator?
        </h2>

        <p>
          A Profit and Loss Calculator helps you determine whether a
          transaction resulted in profit or loss. It compares the cost
          price and selling price to calculate the exact amount and
          percentage.
        </p>

        <h3 className="font-semibold">
          Profit and Loss Formulas
        </h3>

        <p
          className="font-mono text-xs p-3 rounded"
          style={{ backgroundColor: "var(--surface-2)" }}
        >
          Profit = Selling Price − Cost Price  
          <br />
          Profit % = (Profit ÷ Cost Price) × 100  
          <br /><br />
          Loss = Cost Price − Selling Price  
          <br />
          Loss % = (Loss ÷ Cost Price) × 100
        </p>

        <ul className="list-disc pl-5">
          <li>Used in business and finance</li>
          <li>Helps analyze transactions accurately</li>
          <li>Works for any valid price values</li>
        </ul>

        <h3 className="font-semibold">
          Why Use a Profit and Loss Calculator?
        </h3>

        <ul className="list-disc pl-5">
          <li>Instant profit or loss calculation</li>
          <li>Eliminates manual errors</li>
          <li>Useful for traders, students, and businesses</li>
          <li>Supports financial decision-making</li>
        </ul>

        <p>
          This calculator provides fast and accurate profit and loss
          results for everyday and professional use.
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ Profit and loss calculations are based on standard
        mathematical formulas and are for informational purposes only.
      </aside>
    </section>
  );
}
