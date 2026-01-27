//Construction Calculators

import ACTonnageCalculator from "../components/calculators/construction/ACTonnageCalculator";
import AggregateQuantityCalculator from "../components/calculators/construction/AggregateQuantityCalculator";
import BeamLoadCalculator from "../components/calculators/construction/BeamLoadCalculator";
import BrickCalculator from "../components/calculators/construction/BrickCalculator";
import BuiltUpAreaCalculator from "../components/calculators/construction/BuiltUpAreaCalculator";
import CarpetAreaCalculator from "../components/calculators/construction/CarpetAreaCalculator";
import CementQuantityCalculator from "../components/calculators/construction/CementQuantityCalculator";
import ColumnLoadCalculator from "../components/calculators/construction/ColumnLoadCalculator";
import ConcreteCalculator from "../components/calculators/construction/ConcreteCalculator";
import ElectricalLoadCalculator from "../components/calculators/construction/ElectricalLoadCalculator";
import ExcavationCalculator from "../components/calculators/construction/ExcavationCalculator";
import FlooringCostCalculator from "../components/calculators/construction/FlooringCostCalculator";
import FoundationCalculator from "../components/calculators/construction/FoundationCalculator";
import HouseConstructionCostCalculator from "../components/calculators/construction/HouseConstructionCostCalculator";
import PaintCalculator from "../components/calculators/construction/PaintCalculator";
import PlasterCalculator from "../components/calculators/construction/PlasterCalculator";
import RainwaterHarvestingCalculator from "../components/calculators/construction/RainwaterHarvestingCalculator";
import RCCSlabCalculator from "../components/calculators/construction/RCCSlabCalculator";
import SandQuantityCalculator from "../components/calculators/construction/SandQuantityCalculator";
import SolarPanelCalculator from "../components/calculators/construction/SolarPanelCalculator";
import StaircaseCalculator from "../components/calculators/construction/StaircaseCalculator";
import SteelWeightCalculator from "../components/calculators/construction/SteelWeightCalculator";
import TileCalculator from "../components/calculators/construction/TileCalculator";
import WallAreaCalculator from "../components/calculators/construction/WallAreaCalculator";
import WaterTankCapacityCalculator from "../components/calculators/construction/WaterTankCapacityCalculator";

const CONSTRUCTION_CALCULATOR_MAP = {
  "cement-quantity-calculator": CementQuantityCalculator,
  "sand-quantity-calculator": SandQuantityCalculator,
  "aggregate-quantity-calculator": AggregateQuantityCalculator,
  "concrete-calculator": ConcreteCalculator,
  "brick-calculator": BrickCalculator,
  "tile-calculator": TileCalculator,
  "paint-calculator": PaintCalculator,
  "steel-weight-calculator": SteelWeightCalculator,
  "rcc-slab-calculator": RCCSlabCalculator,
  "beam-load-calculator": BeamLoadCalculator,
  "column-load-calculator": ColumnLoadCalculator,
  "foundation-calculator": FoundationCalculator,
  "staircase-calculator": StaircaseCalculator,
  "plaster-calculator": PlasterCalculator,
  "flooring-cost-calculator": FlooringCostCalculator,
  "house-construction-cost-calculator": HouseConstructionCostCalculator,
  "water-tank-capacity-calculator": WaterTankCapacityCalculator,
  "rainwater-harvesting-calculator": RainwaterHarvestingCalculator,
  "electrical-load-calculator": ElectricalLoadCalculator,
  "ac-tonnage-calculator": ACTonnageCalculator,
  "solar-panel-calculator": SolarPanelCalculator,
  "excavation-calculator": ExcavationCalculator,
  "wall-area-calculator": WallAreaCalculator,
  "carpet-area-calculator": CarpetAreaCalculator,
  "built-up-area-calculator": BuiltUpAreaCalculator,
};

export default CONSTRUCTION_CALCULATOR_MAP;
