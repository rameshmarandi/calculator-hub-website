"use client";

import { useMemo, useState } from "react";

import CalculatorLayout from "@/components/core/CalculatorLayout";
import InputsGrid from "@/components/core/InputsGrid";
import ResultHero from "@/components/core/ResultHero";
import DonutBreakdownChart from "@/components/core/DonutBreakdownChart";
import StatsGrid from "@/components/core/StatsGrid";
import ExplanationText from "@/components/core/ExplanationText";

import { formatINR } from "@/lib/format";
import { calculateFD } from "../../../lib/formulas";
import FixedDepositArticle from "../../content/finance/FixedDepositArticle";

export default function FixedDepositCalculator() {
  /* ================= STATE ================= */

  const [values, setValues] = useState({
    amount: "100000",
    rate: "7.5",
    years: "5",
    frequency: "4",
  });

  /* ================= CALC ================= */

  const result = useMemo(() => {
    const amount = Number(values.amount) || 0;
    const rate = Number(values.rate) || 0;
    const years = Number(values.years) || 0;
    const frequency = Number(values.frequency) || 0;

    return calculateFD(amount, rate, years, frequency);
  }, [values]);

  /* ================= INPUT CONFIG ================= */

  const inputs = [
    {
      key: "amount",
      label: "Deposit Amount",
      type: "amount",
      placeholder: "1,00,000",
      hint: "Principal investment",
    },
    {
      key: "rate",
      label: "Interest Rate (%)",
      type: "percent",
      placeholder: "7.5",
      hint: "Annual FD interest rate",
    },
    {
      key: "years",
      label: "Tenure (Years)",
      type: "number",
      placeholder: "5",
      min: 1,
      hint: "Deposit duration",
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
      ],
      hint: "Most banks compound quarterly",
    },
  ];

  /* ================= NORMALIZED VALUES ================= */

  const amount = Number(values.amount) || 0;
  const rate = Number(values.rate) || 0;
  const years = Number(values.years) || 0;
  const frequency = Number(values.frequency) || 0;

  /* ================= UI ================= */

  return (
    <CalculatorLayout
      title="Fixed Deposit Calculator"
      subtitle="Calculate FD maturity amount and interest earned with compound interest."
      badges={[
        "100% Free",
        "Instant Results",
        "Bank Formula Accurate",
        "No Signup Required",
      ]}
    >
      <InputsGrid inputs={inputs} values={values} setValues={setValues} />

      <ResultHero label="Maturity Amount" value={result.maturity} />

      <DonutBreakdownChart
        title="Invested Amount vs Interest Earned"
        data={[
          { name: "Principal", value: result.principal },
          { name: "Interest", value: result.interest },
        ]}
      />

      <StatsGrid
        items={[
          {
            label: "Deposit Amount",
            value: formatINR(result.principal),
            variant: "neutral",
          },
          {
            label: "Interest Earned",
            value: formatINR(result.interest),
            variant: "success",
          },
          {
            label: "Maturity Amount",
            value: formatINR(result.maturity),
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
        text={`A fixed deposit of ${formatINR(
          amount
        )} at ${rate}% interest compounded ${frequency} time(s) per year for ${years} years grows to ${formatINR(
          result.maturity
        )}.`}
      />

      <FixedDepositArticle />
    </CalculatorLayout>
  );
}