import { calculateEMI, calculateBMI } from "@/lib/formulas";
import { useState } from "react";
import Result from "./Result";

export default function Calculator({ type }) {
  const [result, setResult] = useState(null);

  function handleEMI(e) {
    e.preventDefault();
    const f = e.target;
    setResult(calculateEMI(f.amount.value, f.rate.value, f.years.value));
  }

  function handleBMI(e) {
    e.preventDefault();
    const f = e.target;
    setResult(calculateBMI(f.weight.value, f.height.value));
  }

  if (type === "emi") {
    return (
      <form onSubmit={handleEMI} className="space-y-4">
        <input
          name="amount"
          placeholder="Loan Amount"
          className="border p-2 w-full"
        />
        <input
          name="rate"
          placeholder="Interest %"
          className="border p-2 w-full"
        />
        <input name="years" placeholder="Years" className="border p-2 w-full" />
        <button className="bg-black text-white px-4 py-2">Calculate EMI</button>
        {result && <Result label="Monthly EMI" value={`₹${result}`} />}
      </form>
    );
  }

  if (type === "bmi") {
    return (
      <form onSubmit={handleBMI} className="space-y-4">
        <input
          name="weight"
          placeholder="Weight (kg)"
          className="border p-2 w-full"
        />
        <input
          name="height"
          placeholder="Height (cm)"
          className="border p-2 w-full"
        />
        <button className="bg-black text-white px-4 py-2">Calculate BMI</button>
        {result && <Result label="Your BMI" value={result} />}
      </form>
    );
  }
}
