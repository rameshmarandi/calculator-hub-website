"use client";

import { useState } from "react";
import { Calculator, BarChart } from "lucide-react";

import { AmountInput } from "../../inputs/AmountInput";
import { PercentageInput } from "../../inputs/PercentageInput";
import { ResultCard } from "../../ResultCard";

export default function TileCalculator() {
  const [floorLength, setFloorLength] = useState("");
  const [floorWidth, setFloorWidth] = useState("");
  const [tileLength, setTileLength] = useState("");
  const [tileWidth, setTileWidth] = useState("");
  const [wastage, setWastage] = useState("10");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  /* ---------------- VALIDATION ---------------- */
  function validate() {
    if (!floorLength || Number(floorLength) <= 0) {
      setError("Please enter valid floor length.");
      return false;
    }

    if (!floorWidth || Number(floorWidth) <= 0) {
      setError("Please enter valid floor width.");
      return false;
    }

    if (!tileLength || Number(tileLength) <= 0) {
      setError("Please enter valid tile length.");
      return false;
    }

    if (!tileWidth || Number(tileWidth) <= 0) {
      setError("Please enter valid tile width.");
      return false;
    }

    if (Number(wastage) < 0) {
      setError("Wastage percentage cannot be negative.");
      return false;
    }

    setError("");
    return true;
  }

  /* ---------------- CALCULATION ---------------- */
  function calculateTiles(e) {
    e.preventDefault();
    if (!validate()) return;

    const floorArea =
      Number(floorLength) * Number(floorWidth);

    const tileArea =
      (Number(tileLength) / 1000) *
      (Number(tileWidth) / 1000); // mm → meter

    const tilesRequired = floorArea / tileArea;
    const wastageTiles =
      (tilesRequired * Number(wastage)) / 100;

    const totalTiles = Math.ceil(
      tilesRequired + wastageTiles
    );

    setResult({
      floorArea: floorArea.toFixed(2),
      tileArea: tileArea.toFixed(3),
      tiles: totalTiles,
    });
  }

  return (
    <section
      className="rounded-xl p-6 space-y-10"
      style={{
        backgroundColor: "var(--surface)",
        border: "1px solid var(--border)",
      }}
    >
      {/* ================= HEADER ================= */}
      <header>
        <h1 className="text-2xl font-bold mb-1">
          Tile Calculator
        </h1>
        <p className="text-sm leading-relaxed">
          Use this Tile Calculator to estimate the number of tiles
          required for flooring or wall tiling projects.
        </p>
      </header>

      {/* ================= FORM ================= */}
      <form onSubmit={calculateTiles} className="space-y-4">
        <AmountInput
          label="Floor Length (meters)"
          value={floorLength}
          onChange={setFloorLength}
          placeholder="5"
        />

        <AmountInput
          label="Floor Width (meters)"
          value={floorWidth}
          onChange={setFloorWidth}
          placeholder="4"
        />

        <AmountInput
          label="Tile Length (mm)"
          value={tileLength}
          onChange={setTileLength}
          placeholder="600"
        />

        <AmountInput
          label="Tile Width (mm)"
          value={tileWidth}
          onChange={setTileWidth}
          placeholder="600"
        />

        <PercentageInput
          label="Wastage (%)"
          value={wastage}
          onChange={setWastage}
          placeholder="10"
        />

        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        <button
          type="submit"
          className="w-full py-2.5 rounded-md font-medium flex items-center justify-center gap-2"
          style={{
            backgroundColor: "var(--primary)",
            color: "#fff",
          }}
        >
          <Calculator size={18} />
          Calculate Tiles
        </button>
      </form>

      {/* ================= RESULT ================= */}
      {result && (
        <div className="grid md:grid-cols-3 gap-4" aria-live="polite">
          <ResultCard
            variant="neutral"
            icon={<BarChart size={20} />}
            label="Floor Area"
            value={`${result.floorArea} m²`}
          />

          <ResultCard
            variant="neutral"
            icon={<BarChart size={20} />}
            label="Tile Area"
            value={`${result.tileArea} m²`}
          />

          <ResultCard
            variant="primary"
            icon={<BarChart size={20} />}
            label="Tiles Required"
            value={`${result.tiles} tiles`}
          />
        </div>
      )}

      {/* ================= SEO BLOG CONTENT ================= */}
      <article className="space-y-4 text-sm leading-relaxed">
        <h2 className="font-semibold text-base">
          How to Calculate Number of Tiles
        </h2>

        <p>
          Tile calculation helps estimate the total number of tiles
          required for flooring or wall tiling before starting the
          work. Accurate calculation avoids shortage and unnecessary
          extra cost.
        </p>

        <h3 className="font-semibold">
          Tile Calculation Formula
        </h3>

        <p
          className="font-mono text-xs p-3 rounded"
          style={{ backgroundColor: "var(--surface-2)" }}
        >
          Floor Area = Length × Width  
          Tile Area = Tile Length × Tile Width  
          Tiles Required = Floor Area ÷ Tile Area  
          Total Tiles = Tiles Required + Wastage
        </p>

        <ul className="list-disc pl-5">
          <li>Tile sizes are usually in millimeters</li>
          <li>10% wastage is recommended for cutting & breakage</li>
          <li>Diagonal laying may require higher wastage</li>
        </ul>

        <h3 className="font-semibold">
          Why Use a Tile Calculator?
        </h3>

        <ul className="list-disc pl-5">
          <li>Accurate tile estimation</li>
          <li>Helps plan flooring budget</li>
          <li>Reduces material wastage</li>
          <li>Useful for homes & commercial projects</li>
        </ul>

        <p>
          This tile calculator provides a quick and reliable estimate
          for most flooring and wall tiling projects.
        </p>
      </article>

      {/* ================= DISCLAIMER ================= */}
      <aside className="text-xs text-muted">
        ⚠️ This calculator provides an estimate only. Actual tile
        requirement may vary based on layout and cutting pattern.
      </aside>
    </section>
  );
}
