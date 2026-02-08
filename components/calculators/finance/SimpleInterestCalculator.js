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
    principal: "",
    rate: "",
    years: "",
  });

  const P = Number(values.principal);
  const r = Number(values.rate);
  const y = Number(values.years);

  const isValid = P > 0 && r >= 0 && y > 0;

  const result = useMemo(() => {
    if (!isValid) return null;
    return calculateSimpleInterest(P, r, y);
  }, [P, r, y, isValid]);

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

      {result && (
        <>
          <ResultHero label="Total Amount" value={result.finalValue} />

          <DonutBreakdownChart
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
              P
            )} at ${r}% for ${y} years generates ${formatINR(
              result.interest
            )} interest, totaling ${formatINR(result.finalValue)}.`}
          />
        </>
      )}

      <SimpleInterestArticle/>
    </CalculatorLayout>
  );
}
