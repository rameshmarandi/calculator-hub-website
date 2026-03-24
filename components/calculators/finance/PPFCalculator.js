"use client";

import { useMemo, useState } from "react";

import CalculatorLayout from "@/components/core/CalculatorLayout";
import InputsGrid from "@/components/core/InputsGrid";
import ResultHero from "@/components/core/ResultHero";
import DonutBreakdownChart from "@/components/core/DonutBreakdownChart";
import StatsGrid from "@/components/core/StatsGrid";
import ExplanationText from "@/components/core/ExplanationText";

import { formatINR } from "@/lib/format";
import { calculatePPF } from "../../../lib/formulas";
import PPFCalculatorArticle from "../../content/finance/PPFCalculatorArticle";

export default function PPFCalculator() {
/*************  ✨ Windsurf Command ⭐  *************/
/**
 * PPFCalculator component
 *
 * A React component that calculates the maturity amount of a PPF investment
 * given the yearly investment amount, interest rate and tenure (years).
 *
 * The component uses the `calculatePPF` function from the `formulas` module to
 * calculate the maturity amount.
 *
 * The component renders a form to input the yearly investment amount, interest rate
 * and tenure, and then renders the maturity amount along with a breakdown of
 * the invested amount vs interest earned and some statistics.
 *
 * The component also renders an explanation text that explains the calculation
 * and the results.
 *
 * @returns {React.Component} The PPFCalculator component
/*******  1d0f9ebb-7263-42b7-b964-6763407776e5  *******/  /* ================= STATE ================= */

  const [values, setValues] = useState({
    yearly: "150000",
    rate: "7.1",
    years: "15",
  });

  /* ================= CALC ================= */

  const result = useMemo(() => {
    const yearly = Number(values.yearly) || 0;
    const rate = Number(values.rate) || 0;
    const years = Math.max(Number(values.years) || 0, 15);

    return calculatePPF(yearly, rate, years);
  }, [values]);

  /* ================= INPUT CONFIG ================= */

  const inputs = [
    {
      key: "yearly",
      label: "Yearly Investment Amount",
      type: "amount",
      placeholder: "1,50,000",
      hint: "Maximum ₹1.5L per year under 80C",
    },
    {
      key: "rate",
      label: "Interest Rate (%)",
      type: "percent",
      placeholder: "7.1",
      hint: "Current government PPF rate",
    },
    {
      key: "years",
      label: "Tenure (Years)",
      type: "number",
      min: 15,
      placeholder: "15",
      hint: "Minimum lock-in period is 15 years",
    },
  ];

  /* ================= NORMALIZED VALUES ================= */

  const yearly = Number(values.yearly) || 0;
  const rate = Number(values.rate) || 0;
  const years = Math.max(Number(values.years) || 0, 15);

  /* ================= UI ================= */

  return (
    <CalculatorLayout
      title="PPF Calculator"
      subtitle="Calculate tax-free maturity amount with government backed annual compounding."
      badges={[
        "100% Free",
        "Instant Results",
        "Tax-Free Returns",
        "No Signup Required",
      ]}
    >
      <InputsGrid inputs={inputs} values={values} setValues={setValues} />

      <ResultHero label="Maturity Amount" value={result.maturity} />

      <DonutBreakdownChart
        title="Invested Amount vs Interest Earned"
        data={[
          { name: "Investment", value: result.invested },
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
        text={`Investing ${formatINR(
          yearly
        )} every year for ${years} years at ${rate}% grows to ${formatINR(
          result.maturity
        )} with annual compounding.`}
      />

      <PPFCalculatorArticle />
    </CalculatorLayout>
  );
}