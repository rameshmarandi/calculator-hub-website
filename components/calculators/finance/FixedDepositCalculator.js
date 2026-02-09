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
    amount: "",
    rate: "",
    years: "",
    frequency: "4", // quarterly default
  });

  /* ================= NORMALIZED ================= */

  const amount = Number(values.amount);
  const rate = Number(values.rate);
  const years = Number(values.years);
  const frequency = Number(values.frequency);

  const isValid =
    amount > 0 &&
    rate >= 0 &&
    years > 0 &&
    frequency > 0;

  /* ================= CALC ================= */

  const result = useMemo(() => {
    if (!isValid) return null;

    return calculateFD(amount, rate, years, frequency);
  }, [amount, rate, years, frequency, isValid]);

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
      {/* INPUTS */}
      <InputsGrid inputs={inputs} values={values} setValues={setValues} />

      {/* RESULTS */}
      {result && (
        <>
          {/* HERO */}
          <ResultHero label="Maturity Amount" value={result.maturity} />

          {/* BREAKDOWN */}
          <DonutBreakdownChart
          title="Invested Amount vs Interest Earned"

            data={[
              { name: "Principal", value: result.principal },
              { name: "Interest", value: result.interest },
            ]}
          />

          {/* STATS */}
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

          {/* EXPLANATION */}
          <ExplanationText
            text={`A fixed deposit of ${formatINR(
              amount
            )} at ${rate}% interest compounded ${frequency} time(s) per year for ${years} years grows to ${formatINR(
              result.maturity
            )}.`}
          />
        </>
      )}
      <FixedDepositArticle/>
    </CalculatorLayout>
  );
}
