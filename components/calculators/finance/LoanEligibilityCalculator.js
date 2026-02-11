"use client";

import { useMemo, useState } from "react";

import InputsGrid from "@/components/core/InputsGrid";
import StatsGrid from "@/components/core/StatsGrid";
import ResultHero from "@/components/core/ResultHero";
import ExplanationText from "@/components/core/ExplanationText";
import CalculatorLayout from "@/components/core/CalculatorLayout";

import { formatINR } from "@/lib/format";
import { calculateLoanEligibility } from "../../../lib/formulas";
import LoanEligibilityArticle from "../../content/finance/LoanEligibilityArticle";

export default function LoanEligibilityCalculator() {
  const [values, setValues] = useState({
    monthlyIncome: "",
    existingEmi: "",
    rate: "",
    years: "",
  });

  const isValid =
    Number(values.monthlyIncome) > 0 &&
    Number(values.rate) > 0 &&
    Number(values.years) > 0;


    const isComplete =
  values.monthlyIncome !== "" &&
  values.rate !== "" &&
  values.years !== "" &&
  Number(values.monthlyIncome) > 0 &&
  Number(values.rate) > 0 &&
  Number(values.years) > 0;


 const result = useMemo(() => {
  if (!isComplete) return null;

  return calculateLoanEligibility({
    income: values.monthlyIncome,
    existingEmi: values.existingEmi,
    annualRate: values.rate,
    years: values.years,
  });
}, [values, isComplete]);


  const inputs = [
    {
      key: "monthlyIncome",
      label: "Monthly Income",
      type: "amount",
      placeholder: "50,000",
      hint: "Your monthly take home salary",
    },
    {
      key: "existingEmi",
      label: "Existing EMI",
      type: "amount",
      placeholder: "5,000",
      hint: "Other running EMIs (optional)",
    },
    {
      key: "rate",
      label: "Interest Rate (%)",
      type: "percent",
      placeholder: "9",
      hint: "Bank interest rate",
    },
    {
      key: "years",
      label: "Loan Tenure (Years)",
      type: "number",
      placeholder: "20",
      hint: "Loan duration",
      min: 1,
    },
  ];

  return (
    <CalculatorLayout
      title="Loan Eligibility Calculator"
      subtitle="Find how much home or personal loan you can afford based on income and EMI capacity."
      badges={[
        "Instant Results",
        "Bank Standard Formula",
        "100% Free",
        "No Signup Required",
      ]}
    >
      <InputsGrid inputs={inputs} values={values} setValues={setValues} />

      {isComplete && result  && (
        <>
          <ResultHero
            label="Eligible Loan Amount"
            value={result?.eligibleAmount ?? 0}
          />

          <StatsGrid
            items={[
              {
                label: "Affordable EMI",
                value: formatINR(result?.emi ?? 0),
                variant: "neutral",
              },
              {
                label: "Loan Tenure",
                value: `${values.years || 0} Years`,
                variant: "info",
              },
              {
                label: "Total Months",
                value: result?.months ?? 0,
                variant: "warning",
              },
              {
                label: "Max EMI Allowed (40%)",
                value: formatINR((Number(values.monthlyIncome) || 0) * 0.4),
                variant: "danger",
              },
            ]}
          />

          <ExplanationText
            text={`Based on 40% of your income, you can safely pay an EMI of ${formatINR(
              result?.emi ?? 0,
            )} per month. Your eligible loan amount is approximately ${formatINR(
              result?.eligibleAmount ?? 0,
            )}.`}
          />
        </>
      )}

      <LoanEligibilityArticle/>
    </CalculatorLayout>
  );
}
