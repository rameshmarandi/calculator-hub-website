"use client";

import { useMemo, useState } from "react";
import { Tag } from "lucide-react";

import { ResultCard } from "../../ResultCard";
import { AmountInput } from "@/components/inputs/AmountInput";

export default function DiscountCalculator() {
  /* ================= STATE ================= */

  const [originalPrice, setOriginalPrice] = useState(1000);
  const [discountPercent, setDiscountPercent] = useState(20);

  /* ================= INPUT VALIDATION ================= */

  function handlePriceChange(setter) {
    return (value) => {
      let num = Number(value);

      if (isNaN(num) || !isFinite(num)) num = 0;

      if (num < 0) num = 0;
      if (num > 1_000_000_000) num = 1_000_000_000;

      setter(num);
    };
  }

  function handleDiscountChange(setter) {
    return (value) => {
      let num = Number(value);

      if (isNaN(num) || !isFinite(num)) num = 0;

      // strict 0–100 validation
      if (num < 0) num = 0;
      if (num > 100) num = 100;

      setter(num);
    };
  }

  /* ================= INTERNAL FORMULA ================= */

  function calculateDiscount({ originalPrice, discountPercent }) {
    const price = Number(originalPrice) || 0;
    const discount = Number(discountPercent) || 0;

    if (price <= 0) {
      return {
        primary: 0,
        breakdown: {
          discountAmount: 0,
          finalPrice: 0,
        },
        stats: {},
        meta: {
          error: "invalid_price",
        },
      };
    }

    const discountAmount = (price * discount) / 100;
    const finalPrice = price - discountAmount;

    return {
      primary: finalPrice,

      breakdown: {
        discountAmount,
        finalPrice,
      },

      stats: {
        roundedDiscount: Number(discountAmount.toFixed(2)),
        roundedFinal: Number(finalPrice.toFixed(2)),
      },

      meta: {
        unit: "currency",
      },
    };
  }

  /* ================= DERIVED RESULT ================= */

  const result = useMemo(() => {
    return calculateDiscount({
      originalPrice,
      discountPercent,
    });
  }, [originalPrice, discountPercent]);

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
          Discount Calculator
        </h1>
        <p className="text-sm leading-relaxed">
          Calculate final price after applying a discount instantly.
        </p>
      </header>

      {/* ================= INPUTS ================= */}
      <div className="space-y-4">
        <AmountInput
          label="Original Price"
          value={originalPrice}
          onChange={handlePriceChange(setOriginalPrice)}
          prefix=""
        />

        <AmountInput
          label="Discount Percentage"
          value={discountPercent}
          onChange={handleDiscountChange(setDiscountPercent)}
          prefix=""
        />
      </div>

      {/* ================= RESULT (ALWAYS VISIBLE) ================= */}
      <div aria-live="polite">
        <ResultCard
          variant="success"
          icon={<Tag size={20} />}
          label="Discount Result"
          value={`You Save: ${result?.stats?.roundedDiscount || 0} | Final Price: ${
            result?.stats?.roundedFinal || 0
          }`}
        />
      </div>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="p-3 rounded border">
          <p className="text-muted">Discount Amount</p>
          <p className="font-semibold">
            {result?.stats?.roundedDiscount || 0}
          </p>
        </div>

        <div className="p-3 rounded border">
          <p className="text-muted">Final Price</p>
          <p className="font-semibold">
            {result?.stats?.roundedFinal || 0}
          </p>
        </div>
      </div>

      {/* ================= SEO ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          What Is a Discount Calculator?
        </h2>

        <p>
          A discount calculator helps you determine the final price after applying a percentage discount.
        </p>

        <h3 className="font-semibold">Formula</h3>

        <p className="font-mono text-xs p-3 rounded ">
          Discount = Price × % ÷ 100
          <br />
          Final Price = Price − Discount
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        Results are calculated using standard formulas.
      </aside>
    </section>
  );
}