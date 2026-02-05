import Script from "next/script";

import ASTROLOGY_CALCULATOR_MAP from "../../../data/astrology";
import calculators from "@/data/calculators";
import { buildCalculatorMetadata } from "@/lib/seo";

/* =====================================
   ✅ META (SERVER)
===================================== */
export async function generateMetadata({ params }) {
  const { calculator } = await params; // ✅ REQUIRED in Next 16

  const calc = calculators.astrology.find(
    (c) => c.slug === calculator
  );

  if (!calc) return {};

  return buildCalculatorMetadata(calc, "astrology");
}

/* =====================================
   ✅ PAGE (SERVER COMPONENT)
===================================== */
export default async function CalculatorPage({ params }) {
  const { calculator } = await params; // ✅ REQUIRED

  const CalculatorComponent =
    ASTROLOGY_CALCULATOR_MAP[calculator];

  if (!CalculatorComponent) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-xl font-semibold">
          Calculator coming soon
        </h1>
      </div>
    );
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: `${calculator} Calculator`,
    applicationCategory: "LifestyleApplication",
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
