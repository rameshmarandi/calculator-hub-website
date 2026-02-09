"use client";

import { useMemo, useState } from "react";

import CalculatorLayout from "@/components/core/CalculatorLayout";
import InputsGrid from "@/components/core/InputsGrid";
import ResultHero from "@/components/core/ResultHero";
import DonutBreakdownChart from "@/components/core/DonutBreakdownChart";
import StatsGrid from "@/components/core/StatsGrid";
import ComparisonMatrix from "@/components/core/ComparisonMatrix";
import ExplanationText from "@/components/core/ExplanationText";

import { formatINR } from "@/lib/format";
import { calculateSip, calculateStepUpSip } from "@/lib/formulas";
import StepUpSIPCalculatorArticle from "../../content/finance/StepUpSIPCalculatorArticle";

/*
  RULES FOLLOWED:
  - page only orchestrates
  - math in lib
  - no logic in JSX
  - memoized calculations
  - clean scalable structure
*/

export default function StepUpSipCalculator() {
  /* ================= STATE ================= */

  const [values, setValues] = useState({
    monthly: "",
    rate: "",
    stepUp: "",
    years: "",
  });

  /* ================= NORMALIZED NUMBERS ================= */

  const monthly = Number(values.monthly);
  const rate = Number(values.rate);
  const stepUp = Number(values.stepUp);
  const years = Number(values.years);

  /* ================= VALIDATION ================= */

  const isValid =
    monthly > 0 &&
    rate >= 0 &&
    stepUp >= 0 &&
    years > 0;

  /* ================= CALCULATIONS ================= */

  const result = useMemo(() => {
    if (!isValid) return null;

    return calculateStepUpSip(monthly, rate, stepUp, years);
  }, [monthly, rate, stepUp, years, isValid]);

  const regularSip = useMemo(() => {
    if (!isValid) return null;

    return calculateSip(monthly, rate, years);
  }, [monthly, rate, years, isValid]);

  /* ================= INPUT CONFIG ================= */

  const inputs = [
    {
      key: "monthly",
      label: "Initial Monthly Investment",
      type: "amount",
      placeholder: "5,000",
      hint: "Starting SIP amount",
    },
    {
      key: "rate",
      label: "Expected Annual Return (%)",
      type: "percent",
      placeholder: "12",
      hint: "Estimated yearly return",
    },
    {
      key: "stepUp",
      label: "Annual Step-Up Rate (%)",
      type: "percent",
      placeholder: "10",
      hint: "Yearly increase in SIP amount",
    },
    {
      key: "years",
      label: "Investment Duration (Years)",
      type: "number",
      placeholder: "15",
      min: 1,
      hint: "Longer duration increases compounding",
    },
  ];

  /* ================= UI ================= */

  return (
    <CalculatorLayout
      title="Step-Up SIP Calculator"
      subtitle="Estimate future value when your SIP increases every year and accelerate wealth creation through compounding."
      badges={[
        "100% Free",
        "Instant Results",
        "Compound Growth Accurate",
        "No Signup Required",
      ]}
    >
      <InputsGrid inputs={inputs} values={values} setValues={setValues} />

      {result && (
        <>
          {/* HERO */}
          <ResultHero label="Future Value" value={result.futureValue} />

          {/* BREAKDOWN */}
          <DonutBreakdownChart
          title="Investment vs Returns"

            data={[
              { name: "Invested", value: result.invested },
              { name: "Gains", value: result.gains },
            ]}
          />

          {/* STATS */}
          <StatsGrid
            items={[
              {
                label: "Total Investment",
                value: formatINR(result.invested),
                variant: "neutral",
              },
              {
                label: "Total Gains",
                value: formatINR(result.gains),
                variant: "success",
              },
              {
                label: "Future Value",
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

          {/* EXPLANATION */}
          <ExplanationText
            text={`With a starting SIP of ${formatINR(
              monthly
            )} increasing ${stepUp}% yearly for ${years} years at ${rate}% returns, your corpus can grow to ${formatINR(
              result.futureValue
            )}.`}
          />

          {/* COMPARISON */}
          <ComparisonMatrix
            columns={["Type", "Future Value"]}
            rows={[
              ["Regular SIP", formatINR(regularSip.futureValue)],
              ["Step-Up SIP", formatINR(result.futureValue)],
            ]}
          />
        </>
      )}
      <StepUpSIPCalculatorArticle/>
    </CalculatorLayout>
  );
}
