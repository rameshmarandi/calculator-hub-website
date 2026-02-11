"use client";

import { useMemo, useState } from "react";

import InputsGrid from "@/components/core/InputsGrid";
import StatsGrid from "@/components/core/StatsGrid";
import ResultHero from "@/components/core/ResultHero";
import ExplanationText from "@/components/core/ExplanationText";
import CalculatorLayout from "@/components/core/CalculatorLayout";

import { formatINR } from "@/lib/format";
import { calculateBuyVsRentAdvanced } from "../../../lib/formulas";
import HomeLoanVsRentArticle from "../../content/finance/HomeLoanVsRentArticle";

export default function HomeLoanVsRentCalculator() {
  const [values, setValues] = useState({
    price: "",
    rent: "",
    rate: "",
    years: "",
    down: "",
    growth: "6",
    maintenance: "1",
  });

  const isComplete =
    values.price && values.rent && values.rate && values.years && values.down;

  const result = useMemo(() => {
    if (!isComplete) return null;

    return calculateBuyVsRentAdvanced({
      propertyPrice: values.price,
      monthlyRent: values.rent,
      annualRate: values.rate,
      years: values.years,
      downPercent: values.down,
      appreciationPercent: values.growth,
      maintenancePercent: values.maintenance,
    });
  }, [values, isComplete]);

  const inputs = [
    { key: "price", label: "Property Price", type: "amount" },
    { key: "rent", label: "Monthly Rent", type: "amount" },
    { key: "rate", label: "Interest Rate (%)", type: "percent" },
    { key: "years", label: "Tenure (Years)", type: "number" },
    { key: "down", label: "Down Payment (%)", type: "percent" },
    { key: "growth", label: "Property Growth (%)", type: "percent" },
    { key: "maintenance", label: "Maintenance (% yearly)", type: "percent" },
  ];

  return (
    <CalculatorLayout
      title="Buy vs Rent Wealth Calculator"
      subtitle="Compare real wealth impact including appreciation and maintenance."
      badges={["Wealth Based", "Advanced", "Instant", "Free"]}
    >
      <InputsGrid inputs={inputs} values={values} setValues={setValues} />

      {result && (
        <>
          <ResultHero
            label="Wealth Difference"
            value={result.wealthDifference}
          />
          <StatsGrid
            items={[
              {
                label: "Monthly EMI",
                value: formatINR(result.emi),
                variant: "neutral",
              },
              {
                label: "Total EMI Paid",
                value: formatINR(result.totalEMI),
                variant: "danger", // money out
              },
              {
                label: "Total Rent Paid",
                value: formatINR(result.totalRent),
                variant: "warning", // expense
              },
              {
                label: "Future Property Value",
                value: formatINR(result.futureValue),
                variant: "success", // asset gain
              },
              {
                label: "Maintenance Cost",
                value: formatINR(result.maintenanceCost),
                variant: "danger", // expense
              },
              {
                label: "Verdict",
                value: result.verdict,
                variant:
                  result.verdict === "Buying is Better" ? "success" : "warning",
              },
            ]}
          />

          <ExplanationText
            text={`After ${values.years} years, your property may grow to ${formatINR(
              result.futureValue,
            )}. Considering EMI and maintenance, ${result.verdict}.`}
          />
        </>
      )}
      <HomeLoanVsRentArticle/>
    </CalculatorLayout>
  );
}
