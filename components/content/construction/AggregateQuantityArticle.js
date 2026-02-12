import Link from "next/link";

const AggregateQuantityArticle = () => {
  return (
    <article className="max-w-4xl mx-auto space-y-12 leading-relaxed text-sm sm:text-base text-[var(--text-main)]">

      {/* ================= HERO ================= */}
      <section className="space-y-6">
        <h1 className="text-3xl font-bold">
          Aggregate Quantity Calculator – Estimate Gravel and Stone Required for Concrete Work
        </h1>

        <p>
          Aggregates such as gravel and crushed stone form the largest portion of
          concrete. In most mixes, aggregates make up more than 60 percent of the
          total volume. Because of this, even small estimation mistakes can
          significantly increase your project cost.
        </p>

        <p>
          This Aggregate Quantity Calculator helps you instantly calculate how
          much coarse aggregate you need for slabs, foundations, flooring, or any
          concrete work based on dimensions and mix ratio. You get accurate
          results using standard civil engineering formulas, not guesswork.
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
        <h2 className="text-2xl font-bold">Why Aggregate Estimation Is Important</h2>

        <p>
          Aggregates are heavy, bulky, and transported in large quantities. Buying
          too much increases transport and storage costs, while buying too little
          stops work at the site. Proper quantity calculation helps you plan
          efficiently and avoid unnecessary expenses.
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Prevents construction delays</li>
          <li>Reduces extra transport charges</li>
          <li>Improves budgeting accuracy</li>
          <li>Minimizes wastage</li>
          <li>Ensures smooth workflow on site</li>
        </ul>
      </section>


      {/* ================= WHAT ARE AGGREGATES ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">What Are Aggregates in Concrete?</h2>

        <p>
          Aggregates are materials like crushed stone, gravel, or coarse sand used
          to give strength and bulk to concrete. They reduce shrinkage, increase
          durability, and lower the overall cost of concrete.
        </p>

        <p>
          There are two main types:
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Fine aggregate</strong> – sand</li>
          <li><strong>Coarse aggregate</strong> – gravel or crushed stones</li>
        </ul>

        <p>
          This calculator focuses on estimating coarse aggregate quantity.
        </p>
      </section>


      {/* ================= BASICS ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Understanding the Basics Before Calculation</h2>

        <p>
          Before calculating aggregate quantity, you need to understand how
          concrete volume and mix ratios work.
        </p>

        <h3 className="font-semibold">1. Wet Volume</h3>
        <p>This is the actual size of the concrete structure.</p>

        <div className="p-3 border rounded font-mono text-sm">
          Volume = Length × Width × Thickness
        </div>

        <h3 className="font-semibold mt-4">2. Dry Volume</h3>
        <p>
          Concrete requires extra material to fill air gaps and compaction loss.
          Engineers multiply by 1.54.
        </p>

        <div className="p-3 border rounded font-mono text-sm">
          Dry Volume = Wet Volume × 1.54
        </div>

        <h3 className="font-semibold mt-4">3. Mix Ratio</h3>
        <p>
          Mix ratio defines how much cement, sand, and aggregate are used. Example:
          1:2:4 means 1 part cement, 2 parts sand, and 4 parts aggregate.
        </p>
      </section>


      {/* ================= FORMULAS ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Aggregate Quantity Formula Used</h2>

        <div className="p-4 rounded-lg border bg-[var(--surface-2)] font-mono text-sm space-y-2">
          <p>Wet Volume = L × W × T</p>
          <p>Dry Volume = Wet Volume × 1.54</p>
          <p>Aggregate Volume = Dry Volume × (Aggregate Part ÷ Total Parts)</p>
        </div>

        <p>
          These are standard formulas used by contractors and civil engineers for
          accurate material planning.
        </p>
      </section>


      {/* ================= EXAMPLE SLAB ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Example 1 – Concrete Slab (1:2:4 Mix)</h2>

        <p>
          Suppose you are casting a slab of 10 m × 5 m with 0.1 m thickness.
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Wet volume = 5 m³</li>
          <li>Dry volume = 7.7 m³</li>
          <li>Total parts = 7</li>
          <li>Aggregate share = 4/7</li>
          <li>Aggregate required ≈ 4.4 m³</li>
        </ul>

        <p>
          You should arrange around 4.4 cubic meters of coarse aggregate for this slab.
        </p>
      </section>


      {/* ================= EXAMPLE FLOORING ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Example 2 – Flooring Work (1:3:6 Mix)</h2>

        <p>
          For larger flooring or PCC work:
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Dry volume = 10 m³</li>
          <li>Total parts = 10</li>
          <li>Aggregate share = 6/10</li>
          <li>Aggregate required ≈ 6 m³</li>
        </ul>
      </section>


      {/* ================= COMMON RATIOS ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Common Concrete Mix Ratios</h2>

        <ul className="list-disc pl-6 space-y-2">
          <li>1:2:4 → RCC slabs and beams</li>
          <li>1:1.5:3 → stronger concrete</li>
          <li>1:3:6 → PCC and flooring</li>
          <li>1:4:8 → foundation filling</li>
        </ul>

        <p>
          Higher aggregate proportion lowers cost but reduces strength. Choose wisely.
        </p>
      </section>


      {/* ================= PRACTICAL TIPS ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Practical Construction Tips</h2>

        <ul className="list-disc pl-6 space-y-2">
          <li>Add 5 to 10 percent extra for wastage</li>
          <li>Use clean, graded aggregates</li>
          <li>Avoid muddy or dusty stones</li>
          <li>Store separately from soil</li>
          <li>Measure properly before mixing</li>
        </ul>
      </section>


      {/* ================= WHO SHOULD USE ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Who Should Use This Calculator?</h2>

        <p>
          This tool is ideal for contractors, builders, civil engineers, house
          owners, and anyone planning concrete construction or renovation work.
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
            <Link href="/construction/sand-quantity-calculator" className="text-blue-600 underline">
              Sand Quantity Calculator
            </Link>
          </li>
          <li>
            <Link href="/construction/brick-calculator" className="text-blue-600 underline">
              Brick Quantity Calculator
            </Link>
          </li>
        </ul>
      </section>


      {/* ================= FINAL ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Final Thoughts</h2>

        <p>
          Aggregates form the bulk of concrete, so proper quantity estimation is
          essential for cost control and smooth construction. Using a reliable
          aggregate calculator helps you plan materials accurately and avoid last
          minute issues.
        </p>

        <p className="font-medium">
          Measure precisely. Estimate smartly. Build efficiently.
        </p>
      </section>

    </article>
  );
};

export default AggregateQuantityArticle;
