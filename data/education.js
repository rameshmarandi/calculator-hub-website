import CATPercentileCalculator from "../components/calculators/education/CATPercentileCalculator";
import CGPAToPercentageCalculator from "../components/calculators/education/CGPAToPercentageCalculator";
import CutOffCalculator from "../components/calculators/education/CutOffCalculator";
import ExamMarksCalculator from "../components/calculators/education/ExamMarksCalculator";
import GPACalculator from "../components/calculators/education/GPACalculator";
import GradeCalculator from "../components/calculators/education/GradeCalculator";
import JEEPercentileCalculator from "../components/calculators/education/JEEPercentileCalculator";
import MarksToPercentageCalculator from "../components/calculators/education/MarksToPercentageCalculator";
import NEETRankPredictorCalculator from "../components/calculators/education/NEETRankPredictorCalculator";
import PassingMarksCalculator from "../components/calculators/education/PassingMarksCalculator";
import PercentageCalculator from "../components/calculators/education/PercentageCalculator";
import RankPredictorCalculator from "../components/calculators/education/RankPredictorCalculator";
import ScholarshipEligibilityCalculator from "../components/calculators/education/ScholarshipEligibilityCalculator";
import SGPAToCGPACalculator from "../components/calculators/education/SGPAToCGPACalculator";
import StudyTimePlannerCalculator from "../components/calculators/education/StudyTimePlannerCalculator";

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
  "cat-percentile-calculator": CATPercentileCalculator,
  "scholarship-eligibility-calculator": ScholarshipEligibilityCalculator,
  "study-time-planner-calculator": StudyTimePlannerCalculator,
  "exam-marks-calculator": ExamMarksCalculator,
  "passing-marks-calculator": PassingMarksCalculator,
  "gpa-calculator": GPACalculator,
};

export default EDUCATION_CALCULATOR_MAP;
