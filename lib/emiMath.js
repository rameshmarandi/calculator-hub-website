// src/lib/emiMath.js

export function calculateEmi(P, annualRate, years) {
  const n = years * 12;
  const r = annualRate / 12 / 100;

  const emi =
    r === 0 ? P / n : (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

  const totalPayment = emi * n;
  const totalInterest = totalPayment - P;

  const round = (num) => Number(num.toFixed(2));

  return {
    emi: round(emi),
    totalPayment: round(totalPayment),
    totalInterest: round(totalInterest),
    n,
    r,
  };
}
