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

// SIP Calculator
export function calculateSip(monthly, annualRate, years) {
  const r = annualRate / 12 / 100;
  const n = years * 12;

  const futureValue =
    r === 0 ? monthly * n : monthly * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);

  const invested = monthly * n;
  const gains = futureValue - invested;

  return {
    invested,
    gains,
    futureValue,
    months: n,
  };
}

// Step Up Sip calculator

export function calculateStepUpSip(monthly, annualReturn, stepUpRate, years) {
  const monthlyRate = annualReturn / 12 / 100;
  const stepUp = stepUpRate / 100;

  let totalInvestment = 0;
  let futureValue = 0;
  let amount = monthly;

  const totalMonths = years * 12;

  for (let year = 0; year < years; year++) {
    for (let m = 0; m < 12; m++) {
      const monthIndex = year * 12 + m;
      const remainingMonths = totalMonths - monthIndex;

      futureValue += amount * Math.pow(1 + monthlyRate, remainingMonths);
      totalInvestment += amount;
    }

    amount *= 1 + stepUp;
  }

  return {
    invested: Math.round(totalInvestment),
    gains: Math.round(futureValue - totalInvestment),
    futureValue: Math.round(futureValue),
    months: totalMonths,
  };
}
