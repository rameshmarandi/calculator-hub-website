//Finance Calculators

import BreakEvenCalculator from "../components/calculators/finance/BreakEvenCalculator";
import BusinessLoanCalculator from "../components/calculators/finance/BusinessLoanCalculator";
import CagrCalculator from "../components/calculators/finance/CagrCalculator";
import CarLoanEmiCalculator from "../components/calculators/finance/CarLoanEmiCalculator";
import CompoundInterestCalculator from "../components/calculators/finance/CompoundInterestCalculator";
import CreditCardEMICalculator from "../components/calculators/finance/CreditCardEMICalculator";
import CTCToInHandCalculator from "../components/calculators/finance/CTCToInHandCalculator";
import CurrencyConverter from "../components/calculators/finance/CurrencyConverter";
import EducationLoanEmiCalculator from "../components/calculators/finance/EducationLoanEmiCalculator";
import EducationLoanRepaymentCalculator from "../components/calculators/finance/EducationLoanRepaymentCalculator";
import EmiCalculator from "../components/calculators/finance/EmiCalculator";
import FireCalculator from "../components/calculators/finance/FireCalculator";
import FixedDepositCalculator from "../components/calculators/finance/FixedDepositCalculator";
import GratuityCalculator from "../components/calculators/finance/GratuityCalculator";
import GSTCalculator from "../components/calculators/finance/GSTCalculator";

import HomeLoanEmiCalculator from "../components/calculators/finance/HomeLoanEmiCalculator";
import HomeLoanVsRentCalculator from "../components/calculators/finance/HomeLoanVsRentCalculator";
import HraCalculator from "../components/calculators/finance/HraCalculator";
import IncomeTaxCalculator from "../components/calculators/finance/IncomeTaxCalculator";
import InflationCalculator from "../components/calculators/finance/InflationCalculator";
import LoanEligibilityCalculator from "../components/calculators/finance/LoanEligibilityCalculator";
import LoanPrepaymentCalculator from "../components/calculators/finance/LoanPrepaymentCalculator";
import LumpsumInvestmentCalculator from "../components/calculators/finance/LumpsumInvestmentCalculator";
import MutualFundReturnCalculator from "../components/calculators/finance/MutualFundReturnCalculator";
import NetWorthCalculator from "../components/calculators/finance/NetWorthCalculator";
import NpsCalculator from "../components/calculators/finance/NpsCalculator";

import PersonalLoanEmiCalculator from "../components/calculators/finance/PersonalLoanEmiCalculator";
import PPFCalculator from "../components/calculators/finance/PPFCalculator";
import RecurringDepositCalculator from "../components/calculators/finance/RecurringDepositCalculator";
import RetirementPlanningCalculator from "../components/calculators/finance/RetirementPlanningCalculator";
import ROICalculator from "../components/calculators/finance/ROICalculator";
import SalaryInHandCalculator from "../components/calculators/finance/SalaryInHandCalculator";
import SimpleInterestCalculator from "../components/calculators/finance/SimpleInterestCalculator";
import SipCalculator from "../components/calculators/finance/SipCalculator";
import StartupValuationCalculator from "../components/calculators/finance/StartupValuationCalculator";
import StepUpSipCalculator from "../components/calculators/finance/StepUpSipCalculator";
import SwpCalculator from "../components/calculators/finance/SwpCalculator";
import XirrCalculator from "../components/calculators/finance/XirrCalculator";

const CALCULATOR_MAP = {
  //Finance Calculators
  "emi-calculator": EmiCalculator,
  "home-loan-emi-calculator": HomeLoanEmiCalculator,
  "personal-loan-emi-calculator": PersonalLoanEmiCalculator,
  "car-loan-emi-calculator": CarLoanEmiCalculator,
  "education-loan-emi-calculator": EducationLoanEmiCalculator,
  "sip-calculator": SipCalculator,
  "step-up-sip-calculator": StepUpSipCalculator,
  "lumpsum-investment-calculator": LumpsumInvestmentCalculator,
  "compound-interest-calculator": CompoundInterestCalculator,
  "simple-interest-calculator": SimpleInterestCalculator,
  "fixed-deposit-calculator": FixedDepositCalculator,
  "recurring-deposit-calculator": RecurringDepositCalculator,
  "ppf-calculator": PPFCalculator,
  "nps-calculator": NpsCalculator,
  "mutual-fund-return-calculator": MutualFundReturnCalculator,
  "cagr-calculator": CagrCalculator,
  "xirr-calculator": XirrCalculator,
  "swp-calculator": SwpCalculator,
  "inflation-calculator": InflationCalculator,
  "retirement-planning-calculator": RetirementPlanningCalculator,
  "fire-calculator": FireCalculator,
  "net-worth-calculator": NetWorthCalculator,
  "income-tax-calculator": IncomeTaxCalculator,
  "hra-calculator": HraCalculator,
  "gratuity-calculator": GratuityCalculator,
  "salary-in-hand-calculator": SalaryInHandCalculator,
  "ctc-to-in-hand-calculator": CTCToInHandCalculator,
  "loan-eligibility-calculator": LoanEligibilityCalculator,
  "loan-prepayment-calculator": LoanPrepaymentCalculator,
  "home-loan-vs-rent-calculator": HomeLoanVsRentCalculator,
  "credit-card-emi-calculator": CreditCardEMICalculator,
  "gst-calculator": GSTCalculator,
  "currency-converter": CurrencyConverter,
  "break-even-calculator": BreakEvenCalculator,
  "roi-calculator": ROICalculator,
  "business-loan-calculator": BusinessLoanCalculator,
  "startup-valuation-calculator": StartupValuationCalculator,
  "education-loan-repayment-calculator": EducationLoanRepaymentCalculator,
};

export default CALCULATOR_MAP;
