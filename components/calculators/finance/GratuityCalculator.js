"use client";

import { useState } from "react";
import {
  Calculator,
  IndianRupee,
  Wallet,
  TrendingUp,
  Briefcase,
} from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { ResultCard } from "../../ResultCard";

export default function GratuityCalculator() {
  const [basicSalary, setBasicSalary] = useState("");
  const [yearsOfService, setYearsOfService] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    if (!basicSalary || Number(basicSalary) <= 0) {
      setError("Please enter a valid last drawn basic salary.");
      return false;
    }

    if (!yearsOfService || Number(yearsOfService) < 1) {
      setError("Years of service must be at least 1.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- CALCULATION ---------------- */
  function calculateGratuity(e) {
    e.preventDefault();

    if (!validate()) {
      setResult(null);
      return;
    }

    const salary = Number(basicSalary);
    const years = Math.floor(Number(yearsOfService)); // completed years

    // Gratuity Formula: (Last Salary × 15 × Years) / 26
    const gratuity = (salary * 15 * years) / 26;

    setResult({
      salary,
      years,
      gratuity: Math.round(gratuity),
    });
  }

  return (
    <section
      className="rounded-xl p-6 space-y-12"
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)",
      }}
    >
      {/* ================= HEADER ================= */}
      <header className="space-y-2">
        <h1 className="text-2xl font-bold">Gratuity Calculator</h1>

        <p className="text-sm leading-relaxed">
          Use this Gratuity Calculator to estimate the gratuity amount you will
          receive based on your last drawn basic salary and years of service, as
          per Indian gratuity rules.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateGratuity} className="space-y-4">
        <AmountInput
          label="Last Drawn Monthly Basic Salary"
          value={basicSalary}
          onChange={setBasicSalary}
          placeholder="40,000"
          hasError={error.toLowerCase().includes("salary")}
        />

        <label className="block space-y-1">
          <span className="text-sm font-medium">
            Years of Continuous Service
          </span>
          <input
            type="number"
            value={yearsOfService}
            onChange={(e) => setYearsOfService(e.target.value)}
            placeholder="10"
            className="w-full rounded-md px-3 py-2 border"
            style={{
              backgroundColor: "var(--surface-2)",
              borderColor: "var(--border)",
            }}
          />
        </label>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          className="w-full py-2.5 rounded-md font-medium flex items-center justify-center gap-2"
          style={{ backgroundColor: "var(--primary)", color: "#fff" }}
        >
          <Calculator size={18} />
          Calculate Gratuity
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <div className="grid md:grid-cols-3 gap-4" aria-live="polite">
          <ResultCard
            variant="primary"
            icon={<Briefcase size={20} />}
            label="Last Drawn Salary"
            value={`₹ ${result.salary.toLocaleString("en-IN")}`}
          />

          <ResultCard
            variant="neutral"
            icon={<TrendingUp size={20} />}
            label="Years of Service"
            value={`${result.years} years`}
          />

          <ResultCard
            variant="success"
            icon={<IndianRupee size={20} />}
            label="Estimated Gratuity Amount"
            value={`₹ ${result.gratuity.toLocaleString("en-IN")}`}
          />
        </div>
      )}

      {/* ================= ARTICLE (SEO CONTENT) ================= */}
      <article className="space-y-6 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">What is Gratuity?</h2>

        <p>
          Gratuity is a lump sum amount paid by an employer to an employee as a
          token of appreciation for long and continuous service. It is governed
          by the <strong>Payment of Gratuity Act, 1972</strong>.
        </p>

        <h2 className="font-semibold text-base">
          Gratuity Eligibility in India
        </h2>

        <ul className="list-disc pl-5 space-y-1">
          <li>Employee must complete at least 5 years of service</li>
          <li>Applicable to organizations with 10 or more employees</li>
          <li>Payable on resignation, retirement, or death</li>
        </ul>

        <h2 className="font-semibold text-base">Gratuity Formula</h2>

        <pre
          className="text-xs p-3 rounded font-mono"
          style={{ backgroundColor: "var(--surface-2)" }}
        >
          Gratuity = (Last Drawn Salary × 15 × Years of Service) ÷ 26
        </pre>

        <h2 className="font-semibold text-base">
          Gratuity Calculation Example
        </h2>

        <p>
          If your last drawn basic salary is ₹40,000 and you have completed 10
          years of service:
        </p>

        <p>
          <strong>(40,000 × 15 × 10) ÷ 26 = ₹2,30,769</strong>
        </p>

        <h2 className="font-semibold text-base">Important Points to Know</h2>

        <ul className="list-disc pl-5 space-y-1">
          <li>Gratuity is tax-free up to prescribed limits</li>
          <li>Only completed years of service are considered</li>
          <li>Salary usually means basic + DA</li>
        </ul>
      </article>
    </section>
  );
}
