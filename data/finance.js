import dynamic from "next/dynamic";

const CALCULATOR_MAP = {
  "emi-calculator": dynamic(() =>
    import("../components/calculators/finance/EmiCalculator")
  ),

  "home-loan-emi-calculator": dynamic(() =>
    import("../components/calculators/finance/HomeLoanEmiCalculator")
  ),

  "personal-loan-emi-calculator": dynamic(() =>
    import("../components/calculators/finance/PersonalLoanEmiCalculator")
  ),

  "car-loan-emi-calculator": dynamic(() =>
    import("../components/calculators/finance/CarLoanEmiCalculator")
  ),

  "education-loan-emi-calculator": dynamic(() =>
    import("../components/calculators/finance/EducationLoanEmiCalculator")
  ),

  "sip-calculator": dynamic(() =>
    import("../components/calculators/finance/SipCalculator")
  ),

  "step-up-sip-calculator": dynamic(() =>
    import("../components/calculators/finance/StepUpSipCalculator")
  ),

  "lumpsum-investment-calculator": dynamic(() =>
    import("../components/calculators/finance/LumpsumInvestmentCalculator")
  ),

  "compound-interest-calculator": dynamic(() =>
    import("../components/calculators/finance/CompoundInterestCalculator")
  ),

  "simple-interest-calculator": dynamic(() =>
    import("../components/calculators/finance/SimpleInterestCalculator")
  ),

  "fixed-deposit-calculator": dynamic(() =>
    import("../components/calculators/finance/FixedDepositCalculator")
  ),

  "recurring-deposit-calculator": dynamic(() =>
    import("../components/calculators/finance/RecurringDepositCalculator")
  ),

  "ppf-calculator": dynamic(() =>
    import("../components/calculators/finance/PPFCalculator")
  ),

  "nps-calculator": dynamic(() =>
    import("../components/calculators/finance/NpsCalculator")
  ),

  "mutual-fund-return-calculator": dynamic(() =>
    import("../components/calculators/finance/MutualFundReturnCalculator")
  ),

  "cagr-calculator": dynamic(() =>
    import("../components/calculators/finance/CagrCalculator")
  ),

  "xirr-calculator": dynamic(() =>
    import("../components/calculators/finance/XirrCalculator")
  ),

  "swp-calculator": dynamic(() =>
    import("../components/calculators/finance/SwpCalculator")
  ),

  "inflation-calculator": dynamic(() =>
    import("../components/calculators/finance/InflationCalculator")
  ),

  "retirement-planning-calculator": dynamic(() =>
    import("../components/calculators/finance/RetirementPlanningCalculator")
  ),

  "fire-calculator": dynamic(() =>
    import("../components/calculators/finance/FireCalculator")
  ),

  "net-worth-calculator": dynamic(() =>
    import("../components/calculators/finance/NetWorthCalculator")
  ),

  "income-tax-calculator": dynamic(() =>
    import("../components/calculators/finance/IncomeTaxCalculator")
  ),

  "hra-calculator": dynamic(() =>
    import("../components/calculators/finance/HraCalculator")
  ),

  "gratuity-calculator": dynamic(() =>
    import("../components/calculators/finance/GratuityCalculator")
  ),

  "salary-in-hand-calculator": dynamic(() =>
    import("../components/calculators/finance/SalaryInHandCalculator")
  ),

  "ctc-to-in-hand-calculator": dynamic(() =>
    import("../components/calculators/finance/CTCToInHandCalculator")
  ),

  "loan-eligibility-calculator": dynamic(() =>
    import("../components/calculators/finance/LoanEligibilityCalculator")
  ),

  "loan-prepayment-calculator": dynamic(() =>
    import("../components/calculators/finance/LoanPrepaymentCalculator")
  ),

  "home-loan-vs-rent-calculator": dynamic(() =>
    import("../components/calculators/finance/HomeLoanVsRentCalculator")
  ),

  "credit-card-emi-calculator": dynamic(() =>
    import("../components/calculators/finance/CreditCardEMICalculator")
  ),

  "gst-calculator": dynamic(() =>
    import("../components/calculators/finance/GSTCalculator")
  ),

  "currency-converter": dynamic(() =>
    import("../components/calculators/finance/CurrencyConverter")
  ),

  "break-even-calculator": dynamic(() =>
    import("../components/calculators/finance/BreakEvenCalculator")
  ),

  "roi-calculator": dynamic(() =>
    import("../components/calculators/finance/ROICalculator")
  ),

  "business-loan-calculator": dynamic(() =>
    import("../components/calculators/finance/BusinessLoanCalculator")
  ),

  "startup-valuation-calculator": dynamic(() =>
    import("../components/calculators/finance/StartupValuationCalculator")
  ),

  "education-loan-repayment-calculator": dynamic(() =>
    import("../components/calculators/finance/EducationLoanRepaymentCalculator")
  ),
};

export default CALCULATOR_MAP;
