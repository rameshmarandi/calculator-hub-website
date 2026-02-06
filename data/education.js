import dynamic from "next/dynamic";

const EDUCATION_CALCULATOR_MAP = {
  "percentage-calculator": dynamic(() =>
    import("../components/calculators/education/PercentageCalculator")
  ),

  "cgpa-to-percentage-calculator": dynamic(() =>
    import("../components/calculators/education/CGPAToPercentageCalculator")
  ),

  "sgpa-to-cgpa-calculator": dynamic(() =>
    import("../components/calculators/education/SGPAToCGPACalculator")
  ),

  "grade-calculator": dynamic(() =>
    import("../components/calculators/education/GradeCalculator")
  ),

  "marks-to-percentage-calculator": dynamic(() =>
    import("../components/calculators/education/MarksToPercentageCalculator")
  ),

  "cut-off-calculator": dynamic(() =>
    import("../components/calculators/education/CutOffCalculator")
  ),

  "rank-predictor": dynamic(() =>
    import("../components/calculators/education/RankPredictorCalculator")
  ),

  "jee-percentile-calculator": dynamic(() =>
    import("../components/calculators/education/JEEPercentileCalculator")
  ),

  "neet-rank-predictor": dynamic(() =>
    import("../components/calculators/education/NEETRankPredictorCalculator")
  ),

  "cat-percentile-calculator": dynamic(() =>
    import("../components/calculators/education/CATPercentileCalculator")
  ),

  "scholarship-eligibility-calculator": dynamic(() =>
    import("../components/calculators/education/ScholarshipEligibilityCalculator")
  ),

  "study-time-planner-calculator": dynamic(() =>
    import("../components/calculators/education/StudyTimePlannerCalculator")
  ),

  "exam-marks-calculator": dynamic(() =>
    import("../components/calculators/education/ExamMarksCalculator")
  ),

  "passing-marks-calculator": dynamic(() =>
    import("../components/calculators/education/PassingMarksCalculator")
  ),

  "gpa-calculator": dynamic(() =>
    import("../components/calculators/education/GPACalculator")
  ),
};

export default EDUCATION_CALCULATOR_MAP;
