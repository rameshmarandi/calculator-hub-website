// Indian number formatting (1,00,000)
export function formatIndianNumber(value) {
  if (!value) return "";
  return Number(value).toLocaleString("en-IN");
}

// Remove commas for calculation
export function unformatNumber(value) {
  return value.replace(/,/g, "");
}
