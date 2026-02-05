import dynamic from "next/dynamic";

/*
  PRODUCTION RULE
  No static imports here
  Everything lazy loaded
*/

const CONSTRUCTION_CALCULATOR_MAP = {
  "cement-quantity-calculator": dynamic(() =>
    import("../components/calculators/construction/CementQuantityCalculator")
  ),

  "sand-quantity-calculator": dynamic(() =>
    import("../components/calculators/construction/SandQuantityCalculator")
  ),

  "aggregate-quantity-calculator": dynamic(() =>
    import("../components/calculators/construction/AggregateQuantityCalculator")
  ),

  "concrete-calculator": dynamic(() =>
    import("../components/calculators/construction/ConcreteCalculator")
  ),

  "brick-calculator": dynamic(() =>
    import("../components/calculators/construction/BrickCalculator")
  ),

  "tile-calculator": dynamic(() =>
    import("../components/calculators/construction/TileCalculator")
  ),

  "paint-calculator": dynamic(() =>
    import("../components/calculators/construction/PaintCalculator")
  ),

  "steel-weight-calculator": dynamic(() =>
    import("../components/calculators/construction/SteelWeightCalculator")
  ),

  "rcc-slab-calculator": dynamic(() =>
    import("../components/calculators/construction/RCCSlabCalculator")
  ),

  "beam-load-calculator": dynamic(() =>
    import("../components/calculators/construction/BeamLoadCalculator")
  ),

  "column-load-calculator": dynamic(() =>
    import("../components/calculators/construction/ColumnLoadCalculator")
  ),

  "foundation-calculator": dynamic(() =>
    import("../components/calculators/construction/FoundationCalculator")
  ),

  "staircase-calculator": dynamic(() =>
    import("../components/calculators/construction/StaircaseCalculator")
  ),

  "plaster-calculator": dynamic(() =>
    import("../components/calculators/construction/PlasterCalculator")
  ),

  "flooring-cost-calculator": dynamic(() =>
    import("../components/calculators/construction/FlooringCostCalculator")
  ),

  "house-construction-cost-calculator": dynamic(() =>
    import("../components/calculators/construction/HouseConstructionCostCalculator")
  ),

  "water-tank-capacity-calculator": dynamic(() =>
    import("../components/calculators/construction/WaterTankCapacityCalculator")
  ),

  "rainwater-harvesting-calculator": dynamic(() =>
    import("../components/calculators/construction/RainwaterHarvestingCalculator")
  ),

  "electrical-load-calculator": dynamic(() =>
    import("../components/calculators/construction/ElectricalLoadCalculator")
  ),

  "ac-tonnage-calculator": dynamic(() =>
    import("../components/calculators/construction/ACTonnageCalculator")
  ),

  "solar-panel-calculator": dynamic(() =>
    import("../components/calculators/construction/SolarPanelCalculator")
  ),

  "excavation-calculator": dynamic(() =>
    import("../components/calculators/construction/ExcavationCalculator")
  ),

  "wall-area-calculator": dynamic(() =>
    import("../components/calculators/construction/WallAreaCalculator")
  ),

  "carpet-area-calculator": dynamic(() =>
    import("../components/calculators/construction/CarpetAreaCalculator")
  ),

  "built-up-area-calculator": dynamic(() =>
    import("../components/calculators/construction/BuiltUpAreaCalculator")
  ),
};

export default CONSTRUCTION_CALCULATOR_MAP;
