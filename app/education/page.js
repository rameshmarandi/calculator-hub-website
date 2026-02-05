import Link from "next/link";
import Script from "next/script";

import calculators from "@/data/calculators";
import { BRAND_NAME, FULL_BASE_URL } from "@/lib/constant";

/* =================================================
   PRODUCTION SEO METADATA
================================================= */
export const metadata = {
  title: `Education Calculators | Percentage, CGPA, Rank & Exam Tools | ${BRAND_NAME}`,

  description:
    "Free education calculators including percentage, CGPA to percentage, SGPA, grade calculator, rank predictor and exam score tools. Fast and accurate online academic calculators.",

  alternates: {
    canonical: `${FULL_BASE_URL}/education`,
  },

  openGraph: {
    title: `Education Calculators | ${BRAND_NAME}`,
    description:
      "Academic calculators for marks, grades, CGPA, SGPA and ranks.",
    url: `${FULL_BASE_URL}/education`,
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },
};

/* =================================================
   PAGE
================================================= */
export default function EducationPage() {
  /* -------- JSON-LD Schema (critical for ranking) -------- */
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Education Calculators",
    description: "Collection of free academic calculators",
    itemListElement: calculators.education.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      url: `${FULL_BASE_URL}/education/${c.slug}`,
    })),
  };

  return (
    <>
      {/* Structured data for Google */}
      <Script
        id="education-schema"
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
            Education Calculators
          </h1>

          <p
            className="text-sm mt-2 max-w-2xl"
            style={{ color: "var(--text-muted)" }}
          >
            Calculate percentages, CGPA, grades, ranks and academic scores
            instantly using free online tools designed for students and teachers.
          </p>
        </header>

        {/* ================= GRID ================= */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {calculators.education.map((calc) => (
            <Link
              key={calc.slug}
              href={`/education/${calc.slug}`}
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
