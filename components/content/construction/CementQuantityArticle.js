import Link from "next/link";

const CementQuantityArticle = () => {
  return (
    <article className="max-w-4xl mx-auto space-y-12 leading-relaxed text-sm sm:text-base text-[var(--text-main)]">

      {/* ================= HERO ================= */}
      <section className="space-y-6">
        <h1 className="text-3xl font-bold">
          Cement Quantity Calculator – Estimate Cement Bags Required for Slabs, Plastering and Flooring
        </h1>

        <p>
          Construction projects often face delays and extra expenses simply because
          materials were not estimated correctly. Cement is one of the most critical
          and costly materials in any building work. Ordering too little stops the
          project midway, while ordering too much wastes money and storage space.
        </p>

        <p>
          This Cement Quantity Calculator helps you instantly calculate how many
          cement bags are required for concrete slabs, plastering, brickwork, or
          flooring based on dimensions and mix ratio. Instead of guessing, you get
          accurate results in seconds.
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
        <h2 className="text-2xl font-bold">Why Cement Quantity Estimation Is Important</h2>

        <p>
          Cement forms the base strength of any structure. Whether you are building
          a small home, renovating a room, or casting a full concrete slab, correct
          estimation ensures smooth workflow and cost control.
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Prevents material shortages during work</li>
          <li>Reduces unnecessary spending</li>
          <li>Improves budgeting accuracy</li>
          <li>Minimizes wastage</li>
          <li>Keeps projects on schedule</li>
        </ul>
      </section>

      {/* ================= WHAT YOU CAN CALCULATE ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">What This Calculator Helps You Estimate</h2>

        <p>You can use this tool for almost every common construction task:</p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Roof slabs and foundations</li>
          <li>Flooring and PCC work</li>
          <li>Wall plastering</li>
          <li>Brick masonry mortar</li>
          <li>Home renovation and repairs</li>
        </ul>
      </section>

      {/* ================= BASICS ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Understanding the Basics Before Calculation</h2>

        <p>
          Cement calculation involves three simple concepts. Once you understand
          them, estimating materials becomes very easy.
        </p>

        <h3 className="font-semibold">1. Wet Volume</h3>
        <p>
          Wet volume is the actual size of the structure you want to build.
        </p>

        <div className="p-3 border rounded font-mono text-sm">
          Volume = Length × Width × Thickness
        </div>

        <h3 className="font-semibold mt-4">2. Dry Volume Factor</h3>
        <p>
          Concrete requires extra material to fill gaps between sand and aggregates.
          Engineers multiply wet volume by 1.54 to account for this.
        </p>

        <div className="p-3 border rounded font-mono text-sm">
          Dry Volume = Wet Volume × 1.54
        </div>

        <h3 className="font-semibold mt-4">3. Mix Ratio</h3>
        <p>
          The mix ratio determines how much cement is used compared to sand and
          aggregates. Different tasks use different ratios.
        </p>
      </section>

      {/* ================= FORMULAS ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Cement Quantity Formula Used</h2>

        <div className="p-4 rounded-lg border bg-[var(--surface-2)] font-mono text-sm space-y-2">
          <p>Wet Volume = L × W × T</p>
          <p>Dry Volume = Wet Volume × 1.54</p>
          <p>Cement Volume = Dry Volume × (Cement Part / Total Parts)</p>
          <p>1 Cement Bag ≈ 0.035 m³</p>
          <p>Bags Required = Cement Volume ÷ 0.035</p>
        </div>

        <p>
          These formulas are standard civil engineering calculations used across
          construction sites worldwide.
        </p>
      </section>

      {/* ================= EXAMPLE SLAB ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Example 1 – Slab Construction (1:2:4)</h2>

        <p>
          Suppose you are casting a slab of 10 m × 5 m with 0.1 m thickness.
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Wet volume = 5 m³</li>
          <li>Dry volume = 7.7 m³</li>
          <li>Cement share = 1/7</li>
          <li>Cement required ≈ 1.1 m³</li>
          <li>Bags required ≈ 32 bags</li>
        </ul>
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
          <li>Cement required ≈ 0.37 m³</li>
          <li>Bags required ≈ 11 bags</li>
        </ul>
      </section>

      {/* ================= RATIOS ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Common Mix Ratios and Their Uses</h2>

        <ul className="list-disc pl-6 space-y-2">
          <li>1:2:4 → RCC slabs and beams</li>
          <li>1:3 → Flooring</li>
          <li>1:4 → Plastering</li>
          <li>1:5 or 1:6 → Brickwork</li>
        </ul>

        <p>
          Choosing the right ratio balances strength and cost efficiency.
        </p>
      </section>

      {/* ================= PRACTICAL TIPS ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Practical Construction Tips</h2>

        <ul className="list-disc pl-6 space-y-2">
          <li>Add 5 to 10 percent extra for wastage</li>
          <li>Store cement in dry conditions</li>
          <li>Buy fresh stock only</li>
          <li>Measure thickness carefully</li>
          <li>Follow proper curing after pouring</li>
        </ul>
      </section>

      {/* ================= WHO SHOULD USE ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Who Should Use This Calculator?</h2>

        <p>
          This calculator is ideal for house owners, contractors, civil engineers,
          masons, builders, and anyone planning construction or renovation.
        </p>
      </section>

      {/* ================= RELATED ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Useful Related Calculators</h2>

        <ul className="list-disc pl-6 space-y-2">
          <li><Link href="/construction/brick-calculator" className="text-blue-600 underline">Brick Quantity Calculator</Link></li>
          <li><Link href="/construction/paint-calculator" className="text-blue-600 underline">Paint Calculator</Link></li>
          <li><Link href="/finance/gst-calculator" className="text-blue-600 underline">GST Calculator</Link></li>
        </ul>
      </section>

      {/* ================= FINAL ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Final Thoughts</h2>

        <p>
          Accurate material planning reduces waste, saves money, and ensures smooth
          project execution. Always calculate cement quantity before starting any
          construction task to avoid last minute problems.
        </p>

        <p className="font-medium">
          Measure correctly. Estimate smartly. Build efficiently.
        </p>
      </section>

    </article>
  );
};

export default CementQuantityArticle;
