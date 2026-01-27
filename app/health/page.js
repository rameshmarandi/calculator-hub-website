import Link from "next/link";
import calculators from "@/data/calculators";

export const metadata = {
  title: "Health & Fitness Calculators | EasyCalc",
  description:
    "BMI, BMR, calorie, weight, fitness, and health calculators for daily wellness.",
};

export default function HealthPage() {
  return (
    <section>
      <h1 className="text-2xl font-bold mb-2">Health & Fitness Calculators</h1>

      <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
        Track calories, fitness goals, weight, and overall health using free
        health calculators.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {calculators.health.map(calc => (
          <Link
            key={calc.slug}
            href={`/health/${calc.slug}`}
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
