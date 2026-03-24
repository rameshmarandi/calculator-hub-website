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

export default function MutualFundReturnCalculator() {
  /* ================= MODE ================= */

  const [mode, setMode] = useState("sip");

  /* ================= STATE ================= */

  const [values, setValues] = useState({
    amount: "5000",
    rate: "12",
    years: "10",
  });

  /* ================= CALC ================= */

  const result = useMemo(() => {
    const amount = Number(values.amount) || 0;
    const rate = Number(values.rate) || 0;
    const years = Number(values.years) || 0;

    return mode === "sip"
      ? calculateSip(amount, rate, years)
      : calculateLumpsum(amount, rate, years);
  }, [values, mode]);

  /* ================= INPUT CONFIG ================= */

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
      min: 1,
      placeholder: "10",
    },
  ];

  /* ================= NORMALIZED VALUES ================= */

  const amount = Number(values.amount) || 0;
  const rate = Number(values.rate) || 0;
  const years = Number(values.years) || 0;

  /* ================= UI ================= */

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

      <ResultHero label="Final Value" value={result.futureValue} />

      <DonutBreakdownChart
        title="Investment vs Profit"
        data={[
          { name: "Investment", value: result.invested },
          { name: "Returns", value: result.gains },
        ]}
      />

      <StatsGrid
        items={[
          {
            label: "Total Investment",
            value: formatINR(result.invested),
          },
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
          {
            label: "Total Months",
            value: result.months,
            variant: "info",
          },
        ]}
      />

      <ExplanationText
        text={`Investing ${formatINR(amount)} ${
          mode === "sip" ? "monthly" : "once"
        } for ${years} years at ${rate}% can grow to ${formatINR(
          result.futureValue
        )}.`}
      />

      <MutualFundReturnCalculatorArticle />
    </CalculatorLayout>
  );
}