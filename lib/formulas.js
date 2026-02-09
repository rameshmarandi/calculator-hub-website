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