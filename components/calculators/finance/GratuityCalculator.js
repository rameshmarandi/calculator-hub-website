"use client";

import { useMemo, useState } from "react";

import CalculatorLayout from "@/components/core/CalculatorLayout";
import InputsGrid from "@/components/core/InputsGrid";
import ResultHero from "@/components/core/ResultHero";
import StatsGrid from "@/components/core/StatsGrid";
import ExplanationText from "@/components/core/ExplanationText";

import { formatINR } from "@/lib/format";
import { calculateGratuity } from "@/lib/formulas";

import GratuityCalculatorArticle from "../../content/finance/GratuityCalculatorArticle";

/* ======================================================
   DEFAULT VALUES
====================================================== */

const DEFAULT_VALUES = {
  salary: 40000,
  years: 10,
};

/* ======================================================
   COMPONENT
====================================================== */

export default function GratuityCalculator() {

  const [values, setValues] = useState(DEFAULT_VALUES);

  /* ---------------- CALCULATION ---------------- */

  const result = useMemo(() => {
    return calculateGratuity(values.salary, values.years);
  }, [values]);

  /* ---------------- INPUT CONFIG ---------------- */

  const inputs = [
    {
      key: "salary",
      label: "Last Drawn Monthly Basic Salary",
      type: "amount",
      placeholder: "40,000",
    },
    {
      key: "years",
      label: "Years of Continuous Service",
      type: "number",
      min: 1,
      placeholder: "10",
    },
  ];

  /* ======================================================
     UI
  ====================================================== */

  return (
    <CalculatorLayout
      title="Gratuity Calculator"
      subtitle="Estimate your gratuity payout based on salary and years of service as per Indian gratuity rules."
      badges={[
        "100% Free",
        "Instant Results",
        "Accurate Formula",
        "No Signup Required",
      ]}
    >

      <InputsGrid
        inputs={inputs}
        values={values}
        setValues={setValues}
      />

      {/* HERO */}

      <ResultHero
        label="Estimated Gratuity Amount"
        value={result.gratuity}
      />

      {/* STATS */}

      <StatsGrid
        items={[
          {
            label: "Last Salary",
            value: formatINR(result.salary),
            variant: "neutral",
          },
          {
            label: "Completed Years",
            value: `${result.years} years`,
            variant: "info",
          },
          {
            label: "Gratuity Payable",
            value: formatINR(result.gratuity),
            variant: "success",
          },
        ]}
      />

      {/* EXPLANATION */}

      <ExplanationText
        text={`With a last drawn salary of ${formatINR(
          result.salary
        )} and ${result.years} completed years of service, your estimated gratuity is ${formatINR(
          result.gratuity
        )} as per the Payment of Gratuity Act formula.`}
      />

      <GratuityCalculatorArticle />

    </CalculatorLayout>
  );
}