"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import calculators from "@/data/calculators";

export default function RelatedCalculators() {
  const pathname = usePathname();

  // pathname example: /finance/emi-calculator
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length !== 2) return null;

  const category = parts[0];
  const currentSlug = parts[1];

  const categoryItems = calculators[category];
  if (!categoryItems) return null;

  const currentCalc = categoryItems.find(c => c.slug === currentSlug);
  if (!currentCalc) return null;

  const related = categoryItems
    .filter(
      c =>
        c.slug !== currentSlug && // exclude selected
        c.ui !== currentCalc.ui   // exclude similar UI calculators
    )
    .slice(0, 10);

  if (!related.length) return null;

  return (
    <div
      className="rounded-lg p-4"
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)",
      }}
    >
      {/* TITLE */}
      <h3
        className="text-sm font-semibold mb-3"
        style={{ color: "var(--text-main)" }}
      >
        Related Calculators
      </h3>

      {/* LIST */}
      <ul className="space-y-1">
        {related.map(calc => (
          <li key={calc.slug}>
            <Link
              href={`/${category}/${calc.slug}`}
              className="block rounded px-2 py-1.5 text-sm transition-colors"
              style={{ color: "var(--text-main)" }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = "var(--hover-bg)";
                e.currentTarget.style.color = "var(--primary)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "var(--text-main)";
              }}
            >
              {calc.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
