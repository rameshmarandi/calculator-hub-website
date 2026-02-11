"use client";

import { useMemo, useState } from "react";

import InputsGrid from "@/components/core/InputsGrid";
import StatsGrid from "@/components/core/StatsGrid";
import ResultHero from "@/components/core/ResultHero";
import ExplanationText from "@/components/core/ExplanationText";
import CalculatorLayout from "@/components/core/CalculatorLayout";

import { formatINR } from "@/lib/format";
import { calculateCreditCardEMI } from "../../../lib/formulas";
import CreditCardEMIArticle from "../../content/finance/CreditCardEMIArticle";


export default function CreditCardEMICalculator() {
  const [values, setValues] = useState({
    amount: "",
    rate: "",
    months: "",
  });

  /* ---------- show only when complete ---------- */

  const isComplete =
    values.amount !== "" &&
    values.rate !== "" &&
    values.months !== "";

  /* ---------- derived result ---------- */

  const result = useMemo(() => {
    if (!isComplete) return null;

    return calculateCreditCardEMI({
      principal: values.amount,
      annualRate: values.rate,
      months: values.months,
    });
  }, [values, isComplete]);

  /* ---------- inputs ---------- */

  const inputs = [
    {
      key: "amount",
      label: "Purchase Amount",
      type: "amount",
      placeholder: "50,000",
    },
    {
      key: "rate",
      label: "Interest Rate (%)",
      type: "percent",
      placeholder: "18",
    },
    {
      key: "months",
      label: "Tenure (Months)",
      type: "number",
      placeholder: "12",
      min: 1,
    },
  ];

  /* ---------- UI ---------- */

  return (
    <CalculatorLayout
      title="Credit Card EMI Calculator"
      subtitle="Estimate EMI, total payable and interest for card purchases."
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
                label: "Total Payable",
                value: formatINR(result.totalPayable),
                variant: "danger", // money out
              },
              {
                label: "Interest Paid",
                value: formatINR(result.interestPaid),
                variant: "warning",
              },
              {
                label: "Tenure",
                value: `${values.months} months`,
                variant: "info",
              },
            ]}
          />

          <ExplanationText
            text={`For a purchase of ${formatINR(values.amount)}, you will pay ${formatINR(
              result.emi
            )} per month and total interest of ${formatINR(
              result.interestPaid
            )}.`}
          />
        </>
      )}

      <CreditCardEMIArticle/>
    </CalculatorLayout>
  );
}
