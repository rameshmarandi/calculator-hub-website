"use client";

import { useMemo, useState } from "react";

import CalculatorLayout from "@/components/core/CalculatorLayout";
import InputsGrid from "@/components/core/InputsGrid";
import ResultHero from "@/components/core/ResultHero";
import DonutBreakdownChart from "@/components/core/DonutBreakdownChart";
import StatsGrid from "@/components/core/StatsGrid";
import ExplanationText from "@/components/core/ExplanationText";

import { formatINR } from "@/lib/format";
import { calculateRD } from "../../../lib/formulas";
import RecurringDepositArticle from "../../content/finance/RecurringDepositArticle";

export default function RecurringDepositCalculator() {
  /* ================= STATE ================= */

  const [values, setValues] = useState({
    monthly: "5000",
    rate: "7",
    years: "5",
    frequency: "4",
  });

  /* ================= CALC ================= */

  const result = useMemo(() => {
    const monthly = Number(values.monthly) || 0;
    const rate = Number(values.rate) || 0;
    const years = Number(values.years) || 0;
    const frequency = Number(values.frequency) || 0;

    return calculateRD(monthly, rate, years, frequency);
  }, [values]);

  /* ================= INPUT CONFIG ================= */

  const inputs = [
    {
      key: "monthly",
      label: "Monthly Deposit Amount",
      type: "amount",
      placeholder: "5,000",
      hint: "Deposit every month",
    },
    {
      key: "rate",
      label: "Interest Rate (%)",
      type: "percent",
      placeholder: "7",
      hint: "Annual rate",
    },
    {
      key: "years",
      label: "Tenure (Years)",
      type: "number",
      min: 1,
      placeholder: "5",
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
    },
  ];

  /* ================= NORMALIZED VALUES ================= */

  const monthly = Number(values.monthly) || 0;
  const rate = Number(values.rate) || 0;
  const years = Number(values.years) || 0;

  /* ================= UI ================= */

  return (
    <CalculatorLayout
      title="Recurring Deposit Calculator"
      subtitle="Calculate RD maturity and interest with bank accurate compounding."
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
          { name: "Invested", value: result.invested },
          { name: "Interest", value: result.interest },
        ]}
      />

      <StatsGrid
        items={[
          {
            label: "Total Investment",
            value: formatINR(result.invested),
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
        text={`Depositing ${formatINR(
          monthly
        )} monthly for ${years} years at ${rate}% interest grows to ${formatINR(
          result.maturity
        )}.`}
      />

      <RecurringDepositArticle />
    </CalculatorLayout>
  );
}