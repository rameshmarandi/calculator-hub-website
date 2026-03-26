"use client";

import { useMemo, useState } from "react";

import InputsGrid from "@/components/core/InputsGrid";
import StatsGrid from "@/components/core/StatsGrid";
import ResultHero from "@/components/core/ResultHero";
import ExplanationText from "@/components/core/ExplanationText";
import CalculatorLayout from "@/components/core/CalculatorLayout";

import { formatINR } from "@/lib/format";
import { calculateBusinessLoan } from "../../../lib/formulas";
import BusinessLoanCalculatorArticle from "../../content/finance/BusinessLoanCalculatorArticle";

export default function BusinessLoanCalculator() {

  /* ---------------- STATE ---------------- */

  const [values, setValues] = useState({
    amount: "1000000",
    rate: "12",
    years: "5",
  });

  /* ---------------- SAFE NUMBERS ---------------- */

  const principal = Number(values.amount) || 0;
  const annualRate = Number(values.rate) || 0;
  const years = Number(values.years) || 0;

  /* ---------------- RESULT ---------------- */

  const result = useMemo(() => {
    return (
      calculateBusinessLoan({
        principal,
        annualRate,
        years,
      }) || {
        emi: 0,
        interestPaid: 0,
        totalPayable: 0,
        months: 0,
      }
    );
  }, [principal, annualRate, years]);

  /* ---------------- INPUT CONFIG ---------------- */

  const inputs = [
    {
      key: "amount",
      label: "Loan Amount",
      type: "amount",
      placeholder: "10,00,000",
    },
    {
      key: "rate",
      label: "Interest Rate (%)",
      type: "percent",
      placeholder: "12",
    },
    {
      key: "years",
      label: "Loan Tenure (Years)",
      type: "number",
      placeholder: "5",
      min: 1,
    },
  ];

  /* ---------------- UI ---------------- */

  return (
    <CalculatorLayout
      title="Business Loan Calculator"
      subtitle="Estimate EMI, interest and total repayment instantly."
      badges={[
        "Instant Results",
        "Bank Formula Accurate",
        "100% Free",
        "No Signup Required",
      ]}
    >
      <InputsGrid inputs={inputs} values={values} setValues={setValues} />

      <ResultHero
        label="Monthly EMI"
        value={formatINR(result.emi || 0)}
      />

      <StatsGrid
        items={[
          {
            label: "Total Interest Payable",
            value: formatINR(result.interestPaid || 0),
            variant: "danger",
          },
          {
            label: "Total Amount Payable",
            value: formatINR(result.totalPayable || 0),
            variant: "warning",
          },
          {
            label: "Total Months",
            value: result.months || 0,
            variant: "info",
          },
        ]}
      />

      <ExplanationText
        text={`For a loan of ${formatINR(principal)} at ${annualRate}% for ${years} years, your monthly EMI will be ${formatINR(result.emi)} and total interest paid will be ${formatINR(result.interestPaid)}.`}
      />

      <p className="text-xs text-[var(--text-muted)] mt-3">
        Note: Results are estimates for educational purposes. Actual loan terms,
        interest rates, and fees may vary depending on the lender and borrower
        profile.
      </p>

      <BusinessLoanCalculatorArticle />

    </CalculatorLayout>
  );
}