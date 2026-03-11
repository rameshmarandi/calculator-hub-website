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
    amount: "",
    rate: "",
    years: "",
  });

  /* ---------------- READY CHECK ---------------- */

  const isComplete =
    values.amount !== "" && values.rate !== "" && values.years !== "";

  /* ---------------- DERIVED RESULT ---------------- */

  const result = useMemo(() => {
    if (!isComplete) return null;

    return calculateBusinessLoan({
      principal: values.amount,
      annualRate: values.rate,
      years: values.years,
    });
  }, [values, isComplete]);

  /* ---------------- INPUTS ---------------- */

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

      {result && (
        <>
          <ResultHero label="Monthly EMI" value={result.emi} />

          <StatsGrid
            items={[
              {
                label: "Total Interest Payable",
                value: formatINR(result.interestPaid),
                variant: "danger",
              },
              {
                label: "Total Amount Payable",
                value: formatINR(result.totalPayable),
                variant: "warning",
              },
              {
                label: "Total Months",
                value: result.months,
                variant: "info",
              },
            ]}
          />

          <ExplanationText
            text={`For a loan of ${formatINR(
              values.amount,
            )} at ${values.rate}% for ${
              values.years
            } years, your monthly EMI will be ${formatINR(
              result.emi,
            )} and total interest paid will be ${formatINR(
              result.interestPaid,
            )}.`}
          />
        </>
      )}
      {/* ================= CALCULATOR NOTE ================= */}
      <p className="text-xs text-[var(--text-muted)] mt-3">
        Note: Results are estimates for educational purposes. Actual loan terms,
        interest rates, and fees may vary depending on the lender and borrower
        profile.
      </p>

      <BusinessLoanCalculatorArticle />
    </CalculatorLayout>
  );
}
