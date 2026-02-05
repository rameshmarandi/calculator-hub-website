"use client";

import { useMemo, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

import { calculateEmi } from "@/lib/emiMath";
import { formatINR } from "@/lib/format";

import { AmountInput } from "@/components/inputs/AmountInput";
import { PercentageInput } from "@/components/inputs/PercentageInput";
import { InputField } from "@/components/inputs/InputField";

export default function EmiCalculator() {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [tenureYears, setTenureYears] = useState("");

  /* ================= CALC ================= */
  const result = useMemo(() => {
    const P = Number(loanAmount);
    const R = Number(interestRate);
    const Y = Number(tenureYears);

    if (!P || !R || !Y) return null;

    return calculateEmi(P, R, Y);
  }, [loanAmount, interestRate, tenureYears]);

  /* ================= PERCENTAGES ================= */
  const percentages = useMemo(() => {
    if (!result) return null;

    const total = result.totalPayment;

    return {
      principal: ((loanAmount / total) * 100).toFixed(1),
      interest: ((result.totalInterest / total) * 100).toFixed(1),
    };
  }, [result, loanAmount]);

  /* ================= SCHEDULE ================= */
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

  /* ================= PRESET BUTTONS ================= */
  const presets = [500000, 1000000, 2000000, 5000000];

  /* ============================================================= */

  return (
    <section className="space-y-16">
      {/* ================= MAIN CARD ================= */}
      <div
        className="
    rounded-2xl shadow-lg p-4 sm:p-6 lg:p-10
    border
  "
        style={{
          backgroundColor: "var(--surface)",
          borderColor: "var(--border)",
        }}
      >
        {/* <div className="rounded-2xl shadow-lg bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-4 sm:p-6 lg:p-10"> */}
        {/* HEADER */}
        <header className="mb-6">
          <h1 className="text-2xl lg:text-3xl font-bold">
            EMI Calculator
          </h1>

          {/* TRUST BADGES */}
          <div className="flex flex-wrap gap-4 text-xs mt-3 text-gray-500 dark:text-gray-400">
            <span>✔ 100% Free</span>
            <span>✔ No Signup</span>
            <span>✔ Instant Results</span>
            <span>✔ Bank Formula Accurate</span>
          </div>
        </header>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* ================= INPUTS ================= */}
          <div className="space-y-5">
            <AmountInput
              label="Loan Amount"
              value={loanAmount}
              onChange={setLoanAmount}
              placeholder="10,00,000"
            />

            {/* QUICK PRESETS */}
            <div className="flex gap-2 flex-wrap">
              {presets.map((v) => (
                <button
                  key={v}
                  onClick={() => setLoanAmount(v)}
                  className="
        px-3 py-1 text-xs rounded-md font-medium transition
        bg-[var(--surface-2)]
        border border-[var(--border)]
        text-[var(--text-main)]
        hover:bg-[var(--hover-bg)]
        active:bg-[var(--active-bg)]
      "
                >
                  {formatINR(v)}
                </button>
              ))}
            </div>

            <PercentageInput
              label="Interest Rate (per annum)"
              value={interestRate}
              onChange={setInterestRate}
              placeholder="9.5"
            />

            <InputField
              label="Loan Tenure (Years)"
              value={tenureYears}
              onChange={setTenureYears}
              min={1}
              placeholder="10"
            />
          </div>

          {/* ================= RESULTS ================= */}
          {result && percentages && (
            <div className="space-y-6 lg:sticky lg:top-24">
              {/* HERO EMI */}
              <div className="p-6 rounded-xl bg-indigo-600 text-white text-center">
                <p className="text-xs opacity-90">Monthly EMI</p>
                <p className="text-3xl font-bold">{formatINR(result.emi)}</p>
              </div>

              {/* OTHER STATS */}
              <div className="grid grid-cols-2 gap-4">
                <StatCard
                  title="Total Interest"
                  value={result.totalInterest}
                  extra={`${percentages.interest}%`}
                  variant="interest"
                />

                <StatCard
                  title="Total Payment"
                  value={result.totalPayment}
                  extra={`${percentages.principal}%`}
                  variant="payment"
                />
              </div>

              {/* CHART */}
              <div className="h-52 rounded-xl bg-gray-50 dark:bg-zinc-800 p-3">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Principal", value: Number(loanAmount) },
                        { name: "Interest", value: result.totalInterest },
                      ]}
                      dataKey="value"
                      innerRadius={60}
                      outerRadius={90}
                    >
                      <Cell fill="#6366F1" />
                      <Cell fill="#EF4444" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <p className="text-xs text-center text-gray-500">
                Principal {percentages.principal}% • Interest{" "}
                {percentages.interest}%
              </p>
            </div>
          )}
        </div>

        {/* TABLE */}
        {schedule.length > 0 && (
          <div className="mt-10 overflow-x-auto rounded-xl border dark:border-zinc-800">
            <table className="w-full text-sm min-w-[600px]">
              <thead className="bg-gray-100 dark:bg-zinc-800">
                <tr>
                  <Th>Month</Th>
                  <Th>Principal</Th>
                  <Th>Interest</Th>
                  <Th>Balance</Th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((r) => (
                  <tr key={r.month} className="border-t dark:border-zinc-800">
                    <Td>{r.month}</Td>
                    <Td>{formatINR(r.principal)}</Td>
                    <Td className="text-red-500">{formatINR(r.interest)}</Td>
                    <Td>{formatINR(r.balance)}</Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ================= BLOG ================= */}
      {/* ================= SEO BLOG CONTENT ================= */}
      <article className="max-w-6xl mx-auto space-y-10 leading-relaxed text-sm sm:text-base">
        {/* SECTION 1 */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold border-b pb-2 mb-4">
            What is EMI (Equated Monthly Installment)?
          </h2>

          <p className="text-gray-700 dark:text-gray-300">
            EMI is the fixed monthly amount you pay to repay your loan. It
            includes both the principal portion and interest charged by the bank
            or NBFC. Paying EMI regularly reduces your outstanding loan balance
            over time until the loan is fully repaid.
          </p>
        </section>

        {/* SECTION 2 */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold border-b pb-2 mb-4">
            How is EMI Calculated?
          </h2>

          <div className="bg-gray-100 dark:bg-zinc-800 rounded-lg p-4 font-mono text-sm">
            EMI = P × r × (1 + r)^n / ((1 + r)^n − 1)
          </div>

          <ul className="list-disc pl-6 mt-4 space-y-1">
            <li>
              <strong>P</strong> = Loan Amount
            </li>
            <li>
              <strong>r</strong> = Monthly Interest Rate
            </li>
            <li>
              <strong>n</strong> = Total number of months
            </li>
          </ul>
        </section>

        {/* SECTION 3 */}
        <section>
          <h3 className="text-xl font-semibold mb-3">Example Calculation</h3>

          <p className="text-gray-700 dark:text-gray-300">
            Suppose you take an education loan of ₹10,00,000 at 9.5% interest
            for 10 years. You will pay EMI every month for 120 months. This
            calculator instantly shows your monthly EMI, total interest payable,
            and the full repayment schedule.
          </p>
        </section>

        {/* SECTION 4 */}
        <section>
          <h3 className="text-xl font-semibold mb-3">
            Advantages of Using This EMI Calculator
          </h3>

          <ul className="list-disc pl-6 space-y-1">
            <li>Instant EMI calculation while typing</li>
            <li>Principal vs interest breakdown</li>
            <li>Amortization schedule for every month</li>
            <li>Helps compare loan offers</li>
            <li>Completely free to use</li>
          </ul>
        </section>

        {/* SECTION 5 */}
        <section>
          <h3 className="text-xl font-semibold mb-3">
            Limitations You Should Know
          </h3>

          <ul className="list-disc pl-6 space-y-1">
            <li>Processing fees are not included</li>
            <li>Floating rates may change EMI</li>
            <li>Prepayment penalties may apply</li>
            <li>Taxes or charges vary by lender</li>
          </ul>
        </section>

        {/* SECTION 6 */}
        <section>
          <h3 className="text-xl font-semibold mb-3">
            Frequently Asked Questions (FAQs)
          </h3>

          <div className="space-y-4">
            <div>
              <h4 className="font-semibold">Is EMI fixed every month?</h4>
              <p className="text-gray-700 dark:text-gray-300">
                Yes for fixed-rate loans. Floating-rate loans may vary.
              </p>
            </div>

            <div>
              <h4 className="font-semibold">Can I reduce my EMI?</h4>
              <p className="text-gray-700 dark:text-gray-300">
                Increase tenure or negotiate lower interest rate to reduce EMI.
              </p>
            </div>

            <div>
              <h4 className="font-semibold">
                Does prepayment reduce total interest?
              </h4>
              <p className="text-gray-700 dark:text-gray-300">
                Yes. Paying extra principal early reduces interest burden
                significantly.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 7 */}
        {/* <section>
          <h3 className="text-xl font-semibold mb-3">Related Calculators</h3>

          <div className="flex flex-wrap gap-4 text-indigo-600 font-medium">
            <a href="/finance/home-loan-emi">Home Loan EMI Calculator</a>
            <a href="/finance/personal-loan-emi">
              Personal Loan EMI Calculator
            </a>
            <a href="/finance/car-loan-emi">Car Loan EMI Calculator</a>
            <a href="/finance/sip-calculator">SIP Calculator</a>
          </div>
        </section> */}
      </article>
    </section>
  );
}

/* ================= SMALL UI HELPERS ================= */

// function StatCard({ title, value, extra, variant }) {
//   const styles = {
//     interest: "bg-red-500",
//     payment: "bg-emerald-600",
//   };

//   return (
//     <div className={`p-4 rounded-xl text-white ${styles[variant]}`}>
//       <p className="text-xs">{title}</p>
//       <p className="font-bold">{formatINR(value)}</p>
//       <p className="text-xs opacity-80">{extra} of total</p>
//     </div>
//   );
// }

function StatCard({ title, value, extra, variant }) {
  const styles = {
    interest: {
      bg: "var(--result-danger-bg)",
      border: "var(--result-danger-border)",
    },
    payment: {
      bg: "var(--result-success-bg)",
      border: "var(--result-success-border)",
    },
  };

  const s = styles[variant];

  return (
    <div
      className="p-4 rounded-xl border"
      style={{
        backgroundColor: s.bg,
        borderColor: s.border,
      }}
    >
      <p className="text-xs opacity-70">{title}</p>
      <p className="font-bold text-lg">{formatINR(value)}</p>
      <p className="text-xs opacity-60">{extra} of total</p>
    </div>
  );
}


function Th({ children }) {
  return <th className="p-3 text-left font-semibold">{children}</th>;
}

function Td({ children, className }) {
  return <td className={`p-3 ${className || ""}`}>{children}</td>;
}



// "use client";

// import { useMemo, useState } from "react";
// import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";





// import { calculateEmi } from "@/lib/emiMath";
// import { formatINR } from "@/lib/format";

// // import { AmountInput, PercentageInput, InputField } from "@/components/inputs";
// import EmiArticle from "../articles/EmiArticle";
// import CalculatorLayout from "../CalculatorLayout";
// import ResultPanel from "../ResultsPanel";
// import ScheduleTable from "../results/ScheduleTable";
// import { AmountInput } from "../../inputs/AmountInput";
// import { PercentageInput } from "../../inputs/PercentageInput";
// import { InputField } from "../../inputs/InputField";

// export default function EmiCalculator() {
//   const [loanAmount, setLoanAmount] = useState("");
//   const [interestRate, setInterestRate] = useState("");
//   const [tenureYears, setTenureYears] = useState("");

//   const result = useMemo(() => {
//     if (!loanAmount || !interestRate || !tenureYears) return null;
//     return calculateEmi(+loanAmount, +interestRate, +tenureYears);
//   }, [loanAmount, interestRate, tenureYears]);

//   const schedule = useMemo(() => {
//     if (!result) return [];
//     let balance = +loanAmount;
//     return Array.from({ length: result.n }, (_, i) => {
//       const interest = balance * result.r;
//       const principal = result.emi - interest;
//       balance -= principal;
//       return { month: i + 1, principal, interest, balance };
//     });
//   }, [result]);

//   return (
//     <CalculatorLayout
//       title="EMI Calculator"
//       badges={["Free", "Instant Results", "Bank Formula Accurate"]}

//       inputs={
//         <div className="space-y-5">
//           <AmountInput label="Loan Amount" value={loanAmount} onChange={setLoanAmount} />
//           <PercentageInput label="Interest Rate" value={interestRate} onChange={setInterestRate} />
//           <InputField label="Tenure (Years)" value={tenureYears} onChange={setTenureYears} />
//         </div>
//       }

//       results={
//         result && (
//           <ResultPanel>
//             <div className="p-6 rounded-xl bg-indigo-600 text-white text-center">
//               <p className="text-xs">Monthly EMI</p>
//               <p className="text-3xl font-bold">{formatINR(result.emi)}</p>
//             </div>

//             <div className="h-52 border rounded-xl p-3"
//               style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}>
//               <ResponsiveContainer>
//                 <PieChart>
//                   <Pie
//                     data={[
//                       { name: "Principal", value: +loanAmount },
//                       { name: "Interest", value: result.totalInterest },
//                     ]}
//                     dataKey="value"
//                   >
//                     <Cell fill="#6366F1" />
//                     <Cell fill="#EF4444" />
//                   </Pie>
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>
//           </ResultPanel>
//         )
//       }

//       table={
//         <ScheduleTable
//           rows={schedule}
//           renderRow={(rows) => (
//             <>
//               <thead style={{ backgroundColor: "var(--surface)" }}>
//                 <tr>
//                   <th className="p-3 text-left">Month</th>
//                   <th className="p-3 text-left">Principal</th>
//                   <th className="p-3 text-left">Interest</th>
//                   <th className="p-3 text-left">Balance</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {rows.map((r) => (
//                   <tr key={r.month} style={{ borderTop: "1px solid var(--border)" }}>
//                     <td className="p-3">{r.month}</td>
//                     <td className="p-3">{formatINR(r.principal)}</td>
//                     <td className="p-3 text-red-500">{formatINR(r.interest)}</td>
//                     <td className="p-3">{formatINR(r.balance)}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </>
//           )}
//         />
//       }

//       article={<EmiArticle />}
//     />
//   );
// }
