import { notFound } from "next/navigation";
import Script from "next/script";

import EDUCATION_CALCULATOR_MAP from "../../../data/education";
import calculators from "@/data/calculators";
import { buildCalculatorMetadata } from "@/lib/seo";
import { FULL_BASE_URL } from "@/lib/constant";

/* =================================================
   STATIC PARAMS (SSG for all calculators)
   → huge SEO + performance boost
================================================= */
export async function generateStaticParams() {
  return calculators.education.map((c) => ({
    calculator: c.slug,
  }));
}

/* =================================================
   DYNAMIC META TAGS (CRITICAL FOR SEO)
================================================= */
export async function generateMetadata({ params }) {
  const { calculator } = await params;

  const calc = calculators.education.find((c) => c.slug === calculator);

  if (!calc) return {};

  return buildCalculatorMetadata(calc, "education");
}

/* =================================================
   PAGE
================================================= */
export default async function CalculatorPage({ params }) {
  const { calculator } = await params;

  const CalculatorComponent = EDUCATION_CALCULATOR_MAP[calculator];

  if (!CalculatorComponent) notFound();

  /* -------- JSON-LD structured data -------- */

  const title = calculator.replace(/-/g, " ");

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `${title} Calculator`,
    applicationCategory: "EducationalApplication",
    operatingSystem: "Any",
    url: `${FULL_BASE_URL}/education/${calculator}`,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: FULL_BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Education Calculators",
        item: `${FULL_BASE_URL}/education`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${title} Calculator`,
        item: `${FULL_BASE_URL}/education/${calculator}`,
      },
    ],
  };

  const schemas = [appSchema, breadcrumbSchema];

  return (
    <>
      <Script
        id={`${calculator}-schema`}
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas),
        }}
      />

      <CalculatorComponent />
    </>
  );
}
