
import Link from "next/link";
import calculators from "@/data/calculators";

export const metadata = {
  title: "General & Utility Calculators | EasyCalc",
  description:
    "Age, date, percentage, unit, scientific, and utility calculators online.",
};

export default function UtilityPage() {
  return (
    <section>
      <h1 className="text-2xl font-bold mb-2">
        General & Utility Calculators
      </h1>

      <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
        Perform everyday calculations quickly using general utility calculators.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {calculators.utility.map(calc => (
          <Link
            key={calc.slug}
            href={`/utility/${calc.slug}`}
            className="rounded-lg p-4 transition"
            style={{
              backgroundColor: "var(--surface)",
              border: "1px solid var(--border)",
            }}
          >
            <h3 className="font-medium mb-1">{calc.name}</h3>
            <span className="text-sm" style={{ color: "var(--primary)" }}>
              Open →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
