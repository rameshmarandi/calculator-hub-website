import Link from "next/link";
import Script from "next/script";
import calculators from "@/data/calculators";
import { FULL_BASE_URL, BRAND_NAME } from "@/lib/constant";

/* =================================================
   SEO META
================================================= */
export const metadata = {
  title: `Finance Calculators | EMI, SIP, Loan & Investment Tools | ${BRAND_NAME}`,
  description:
    "Free online finance calculators including EMI, SIP, loan, tax, FD, RD, retirement and investment planning tools. Fast, accurate and easy to use.",

  alternates: {
    canonical: `${FULL_BASE_URL}/finance`,
  },

  openGraph: {
    title: `Finance Calculators | ${BRAND_NAME}`,
    description:
      "EMI, SIP, tax, loan and investment calculators to plan your finances smarter.",
    url: `${FULL_BASE_URL}/finance`,
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: `Finance Calculators | ${BRAND_NAME}`,
    description:
      "Plan loans, investments and savings with free finance calculators.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

/* =================================================
   STATIC (important for SEO speed)
================================================= */
export const dynamic = "force-static";

/* =================================================
   PAGE
================================================= */
export default function FinancePage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Finance Calculators",
    itemListElement: calculators.finance.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      url: `${FULL_BASE_URL}/finance/${c.slug}`,
    })),
  };

  return (
    <>
      {/* JSON-LD for Google rich results */}
      <Script
        id="finance-category-schema"
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
            Finance Calculators
          </h1>

          <p
            className="text-sm max-w-2xl"
            style={{ color: "var(--text-muted)" }}
          >
            Use our free finance calculators to plan loans, investments,
            savings, taxes and retirement with accurate instant results.
          </p>
        </header>

        {/* ================= GRID ================= */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {calculators.finance.map((calc) => (
            <Link
              key={calc.slug}
              href={`/finance/${calc.slug}`}
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
            These finance calculators help you estimate EMIs, compare
            investments, calculate returns and plan taxes. Whether you are
            taking a home loan, investing in SIPs or saving for retirement,
            these tools make financial decisions easier and more accurate.
          </p>
        </article>
      </section>
    </>
  );
}
