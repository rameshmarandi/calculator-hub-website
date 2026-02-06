import dynamic from "next/dynamic";

const ASTROLOGY_CALCULATOR_MAP = {
  "kundli-calculator": dynamic(() =>
    import("@/components/calculators/astrology/KundliCalculator")
  ),

  "birth-chart-calculator": dynamic(() =>
    import("@/components/calculators/astrology/BirthChartCalculator")
  ),

  "moon-sign-calculator": dynamic(() =>
    import("@/components/calculators/astrology/MoonSignCalculator")
  ),

  "rashi-calculator": dynamic(() =>
    import("@/components/calculators/astrology/RashiCalculator")
  ),

  "nakshatra-calculator": dynamic(() =>
    import("@/components/calculators/astrology/NakshatraCalculator")
  ),

  "numerology-calculator": dynamic(() =>
    import("@/components/calculators/astrology/NumerologyCalculator")
  ),

  "life-path-number-calculator": dynamic(() =>
    import("@/components/calculators/astrology/LifePathNumberCalculator")
  ),

  "name-compatibility-calculator": dynamic(() =>
    import("@/components/calculators/astrology/NameCompatibilityCalculator")
  ),

  "marriage-matching-calculator": dynamic(() =>
    import("@/components/calculators/astrology/MarriageMatchingCalculator")
  ),

  "dasha-calculator": dynamic(() =>
    import("@/components/calculators/astrology/DashaCalculator")
  ),

  "sade-sati-calculator": dynamic(() =>
    import("@/components/calculators/astrology/SadeSatiCalculator")
  ),

  "horoscope-calculator": dynamic(() =>
    import("@/components/calculators/astrology/HoroscopeCalculator")
  ),

  "lucky-number-calculator": dynamic(() =>
    import("@/components/calculators/astrology/LuckyNumberCalculator")
  ),

  "lucky-color-calculator": dynamic(() =>
    import("@/components/calculators/astrology/LuckyColorCalculator")
  ),

  "career-astrology-calculator": dynamic(() =>
    import("@/components/calculators/astrology/CareerAstrologyCalculator")
  ),
};

export default ASTROLOGY_CALCULATOR_MAP;
