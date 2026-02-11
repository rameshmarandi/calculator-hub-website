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

// Lumsum Calculator

export function calculateLumpsum(amount, annualReturn, years) {
  const r = annualReturn / 100;

  const futureValue = amount * Math.pow(1 + r, years);
  const gains = futureValue - amount;

  return {
    invested: Math.round(amount),
    gains: Math.round(gains),
    futureValue: Math.round(futureValue),
    months: years * 12,
  };
}

export function calculateCompoundInterest(
  principal,
  annualRate,
  years,
  compoundsPerYear,
) {
  const r = annualRate / 100;
  const n = compoundsPerYear;
  const t = years;

  const futureValue = principal * Math.pow(1 + r / n, n * t);
  const gains = futureValue - principal;

  return {
    invested: Math.round(principal),
    gains: Math.round(gains),
    futureValue: Math.round(futureValue),
    months: years * 12,
  };
}

export function calculateFD(principal, rate, years, frequency) {
  const r = rate / 100;
  const n = frequency;

  const maturity = principal * Math.pow(1 + r / n, n * years);
  const interest = maturity - principal;

  return {
    principal: Math.round(principal),
    interest: Math.round(interest),
    maturity: Math.round(maturity),
    months: years * 12,
  };
}

// Recurring Deposit Calculator

export function calculateRD(monthlyDeposit, rate, years, frequency) {
  const r = rate / 100;
  const n = frequency;
  const months = years * 12;

  const compound = Math.pow(1 + r / n, n * years);

  const maturity =
    monthlyDeposit * ((compound - 1) / (Math.pow(1 + r / n, n / 12) - 1));

  const invested = monthlyDeposit * months;
  const interest = maturity - invested;

  return {
    invested: Math.round(invested),
    interest: Math.round(interest),
    maturity: Math.round(maturity),
    months,
  };
}

// PPF Calculator

export function calculatePPF(yearlyInvestment, rate, years) {
  const r = rate / 100;

  // annuity due formula
  const maturity =
    yearlyInvestment * (((Math.pow(1 + r, years) - 1) / r) * (1 + r));

  const invested = yearlyInvestment * years;
  const interest = maturity - invested;

  return {
    invested: Math.round(invested),
    interest: Math.round(interest),
    maturity: Math.round(maturity),
    months: years * 12,
  };
}

// NPS calculator

export function calculateNps(monthly, annualRate, currentAge, retirementAge) {
  const years = retirementAge - currentAge;
  const months = years * 12;

  const r = annualRate / 12 / 100;

  const invested = monthly * months;

  const corpus =
    r === 0 ? invested : monthly * ((Math.pow(1 + r, months) - 1) / r); // ❌ removed (1+r)

  const gains = corpus - invested;

  return {
    invested: Math.round(invested),
    gains: Math.round(gains),
    corpus: Math.round(corpus),
    months,
  };
}

// Simple interest calculator

export function calculateSimpleInterest(principal, rate, years) {
  const r = rate / 100;

  const interest = principal * r * years;
  const total = principal + interest;

  return {
    invested: principal,
    interest,
    finalValue: total,
    months: years * 12,
  };
}



export function calculateCagr(initial, final, years) {
  const cagr = (Math.pow(final / initial, 1 / years) - 1) * 100;
  const growth = final - initial;

  return {
    cagr: Number(cagr.toFixed(2)),
    growth: Math.round(growth),
    invested: initial,
    final,
    months: years * 12,
  };


}


/* =====================================================
   XIRR FORMULA
   Pure math only
===================================================== */


/* ======================================================
   STABLE PRODUCTION XIRR ENGINE
   Newton + Bisection fallback
   Never returns NaN or Infinity
====================================================== */

const DAY = 1000 * 60 * 60 * 24;

function daysBetween(d1, d2) {
  return (d2 - d1) / DAY;
}

function npv(rate, flows) {
  const start = flows[0].date;

  return flows.reduce((sum, f) => {
    const years = daysBetween(start, f.date) / 365;
    return sum + f.amount / Math.pow(1 + rate, years);
  }, 0);
}

export function calculateXirr(flows) {
  if (!flows || flows.length < 2) return null;

  flows = [...flows].sort((a, b) => a.date - b.date);

  const span = daysBetween(flows[0].date, flows.at(-1).date);

  if (span < 30) return null; // meaningless returns

  /* ---------- Newton (fast) ---------- */
  let rate = 0.1;

  for (let i = 0; i < 50; i++) {
    const f = npv(rate, flows);

    const derivative =
      (npv(rate + 0.00001, flows) - f) / 0.00001;

    if (Math.abs(derivative) < 1e-10) break;

    const next = rate - f / derivative;

    if (!Number.isFinite(next)) break;

    if (Math.abs(next - rate) < 1e-8) return next * 100;

    rate = next;
  }

  /* ---------- Bisection fallback (safe) ---------- */
  let low = -0.9999;
  let high = 10;

  for (let i = 0; i < 100; i++) {
    const mid = (low + high) / 2;
    const val = npv(mid, flows);

    if (Math.abs(val) < 1e-6) return mid * 100;

    if (val > 0) low = mid;
    else high = mid;
  }

  return null;
}



// SWP calculator

export function calculateSWP(principal, withdrawal, rate, years) {
  let balance = principal;
  const monthlyRate = rate / 12 / 100;
  const months = years * 12;

  let totalWithdrawn = 0;
  let monthsLasted = 0;

  for (let i = 0; i < months; i++) {
    if (balance <= 0) break;

    balance -= withdrawal;

    if (balance <= 0) {
      totalWithdrawn += withdrawal;
      monthsLasted++;
      balance = 0;
      break;
    }

    balance *= 1 + monthlyRate;

    totalWithdrawn += withdrawal;
    monthsLasted++;
  }

  return {
    invested: principal,
    withdrawn: totalWithdrawn,
    finalBalance: balance,
    monthsLasted,
  };
}

// Loan Eligilibity Calculator

export function calculateLoanEligibility({
  income,
  existingEmi,
  annualRate,
  years,
}) {
  const monthlyIncome = Number(income) || 0;
  const runningEmi = Number(existingEmi) || 0;
  const rate = Number(annualRate) || 0;
  const tenure = Number(years) || 0;

  if (monthlyIncome <= 0 || rate <= 0 || tenure <= 0) {
    return null;
  }

  const monthlyRate = rate / 12 / 100;
  const months = tenure * 12;

  const maxAllowedEMI = monthlyIncome * 0.4;
  const availableEMI = maxAllowedEMI - runningEmi;

  if (availableEMI <= 0) {
    return {
      eligibleAmount: 0,
      emi: 0,
      months,
    };
  }

  // SAFE EMI formula
  const pow = Math.pow(1 + monthlyRate, months);

  const eligibleLoan =
    (availableEMI * (pow - 1)) /
    (monthlyRate * pow);

  // protect against NaN or Infinity
  const safeLoan = Number.isFinite(eligibleLoan)
    ? eligibleLoan
    : 0;

  return {
    eligibleAmount: Math.round(safeLoan),
    emi: Math.round(availableEMI),
    months,
  };
}



export function calculatePrepayment({
  principal,
  annualRate,
  years,
  prepayment,
}) {
  const P = Number(principal) || 0;
  const rate = Number(annualRate) || 0;
  const tenure = Number(years) || 0;
  const prepay = Number(prepayment) || 0;

  if (P <= 0 || rate <= 0 || tenure <= 0 || prepay <= 0 || prepay >= P) {
    return {
      originalEMI: 0,
      newEMI: 0,
      interestSaved: 0,
      months: 0,
    };
  }

  const r = rate / 12 / 100;
  const n = tenure * 12;

  const pow = Math.pow(1 + r, n);

  const calcEmi = (principal) =>
    (principal * r * pow) / (pow - 1);

  const originalEMI = calcEmi(P);
  const newEMI = calcEmi(P - prepay);

  const totalBefore = originalEMI * n;
  const totalAfter = newEMI * n;

  const interestSaved = totalBefore - totalAfter;

  return {
    originalEMI: Math.round(originalEMI),
    newEMI: Math.round(newEMI),
    interestSaved: Math.round(interestSaved),
    months: n,
  };
}


export function calculateBuyVsRentAdvanced({
  propertyPrice,
  monthlyRent,
  annualRate,
  years,
  downPercent,
  appreciationPercent,
  maintenancePercent,
}) {
  const price = Number(propertyPrice) || 0;
  const rent = Number(monthlyRent) || 0;
  const rate = Number(annualRate) || 0;
  const tenure = Number(years) || 0;
  const down = Number(downPercent) || 0;
  const growth = Number(appreciationPercent) || 0;
  const maintenance = Number(maintenancePercent) || 0;

  if (
    price <= 0 ||
    rent <= 0 ||
    rate <= 0 ||
    tenure <= 0 ||
    down <= 0 ||
    down >= 100
  ) return null;

  const months = tenure * 12;

  /* ---------- Loan ---------- */

  const downPayment = price * (down / 100);
  const loanAmount = price - downPayment;

  const r = rate / 12 / 100;
  const pow = Math.pow(1 + r, months);

  const emi = (loanAmount * r * pow) / (pow - 1);
  const totalEMI = emi * months;

  /* ---------- Rent ---------- */

  const totalRent = rent * months;

  /* ---------- Property growth ---------- */

  const futureValue =
    price * Math.pow(1 + growth / 100, tenure);

  /* ---------- Maintenance ---------- */

  const maintenanceCost =
    price * (maintenance / 100) * tenure;

  /* ---------- Net wealth comparison ---------- */

  const buyingNetCost =
    totalEMI + maintenanceCost + downPayment - futureValue;

  const rentingNetCost = totalRent;

  const verdict =
    buyingNetCost < rentingNetCost
      ? "Buying is Better"
      : "Renting is Better";

  return {
    emi: Math.round(emi),
    totalEMI: Math.round(totalEMI),
    totalRent: Math.round(totalRent),
    futureValue: Math.round(futureValue),
    maintenanceCost: Math.round(maintenanceCost),
    wealthDifference: Math.round(
      rentingNetCost - buyingNetCost
    ),
    verdict,
    months,
  };
}

export function calculateCreditCardEMI({
  principal,
  annualRate,
  months,
}) {
  const P = Number(principal) || 0;
  const rate = Number(annualRate) || 0;
  const n = Number(months) || 0;

  if (P <= 0 || rate <= 0 || n <= 0) return null;

  const r = rate / 12 / 100;

  const pow = Math.pow(1 + r, n);

  const emi = (P * r * pow) / (pow - 1);

  const totalPayable = emi * n;
  const interestPaid = totalPayable - P;

  return {
    emi: Math.round(emi),
    totalPayable: Math.round(totalPayable),
    interestPaid: Math.round(interestPaid),
  };
}

export function calculateGST({
  amount,
  rate,
  type,
}) {
  const base = Number(amount) || 0;
  const r = Number(rate) || 0;

  if (base <= 0 || r <= 0) return null;

  let gstAmount = 0;
  let finalAmount = 0;

  if (type === "add") {
    gstAmount = (base * r) / 100;
    finalAmount = base + gstAmount;
  } else {
    gstAmount = (base * r) / (100 + r);
    finalAmount = base - gstAmount;
  }

  return {
    gstAmount: Math.round(gstAmount),
    finalAmount: Math.round(finalAmount),
  };
}


export const exchangeRates = {
  INR: 1,
  USD: 0.012,
  EUR: 0.011,
  GBP: 0.0095,
  AUD: 0.018,
};

export function convertCurrency({
  amount,
  from,
  to,
}) {
  const value = Number(amount) || 0;

  if (value <= 0) return null;

  const base = value / exchangeRates[from];
  const converted = base * exchangeRates[to];

  return {
    convertedAmount: Math.round(converted * 100) / 100,
  };
}

export function calculateBreakEven({
  fixedCost,
  sellingPrice,
  variableCost,
}) {
  const fixed = Number(fixedCost);
  const price = Number(sellingPrice);
  const variable = Number(variableCost);

  if (!fixed || !price || variable < 0) return null;

  const contribution = price - variable;

  /* 🔴 HARD STOP */
  if (contribution <= 0) {
    return {
      impossible: true,
      contribution,
    };
  }

  const units = fixed / contribution;
  const revenue = units * price;

  return {
    units: Math.ceil(units),
    revenue: Math.round(revenue),
    contribution,
    impossible: false,
  };
}


export function calculateROI({
  investment,
  returns,
}) {
  const invest = Number(investment) || 0;
  const gain = Number(returns) || 0;

  if (invest <= 0) return null;

  const profit = gain - invest;
  const roi = (profit / invest) * 100;

  return {
    profit: Math.round(profit),
    roi: Math.round(roi * 100) / 100,
  };
}

export function calculateBusinessLoan({
  principal,
  annualRate,
  years,
}) {
  const P = Number(principal) || 0;
  const rate = Number(annualRate) || 0;
  const tenure = Number(years) || 0;

  if (P <= 0 || rate <= 0 || tenure <= 0) return null;

  const months = tenure * 12;
  const r = rate / 12 / 100;

  const pow = Math.pow(1 + r, months);

  const emi = (P * r * pow) / (pow - 1);

  const totalPayable = emi * months;
  const interestPaid = totalPayable - P;

  return {
    emi: Math.round(emi),
    totalPayable: Math.round(totalPayable),
    interestPaid: Math.round(interestPaid),
    months,
  };
}


export function calculateStartupValuation({
  revenue,
  growthRate,
  multiple,
}) {
  const rev = Number(revenue) || 0;
  const growth = Number(growthRate) || 0;
  const mult = Number(multiple) || 0;

  if (rev <= 0 || mult <= 0) return null;

  const adjustedRevenue = rev * (1 + growth / 100);
  const valuation = adjustedRevenue * mult;

  return {
    adjustedRevenue: Math.round(adjustedRevenue),
    valuation: Math.round(valuation),
  };
}


export function calculateEducationLoan({
  principal,
  annualRate,
  years,
}) {
  const P = Number(principal) || 0;
  const rate = Number(annualRate) || 0;
  const tenure = Number(years) || 0;

  if (P <= 0 || rate <= 0 || tenure <= 0) return null;

  const r = rate / 12 / 100;
  const n = tenure * 12;

  const pow = Math.pow(1 + r, n);

  const emi = (P * r * pow) / (pow - 1);

  const totalPayable = emi * n;
  const interestPaid = totalPayable - P;

  return {
    emi: Math.round(emi),
    interestPaid: Math.round(interestPaid),
    totalPayable: Math.round(totalPayable),
    months: n,
  };
}
