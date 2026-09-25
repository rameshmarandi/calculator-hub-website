const calculators = {
  finance: [
    { slug: "emi-calculator", name: "EMI Calculator", ui: "emi" },
    { slug: "home-loan-emi-calculator", name: "Home Loan EMI Calculator", ui: "emi" },
    { slug: "personal-loan-emi-calculator", name: "Personal Loan EMI Calculator", ui: "emi" },
    { slug: "car-loan-emi-calculator", name: "Car Loan EMI Calculator", ui: "emi" },
    { slug: "education-loan-emi-calculator", name: "Education Loan EMI Calculator", ui: "emi" },

    { slug: "sip-calculator", name: "SIP Calculator", ui: "sip" },
    { slug: "step-up-sip-calculator", name: "Step Up SIP Calculator", ui: "sip" },
    { slug: "lumpsum-investment-calculator", name: "Lumpsum Investment Calculator", ui: "investment" },

    { slug: "compound-interest-calculator", name: "Compound Interest Calculator", ui: "interest" },
    { slug: "simple-interest-calculator", name: "Simple Interest Calculator", ui: "interest" },

    { slug: "fixed-deposit-calculator", name: "Fixed Deposit Calculator", ui: "fd" },
    { slug: "recurring-deposit-calculator", name: "Recurring Deposit Calculator", ui: "rd" },

    { slug: "ppf-calculator", name: "PPF Calculator", ui: "investment" },
    { slug: "nps-calculator", name: "NPS Calculator", ui: "investment" },
    { slug: "mutual-fund-return-calculator", name: "Mutual Fund Return Calculator", ui: "investment" },

    { slug: "cagr-calculator", name: "CAGR Calculator", ui: "ratio" },
    { slug: "xirr-calculator", name: "XIRR Calculator", ui: "ratio" },
    { slug: "swp-calculator", name: "SWP Calculator", ui: "investment" },

    { slug: "inflation-calculator", name: "Inflation Calculator", ui: "finance" },
    { slug: "retirement-planning-calculator", name: "Retirement Planning Calculator", ui: "planner" },
    { slug: "fire-calculator", name: "FIRE Calculator", ui: "planner" },

    { slug: "net-worth-calculator", name: "Net Worth Calculator", ui: "finance" },
    { slug: "income-tax-calculator", name: "Income Tax Calculator", ui: "tax" },
    { slug: "hra-calculator", name: "HRA Calculator", ui: "tax" },
    { slug: "gratuity-calculator", name: "Gratuity Calculator", ui: "salary" },
    { slug: "salary-in-hand-calculator", name: "Salary In Hand Calculator", ui: "salary" },
    { slug: "ctc-to-in-hand-calculator", name: "CTC to In Hand Calculator", ui: "salary" },

    { slug: "loan-eligibility-calculator", name: "Loan Eligibility Calculator", ui: "loan" },
    { slug: "loan-prepayment-calculator", name: "Loan Prepayment Calculator", ui: "loan" },
    { slug: "home-loan-vs-rent-calculator", name: "Home Loan vs Rent Calculator", ui: "comparison" },

    { slug: "credit-card-emi-calculator", name: "Credit Card EMI Calculator", ui: "emi" },
    { slug: "gst-calculator", name: "GST Calculator", ui: "tax" },
    // { slug: "currency-converter", name: "Currency Converter", ui: "converter" },
    { slug: "break-even-calculator", name: "Break Even Calculator", ui: "business" },
    { slug: "roi-calculator", name: "ROI Calculator", ui: "business" },
    { slug: "business-loan-calculator", name: "Business Loan Calculator", ui: "loan" },
    { slug: "startup-valuation-calculator", name: "Startup Valuation Calculator", ui: "business" },
    { slug: "education-loan-repayment-calculator", name: "Education Loan Repayment Calculator", ui: "loan" }
  ],

  construction: [
    { slug: "cement-quantity-calculator", name: "Cement Quantity Calculator", ui: "construction" },
    { slug: "sand-quantity-calculator", name: "Sand Quantity Calculator", ui: "construction" },
    { slug: "aggregate-quantity-calculator", name: "Aggregate Quantity Calculator", ui: "construction" },
    { slug: "concrete-calculator", name: "Concrete Calculator", ui: "construction" },
    { slug: "brick-calculator", name: "Brick Calculator", ui: "construction" },
    { slug: "tile-calculator", name: "Tile Calculator", ui: "construction" },
    { slug: "paint-calculator", name: "Paint Calculator", ui: "construction" },
    { slug: "steel-weight-calculator", name: "Steel Weight Calculator", ui: "construction" },
    { slug: "rcc-slab-calculator", name: "RCC Slab Calculator", ui: "construction" },
    { slug: "beam-load-calculator", name: "Beam Load Calculator", ui: "construction" },
    { slug: "column-load-calculator", name: "Column Load Calculator", ui: "construction" },
    { slug: "foundation-calculator", name: "Foundation Calculator", ui: "construction" },
    { slug: "staircase-calculator", name: "Staircase Calculator", ui: "construction" },
    { slug: "plaster-calculator", name: "Plaster Calculator", ui: "construction" },
    { slug: "flooring-cost-calculator", name: "Flooring Cost Calculator", ui: "construction" },
    { slug: "house-construction-cost-calculator", name: "House Construction Cost Calculator", ui: "construction" },
    { slug: "water-tank-capacity-calculator", name: "Water Tank Capacity Calculator", ui: "construction" },
    { slug: "rainwater-harvesting-calculator", name: "Rainwater Harvesting Calculator", ui: "construction" },
    { slug: "electrical-load-calculator", name: "Electrical Load Calculator", ui: "construction" },
    { slug: "ac-tonnage-calculator", name: "AC Tonnage Calculator", ui: "construction" },
    { slug: "solar-panel-calculator", name: "Solar Panel Calculator", ui: "construction" },
    { slug: "excavation-calculator", name: "Excavation Calculator", ui: "construction" },
    { slug: "wall-area-calculator", name: "Wall Area Calculator", ui: "construction" },
    { slug: "carpet-area-calculator", name: "Carpet Area Calculator", ui: "construction" },
    { slug: "built-up-area-calculator", name: "Built Up Area Calculator", ui: "construction" }
  ],

  health: [
    { slug: "bmi-calculator", name: "BMI Calculator", ui: "health" },
    { slug: "bmr-calculator", name: "BMR Calculator", ui: "health" },
    { slug: "tdee-calculator", name: "TDEE Calculator", ui: "health" },
    { slug: "calorie-calculator", name: "Calorie Calculator", ui: "health" },
    { slug: "ideal-weight-calculator", name: "Ideal Weight Calculator", ui: "health" },
    { slug: "body-fat-percentage-calculator", name: "Body Fat Percentage Calculator", ui: "health" },
    { slug: "calorie-intake-calculator", name: "Calorie Intake Calculator", ui: "health" },
    { slug: "protein-intake-calculator", name: "Protein Intake Calculator", ui: "health" },
    { slug: "water-intake-calculator", name: "Water Intake Calculator", ui: "health" },
    { slug: "weight-loss-calculator", name: "Weight Loss Calculator", ui: "health" },
    { slug: "weight-gain-calculator", name: "Weight Gain Calculator", ui: "health" },
    { slug: "pregnancy-due-date-calculator", name: "Pregnancy Due Date Calculator", ui: "health" },
    { slug: "ovulation-calculator", name: "Ovulation Calculator", ui: "health" },
    { slug: "heart-rate-calculator", name: "Heart Rate Calculator", ui: "health" },
    { slug: "blood-pressure-calculator", name: "Blood Pressure Calculator", ui: "health" },
    { slug: "diabetes-risk-calculator", name: "Diabetes Risk Calculator", ui: "health" },
    // { slug: "macronutrient-calculator", name: "Macronutrient Calculator_toggle="health" },
    { slug: "keto-calculator", name: "Keto Calculator", ui: "health" },
    { slug: "child-growth-calculator", name: "Child Growth Calculator", ui: "health" },
    { slug: "calorie-burn-calculator", name: "Calorie Burn Calculator", ui: "health" },
    { slug: "vo2-max-calculator", name: "VO2 Max Calculator", ui: "health" }
  ],

  education: [
    { slug: "percentage-calculator", name: "Percentage Calculator", ui: "education" },
    { slug: "cgpa-to-percentage-calculator", name: "CGPA to Percentage Calculator", ui: "education" },
    { slug: "sgpa-to-cgpa-calculator", name: "SGPA to CGPA Calculator", ui: "education" },
    { slug: "grade-calculator", name: "Grade Calculator", ui: "education" },
    { slug: "marks-to-percentage-calculator", name: "Marks to Percentage Calculator", ui: "education" },
    { slug: "cut-off-calculator", name: "Cut Off Calculator", ui: "education" },
    { slug: "rank-predictor", name: "Rank Predictor", ui: "education" },
    { slug: "jee-percentile-calculator", name: "JEE Percentile Calculator", ui: "education" },
    { slug: "neet-rank-predictor", name: "NEET Rank Predictor", ui: "education" },
    { slug: "cat-percentile-calculator", name: "CAT Percentile Calculator", ui: "education" },
    { slug: "scholarship-eligibility-calculator", name: "Scholarship Eligibility Calculator", ui: "education" },
    { slug: "study-time-planner-calculator", name: "Study Time Planner Calculator", ui: "education" },
    { slug: "exam-marks-calculator", name: "Exam Marks Calculator", ui: "education" },
    { slug: "passing-marks-calculator", name: "Passing Marks Calculator", ui: "education" },
    { slug: "gpa-calculator", name: "GPA Calculator", ui: "education" }
  ],


  
};

export default calculators;
