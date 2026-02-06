import { notFound } from "next/navigation";
import Script from "next/script";

import HEALTH_CALCULATOR_MAP from "../../../data/health";
import calculators from "@/data/calculators";
import { buildCalculatorMetadata } from "@/lib/seo";
import { FULL_BASE_URL } from "@/lib/constant";

/* =================================================
   1. STATIC GENERATION
   Prebuild all health calculators
================================================= */
export async function generateStaticParams() {
  return calculators.health.map((c) => ({
    calculator: c.slug,
  }));
}

/* =================================================
   2. SEO META
================================================= */
export async function generateMetadata({ params }) {
  const { calculator } = await params;

  const calc = calculators.health.find(
    (c) => c.slug === calculator
  );

  if (!calc) return {};

  return buildCalculatorMetadata(calc, "health");
}

/* =================================================
   3. PAGE
================================================= */
export default async function CalculatorPage({ params }) {
  const { calculator } = await params;

  const CalculatorComponent =
    HEALTH_CALCULATOR_MAP[calculator];

  if (!CalculatorComponent) notFound();

  /* ---------- JSON-LD Schema ---------- */
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: calculator.replace(/-/g, " "),
    applicationCategory: "HealthApplication",
    operatingSystem: "Any",
    url: `${FULL_BASE_URL}/health/${calculator}`,
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
