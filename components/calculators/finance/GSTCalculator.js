"use client";

import { useMemo, useState } from "react";

import InputsGrid from "@/components/core/InputsGrid";
import StatsGrid from "@/components/core/StatsGrid";
import ResultHero from "@/components/core/ResultHero";
import ExplanationText from "@/components/core/ExplanationText";
import CalculatorLayout from "@/components/core/CalculatorLayout";

import { formatINR } from "@/lib/format";
import { calculateGST } from "../../../lib/formulas";
import GSTCalculatorArticle from "../../content/finance/GSTCalculatorArticle";


export default function GSTCalculator() {
  const [values, setValues] = useState({
    amount: "",
    rate: "18",
  });

  const [type, setType] = useState("add");

  /* ---------- show only when filled ---------- */

  const isComplete =
    values.amount !== "" &&
    values.rate !== "";

  /* ---------- derived result ---------- */

  const result = useMemo(() => {
    if (!isComplete) return null;

    return calculateGST({
      amount: values.amount,
      rate: values.rate,
      type,
    });
  }, [values, type, isComplete]);

  /* ---------- inputs ---------- */

  const inputs = [
    {
      key: "amount",
      label:
        type === "add"
          ? "Amount (Excluding GST)"
          : "Amount (Including GST)",
      type: "amount",
      placeholder: "10,000",
    },
    {
      key: "rate",
      label: "GST Rate (%)",
      type: "percent",
      placeholder: "18",
    },
  ];

  /* ---------- UI ---------- */

  return (
    <CalculatorLayout
      title="GST Calculator"
      subtitle="Add or remove GST instantly for accurate pricing."
      badges={[
        "Instant Results",
        "Accurate Formula",
        "100% Free",
        "No Signup Required",
      ]}
    >
      <InputsGrid inputs={inputs} values={values} setValues={setValues} />

      {/* toggle buttons */}
      <div className="flex gap-3">
        <button
          onClick={() => setType("add")}
          className={`flex-1 py-2 rounded-md text-sm font-medium ${
            type === "add"
              ? "bg-[var(--primary)] text-white"
              : "border"
          }`}
        >
          Add GST
        </button>

        <button
          onClick={() => setType("remove")}
          className={`flex-1 py-2 rounded-md text-sm font-medium ${
            type === "remove"
              ? "bg-[var(--primary)] text-white"
              : "border"
          }`}
        >
          Remove GST
        </button>
      </div>

      {result && (
        <>
          <ResultHero
            label="GST Amount"
            value={result.gstAmount}
          />

          <StatsGrid
            items={[
              {
                label:
                  type === "add"
                    ? "Total Amount (Including GST)"
                    : "Original Amount (Excluding GST)",
                value: formatINR(result.finalAmount),
                variant: type === "add" ? "warning" : "info",
              },
            ]}
          />

          <ExplanationText
            text={`GST of ${formatINR(
              result.gstAmount
            )} is ${
              type === "add" ? "added to" : "removed from"
            } the base amount.`}
          />
        </>
      )}

      <GSTCalculatorArticle/>
    </CalculatorLayout>
  );
}
