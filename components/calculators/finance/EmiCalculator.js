// "use client";

// import { useState } from "react";
// import {
//   Calendar,
//   Calculator,
//   Wallet,
//   TrendingUp,
//   IndianRupee,
// } from "lucide-react";

// import { PercentageInput } from "../../inputs/PercentageInput";
// import { AmountInput } from "../../inputs/AmountInput";
// import { ResultCard } from "../../ResultCard";
// import { InputField } from "../../inputs/InputField";

// export default function EmiCalculator() {
//   const [loanAmount, setLoanAmount] = useState("");
//   const [interestRate, setInterestRate] = useState("");
//   const [tenureYears, setTenureYears] = useState("");
//   const [result, setResult] = useState(null);

//   // store actual error message
//   const [error, setError] = useState("");

//   /* ---------------- VALIDATION ---------------- */
//  function validate() {
//   if (!loanAmount || Number(loanAmount) <= 0) {
//     setError("Please enter a valid loan amount.");
//     return false;
//   }

//   if (
//     interestRate === "" ||
//     Number(interestRate) < 0 ||
//     Number(interestRate) > 100
//   ) {
//     setError("Interest rate should be between 0% and 100%.");
//     return false;
//   }

//   if (!tenureYears || Number(tenureYears) <= 0) {
//     setError("Loan tenure must be greater than 0.");
//     return false;
//   }

//   setError("");
//   return true;
// }

//   /* ---------------- CALCULATION ---------------- */
//   function calculateEMI(e) {
//     e.preventDefault();

//     if (!validate()) {
//       setResult(null);
//       return;
//     }

//     const P = Number(loanAmount);
//     const annualRate = Number(interestRate);
//     const years = Number(tenureYears);

//     const n = years * 12;
//     const r = annualRate / 12 / 100;

//     const emi =
//       r === 0
//         ? P / n
//         : (P * r * Math.pow(1 + r, n)) /
//           (Math.pow(1 + r, n) - 1);

//     const totalPayment = emi * n;
//     const totalInterest = totalPayment - P;

//     setResult({
//       emi: Math.round(emi),
//       totalInterest: Math.round(totalInterest),
//       totalPayment: Math.round(totalPayment),
//     });
//   }

//   return (
//     <section
//       className="rounded-xl p-6 space-y-8"
//       style={{
//         backgroundColor: "var(--surface)",
//         border: "1px solid var(--border)",
//       }}
//     >
//       {/* HEADER */}
//       <header>
//         <h1 className="text-2xl font-bold mb-1">
//           EMI Calculator
//         </h1>

//         <p className="text-sm leading-relaxed">
//           Calculate your monthly EMI, total interest payable, and total loan
//           amount for home, car, personal, or education loans.
//         </p>
//       </header>

//       {/* FORM */}
//       <form onSubmit={calculateEMI} className="space-y-4">
//         <AmountInput
//           label="Loan Amount"
//           value={loanAmount}
//           onChange={setLoanAmount}
//           placeholder="5,00,000"
//           hasError={error.toLowerCase().includes("loan")}
//         />

//         <PercentageInput
//           label="Interest Rate (per year)"
//           value={interestRate}
//           onChange={setInterestRate}
//           placeholder="10.5"
//           hasError={error.toLowerCase().includes("interest")}
//         />

//         <InputField
//           icon={<Calendar size={18} />}
//           label="Loan Tenure (in years)"
//           value={tenureYears}
//           onChange={setTenureYears}
//           placeholder="5"
//           min={1}

//           hasError={error.toLowerCase().includes("tenure")}
//         />

//         {error && (
//           <p className="text-sm text-red-500">
//             {error}
//           </p>
//         )}

//         <button
//           type="submit"
//           className="w-full py-2.5 rounded-md font-medium flex items-center justify-center gap-2"
//           style={{ backgroundColor: "var(--primary)", color: "#fff" }}
//         >
//           <Calculator size={18} />
//           Calculate EMI
//         </button>
//       </form>

//       {/* RESULT */}
//       {result && (
//         <div className="grid md:grid-cols-3 gap-4" aria-live="polite">
//           <ResultCard
//             variant="primary"
//             icon={<Wallet size={20} />}
//             label="Monthly EMI"
//             value={`₹ ${result.emi.toLocaleString("en-IN")}`}
//           />

//           <ResultCard
//             variant="warning"
//             icon={<TrendingUp size={20} />}
//             label="Total Interest"
//             value={`₹ ${result.totalInterest.toLocaleString("en-IN")}`}
//           />

//           <ResultCard
//             variant="neutral"
//             icon={<IndianRupee size={20} />}
//             label="Total Payment"
//             value={`₹ ${result.totalPayment.toLocaleString("en-IN")}`}
//           />
//         </div>
//       )}

//       {/* INFO */}
//       <article className="space-y-4 text-sm leading-relaxed">
//         <h2 className="font-semibold text-base">
//           How is EMI Calculated?
//         </h2>

//         <p>
//           EMI (Equated Monthly Installment) is calculated using a standard
//           mathematical formula based on loan amount, interest rate, and
//           tenure.
//         </p>

//         <p
//           className="font-mono text-xs p-3 rounded"
//           style={{ backgroundColor: "var(--surface-2)" }}
//         >
//           EMI = P × r × (1 + r)<sup>n</sup> / ((1 + r)<sup>n</sup> − 1)
//         </p>

//         <ul className="list-disc pl-5">
//           <li><strong>P</strong> = Loan Amount</li>
//           <li><strong>r</strong> = Monthly Interest Rate</li>
//           <li><strong>n</strong> = Loan Tenure in Months</li>
//         </ul>
//       </article>

//       {/* USE CASES */}
//       <aside className="text-sm space-y-2">
//         <h3 className="font-semibold">Why use this EMI Calculator?</h3>
//         <ul className="list-disc pl-5">
//           <li>Works for all loan types</li>
//           <li>Helps plan monthly repayments</li>
//           <li>Compare loan options easily</li>
//           <li>Instant and accurate results</li>
//         </ul>
//       </aside>
//     </section>
//   );
// }

"use client";

import { useMemo, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { calculateEmi } from "@/lib/emiMath";
import { formatINR } from "@/lib/format";

export default function EmiCalculator() {
  /* ================= STATE ================= */
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [tenureYears, setTenureYears] = useState("");

  /* ================= LIVE CALC ================= */
  const result = useMemo(() => {
    const P = Number(loanAmount);
    const R = Number(interestRate);
    const Y = Number(tenureYears);

    if (!P || !R || !Y) return null;

    return calculateEmi(P, R, Y);
  }, [loanAmount, interestRate, tenureYears]);

  /* ================= AMORTIZATION ================= */
  const schedule = useMemo(() => {
    if (!result) return [];

    let balance = Number(loanAmount);
    const rows = [];

    for (let i = 1; i <= result.n; i++) {
      const interest = balance * result.r;
      const principal = result.emi - interest;
      balance -= principal;

      rows.push({
        month: i,
        principal,
        interest,
        balance: Math.max(balance, 0),
      });
    }

    return rows;
  }, [result, loanAmount]);

  return (
    <section className="space-y-14">
      {/* ================= CALCULATOR UI ================= */}
      <div
        className="
          rounded-2xl p-8 space-y-10 shadow-xl
          bg-gradient-to-br from-indigo-50 via-white to-blue-50
          dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-800
        ">
        <header>
          <h1 className="text-2xl font-bold">EMI Calculator</h1>
          <p className="text-sm opacity-70">
            Instantly calculate EMI, interest and total repayment.
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* ---------- INPUTS ---------- */}
          <div className="space-y-6">
            <Input
              label="Loan Amount (₹)"
              placeholder="5,00,000"
              value={loanAmount}
              set={setLoanAmount}
            />

            <Input
              label="Interest Rate (%)"
              placeholder="10.5"
              value={interestRate}
              set={setInterestRate}
            />

            <Input
              label="Tenure (Years)"
              placeholder="5"
              value={tenureYears}
              set={setTenureYears}
            />
          </div>

          {/* ---------- RESULTS ---------- */}
          {result && (
            <div className="space-y-6">
              <div className="grid sm:grid-cols-3 gap-4">
                <StatCard
                  title="Monthly EMI"
                  value={result.emi}
                  variant="emi"
                />
                <StatCard
                  title="Total Interest"
                  value={result.totalInterest}
                  variant="interest"
                />
                <StatCard
                  title="Total Payment"
                  value={result.totalPayment}
                  variant="payment"
                />
              </div>

              {/* PIE CHART */}
              <div className="h-56 bg-white dark:bg-zinc-900 rounded-xl shadow-sm p-4">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Principal", value: Number(loanAmount) },
                        { name: "Interest", value: result.totalInterest },
                      ]}
                      dataKey="value"
                      innerRadius={55}
                      outerRadius={85}>
                      <Cell fill="#6366F1" />
                      <Cell fill="#F43F5E" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>

        {/* ---------- TABLE ---------- */}
        {schedule.length > 0 && (
          <div className="overflow-auto max-h-[400px] rounded-xl border bg-white dark:bg-zinc-900">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 dark:bg-zinc-800 sticky top-0">
                <tr>
                  <Th>Month</Th>
                  <Th>Principal</Th>
                  <Th>Interest</Th>
                  <Th>Balance</Th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((r) => (
                  <tr
                    key={r.month}
                    className="border-t hover:bg-gray-50 dark:hover:bg-zinc-800">
                    <Td>{r.month}</Td>
                    <Td>{formatINR(r.principal)}</Td>
                    <Td className="text-rose-500">{formatINR(r.interest)}</Td>
                    <Td>{formatINR(r.balance)}</Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ================= SEO CONTENT ================= */}
      <article className="prose dark:prose-invert max-w-none">
        <h2>How EMI is Calculated</h2>

        <p>EMI is calculated using the standard formula:</p>

        <pre className="bg-gray-100 dark:bg-zinc-800 p-3 rounded">
          EMI = P × r × (1 + r)^n / ((1 + r)^n − 1)
        </pre>

        <ul>
          <li>P = Loan Amount</li>
          <li>r = Monthly Interest Rate</li>
          <li>n = Tenure in Months</li>
        </ul>
      </article>
    </section>
  );
}

/* ================= SMALL COMPONENTS ================= */

function Input({ label, value, set, placeholder }) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium">{label}</label>
      <input
        type="number"
        value={value}
        placeholder={placeholder}
        onChange={(e) => set(e.target.value)}
        className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-indigo-400"
      />
    </div>
  );
}

function StatCard({ title, value, variant }) {
  const styles = {
    emi: "from-indigo-500 to-blue-500",
    interest: "from-rose-500 to-orange-500",
    payment: "from-emerald-500 to-teal-500",
  };

  return (
    <div
      className={`p-5 rounded-xl text-white bg-gradient-to-br ${styles[variant]}`}>
      <p className="text-xs opacity-90">{title}</p>
      <p className="text-lg font-bold">{formatINR(value)}</p>
    </div>
  );
}

function Th({ children }) {
  return <th className="p-3 text-left font-semibold">{children}</th>;
}

function Td({ children, className }) {
  return <td className={`p-3 ${className || ""}`}>{children}</td>;
}
