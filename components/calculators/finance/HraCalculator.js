"use client";

import { useState } from "react";
import {
  Calculator,
  IndianRupee,
  Wallet,
  Home,
  Scale,
} from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { ResultCard } from "../../ResultCard";

export default function HraCalculator() {
  const [basicSalary, setBasicSalary] = useState("");
  const [hraReceived, setHraReceived] = useState("");
  const [rentPaid, setRentPaid] = useState("");
  const [isMetro, setIsMetro] = useState(true);

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    if (!basicSalary || Number(basicSalary) <= 0) {
      setError("Please enter a valid basic salary.");
      return false;
    }

    if (!hraReceived || Number(hraReceived) < 0) {
      setError("Please enter valid HRA received.");
      return false;
    }

    if (!rentPaid || Number(rentPaid) <= 0) {
      setError("Please enter valid rent paid.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- CALCULATION ---------------- */
  function calculateHRA(e) {
    e.preventDefault();

    if (!validate()) {
      setResult(null);
      return;
    }

    const basic = Number(basicSalary);
    const hra = Number(hraReceived);
    const rent = Number(rentPaid);

    const rentMinusTenPercent = Math.max(
      rent - 0.1 * basic,
      0
    );

    const hraPercent = isMetro ? 0.5 * basic : 0.4 * basic;

    const exemptHra = Math.min(
      hra,
      rentMinusTenPercent,
      hraPercent
    );

    const taxableHra = hra - exemptHra;

    setResult({
      exemptHra: Math.round(exemptHra),
      taxableHra: Math.round(taxableHra),
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
        <h1 className="text-2xl font-bold">
          HRA Calculator (House Rent Allowance)
        </h1>

        <p className="text-sm leading-relaxed">
          Use this HRA Calculator to calculate the tax-exempt and taxable
          portion of your House Rent Allowance as per Indian income tax rules.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateHRA} className="space-y-4">
        <AmountInput
          label="Basic Salary (Annual)"
          value={basicSalary}
          onChange={setBasicSalary}
          placeholder="6,00,000"
          hasError={error.toLowerCase().includes("basic")}
        />

        <AmountInput
          label="HRA Received (Annual)"
          value={hraReceived}
          onChange={setHraReceived}
          placeholder="2,40,000"
          hasError={error.toLowerCase().includes("hra")}
        />

        <AmountInput
          label="Rent Paid (Annual)"
          value={rentPaid}
          onChange={setRentPaid}
          placeholder="3,00,000"
          hasError={error.toLowerCase().includes("rent")}
        />

        {/* Metro / Non-Metro */}
        <label className="block space-y-1">
          <span className="text-sm font-medium">
            City Type
          </span>
          <select
            value={isMetro ? "metro" : "non-metro"}
            onChange={e => setIsMetro(e.target.value === "metro")}
            className="w-full rounded-md px-3 py-2 border"
            style={{
              backgroundColor: "var(--surface-2)",
              borderColor: "var(--border)",
            }}
          >
            <option value="metro">
              Metro City (Delhi, Mumbai, Chennai, Kolkata)
            </option>
            <option value="non-metro">
              Non-Metro City
            </option>
          </select>
        </label>

        {error && (
          <p className="text-sm text-red-500">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full py-2.5 rounded-md font-medium flex items-center justify-center gap-2"
          style={{ backgroundColor: "var(--primary)", color: "#fff" }}
        >
          <Calculator size={18} />
          Calculate HRA Exemption
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <div className="grid md:grid-cols-2 gap-4" aria-live="polite">
          <ResultCard
            variant="success"
            icon={<Home size={20} />}
            label="HRA Exempted"
            value={`₹ ${result.exemptHra.toLocaleString("en-IN")}`}
          />

          <ResultCard
            variant="warning"
            icon={<Scale size={20} />}
            label="HRA Taxable"
            value={`₹ ${result.taxableHra.toLocaleString("en-IN")}`}
          />
        </div>
      )}

      {/* ================= ARTICLE (SEO CONTENT) ================= */}
      <article className="space-y-6 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          What is HRA (House Rent Allowance)?
        </h2>

        <p>
          House Rent Allowance (HRA) is a component of salary paid by employers
          to employees to meet rental expenses. A portion of HRA can be claimed
          as tax-exempt under Section 10(13A) of the Income Tax Act.
        </p>

        <h2 className="font-semibold text-base">
          HRA Exemption Formula
        </h2>

        <p>
          The HRA exemption is the <strong>minimum</strong> of the following:
        </p>

        <ul className="list-disc pl-5 space-y-1">
          <li>Actual HRA received</li>
          <li>Rent paid − 10% of basic salary</li>
          <li>50% of basic salary (metro) or 40% (non-metro)</li>
        </ul>

        <pre
          className="text-xs p-3 rounded font-mono"
          style={{ backgroundColor: "var(--surface-2)" }}
        >
HRA Exempt = Min(
  Actual HRA,
  Rent Paid − 10% of Basic,
  50% / 40% of Basic
)
        </pre>

        <h2 className="font-semibold text-base">
          HRA Calculator Example
        </h2>

        <p>
          If your basic salary is ₹6,00,000, HRA received is ₹2,40,000,
          and rent paid is ₹3,00,000 in a metro city:
        </p>

        <ul className="list-disc pl-5">
          <li>Rent − 10% basic = ₹2,40,000</li>
          <li>50% of basic = ₹3,00,000</li>
          <li>Actual HRA = ₹2,40,000</li>
        </ul>

        <p>
          <strong>HRA Exempt = ₹2,40,000</strong>
        </p>

        <h2 className="font-semibold text-base">
          Who Can Claim HRA Exemption?
        </h2>

        <ul className="list-disc pl-5 space-y-1">
          <li>Salaried employees receiving HRA</li>
          <li>Employees living in rented accommodation</li>
          <li>Individuals opting for the old tax regime</li>
        </ul>
      </article>
    </section>
  );
}
