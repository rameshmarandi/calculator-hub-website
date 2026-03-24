"use client";

import { useMemo, useState } from "react";

import CalculatorLayout from "@/components/core/CalculatorLayout";
import InputsGrid from "@/components/core/InputsGrid";
import ResultHero from "@/components/core/ResultHero";
import StatsGrid from "@/components/core/StatsGrid";
import DonutBreakdownChart from "@/components/core/DonutBreakdownChart";
import ExplanationText from "@/components/core/ExplanationText";

import { formatINR } from "@/lib/format";

import NetWorthCalculatorArticle from "../../content/finance/NetWorthCalculatorArticle";

/*
=====================================================
FORMULA

Net Worth = Assets − Liabilities
=====================================================
*/

export default function NetWorthCalculator() {

  /* ================= STATE ================= */

  const [values, setValues] = useState({
    cash: "50000",
    investments: "300000",
    property: "2500000",
    otherAssets: "50000",
    loans: "1000000",
    creditCards: "20000",
    otherLiabilities: "0",
  });

  /* ================= SAFE PARSING ================= */

  const parsed = useMemo(() => {
    return {
      cash: Number(values.cash) || 0,
      investments: Number(values.investments) || 0,
      property: Number(values.property) || 0,
      otherAssets: Number(values.otherAssets) || 0,
      loans: Number(values.loans) || 0,
      creditCards: Number(values.creditCards) || 0,
      otherLiabilities: Number(values.otherLiabilities) || 0,
    };
  }, [values]);

  /* ================= PURE CALCULATION ================= */

  const result = useMemo(() => {

    const assets =
      parsed.cash +
      parsed.investments +
      parsed.property +
      parsed.otherAssets;

    const liabilities =
      parsed.loans +
      parsed.creditCards +
      parsed.otherLiabilities;

    const netWorth = assets - liabilities;

    return {
      assets,
      liabilities,
      netWorth,
    };

  }, [parsed]);

  /* ================= CHART DATA ================= */

  const chartData = useMemo(() => {
    return [
      { name: "Assets", value: result.assets || 0 },
      { name: "Liabilities", value: result.liabilities || 0 },
    ];
  }, [result]);

  /* ================= INPUT CONFIG ================= */

  const inputs = useMemo(
    () => [
      /* Assets */
      {
        key: "cash",
        label: "Cash & Bank Balance",
        type: "amount",
        group: "Assets",
      },
      {
        key: "investments",
        label: "Investments",
        type: "amount",
        group: "Assets",
      },
      {
        key: "property",
        label: "Property Value",
        type: "amount",
        group: "Assets",
      },
      {
        key: "otherAssets",
        label: "Other Assets",
        type: "amount",
        group: "Assets",
      },

      /* Liabilities */
      {
        key: "loans",
        label: "Loans",
        type: "amount",
        group: "Liabilities",
      },
      {
        key: "creditCards",
        label: "Credit Card Dues",
        type: "amount",
        group: "Liabilities",
      },
      {
        key: "otherLiabilities",
        label: "Other Liabilities",
        type: "amount",
        group: "Liabilities",
      },
    ],
    []
  );

  /* ================= UI ================= */

  return (
    <CalculatorLayout
      title="Net Worth Calculator"
      subtitle="Calculate your total assets, liabilities and net worth instantly"
      badges={[
        "100% Free",
        "Instant Results",
        "Accurate Snapshot",
        "No Signup Required",
      ]}
    >

      {/* INPUTS */}
      <InputsGrid inputs={inputs} values={values} setValues={setValues} />

      {/* HERO RESULT */}
      <ResultHero
        label="Your Net Worth"
        value={formatINR(result.netWorth)}
      />

      {/* DONUT CHART */}
      {result.assets > 0 && (
        <DonutBreakdownChart
          title="Assets vs Liabilities"
          data={chartData}
        />
      )}

      {/* STATS */}
      <StatsGrid
        items={[
          {
            label: "Total Assets",
            value: formatINR(result.assets),
            variant: "primary",
          },
          {
            label: "Total Liabilities",
            value: formatINR(result.liabilities),
            variant: "warning",
          },
          {
            label: "Net Worth",
            value: formatINR(result.netWorth),
            variant: result.netWorth >= 0 ? "success" : "danger",
          },
        ]}
      />

      {/* EXPLANATION */}
      <ExplanationText
        text={`You own assets worth ${formatINR(
          result.assets
        )} and owe ${formatINR(
          result.liabilities
        )}. This results in a net worth of ${formatINR(
          result.netWorth
        )}. ${
          result.netWorth >= 0
            ? "A positive net worth indicates strong financial health."
            : "A negative net worth means liabilities exceed assets."
        }`}
      />

      {/* SEO ARTICLE */}
      <NetWorthCalculatorArticle />

    </CalculatorLayout>
  );
}