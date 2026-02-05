import Link from "next/link";
import Script from "next/script";
import calculators from "@/data/calculators";
import { BRAND_NAME, FULL_BASE_URL } from "../../lib/constant";

/* ======================================
   STATIC BUILD (faster + SEO)
====================================== */
export const dynamic = "force-static";

/* ======================================
   SEO METADATA
====================================== */
export const metadata = {
  title: `General & Utility Calculators | Free Online Tools | ${BRAND_NAME}`,
  description:
    "Free everyday utility calculators like age, date difference, percentage, unit converter, scientific calculator and more. Fast and accurate tools online.",

  keywords: [
    "utility calculator",
    "age calculator",
    "date calculator",
    "percentage calculator",
    "unit converter",
    "online calculator tools",
  ],

  alternates: {
    canonical: `${FULL_BASE_URL}/utility`,
  },

  openGraph: {
    title: `General & Utility Calculators | ${BRAND_NAME}`,
    description:
      "Free everyday utility calculators for quick calculations online.",
    url: `${FULL_BASE_URL}/utility`,
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "General & Utility Calculators",
  },

  robots: {
    index: true,
    follow: true,
  },
};

/* ======================================
   PAGE
====================================== */
export default function UtilityPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "General Utility Calculators",
    itemListElement: calculators.utility.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      url: `${FULL_BASE_URL}/utility/${c.slug}`,
    })),
  };

  return (
    <>
      {/* Google structured data */}
      <Script
        id="utility-category-schema"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />

      <section className="space-y-10">
        <header>
          <h1 className="text-3xl font-bold mb-3">
            General & Utility Calculators
          </h1>

          <p className="text-sm max-w-2xl" style={{ color: "var(--text-muted)" }}>
            Perform everyday calculations instantly with free online tools like
            age calculator, unit converter, percentage calculator, scientific
            calculator, and more.
          </p>
        </header>

        {/* GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {calculators.utility.map((calc) => (
            <Link
              key={calc.slug}
              href={`/utility/${calc.slug}`}
              className="rounded-lg p-4 transition hover:shadow-md"
              style={{
                backgroundColor: "var(--surface)",
                border: "1px solid var(--border)",
              }}
            >
              <h3 className="font-medium mb-1">{calc.name}</h3>

              <span
                className="text-sm font-medium"
                style={{ color: "var(--primary)" }}
              >
                Open →
              </span>
            </Link>
          ))}
        </div>

        {/* SEO TEXT BLOCK */}
        <article className="text-sm leading-relaxed max-w-3xl space-y-3">
          <h2 className="font-semibold">Why use these calculators?</h2>
          <p>
            These tools help you solve daily math and measurement problems
            quickly without installing any apps. All calculators work instantly
            in your browser and provide accurate results for personal, academic,
            and professional use.
          </p>
        </article>
      </section>
    </>
  );
}
