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
  const [values, setValues] = useState({
    monthly: "",
    rate: "",
    years: "",
    frequency: "4",
  });

  const monthly = Number(values.monthly);
  const rate = Number(values.rate);
  const years = Number(values.years);
  const frequency = Number(values.frequency);

  const isValid =
    monthly > 0 && rate >= 0 && years > 0 && frequency > 0;

  const result = useMemo(() => {
    if (!isValid) return null;

    return calculateRD(monthly, rate, years, frequency);
  }, [monthly, rate, years, frequency, isValid]);

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

      {result && (
        <>
          <ResultHero label="Maturity Amount" value={result.maturity} />

          <DonutBreakdownChart
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
        </>
      )}
      <RecurringDepositArticle/>
    </CalculatorLayout>
  );
}
