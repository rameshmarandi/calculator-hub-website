"use client";

import { useState } from "react";
import {
  Calculator,
  TrendingUp,
  IndianRupee,
} from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { ResultCard } from "../../ResultCard";

/* -------- SAMPLE EXCHANGE RATES (BASE: INR) -------- */
const exchangeRates = {
  INR: 1,
  USD: 0.012,
  EUR: 0.011,
  GBP: 0.0095,
  AUD: 0.018,
};

export default function CurrencyConverter() {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("INR");
  const [toCurrency, setToCurrency] = useState("USD");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    if (!amount || Number(amount) <= 0) {
      setError("Please enter a valid amount.");
      return false;
    }

    if (!exchangeRates[fromCurrency] || !exchangeRates[toCurrency]) {
      setError("Invalid currency selection.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- CALCULATION ---------------- */
  function convertCurrency(e) {
    e.preventDefault();
    if (!validate()) return;

    const baseAmount =
      Number(amount) / exchangeRates[fromCurrency];

    const convertedAmount =
      baseAmount * exchangeRates[toCurrency];

    setResult({
      convertedAmount: Math.round(convertedAmount * 100) / 100,
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
          Currency Converter
        </h1>
        <p className="text-sm leading-relaxed">
          Convert amounts between different currencies using latest
          exchange rate logic.
        </p>
      </header>

      {/* FORM */}
      <form onSubmit={convertCurrency} className="space-y-4">
        <AmountInput
          label="Amount"
          value={amount}
          onChange={setAmount}
          placeholder="1,000"
        />

        {/* CURRENCY SELECT */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">
              From Currency
            </label>
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="w-full mt-1 p-2 border rounded-md"
            >
              {Object.keys(exchangeRates).map((cur) => (
                <option key={cur} value={cur}>
                  {cur}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">
              To Currency
            </label>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="w-full mt-1 p-2 border rounded-md"
            >
              {Object.keys(exchangeRates).map((cur) => (
                <option key={cur} value={cur}>
                  {cur}
                </option>
              ))}
            </select>
          </div>
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
          Convert Currency
        </button>
      </form>

      {/* RESULT */}
      {result && (
        <div className="grid md:grid-cols-1 gap-4" aria-live="polite">
          <ResultCard
            variant="primary"
            icon={<IndianRupee size={20} />}
            label="Converted Amount"
            value={`${result.convertedAmount} ${toCurrency}`}
          />
        </div>
      )}

      {/* SEO CONTENT */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          How Currency Conversion Works
        </h2>

        <p>
          Currency conversion allows you to convert money from one
          currency to another using exchange rates. These rates
          fluctuate based on global market conditions.
        </p>

        <p className="font-mono text-xs p-3 rounded"
          style={{ backgroundColor: "var(--surface-2)" }}
        >
          Converted Amount = Amount × Exchange Rate
        </p>

        <ul className="list-disc pl-5">
          <li>Rates change daily</li>
          <li>Banks may apply a margin</li>
          <li>Forex rates differ from card rates</li>
          <li>Use for travel & international payments</li>
        </ul>

        <p>
          This currency converter provides an estimated value.
          Actual rates may vary depending on banks or forex providers.
        </p>
      </article>

      {/* DISCLAIMER */}
      <aside className="text-xs text-muted">
        ⚠️ Exchange rates shown are indicative only and may differ
        from real-time market rates.
      </aside>
    </section>
  );
}
