"use client";

import { useMemo, useState } from "react";

import InputsGrid from "@/components/core/InputsGrid";
import StatsGrid from "@/components/core/StatsGrid";
import ResultHero from "@/components/core/ResultHero";
import ExplanationText from "@/components/core/ExplanationText";
import CalculatorLayout from "@/components/core/CalculatorLayout";

import { formatINR } from "@/lib/format";
import { calculateEducationLoan } from "../../../lib/formulas";
import EducationLoanRepaymentArticle from "../../content/finance/EducationLoanRepaymentArticle";

export default function EducationLoanRepaymentCalculator() {

  /* ---------------- STATE ---------------- */

  const [values, setValues] = useState({
    amount: "1000000",
    rate: "9",
    years: "10",
  });

  /* ---------------- SAFE NUMBERS ---------------- */

  const principal = Number(values.amount) || 0;
  const annualRate = Number(values.rate) || 0;
  const years = Number(values.years) || 0;

  /* ---------------- RESULT ---------------- */

  const result = useMemo(() => {
    const calculated = calculateEducationLoan({
      principal,
      annualRate,
      years,
    });

    return (
      calculated || {
        emi: 0,
        interestPaid: 0,
        totalPayable: 0,
        months: 0,
      }
    );
  }, [principal, annualRate, years]);

  console.log("edute_res_t" , result)

  /* ---------------- INPUT CONFIG ---------------- */

  const inputs = [
    {
      key: "amount",
      label: "Education Loan Amount",
      type: "amount",
      placeholder: "10,00,000",
    },
    {
      key: "rate",
      label: "Interest Rate (%)",
      type: "percent",
      placeholder: "9",
    },
    {
      key: "years",
      label: "Loan Tenure (Years)",
      type: "number",
      placeholder: "10",
      min: 1,
    },
  ];

  /* ---------------- UI ---------------- */

  return (
    <CalculatorLayout
      title="Education Loan Repayment Calculator"
      subtitle="Estimate EMI, interest and total repayment instantly."
      badges={[
        "Instant Results",
        "Bank Formula Accurate",
        "100% Free",
        "No Signup Required",
      ]}
    >
      <InputsGrid
        inputs={inputs}
        values={values}
        setValues={setValues}
      />

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
            label: "Total Repayment Amount",
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
        text={`For a loan of ${formatINR(
          principal
        )} at ${annualRate}% for ${years} years, your EMI will be ${formatINR(
          result.emi
        )} and total repayment will be ${formatINR(
          result.totalPayable
        )}.`}
      />

      {/* RESULT DISCLAIMER */}

      <p className="text-xs text-[var(--text-muted)] mt-3">
        Note: The results shown by this calculator are estimates based on the
        values entered and the standard EMI formula used by banks. Actual
        repayment amounts may vary depending on lender policies, processing
        fees, interest rate changes, and moratorium conditions.
      </p>

      <EducationLoanRepaymentArticle />

    </CalculatorLayout>
  );
}