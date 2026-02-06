import dynamic from "next/dynamic";

const HEALTH_CALCULATOR_MAP = {
  "bmi-calculator": dynamic(() =>
    import("../components/calculators/health/BMICalculator")
  ),

  "bmr-calculator": dynamic(() =>
    import("../components/calculators/health/BMRCalculator")
  ),

  "tdee-calculator": dynamic(() =>
    import("../components/calculators/health/TDEECalculator")
  ),

  "ideal-weight-calculator": dynamic(() =>
    import("../components/calculators/health/IdealWeightCalculator")
  ),

  "body-fat-percentage-calculator": dynamic(() =>
    import("../components/calculators/health/BodyFatPercentageCalculator")
  ),

  "calorie-intake-calculator": dynamic(() =>
    import("../components/calculators/health/CalorieIntakeCalculator")
  ),

  "protein-intake-calculator": dynamic(() =>
    import("../components/calculators/health/ProteinIntakeCalculator")
  ),

  "water-intake-calculator": dynamic(() =>
    import("../components/calculators/health/WaterIntakeCalculator")
  ),

  "weight-gain-calculator": dynamic(() =>
    import("../components/calculators/health/WeightGainCalculator")
  ),

  "weight-loss-calculator": dynamic(() =>
    import("../components/calculators/health/WeightLossCalculator")
  ),

  "pregnancy-due-date-calculator": dynamic(() =>
    import("../components/calculators/health/PregnancyDueDateCalculator")
  ),

  "ovulation-calculator": dynamic(() =>
    import("../components/calculators/health/OvulationCalculator")
  ),

  "heart-rate-calculator": dynamic(() =>
    import("../components/calculators/health/HeartRateCalculator")
  ),

  "blood-pressure-calculator": dynamic(() =>
    import("../components/calculators/health/BloodPressureCalculator")
  ),

  "diabetes-risk-calculator": dynamic(() =>
    import("../components/calculators/health/DiabetesRiskCalculator")
  ),

  "keto-calculator": dynamic(() =>
    import("../components/calculators/health/KetoCalculator")
  ),

  "child-growth-calculator": dynamic(() =>
    import("../components/calculators/health/ChildGrowthCalculator")
  ),

  "calorie-burn-calculator": dynamic(() =>
    import("../components/calculators/health/CalorieBurnCalculator")
  ),

  "vo2-max-calculator": dynamic(() =>
    import("../components/calculators/health/VO2MaxCalculator")
  ),
};

export default HEALTH_CALCULATOR_MAP;
