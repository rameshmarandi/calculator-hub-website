"use client";

import { useMemo, useState } from "react";

import CalculatorLayout from "@/components/core/CalculatorLayout";
import InputsGrid from "@/components/core/InputsGrid";
import ResultHero from "@/components/core/ResultHero";
import StatsGrid from "@/components/core/StatsGrid";
import ExplanationText from "@/components/core/ExplanationText";

import { formatINR } from "@/lib/format";

import SalaryInHandCalculatorArticle from "../../content/finance/SalaryInHandCalculatorArticle";
import { calculateSalary } from "../../../lib/formulas";

/* ======================================================
   DEFAULT VALUES
====================================================== */

const DEFAULT_VALUES = {
  ctc: 1000000,
  basicPercent: 40,
};

/* ======================================================
   COMPONENT
====================================================== */

export default function SalaryInHandCalculator() {

  const [values, setValues] = useState(DEFAULT_VALUES);

  const result = useMemo(() => {
    return calculateSalary(values.ctc, values.basicPercent);
  }, [values]);

  const inputs = [
    {
      key: "ctc",
      label: "Annual CTC",
      type: "amount",
      placeholder: "10,00,000",
    },
    {
      key: "basicPercent",
      label: "Basic Salary (% of CTC)",
      type: "percent",
      placeholder: "40",
    },
  ];

  return (
    <CalculatorLayout
      title="Salary In Hand Calculator"
      subtitle="Estimate your monthly and annual take-home salary after PF and tax deductions."
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
            label: "Basic Salary",
            value: formatINR(result.basic),
            variant: "neutral",
          },
        ]}
      />

      <ExplanationText
        text={`With an annual CTC of ${formatINR(
          values.ctc
        )} and ${values.basicPercent}% basic salary, your estimated monthly in-hand salary is ${formatINR(
          result.monthlyInHand
        )} after PF and tax deductions.`}
      />

      <SalaryInHandCalculatorArticle />

    </CalculatorLayout>
  );
}