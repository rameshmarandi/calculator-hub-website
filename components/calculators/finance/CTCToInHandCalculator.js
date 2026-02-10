"use client";

import { useMemo, useState } from "react";

import CalculatorLayout from "@/components/core/CalculatorLayout";
import InputsGrid from "@/components/core/InputsGrid";
import ResultHero from "@/components/core/ResultHero";
import StatsGrid from "@/components/core/StatsGrid";
import ExplanationText from "@/components/core/ExplanationText";

import { formatINR } from "@/lib/format";
import CTCToInHandCalculatorArticle from "../../content/finance/CTCToInHandCalculatorArticle";

/* ======================================================
   PURE ENGINE
   deterministic, testable, reusable
====================================================== */

function computeSalary(ctc, basicPercent) {
  const basic = (ctc * basicPercent) / 100;

  const employeePF = basic * 0.12;
  const employerPF = basic * 0.12;

  const grossSalary = ctc - employerPF;

  const standardDeduction = 50000;
  const professionalTax = 2500;

  const taxableIncome =
    grossSalary - employeePF - standardDeduction;

  let tax = 0;

  if (taxableIncome <= 250000) tax = 0;
  else if (taxableIncome <= 500000)
    tax = (taxableIncome - 250000) * 0.05;
  else if (taxableIncome <= 1000000)
    tax = 12500 + (taxableIncome - 500000) * 0.2;
  else
    tax = 112500 + (taxableIncome - 1000000) * 0.3;

  const cess = tax * 0.04;
  const incomeTax = tax + cess;

  const totalDeductions =
    employeePF + incomeTax + professionalTax;

  const annualInHand = grossSalary - totalDeductions;
  const monthlyInHand = annualInHand / 12;

  return {
    basic,
    pf: employeePF,
    employerPF,
    tax: incomeTax,
    annualInHand,
    monthlyInHand,
  };
}

/* ======================================================
   COMPONENT
====================================================== */

export default function CTCToInHandCalculator() {
  /* ================= STATE ================= */

  const [values, setValues] = useState({
    ctc: "",
    basicPercent: "40",
  });

  const ctc = Number(values.ctc);
  const basicPercent = Number(values.basicPercent);

  const isValid =
    ctc > 0 && basicPercent > 0 && basicPercent <= 100;

  /* ================= AUTO CALC ================= */

  const result = useMemo(() => {
    if (!isValid) return null;
    return computeSalary(ctc, basicPercent);
  }, [ctc, basicPercent, isValid]);

  /* ================= INPUT CONFIG ================= */

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

  /* ================= UI ================= */

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
      {/* INPUTS */}
      <InputsGrid
        inputs={inputs}
        values={values}
        setValues={setValues}
      />

      {/* RESULTS */}
      {result && (
        <>
          {/* HERO */}
          <ResultHero
            label="Monthly In-Hand Salary"
            value={result.monthlyInHand}
          />

          {/* BREAKDOWN */}
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

          {/* EXPLANATION */}
          <ExplanationText
            text={`From a CTC of ${formatINR(
              ctc
            )} with ${basicPercent}% basic pay, your estimated monthly take-home salary becomes ${formatINR(
              result.monthlyInHand
            )} after PF, tax and statutory deductions.`}
          />
        </>
      )}

      <CTCToInHandCalculatorArticle/>
    </CalculatorLayout>
  );
}
