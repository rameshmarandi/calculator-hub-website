import Link from "next/link";
import Script from "next/script";

import calculators from "@/data/calculators";
import { BRAND_NAME, FULL_BASE_URL } from "@/lib/constant";

/* ======================================
   ✅ SEO METADATA (ranking keywords)
====================================== */
export const metadata = {
  title: `Construction Calculators | Cement, Concrete & Cost Tools | ${BRAND_NAME}`,
  description:
    "Free construction calculators for cement, sand, concrete, bricks, steel weight, slab cost and house construction estimates. Fast and accurate tools online.",

  alternates: {
    canonical: `${FULL_BASE_URL}/construction`,
  },

  openGraph: {
    title: `Construction Calculators | ${BRAND_NAME}`,
    description:
      "Concrete, cement, area, cost and material quantity calculators online.",
    url: `${FULL_BASE_URL}/construction`,
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },
};

/* ======================================
   PAGE
====================================== */
export default function ConstructionPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Construction Calculators",
    description:
      "Collection of free construction and building material calculators",
    itemListElement: calculators.construction.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      url: `${FULL_BASE_URL}/construction/${c.slug}`,
    })),
  };

  return (
    <>
      {/* ✅ JSON-LD Schema for SEO */}
      <Script
        id="construction-schema"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />

      <section className="space-y-8">
        {/* ================= HEADER ================= */}
        <header>
          <h1 className="text-3xl font-bold">
            Construction Calculators
          </h1>

          <p
            className="text-sm mt-2 max-w-2xl"
            style={{ color: "var(--text-muted)" }}
          >
            Estimate cement, sand, concrete, bricks, steel weight and total
            construction costs with free online tools. Perfect for builders,
            engineers and homeowners.
          </p>
        </header>

        {/* ================= GRID ================= */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {calculators.construction.map((calc) => (
            <Link
              key={calc.slug}
              href={`/construction/${calc.slug}`}
              className="rounded-xl p-4 transition hover:shadow-md"
              style={{
                backgroundColor: "var(--surface)",
                border: "1px solid var(--border)",
              }}
            >
              <h3 className="font-semibold mb-1">
                {calc.name}
              </h3>

              <span
                className="text-sm font-medium"
                style={{ color: "var(--primary)" }}
              >
                Open →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
