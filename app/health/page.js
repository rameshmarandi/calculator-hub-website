import Link from "next/link";
import Script from "next/script";
import calculators from "@/data/calculators";
import { FULL_BASE_URL, BRAND_NAME } from "@/lib/constant";

/* =================================================
   META (production grade)
================================================= */
export const metadata = {
  title: `Health & Fitness Calculators | BMI, Calories, Weight Loss Tools | ${BRAND_NAME}`,
  description:
    "Free online health calculators including BMI, BMR, calorie intake, weight loss, pregnancy, heart rate and fitness tools. Track your health instantly.",

  alternates: {
    canonical: `${FULL_BASE_URL}/health`,
  },

  openGraph: {
    title: `Health & Fitness Calculators | ${BRAND_NAME}`,
    description:
      "Track BMI, calories, weight and fitness goals with free health calculators.",
    url: `${FULL_BASE_URL}/health`,
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: `Health & Fitness Calculators | ${BRAND_NAME}`,
    description:
      "BMI, calorie and fitness tools for daily wellness tracking.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

/* =================================================
   STATIC (important for SEO)
================================================= */
export const dynamic = "force-static";

/* =================================================
   PAGE
================================================= */
export default function HealthPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Health & Fitness Calculators",
    itemListElement: calculators.health.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      url: `${FULL_BASE_URL}/health/${c.slug}`,
    })),
  };

  return (
    <>
      {/* JSON-LD for Google rich snippets */}
      <Script
        id="health-category-schema"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />

      <section className="space-y-10">
        {/* ================= HEADER ================= */}
        <header>
          <h1 className="text-3xl font-bold mb-2">
            Health & Fitness Calculators
          </h1>

          <p
            className="text-sm max-w-2xl"
            style={{ color: "var(--text-muted)" }}
          >
            Track calories, fitness goals, BMI, weight loss and overall wellness
            using our fast and accurate free health calculators.
          </p>
        </header>

        {/* ================= GRID ================= */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {calculators.health.map((calc) => (
            <Link
              key={calc.slug}
              href={`/health/${calc.slug}`}
              className="
                rounded-lg p-4 transition
                hover:shadow-md
              "
              style={{
                backgroundColor: "var(--surface)",
                border: "1px solid var(--border)",
              }}
            >
              <h2 className="font-medium mb-1">
                {calc.name}
              </h2>

              <span
                className="text-sm"
                style={{ color: "var(--primary)" }}
              >
                Open →
              </span>
            </Link>
          ))}
        </div>

        {/* ================= SEO CONTENT ================= */}
        <article
          className="text-sm leading-relaxed max-w-3xl"
          style={{ color: "var(--text-muted)" }}
        >
          <p>
            These health calculators help you monitor your body metrics, plan
            calorie intake, manage weight and improve overall fitness. Whether
            you want to calculate BMI, track daily calories or estimate heart
            rate zones, these tools provide instant results for better lifestyle
            decisions.
          </p>
        </article>
      </section>
    </>
  );
}
