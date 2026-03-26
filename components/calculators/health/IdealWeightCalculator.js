"use client";

import { useMemo, useState } from "react";
import { BarChart } from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { ResultCard } from "../../ResultCard";
import IdealWeightCalculatorArticle from "../../content/health/IdealWeightCalculatorArticle";

import { calculateIdealWeight } from "../../../lib/formulas";

export default function IdealWeightCalculator() {

  const [gender, setGender] = useState("male");
  const [height, setHeight] = useState("170");

  const result = useMemo(() => {

    return calculateIdealWeight(
      gender,
      height
    );

  }, [gender, height]);

  return (
    <section
      className="rounded-xl p-6 space-y-10"
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)"
      }}
    >

      <header>
        <h1 className="text-2xl font-bold mb-1">Ideal Weight Calculator</h1>
        <p className="text-sm leading-relaxed">
          Estimate your healthy body weight based on height and gender.
        </p>
      </header>

      <div className="space-y-4">

        <div
          className="flex rounded-md overflow-hidden"
          style={{ border: "1px solid var(--border)" }}
        >
          <button
            type="button"
            onClick={() => setGender("male")}
            className="flex-1 py-2 text-sm font-medium"
            style={{
              backgroundColor: gender === "male" ? "var(--primary)" : "transparent",
              color: gender === "male" ? "#fff" : "var(--text)"
            }}
          >
            Male
          </button>

          <button
            type="button"
            onClick={() => setGender("female")}
            className="flex-1 py-2 text-sm font-medium"
            style={{
              backgroundColor: gender === "female" ? "var(--primary)" : "transparent",
              color: gender === "female" ? "#fff" : "var(--text)",
              borderLeft: "1px solid var(--border)"
            }}
          >
            Female
          </button>
        </div>

        <AmountInput
          label="Height (cm)"
          value={height}
          onChange={setHeight}
          prefix=""
        />

      </div>

      <div aria-live="polite" className="space-y-3">

        <ResultCard
          variant="primary"
          icon={<BarChart size={20} />}
          label="Your Ideal Weight"
          value={`${result.weight} kg`}
        />

        <p className="text-sm">
          Healthy range: <strong>{result.min} – {result.max} kg</strong>
        </p>

      </div>

      <IdealWeightCalculatorArticle />

    </section>
  );
}