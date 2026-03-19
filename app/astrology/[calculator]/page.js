import Script from "next/script";

import ASTROLOGY_CALCULATOR_MAP from "../../../data/astrology";
import calculators from "@/data/calculators";
import { buildCalculatorMetadata } from "@/lib/seo";
import CalculatorPager from "../../../components/CalculatorPager";
import { FULL_BASE_URL } from "../../../lib/constant";

/* =====================================
   STATIC PARAMS (REQUIRED FOR EXPORT)
===================================== */
export function generateStaticParams() {
  return calculators.astrology.map((c) => ({
    calculator: c.slug,
  }));
}

/* =====================================
   META
===================================== */
export async function generateMetadata({ params }) {
  const { calculator } = await params;

  const calc = calculators.astrology.find((c) => c.slug === calculator);

  if (!calc) return {};

  return buildCalculatorMetadata(calc, "astrology");
}

/* =====================================
   PAGE
===================================== */
export default async function CalculatorPage({ params }) {
  const { calculator } = await params;

  const CalculatorComponent = ASTROLOGY_CALCULATOR_MAP[calculator];

  if (!CalculatorComponent) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-xl font-semibold">Calculator coming soon</h1>
      </div>
    );
  }
  const title = calculator.replace(/-/g, " ");
  const appSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `${title} Calculator`,
    applicationCategory: "LifestyleApplication",
    operatingSystem: "All",
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
        item:FULL_BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Astrology Calculators",
        item: `${FULL_BASE_URL}/astrology`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${title} Calculator`,
        item: `${FULL_BASE_URL}/astrology/${calculator}`,
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
        list={calculators.astrology}
        currentSlug={calculator}
        basePath="/astrology"
      />
    </>
  );
}
