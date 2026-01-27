import AgeCalculator from "../components/calculators/utility/AgeCalculator";
import BinaryCalculator from "../components/calculators/utility/BinaryCalculator";
import DateDifferenceCalculator from "../components/calculators/utility/DateDifferenceCalculator";
import DiscountCalculator from "../components/calculators/utility/DiscountCalculator";
import EquationSolver from "../components/calculators/utility/EquationSolver";
import LogarithmCalculator from "../components/calculators/utility/LogarithmCalculator";
import MatrixCalculator from "../components/calculators/utility/MatrixCalculator";
import PercentageDecreaseCalculator from "../components/calculators/utility/PercentageDecreaseCalculator";
import PercentageIncreaseCalculator from "../components/calculators/utility/PercentageIncreaseCalculator";
import PowerCalculator from "../components/calculators/utility/PowerCalculator";
import ProfitLossCalculator from "../components/calculators/utility/ProfitLossCalculator";
import ScientificCalculator from "../components/calculators/utility/ScientificCalculator";
import SimpleCalculator from "../components/calculators/utility/SimpleCalculator";
import TimeCalculator from "../components/calculators/utility/TimeCalculator";
import UnitConverter from "../components/calculators/utility/UnitConverter";

const UTILITY_CALCULATOR_MAP = {
  "age-calculator": AgeCalculator,
  "date-difference-calculator": DateDifferenceCalculator,
  "time-calculator": TimeCalculator,
  "unit-converter": UnitConverter,
  "percentage-increase-calculator": PercentageIncreaseCalculator,
  "percentage-decrease-calculator": PercentageDecreaseCalculator,
  "discount-calculator": DiscountCalculator,
  "profit-and-loss-calculator": ProfitLossCalculator,
  "simple-calculator": SimpleCalculator,
  "scientific-calculator": ScientificCalculator,
  "binary-calculator": BinaryCalculator,
  "matrix-calculator": MatrixCalculator,
  "equation-solver": EquationSolver,
  "logarithm-calculator": LogarithmCalculator,
  "power-calculator": PowerCalculator,
};

export default UTILITY_CALCULATOR_MAP;
