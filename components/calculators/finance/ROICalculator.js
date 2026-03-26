"use client";

import { useMemo, useState } from "react";

import InputsGrid from "@/components/core/InputsGrid";
import StatsGrid from "@/components/core/StatsGrid";
import ResultHero from "@/components/core/ResultHero";
import ExplanationText from "@/components/core/ExplanationText";
import CalculatorLayout from "@/components/core/CalculatorLayout";

import { formatINR } from "@/lib/format";
import { calculateROI } from "../../../lib/formulas";
import ROICalculatorArticle from "../../content/finance/ROICalculatorArticle";

export default function ROICalculator() {

  /* ---------------- STATE ---------------- */

  const [values, setValues] = useState({
    investment: "100000",
    returns: "150000",
  });

  /* ---------------- SAFE NUMBERS ---------------- */

  const investment = Number(values.investment) || 0;
  const returns = Number(values.returns) || 0;

  /* ---------------- RESULT ---------------- */

  const result = useMemo(() => {
    return (
      calculateROI({
        investment,
        returns,
      }) || {
        roi: 0,
        profit: 0,
      }
    );
  }, [investment, returns]);

  /* ---------------- INPUT CONFIG ---------------- */

  const inputs = [
    {
      key: "investment",
      label: "Investment Amount",
      type: "amount",
      placeholder: "1,00,000",
    },
    {
      key: "returns",
      label: "Total Returns",
      type: "amount",
      placeholder: "1,50,000",
    },
  ];

  /* ---------------- UI ---------------- */

  return (
    <CalculatorLayout
      title="ROI Calculator"
      subtitle="Measure return on investment instantly."
      badges={[
        "Instant Results",
        "Business Accurate",
        "100% Free",
        "No Signup Required",
      ]}
    >
      <InputsGrid inputs={inputs} values={values} setValues={setValues} />

      <ResultHero
        label="Return on Investment (%)"
        value={result.roi || 0}
      />

      <StatsGrid
        items={[
          {
            label: "Net Profit",
            value: formatINR(result.profit || 0),
            variant: result.profit >= 0 ? "success" : "danger",
          },
          {
            label: "Investment",
            value: formatINR(investment),
            variant: "neutral",
          },
        ]}
      />

      <ExplanationText
        variant={result.profit >= 0 ? "success" : "danger"}
        text={
          result.profit >= 0
            ? `You earned ${formatINR(result.profit)} profit with an ROI of ${result.roi}%.`
            : `You incurred a loss of ${formatINR(Math.abs(result.profit))} with an ROI of ${result.roi}%.`
        }
      />

      <ROICalculatorArticle />
    </CalculatorLayout>
  );
}