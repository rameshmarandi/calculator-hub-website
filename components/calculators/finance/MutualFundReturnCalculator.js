"use client";

import { useMemo, useState } from "react";

import CalculatorLayout from "@/components/core/CalculatorLayout";
import InputsGrid from "@/components/core/InputsGrid";
import ResultHero from "@/components/core/ResultHero";
import DonutBreakdownChart from "@/components/core/DonutBreakdownChart";
import StatsGrid from "@/components/core/StatsGrid";
import ExplanationText from "@/components/core/ExplanationText";

import { formatINR } from "@/lib/format";
import { calculateSip, calculateLumpsum } from "../../../lib/formulas";
import MutualFundReturnCalculatorArticle from "../../content/finance/MutualFundReturnCalculatorArticle";

// import { calculateSip, calculateLumpsum } from "@/lib/formulas";

export default function MutualFundReturnCalculator() {
  const [mode, setMode] = useState("sip");

  const [values, setValues] = useState({
    amount: "",
    rate: "",
    years: "",
  });

  const amount = Number(values.amount);
  const rate = Number(values.rate);
  const years = Number(values.years);

  const isValid = amount > 0 && rate >= 0 && years > 0;

  const result = useMemo(() => {
    if (!isValid) return null;

    return mode === "sip"
      ? calculateSip(amount, rate, years)
      : calculateLumpsum(amount, rate, years);
  }, [amount, rate, years, mode, isValid]);

  const inputs = [
    {
      key: "amount",
      label: mode === "sip" ? "Monthly SIP Amount" : "Lumpsum Amount",
      type: "amount",
      placeholder: mode === "sip" ? "5,000" : "1,00,000",
    },
    {
      key: "rate",
      label: "Expected Annual Return (%)",
      type: "percent",
      placeholder: "12",
    },
    {
      key: "years",
      label: "Investment Duration (Years)",
      type: "number",
      placeholder: "Ex: 5",
      min: 1,
    },
  ];

  return (
    <CalculatorLayout
      title="Mutual Fund Return Calculator"
      subtitle="Estimate future value using SIP or lumpsum investments with compounding."
      badges={[
        "100% Free",
        "Instant Results",
        "Compound Growth Accurate",
        "No Signup Required",
      ]}
    >
      {/* MODE SWITCH */}
      {/* MODE SWITCH */}
      <div
        className="
    inline-flex
    rounded-lg
    p-1
    bg-[var(--surface-2)]
    border
    border-[var(--border)]
    w-fit
    mb-4
  "
      >
        {["sip", "lumpsum"].map((type) => {
          const active = mode === type;

          return (
            <button
              key={type}
              type="button"
              onClick={() => setMode(type)}
              className={`
          px-5 py-2
          text-sm
          font-medium
          rounded-md
          transition-all
          duration-200

          ${
            active
              ? "bg-[var(--primary)] text-white shadow-sm"
              : "text-[var(--text-muted)] hover:bg-[var(--surface)]"
          }
        `}
            >
              {type === "sip" ? "SIP" : "Lumpsum"}
            </button>
          );
        })}
      </div>

      <InputsGrid inputs={inputs} values={values} setValues={setValues} />

      {result && (
        <>
          {/* <ResultHero label="Final Value" value={result.finalValue} /> */}
          <ResultHero label="Final Value" value={result.futureValue} />
          <DonutBreakdownChart
            data={[
              { name: "Investment", value: result.invested },
              { name: "Returns", value: result.gains },
            ]}
          />

          {/* <StatsGrid
            items={[
              { label: "Total Investment", value: formatINR(result.invested) },
              {
                label: "Total Returns",
                value: formatINR(result.gains),
                variant: "success",
              },
              {
                label: "Final Value",
                value: formatINR(result.finalValue),
                variant: "primary",
              },
              { label: "Total Months", value: result.months, variant: "info" },
            ]}
          /> */}

          <StatsGrid
            items={[
              { label: "Total Investment", value: formatINR(result.invested) },
              {
                label: "Total Returns",
                value: formatINR(result.gains),
                variant: "success",
              },
              {
                label: "Final Value",
                value: formatINR(result.futureValue),
                variant: "primary",
              },
              { label: "Total Months", value: result.months, variant: "info" },
            ]}
          />

          <ExplanationText
            text={`Investing ${formatINR(amount)} ${
              mode === "sip" ? "monthly" : "once"
            } for ${years} years at ${rate}% can grow to ${formatINR(
              result.futureValue,
            )}.`}
          />
        </>
      )}

      <MutualFundReturnCalculatorArticle/>
    </CalculatorLayout>
  );
}
