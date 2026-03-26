"use client";

import { useMemo, useState } from "react";

import InputsGrid from "@/components/core/InputsGrid";
import StatsGrid from "@/components/core/StatsGrid";
import ResultHero from "@/components/core/ResultHero";
import ExplanationText from "@/components/core/ExplanationText";
import CalculatorLayout from "@/components/core/CalculatorLayout";

import { formatINR } from "@/lib/format";
import { calculateCreditCardEMI } from "@/lib/formulas";

import CreditCardEMIArticle from "../../content/finance/CreditCardEMIArticle";

/* ================= DEFAULT VALUES ================= */

const DEFAULT_VALUES = {
  amount: 50000,
  rate: 18,
  months: 12,
};

/* ================= COMPONENT ================= */

export default function CreditCardEMICalculator() {

  const [values, setValues] = useState(DEFAULT_VALUES);

  const result = useMemo(() => {
    return calculateCreditCardEMI({
      principal: values.amount,
      annualRate: values.rate,
      months: values.months,
    });
  }, [values]);

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

      <InputsGrid
        inputs={inputs}
        values={values}
        setValues={setValues}
      />

      <ResultHero
        label="Monthly EMI"
        value={result?.emi}
      />

      <StatsGrid
        items={[
          {
            label: "Total Payable",
            value: formatINR(result?.totalPayable),
            variant: "danger",
          },
          {
            label: "Interest Paid",
            value: formatINR(result?.interestPaid),
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
        text={`For a purchase of ${formatINR(values?.amount)}, you will pay ${formatINR(
          result?.emi
        )} per month and total interest of ${formatINR(
          result?.interestPaid
        )}.`}
      />

      <CreditCardEMIArticle />

    </CalculatorLayout>
  );
}