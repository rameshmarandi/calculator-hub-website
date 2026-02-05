import Script from "next/script";
import { notFound } from "next/navigation";

import UTILITY_CALCULATOR_MAP from "../../../data/utility";
import calculators from "@/data/calculators";
import { buildCalculatorMetadata } from "@/lib/seo";

/* ===============================================
   STATIC BUILD
   Makes pages prerendered → faster + better SEO
=============================================== */
export const dynamic = "force-static";

/* ===============================================
   SEO METADATA (dynamic per slug)
=============================================== */
export async function generateMetadata({ params }) {
  const { calculator } = await params;

  const calc = calculators.utility.find(
    (c) => c.slug === calculator
  );

  if (!calc) return {};

  return buildCalculatorMetadata(calc, "utility");
}

/* ===============================================
   PAGE
=============================================== */
export default async function CalculatorPage({ params }) {
  const { calculator } = await params;

  const CalculatorComponent =
    UTILITY_CALCULATOR_MAP[calculator];

  if (!CalculatorComponent) {
    notFound(); // proper 404 for SEO
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: calculator.replaceAll("-", " "),
    applicationCategory: "UtilityApplication",
    operatingSystem: "Web",
  };

  return (
    <>
      {/* Structured data for Google */}
      <Script
        id="utility-calculator-schema"
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
