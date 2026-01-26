//Finance Calculators

import CagrCalculator from "../components/calculators/CagrCalculator";
import CarLoanEmiCalculator from "../components/calculators/CarLoanEmiCalculator";
import CompoundInterestCalculator from "../components/calculators/CompoundInterestCalculator";
import EducationLoanEmiCalculator from "../components/calculators/EducationLoanEmiCalculator";
import EmiCalculator from "../components/calculators/EmiCalculator";
import FireCalculator from "../components/calculators/FireCalculator";
import FixedDepositCalculator from "../components/calculators/FixedDepositCalculator";

import HomeLoanEmiCalculator from "../components/calculators/HomeLoanEmiCalculator";
import InflationCalculator from "../components/calculators/InflationCalculator";
import LumpsumInvestmentCalculator from "../components/calculators/LumpsumInvestmentCalculator";
import MutualFundReturnCalculator from "../components/calculators/MutualFundReturnCalculator";
import NetWorthCalculator from "../components/calculators/NetWorthCalculator";
import NpsCalculator from "../components/calculators/NpsCalculator";

import PersonalLoanEmiCalculator from "../components/calculators/PersonalLoanEmiCalculator";
import PPFCalculator from "../components/calculators/PPFCalculator";
import RecurringDepositCalculator from "../components/calculators/RecurringDepositCalculator";
import RetirementPlanningCalculator from "../components/calculators/RetirementPlanningCalculator";
import SimpleInterestCalculator from "../components/calculators/SimpleInterestCalculator";
import SipCalculator from "../components/calculators/SipCalculator";
import StepUpSipCalculator from "../components/calculators/StepUpSipCalculator";
import SwpCalculator from "../components/calculators/SwpCalculator";
import XirrCalculator from "../components/calculators/XirrCalculator";

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
  "net-worth-calculator": NetWorthCalculator,
};

export default CALCULATOR_MAP;
