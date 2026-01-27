"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import calculators from "@/data/calculators";

const UI_RELATION_MAP = {
  emi: ["loan", "salary", "tax"],
  loan: ["emi", "planner"],
  investment: ["ratio", "planner"],
  tax: ["salary", "finance"],
  planner: ["investment", "loan"],
  business: ["finance", "loan"],
  health: ["health"],
  education: ["education"],
  astrology: ["astrology"],
  utility: ["utility"],
};

export default function RelatedCalculators() {
  const pathname = usePathname();

  const parts = pathname.split("/").filter(Boolean);
  if (parts.length !== 2) return null;

  const category = parts[0];
  const currentSlug = parts[1];

  const categoryItems = calculators[category];
  if (!categoryItems) return null;

  const currentCalc = categoryItems.find(c => c.slug === currentSlug);
  if (!currentCalc) return null;

  const relatedUi = UI_RELATION_MAP[currentCalc.ui] || [];

  // Tier 1: Same UI (highest intent)
  const tier1 = categoryItems.filter(
    c => c.slug !== currentSlug && c.ui === currentCalc.ui
  );

  // Tier 2: Closely related UI
  const tier2 = categoryItems.filter(
    c =>
      c.slug !== currentSlug &&
      c.ui !== currentCalc.ui &&
      relatedUi.includes(c.ui)
  );

  // Tier 3: Remaining in same category
  const tier3 = categoryItems.filter(
    c =>
      c.slug !== currentSlug &&
      c.ui !== currentCalc.ui &&
      !relatedUi.includes(c.ui)
  );

  const related = [...tier1, ...tier2, ...tier3].slice(0, 10);

  if (!related.length) return null;

  return (
    <div
      className="rounded-lg p-4"
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)",
      }}
    >
      <h3 className="text-sm font-semibold mb-3">
        Related Calculators
      </h3>

      <ul className="space-y-1">
        {related.map(calc => (
          <li key={calc.slug}>
            <Link
              href={`/${category}/${calc.slug}`}
              className="block rounded px-2 py-1.5 text-sm transition-colors"
            >
              {calc.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
