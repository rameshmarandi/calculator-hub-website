"use client";

import { useMemo, useState } from "react";

import CalculatorLayout from "@/components/core/CalculatorLayout";
import ResultHero from "@/components/core/ResultHero";
import StatsGrid from "@/components/core/StatsGrid";
import ExplanationText from "@/components/core/ExplanationText";

import { AmountInput } from "@/components/inputs/AmountInput";

import { formatINR } from "@/lib/format";
import HRACalculatorArticle from "../../content/finance/HRACalculatorArticle";

export default function HraCalculator() {

  /* ================= STATE ================= */

  const [values, setValues] = useState({
    basic: "600000",
    hra: "240000",
    rent: "300000",
    metro: true,
  });

  /* ================= CALC ================= */

  const result = useMemo(() => {

    const basic = Number(values.basic) || 0;
    const hra = Number(values.hra) || 0;
    const rent = Number(values.rent) || 0;

    const rule1 = hra;

    const rule2 = Math.max(rent - 0.1 * basic, 0);

    const rule3 = (values.metro ? 0.5 : 0.4) * basic;

    const exempt = Math.min(rule1, rule2, rule3);

    const taxable = hra - exempt;

    const percent = hra ? (exempt / hra) * 100 : 0;

    return {
      exempt,
      taxable,
      percent,
    };

  }, [values]);

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

      {/* HERO */}

      <ResultHero label="Tax Exempt HRA" value={result.exempt} />

      {/* STATS */}

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

      {/* EXPLANATION */}

      <ExplanationText
        text={`Out of ${formatINR(
          values.hra
        )} HRA received, ${formatINR(
          result.exempt
        )} is tax-free and ${formatINR(
          result.taxable
        )} is taxable based on rent and city type.`}
      />

      <HRACalculatorArticle/>

    </CalculatorLayout>
  );
}