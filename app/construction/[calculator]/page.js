import Script from "next/script";

import CONSTRUCTION_CALCULATOR_MAP from "../../../data/construction";
import calculators from "@/data/calculators";
import { buildCalculatorMetadata } from "@/lib/seo";
import CalculatorPager from "../../../components/CalculatorPager";
import { FULL_BASE_URL } from "../../../lib/constant";

/* =====================================
   ✅ SEO META
===================================== */
export async function generateMetadata({ params }) {
  const { calculator } = await params;

  const calc = calculators.construction.find((c) => c.slug === calculator);

  if (!calc) return {};

  return buildCalculatorMetadata(calc, "construction");
}
export async function generateStaticParams() {
  return calculators.construction.map((c) => ({
    calculator: c.slug,
  }));
}

/* =====================================
   ✅ PAGE
===================================== */
export default async function CalculatorPage({ params }) {
  const { calculator } = await params;

  const CalculatorComponent = CONSTRUCTION_CALCULATOR_MAP[calculator];

  if (!CalculatorComponent) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-xl font-semibold">Calculator coming soon</h1>
      </div>
    );
  }

  /* Structured data helps ranking */

  const title = calculator.replace(/-/g, " ");
  const appSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `${title} Calculator`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "All",
    url: `${FULL_BASE_URL}/construction/${calculator}`,
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
        name: "Construction Calculators",
        item: `${FULL_BASE_URL}/construction`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${title} Calculator`,
        item: `${FULL_BASE_URL}/construction/${calculator}`,
      },
    ],
  };

  const schemas = [appSchema, breadcrumbSchema];
  return (
    <>
      <Script
        id="calc-schema"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas),
        }}
      />

      <CalculatorComponent />
      <CalculatorPager
        list={calculators.construction}
        currentSlug={calculator}
        basePath="/construction"
      />
    </>
  );
}
