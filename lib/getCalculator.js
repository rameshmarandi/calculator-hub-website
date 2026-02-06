import calculators from "@/config/calculators";

export function getCalculator(category, slug) {
  const list = calculators[category];
  if (!list) return null;

  return list.find(c => c.slug === slug) || null;
}
