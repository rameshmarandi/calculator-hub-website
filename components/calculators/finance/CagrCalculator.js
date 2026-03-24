"use client";

import { useMemo, useState } from "react";

import DonutBreakdownChart from "@/components/core/DonutBreakdownChart";
import CalculatorLayout from "@/components/core/CalculatorLayout";
import InputsGrid from "@/components/core/InputsGrid";
import ResultHero from "@/components/core/ResultHero";
import StatsGrid from "@/components/core/StatsGrid";
import ExplanationText from "@/components/core/ExplanationText";

import { formatINR } from "@/lib/format";
import { calculateCagr } from "../../../lib/formulas";
import CAGRCalculatorArticle from "../../content/finance/CAGRCalculatorArticle";

export default function CagrCalculator() {
  /* ================= STATE ================= */

  const [values, setValues] = useState({
    initial: "100000",
    final: "250000",
    years: "5",
  });

  /* ================= CALC ================= */

  const result = useMemo(() => {
    const initial = Number(values.initial) || 0;
    const finalVal = Number(values.final) || 0;
    const years = Number(values.years) || 0;

    return calculateCagr(initial, finalVal, years);
  }, [values]);

  /* ================= INPUT CONFIG ================= */

  const inputs = [
    {
      key: "initial",
      label: "Initial Investment Value",
      type: "amount",
      placeholder: "1,00,000",
    },
    {
      key: "final",
      label: "Final Investment Value",
      type: "amount",
      placeholder: "2,50,000",
    },
    {
      key: "years",
      label: "Investment Duration (Years)",
      type: "number",
      min: 1,
      placeholder: "5",
    },
  ];

  /* ================= NORMALIZED VALUES ================= */

  const initial = Number(values.initial) || 0;
  const finalVal = Number(values.final) || 0;
  const years = Number(values.years) || 0;

  /* ================= UI ================= */

  return (
    <CalculatorLayout
      title="CAGR Calculator"
      subtitle="Measure the true annual growth rate of your investment using compound annual growth."
      badges={[
        "100% Free",
        "Instant Results",
        "Accurate CAGR Formula",
        "No Signup Required",
      ]}
    >
      <InputsGrid inputs={inputs} values={values} setValues={setValues} />

      <ResultHero label="CAGR" value={`${result.cagr}%`} />

      <DonutBreakdownChart
        title="Investment vs Growth"
        data={[
          { name: "Investment", value: result.invested },
          { name: "Growth", value: result.growth },
        ]}
      />

      <StatsGrid
        items={[
          {
            label: "Initial Value",
            value: formatINR(result.invested),
          },
          {
            label: "Final Value",
            value: formatINR(result.final),
            variant: "success",
          },
          {
            label: "Absolute Growth",
            value: formatINR(result.growth),
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
        text={`Your investment grew from ${formatINR(initial)} to ${formatINR(
          finalVal
        )} in ${years} years with a CAGR of ${result.cagr}%.`}
      />

      <CAGRCalculatorArticle />
    </CalculatorLayout>
  );
}