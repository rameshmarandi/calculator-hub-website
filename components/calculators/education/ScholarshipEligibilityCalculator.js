"use client";

import { useState } from "react";
import { Calculator, BadgeCheck } from "lucide-react";

import { PercentageInput } from "../../inputs/PercentageInput";
import { ResultCard } from "../../ResultCard";

export default function ScholarshipEligibilityCalculator() {
  const [percentage, setPercentage] = useState("");
  const [familyIncome, setFamilyIncome] = useState("");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    if (!percentage || isNaN(percentage)) {
      setError("Please enter a valid percentage.");
      return false;
    }

    if (Number(percentage) < 0 || Number(percentage) > 100) {
      setError("Percentage must be between 0 and 100.");
      return false;
    }

    if (!familyIncome || isNaN(familyIncome)) {
      setError("Please enter valid annual family income.");
      return false;
    }

    if (Number(familyIncome) < 0) {
      setError("Family income cannot be negative.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- CALCULATION ---------------- */
  function checkEligibility(e) {
    e.preventDefault();
    if (!validate()) return;

    const p = Number(percentage);
    const income = Number(familyIncome);

    /*
      Common Scholarship Criteria (Generic)
      - Minimum 60% marks
      - Family income ≤ ₹8,00,000 per year
    */

    const isEligible = p >= 60 && income <= 800000;

    setResult({
      eligible: isEligible,
      percentage: p,
      income,
    });
  }

  return (
    <section
      className="rounded-xl p-6 space-y-10"
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)",
      }}
    >
      {/* ================= HEADER ================= */}
      <header>
        <h1 className="text-2xl font-bold mb-1">
          Scholarship Eligibility Calculator
        </h1>
        <p className="text-sm leading-relaxed">
          Check whether you are eligible for scholarships based on your
          academic performance and annual family income using this
          Scholarship Eligibility Calculator.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={checkEligibility} className="space-y-4">
        <PercentageInput
          label="Your Percentage (%)"
          value={percentage}
          onChange={setPercentage}
          placeholder="78"
        />

        <PercentageInput
          label="Annual Family Income (₹)"
          value={familyIncome}
          onChange={setFamilyIncome}
          placeholder="450000"
        />

        {error && (
          <p className="text-sm text-red-500">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full py-2.5 rounded-md font-medium flex items-center justify-center gap-2"
          style={{
            backgroundColor: "var(--primary)",
            color: "#fff",
          }}
        >
          <Calculator size={18} />
          Check Eligibility
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <div aria-live="polite">
          <ResultCard
            variant={result.eligible ? "success" : "danger"}
            icon={<BadgeCheck size={20} />}
            label="Scholarship Eligibility Status"
            value={result.eligible ? "Eligible 🎉" : "Not Eligible"}
          />
        </div>
      )}

      {/* ================= SEO BLOG CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          How Scholarship Eligibility Is Determined
        </h2>

        <p>
          Scholarship eligibility is usually based on a combination of
          academic merit and financial background. Many government and
          private scholarships aim to support students with good academic
          performance from economically weaker sections.
        </p>

        <h3 className="font-semibold">
          Common Eligibility Criteria
        </h3>

        <ul className="list-disc pl-5">
          <li>Minimum academic percentage (often 60% or above)</li>
          <li>Annual family income below a specified limit</li>
          <li>Additional criteria like category or domicile</li>
        </ul>

        <h3 className="font-semibold">
          Why Use a Scholarship Eligibility Calculator?
        </h3>

        <ul className="list-disc pl-5">
          <li>Quickly check basic eligibility</li>
          <li>Avoid wasting time on ineligible applications</li>
          <li>Plan scholarship applications better</li>
          <li>Understand common cutoff criteria</li>
        </ul>

        <p>
          This calculator provides a general eligibility check. Final
          eligibility depends on the specific scholarship’s official
          guidelines.
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ Eligibility criteria vary by scholarship provider. This tool
        offers a general estimation and should not be considered an
        official confirmation.
      </aside>
    </section>
  );
}
