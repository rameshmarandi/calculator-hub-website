"use client";

import { useMemo, useState } from "react";

import CalculatorLayout from "@/components/core/CalculatorLayout";
import InputsGrid from "@/components/core/InputsGrid";
import ResultHero from "@/components/core/ResultHero";
import DonutBreakdownChart from "@/components/core/DonutBreakdownChart";
import StatsGrid from "@/components/core/StatsGrid";
import ExplanationText from "@/components/core/ExplanationText";

import { formatINR } from "@/lib/format";
import { calculateCompoundInterest } from "../../../lib/formulas";
import CompoundInterestArticle from "../../content/finance/CompoundInterestArticle";

export default function CompoundInterestCalculator() {

  /* ================= STATE ================= */

  const [values, setValues] = useState({
    principal: 100000,
    rate: 8,
    years: 5,
    frequency: 1,
  });

  /* ================= SAFE NUMBERS ================= */

  const principal = Number(values.principal) || 0;
  const rate = Number(values.rate) || 0;
  const years = Number(values.years) || 0;
  const frequency = Number(values.frequency) || 1;

  /* ================= CALC ================= */

  const result = useMemo(() => {
    if (principal <= 0 || years <= 0) {
      return {
        invested: 0,
        gains: 0,
        futureValue: 0,
        months: 0,
      };
    }

    return calculateCompoundInterest(
      principal,
      rate,
      years,
      frequency
    );
  }, [principal, rate, years, frequency]);

  /* ================= INPUT CONFIG ================= */

  const inputs = [
    {
      key: "principal",
      label: "Principal Amount",
      type: "amount",
      placeholder: "1,00,000",
      hint: "Initial investment",
    },
    {
      key: "rate",
      label: "Annual Interest Rate (%)",
      type: "percent",
      placeholder: "8",
      hint: "Interest per year",
    },
    {
      key: "years",
      label: "Investment Duration (Years)",
      type: "number",
      placeholder: "5",
      min: 1,
      hint: "Total time invested",
    },
    {
      key: "frequency",
      label: "Compounding Frequency",
      type: "select",
      options: [
        { label: "Yearly", value: 1 },
        { label: "Half-Yearly", value: 2 },
        { label: "Quarterly", value: 4 },
        { label: "Monthly", value: 12 },
        { label: "Daily", value: 365 },
      ],
      hint: "How often interest compounds",
    },
  ];

  return (
    <CalculatorLayout
      title="Compound Interest Calculator"
      subtitle="Calculate compound growth of your investment with different compounding frequencies."
      badges={[
        "100% Free",
        "Instant Results",
        "Bank Formula Accurate",
        "No Signup Required",
      ]}
    >

      {/* INPUTS */}
      <InputsGrid inputs={inputs} values={values} setValues={setValues} />

      {/* RESULTS (NEVER BLOCKED) */}

      <ResultHero label="Future Value" value={result.futureValue} />

      <DonutBreakdownChart
        title="Principal vs Interest Earned"
        data={[
          { name: "Principal", value: result.invested },
          { name: "Interest", value: result.gains },
        ]}
      />

      <StatsGrid
        items={[
          {
            label: "Principal",
            value: formatINR(result.invested),
            variant: "neutral",
          },
          {
            label: "Interest Earned",
            value: formatINR(result.gains),
            variant: "success",
          },
          {
            label: "Total Amount",
            value: formatINR(result.futureValue),
            variant: "primary",
          },
          {
            label: "Total Months",
            value: result.months,
            variant: "info",
          },
        ]}
      />

      <ExplanationText
        text={`An investment of ${formatINR(
          principal
        )} at ${rate}% interest compounded ${frequency} time(s) per year for ${years} years grows to ${formatINR(
          result.futureValue
        )}.`}
      />

      <CompoundInterestArticle />

    </CalculatorLayout>
  );
}