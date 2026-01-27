
import BirthChartCalculator from "../components/calculators/astrology/BirthChartCalculator";
import CareerAstrologyCalculator from "../components/calculators/astrology/CareerAstrologyCalculator";
import DashaCalculator from "../components/calculators/astrology/DashaCalculator";
import HoroscopeCalculator from "../components/calculators/astrology/HoroscopeCalculator";
import KundliCalculator from "../components/calculators/astrology/KundliCalculator";
import LifePathNumberCalculator from "../components/calculators/astrology/LifePathNumberCalculator";
import LuckyColorCalculator from "../components/calculators/astrology/LuckyColorCalculator";
import LuckyNumberCalculator from "../components/calculators/astrology/LuckyNumberCalculator";
import MarriageMatchingCalculator from "../components/calculators/astrology/MarriageMatchingCalculator";
import MoonSignCalculator from "../components/calculators/astrology/MoonSignCalculator";
import NakshatraCalculator from "../components/calculators/astrology/NakshatraCalculator";
import NameCompatibilityCalculator from "../components/calculators/astrology/NameCompatibilityCalculator";
import NumerologyCalculator from "../components/calculators/astrology/NumerologyCalculator";
import RashiCalculator from "../components/calculators/astrology/RashiCalculator";
import SadeSatiCalculator from "../components/calculators/astrology/SadeSatiCalculator";



const ASTROLOGY_CALCULATOR_MAP = {
  "kundli-calculator": KundliCalculator,
  "birth-chart-calculator": BirthChartCalculator,
  "moon-sign-calculator": MoonSignCalculator,
  "rashi-calculator": RashiCalculator,
  "nakshatra-calculator": NakshatraCalculator,
  "numerology-calculator": NumerologyCalculator,
  "life-path-number-calculator": LifePathNumberCalculator,
  "name-compatibility-calculator": NameCompatibilityCalculator,
  "marriage-matching-calculator": MarriageMatchingCalculator,
  "dasha-calculator": DashaCalculator,
  "sade-sati-calculator": SadeSatiCalculator,
  "horoscope-calculator": HoroscopeCalculator,
  "lucky-number-calculator": LuckyNumberCalculator,
  "lucky-color-calculator": LuckyColorCalculator,
  "career-astrology-calculator": CareerAstrologyCalculator,
 
};

export default ASTROLOGY_CALCULATOR_MAP;