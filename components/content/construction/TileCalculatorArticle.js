import Link from "next/link";

const TileCalculatorArticle = () => {
  return (
    <article className="max-w-4xl mx-auto space-y-12 leading-relaxed text-sm sm:text-base text-[var(--text-main)]">

      {/* ================= HERO ================= */}
      <section className="space-y-6">
        <h1 className="text-3xl font-bold">
          Tile Calculator – Estimate Floor and Wall Tiles Required Instantly
        </h1>

        <p>
          Planning tile installation without proper measurement often leads to two
          common problems. Either you buy fewer tiles and run out in the middle of
          work, or you buy too many and waste money on extra boxes that are never used.
        </p>

        <p>
          This Tile Calculator helps you accurately estimate how many tiles you
          need for flooring or wall installation based on room size and tile
          dimensions. It removes guesswork and gives you instant results so you can
          plan purchases confidently.
        </p>

        <div className="grid grid-cols-2 gap-3 font-medium text-sm">
          <span>✔ Instant Results</span>
          <span>✔ Accurate Area Calculation</span>
          <span>✔ 100% Free Tool</span>
          <span>✔ No Signup Required</span>
        </div>
      </section>


      {/* ================= WHY IMPORTANT ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Why Tile Quantity Estimation Is Important</h2>

        <p>
          Tiles are purchased in boxes and batches. If you run short, you may not
          find the same shade or design later. If you overbuy, you waste money and
          storage space. Accurate planning avoids both problems.
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Prevents shortage during installation</li>
          <li>Avoids unnecessary extra purchases</li>
          <li>Saves money and time</li>
          <li>Ensures consistent tile color and batch</li>
          <li>Improves renovation planning</li>
        </ul>
      </section>


      {/* ================= WHERE USED ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Where You Can Use This Tile Calculator</h2>

        <p>
          This calculator works for almost every type of tiling project:
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Living room and bedroom flooring</li>
          <li>Kitchen floors and walls</li>
          <li>Bathroom walls and shower areas</li>
          <li>Office and commercial spaces</li>
          <li>Outdoor patios and balconies</li>
        </ul>
      </section>


      {/* ================= HOW WORKS ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">How This Tile Calculator Works</h2>

        <p>
          The tool calculates the total surface area and divides it by the area of
          a single tile. It then adds extra tiles for cutting and wastage.
        </p>

        <ol className="list-decimal pl-6 space-y-2">
          <li>Enter room length and width</li>
          <li>Enter tile length and width</li>
          <li>Choose wastage percentage</li>
          <li>Get required number of tiles instantly</li>
        </ol>
      </section>


      {/* ================= FORMULA ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Tile Calculation Formula Used</h2>

        <div className="p-4 rounded-lg border bg-[var(--surface-2)] font-mono text-sm space-y-2">
          <p>Room Area = Length × Width</p>
          <p>Tile Area = Tile Length × Tile Width</p>
          <p>Tiles Needed = Room Area ÷ Tile Area</p>
          <p>Final Tiles = Tiles Needed + Wastage</p>
        </div>

        <p>
          These simple formulas provide accurate and professional estimates used
          by contractors and interior designers.
        </p>
      </section>


      {/* ================= EXAMPLE 1 ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Example 1 – Floor Tiling</h2>

        <p>
          Suppose your room is 10 ft × 10 ft and your tile size is 2 ft × 2 ft.
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Room area = 100 sq ft</li>
          <li>Tile area = 4 sq ft</li>
          <li>Tiles required = 25</li>
          <li>Add 10% wastage → 28 tiles</li>
        </ul>

        <p>
          You should purchase at least 28 to 30 tiles for safety.
        </p>
      </section>


      {/* ================= EXAMPLE 2 ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Example 2 – Wall Tiling</h2>

        <p>
          Bathroom wall 8 ft × 7 ft with 1 ft × 1 ft tiles:
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Area = 56 sq ft</li>
          <li>Tiles needed = 56</li>
          <li>Add 15% wastage → 65 tiles</li>
        </ul>
      </section>


      {/* ================= WASTAGE ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Why Wastage Percentage Matters</h2>

        <p>
          Tile cutting, breakage, and design alignment always cause losses. That is
          why professionals add extra tiles.
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>5% → simple straight layout</li>
          <li>10% → normal flooring</li>
          <li>15% → diagonal layout</li>
          <li>20% → complex patterns</li>
        </ul>

        <p>
          Never skip wastage or you will run short during installation.
        </p>
      </section>


      {/* ================= COMMON SIZES ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Common Tile Sizes</h2>

        <ul className="list-disc pl-6 space-y-2">
          <li>300 × 300 mm</li>
          <li>600 × 600 mm</li>
          <li>800 × 800 mm</li>
          <li>2 ft × 2 ft</li>
          <li>1 ft × 2 ft wall tiles</li>
        </ul>

        <p>
          Larger tiles mean fewer pieces but require precise leveling.
        </p>
      </section>


      {/* ================= PRACTICAL TIPS ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Practical Installation Tips</h2>

        <ul className="list-disc pl-6 space-y-2">
          <li>Buy all tiles from the same batch</li>
          <li>Store extra tiles for future repairs</li>
          <li>Measure twice before cutting</li>
          <li>Choose correct adhesive</li>
          <li>Always keep spare pieces</li>
        </ul>
      </section>


      {/* ================= WHO SHOULD USE ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Who Should Use This Tool?</h2>

        <p>
          This calculator is useful for homeowners, interior designers, contractors,
          builders, and anyone planning a tiling or renovation project.
        </p>
      </section>


      {/* ================= RELATED ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Useful Related Calculators</h2>

        <ul className="list-disc pl-6 space-y-2">
          <li>
            <Link href="/construction/paint-calculator" className="text-blue-600 underline">
              Paint Calculator
            </Link>
          </li>
          <li>
            <Link href="/construction/cement-quantity-calculator" className="text-blue-600 underline">
              Cement Quantity Calculator
            </Link>
          </li>
          <li>
            <Link href="/construction/sand-quantity-calculator" className="text-blue-600 underline">
              Sand Quantity Calculator
            </Link>
          </li>
        </ul>
      </section>


      {/* ================= FINAL ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Final Thoughts</h2>

        <p>
          Accurate tile estimation saves money, reduces waste, and keeps your
          renovation smooth. Always calculate properly before purchasing tiles to
          avoid last minute problems and mismatched batches.
        </p>

        <p className="font-medium">
          Measure carefully. Calculate accurately. Install confidently.
        </p>
      </section>

    </article>
  );
};

export default TileCalculatorArticle;
