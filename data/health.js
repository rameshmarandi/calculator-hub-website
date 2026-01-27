import BloodPressureCalculator from "../components/calculators/health/BloodPressureCalculator";
import BMICalculator from "../components/calculators/health/BMICalculator";
import BMRCalculator from "../components/calculators/health/BMRCalculator";
import BodyFatPercentageCalculator from "../components/calculators/health/BodyFatPercentageCalculator";
import CalorieBurnCalculator from "../components/calculators/health/CalorieBurnCalculator";
import CalorieIntakeCalculator from "../components/calculators/health/CalorieIntakeCalculator";
import ChildGrowthCalculator from "../components/calculators/health/ChildGrowthCalculator";
import DiabetesRiskCalculator from "../components/calculators/health/DiabetesRiskCalculator";
import HeartRateCalculator from "../components/calculators/health/HeartRateCalculator";
import IdealWeightCalculator from "../components/calculators/health/IdealWeightCalculator";
import KetoCalculator from "../components/calculators/health/KetoCalculator";
import OvulationCalculator from "../components/calculators/health/OvulationCalculator";
import PregnancyDueDateCalculator from "../components/calculators/health/PregnancyDueDateCalculator";
import ProteinIntakeCalculator from "../components/calculators/health/ProteinIntakeCalculator";
import TDEECalculator from "../components/calculators/health/TDEECalculator";
import VO2MaxCalculator from "../components/calculators/health/VO2MaxCalculator";
import WaterIntakeCalculator from "../components/calculators/health/WaterIntakeCalculator";
import WeightGainCalculator from "../components/calculators/health/WeightGainCalculator";
import WeightLossCalculator from "../components/calculators/health/WeightLossCalculator";

const HEALTH_CALCULATOR_MAP = {
  "bmi-calculator": BMICalculator,
  "bmr-calculator": BMRCalculator,
  "tdee-calculator": TDEECalculator,
  "ideal-weight-calculator": IdealWeightCalculator,
  "body-fat-percentage-calculator": BodyFatPercentageCalculator,
  "calorie-intake-calculator": CalorieIntakeCalculator,
  "protein-intake-calculator": ProteinIntakeCalculator,
  "water-intake-calculator": WaterIntakeCalculator,
  "weight-gain-calculator": WeightGainCalculator,
  "weight-loss-calculator": WeightLossCalculator,
  "pregnancy-due-date-calculator": PregnancyDueDateCalculator,
  "ovulation-calculator": OvulationCalculator,
  "heart-rate-calculator": HeartRateCalculator,
  "blood-pressure-calculator": BloodPressureCalculator,
  "diabetes-risk-calculator": DiabetesRiskCalculator,
  "keto-calculator": KetoCalculator,
  "child-growth-calculator": ChildGrowthCalculator,
  "calorie-burn-calculator": CalorieBurnCalculator,
  "vo2-max-calculator": VO2MaxCalculator,
};

export default HEALTH_CALCULATOR_MAP;
