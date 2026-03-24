"use client";

import { useMemo, useState } from "react";

import InputsGrid from "@/components/core/InputsGrid";
import StatsGrid from "@/components/core/StatsGrid";
import ExplanationText from "@/components/core/ExplanationText";
import CalculatorLayout from "@/components/core/CalculatorLayout";

import { calculateEmi } from "@/lib/emiMath";
import { formatINR } from "@/lib/format";
import ResultHero from "@/components/core/ResultHero";
import dynamic from "next/dynamic";
import EMIArticle from "../../content/finance/EMIArticle";

const DonutBreakdownChart = dynamic(
  () => import("@/components/core/DonutBreakdownChart"),
  { ssr: false, loading: () => <div className="h-40">Loading chart...</div> }
);

const ComparisonMatrix = dynamic(
  () => import("@/components/core/ComparisonMatrix"),
  { ssr: false }
);

const DataTable = dynamic(
  () => import("@/components/core/DataTable"),
  { ssr: false }
);

export default function EmiCalculator() {

  /* ================= DEFAULT STATE ================= */

  const [values, setValues] = useState({
    loan: 1000000,
    rate: 9.5,
    years: 10,
  });

  /* ================= SAFE NUMBERS ================= */

  const loan = Number(values.loan) || 0;
  const rate = Number(values.rate) || 0;
  const years = Number(values.years) || 0;

  /* ================= CALCULATION ================= */

  const result = useMemo(() => {
    if (loan <= 0 || rate <= 0 || years <= 0) {
      return {
        emi: 0,
        totalInterest: 0,
        totalPayment: 0,
        schedule: [],
      };
    }

    return calculateEmi(loan, rate, years);
  }, [loan, rate, years]);

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

  return (
    <CalculatorLayout
      title="EMI Calculator"
      subtitle="Calculate your monthly EMI, total interest payable and full repayment schedule instantly before taking a loan."
      badges={[
        "100% Free",
        "Instant Results",
        "Bank Formula Accurate",
        "No Signup Required",
      ]}
    >

      <InputsGrid inputs={inputs} values={values} setValues={setValues} />

      {/* RESULT SECTION NEVER DISAPPEARS */}

      <ResultHero
        label="Monthly EMI"
        value={result.emi}
        showPerDay
      />

      <DonutBreakdownChart
        title="Principal vs Interest Split"
        data={[
          { name: "Principal", value: loan },
          { name: "Interest", value: result.totalInterest },
        ]}
      />

      <StatsGrid
        items={[
          {
            label: "Loan Amount",
            value: formatINR(loan),
            variant: "neutral",
          },
          {
            label: "Total Interest",
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
            value: years * 12,
            variant: "info",
          },
        ]}
      />

      <ExplanationText
        text={`For a loan of ${formatINR(
          loan
        )} at ${rate}% for ${years} years, your EMI will be ${formatINR(
          result.emi
        )} per month and total interest paid will be ${formatINR(
          result.totalInterest
        )}.`}
      />

      <ComparisonMatrix
        columns={["Tenure", "EMI", "Total Interest"]}
        rows={[5, 10, 15, 20].map((y) => {
          const r = calculateEmi(
            loan || 1000000,
            rate || 9.5,
            y
          );

          return [
            `${y} years`,
            formatINR(r.emi),
            formatINR(r.totalInterest),
          ];
        })}
      />

      {Array.isArray(result?.schedule) && result?.schedule?.length > 0 && (
        <DataTable data={result?.schedule} />
      )}

      <section className="mt-20">
        <EMIArticle />
      </section>

    </CalculatorLayout>
  );
}