import { notFound } from "next/navigation";
import Script from "next/script";

import CALCULATOR_MAP from "../../../data/finance";
import calculators from "@/data/calculators";
import { buildCalculatorMetadata } from "@/lib/seo";
import { FULL_BASE_URL } from "@/lib/constant";

import CalculatorPager from "../../../components/CalculatorPager";

/* =================================================
   1. STATIC GENERATION
   Prebuild all finance calculators
   Faster + better SEO
================================================= */
export async function generateStaticParams() {
  return calculators.finance.map((c) => ({
    calculator: c.slug,
  }));
}

/* =================================================
   2. DYNAMIC META TAGS (CRITICAL)
================================================= */
export async function generateMetadata({ params }) {
  const { calculator } = await params;

  const calc = calculators.finance.find((c) => c.slug === calculator);

  if (!calc) return {};

  return buildCalculatorMetadata(calc, "finance");
}

/* =================================================
   3. PAGE
================================================= */
export default async function CalculatorPage({ params }) {
  const { calculator } = await params;

  const CalculatorComponent = CALCULATOR_MAP[calculator];

  if (!CalculatorComponent) notFound();

  /* ---------- JSON-LD Schema ---------- */
  // const schema = {
  //   "@context": "https://schema.org",
  //   "@type": "WebApplication",
  //   name: calculator.replace(/-/g, " "),
  //   applicationCategory: "FinanceApplication",
  //   operatingSystem: "Any",
  //   url: `${FULL_BASE_URL}/finance/${calculator}`,
  // };

  /* ---------- Schemas ---------- */
  const title = calculator.replace(/-/g, " ");
  const appSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: title,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    url: `${FULL_BASE_URL}/finance/${calculator}`,
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
        name: "Finance Calculators",
        item: `${FULL_BASE_URL}/finance`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: `${FULL_BASE_URL}/finance/${calculator}`,
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
      {/* MOBILE NEXT / PREVIOUS NAVIGATION */}
      <CalculatorPager
        list={calculators.finance}
        currentSlug={calculator}
        basePath="/finance"
      />
    </>
  );
}
