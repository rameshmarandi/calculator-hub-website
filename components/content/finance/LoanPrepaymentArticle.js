import Link from "next/link";

const LoanPrepaymentArticle = () => {
  return (
    <article className="max-w-4xl mx-auto space-y-14 leading-relaxed text-sm sm:text-base text-[var(--text-main)]">

      {/* ================= HERO ================= */}
      <section className="space-y-6">
        <h1 className="text-3xl font-bold">
          Loan Prepayment Calculator – Check How Much Interest You Can Save by Paying Early
        </h1>

        <p>
          Paying a loan for the full tenure is not always the smartest financial move.
          Banks earn most of their profit from interest, and the longer your loan runs,
          the more you pay.
        </p>

        <p>
          Making a part payment or closing your loan early can save thousands or even lakhs
          in interest. This Loan Prepayment Calculator helps you instantly estimate how much
          money and time you can save before making that decision.
        </p>

        <div className="grid grid-cols-2 gap-3 font-medium text-sm">
          <span>✔ Instant Savings Calculation</span>
          <span>✔ Accurate Bank Formula</span>
          <span>✔ 100% Free Tool</span>
          <span>✔ No Registration Needed</span>
        </div>
      </section>


      {/* ================= WHY USE ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Why Use a Loan Prepayment Calculator?</h2>

        <p>
          Many borrowers continue paying EMIs without realizing how much interest they are losing
          every month. Even a small extra payment can reduce your tenure and interest drastically.
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Know exact interest savings instantly</li>
          <li>See how many months you can reduce</li>
          <li>Compare part payment vs full closure</li>
          <li>Plan smarter use of bonuses or savings</li>
          <li>Become debt free faster</li>
        </ul>
      </section>


      {/* ================= WHAT IS PREPAYMENT ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">What Is Loan Prepayment?</h2>

        <p>
          Loan prepayment means paying extra money toward your loan before the scheduled
          tenure ends. It reduces the outstanding principal, which directly lowers the interest charged.
        </p>

        <p>
          There are two common options:
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Part Prepayment</strong> – pay a lump sum and continue EMI</li>
          <li><strong>Full Foreclosure</strong> – close the entire loan early</li>
        </ul>

        <p>
          Both options reduce your total interest cost significantly.
        </p>
      </section>


      {/* ================= HOW IT WORKS ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">How This Calculator Works</h2>

        <p>
          The calculator recalculates your loan after reducing the outstanding principal
          with your extra payment.
        </p>

        <ol className="list-decimal pl-6 space-y-2">
          <li>Enter your current loan amount</li>
          <li>Add interest rate and remaining tenure</li>
          <li>Enter prepayment amount</li>
          <li>See new EMI or reduced tenure instantly</li>
        </ol>

        <p>
          You can test different prepayment values to find the most efficient strategy.
        </p>
      </section>


      {/* ================= WHY IT SAVES ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Why Prepayment Saves So Much Money</h2>

        <p>
          In most loans, early EMIs consist mainly of interest. This means reducing principal early
          cuts a large portion of future interest.
        </p>

        <p className="font-medium">
          Earlier you prepay → bigger your savings.
        </p>
      </section>


      {/* ================= EXAMPLE ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Example Scenario</h2>

        <p>
          Suppose you have a ₹10,00,000 loan at 9 percent for 5 years and make a ₹2,00,000 prepayment in year one.
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Total interest reduces significantly</li>
          <li>Loan tenure shortens by several months</li>
          <li>You may save over ₹80,000 to ₹1,00,000 in interest</li>
        </ul>

        <p>
          This is money that would otherwise go to the bank.
        </p>
      </section>


      {/* ================= WHEN TO PREPAY ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">When Should You Consider Prepayment?</h2>

        <ul className="list-disc pl-6 space-y-2">
          <li>When you receive a bonus or extra income</li>
          <li>When interest rates are high</li>
          <li>During early loan years</li>
          <li>If you want faster debt freedom</li>
        </ul>

        <p>
          Avoid prepayment only if there are heavy foreclosure charges or if you need liquidity for emergencies.
        </p>
      </section>


      {/* ================= TIPS ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Smart Prepayment Tips</h2>

        <ul className="list-disc pl-6 space-y-2">
          <li>Always check prepayment penalties first</li>
          <li>Reduce tenure instead of EMI for maximum savings</li>
          <li>Prepay early rather than late</li>
          <li>Use tax free bonuses or incentives</li>
        </ul>
      </section>


      {/* ================= INTERNAL LINKS ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Related Financial Tools</h2>

        <ul className="list-disc pl-6 space-y-2">
          <li><Link href="/finance/emi-calculator" className="text-blue-600 underline">EMI Calculator</Link></li>
          <li><Link href="/finance/loan-eligibility-calculator" className="text-blue-600 underline">Loan Eligibility Calculator</Link></li>
          <li><Link href="/finance/home-loan-emi-calculator" className="text-blue-600 underline">Home Loan EMI Calculator</Link></li>
        </ul>
      </section>


      {/* ================= FINAL ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Final Thoughts</h2>

        <p>
          Staying in debt longer than necessary costs real money. Prepaying even small amounts at the right time
          can save large interest and help you become financially independent faster.
        </p>

        <p className="font-medium">
          Pay early. Save more. Close your loan sooner.
        </p>
      </section>

    </article>
  );
};

export default LoanPrepaymentArticle;
