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

import PersonalLoanEMIArticle from "../../content/finance/PersonalLoanEMIArticle";

export default function PersonalLoanEmiCalculator() {

  /* ================= STATE ================= */

  const [values, setValues] = useState({
    loan: 300000,
    rate: 14.5,
    years: 3,
  });

  /* ================= SAFE VALUES ================= */

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
      label: "Personal Loan Amount",
      type: "amount",
      placeholder: "3,00,000",
      hint: "Enter total personal loan amount",
    },
    {
      key: "rate",
      label: "Interest Rate (%)",
      type: "percent",
      placeholder: "14.5",
      hint: "Annual personal loan interest rate",
    },
    {
      key: "years",
      label: "Loan Tenure (Years)",
      type: "number",
      placeholder: "3",
      hint: "Repayment duration in years",
      min: 1,
      max: 7,
    },
  ];

  return (
    <CalculatorLayout
      title="Personal Loan EMI Calculator"
      subtitle="Calculate monthly EMI, total interest payable and full personal loan repayment schedule instantly before applying."
      badges={[
        "100% Free",
        "Instant Results",
        "Bank Formula Accurate",
        "No Signup Required",
      ]}
    >

      {/* INPUTS */}
      <InputsGrid inputs={inputs} values={values} setValues={setValues} />

      {/* RESULTS (ALWAYS VISIBLE) */}

      <ResultHero label="Monthly EMI" value={result.emi} showPerDay />

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
            value: years * 12,
            variant: "info",
          },
        ]}
      />

      <ExplanationText
        text={`For a personal loan of ${formatINR(
          loan
        )} at ${rate}% for ${years} years, your EMI will be ${formatINR(
          result.emi
        )} per month. You will pay ${formatINR(
          result.totalInterest
        )} as interest and ${formatINR(
          result.totalPayment
        )} in total over the entire tenure.`}
      />

      <ComparisonMatrix
        columns={["Tenure", "EMI", "Total Interest"]}
        rows={[1, 2, 3, 4, 5, 6, 7].map((y) => {
          const r = calculateEmi(
            loan || 300000,
            rate || 14.5,
            y
          );

          return [
            `${y} years`,
            formatINR(r.emi),
            formatINR(r.totalInterest),
          ];
        })}
      />

      {Array.isArray(result?.schedule) && result.schedule.length > 0 && (
        <DataTable data={result.schedule} />
      )}

      {/* ARTICLE */}
      <PersonalLoanEMIArticle />
    </CalculatorLayout>
  );
}