import Link from "next/link";

const NetWorthCalculatorArticle = () => {
  return (
    <article className="max-w-4xl mx-auto space-y-12 leading-relaxed text-sm sm:text-base text-[var(--text-main)]">

      {/* ================= HERO ================= */}
      <section className="space-y-6">
        <h1 className="text-3xl font-bold">
          Net Worth Calculator – Calculate Your Total Wealth and Track Financial Progress
        </h1>

        <p>
          Income shows how much you earn. Expenses show how much you spend. But
          neither tells you how financially strong you really are. The only number
          that truly measures your financial health is your net worth.
        </p>

        <p>
          Your net worth represents everything you own minus everything you owe.
          It gives a clear picture of your actual wealth and helps you understand
          whether you are moving forward or falling behind financially.
        </p>

        <p>
          Our Net Worth Calculator helps you instantly calculate your total assets,
          liabilities, and overall wealth so you can track progress and plan
          smarter financial decisions.
        </p>

        <p>
          You may also explore tools like{" "}
          <Link href="/finance/fire-calculator" className="text-blue-600 underline">
            FIRE Calculator
          </Link>
          ,{" "}
          <Link href="/finance/retirement-calculator" className="text-blue-600 underline">
            Retirement Calculator
          </Link>
          ,{" "}
          <Link href="/finance/sip-calculator" className="text-blue-600 underline">
            SIP Calculator
          </Link>
          , or{" "}
          <Link href="/finance/inflation-calculator" className="text-blue-600 underline">
            Inflation Calculator
          </Link>{" "}
          for complete wealth planning.
        </p>
      </section>


      {/* ================= WHAT IS NET WORTH ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">What is Net Worth?</h2>

        <p>
          Net worth is the difference between your total assets and total
          liabilities. It represents the actual value of everything you own after
          subtracting debts.
        </p>

        <div className="p-4 border rounded-lg bg-[var(--surface-2)] font-mono text-sm">
          Net Worth = Total Assets − Total Liabilities
        </div>

        <p>
          If assets are greater than liabilities, you have positive net worth. If
          debts exceed assets, your net worth becomes negative.
        </p>
      </section>


      {/* ================= WHY IMPORTANT ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Why Net Worth is More Important Than Income</h2>

        <p>
          Many people focus only on salary. But a high salary does not always mean
          wealth. Someone earning ₹2 lakh per month with heavy loans may have lower
          net worth than someone earning ₹50,000 but investing wisely.
        </p>

        <p>
          Net worth shows your real financial position.
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Measures true wealth</li>
          <li>Tracks financial growth over time</li>
          <li>Highlights excessive debt</li>
          <li>Helps set realistic goals</li>
          <li>Guides investment decisions</li>
        </ul>
      </section>


      {/* ================= WHAT COUNTS AS ASSETS ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">What Counts as Assets?</h2>

        <p>
          Assets are everything you own that has monetary value.
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Cash and bank balance</li>
          <li>Fixed deposits and recurring deposits</li>
          <li>Mutual funds and SIP investments</li>
          <li>Stocks and bonds</li>
          <li>Gold and other valuables</li>
          <li>Property or real estate</li>
          <li>Business ownership</li>
          <li>Retirement accounts like PPF, EPF, NPS</li>
        </ul>
      </section>


      {/* ================= WHAT COUNTS AS LIABILITIES ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">What Counts as Liabilities?</h2>

        <p>
          Liabilities are debts or financial obligations you must pay.
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Home loan</li>
          <li>Car loan</li>
          <li>Personal loan</li>
          <li>Credit card balances</li>
          <li>Education loan</li>
          <li>Any unpaid debt</li>
        </ul>

        <p>
          These reduce your net worth and slow down wealth building.
        </p>
      </section>


      {/* ================= HOW TO USE ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">How to Use This Net Worth Calculator</h2>

        <ol className="list-decimal pl-6 space-y-2">
          <li>Add all your assets with current market value</li>
          <li>Add all outstanding liabilities</li>
          <li>The calculator automatically subtracts liabilities from assets</li>
          <li>View your total net worth instantly</li>
        </ol>

        <p>
          Repeat this calculation every few months to track improvement.
        </p>
      </section>


      {/* ================= EXAMPLE ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Practical Example</h2>

        <p>
          Suppose:
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Total assets = ₹25,00,000</li>
          <li>Total liabilities = ₹10,00,000</li>
        </ul>

        <p>
          Net worth = ₹25,00,000 − ₹10,00,000 = ₹15,00,000
        </p>

        <p>
          This means your real wealth is ₹15 lakh after clearing all debts.
        </p>
      </section>


      {/* ================= WHY TRACK ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Why You Should Track Net Worth Regularly</h2>

        <p>
          Tracking net worth helps you understand whether your financial decisions
          are working.
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Check if savings are increasing</li>
          <li>Control unnecessary loans</li>
          <li>Stay motivated by progress</li>
          <li>Identify weak areas</li>
          <li>Make smarter investment choices</li>
        </ul>

        <p>
          Even small monthly improvements add up over years.
        </p>
      </section>


      {/* ================= STRATEGIES ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">How to Increase Your Net Worth Faster</h2>

        <ul className="list-disc pl-6 space-y-2">
          <li>Increase savings rate</li>
          <li>Invest consistently through SIPs</li>
          <li>Avoid high-interest debt</li>
          <li>Pay off loans early</li>
          <li>Build multiple income streams</li>
          <li>Invest in appreciating assets</li>
        </ul>

        <p>
          Wealth grows when assets increase and liabilities decrease.
        </p>
      </section>


      {/* ================= NET WORTH VS FIRE ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Net Worth and Financial Independence</h2>

        <p>
          Your net worth is the foundation for bigger goals like retirement or
          FIRE. The higher your net worth, the closer you are to financial freedom.
        </p>

        <p>
          Tracking this number regularly keeps you focused on long-term wealth
          instead of short-term income.
        </p>
      </section>


      {/* ================= MISTAKES ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Common Mistakes to Avoid</h2>

        <ul className="list-disc pl-6 space-y-2">
          <li>Ignoring liabilities</li>
          <li>Overestimating asset value</li>
          <li>Not updating regularly</li>
          <li>Keeping too much cash idle</li>
          <li>Accumulating unnecessary debt</li>
        </ul>
      </section>


      {/* ================= FAQ ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>

        <p><strong>Is higher net worth always better?</strong> Yes, it means stronger financial health.</p>
        <p><strong>How often should I calculate net worth?</strong> Every 3 to 6 months.</p>
        <p><strong>Should I include my house?</strong> Yes, include current market value.</p>
        <p><strong>Is this calculator accurate?</strong> Yes, it follows the standard net worth formula.</p>
      </section>


      {/* ================= FINAL ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Final Thoughts</h2>

        <p>
          Income can fluctuate. Markets can change. But your net worth shows the
          real direction of your financial life.
        </p>

        <p>
          Track it consistently, grow your assets, reduce your debts, and focus on
          building long-term wealth.
        </p>

        <p className="font-medium">
          Measure your wealth. Improve steadily. Achieve financial freedom.
        </p>
      </section>

    </article>
  );
};

export default NetWorthCalculatorArticle;
