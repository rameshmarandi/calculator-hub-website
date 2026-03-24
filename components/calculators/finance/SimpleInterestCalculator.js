"use client";

import { useMemo, useState } from "react";

import CalculatorLayout from "@/components/core/CalculatorLayout";
import InputsGrid from "@/components/core/InputsGrid";
import ResultHero from "@/components/core/ResultHero";
import DonutBreakdownChart from "@/components/core/DonutBreakdownChart";
import StatsGrid from "@/components/core/StatsGrid";
import ExplanationText from "@/components/core/ExplanationText";

import { formatINR } from "@/lib/format";
import { calculateSimpleInterest } from "../../../lib/formulas";
import SimpleInterestArticle from "../../content/finance/CalculateSimpleInterest";

export default function SimpleInterestCalculator() {
  const [values, setValues] = useState({
    principal: "100000",
    rate: "10",
    years: "5",
  });

  const result = useMemo(() => {
    const P = Number(values.principal) || 0;
    const r = Number(values.rate) || 0;
    const y = Number(values.years) || 0;

    return calculateSimpleInterest(P, r, y);
  }, [values]);

  const inputs = [
    {
      key: "principal",
      label: "Principal Amount",
      type: "amount",
      placeholder: "1,00,000",
    },
    {
      key: "rate",
      label: "Interest Rate (%)",
      type: "percent",
      placeholder: "10",
    },
    {
      key: "years",
      label: "Time Period (Years)",
      type: "number",
      placeholder: "5",
    },
  ];

  return (
    <CalculatorLayout
      title="Simple Interest Calculator"
      subtitle="Calculate interest earned and total amount using the simple interest formula."
      badges={[
        "100% Free",
        "Instant Results",
        "Accurate Formula",
        "No Signup Required",
      ]}
    >
      <InputsGrid inputs={inputs} values={values} setValues={setValues} />

      <ResultHero label="Total Amount" value={result.finalValue} />

      <DonutBreakdownChart
        title="Principal vs Interest Earned"
        data={[
          { name: "Principal", value: result.invested },
          { name: "Interest", value: result.interest },
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
            value: formatINR(result.interest),
            variant: "success",
          },
          {
            label: "Total Amount",
            value: formatINR(result.finalValue),
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
        text={`A principal of ${formatINR(
          Number(values.principal) || 0
        )} at ${Number(values.rate) || 0}% for ${
          Number(values.years) || 0
        } years generates ${formatINR(
          result.interest
        )} interest, totaling ${formatINR(result.finalValue)}.`}
      />

      <SimpleInterestArticle />
    </CalculatorLayout>
  );
}