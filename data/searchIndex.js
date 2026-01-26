import calculators from "./calculators";
import categories from "./categories";

/**
 * Flatten calculators into searchable list
 */
export const searchIndex = Object.keys(calculators).flatMap(category => {
  const categoryMeta = categories.find(c => c.slug === category);

  return calculators[category].map(calc => ({
    label: calc.name,
    slug: `/${category}/${calc.slug}`,
    category: categoryMeta?.name || category
  }));
});
