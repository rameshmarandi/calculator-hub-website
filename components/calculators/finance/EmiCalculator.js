"use client";

import { useMemo, useState } from "react";

import InputsGrid from "@/components/core/InputsGrid";
import StatsGrid from "@/components/core/StatsGrid";
// import DonutBreakdownChart from "@/components/core/DonutBreakdownChart";
// import ComparisonMatrix from "@/components/core/ComparisonMatrix";
// import DataTable from "@/components/core/DataTable";
import ExplanationText from "@/components/core/ExplanationText";
import CalculatorLayout from "@/components/core/CalculatorLayout";

import { calculateEmi } from "@/lib/emiMath";
import { formatINR } from "@/lib/format";
import ResultHero from "@/components/core/ResultHero";
import dynamic from "next/dynamic";
import EMIArticle from "../../content/finance/EMIArticle";

const DonutBreakdownChart = dynamic(
  () => import("@/components/core/DonutBreakdownChart"),
  { ssr: false, loading: () => <div className="h-40">Loading chart...</div> },
);
const ComparisonMatrix = dynamic(
  () => import("@/components/core/ComparisonMatrix"),
  { ssr: false },
);
const DataTable = dynamic(() => import("@/components/core/DataTable"), {
  ssr: false,
});

/*
  PRO RULES:
  - no prefilled fake values
  - labels mandatory
  - results only after valid input
  - this file only orchestrates components
*/

export default function EmiCalculator() {
  /* ================= STATE ================= */

  const [values, setValues] = useState({
    loan: "",
    rate: "",
    years: "",
  });

  /* ================= VALIDATION ================= */

  const isValid =
    Number(values.loan) > 0 &&
    Number(values.rate) > 0 &&
    Number(values.years) > 0;

  /* ================= CALC ================= */

  const result = useMemo(() => {
    if (!isValid) return null;

    return calculateEmi(
      Number(values.loan),
      Number(values.rate),
      Number(values.years),
    );
  }, [values, isValid]);

  /* ================= INPUT CONFIG ================= */

  const inputs = [
    {
      key: "loan",
      label: "Loan Amount",
      type: "amount",
      placeholder: "10,00,000",
      hint: "Enter total loan amount",
    },
    {
      key: "rate",
      label: "Interest Rate (%)",
      type: "percent",
      placeholder: "9.5",
      hint: "Annual interest rate",
    },
    {
      key: "years",
      label: "Tenure (Years)",
      type: "number",
      placeholder: "10",
      hint: "Loan duration in years",
      min: 1,
    },
  ];

  /* ================= EARLY RETURN ================= */

  return (
    <CalculatorLayout
      title="EMI Calculator"
      subtitle="Calculate your monthly EMI, total interest payable and full repayment schedule instantly before taking a loan."
      badges={[
        "100% Free",
        "Instant Results",
        "Bank Formula Accurate",
        "No Signup Required",
      ]}>
      {/* INPUTS ALWAYS VISIBLE */}
      <InputsGrid inputs={inputs} values={values} setValues={setValues} />

      {/* SHOW RESULTS ONLY AFTER VALID INPUT */}
      {result && (
        <>
          {/* MAIN EMI */}
          <ResultHero label="Monthly EMI" value={result.emi} />

          {/* DONUT BREAKDOWN */}
          <DonutBreakdownChart
            data={[
              { name: "Principal", value: Number(values.loan) },
              { name: "Interest", value: result.totalInterest },
            ]}
          />

          {/* STATS */}
          <StatsGrid
            items={[
              {
                label: "Loan Amount",
                value: formatINR(Number(values.loan)),
                variant: "neutral",
              },
              {
                label: "Total Interest",
                value: formatINR(result.totalInterest),
                variant: "danger", // red = money lost
              },
              {
                label: "Total Payment",
                value: formatINR(result.totalPayment),
                variant: "warning", // amber = heavy amount
              },
              {
                label: "Total Months",
                value: Number(values.years) * 12,
                variant: "info", // blue = time
              },
            ]}
          />

          {/* EXPLANATION */}
          <ExplanationText
            text={`For a loan of ${formatINR(
              Number(values.loan),
            )} at ${values.rate}% for ${values.years} years, your EMI will be ${formatINR(
              result.emi,
            )} per month and total interest paid will be ${formatINR(
              result.totalInterest,
            )}.`}
          />

          {/* COMPARISON */}
          <ComparisonMatrix
            columns={["Tenure", "EMI", "Total Interest"]}
            rows={[5, 10, 15, 20].map((y) => {
              const r = calculateEmi(
                Number(values.loan),
                Number(values.rate),
                y,
              );

              return [
                `${y} years`,
                formatINR(r.emi),
                formatINR(r.totalInterest),
              ];
            })}
          />

          {/* SCHEDULE */}
          <DataTable data={result.schedule} />
        </>
      )}
      <section className="mt-20">
        <EMIArticle />
      </section>
    </CalculatorLayout>
  );
}
