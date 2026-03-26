"use client";

import { useMemo, useState } from "react";

import CalculatorLayout from "@/components/core/CalculatorLayout";
import InputsGrid from "@/components/core/InputsGrid";
import ResultHero from "@/components/core/ResultHero";
import StatsGrid from "@/components/core/StatsGrid";
import ExplanationText from "@/components/core/ExplanationText";

import { formatINR } from "@/lib/format";


import CTCToInHandCalculatorArticle from "../../content/finance/CTCToInHandCalculatorArticle";
import { computeSalary } from "../../../lib/formulas";

const DEFAULT_VALUES = {
  ctc: 1000000,
  basicPercent: 40,
};

export default function CTCToInHandCalculator() {

  const [values, setValues] = useState(DEFAULT_VALUES);

  const result = useMemo(() => {
    return computeSalary(values.ctc, values.basicPercent);
  }, [values]);

  const inputs = [
    {
      key: "ctc",
      label: "Annual CTC",
      type: "amount",
      placeholder: "10,00,000",
      hint: "Total yearly package",
    },
    {
      key: "basicPercent",
      label: "Basic Salary (% of CTC)",
      type: "percent",
      placeholder: "40",
      hint: "Usually 30% to 50%",
    },
  ];

  return (
    <CalculatorLayout
      title="CTC to In Hand Salary Calculator"
      subtitle="Instantly estimate your monthly and annual take-home salary after PF and tax deductions."
      badges={[
        "100% Free",
        "Instant Results",
        "Accurate Projection",
        "No Signup Required",
      ]}
    >

      <InputsGrid
        inputs={inputs}
        values={values}
        setValues={setValues}
      />

      <ResultHero
        label="Monthly In-Hand Salary"
        value={result.monthlyInHand}
      />

      <StatsGrid
        items={[
          {
            label: "Annual In-Hand",
            value: formatINR(result.annualInHand),
            variant: "primary",
          },
          {
            label: "Income Tax",
            value: formatINR(result.tax),
            variant: "warning",
          },
          {
            label: "Employee PF",
            value: formatINR(result.pf),
            variant: "info",
          },
          {
            label: "Employer PF (CTC part)",
            value: formatINR(result.employerPF),
            variant: "neutral",
          },
        ]}
      />

      <ExplanationText
        text={`From a CTC of ${formatINR(
          values.ctc
        )} with ${values.basicPercent}% basic pay, your estimated monthly take-home salary becomes ${formatINR(
          result.monthlyInHand
        )} after PF, tax and statutory deductions.`}
      />

      <CTCToInHandCalculatorArticle />

    </CalculatorLayout>
  );
}