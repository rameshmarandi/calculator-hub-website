"use client";

import { useMemo, useState } from "react";

import InputsGrid from "@/components/core/InputsGrid";
import StatsGrid from "@/components/core/StatsGrid";
import ResultHero from "@/components/core/ResultHero";
import ExplanationText from "@/components/core/ExplanationText";
import CalculatorLayout from "@/components/core/CalculatorLayout";

import { formatINR } from "@/lib/format";
import { calculatePrepayment } from "../../../lib/formulas";
import LoanPrepaymentArticle from "../../content/finance/LoanPrepaymentArticle";

export default function LoanPrepaymentCalculator() {
  /* ================= STATE ================= */

  const [values, setValues] = useState({
    loan: "",
    rate: "",
    years: "",
    prepayment: "",
  });

  /* ================= VALIDATION ================= */

  const isValid =
    Number(values.loan) > 0 &&
    Number(values.rate) > 0 &&
    Number(values.years) > 0 &&
    Number(values.prepayment) > 0 &&
    Number(values.prepayment) < Number(values.loan);
  const isComplete =
    values.loan !== "" &&
    values.rate !== "" &&
    values.years !== "" &&
    values.prepayment !== "" &&
    Number(values.loan) > 0 &&
    Number(values.rate) > 0 &&
    Number(values.years) > 0 &&
    Number(values.prepayment) > 0 &&
    Number(values.prepayment) < Number(values.loan);

  /* ================= CALC ================= */

  // const result = useMemo(() => {
  //   if (!isValid) {
  //     return {
  //       originalEMI: 0,
  //       newEMI: 0,
  //       interestSaved: 0,
  //       months: 0,
  //     };
  //   }

  //   return calculatePrepayment({
  //     principal: values.loan,
  //     annualRate: values.rate,
  //     years: values.years,
  //     prepayment: values.prepayment,
  //   });
  // }, [values, isValid]);

  const result = useMemo(() => {
    if (!isComplete) return null;

    return calculatePrepayment({
      principal: values.loan,
      annualRate: values.rate,
      years: values.years,
      prepayment: values.prepayment,
    });
  }, [values, isComplete]);

  /* ================= INPUT CONFIG ================= */

  const inputs = [
    {
      key: "loan",
      label: "Loan Amount",
      type: "amount",
      placeholder: "30,00,000",
      hint: "Total outstanding loan",
    },
    {
      key: "rate",
      label: "Interest Rate (%)",
      type: "percent",
      placeholder: "9",
      hint: "Annual interest rate",
    },
    {
      key: "years",
      label: "Tenure (Years)",
      type: "number",
      placeholder: "20",
      hint: "Remaining loan duration",
      min: 1,
    },
    {
      key: "prepayment",
      label: "Prepayment Amount",
      type: "amount",
      placeholder: "5,00,000",
      hint: "Extra lump sum payment",
    },
  ];

  /* ================= UI ================= */

  return (
    <CalculatorLayout
      title="Loan Prepayment Calculator"
      subtitle="Estimate EMI reduction and total interest saved after making a lump sum prepayment."
      badges={[
        "Instant Results",
        "Bank Accurate Formula",
        "100% Free",
        "No Signup Required",
      ]}
    >
      <InputsGrid inputs={inputs} values={values} setValues={setValues} />

      {isComplete && result && (
        <>
          <ResultHero label="Interest Saved" value={result.interestSaved} />

          <StatsGrid
            items={[
              {
                label: "Original EMI",
                value: formatINR(result.originalEMI),
                variant: "neutral",
              },
              {
                label: "New EMI",
                value: formatINR(result.newEMI),
                variant: "info",
              },
              {
                label: "Total Months",
                value: result.months,
                variant: "warning",
              },
            ]}
          />

          <ExplanationText
            text={`By prepaying ${formatINR(values.prepayment)}, your EMI reduces from ${formatINR(
              result.originalEMI,
            )} to ${formatINR(result.newEMI)} and you save approximately ${formatINR(
              result.interestSaved,
            )}.`}
          />
        </>
      )}

      <LoanPrepaymentArticle/>
    </CalculatorLayout>
  );
}
