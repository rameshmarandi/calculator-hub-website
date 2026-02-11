"use client";

import { useMemo, useState } from "react";

import InputsGrid from "@/components/core/InputsGrid";
import ResultHero from "@/components/core/ResultHero";
import ExplanationText from "@/components/core/ExplanationText";
import CalculatorLayout from "@/components/core/CalculatorLayout";
import { exchangeRates  , convertCurrency} from "../../../lib/formulas";


export default function CurrencyConverter() {
  const [values, setValues] = useState({
    amount: "",
  });

  const [from, setFrom] = useState("INR");
  const [to, setTo] = useState("USD");

  /* ---------- show only when filled ---------- */

  const isComplete = values.amount !== "";

  /* ---------- derived result ---------- */

  const result = useMemo(() => {
    if (!isComplete) return null;

    return convertCurrency({
      amount: values.amount,
      from,
      to,
    });
  }, [values, from, to, isComplete]);

  /* ---------- inputs ---------- */

  const inputs = [
    {
      key: "amount",
      label: "Amount",
      type: "amount",
      placeholder: "1,000",
    },
  ];

  const currencies = Object.keys(exchangeRates);

  /* ---------- UI ---------- */

  return (
    <CalculatorLayout
      title="Currency Converter"
      subtitle="Convert currencies instantly using exchange rate logic."
      badges={[
        "Instant Results",
        "Accurate Logic",
        "100% Free",
        "No Signup Required",
      ]}
    >
      <InputsGrid inputs={inputs} values={values} setValues={setValues} />

      {/* selects */}
      <div className="grid grid-cols-2 gap-4">
        <select
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="p-2 border rounded-md bg-[var(--surface)]"
        >
          {currencies.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <select
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="p-2 border rounded-md bg-[var(--surface)]"
        >
          {currencies.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      {result && (
        <>
          <ResultHero
            label="Converted Amount"
            value={result.convertedAmount}
          />

          <ExplanationText
            text={`${values.amount} ${from} equals approximately ${result.convertedAmount} ${to} based on current rates.`}
          />
        </>
      )}
    </CalculatorLayout>
  );
}
