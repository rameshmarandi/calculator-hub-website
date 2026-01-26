export function calculateEMI(amount, rate, years) {
  const r = rate / 12 / 100;
  const n = years * 12;
  return Math.round(
    (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1),
  );
}

export function calculateBMI(weight, height) {
  const h = height / 100;
  return (weight / (h * h)).toFixed(2);
}
