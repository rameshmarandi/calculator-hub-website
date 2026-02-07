"use client";

import { useMemo, useState } from "react";

import CalculatorLayout from "@/components/core/CalculatorLayout";
import InputsGrid from "@/components/core/InputsGrid";
import ResultHero from "@/components/core/ResultHero";
import DonutBreakdownChart from "@/components/core/DonutBreakdownChart";
import StatsGrid from "@/components/core/StatsGrid";
import ComparisonMatrix from "@/components/core/ComparisonMatrix";
import DataTable from "@/components/core/DataTable";
import ExplanationText from "@/components/core/ExplanationText";

import { calculateEmi } from "@/lib/emiMath";
import { formatINR } from "@/lib/format";

import EMIArticle from "../../content/finance/EMIArticle";
import HomeLoanEMIArticle from "../../content/finance/HomeLoanEMIArticle";

/*
  STRUCTURE RULES FOLLOWED:
  - page orchestrates only
  - math in lib
  - layout reusable
  - no default values
  - results only after valid input
*/

export default function HomeLoanEmiCalculator() {
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

  /* ================= CALCULATION ================= */

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
      label: "Home Loan Amount",
      type: "amount",
      placeholder: "50,00,000",
      hint: "Enter total home loan amount",
    },
    {
      key: "rate",
      label: "Interest Rate (%)",
      type: "percent",
      placeholder: "8.5",
      hint: "Annual home loan interest rate",
    },
    {
      key: "years",
      label: "Loan Tenure (Years)",
      type: "number",
      placeholder: "20",
      hint: "Repayment duration in years",
      min: 1,
      max: 35,
    },
  ];

  /* ================= UI ================= */

  return (
    <CalculatorLayout
      title="Home Loan EMI Calculator"
      subtitle="Calculate monthly EMI, total interest payable and complete home loan repayment schedule instantly before applying for a housing loan."
      badges={[
        "100% Free",
        "Instant Results",
        "Bank Formula Accurate",
        "No Signup Required",
      ]}>
      {/* ================= INPUTS ================= */}
      <InputsGrid inputs={inputs} values={values} setValues={setValues} />

      {/* ================= RESULTS ================= */}
      {result && (
        <>
          {/* MAIN HERO RESULT */}
          <ResultHero label="Monthly EMI" value={result.emi} />

          {/* DONUT BREAKDOWN */}
          <DonutBreakdownChart
            data={[
              {
                name: "Principal",
                value: Number(values.loan),
              },
              {
                name: "Interest",
                value: result.totalInterest,
              },
            ]}
          />

          {/* STATS GRID */}
          <StatsGrid
            items={[
              {
                label: "Loan Amount",
                value: formatINR(Number(values.loan)),
                variant: "neutral",
              },
              {
                label: "Total Interest Payable",
                value: formatINR(result.totalInterest),
                variant: "danger",
              },
              {
                label: "Total Payment",
                value: formatINR(result.totalPayment),
                variant: "warning",
              },
              {
                label: "Total Months",
                value: Number(values.years) * 12,
                variant: "info",
              },
            ]}
          />

          {/* EXPLANATION SENTENCE (SEO + UX) */}
          <ExplanationText
            text={`For a home loan of ${formatINR(
              Number(values.loan),
            )} at ${values.rate}% interest for ${values.years} years, your monthly EMI will be ${formatINR(
              result.emi,
            )}. You will pay ${formatINR(
              result.totalInterest,
            )} as interest and ${formatINR(
              result.totalPayment,
            )} in total over the entire tenure.`}
          />

          {/* TENURE COMPARISON */}
          <ComparisonMatrix
            columns={["Tenure", "EMI", "Total Interest"]}
            rows={[10, 15, 20, 25, 30].map((y) => {
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

          {/* FULL AMORTIZATION TABLE */}
          <DataTable data={result.schedule} />
        </>
      )}

      {/* ================= SEO CONTENT ================= */}
      <HomeLoanEMIArticle />
    </CalculatorLayout>
  );
}
