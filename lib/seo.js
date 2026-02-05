import { BRAND_NAME, FULL_BASE_URL } from "./constant";


const BASE_URL = FULL_BASE_URL

/* auto description builder */
function buildDescription(name, category) {
  return `Use our free ${name} to calculate results instantly. Fast, accurate and easy online ${category} calculator on ${BRAND_NAME}.`;
}

/* auto keywords */
function buildKeywords(name, category) {
  return [
    name,
    `${name} online`,
    `${name} calculator`,
    `${category} calculator`,
    "free calculator",
    `QuickCalcfy tools`,
  ];
}

export function buildCalculatorMetadata(calc, category) {
  const title = `${calc.name} | Free Online Calculator | ${BRAND_NAME}`;

  const description = buildDescription(calc.name, category);

  const url = `${BASE_URL}/${category}/${calc.slug}`;

  return {
    title,
    description,
    keywords: buildKeywords(calc.name, category),

    alternates: {
      canonical: url,
    },

    openGraph: {
      title,
      description,
      url,
      type: "website",
      siteName: `${BRAND_NAME}`,
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}
