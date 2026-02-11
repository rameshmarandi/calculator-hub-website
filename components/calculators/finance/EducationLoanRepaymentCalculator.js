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
    amount: "",
    rate: "",
    years: "",
  });

  /* ---------------- READY CHECK ---------------- */

  const isComplete =
    Number(values.amount) > 0 &&
    Number(values.rate) > 0 &&
    Number(values.years) > 0;

  /* ---------------- DERIVED RESULT ---------------- */

  const result = useMemo(() => {
    if (!isComplete) return null;

    return calculateEducationLoan({
      principal: values.amount,
      annualRate: values.rate,
      years: values.years,
    });
  }, [values, isComplete]);

  /* ---------------- INPUTS ---------------- */

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
      <InputsGrid inputs={inputs} values={values} setValues={setValues} />

      {result && (
        <>
          <ResultHero
            label="Monthly EMI"
            value={result.emi}
          />

          <StatsGrid
            items={[
              {
                label: "Total Interest Payable",
                value: formatINR(result.interestPaid),
                variant: "danger",
              },
              {
                label: "Total Repayment Amount",
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
            text={`For a loan of ${formatINR(values.amount)} at ${values.rate}% for ${values.years} years, your EMI will be ${formatINR(result.emi)} and total repayment will be ${formatINR(result.totalPayable)}.`}
          />
        </>
      )}

      <EducationLoanRepaymentArticle/>
    </CalculatorLayout>
  );
}
