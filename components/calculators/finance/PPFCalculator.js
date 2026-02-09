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
  /* ================= STATE ================= */

  const [values, setValues] = useState({
    yearly: "",
    rate: "",
    years: "",
  });

  /* ================= NORMALIZED ================= */

  const yearly = Number(values.yearly);
  const rate = Number(values.rate);
  const years = Number(values.years);

  /* ================= VALIDATION ================= */

  const isValid =
    yearly > 0 &&
    rate >= 0 &&
    years >= 15; // ✅ enforce PPF rule

  /* ================= CALC ================= */

  const result = useMemo(() => {
    if (!isValid) return null;
    return calculatePPF(yearly, rate, years);
  }, [yearly, rate, years, isValid]);

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

      {result && (
        <>
          {/* HERO */}
          <ResultHero label="Maturity Amount" value={result.maturity} />

          {/* BREAKDOWN */}
          <DonutBreakdownChart
          title="Invested Amount vs Interest Earned"

            data={[
              { name: "Investment", value: result.invested },
              { name: "Interest", value: result.interest },
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

          {/* EXPLANATION */}
          <ExplanationText
            text={`Investing ${formatINR(
              yearly
            )} every year for ${years} years at ${rate}% grows to ${formatINR(
              result.maturity
            )} with annual compounding.`}
          />
        </>
      )}

      <PPFCalculatorArticle/>
    </CalculatorLayout>
  );
}
