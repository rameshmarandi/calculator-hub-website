import dynamic from "next/dynamic";

const UTILITY_CALCULATOR_MAP = {
  "age-calculator": dynamic(() =>
    import("../components/calculators/utility/AgeCalculator")
  ),

  "date-difference-calculator": dynamic(() =>
    import("../components/calculators/utility/DateDifferenceCalculator")
  ),

  "time-calculator": dynamic(() =>
    import("../components/calculators/utility/TimeCalculator")
  ),

  "unit-converter": dynamic(() =>
    import("../components/calculators/utility/UnitConverter")
  ),

  "percentage-increase-calculator": dynamic(() =>
    import("../components/calculators/utility/PercentageIncreaseCalculator")
  ),

  "percentage-decrease-calculator": dynamic(() =>
    import("../components/calculators/utility/PercentageDecreaseCalculator")
  ),

  "discount-calculator": dynamic(() =>
    import("../components/calculators/utility/DiscountCalculator")
  ),

  "profit-and-loss-calculator": dynamic(() =>
    import("../components/calculators/utility/ProfitLossCalculator")
  ),

  "simple-calculator": dynamic(() =>
    import("../components/calculators/utility/SimpleCalculator")
  ),

  "scientific-calculator": dynamic(() =>
    import("../components/calculators/utility/ScientificCalculator")
  ),

  "binary-calculator": dynamic(() =>
    import("../components/calculators/utility/BinaryCalculator")
  ),

  "matrix-calculator": dynamic(() =>
    import("../components/calculators/utility/MatrixCalculator")
  ),

  "equation-solver": dynamic(() =>
    import("../components/calculators/utility/EquationSolver")
  ),

  "logarithm-calculator": dynamic(() =>
    import("../components/calculators/utility/LogarithmCalculator")
  ),

  "power-calculator": dynamic(() =>
    import("../components/calculators/utility/PowerCalculator")
  ),
};

export default UTILITY_CALCULATOR_MAP;
