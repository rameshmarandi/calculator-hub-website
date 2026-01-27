import CGPAToPercentageCalculator from "../components/calculators/education/CGPAToPercentageCalculator";
import CutOffCalculator from "../components/calculators/education/CutOffCalculator";
import GradeCalculator from "../components/calculators/education/GradeCalculator";
import JEEPercentileCalculator from "../components/calculators/education/JEEPercentileCalculator";
import MarksToPercentageCalculator from "../components/calculators/education/MarksToPercentageCalculator";
import NEETRankPredictorCalculator from "../components/calculators/education/NEETRankPredictorCalculator";
import PercentageCalculator from "../components/calculators/education/PercentageCalculator";
import RankPredictorCalculator from "../components/calculators/education/RankPredictorCalculator";
import SGPAToCGPACalculator from "../components/calculators/education/SGPAToCGPACalculator";

const EDUCATION_CALCULATOR_MAP = {
  "percentage-calculator": PercentageCalculator,
  "cgpa-to-percentage-calculator": CGPAToPercentageCalculator,
  "sgpa-to-cgpa-calculator": SGPAToCGPACalculator,
  "grade-calculator": GradeCalculator,
  "marks-to-percentage-calculator": MarksToPercentageCalculator,
  "cut-off-calculator": CutOffCalculator,
  "rank-predictor": RankPredictorCalculator,
  "jee-percentile-calculator": JEEPercentileCalculator,
  "neet-rank-predictor": NEETRankPredictorCalculator,
};

export default EDUCATION_CALCULATOR_MAP;
