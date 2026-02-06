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

  const calc = calculators.education.find(
    (c) => c.slug === calculator
  );

  if (!calc) return {};

  return buildCalculatorMetadata(calc, "education");
}

/* =================================================
   PAGE
================================================= */
export default async function CalculatorPage({ params }) {
  const { calculator } = await params;

  const CalculatorComponent =
    EDUCATION_CALCULATOR_MAP[calculator];

  if (!CalculatorComponent) notFound();

  /* -------- JSON-LD structured data -------- */
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: calculator.replace(/-/g, " "),
    applicationCategory: "EducationalApplication",
    operatingSystem: "Any",
    url: `${FULL_BASE_URL}/education/${calculator}`,
  };

  return (
    <>
      <Script
        id={`${calculator}-schema`}
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />

      <CalculatorComponent />
    </>
  );
}
