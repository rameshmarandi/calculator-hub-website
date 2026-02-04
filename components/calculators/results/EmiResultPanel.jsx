"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { formatINR } from "@/lib/format";

export default function EmiResultPanel({
  result,
  principal,
}) {
  if (!result) return null;

  const principalAmount = Number(principal);

  const principalPct = (
    (principalAmount / result.totalPayment) * 100
  ).toFixed(1);

  const interestPct = (
    (result.totalInterest / result.totalPayment) * 100
  ).toFixed(1);

  const monthlyInterestApprox = result.totalInterest / result.n;

  return (
    <div className="space-y-6 lg:sticky lg:top-24">

      {/* ================= HERO ================= */}
      <div
        className="rounded-xl p-6 text-center"
        style={{
          background: "var(--primary)",
          color: "white",
        }}
      >
        <p className="text-xs opacity-90">Monthly EMI</p>
        <p className="text-3xl font-bold tracking-tight">
          {formatINR(result.emi)}
        </p>
      </div>

      {/* ================= QUICK STATS GRID ================= */}
      <div className="grid grid-cols-2 gap-4">

        <Stat
          title="Total Interest"
          value={formatINR(result.totalInterest)}
          extra={`${interestPct}%`}
        />

        <Stat
          title="Total Payment"
          value={formatINR(result.totalPayment)}
          extra={`${principalPct}%`}
        />

        <Stat
          title="Tenure (Months)"
          value={result.n}
        />

        <Stat
          title="Avg Monthly Interest"
          value={formatINR(monthlyInterestApprox)}
        />

      </div>

      {/* ================= PIE ================= */}
      <div
        className="h-56 rounded-xl p-3"
        style={{ backgroundColor: "var(--surface-2)" }}
      >
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={[
                { name: "Principal", value: principalAmount },
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

      <p className="text-xs text-center text-[var(--text-muted)]">
        Principal {principalPct}% • Interest {interestPct}%
      </p>
    </div>
  );
}

/* ================= SMALL CARD ================= */

function Stat({ title, value, extra }) {
  return (
    <div
      className="rounded-lg p-4 border text-sm"
      style={{
        backgroundColor: "var(--surface-2)",
        borderColor: "var(--border)",
      }}
    >
      <p className="text-xs text-[var(--text-muted)]">{title}</p>
      <p className="font-semibold">{value}</p>
      {extra && (
        <p className="text-xs text-[var(--text-muted)]">{extra} of total</p>
      )}
    </div>
  );
}
