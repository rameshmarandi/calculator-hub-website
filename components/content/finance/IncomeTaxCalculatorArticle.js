import Link from "next/link";

const IncomeTaxCalculatorArticle = () => {
  return (
    <article className="max-w-4xl mx-auto space-y-12 leading-relaxed text-sm sm:text-base text-[var(--text-main)]">
      {/* ================= HERO ================= */}
      <section className="space-y-6">
        <h1 className="text-3xl font-bold">
          Income Tax Calculator India – Calculate Your Tax Liability Instantly
          (Old vs New Regime)
        </h1>

        <p>
          Paying income tax is a legal responsibility for every earning
          individual in India. But many people still calculate tax manually or
          depend on guesswork. This often leads to overpayment, underpayment, or
          poor tax planning.
        </p>

        <p>
          An Income Tax Calculator helps you instantly estimate how much tax you
          actually owe based on your income, deductions, and tax regime. Instead
          of confusion, you get clear numbers within seconds.
        </p>

        <p>
          This tool follows the latest rules defined by the <strong></strong>{" "}
          and allows you to compare both Old Regime and New Regime so you can
          legally minimize your tax burden.
        </p>
      </section>

      {/* ================= WHAT IS ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">
          What is an Income Tax Calculator?
        </h2>

        <p>
          An Income Tax Calculator is a financial tool that computes your annual
          tax liability using your salary or business income along with
          deductions and exemptions allowed by Indian tax laws.
        </p>

        <p>It shows:</p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Total taxable income</li>
          <li>Tax payable under old regime</li>
          <li>Tax payable under new regime</li>
          <li>Which regime saves more money</li>
        </ul>
      </section>

      {/* ================= WHY USE ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">
          Why You Must Calculate Tax Before Filing
        </h2>

        <p>
          Many salaried employees simply accept whatever tax is deducted through
          TDS. This is a mistake. Without planning, you may pay thousands or
          even lakhs more than necessary.
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Avoid paying extra tax</li>
          <li>Choose better tax regime</li>
          <li>Plan investments smartly</li>
          <li>Maximize deductions</li>
          <li>Improve take-home salary</li>
        </ul>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">How This Calculator Works</h2>

        <ol className="list-decimal pl-6 space-y-2">
          <li>Enter your annual income</li>
          <li>Add deductions like 80C, 80D, HRA etc (for old regime)</li>
          <li>Select tax regime or compare both</li>
          <li>View total tax payable instantly</li>
        </ol>

        <p>
          The calculator automatically applies slab rates and cess according to
          the current financial year.
        </p>
      </section>

      {/* ================= FORMULA ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Income Tax Calculation Formula</h2>

        <div className="p-4 border rounded-lg bg-[var(--surface-2)] font-mono text-sm">
          Taxable Income = Gross Income − Deductions
          <br />
          Tax = Slab based tax + 4% Health & Education Cess
        </div>
      </section>

      {/* ================= OLD VS NEW ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">
          Old Regime vs New Regime Explained
        </h2>

        <h3 className="font-semibold">Old Regime</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Higher tax rates</li>
          <li>Many deductions allowed</li>
          <li>Best for heavy investors</li>
        </ul>

        <h3 className="font-semibold mt-4">New Regime</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Lower tax rates</li>
          <li>Almost no deductions</li>
          <li>Simpler calculation</li>
          <li>Good for salaried people without investments</li>
        </ul>

        <p>
          The right choice depends on your financial behavior. Always calculate
          both before filing returns.
        </p>
      </section>

      {/* ================= COMMON DEDUCTIONS ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">
          Common Tax Deductions (Old Regime)
        </h2>

        <ul className="list-disc pl-6 space-y-2">
          <li>80C – PPF, ELSS, LIC, EPF (up to ₹1.5 lakh)</li>
          <li>80D – Health insurance premium</li>
          <li>Home loan interest</li>
          <li>HRA exemption</li>
          <li>NPS contribution</li>
          <li>Education loan interest</li>
        </ul>
      </section>

      {/* ================= EXAMPLE ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Practical Example</h2>

        <p>Suppose your annual income is ₹10,00,000.</p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Deductions = ₹2,00,000</li>
          <li>Taxable income = ₹8,00,000</li>
          <li>Tax calculated using slab rates</li>
          <li>Add 4% cess</li>
        </ul>

        <p>
          The calculator performs all these steps instantly and shows final tax
          payable.
        </p>
      </section>

      {/* ================= TIPS ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">
          Smart Ways to Reduce Your Tax Legally
        </h2>

        <ul className="list-disc pl-6 space-y-2">
          <li>Invest full 80C limit</li>
          <li>Buy health insurance</li>
          <li>Use NPS for extra deduction</li>
          <li>Claim HRA properly</li>
          <li>Choose best tax regime</li>
        </ul>
      </section>

      {/* ================= LINKS ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Useful Financial Tools</h2>

        <p>You may also use:</p>

        <ul className="list-disc pl-6 space-y-2">
          <li>
            <Link
              href="/finance/sip-calculator"
              className="text-blue-600 underline">
              SIP Calculator
            </Link>
          </li>
          <li>
            <Link
              href="/finance/emi-calculator"
              className="text-blue-600 underline">
              EMI Calculator
            </Link>
          </li>
          <li>
            <Link
              href="/finance/net-worth-calculator"
              className="text-blue-600 underline">
              Net Worth Calculator
            </Link>
          </li>
          <li>
            <Link
              href="/finance/retirement-planning-calculator"
              className="text-blue-600 underline">
              Retirement Planning Calculator
            </Link>
          </li>
        </ul>
      </section>

      {/* ================= FAQ ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>

        <p>
          <strong>Is this calculator accurate?</strong> Yes. It uses official
          slab rates.
        </p>
        <p>
          <strong>Which regime is better?</strong> Depends on your deductions.
        </p>
        <p>
          <strong>Do I still need to file ITR?</strong> Yes. Calculator only
          estimates tax.
        </p>
        <p>
          <strong>Can tax rules change yearly?</strong> Yes. Always use updated
          tools.
        </p>
      </section>

      {/* ================= FINAL ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Final Thoughts</h2>

        <p>
          Income tax planning should never be an afterthought. Calculating early
          gives you control, helps you invest wisely, and increases your
          take-home income.
        </p>

        <p className="font-medium">
          Calculate first. Plan smartly. Pay only what you legally owe.
        </p>
      </section>
    </article>
  );
};

export default IncomeTaxCalculatorArticle;
