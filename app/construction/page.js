import Link from "next/link";
import calculators from "@/data/calculators";

export const metadata = {
  title: "Construction Calculators | EasyCalc",
  description:
    "Concrete, cement, sand, steel, area, and construction cost calculators.",
};

export default function ConstructionPage() {
  return (
    <section>
      <h1 className="text-2xl font-bold mb-2">Construction Calculators</h1>

      <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
        Estimate materials, costs, and measurements using free construction
        calculators.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {calculators.construction.map(calc => (
          <Link
            key={calc.slug}
            href={`/construction/${calc.slug}`}
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
