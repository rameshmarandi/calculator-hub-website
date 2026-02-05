import Link from "next/link";
import Script from "next/script";

import calculators from "@/data/calculators";
import { BRAND_NAME, FULL_BASE_URL } from "@/lib/constant";

/* ======================================
   ✅ SEO META (category level keywords)
====================================== */
export const metadata = {
  title: `Astrology Calculators | Free Online Tools | ${BRAND_NAME}`,
  description:
    "Free astrology calculators including kundli, rashi, numerology, horoscope, nakshatra and birth chart tools. Fast and accurate online predictions.",

  alternates: {
    canonical: `${FULL_BASE_URL}/astrology`,
  },

  openGraph: {
    title: `Astrology Calculators | ${BRAND_NAME}`,
    description:
      "Kundli, rashi, numerology and horoscope calculators online.",
    url: `${FULL_BASE_URL}/astrology`,
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
export default function AstrologyPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Astrology Calculators",
    description:
      "Collection of free astrology and horoscope calculators",
    itemListElement: calculators.astrology.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      url: `${FULL_BASE_URL}/astrology/${c.slug}`,
    })),
  };

  return (
    <>
      {/* ✅ Structured data helps Google understand list */}
      <Script
        id="category-schema"
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
            Astrology Calculators
          </h1>

          <p
            className="text-sm mt-2 max-w-2xl"
            style={{ color: "var(--text-muted)" }}
          >
            Explore free kundli, zodiac, horoscope, rashi and
            numerology calculators. Get instant results with accurate
            astrology tools online.
          </p>
        </header>

        {/* ================= GRID ================= */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {calculators.astrology.map((calc) => (
            <Link
              key={calc.slug}
              href={`/astrology/${calc.slug}`}
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
