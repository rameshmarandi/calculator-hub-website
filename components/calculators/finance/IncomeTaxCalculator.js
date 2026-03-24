"use client";

import { useMemo, useState } from "react";

import CalculatorLayout from "@/components/core/CalculatorLayout";
import InputsGrid from "@/components/core/InputsGrid";
import ResultHero from "@/components/core/ResultHero";
import StatsGrid from "@/components/core/StatsGrid";
import ExplanationText from "@/components/core/ExplanationText";

import { formatINR } from "@/lib/format";
import IncomeTaxCalculatorArticle from "../../content/finance/IncomeTaxCalculatorArticle";

/* ======================================================
   TAX ENGINE
====================================================== */

const STANDARD_DEDUCTION = 50000;

function calculateTaxNew(taxable) {
  let tax = 0;

  if (taxable <= 300000) tax = 0;
  else if (taxable <= 600000) tax = (taxable - 300000) * 0.05;
  else if (taxable <= 900000) tax = 15000 + (taxable - 600000) * 0.1;
  else if (taxable <= 1200000) tax = 45000 + (taxable - 900000) * 0.15;
  else if (taxable <= 1500000) tax = 90000 + (taxable - 1200000) * 0.2;
  else tax = 150000 + (taxable - 1500000) * 0.3;

  if (taxable <= 700000) tax = 0; // rebate 87A

  return tax;
}

function calculateTaxOld(taxable) {
  let tax = 0;

  if (taxable <= 250000) tax = 0;
  else if (taxable <= 500000) tax = (taxable - 250000) * 0.05;
  else if (taxable <= 1000000) tax = 12500 + (taxable - 500000) * 0.2;
  else tax = 112500 + (taxable - 1000000) * 0.3;

  return tax;
}

/* ======================================================
   COMPONENT
====================================================== */

export default function IncomeTaxCalculator() {

  /* ================= STATE ================= */

  const [values, setValues] = useState({
    income: "1000000",
    regime: "new",
  });

  /* ================= SAFE PARSE ================= */

  const income = Number(values.income) || 0;

  /* ================= CALCULATION ================= */

  const result = useMemo(() => {

    const taxable = Math.max(0, income - STANDARD_DEDUCTION);

    const baseTax =
      values.regime === "new"
        ? calculateTaxNew(taxable)
        : calculateTaxOld(taxable);

    const cess = baseTax * 0.04;

    const totalTax = baseTax + cess;

    const netIncome = income - totalTax;

    return {
      taxable,
      tax: Math.round(baseTax),
      cess: Math.round(cess),
      totalTax: Math.round(totalTax),
      net: Math.round(netIncome),
    };

  }, [income, values.regime]);

  /* ================= INPUT CONFIG ================= */

  const inputs = [
    {
      key: "income",
      label: "Annual Income",
      type: "amount",
      placeholder: "10,00,000",
    },
    {
      key: "regime",
      label: "Tax Regime",
      type: "select",
      options: [
        { label: "New Regime", value: "new" },
        { label: "Old Regime", value: "old" },
      ],
    },
  ];

  /* ================= UI ================= */

  return (
    <CalculatorLayout
      title="Income Tax Calculator"
      subtitle="Estimate tax liability under Indian tax slabs instantly."
      badges={[
        "100% Free",
        "Instant Results",
        "Accurate",
        "No Signup Required",
      ]}
    >
      <InputsGrid inputs={inputs} values={values} setValues={setValues} />

      <ResultHero
        label="Total Tax Payable"
        value={formatINR(result.totalTax)}
      />

      <StatsGrid
        items={[
          {
            label: "Taxable Income",
            value: formatINR(result.taxable),
          },
          {
            label: "Income Tax",
            value: formatINR(result.tax),
          },
          {
            label: "Cess (4%)",
            value: formatINR(result.cess),
          },
          {
            label: "Net Income",
            value: formatINR(result.net),
            variant: "success",
          },
        ]}
      />

      <ExplanationText
        text={`After ₹50,000 standard deduction, your taxable income becomes ${formatINR(
          result.taxable
        )}. Total tax including 4% cess is ${formatINR(
          result.totalTax
        )}.`}
      />

      <IncomeTaxCalculatorArticle />
    </CalculatorLayout>
  );
}