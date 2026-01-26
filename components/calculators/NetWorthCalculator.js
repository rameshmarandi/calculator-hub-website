"use client";

import { useState } from "react";
import {
  Calculator,
  Wallet,
  TrendingUp,
  IndianRupee,
  MinusCircle,
  PlusCircle,
} from "lucide-react";

import { AmountInput } from "../inputs/AmountInput";
import { ResultCard } from "../ResultCard";

export default function NetWorthCalculator() {
  /* ASSETS */
  const [cash, setCash] = useState("");
  const [investments, setInvestments] = useState("");
  const [property, setProperty] = useState("");
  const [otherAssets, setOtherAssets] = useState("");

  /* LIABILITIES */
  const [loans, setLoans] = useState("");
  const [creditCards, setCreditCards] = useState("");
  const [otherLiabilities, setOtherLiabilities] = useState("");

  const [result, setResult] = useState(null);

  function calculateNetWorth(e) {
    e.preventDefault();

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
      className="rounded-xl p-6 space-y-10"
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)",
      }}
    >
      {/* HEADER */}
      <header>
        <h1 className="text-2xl font-bold mb-1">
          Net Worth Calculator
        </h1>

        <p className="text-sm leading-relaxed">
          Use this Net Worth Calculator to calculate your total assets,
          liabilities, and overall net worth. It gives a clear picture
          of your financial health.
        </p>
      </header>

      {/* FORM */}
      <form onSubmit={calculateNetWorth} className="space-y-8">
        {/* ASSETS */}
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

        {/* LIABILITIES */}
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

        <button
          type="submit"
          className="w-full py-2.5 rounded-md font-medium flex items-center justify-center gap-2"
          style={{ backgroundColor: "var(--primary)", color: "#fff" }}
        >
          <Calculator size={18} />
          Calculate Net Worth
        </button>
      </form>

      {/* RESULT */}
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
            variant="neutral"
            icon={<IndianRupee size={20} />}
            label="Net Worth"
            value={`₹ ${result.netWorth.toLocaleString("en-IN")}`}
          />
        </div>
      )}

      {/* INFO (SEO SECTION) */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          What is Net Worth?
        </h2>

        <p>
          Net worth is the difference between what you own (assets) and
          what you owe (liabilities). It is one of the most important
          indicators of financial health.
        </p>

        <p>
          A positive net worth means your assets exceed your liabilities,
          while a negative net worth indicates higher debt than assets.
        </p>

        <p className="font-medium">
          Tracking your net worth regularly helps in better financial
          planning, investment decisions, and achieving long-term goals
          like FIRE and retirement.
        </p>
      </article>
    </section>
  );
}
