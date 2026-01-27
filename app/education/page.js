import Link from "next/link";
import calculators from "@/data/calculators";

export const metadata = {
  title: "Education Calculators | EasyCalc",
  description:
    "Percentage, CGPA, SGPA, rank predictor, exam, and education calculators.",
};

export default function EducationPage() {
  return (
    <section>
      <h1 className="text-2xl font-bold mb-2">Education Calculators</h1>

      <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
        Calculate percentages, grades, ranks, and academic scores easily.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {calculators.education.map(calc => (
          <Link
            key={calc.slug}
            href={`/education/${calc.slug}`}
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
