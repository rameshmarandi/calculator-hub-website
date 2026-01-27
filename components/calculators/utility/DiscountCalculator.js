"use client";

import { useState } from "react";
import { Calculator, Tag } from "lucide-react";

import { ResultCard } from "../../ResultCard";

export default function DiscountCalculator() {
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPercent, setDiscountPercent] = useState("");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    if (
      originalPrice === "" ||
      discountPercent === "" ||
      isNaN(originalPrice) ||
      isNaN(discountPercent)
    ) {
      setError("Please enter valid numeric values.");
      return false;
    }

    if (Number(originalPrice) <= 0) {
      setError("Original price must be greater than zero.");
      return false;
    }

    if (
      Number(discountPercent) < 0 ||
      Number(discountPercent) > 100
    ) {
      setError("Discount percentage must be between 0 and 100.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- DISCOUNT CALCULATION ---------------- */
  function calculateDiscount(e) {
    e.preventDefault();
    if (!validate()) return;

    const price = Number(originalPrice);
    const discount = Number(discountPercent);

    const discountAmount = (price * discount) / 100;
    const finalPrice = price - discountAmount;

    setResult({
      discountAmount: discountAmount.toFixed(2),
      finalPrice: finalPrice.toFixed(2),
    });
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
          Discount Calculator
        </h1>
        <p className="text-sm leading-relaxed">
          Use this Discount Calculator to quickly calculate the final
          price after applying a discount percentage to the original
          price.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateDiscount} className="space-y-4">
        {/* Original Price */}
        <div className="space-y-1">
          <label className="text-sm font-medium">
            Original Price
          </label>
          <input
            type="number"
            value={originalPrice}
            onChange={(e) => setOriginalPrice(e.target.value)}
            placeholder="Enter original price"
            className="w-full px-3 py-2 rounded"
            style={{
              border: "1px solid var(--border)",
              backgroundColor: "var(--surface)",
            }}
          />
        </div>

        {/* Discount Percentage */}
        <div className="space-y-1">
          <label className="text-sm font-medium">
            Discount Percentage (%)
          </label>
          <input
            type="number"
            value={discountPercent}
            onChange={(e) => setDiscountPercent(e.target.value)}
            placeholder="Enter discount percentage"
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
          Calculate Discount
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <div aria-live="polite">
          <ResultCard
            variant="success"
            icon={<Tag size={20} />}
            label="Discount Result"
            value={`You Save: ${result.discountAmount} | Final Price: ${result.finalPrice}`}
          />
        </div>
      )}

      {/* ================= SEO BLOG CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          What Is a Discount Calculator?
        </h2>

        <p>
          A Discount Calculator helps you determine the final price of a
          product after applying a percentage discount. It is commonly
          used during shopping, sales, offers, and budgeting.
        </p>

        <h3 className="font-semibold">
          Discount Calculation Formula
        </h3>

        <p
          className="font-mono text-xs p-3 rounded"
          style={{ backgroundColor: "var(--surface-2)" }}
        >
          Discount Amount = Original Price × Discount % ÷ 100  
          <br />
          Final Price = Original Price − Discount Amount
        </p>

        <ul className="list-disc pl-5">
          <li>Helps calculate savings instantly</li>
          <li>Ensures accurate price comparison</li>
          <li>Works for any discount percentage</li>
        </ul>

        <h3 className="font-semibold">
          Why Use a Discount Calculator?
        </h3>

        <ul className="list-disc pl-5">
          <li>Quick shopping decisions</li>
          <li>Accurate discount calculations</li>
          <li>Useful for sales and offers</li>
          <li>Eliminates manual errors</li>
        </ul>

        <p>
          This discount calculator provides precise results and is
          suitable for everyday use.
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ Discount results are calculated using standard mathematical
        formulas and are for informational purposes only.
      </aside>
    </section>
  );
}
