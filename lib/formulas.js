/* =========================================
NUMBER FORMATTER
max 2 decimal otherwise rounded
========================================= */

/* =========================================
GLOBAL SAFETY UTILITIES
========================================= */

export const safeNumber = (v) => {
  const n = Number(String(v).replace(/[^\d.-]/g, ""));
  return Number.isFinite(n) ? n : 0;
};

export const safeRound = (v) => {
  if (!Number.isFinite(v)) return 0;
  return Math.round(v);
};

export const format = (num) => {
  if (!Number.isFinite(num)) return 0;

  const rounded = Math.round(num * 100) / 100;

  return Number.isInteger(rounded)
    ? Math.round(rounded)
    : rounded;
};


// Astrology formulas START---------
export function calculateKundli({ name, date, time, place }) {
  const zodiacSigns = [
    "Aries","Taurus","Gemini","Cancer",
    "Leo","Virgo","Libra","Scorpio",
    "Sagittarius","Capricorn","Aquarius","Pisces"
  ];

  const nakshatras = [
    "Ashwini","Bharani","Krittika","Rohini","Mrigashirsha",
    "Ardra","Punarvasu","Pushya","Ashlesha","Magha",
    "Purva Phalguni","Uttara Phalguni","Hasta","Chitra",
    "Swati","Vishakha","Anuradha","Jyeshtha","Mula",
    "Purva Ashadha","Uttara Ashadha","Shravana","Dhanishta",
    "Shatabhisha","Purva Bhadrapada","Uttara Bhadrapada","Revati"
  ];

  const safeDate = date ? new Date(date) : new Date();

  const birthDay = safeDate.getDate() || 1;

  const rashi = zodiacSigns[birthDay % 12];
  const nakshatra = nakshatras[birthDay % 27];

  return {
    name: name || "User",
    rashi,
    nakshatra
  };
}


// Astrology formulas END---------

// Education formulas START---------
export function gpaCalculator({ grades }) {

  if (!Array.isArray(grades) || grades.length === 0) {
    return { gpa: 0, subjects: 0 };
  }

  const total = grades.reduce((sum, g) => sum + g, 0);
  const gpa = total / grades.length;

  return {
    subjects: grades.length,
    gpa: Number(gpa.toFixed(2))
  };

}
export function passingMarksCalculator({
  totalMarks,
  passingPercentage
}) {

  const total = Number(totalMarks) || 0;
  const percent = Number(passingPercentage) || 0;

  const passingMarks = (total * percent) / 100;

  return {
    totalMarks: total,
    passingPercentage: percent,
    passingMarks: Math.ceil(passingMarks)
  };

}

export function examMarksCalculator({
  totalQuestions,
  marksPerQuestion,
  correctAnswers,
  negativeMarks
}) {

  const totalQ = Number(totalQuestions) || 0;
  const marksQ = Number(marksPerQuestion) || 0;
  const correct = Number(correctAnswers) || 0;
  const negative = Number(negativeMarks) || 0;

  const wrongAnswers = Math.max(totalQ - correct, 0);

  const score =
    correct * marksQ - wrongAnswers * negative;

  return {
    totalQuestions: totalQ,
    correctAnswers: correct,
    wrongAnswers,
    score: Number(score.toFixed(2))
  };

}
export function studyTimePlannerCalculator({
  totalSyllabusHours,
  daysAvailable,
  dailyFreeHours
}) {

  const syllabus = Number(totalSyllabusHours) || 0;
  const days = Number(daysAvailable) || 0;
  const freeHours = Number(dailyFreeHours) || 0;

  if (days <= 0) {
    return { dailyHours: 0, feasible: false };
  }

  const requiredDailyHours = syllabus / days;
  const feasible = requiredDailyHours <= freeHours;

  return {
    totalSyllabusHours: syllabus,
    daysAvailable: days,
    dailyFreeHours: freeHours,
    dailyHours: Number(requiredDailyHours.toFixed(2)),
    feasible
  };

}
export function scholarshipEligibilityCalculator({
  percentage,
  familyIncome
}) {

  const safePercentage = Number(percentage) || 0;
  const safeIncome = Number(familyIncome) || 0;

  const eligible =
    safePercentage >= 60 && safeIncome <= 800000;

  return {
    percentage: safePercentage,
    familyIncome: safeIncome,
    eligible
  };

}

export function catPercentileCalculator({ rank, totalCandidates }) {

  const safeRank = Number(rank) || 0;
  const safeTotal = Number(totalCandidates) || 0;

  if (safeTotal <= 0) {
    return { percentile: 0 };
  }

  const percentile = ((safeTotal - safeRank) / safeTotal) * 100;

  return {
    rank: safeRank,
    totalCandidates: safeTotal,
    percentile: Number(percentile.toFixed(2))
  };

}

export function neetRankPredictorCalculator({ percentage, totalCandidates }) {

  const safePercentage = Number(percentage) || 0;
  const safeTotal = Number(totalCandidates) || 0;

  const predictedRank =
    Math.max(1, Math.round(((100 - safePercentage) * safeTotal) / 100));

  return {
    percentage: safePercentage,
    totalCandidates: safeTotal,
    rank: predictedRank
  };

}

export function jeePercentileCalculator({
  yourMarks,
  maxMarks,
  totalCandidates,
  candidatesBelow
}) {

  const safeTotal = Number(totalCandidates) || 0;
  const safeBelow = Number(candidatesBelow) || 0;

  if (safeTotal <= 0) {
    return { percentile: 0 };
  }

  const percentile = (safeBelow / safeTotal) * 100;

  return {
    yourMarks,
    maxMarks,
    totalCandidates: safeTotal,
    candidatesBelow: safeBelow,
    percentile: Number(percentile.toFixed(4))
  };

}

export function rankPredictorCalculator({ percentage, totalCandidates }) {

  const safePercentage = Number(percentage) || 0;
  const safeTotal = Number(totalCandidates) || 0;

  const predictedRank =
    Math.max(1, Math.round(((100 - safePercentage) * safeTotal) / 100));

  return {
    percentage: safePercentage,
    totalCandidates: safeTotal,
    rank: predictedRank
  };

}

export function cutoffCalculator({ maths, physics, chemistry }) {

  const safeMaths = Number(maths) || 0;
  const safePhysics = Number(physics) || 0;
  const safeChemistry = Number(chemistry) || 0;

  const cutOff =
    safeMaths + safePhysics / 2 + safeChemistry / 2;

  return {
    maths: safeMaths,
    physics: safePhysics,
    chemistry: safeChemistry,
    cutOff: Number(cutOff.toFixed(2))
  };

}

export function marksToPercentageCalculator({ obtainedMarks, totalMarks }) {

  if (totalMarks <= 0) {
    return { percentage: 0 };
  }

  const percentage = (obtainedMarks / totalMarks) * 100;

  return {
    obtainedMarks,
    totalMarks,
    percentage: Number(percentage.toFixed(2))
  };

}


export function gradeCalculator({ marks }) {

  const safeMarks = Number(marks) || 0;

  let grade = "F";
  let remark = "Fail";

  if (safeMarks >= 90) {
    grade = "A+";
    remark = "Outstanding";
  } 
  else if (safeMarks >= 80) {
    grade = "A";
    remark = "Excellent";
  } 
  else if (safeMarks >= 70) {
    grade = "B+";
    remark = "Very Good";
  } 
  else if (safeMarks >= 60) {
    grade = "B";
    remark = "Good";
  } 
  else if (safeMarks >= 50) {
    grade = "C";
    remark = "Average";
  } 
  else if (safeMarks >= 35) {
    grade = "D";
    remark = "Pass";
  }

  return {
    marks: safeMarks,
    grade,
    remark
  };

}
export function sgpaToCgpaCalculator({ sgpaList }) {

  if (!Array.isArray(sgpaList) || sgpaList.length === 0) {
    return { cgpa: 0, semesters: 0 };
  }

  const total = sgpaList.reduce((sum, v) => sum + v, 0);
  const cgpa = total / sgpaList.length;

  return {
    cgpa: Number(cgpa.toFixed(2)),
    semesters: sgpaList.length
  };

}
export function cgpaToPercentageCalculator({ cgpa, scale, conversionFactor }) {

  if (cgpa > scale) {
    return { percentage: 0 };
  }

  const percentage = cgpa * conversionFactor;

  return {
    percentage: Number(percentage.toFixed(2)),
    cgpa,
    scale,
    conversionFactor
  };

}

export function percentageCalculator({ totalNumber, percentage }) {

  const percentageValue = (totalNumber * percentage) / 100;

  return {
    percentageValue: Number(percentageValue.toFixed(2)),
    totalNumber,
    percentage
  };

}
// Education formulas end---------
export function calculateVO2Max({ age, weight, time, heartRate, gender }) {
  const a = Number(age) || 0;
  const w = Number(weight) || 0;
  const t = Number(time) || 0;
  const hr = Number(heartRate) || 0;

  const g = gender === "male" ? 1 : 0;

  if (!a || !w || !t || !hr) {
    return { vo2max: 0 };
  }

  const weightLb = w * 2.20462;

  const vo2Max =
    132.853 -
    0.0769 * weightLb -
    0.3877 * a +
    6.315 * g -
    3.2649 * t -
    0.1565 * hr;

  return {
    vo2max: Number(vo2Max.toFixed(1)) || 0,
  };
}

export function calculateCaloriesBurned({ weight, duration, activity }) {
  const w = Number(weight) || 0;
  const minutes = Number(duration) || 0;

  const MET_VALUES = {
    walking: 3.5,
    jogging: 7.0,
    running: 9.8,
    cycling: 6.8,
    swimming: 8.0,
    yoga: 2.5,
    strength: 6.0,
  };

  const met = MET_VALUES[activity] || 0;

  if (!w || !minutes) {
    return {
      calories: 0,
    };
  }

  const caloriesBurned = (met * w * minutes) / 60;

  return {
    calories: Math.round(caloriesBurned) || 0,
  };
}

export function calculateChildGrowth({ age, height, weight }) {
  const a = Number(age) || 0;
  const h = Number(height) || 0;
  const w = Number(weight) || 0;

  if (!a || !h || !w) {
    return {
      bmi: 0,
      status: "Enter valid values",
      variant: "primary",
    };
  }

  const hMeters = h / 100;
  const bmi = w / (hMeters * hMeters);

  let status = "Normal Growth";
  let variant = "primary";

  if (bmi < 14) {
    status = "Underweight for Age";
    variant = "warning";
  } else if (bmi > 20 && a < 10) {
    status = "Overweight for Age";
    variant = "warning";
  } else if (bmi > 23 && a >= 10) {
    status = "Overweight for Age";
    variant = "warning";
  }

  return {
    bmi: Number(bmi.toFixed(1)) || 0,
    status,
    variant,
  };
}

export function calculateKetoMacros({
  gender,
  age,
  weight,
  height,
  activity,
  goal
}) {
  const a = Number(age) || 0;
  const w = Number(weight) || 0;
  const h = Number(height) || 0;
  const factor = Number(activity) || 1;

  let bmr = 0;

  if (gender === "male") {
    bmr = 88.36 + 13.4 * w + 4.8 * h - 5.7 * a;
  } else {
    bmr = 447.6 + 9.2 * w + 3.1 * h - 4.3 * a;
  }

  let calories = bmr * factor;

  if (goal === "lose") calories -= 500;
  if (goal === "gain") calories += 500;

  calories = Math.round(calories);

  const carbsGrams = 25;
  const carbsCalories = carbsGrams * 4;

  const proteinGrams = Math.round(w * 1.5);
  const proteinCalories = proteinGrams * 4;

  const fatCalories = calories - (carbsCalories + proteinCalories);
  const fatGrams = Math.max(0, Math.round(fatCalories / 9));

  return {
    calories: calories || 0,
    fat: fatGrams || 0,
    protein: proteinGrams || 0,
    carbs: carbsGrams || 0
  };
}
export function calculateDiabetesRisk(age, weight, height, familyHistory, activity) {

  const a = parseFloat(age) || 0;
  const w = parseFloat(weight) || 0;
  const h = (parseFloat(height) || 0) / 100;

  if (a <= 0 || w <= 0 || h <= 0) {
    return {
      bmi: "-",
      riskLevel: "-",
      variant: "neutral"
    };
  }

  const bmi = w / (h * h);

  let score = 0;

  if (a >= 35) score += 2;
  if (a >= 45) score += 2;

  if (bmi >= 25) score += 2;
  if (bmi >= 30) score += 3;

  if (familyHistory === "yes") score += 3;

  if (activity === "moderate") score += 1;
  if (activity === "low") score += 2;

  let riskLevel = "Low Risk";
  let variant = "primary";

  if (score >= 5 && score <= 8) {
    riskLevel = "Moderate Risk";
    variant = "warning";
  }

  if (score > 8) {
    riskLevel = "High Risk";
    variant = "danger";
  }

  return {
    bmi: bmi.toFixed(1),
    riskLevel,
    variant
  };
}
export function calculateBloodPressure(systolic, diastolic) {

  const sys = parseFloat(systolic) || 0;
  const dia = parseFloat(diastolic) || 0;

  let category = "-";
  let variant = "neutral";

  if (sys < 120 && dia < 80) {
    category = "Normal Blood Pressure";
    variant = "primary";
  } 
  else if (sys < 130 && dia < 80) {
    category = "Elevated Blood Pressure";
    variant = "warning";
  } 
  else if (sys < 140 || dia < 90) {
    category = "High Blood Pressure (Stage 1)";
    variant = "warning";
  } 
  else if (sys < 180 || dia < 120) {
    category = "High Blood Pressure (Stage 2)";
    variant = "danger";
  } 
  else {
    category = "Hypertensive Crisis (Seek medical help)";
    variant = "danger";
  }

  return {
    reading: `${sys}/${dia} mmHg`,
    category,
    variant
  };
}

export function calculateHeartRate(age) {

  const a = parseFloat(age) || 0;

  const maxHR = 220 - a;

  const zones = {
    fatBurn: {
      min: Math.round(maxHR * 0.5) || 0,
      max: Math.round(maxHR * 0.6) || 0
    },
    cardio: {
      min: Math.round(maxHR * 0.6) || 0,
      max: Math.round(maxHR * 0.75) || 0
    },
    peak: {
      min: Math.round(maxHR * 0.75) || 0,
      max: Math.round(maxHR * 0.9) || 0
    }
  };

  return {
    maxHR: Math.round(maxHR) || 0,
    zones
  };
}

export function calculateOvulation(lmp, cycleLength) {

  const cycleDays = parseFloat(cycleLength) || 0;

  if (!lmp) {
    return {
      ovulation: "-",
      fertileStart: "-",
      fertileEnd: "-"
    };
  }

  const lmpDate = new Date(lmp);

  const ovulationDate = new Date(lmpDate);
  ovulationDate.setDate(ovulationDate.getDate() + (cycleDays - 14));

  const fertileStart = new Date(ovulationDate);
  fertileStart.setDate(fertileStart.getDate() - 5);

  const fertileEnd = new Date(ovulationDate);
  fertileEnd.setDate(fertileEnd.getDate() + 1);

  return {
    ovulation: ovulationDate.toDateString(),
    fertileStart: fertileStart.toDateString(),
    fertileEnd: fertileEnd.toDateString()
  };
}


export function calculatePregnancyDueDate(lmp) {

  if (!lmp) {
    return {
      dueDate: "-",
      weeks: 0,
      days: 0,
      trimester: "-"
    };
  }

  const lmpDate = new Date(lmp);

  const dueDate = new Date(lmpDate);
  dueDate.setDate(dueDate.getDate() + 280);

  const today = new Date();

  const diffTime = today.getTime() - lmpDate.getTime();
  const diffDays = Math.max(Math.floor(diffTime / (1000 * 60 * 60 * 24)), 0);

  const weeks = Math.floor(diffDays / 7);
  const days = diffDays % 7;

  let trimester = "First Trimester";

  if (weeks >= 13 && weeks < 27) trimester = "Second Trimester";
  if (weeks >= 27) trimester = "Third Trimester";

  const formattedDueDate = dueDate.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  return {
    dueDate: formattedDueDate,
    weeks,
    days,
    trimester
  };
}

export function calculateWeightGain(
  gender,
  age,
  weight,
  height,
  activity,
  pace
) {

  const a = parseFloat(age) || 0;
  const w = parseFloat(weight) || 0;
  const h = parseFloat(height) || 0;
  const factor = parseFloat(activity) || 0;

  let bmr = 0;

  if (gender === "male") {
    bmr = 88.36 + 13.4 * w + 4.8 * h - 5.7 * a;
  } else {
    bmr = 447.6 + 9.2 * w + 3.1 * h - 4.3 * a;
  }

  const tdee = bmr * factor;

  let surplus = 300;

  if (pace === "moderate") surplus = 500;
  if (pace === "fast") surplus = 700;

  const calories = tdee + surplus;

  return {
    bmr: Math.round(bmr) || 0,
    tdee: Math.round(tdee) || 0,
    calories: Math.round(calories) || 0,
    surplus
  };
}

export function calculateWaterIntake(weight, activity) {

  const w = parseFloat(weight) || 0;

  let mlPerKg = 35;

  if (activity === "active") mlPerKg = 40;
  if (activity === "veryActive") mlPerKg = 45;

  const totalMl = w * mlPerKg;

  const liters = totalMl / 1000;
  const glasses = totalMl / 250;

  return {
    liters: Number(liters.toFixed(2)) || 0,
    glasses: Math.round(glasses) || 0
  };
}

export function calculateWeightLoss(
  gender,
  age,
  weight,
  height,
  activity,
  pace
) {

  const a = parseFloat(age) || 0;
  const w = parseFloat(weight) || 0;
  const h = parseFloat(height) || 0;
  const factor = parseFloat(activity) || 0;

  let bmr = 0;

  if (gender === "male") {
    bmr = 88.36 + 13.4 * w + 4.8 * h - 5.7 * a;
  } else {
    bmr = 447.6 + 9.2 * w + 3.1 * h - 4.3 * a;
  }

  const tdee = bmr * factor;

  let deficit = 300;

  if (pace === "moderate") deficit = 500;
  if (pace === "aggressive") deficit = 700;

  const calories = Math.max(tdee - deficit, 1200);

  return {
    bmr: Math.round(bmr) || 0,
    tdee: Math.round(tdee) || 0,
    calories: Math.round(calories) || 0,
    deficit
  };
}

export function calculateProteinIntake(weight, activity, goal) {

  const w = parseFloat(weight) || 0;

  const activityFactor = {
    sedentary: 0.8,
    light: 1.0,
    moderate: 1.2,
    active: 1.5
  };

  const goalAdjustment = {
    maintain: 0,
    lose: 0.2,
    gain: 0.4
  };

  const base = activityFactor[activity] || 0.8;
  const adjust = goalAdjustment[goal] || 0;

  const proteinPerKg = base + adjust;
  const protein = w * proteinPerKg;

  return {
    protein: Math.round(protein) || 0,
    perKg: Number(proteinPerKg.toFixed(1)) || 0
  };
}
export function calculateCalorieIntake(
  gender,
  age,
  weight,
  height,
  activity,
  goal
) {

  const a = parseFloat(age) || 0;
  const w = parseFloat(weight) || 0;
  const h = parseFloat(height) || 0;
  const factor = parseFloat(activity) || 0;

  let bmr = 0;

  if (gender === "male") {
    bmr = 10 * w + 6.25 * h - 5 * a + 5;
  } else {
    bmr = 10 * w + 6.25 * h - 5 * a - 161;
  }

  const tdee = bmr * factor;

  let calories = tdee;

  if (goal === "lose") calories = tdee - 500;
  if (goal === "gain") calories = tdee + 500;

  return {
    bmr: Math.round(bmr) || 0,
    tdee: Math.round(tdee) || 0,
    calories: Math.round(calories) || 0
  };
}

export function calculateBodyFat(gender, height, neck, waist, hip) {

  const h = parseFloat(height) || 0;
  const n = parseFloat(neck) || 0;
  const w = parseFloat(waist) || 0;
  const hp = parseFloat(hip) || 0;

  let bodyFat = 0;

  if (gender === "male") {

    if (w > n && h > 0) {
      bodyFat =
        86.01 * Math.log10(w - n) -
        70.041 * Math.log10(h) +
        36.76;
    }

  } else {

    if (w + hp > n && h > 0) {
      bodyFat =
        163.205 * Math.log10(w + hp - n) -
        97.684 * Math.log10(h) -
        78.387;
    }

  }

  const bf = Number(bodyFat.toFixed(1)) || 0;

  let category = "";

  if (gender === "male") {
    if (bf < 6) category = "Essential Fat";
    else if (bf < 14) category = "Athletic";
    else if (bf < 18) category = "Fitness";
    else if (bf < 25) category = "Average";
    else category = "Obese";
  } else {
    if (bf < 14) category = "Essential Fat";
    else if (bf < 21) category = "Athletic";
    else if (bf < 25) category = "Fitness";
    else if (bf < 32) category = "Average";
    else category = "Obese";
  }

  return {
    bodyFat: bf,
    category
  };
}
export function calculateIdealWeight(gender, height) {

  const hCm = parseFloat(height) || 0;
  const hInches = hCm / 2.54;

  let idealWeight = 0;

  if (gender === "male") {
    idealWeight = 50 + 2.3 * (hInches - 60);
  } else {
    idealWeight = 45.5 + 2.3 * (hInches - 60);
  }

  const ideal = Number(idealWeight.toFixed(1)) || 0;

  return {
    weight: ideal,
    min: Number((ideal - 7).toFixed(1)) || 0,
    max: Number((ideal + 7).toFixed(1)) || 0
  };
}
export function calculateCalories(gender, age, weight, height, activity) {

  const a = parseFloat(age) || 0;
  const w = parseFloat(weight) || 0;
  const h = parseFloat(height) || 0;
  const act = parseFloat(activity) || 0;

  let bmr = 0;

  if (gender === "male") {
    bmr = 10 * w + 6.25 * h - 5 * a + 5;
  } else {
    bmr = 10 * w + 6.25 * h - 5 * a - 161;
  }

  const calories = bmr * act;

  return {
    bmr: Math.round(bmr) || 0,
    calories: Math.round(calories) || 0
  };
}
// Construction Calculators formulas
export function calculateTiles({
  floorLength,
  floorWidth,
  tileLength,
  tileWidth,
  wastage,
}) {
  const MIN_TILE_MM = 100;
  const MAX_WASTAGE = 30;

  if (floorLength <= 0 || floorWidth <= 0) return null;

  tileLength = Math.max(tileLength, MIN_TILE_MM);
  tileWidth = Math.max(tileWidth, MIN_TILE_MM);
  wastage = Math.min(Math.max(wastage, 0), MAX_WASTAGE);

  const floorArea = floorLength * floorWidth;

  const tileArea =
    (tileLength / 1000) *
    (tileWidth / 1000);

  if (tileArea <= 0) return null;

  const tiles = Math.ceil(
    (floorArea / tileArea) *
    (1 + wastage / 100)
  );

  return {
    floorArea,
    tileArea,
    tiles,
  };
}

// compute Salary

export function computeSalary(ctc, basicPercent) {

  const safeCTC = Number(ctc) || 0;
  const safeBasicPercent = Number(basicPercent) || 0;

  if (safeCTC <= 0) {
    return {
      basic: 0,
      pf: 0,
      employerPF: 0,
      tax: 0,
      annualInHand: 0,
      monthlyInHand: 0,
    };
  }

  const basic = (safeCTC * safeBasicPercent) / 100;

  const employeePF = basic * 0.12;
  const employerPF = basic * 0.12;

  const grossSalary = safeCTC - employerPF;

  const standardDeduction = 50000;
  const professionalTax = 2500;

  const taxableIncome =
    grossSalary - employeePF - standardDeduction;

  let tax = 0;

  if (taxableIncome <= 250000) tax = 0;
  else if (taxableIncome <= 500000)
    tax = (taxableIncome - 250000) * 0.05;
  else if (taxableIncome <= 1000000)
    tax = 12500 + (taxableIncome - 500000) * 0.2;
  else
    tax = 112500 + (taxableIncome - 1000000) * 0.3;

  const cess = tax * 0.04;
  const incomeTax = tax + cess;

  const totalDeductions =
    employeePF + incomeTax + professionalTax;

  const annualInHand = Math.max(0, grossSalary - totalDeductions);
  const monthlyInHand = Math.max(0, annualInHand / 12);

  return {
    basic,
    pf: employeePF,
    employerPF,
    tax: incomeTax,
    annualInHand,
    monthlyInHand,
  };
}

// In handle salary formula

export function calculateSalary(ctc, basicPercent) {

  const safeCTC = Number(ctc) || 0;
  const safeBasicPercent = Number(basicPercent) || 0;

  const basic = (safeCTC * safeBasicPercent) / 100;

  const employeePF = basic * 0.12;
  const standardDeduction = 50000;
  const professionalTax = 2500;

  const taxableIncome =
    safeCTC - employeePF - standardDeduction;

  let incomeTax = 0;

  if (taxableIncome <= 250000) incomeTax = 0;
  else if (taxableIncome <= 500000)
    incomeTax = (taxableIncome - 250000) * 0.05;
  else if (taxableIncome <= 1000000)
    incomeTax = 12500 + (taxableIncome - 500000) * 0.2;
  else
    incomeTax = 112500 + (taxableIncome - 1000000) * 0.3;

  const totalDeductions =
    employeePF + incomeTax + professionalTax;

  const annualInHand = safeCTC - totalDeductions;
  const monthlyInHand = annualInHand / 12;

  return {
    basic,
    pf: employeePF,
    tax: incomeTax,
    annualInHand,
    monthlyInHand,
  };
}

// Gratuidty formautl

export function calculateGratuity(salary, years) {
  const completedYears = Math.floor(years);
  const gratuity = (salary * 15 * completedYears) / 26;

  return {
    salary,
    years: completedYears,
    gratuity: Math.round(gratuity),
  };
}


export function calculateElectricalLoad({
  lights = 0,
  fans = 0,
  ac = 0,
  refrigerator = 0,
  otherLoad = 0,
  config
}) {

  const lightLoad = lights * config.LIGHT
  const fanLoad = fans * config.FAN
  const acLoad = ac * config.AC
  const fridgeLoad = refrigerator * config.FRIDGE

  const totalWatts =
    lightLoad +
    fanLoad +
    acLoad +
    fridgeLoad +
    otherLoad

  const totalKW = totalWatts / 1000

  const recommendedBreaker = Math.ceil((totalWatts / 230) * 1.25)

  return {
    totalWatts: totalWatts.toFixed(0),
    totalKW: totalKW.toFixed(2),
    recommendedBreaker
  }
}

export function calculateRainwaterHarvesting(roofArea, rainfallMM, runoffCoeff) {

  if (!roofArea || !rainfallMM || !runoffCoeff) {
    return {
      volumeM3: 0,
      liters: 0
    };
  }

  const rainfallM = rainfallMM / 1000;

  const volumeM3 = roofArea * rainfallM * runoffCoeff;

  const liters = volumeM3 * 1000;

  return {
    volumeM3,
    liters
  };
}

export function calculateWaterTankCapacity(length, width, height) {

  if (!length || !width || !height) {
    return {
      volume: 0,
      liters: 0,
      gallons: 0
    };
  }

  const volumeM3 = length * width * height;

  const liters = volumeM3 * 1000;
  const gallons = liters * 0.264172;

  return {
    volume: volumeM3,
    liters,
    gallons
  };
}
export function calculateCement({
  length,
  width,
  thickness,
  mixRatio,
}) {

  const t = thickness / 1000

  const wetVolume = length * width * t
  const dryVolume = wetVolume * 1.54

  let cementPart = 1
  let sandPart = 4

  if (typeof mixRatio === "string" && mixRatio.includes(":")) {

    const parts = mixRatio.split(":")

    const a = Number(parts[0]?.trim())
    const b = Number(parts[1]?.trim())

    if (!isNaN(a) && !isNaN(b) && a > 0 && b > 0) {
      cementPart = a
      sandPart = b
    }
  }

  const totalParts = cementPart + sandPart

  const cementVolume = (cementPart / totalParts) * dryVolume

  const cementBags = Math.ceil(cementVolume / 0.035)

  return {
    volume: format(wetVolume),
    cementBags: Math.round(cementBags),
  }
}

export function calculateSand({
  length,
  width,
  thickness,
  mixRatio,
}) {

  const t = thickness / 1000

  const wetVolume = length * width * t
  const dryVolume = wetVolume * 1.54

  let cementPart = 1
  let sandPart = 4

  if (typeof mixRatio === "string" && mixRatio.includes(":")) {

    const parts = mixRatio.split(":")

    const a = Number(parts[0]?.trim())
    const b = Number(parts[1]?.trim())

    if (!isNaN(a) && !isNaN(b) && a > 0 && b > 0) {
      cementPart = a
      sandPart = b
    }
  }

  const totalParts = cementPart + sandPart

  const sandVolume = (sandPart / totalParts) * dryVolume
  const brass = sandVolume / 2.83

  return {
    volume: format(sandVolume),
    brass: format(brass),
  }
}

export function calculateHouseConstructionCost(length, width, costPerSqFt) {

  if (!length || !width || !costPerSqFt) {
    return {
      area: 0,
      rate: 0,
      total: 0
    };
  }

  const builtUpAreaSqFt = length * width;
  const totalCost = builtUpAreaSqFt * costPerSqFt;

  return {
    area: builtUpAreaSqFt,
    rate: costPerSqFt,
    total: totalCost
  };
}

export function calculateAggregate({
  length,
  width,
  thickness,
  mixRatio,
}) {

  const t = thickness / 1000

  const wetVolume = length * width * t
  const dryVolume = wetVolume * 1.54

  let cement = 1
  let sand = 1.5
  let aggregate = 3

  if (typeof mixRatio === "string" && mixRatio.includes(":")) {

    const parts = mixRatio.split(":").map((x) => Number(x.trim()))

    if (parts.length === 3 && !parts.some(isNaN)) {
      ;[cement, sand, aggregate] = parts
    }
  }

  const totalParts = cement + sand + aggregate

  const aggregateVolume = (aggregate / totalParts) * dryVolume
  const brass = aggregateVolume / 2.83

  return {
    volume: format(aggregateVolume),
    brass: format(brass),
  }
}


export const toNumber = (v) => {
  if (v === null || v === undefined) return 0
  return Number(String(v).replace(/[^\d.]/g, ""))
}


export function calculateFlooringCost(length, width, materialRate, laborRate) {

  if (!length || !width || !materialRate) {
    return {
      areaSqFt: 0,
      materialCost: 0,
      laborCost: 0,
      totalCost: 0
    };
  }

  const SQM_TO_SQFT = 10.7639;

  const areaSqM = length * width;
  const areaSqFt = areaSqM * SQM_TO_SQFT;

  const materialCost = areaSqFt * materialRate;
  const laborCost = areaSqFt * laborRate;

  const totalCost = materialCost + laborCost;

  return {
    areaSqFt,
    materialCost,
    laborCost,
    totalCost
  };
}


export function calculatePlaster(length, height, thicknessMM, cementPart, sandPart) {

  if (!length || !height || !thicknessMM || !cementPart || !sandPart) {
    return {
      area: 0,
      cementBags: 0,
      sandBrass: 0
    };
  }

  const thicknessM = thicknessMM / 1000;

  const wallArea = length * height;

  const wetVolume = wallArea * thicknessM;

  const dryVolume = wetVolume * 1.33;

  const totalParts = cementPart + sandPart;

  const cementVolume = (cementPart / totalParts) * dryVolume;
  const sandVolume = (sandPart / totalParts) * dryVolume;

  const cementBagVolume = 0.035;

  const cementBags = cementVolume / cementBagVolume;

  const cubicMeterToBrass = 2.83;

  const sandBrass = sandVolume / cubicMeterToBrass;

  return {
    area: wallArea,
    cementBags,
    sandBrass
  };
}


export function calculateStaircase({
  floorHeight,
  riserHeight,
  treadDepth,
}) {
  const height = Number(floorHeight) || 0;
  const riser = Number(riserHeight) || 0;
  const tread = Number(treadDepth) || 0;

  const steps = Math.max(1, Math.round(height / riser));

  const actualRiser = height / steps;

  const totalRun = (steps - 1) * tread;

  return {
    steps,
    riser: actualRiser,
    tread,
    run: totalRun / 1000,
  };
}

export function calculatePaint({
  length,
  width,
  height,
  coats,
  coverage
}) {

  const wallArea = 2 * (length + width) * height

  const totalArea = wallArea * coats

  const paintLiters = (totalArea / coverage) * 1.1

  return {
    wallArea,
    totalArea,
    paint: paintLiters.toFixed(2)
  }
}


export function calculateFoundation({ length, width, depth }) {
  const l = Number(length) || 0;
  const w = Number(width) || 0;
  const d = Number(depth) || 0;

  const concreteVolume = l * w * d;
  const dryVolume = concreteVolume * 1.54;

  const cementPart = 1;
  const sandPart = 3;
  const aggregatePart = 6;

  const totalParts = cementPart + sandPart + aggregatePart;

  const cementVolume = (cementPart / totalParts) * dryVolume;
  const sandVolume = (sandPart / totalParts) * dryVolume;
  const aggregateVolume = (aggregatePart / totalParts) * dryVolume;

  const cementBags = cementVolume / 0.035;
  const sandBrass = sandVolume / 2.83;
  const aggregateBrass = aggregateVolume / 2.83;

  return {
    concrete: concreteVolume,
    cement: Math.ceil(cementBags),
    sand: sandBrass,
    aggregate: aggregateBrass,
  };
}
export function calculateColumnLoad({
  columnHeight,
  columnWidth,
  columnDepth,
  floors,
  floorLoad,
}) {
  const height = Number(columnHeight) || 0;
  const width = Number(columnWidth) / 1000 || 0;
  const depth = Number(columnDepth) / 1000 || 0;
  const totalFloors = Number(floors) || 0;
  const loadPerFloor = Number(floorLoad) || 0;

  const RCC_DENSITY = 25;

  const columnVolume = width * depth * height;
  const selfWeight = columnVolume * RCC_DENSITY;
  const floorLoadTotal = totalFloors * loadPerFloor;
  const totalLoad = selfWeight + floorLoadTotal;

  return {
    selfWeight,
    floorLoad: floorLoadTotal,
    totalLoad,
  };
}

export function calculateBeamLoad({
  beamLength,
  beamWidth,
  beamDepth,
  liveLoad
}) {

  const L = Number(beamLength) || 0
  const B = (Number(beamWidth) || 0) / 1000
  const D = (Number(beamDepth) || 0) / 1000
  const LL = Number(liveLoad) || 0

  const concreteDensity = 25

  const selfWeight = B * D * concreteDensity
  const loadPerMeter = selfWeight + LL
  const totalLoad = loadPerMeter * L

  return {
    selfWeight: selfWeight.toFixed(2),
    loadPerMeter: loadPerMeter.toFixed(2),
    totalLoad: totalLoad.toFixed(2)
  }
}

export function calculateRCCSlab({
  length,
  width,
  thickness,
  steelPercent
}) {

  const l = Number(length) || 0
  const w = Number(width) || 0
  const t = (Number(thickness) || 0) / 1000
  const steelPct = Number(steelPercent) || 0

  const concreteVolume = l * w * t

  const dryVolume = concreteVolume * 1.54

  const totalParts = 5.5

  const cementVolume = (1 / totalParts) * dryVolume
  const sandVolume = (1.5 / totalParts) * dryVolume
  const aggregateVolume = (3 / totalParts) * dryVolume

  const cementBags = cementVolume / 0.035
  const sandBrass = sandVolume / 2.83
  const aggregateBrass = aggregateVolume / 2.83

  const steelWeight = concreteVolume * steelPct * 10

  return {
    concrete: concreteVolume.toFixed(3),
    cement: Math.ceil(cementBags),
    sand: sandBrass.toFixed(2),
    aggregate: aggregateBrass.toFixed(2),
    steel: steelWeight.toFixed(0)
  }
}

export function calculateSteelWeight({
  diameter,
  length,
  quantity
}) {

  const d = Number(diameter) || 0
  const l = Number(length) || 0
  const q = Number(quantity) || 0

  const weightPerBar = ((d * d) / 162) * l
  const totalWeight = weightPerBar * q

  return {
    perBar: weightPerBar.toFixed(2),
    total: totalWeight.toFixed(2)
  }
}
export function calculateBricks({ length, height, brickType }) {

  const wallThickness = 0.23

  let brickLength = 0.19
  let brickWidth = 0.09
  let brickHeight = 0.09

  if (brickType === "modular") {
    brickLength = 0.2
    brickWidth = 0.1
    brickHeight = 0.1
  }

  const mortar = 0.01

  const wallVolume = length * height * wallThickness

  const brickVolume =
    (brickLength + mortar) *
    (brickWidth + mortar) *
    (brickHeight + mortar)

  let bricks = wallVolume / brickVolume

  bricks = bricks * 1.05

  const brickActualVolume =
    brickLength * brickWidth * brickHeight

  const mortarVolume =
    wallVolume - bricks * brickActualVolume

  return {
    area: (length * height).toFixed(2),
    bricks: Math.ceil(bricks),
    mortar: mortarVolume.toFixed(3)
  }
}
export function calculateConcrete({
  length,
  width,
  thickness,
  mixRatio
}) {
  const l = Number(length) || 0
  const w = Number(width) || 0
  const t = (Number(thickness) || 0) / 1000

  const wetVolume = l * w * t
  const dryVolume = wetVolume * 1.54

  const parts = mixRatio.split(":").map(Number)
  const totalParts = parts.reduce((a,b)=>a+b,0)

  const cementVolume = (parts[0] / totalParts) * dryVolume
  const sandVolume = (parts[1] / totalParts) * dryVolume
  const aggregateVolume = (parts[2] / totalParts) * dryVolume

  return {
    concreteVolume: wetVolume.toFixed(3),
    cementBags: Math.ceil(cementVolume / 0.035),
    sandBrass: (sandVolume / 2.83).toFixed(2),
    aggregateBrass: (aggregateVolume / 2.83).toFixed(2)
  }
}

// Finance Calculators

export function calculateEMI(amount, rate, years) {

  const r = rate / 12 / 100
  const n = years * 12

  return Math.round(
    (amount * r * Math.pow(1 + r, n)) /
    (Math.pow(1 + r, n) - 1)
  )
}


export function calculateBMI(weight, height) {

  const h = height / 100

  return format(weight / (h * h))
}


// SIP Calculator

export function calculateSip(monthly, annualRate, years) {

  const r = annualRate / 12 / 100
  const n = years * 12

  const futureValue =
    r === 0
      ? monthly * n
      : monthly * ((Math.pow(1 + r, n) - 1) / r) * (1 + r)

  const invested = monthly * n
  const gains = futureValue - invested

  return {
    invested: format(invested),
    gains: format(gains),
    futureValue: format(futureValue),
    months: n,
  }
}


// Step Up SIP

export function calculateStepUpSip(monthly, annualReturn, stepUpRate, years) {

  const monthlyRate = annualReturn / 12 / 100
  const stepUp = stepUpRate / 100

  let totalInvestment = 0
  let futureValue = 0
  let amount = monthly

  const totalMonths = years * 12

  for (let year = 0; year < years; year++) {

    for (let m = 0; m < 12; m++) {

      const monthIndex = year * 12 + m
      const remainingMonths = totalMonths - monthIndex

      futureValue += amount * Math.pow(1 + monthlyRate, remainingMonths)
      totalInvestment += amount
    }

    amount *= 1 + stepUp
  }

  return {
    invested: Math.round(totalInvestment),
    gains: Math.round(futureValue - totalInvestment),
    futureValue: Math.round(futureValue),
    months: totalMonths,
  }
}


// Lumpsum

export function calculateLumpsum(amount, annualReturn, years) {

  const r = annualReturn / 100

  const futureValue = amount * Math.pow(1 + r, years)
  const gains = futureValue - amount

  return {
    invested: Math.round(amount),
    gains: Math.round(gains),
    futureValue: Math.round(futureValue),
    months: years * 12,
  }
}


export function calculateCompoundInterest(
  principal,
  annualRate,
  years,
  compoundsPerYear,
) {

  const r = annualRate / 100
  const n = compoundsPerYear
  const t = years

  const futureValue = principal * Math.pow(1 + r / n, n * t)
  const gains = futureValue - principal

  return {
    invested: Math.round(principal),
    gains: Math.round(gains),
    futureValue: Math.round(futureValue),
    months: years * 12,
  }
}

// Fixed Deposit Calculator

export function calculateFD(principal, rate, years, frequency) {

  const r = rate / 100
  const n = frequency

  const maturity = principal * Math.pow(1 + r / n, n * years)
  const interest = maturity - principal

  return {
    principal: Math.round(principal),
    interest: Math.round(interest),
    maturity: Math.round(maturity),
    months: years * 12,
  }
}


// Recurring Deposit Calculator

export function calculateRD(monthlyDeposit, rate, years, frequency) {

  const r = rate / 100
  const n = frequency
  const months = years * 12

  const compound = Math.pow(1 + r / n, n * years)

  const maturity =
    monthlyDeposit *
    ((compound - 1) / (Math.pow(1 + r / n, n / 12) - 1))

  const invested = monthlyDeposit * months
  const interest = maturity - invested

  return {
    invested: Math.round(invested),
    interest: Math.round(interest),
    maturity: Math.round(maturity),
    months,
  }
}


// PPF Calculator

export function calculatePPF(yearlyInvestment, rate, years) {

  const r = rate / 100

  const maturity =
    yearlyInvestment *
    (((Math.pow(1 + r, years) - 1) / r) * (1 + r))

  const invested = yearlyInvestment * years
  const interest = maturity - invested

  return {
    invested: Math.round(invested),
    interest: Math.round(interest),
    maturity: Math.round(maturity),
    months: years * 12,
  }
}


// NPS Calculator

export function calculateNps(monthly, annualRate, currentAge, retirementAge) {

  const years = retirementAge - currentAge
  const months = years * 12

  const r = annualRate / 12 / 100

  const invested = monthly * months

  const corpus =
    r === 0
      ? invested
      : monthly * ((Math.pow(1 + r, months) - 1) / r)

  const gains = corpus - invested

  return {
    invested: Math.round(invested),
    gains: Math.round(gains),
    corpus: Math.round(corpus),
    months,
  }
}


// Simple Interest Calculator

export function calculateSimpleInterest(principal, rate, years) {

  const r = rate / 100

  const interest = principal * r * years
  const total = principal + interest

  return {
    invested: format(principal),
    interest: format(interest),
    finalValue: format(total),
    months: years * 12,
  }
}


// CAGR Calculator

export function calculateCagr(initial, final, years) {

  const cagr =
    (Math.pow(final / initial, 1 / years) - 1) * 100

  const growth = final - initial

  return {
    cagr: format(cagr),
    growth: Math.round(growth),
    invested: Math.round(initial),
    final: Math.round(final),
    months: years * 12,
  }
}


/* =============================================
   XIRR ENGINE
============================================= */

const DAY = 1000 * 60 * 60 * 24

function daysBetween(d1, d2) {
  return (d2 - d1) / DAY
}

function npv(rate, flows) {

  const start = flows[0].date

  return flows.reduce((sum, f) => {

    const years = daysBetween(start, f.date) / 365

    return sum + f.amount / Math.pow(1 + rate, years)

  }, 0)
}


export function calculateXirr(flows) {

  if (!flows || flows.length < 2) return null

  flows = [...flows].sort((a, b) => a.date - b.date)

  const span =
    daysBetween(flows[0].date, flows.at(-1).date)

  if (span < 30) return null

  let rate = 0.1

  for (let i = 0; i < 50; i++) {

    const f = npv(rate, flows)

    const derivative =
      (npv(rate + 0.00001, flows) - f) / 0.00001

    if (Math.abs(derivative) < 1e-10) break

    const next = rate - f / derivative

    if (!Number.isFinite(next)) break

    if (Math.abs(next - rate) < 1e-8)
      return format(next * 100)

    rate = next
  }

  let low = -0.9999
  let high = 10

  for (let i = 0; i < 100; i++) {

    const mid = (low + high) / 2

    const val = npv(mid, flows)

    if (Math.abs(val) < 1e-6)
      return format(mid * 100)

    if (val > 0) low = mid
    else high = mid
  }

  return null
}
// SWP calculator

export function calculateSWP(principal, withdrawal, rate, years) {

  let balance = principal
  const monthlyRate = rate / 12 / 100
  const months = years * 12

  let totalWithdrawn = 0
  let monthsLasted = 0

  for (let i = 0; i < months; i++) {

    if (balance <= 0) break

    balance -= withdrawal

    if (balance <= 0) {

      totalWithdrawn += withdrawal
      monthsLasted++
      balance = 0
      break
    }

    balance *= 1 + monthlyRate

    totalWithdrawn += withdrawal
    monthsLasted++
  }

  return {
    invested: format(principal),
    withdrawn: format(totalWithdrawn),
    finalBalance: format(balance),
    monthsLasted,
  }
}


// Loan Eligibility Calculator

export function calculateLoanEligibility({
  income,
  existingEmi,
  annualRate,
  years,
}) {

  const monthlyIncome = safeNumber(income);
  const runningEmi = safeNumber(existingEmi);
  const rate = safeNumber(annualRate);
  const tenure = safeNumber(years);

  if (monthlyIncome <= 0 || rate <= 0 || tenure <= 0) {
    return {
      eligibleAmount: 0,
      emi: 0,
      months: 0,
    };
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

  const pow = Math.pow(1 + monthlyRate, months);

  const eligibleLoan =
    (availableEMI * (pow - 1)) /
    (monthlyRate * pow);

  return {
    eligibleAmount: safeRound(eligibleLoan),
    emi: safeRound(availableEMI),
    months,
  };
}

// Prepayment Calculator

export function calculatePrepayment({
  principal,
  annualRate,
  years,
  prepayment,
}) {

  const P = safeNumber(principal);
  const rate = safeNumber(annualRate);
  const tenure = safeNumber(years);
  const prepay = safeNumber(prepayment);

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
    originalEMI: safeRound(originalEMI),
    newEMI: safeRound(newEMI),
    interestSaved: safeRound(interestSaved),
    months: n,
  };
}


// Buy vs Rent Calculator

export function calculateBuyVsRentAdvanced({
  propertyPrice,
  monthlyRent,
  annualRate,
  years,
  downPercent,
  appreciationPercent,
  maintenancePercent,
}) {

  const price = Number(propertyPrice) || 0
  const rent = Number(monthlyRent) || 0
  const rate = Number(annualRate) || 0
  const tenure = Number(years) || 0
  const down = Number(downPercent) || 0
  const growth = Number(appreciationPercent) || 0
  const maintenance = Number(maintenancePercent) || 0

  if (
    price <= 0 ||
    rent <= 0 ||
    rate <= 0 ||
    tenure <= 0 ||
    down <= 0 ||
    down >= 100
  ) return null

  const months = tenure * 12

  const downPayment = price * (down / 100)
  const loanAmount = price - downPayment

  const r = rate / 12 / 100
  const pow = Math.pow(1 + r, months)

  const emi = (loanAmount * r * pow) / (pow - 1)

  const totalEMI = emi * months
  const totalRent = rent * months

  const futureValue =
    price * Math.pow(1 + growth / 100, tenure)

  const maintenanceCost =
    price * (maintenance / 100) * tenure

  const buyingNetCost =
    totalEMI + maintenanceCost + downPayment - futureValue

  const rentingNetCost = totalRent

  const verdict =
    buyingNetCost < rentingNetCost
      ? "Buying is Better"
      : "Renting is Better"

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
  }
}


// Credit Card EMI


export function calculateCreditCardEMI({
  principal,
  annualRate,
  months,
}) {

  const P = safeNumber(principal);
  const R = safeNumber(annualRate);
  const N = safeNumber(months);

  if (P <= 0 || R <= 0 || N <= 0) {
    return {
      emi: 0,
      totalPayable: 0,
      interestPaid: 0,
    };
  }

  const monthlyRate = R / 12 / 100;

  const emi =
    (P * monthlyRate * Math.pow(1 + monthlyRate, N)) /
    (Math.pow(1 + monthlyRate, N) - 1);

  const totalPayable = emi * N;
  const interestPaid = totalPayable - P;

  return {
    emi: safeRound(emi),
    totalPayable: safeRound(totalPayable),
    interestPaid: safeRound(interestPaid),
  };
}
// GST Calculator

export function calculateGST({ amount, rate, type }) {

  const base = safeNumber(amount);
  const r = safeNumber(rate);

  if (base <= 0 || r <= 0) {
    return {
      gstAmount: 0,
      finalAmount: 0,
    };
  }

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
    gstAmount: safeRound(gstAmount),
    finalAmount: safeRound(finalAmount),
  };
}

// Currency Converter

export const exchangeRates = {
  INR: 1,
  USD: 0.012,
  EUR: 0.011,
  GBP: 0.0095,
  AUD: 0.018,
}

export function convertCurrency({
  amount,
  from,
  to,
}) {

  const value = Number(amount) || 0

  if (value <= 0) return null

  const base = value / exchangeRates[from]
  const converted = base * exchangeRates[to]

  return {
    convertedAmount: format(converted),
  }
}


// Break Even Calculator

export function calculateBreakEven({
  fixedCost,
  sellingPrice,
  variableCost,
}) {

  const fixed = Number(fixedCost)
  const price = Number(sellingPrice)
  const variable = Number(variableCost)

  if (!fixed || !price || variable < 0) return null

  const contribution = price - variable

  if (contribution <= 0) {

    return {
      impossible: true,
      contribution: format(contribution),
    }
  }

  const units = fixed / contribution
  const revenue = units * price

  return {
    units: Math.ceil(units),
    revenue: Math.round(revenue),
    contribution: format(contribution),
    impossible: false,
  }
}


// ROI Calculator

export function calculateROI({
  investment,
  returns,
}) {

  const invest = Number(investment) || 0
  const gain = Number(returns) || 0

  if (invest <= 0) return null

  const profit = gain - invest
  const roi = (profit / invest) * 100

  return {
    profit: Math.round(profit),
    roi: format(roi),
  }
}


// Business Loan

export function calculateBusinessLoan({
  principal,
  annualRate,
  years,
}) {

  const P = Number(principal) || 0
  const rate = Number(annualRate) || 0
  const tenure = Number(years) || 0

  if (P <= 0 || rate <= 0 || tenure <= 0) return null

  const months = tenure * 12
  const r = rate / 12 / 100
  const pow = Math.pow(1 + r, months)

  const emi = (P * r * pow) / (pow - 1)

  const totalPayable = emi * months
  const interestPaid = totalPayable - P

  return {
    emi: Math.round(emi),
    totalPayable: Math.round(totalPayable),
    interestPaid: Math.round(interestPaid),
    months,
  }
}


// Startup Valuation

export function calculateStartupValuation({
  revenue,
  growthRate,
  multiple,
}) {

  const rev = Number(revenue) || 0
  const growth = Number(growthRate) || 0
  const mult = Number(multiple) || 0

  if (rev <= 0 || mult <= 0) return null

  const adjustedRevenue = rev * (1 + growth / 100)
  const valuation = adjustedRevenue * mult

  return {
    adjustedRevenue: Math.round(adjustedRevenue),
    valuation: Math.round(valuation),
  }
}


// Education Loan

// export function calculateEducationLoan({
//   principal,
//   annualRate,
//   years,
// }) {

//   const P = Number(principal) || 0
//   const rate = Number(annualRate) || 0
//   const tenure = Number(years) || 0

//   if (P <= 0 || rate <= 0 || tenure <= 0) return null

//   const r = rate / 12 / 100
//   const n = tenure * 12

//   const pow = Math.pow(1 + r, n)

//   const emi = (P * r * pow) / (pow - 1)

//   const totalPayable = emi * n
//   const interestPaid = totalPayable - P

//   return {
//     emi: Math.round(emi),
//     interestPaid: Math.round(interestPaid),
//     totalPayable: Math.round(totalPayable),
//     months: n,
//   }
// }

export function calculateEducationLoan({
  principal,
  annualRate,
  years,
}) {

  const P = Number(principal) || 0
  const rate = Number(annualRate) || 0
  const tenure = Number(years) || 0

  const n = tenure * 12

  if (P <= 0 || rate <= 0 || tenure <= 0) {
    return {
      emi: 0,
      interestPaid: 0,
      totalPayable: 0,
      months: n || 0,
    }
  }

  const r = rate / 12 / 100

  const pow = Math.pow(1 + r, n)

  const emi = (P * r * pow) / (pow - 1)

  const totalPayable = emi * n
  const interestPaid = totalPayable - P

  return {
    emi: Math.round(emi),
    interestPaid: Math.round(interestPaid),
    totalPayable: Math.round(totalPayable),
    months: n,
  }
}