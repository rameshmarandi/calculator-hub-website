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

/* =====================================================
   PURE FORMULA
   withdraw first -> then grow
===================================================== */



export default function SwpCalculator() {
  /* ================= STATE ================= */

  const [values, setValues] = useState({
    principal: "",
    withdrawal: "",
    rate: "8",
    years: "",
  });

  const P = Number(values.principal);
  const W = Number(values.withdrawal);
  const r = Number(values.rate);
  const y = Number(values.years);

  const isValid = P > 0 && W > 0 && r >= 0 && y > 0;

  /* ================= CALC ================= */

  const result = useMemo(() => {
    if (!isValid) return null;
    return calculateSWP(P, W, r, y);
  }, [P, W, r, y, isValid]);

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
    },
  ];

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
      {/* INPUTS */}
      <InputsGrid inputs={inputs} values={values} setValues={setValues} />

      {result && (
        <>
          {/* HERO */}
          <ResultHero
            label="Final Balance"
            value={result.finalBalance}
          />

          {/* DONUT */}
          <DonutBreakdownChart
          title="Withdrawn vs Remaining Balance"

            data={[
              { name: "Withdrawn", value: result.withdrawn },
              { name: "Remaining", value: result.finalBalance },
            ]}
          />

          {/* STATS */}
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

          {/* EXPLANATION */}
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
        </>
      )}

      <SwpCalculatorArticle/>
    </CalculatorLayout>
  );
}
