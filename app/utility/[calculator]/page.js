import Script from "next/script";
import { notFound } from "next/navigation";

import UTILITY_CALCULATOR_MAP from "../../../data/utility";
import calculators from "@/data/calculators";
import { buildCalculatorMetadata } from "@/lib/seo";
import { FULL_BASE_URL } from "@/lib/constant";
/* ===============================================
   STATIC PARAMS (MANDATORY FOR output: "export")
   
=============================================== */
export function generateStaticParams() {
  return calculators.utility.map((c) => ({
    calculator: c.slug,
  }));
}

/* ===============================================
   FORCE STATIC
=============================================== */
export const dynamic = "force-static";

/* ===============================================
   SEO METADATA
=============================================== */
export async function generateMetadata({ params }) {
  const { calculator } = await params;

  const calc = calculators.utility.find((c) => c.slug === calculator);

  if (!calc) return {};

  return buildCalculatorMetadata(calc, "utility");
}

/* ===============================================
   PAGE
=============================================== */
export default async function CalculatorPage({ params }) {
  const { calculator } = await params;

  const CalculatorComponent = UTILITY_CALCULATOR_MAP[calculator];

  if (!CalculatorComponent) {
    notFound();
  }

  const title = calculator.replaceAll("-", " ");

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `${title} Calculator`,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Web",
    url: `${FULL_BASE_URL}/utility/${calculator}`,
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
        name: "Utility Calculators",
        item: `${FULL_BASE_URL}/utility`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${title} Calculator`,
        item: `${FULL_BASE_URL}/utility/${calculator}`,
      },
    ],
  };

  const schemas = [appSchema, breadcrumbSchema];

  return (
    <>
      <Script
        id="utility-calculator-schema"
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
