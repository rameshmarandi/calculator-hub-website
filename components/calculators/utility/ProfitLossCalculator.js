"use client";

import { useMemo, useState } from "react";
import { BarChart2 } from "lucide-react";

import { ResultCard } from "../../ResultCard";
import { AmountInput } from "@/components/inputs/AmountInput";
import ProfitLossCalculatorArticle from "../../content/utility/ProfitLossCalculatorArticle";

export default function ProfitLossCalculator() {
  /* ================= STATE ================= */

  const [costPrice, setCostPrice] = useState(100);
  const [sellingPrice, setSellingPrice] = useState(120);

  /* ================= INPUT VALIDATION ================= */

  function handleValueChange(setter) {
    return (value) => {
      let num = Number(value);

      if (isNaN(num) || !isFinite(num)) num = 0;

      if (num < 0) num = 0;
      if (num > 1_000_000_000) num = 1_000_000_000;

      setter(num);
    };
  }

  /* ================= INTERNAL FORMULA ================= */

  function calculateProfitLoss({ costPrice, sellingPrice }) {
    const cp = Number(costPrice) || 0;
    const sp = Number(sellingPrice) || 0;

    if (cp <= 0) {
      return {
        primary: 0,
        breakdown: {
          amount: 0,
          percentage: 0,
          type: "invalid",
        },
        stats: {},
        meta: {},
      };
    }

    let type = "neutral";
    let amount = 0;
    let percentage = 0;

    if (sp > cp) {
      type = "profit";
      amount = sp - cp;
      percentage = (amount / cp) * 100;
    } else if (cp > sp) {
      type = "loss";
      amount = cp - sp;
      percentage = (amount / cp) * 100;
    }

    return {
      primary: amount,

      breakdown: {
        type,
        amount,
        percentage,
      },

      stats: {
        roundedAmount: Number(amount.toFixed(2)),
        roundedPercentage: Number(percentage.toFixed(2)),
      },

      meta: {
        unit: "%",
      },
    };
  }

  /* ================= DERIVED RESULT ================= */

  const result = useMemo(() => {
    return calculateProfitLoss({
      costPrice,
      sellingPrice,
    });
  }, [costPrice, sellingPrice]);

  /* ================= UI HELPERS ================= */

  const variant =
    result?.breakdown?.type === "profit"
      ? "success"
      : result?.breakdown?.type === "loss"
      ? "danger"
      : "primary";

  const label =
    result?.breakdown?.type === "profit"
      ? "Profit"
      : result?.breakdown?.type === "loss"
      ? "Loss"
      : "No Profit No Loss";

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
          Profit and Loss Calculator
        </h1>
        <p className="text-sm leading-relaxed">
          Instantly calculate profit or loss and percentage based on cost and selling price.
        </p>
      </header>

      {/* ================= INPUTS ================= */}
      <div className="space-y-4">
        <AmountInput
          label="Cost Price"
          value={costPrice}
          onChange={handleValueChange(setCostPrice)}
          prefix=""
        />

        <AmountInput
          label="Selling Price"
          value={sellingPrice}
          onChange={handleValueChange(setSellingPrice)}
          prefix=""
        />
      </div>

      {/* ================= RESULT ================= */}
      <div aria-live="polite">
        <ResultCard
          variant={variant}
          icon={<BarChart2 size={20} />}
          label={label}
          value={`${result?.stats?.roundedAmount || 0} (${
            result?.stats?.roundedPercentage || 0
          }%)`}
        />
      </div>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="p-3 rounded border">
          <p className="text-muted">Amount</p>
          <p className="font-semibold">
            {result?.stats?.roundedAmount || 0}
          </p>
        </div>

        <div className="p-3 rounded border">
          <p className="text-muted">Percentage</p>
          <p className="font-semibold">
            {result?.stats?.roundedPercentage || 0}%
          </p>
        </div>
      </div>

      {/* ================= SEO ================= */}
      <ProfitLossCalculatorArticle/>
    </section>
  );
}