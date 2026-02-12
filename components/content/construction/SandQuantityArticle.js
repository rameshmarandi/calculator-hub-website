import Link from "next/link";

const SandQuantityArticle = () => {
  return (
    <article className="max-w-4xl mx-auto space-y-12 leading-relaxed text-sm sm:text-base text-[var(--text-main)]">

      {/* ================= HERO ================= */}
      <section className="space-y-6">
        <h1 className="text-3xl font-bold">
          Sand Quantity Calculator – Estimate Sand Required for Concrete, Plastering and Masonry
        </h1>

        <p>
          Sand is one of the most used materials in construction. It is required
          for concrete, plastering, brickwork, flooring, and many other tasks.
          But estimating sand manually often leads to mistakes, wastage, or last
          minute shortages at the site.
        </p>

        <p>
          This Sand Quantity Calculator helps you instantly calculate how much
          sand you need based on area, thickness, and mix ratio. Instead of
          guessing or relying on rough estimates, you get accurate results using
          standard construction formulas.
        </p>

        <div className="grid grid-cols-2 gap-3 font-medium text-sm">
          <span>✔ Instant Results</span>
          <span>✔ Construction Accurate</span>
          <span>✔ 100% Free</span>
          <span>✔ No Signup Required</span>
        </div>
      </section>


      {/* ================= WHY IMPORTANT ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Why Accurate Sand Estimation Matters</h2>

        <p>
          Sand may look inexpensive per unit, but it is used in large quantities.
          Even small calculation errors can increase costs significantly.
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Prevents work stoppage due to shortage</li>
          <li>Avoids excess material purchase</li>
          <li>Reduces transport costs</li>
          <li>Improves budgeting accuracy</li>
          <li>Keeps construction smooth and efficient</li>
        </ul>

        <p>
          Proper planning always saves more money than emergency purchases later.
        </p>
      </section>


      {/* ================= WHAT YOU CAN CALCULATE ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Where You Can Use This Sand Calculator</h2>

        <p>
          This calculator is useful for almost every common construction activity:
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Concrete slabs and foundations</li>
          <li>Roof casting</li>
          <li>Floor leveling and PCC work</li>
          <li>Wall plastering</li>
          <li>Brick masonry mortar</li>
          <li>Small renovation or repair projects</li>
        </ul>
      </section>


      {/* ================= BASICS ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Understanding the Basics First</h2>

        <p>
          Before calculating sand quantity, it is important to understand three
          simple concepts used in civil engineering.
        </p>

        <h3 className="font-semibold">1. Wet Volume</h3>
        <p>
          Wet volume is the actual volume of concrete or plaster required for the
          work.
        </p>

        <div className="p-3 border rounded font-mono text-sm">
          Volume = Length × Width × Thickness
        </div>

        <h3 className="font-semibold mt-4">2. Dry Volume Factor</h3>
        <p>
          When mixing sand with cement and aggregates, extra material is needed
          due to air gaps and compaction. Engineers use a multiplier of 1.54.
        </p>

        <div className="p-3 border rounded font-mono text-sm">
          Dry Volume = Wet Volume × 1.54
        </div>

        <h3 className="font-semibold mt-4">3. Mix Ratio</h3>
        <p>
          Sand quantity depends on the mix ratio. Different types of work require
          different proportions of cement, sand, and aggregates.
        </p>
      </section>


      {/* ================= FORMULAS ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Sand Quantity Formula Used</h2>

        <div className="p-4 rounded-lg border bg-[var(--surface-2)] font-mono text-sm space-y-2">
          <p>Wet Volume = L × W × T</p>
          <p>Dry Volume = Wet Volume × 1.54</p>
          <p>Sand Volume = Dry Volume × (Sand Part ÷ Total Parts)</p>
        </div>

        <p>
          These formulas are widely used by engineers and contractors for
          professional material estimation.
        </p>
      </section>


      {/* ================= EXAMPLE CONCRETE ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Example 1 – Concrete Slab (1:2:4)</h2>

        <p>
          Suppose you are casting a slab of 10 m × 5 m with 0.1 m thickness using
          a 1:2:4 mix ratio.
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Wet volume = 5 m³</li>
          <li>Dry volume = 7.7 m³</li>
          <li>Total parts = 7</li>
          <li>Sand share = 2/7</li>
          <li>Sand required ≈ 2.2 m³</li>
        </ul>

        <p>
          You should arrange around 2.2 cubic meters of sand for this work.
        </p>
      </section>


      {/* ================= EXAMPLE PLASTER ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Example 2 – Wall Plaster (1:4)</h2>

        <p>
          For 100 m² plastering with 12 mm thickness:
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Wet volume = 1.2 m³</li>
          <li>Dry volume = 1.85 m³</li>
          <li>Sand share = 4/5</li>
          <li>Sand required ≈ 1.48 m³</li>
        </ul>
      </section>


      {/* ================= COMMON RATIOS ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Common Sand Mix Ratios</h2>

        <ul className="list-disc pl-6 space-y-2">
          <li>1:2:4 → RCC concrete</li>
          <li>1:3 → Flooring</li>
          <li>1:4 → Plastering</li>
          <li>1:5 or 1:6 → Brick masonry</li>
        </ul>

        <p>
          Selecting the correct ratio ensures strength, durability, and cost control.
        </p>
      </section>


      {/* ================= PRACTICAL TIPS ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Practical Construction Tips</h2>

        <ul className="list-disc pl-6 space-y-2">
          <li>Add 5 to 10 percent extra for wastage</li>
          <li>Use clean, dust free sand</li>
          <li>Avoid excess moisture content</li>
          <li>Buy from reliable suppliers</li>
          <li>Store properly to prevent contamination</li>
        </ul>
      </section>


      {/* ================= WHO SHOULD USE ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Who Should Use This Calculator?</h2>

        <p>
          This tool is useful for contractors, civil engineers, house owners,
          masons, builders, and anyone planning construction or renovation work.
        </p>
      </section>


      {/* ================= RELATED ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Useful Related Calculators</h2>

        <ul className="list-disc pl-6 space-y-2">
          <li>
            <Link href="/construction/cement-quantity-calculator" className="text-blue-600 underline">
              Cement Quantity Calculator
            </Link>
          </li>
          <li>
            <Link href="/construction/brick-calculator" className="text-blue-600 underline">
              Brick Quantity Calculator
            </Link>
          </li>
          <li>
            <Link href="/finance/gst-calculator" className="text-blue-600 underline">
              GST Calculator
            </Link>
          </li>
        </ul>
      </section>


      {/* ================= FINAL ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Final Thoughts</h2>

        <p>
          Accurate material estimation is the foundation of successful
          construction. Using a reliable sand quantity calculator helps you avoid
          waste, control costs, and finish projects on time.
        </p>

        <p className="font-medium">
          Measure carefully. Estimate accurately. Build efficiently.
        </p>
      </section>

    </article>
  );
};

export default SandQuantityArticle;
