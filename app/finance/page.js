import Link from "next/link";
import calculators from "@/data/calculators";

export const metadata = {
  title: "Finance Calculators | EasyCalc",
  description:
    "EMI, SIP, investment, loan, tax, and return calculators to plan your finances.",
};

export default function FinancePage() {
  return (
    <section>
      <h1 className="text-2xl font-bold mb-2">
        Finance Calculators
      </h1>

      <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
        Use our free finance calculators to plan loans, investments,
        savings, taxes, and retirement.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {calculators.finance.map(calc => (
          <Link
            key={calc.slug}
            href={`/finance/${calc.slug}`}
            className="rounded-lg p-4 transition"
            style={{
              backgroundColor: "var(--surface)",
              border: "1px solid var(--border)",
            }}
          >
            <h3 className="font-medium mb-1">
              {calc.name}
            </h3>

            <span
              className="text-sm"
              style={{ color: "var(--primary)" }}
            >
              Open →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
