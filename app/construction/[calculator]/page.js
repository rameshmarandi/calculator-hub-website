
import CONSTRUCTION_CALCULATOR_MAP from "../../../data/construction";



export default async function CalculatorPage({ params }) {
  // ✅ params is a Promise
  const { calculator } = await params;

  const CalculatorComponent = CONSTRUCTION_CALCULATOR_MAP[calculator];

  if (!CalculatorComponent) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-xl font-semibold">
          Calculator coming soon
        </h1>
      </div>
    );
  }

  return <CalculatorComponent />;
}
