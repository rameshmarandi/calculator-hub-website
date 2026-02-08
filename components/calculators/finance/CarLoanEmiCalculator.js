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
import CarLoanEMIArticle from "../../content/finance/CarLoanEMIArticle";

/*
  RULES:
  - no EMI formula here
  - no validation logic here
  - no custom UI
  - page only orchestrates
  - reuse core components
*/

export default function CarLoanEmiCalculator() {
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
      Number(values.years)
    );
  }, [values, isValid]);

  /* ================= INPUT CONFIG ================= */

  const inputs = [
    {
      key: "loan",
      label: "Car Loan Amount",
      type: "amount",
      placeholder: "8,00,000",
      hint: "Enter vehicle loan amount",
    },
    {
      key: "rate",
      label: "Interest Rate (%)",
      type: "percent",
      placeholder: "9.5",
      hint: "Annual car loan interest rate",
    },
    {
      key: "years",
      label: "Loan Tenure (Years)",
      type: "number",
      placeholder: "5",
      hint: "Repayment duration in years",
      min: 1,
      max: 7,
    },
  ];

  /* ================= UI ================= */

  return (
    <CalculatorLayout
      title="Car Loan EMI Calculator"
      subtitle="Calculate monthly EMI, total interest payable and complete car loan repayment schedule instantly before purchasing your vehicle."
      badges={[
        "100% Free",
        "Instant Results",
        "Bank Formula Accurate",
        "No Signup Required",
      ]}
    >
      {/* INPUTS */}
      <InputsGrid inputs={inputs} values={values} setValues={setValues} />

      {/* RESULTS */}
      {result && (
        <>
          {/* MAIN EMI */}
          <ResultHero label="Monthly EMI" value={result.emi} showPerDay/>

          {/* BREAKDOWN */}
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

          {/* EXPLANATION */}
          <ExplanationText
            text={`For a car loan of ${formatINR(
              Number(values.loan)
            )} at ${values.rate}% for ${values.years} years, your EMI will be ${formatINR(
              result.emi
            )} per month. You will pay ${formatINR(
              result.totalInterest
            )} as interest and ${formatINR(
              result.totalPayment
            )} in total over the tenure.`}
          />

          {/* TENURE COMPARISON */}
          <ComparisonMatrix
            columns={["Tenure", "EMI", "Total Interest"]}
            rows={[3, 4, 5, 6, 7].map((y) => {
              const r = calculateEmi(
                Number(values.loan),
                Number(values.rate),
                y
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

      {/* SEO CONTENT */}
      <CarLoanEMIArticle />
    </CalculatorLayout>
  );
}
