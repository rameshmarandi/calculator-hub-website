"use client";

import { useState } from "react";
import {
  Calculator,
  IndianRupee,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { PercentageInput } from "../../inputs/PercentageInput";
import { ResultCard } from "../../ResultCard";

export default function GSTCalculator() {
  const [amount, setAmount] = useState("");
  const [gstRate, setGstRate] = useState("18");
  const [calculationType, setCalculationType] = useState("add");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    if (!amount || Number(amount) <= 0) {
      setError("Please enter a valid amount.");
      return false;
    }

    if (Number(gstRate) <= 0) {
      setError("Please enter a valid GST rate.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- CALCULATION ---------------- */
  function calculateGST(e) {
    e.preventDefault();
    if (!validate()) return;

    const baseAmount = Number(amount);
    const rate = Number(gstRate);

    let gstAmount = 0;
    let finalAmount = 0;

    if (calculationType === "add") {
      gstAmount = (baseAmount * rate) / 100;
      finalAmount = baseAmount + gstAmount;
    } else {
      gstAmount = (baseAmount * rate) / (100 + rate);
      finalAmount = baseAmount - gstAmount;
    }

    setResult({
      gstAmount: Math.round(gstAmount),
      finalAmount: Math.round(finalAmount),
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
      {/* HEADER */}
      <header>
        <h1 className="text-2xl font-bold mb-1">
          GST Calculator
        </h1>
        <p className="text-sm leading-relaxed">
          Calculate GST amount and final price by adding or removing
          GST at applicable tax rates in India.
        </p>
      </header>

      {/* FORM */}
      <form onSubmit={calculateGST} className="space-y-4">
        <AmountInput
          label={
            calculationType === "add"
              ? "Amount (Excluding GST)"
              : "Amount (Including GST)"
          }
          value={amount}
          onChange={setAmount}
          placeholder="10,000"
        />

        <PercentageInput
          label="GST Rate (%)"
          value={gstRate}
          onChange={setGstRate}
          placeholder="18"
        />

        {/* TYPE TOGGLE */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setCalculationType("add")}
            className={`flex-1 py-2 rounded-md text-sm font-medium ${
              calculationType === "add"
                ? "bg-primary text-white"
                : "border"
            }`}
          >
            Add GST
          </button>

          <button
            type="button"
            onClick={() => setCalculationType("remove")}
            className={`flex-1 py-2 rounded-md text-sm font-medium ${
              calculationType === "remove"
                ? "bg-primary text-white"
                : "border"
            }`}
          >
            Remove GST
          </button>
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
          Calculate GST
        </button>
      </form>

      {/* RESULT */}
      {result && (
        <div className="grid md:grid-cols-2 gap-4" aria-live="polite">
          <ResultCard
            variant="neutral"
            icon={<IndianRupee size={20} />}
            label="GST Amount"
            value={`₹ ${result.gstAmount.toLocaleString("en-IN")}`}
          />

          <ResultCard
            variant="primary"
            icon={
              calculationType === "add" ? (
                <TrendingUp size={20} />
              ) : (
                <TrendingDown size={20} />
              )
            }
            label={
              calculationType === "add"
                ? "Total Amount (Including GST)"
                : "Original Amount (Excluding GST)"
            }
            value={`₹ ${result.finalAmount.toLocaleString(
              "en-IN"
            )}`}
          />
        </div>
      )}

      {/* SEO CONTENT */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          What is GST and How is it Calculated?
        </h2>

        <p>
          GST (Goods and Services Tax) is an indirect tax levied on the
          supply of goods and services in India. It has replaced
          multiple indirect taxes like VAT, service tax, and excise
          duty.
        </p>

        <p
          className="font-mono text-xs p-3 rounded"
          style={{ backgroundColor: "var(--surface-2)" }}
        >
          GST Amount = (Original Amount × GST Rate) ÷ 100
        </p>

        <ul className="list-disc pl-5">
          <li>Common GST slabs: 5%, 12%, 18%, 28%</li>
          <li>Add GST to find final selling price</li>
          <li>Remove GST to find base price</li>
          <li>GST applies to most goods & services</li>
        </ul>

        <p>
          This GST calculator helps businesses and individuals quickly
          compute GST payable or reverse-calculate the original price.
        </p>
      </article>

      {/* DISCLAIMER */}
      <aside className="text-xs text-muted">
        ⚠️ This calculator provides an estimate only. Actual GST
        liability may vary based on applicable rules and notifications.
      </aside>
    </section>
  );
}
