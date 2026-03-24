"use client";

import { useMemo, useState } from "react";

import CalculatorLayout from "@/components/core/CalculatorLayout";
import InputsGrid from "@/components/core/InputsGrid";
import ResultHero from "@/components/core/ResultHero";
import StatsGrid from "@/components/core/StatsGrid";
import DonutBreakdownChart from "@/components/core/DonutBreakdownChart";
import ExplanationText from "@/components/core/ExplanationText";

import { formatINR } from "@/lib/format";
import { calculateSWP } from "../../../lib/formulas";
import SwpCalculatorArticle from "../../content/finance/SwpCalculatorArticle";

export default function SwpCalculator() {

  /* ================= STATE ================= */

  const [values, setValues] = useState({
    principal: "1000000",
    withdrawal: "10000",
    rate: "8",
    years: "20",
  });

  /* ================= CALC ================= */

  const result = useMemo(() => {
    const P = Number(values.principal) || 0;
    const W = Number(values.withdrawal) || 0;
    const r = Number(values.rate) || 0;
    const y = Number(values.years) || 0;

    return calculateSWP(P, W, r, y);
  }, [values]);

  /* ================= INPUT CONFIG ================= */

  const inputs = [
    {
      key: "principal",
      label: "Initial Investment",
      type: "amount",
      placeholder: "10,00,000",
    },
    {
      key: "withdrawal",
      label: "Monthly Withdrawal",
      type: "amount",
      placeholder: "10,000",
    },
    {
      key: "rate",
      label: "Expected Annual Return (%)",
      type: "percent",
    },
    {
      key: "years",
      label: "Withdrawal Duration (Years)",
      type: "number",
      min: 1,
      placeholder: "20",
    },
  ];

  /* ================= NORMALIZED VALUES ================= */

  const P = Number(values.principal) || 0;
  const W = Number(values.withdrawal) || 0;
  const r = Number(values.rate) || 0;

  /* ================= UI ================= */

  return (
    <CalculatorLayout
      title="SWP Calculator"
      subtitle="Estimate how long your investment lasts with monthly withdrawals."
      badges={[
        "100% Free",
        "Instant Results",
        "Accurate Projection",
        "No Signup Required",
      ]}
    >

      <InputsGrid inputs={inputs} values={values} setValues={setValues} />

      <ResultHero
        label="Final Balance"
        value={result.finalBalance}
      />

      <DonutBreakdownChart
        title="Withdrawn vs Remaining Balance"
        data={[
          { name: "Withdrawn", value: result.withdrawn },
          { name: "Remaining", value: result.finalBalance },
        ]}
      />

      <StatsGrid
        items={[
          {
            label: "Total Withdrawn",
            value: formatINR(result.withdrawn),
            variant: "warning",
          },
          {
            label: "Final Balance",
            value: formatINR(result.finalBalance),
            variant: "primary",
          },
          {
            label: "Months Lasted",
            value: result.monthsLasted,
            variant: "info",
          },
          {
            label: "Years Lasted",
            value: (result.monthsLasted / 12).toFixed(1),
            variant: "neutral",
          },
        ]}
      />

      <ExplanationText
        text={`Starting with ${formatINR(
          P
        )} and withdrawing ${formatINR(
          W
        )} monthly at ${r}% returns, your corpus lasts ${(
          result.monthsLasted / 12
        ).toFixed(1)} years and ends with ${formatINR(
          result.finalBalance
        )}.`}
      />

      <SwpCalculatorArticle/>

    </CalculatorLayout>
  );
}