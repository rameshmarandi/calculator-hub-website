"use client";

import { useState } from "react";
import { Calculator, BarChart } from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { PercentageInput } from "../../inputs/PercentageInput";
import { ResultCard } from "../../ResultCard";

export default function ElectricalLoadCalculator() {
  const [lights, setLights] = useState("0");
  const [fans, setFans] = useState("0");
  const [ac, setAC] = useState("0");
  const [refrigerator, setRefrigerator] = useState("0");
  const [otherLoad, setOtherLoad] = useState("0");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    if (
      Number(lights) < 0 ||
      Number(fans) < 0 ||
      Number(ac) < 0 ||
      Number(refrigerator) < 0 ||
      Number(otherLoad) < 0
    ) {
      setError("Values cannot be negative.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- CALCULATION ---------------- */
  function calculateElectricalLoad(e) {
    e.preventDefault();
    if (!validate()) return;

    // Standard wattage assumptions
    const lightLoad = Number(lights) * 60;
    const fanLoad = Number(fans) * 75;
    const acLoad = Number(ac) * 1500;
    const fridgeLoad = Number(refrigerator) * 300;
    const extraLoad = Number(otherLoad);

    const totalWatts = lightLoad + fanLoad + acLoad + fridgeLoad + extraLoad;

    const totalKW = totalWatts / 1000;

    setResult({
      watts: totalWatts.toFixed(0),
      kw: totalKW.toFixed(2),
    });
  }

  return (
    <section
      className="rounded-xl p-6 space-y-10"
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)",
      }}>
      {/* ================= HEADER ================= */}
      <header>
        <h1 className="text-2xl font-bold mb-1">Electrical Load Calculator</h1>
        <p className="text-sm leading-relaxed">
          Use this Electrical Load Calculator to calculate the total electrical
          load of your house or building in watts and kW.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateElectricalLoad} className="space-y-4">
        <PercentageInput
          label="Number of Lights"
          value={lights}
          onChange={setLights}
          placeholder="10"
        />

        <PercentageInput
          label="Number of Fans"
          value={fans}
          onChange={setFans}
          placeholder="5"
        />

        <PercentageInput
          label="Number of Air Conditioners"
          value={ac}
          onChange={setAC}
          placeholder="1"
        />

        <PercentageInput
          label="Number of Refrigerators"
          value={refrigerator}
          onChange={setRefrigerator}
          placeholder="1"
        />

        <AmountInput
          label="Other Load (Watts)"
          value={otherLoad}
          onChange={setOtherLoad}
          placeholder="500"
        />

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          className="w-full py-2.5 rounded-md font-medium flex items-center justify-center gap-2"
          style={{
            backgroundColor: "var(--primary)",
            color: "#fff",
          }}>
          <Calculator size={18} />
          Calculate Electrical Load
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <div className="grid md:grid-cols-2 gap-4" aria-live="polite">
          <ResultCard
            variant="neutral"
            icon={<BarChart size={20} />}
            label="Total Load"
            value={`${result.watts} Watts`}
          />

          <ResultCard
            variant="primary"
            icon={<BarChart size={20} />}
            label="Total Load"
            value={`${result.kw} kW`}
          />
        </div>
      )}

      {/* ================= SEO BLOG CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          How to Calculate Electrical Load
        </h2>

        <p>
          Electrical load calculation helps determine the total power
          requirement of a building. It is important for selecting the correct
          electrical connection, MCB rating, inverter, or generator capacity.
        </p>

        <h3 className="font-semibold">Electrical Load Calculation Formula</h3>

        <p
          className="font-mono text-xs p-3 rounded"
          style={{ backgroundColor: "var(--surface-2)" }}>
          Total Load (Watts) = Σ (Number of appliances × Wattage) Total Load
          (kW) = Total Watts ÷ 1000
        </p>

        <ul className="list-disc pl-5">
          <li>LED light ≈ 60 W</li>
          <li>Ceiling fan ≈ 75 W</li>
          <li>1 ton AC ≈ 1500 W</li>
          <li>Refrigerator ≈ 300 W</li>
        </ul>

        <h3 className="font-semibold">
          Why Use an Electrical Load Calculator?
        </h3>

        <ul className="list-disc pl-5">
          <li>Avoid overloading electrical systems</li>
          <li>Select correct MCB & wiring size</li>
          <li>Plan inverter or generator capacity</li>
          <li>Useful for homes, offices & shops</li>
        </ul>

        <p>
          This electrical load calculator gives a simple and reliable estimate
          for most residential and commercial buildings.
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ This calculator provides an estimate only. Actual load may vary based
        on appliance rating and usage pattern.
      </aside>
    </section>
  );
}
