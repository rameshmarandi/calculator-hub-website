import Script from "next/script";

import CONSTRUCTION_CALCULATOR_MAP from "../../../data/construction";
import calculators from "@/data/calculators";
import { buildCalculatorMetadata } from "@/lib/seo";

/* =====================================
   ✅ SEO META
===================================== */
export async function generateMetadata({ params }) {
  const { calculator } = await params;

  const calc = calculators.construction.find(
    (c) => c.slug === calculator
  );

  if (!calc) return {};

  return buildCalculatorMetadata(calc, "construction");
}

/* =====================================
   ✅ PAGE
===================================== */
export default async function CalculatorPage({ params }) {
  const { calculator } = await params;

  const CalculatorComponent =
    CONSTRUCTION_CALCULATOR_MAP[calculator];

  if (!CalculatorComponent) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-xl font-semibold">
          Calculator coming soon
        </h1>
      </div>
    );
  }

  /* Structured data helps ranking */
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Construction Calculator",
    applicationCategory: "BusinessApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
    },
  };

  return (
    <>
      <Script
        id="calc-schema"
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
