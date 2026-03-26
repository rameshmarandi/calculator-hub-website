"use client";

import { useState } from "react";
import { BadgeCheck } from "lucide-react";

import { PercentageInput } from "../../inputs/PercentageInput";
import { AmountInput } from "../../inputs/AmountInput";
import { ResultCard } from "../../ResultCard";

import { scholarshipEligibilityCalculator } from "../../../lib/formulas";

export default function ScholarshipEligibilityCalculator() {

  /* ---------------- PREFILLED VALUES ---------------- */
  const [percentage, setPercentage] = useState("78");
  const [familyIncome, setFamilyIncome] = useState("450000");

  /* ---------------- SAFE INPUTS ---------------- */
  const safePercentage = Number(percentage) || 0;
  const safeIncome = Number(familyIncome) || 0;

  /* ---------------- CALCULATION ---------------- */
  const result = scholarshipEligibilityCalculator({
    percentage: safePercentage,
    familyIncome: safeIncome
  });

  return (
    <section
      className="rounded-xl p-6 space-y-10"
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)",
      }}
    >

      {/* HEADER */}
      <header>
        <h1 className="text-2xl font-bold mb-1">
          Scholarship Eligibility Calculator
        </h1>

        <p className="text-sm leading-relaxed">
          Check basic scholarship eligibility based on academic
          percentage and annual family income.
        </p>
      </header>

      {/* INPUTS */}
      <div className="space-y-4">

        <PercentageInput
          label="Your Percentage (%)"
          value={percentage}
          onChange={setPercentage}
          placeholder="78"
        />

        <AmountInput
          label="Annual Family Income (₹)"
          value={familyIncome}
          onChange={setFamilyIncome}
          prefix=""
          placeholder="450000"
          min={0}
        />

      </div>

      {/* RESULT */}
      <div aria-live="polite">
        <ResultCard
          variant={result.eligible ? "success" : "danger"}
          icon={<BadgeCheck size={20} />}
          label="Scholarship Eligibility Status"
          value={result.eligible ? "Eligible 🎉" : "Not Eligible"}
        />
      </div>

      {/* SEO CONTENT */}
      <article className="space-y-4 text-sm leading-relaxed">

        <h2 className="font-semibold text-base">
          Scholarship Eligibility Criteria
        </h2>

        <p>
          Most scholarships require a minimum academic percentage
          along with a maximum annual family income threshold.
        </p>

        <ul className="list-disc pl-5">
          <li>Minimum 60% academic score</li>
          <li>Family income below ₹8,00,000</li>
          <li>Additional criteria depending on scholarship</li>
        </ul>

      </article>

      <aside className="text-xs text-muted">
        ⚠️ This calculator provides a general estimate. Actual
        eligibility depends on the scholarship provider.
      </aside>

    </section>
  );
}