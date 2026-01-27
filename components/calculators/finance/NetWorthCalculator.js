"use client";

import { useState } from "react";
import {
  Calculator,
  Wallet,
  TrendingUp,
  IndianRupee,
  MinusCircle,
  PlusCircle,
  AlertTriangle,
} from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { ResultCard } from "../../ResultCard";

export default function NetWorthCalculator() {
  /* ---------------- ASSETS ---------------- */
  const [cash, setCash] = useState("");
  const [investments, setInvestments] = useState("");
  const [property, setProperty] = useState("");
  const [otherAssets, setOtherAssets] = useState("");

  /* ---------------- LIABILITIES ---------------- */
  const [loans, setLoans] = useState("");
  const [creditCards, setCreditCards] = useState("");
  const [otherLiabilities, setOtherLiabilities] = useState("");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    const allValues = [
      cash,
      investments,
      property,
      otherAssets,
      loans,
      creditCards,
      otherLiabilities,
    ];

    const hasAnyValue = allValues.some(
      v => v !== "" && Number(v) > 0
    );

    if (!hasAnyValue) {
      setError("Please enter at least one asset or liability value.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- CALCULATION ---------------- */
  function calculateNetWorth(e) {
    e.preventDefault();

    if (!validate()) {
      setResult(null);
      return;
    }

    const totalAssets =
      Number(cash || 0) +
      Number(investments || 0) +
      Number(property || 0) +
      Number(otherAssets || 0);

    const totalLiabilities =
      Number(loans || 0) +
      Number(creditCards || 0) +
      Number(otherLiabilities || 0);

    const netWorth = totalAssets - totalLiabilities;

    setResult({
      assets: Math.round(totalAssets),
      liabilities: Math.round(totalLiabilities),
      netWorth: Math.round(netWorth),
    });
  }

  return (
    <section
      className="rounded-xl p-6 space-y-12"
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)",
      }}
    >
      {/* ================= HEADER ================= */}
      <header className="space-y-2">
        <h1 className="text-2xl font-bold">
          Net Worth Calculator
        </h1>

        <p className="text-sm leading-relaxed">
          This Net Worth Calculator helps you calculate your total assets,
          liabilities, and overall net worth. It gives a clear snapshot
          of your current financial health.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateNetWorth} className="space-y-10">
        {/* -------- ASSETS -------- */}
        <div className="space-y-4">
          <h2 className="font-semibold flex items-center gap-2">
            <PlusCircle size={18} />
            Assets
          </h2>

          <AmountInput
            label="Cash & Bank Balance"
            value={cash}
            onChange={setCash}
            placeholder="2,00,000"
          />

          <AmountInput
            label="Investments (MFs, Stocks, FD, PPF)"
            value={investments}
            onChange={setInvestments}
            placeholder="10,00,000"
          />

          <AmountInput
            label="Property / Real Estate Value"
            value={property}
            onChange={setProperty}
            placeholder="50,00,000"
          />

          <AmountInput
            label="Other Assets"
            value={otherAssets}
            onChange={setOtherAssets}
            placeholder="1,00,000"
          />
        </div>

        {/* -------- LIABILITIES -------- */}
        <div className="space-y-4">
          <h2 className="font-semibold flex items-center gap-2">
            <MinusCircle size={18} />
            Liabilities
          </h2>

          <AmountInput
            label="Loans (Home, Car, Personal)"
            value={loans}
            onChange={setLoans}
            placeholder="20,00,000"
          />

          <AmountInput
            label="Credit Card Dues"
            value={creditCards}
            onChange={setCreditCards}
            placeholder="50,000"
          />

          <AmountInput
            label="Other Liabilities"
            value={otherLiabilities}
            onChange={setOtherLiabilities}
            placeholder="25,000"
          />
        </div>

        {error && (
          <p className="text-sm text-red-500 flex items-center gap-2">
            <AlertTriangle size={14} />
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full py-2.5 rounded-md font-medium flex items-center justify-center gap-2"
          style={{ backgroundColor: "var(--primary)", color: "#fff" }}
        >
          <Calculator size={18} />
          Calculate Net Worth
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <div className="grid md:grid-cols-3 gap-4" aria-live="polite">
          <ResultCard
            variant="primary"
            icon={<Wallet size={20} />}
            label="Total Assets"
            value={`₹ ${result.assets.toLocaleString("en-IN")}`}
          />

          <ResultCard
            variant="warning"
            icon={<TrendingUp size={20} />}
            label="Total Liabilities"
            value={`₹ ${result.liabilities.toLocaleString("en-IN")}`}
          />

          <ResultCard
            variant={result.netWorth >= 0 ? "success" : "danger"}
            icon={<IndianRupee size={20} />}
            label="Net Worth"
            value={`₹ ${result.netWorth.toLocaleString("en-IN")}`}
          />
        </div>
      )}

      {/* ================= ARTICLE (SEO) ================= */}
      <article className="space-y-6 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          What is Net Worth?
        </h2>

        <p>
          Net worth is the difference between what you own (assets) and
          what you owe (liabilities). It is one of the most important
          indicators of your overall financial health.
        </p>

        <pre
          className="text-xs p-3 rounded font-mono"
          style={{ backgroundColor: "var(--surface-2)" }}
        >
Net Worth = Total Assets − Total Liabilities
        </pre>

        <h2 className="font-semibold text-base">
          Why Net Worth Matters
        </h2>

        <ul className="list-disc pl-5 space-y-1">
          <li>Shows true financial position</li>
          <li>Helps track progress over time</li>
          <li>Guides investment and saving decisions</li>
          <li>Essential for FIRE and retirement planning</li>
        </ul>

        <h2 className="font-semibold text-base">
          Positive vs Negative Net Worth
        </h2>

        <p>
          A <strong>positive net worth</strong> means your assets are greater
          than your liabilities, indicating financial stability.
          A <strong>negative net worth</strong> suggests higher debt and
          signals the need for better debt management.
        </p>

        <h2 className="font-semibold text-base">
          How Often Should You Calculate Net Worth?
        </h2>

        <p>
          Financial experts recommend tracking net worth at least once
          every 6–12 months to measure progress and adjust financial goals.
        </p>
      </article>
    </section>
  );
}
