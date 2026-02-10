"use client";

import { useMemo, useState } from "react";

import CalculatorLayout from "@/components/core/CalculatorLayout";
import InputsGrid from "@/components/core/InputsGrid";
import ResultHero from "@/components/core/ResultHero";
import StatsGrid from "@/components/core/StatsGrid";
import ExplanationText from "@/components/core/ExplanationText";

import { formatINR } from "@/lib/format";
import SalaryInHandCalculatorArticle from "../../content/finance/SalaryInHandCalculatorArticle";

/* ======================================================
   PURE FUNCTION (production safe)
====================================================== */

function calculateSalary(ctc, basicPercent) {
  const basic = (ctc * basicPercent) / 100;

  const employeePF = basic * 0.12;
  const standardDeduction = 50000;
  const professionalTax = 2500;

  const taxableIncome = ctc - employeePF - standardDeduction;

  let incomeTax = 0;

  if (taxableIncome <= 250000) incomeTax = 0;
  else if (taxableIncome <= 500000)
    incomeTax = (taxableIncome - 250000) * 0.05;
  else if (taxableIncome <= 1000000)
    incomeTax = 12500 + (taxableIncome - 500000) * 0.2;
  else
    incomeTax = 112500 + (taxableIncome - 1000000) * 0.3;

  const totalDeductions =
    employeePF + incomeTax + professionalTax;

  const annualInHand = ctc - totalDeductions;
  const monthlyInHand = annualInHand / 12;

  return {
    basic,
    pf: employeePF,
    tax: incomeTax,
    annualInHand,
    monthlyInHand,
  };
}

/* ======================================================
   COMPONENT
====================================================== */

export default function SalaryInHandCalculator() {
  const [values, setValues] = useState({
    ctc: "",
    basicPercent: "40",
  });

  const ctc = Number(values.ctc);
  const basicPercent = Number(values.basicPercent);

  const isValid =
    ctc > 0 && basicPercent > 0 && basicPercent <= 100;

  /* ---------------- AUTO CALC ---------------- */

  const result = useMemo(() => {
    if (!isValid) return null;
    return calculateSalary(ctc, basicPercent);
  }, [ctc, basicPercent, isValid]);

  /* ---------------- INPUT CONFIG ---------------- */

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

  /* ======================================================
     UI
  ====================================================== */

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
      {/* INPUTS */}
      <InputsGrid
        inputs={inputs}
        values={values}
        setValues={setValues}
      />

      {/* RESULT */}
      {result && (
        <>
          {/* HERO */}
          <ResultHero
            label="Monthly In-Hand Salary"
            value={result.monthlyInHand}
          />

          {/* STATS */}
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

          {/* EXPLANATION */}
          <ExplanationText
            text={`With an annual CTC of ${formatINR(
              ctc
            )} and ${basicPercent}% basic salary, your estimated monthly in-hand salary is ${formatINR(
              result.monthlyInHand
            )} after PF and tax deductions.`}
          />
        </>
      )}

      <SalaryInHandCalculatorArticle/>
    </CalculatorLayout>
  );
}
