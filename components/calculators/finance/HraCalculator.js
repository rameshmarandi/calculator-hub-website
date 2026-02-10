"use client";

import { useState } from "react";

import CalculatorLayout from "@/components/core/CalculatorLayout";
import ResultHero from "@/components/core/ResultHero";
import StatsGrid from "@/components/core/StatsGrid";
import ExplanationText from "@/components/core/ExplanationText";

import { AmountInput } from "@/components/inputs/AmountInput";
import { formatINR } from "@/lib/format";
import HRACalculatorArticle from "../../content/finance/HRACalculatorArticle";

/*
  HRA exemption = minimum of:
  1. Actual HRA received
  2. Rent paid – 10% of basic
  3. 50% basic (metro) or 40% basic (non-metro)
*/

export default function HraCalculator() {
  const [values, setValues] = useState({
    basic: "",
    hra: "",
    rent: "",
    metro: true,
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ================= VALIDATION ================= */

  function validate() {
    const { basic, hra, rent } = values;

    if (!basic || basic <= 0) return "Enter valid basic salary";
    if (hra < 0) return "Enter valid HRA received";
    if (!rent || rent <= 0) return "Enter valid rent paid";

    return "";
  }

  /* ================= CALCULATE ================= */

  function handleCalculate() {
    const err = validate();

    if (err) {
      setError(err);
      setResult(null);
      return;
    }

    setError("");

    const basic = Number(values.basic);
    const hra = Number(values.hra);
    const rent = Number(values.rent);

    const rule1 = hra;
    const rule2 = Math.max(rent - 0.1 * basic, 0);
    const rule3 = (values.metro ? 0.5 : 0.4) * basic;

    const exempt = Math.min(rule1, rule2, rule3);
    const taxable = hra - exempt;

    setResult({
      exempt,
      taxable,
      percent: (exempt / hra) * 100,
    });
  }

  /* ================= UI ================= */

  return (
    <CalculatorLayout
      title="HRA Calculator"
      subtitle="Calculate tax-exempt House Rent Allowance under Indian tax rules."
      badges={[
        "100% Free",
        "Instant Results",
        "Accurate Formula",
        "No Signup Required",
      ]}
    >
      {/* INPUTS */}
      <div className="space-y-4">
        <AmountInput
          label="Basic Salary (Annual)"
          value={values.basic}
          onChange={(v) => setValues({ ...values, basic: v })}
        />

        <AmountInput
          label="HRA Received (Annual)"
          value={values.hra}
          onChange={(v) => setValues({ ...values, hra: v })}
        />

        <AmountInput
          label="Rent Paid (Annual)"
          value={values.rent}
          onChange={(v) => setValues({ ...values, rent: v })}
        />

        <select
          value={values.metro ? "metro" : "non"}
          onChange={(e) =>
            setValues({ ...values, metro: e.target.value === "metro" })
          }
          className="rounded-lg border px-3 py-2"
        >
          <option value="metro">Metro City (50%)</option>
          <option value="non">Non-Metro (40%)</option>
        </select>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button
        onClick={handleCalculate}
        className="w-full py-2.5 rounded-lg bg-[var(--primary)] text-white mt-4"
      >
        Calculate HRA
      </button>

      {/* RESULTS */}
      {result && (
        <>
          <ResultHero label="Tax Exempt HRA" value={result.exempt} />

          <StatsGrid
            items={[
              {
                label: "Total HRA Received",
                value: formatINR(values.hra),
              },
              {
                label: "Taxable HRA",
                value: formatINR(result.taxable),
                variant: "warning",
              },
              {
                label: "Exemption %",
                value: result.percent.toFixed(2) + "%",
                variant: "success",
              },
            ]}
          />

          <ExplanationText
            text={`Out of ${formatINR(
              values.hra
            )} HRA received, ${formatINR(
              result.exempt
            )} is tax-free and ${formatINR(
              result.taxable
            )} is taxable based on rent and city type.`}
          />
        </>
      )}
      <HRACalculatorArticle/>
    </CalculatorLayout>
  );
}
