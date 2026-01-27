//Construction Calculators

import AggregateQuantityCalculator from "../components/calculators/construction/AggregateQuantityCalculator";
import BeamLoadCalculator from "../components/calculators/construction/BeamLoadCalculator";
import BrickCalculator from "../components/calculators/construction/BrickCalculator";
import CementQuantityCalculator from "../components/calculators/construction/CementQuantityCalculator";
import ColumnLoadCalculator from "../components/calculators/construction/ColumnLoadCalculator";
import ConcreteCalculator from "../components/calculators/construction/ConcreteCalculator";
import FoundationCalculator from "../components/calculators/construction/FoundationCalculator";
import PaintCalculator from "../components/calculators/construction/PaintCalculator";
import RCCSlabCalculator from "../components/calculators/construction/RCCSlabCalculator";
import SandQuantityCalculator from "../components/calculators/construction/SandQuantityCalculator";
import SteelWeightCalculator from "../components/calculators/construction/SteelWeightCalculator";
import TileCalculator from "../components/calculators/construction/TileCalculator";




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
};

export default CONSTRUCTION_CALCULATOR_MAP;
