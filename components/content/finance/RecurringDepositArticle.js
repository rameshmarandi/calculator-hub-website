import Link from "next/link";

const RecurringDepositArticle = () => {
  return (
    <article className="max-w-4xl mx-auto space-y-12 leading-relaxed text-sm sm:text-base text-[var(--text-main)]">

      {/* ================= HERO ================= */}
      <section className="space-y-6">
        <h1 className="text-3xl font-bold">
          Recurring Deposit Calculator – Calculate RD Maturity Amount and Interest Instantly
        </h1>

        <p>
          Saving money every month is one of the smartest financial habits you
          can build. But simply keeping money in a savings account earns very low
          interest. A Recurring Deposit, commonly called RD, helps you grow your
          savings faster while keeping your investment completely safe.
        </p>

        <p>
          A Recurring Deposit Calculator allows you to instantly calculate your
          maturity value, total interest earned, and final returns. Instead of
          guessing how much your monthly savings will grow into, you get exact
          numbers within seconds. This helps you plan goals like vacations,
          gadgets, education, or emergency funds confidently.
        </p>

        <p>
          You can also compare other saving tools like the{" "}
          <Link href="/finance/fixed-deposit-calculator" className="text-blue-600 underline">
            Fixed Deposit Calculator
          </Link>
          ,{" "}
          <Link href="/finance/sip-calculator" className="text-blue-600 underline">
            SIP Calculator
          </Link>
          , or{" "}
          <Link href="/finance/compound-interest-calculator" className="text-blue-600 underline">
            Compound Interest Calculator
          </Link>{" "}
          to choose the best option for your financial goals.
        </p>
      </section>


      {/* ================= WHAT IS RD ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">What is a Recurring Deposit?</h2>

        <p>
          A Recurring Deposit is a savings scheme offered by banks and financial
          institutions where you deposit a fixed amount every month for a chosen
          period. At the end of the tenure, you receive your total deposits along
          with guaranteed interest.
        </p>

        <p>
          It works like a disciplined savings plan. Instead of investing a large
          amount at once, you invest small amounts regularly. This makes it ideal
          for salaried individuals, students, and anyone who wants to build
          savings gradually without risk.
        </p>
      </section>


      {/* ================= WHY RD ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Why Choose a Recurring Deposit?</h2>

        <ul className="list-disc pl-6 space-y-2">
          <li>Safe and guaranteed returns</li>
          <li>No market risk</li>
          <li>Easy monthly savings habit</li>
          <li>Low minimum investment</li>
          <li>Fixed interest rate</li>
          <li>Perfect for short and medium term goals</li>
        </ul>

        <p>
          If you want stability instead of stock market fluctuations, RD is a
          reliable choice.
        </p>
      </section>


      {/* ================= WHY CALCULATOR ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Why Use an RD Calculator?</h2>

        <p>
          Many people open an RD without knowing how much they will actually get
          at maturity. This leads to poor planning. A calculator removes all
          guesswork and gives you complete clarity before investing.
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Know exact maturity amount instantly</li>
          <li>Estimate total interest earned</li>
          <li>Compare different monthly deposits</li>
          <li>Choose best tenure easily</li>
          <li>Plan financial goals accurately</li>
          <li>Avoid manual calculation mistakes</li>
        </ul>
      </section>


      {/* ================= HOW TO USE ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">How to Use This Recurring Deposit Calculator</h2>

        <ol className="list-decimal pl-6 space-y-2">
          <li>Enter your monthly deposit amount</li>
          <li>Input the annual interest rate</li>
          <li>Select tenure in months or years</li>
          <li>View maturity value and interest instantly</li>
        </ol>

        <p>
          You can test different deposit amounts or tenures to see how your
          savings grow over time and choose the most comfortable option.
        </p>
      </section>


      {/* ================= HOW RD WORKS ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">How Does a Recurring Deposit Work?</h2>

        <p>
          Every month, you deposit a fixed amount into your RD account. The bank
          calculates interest on each installment and compounds it quarterly or
          monthly depending on the bank policy. At maturity, you receive your
          total deposits plus accumulated interest.
        </p>

        <p>
          Because money is deposited regularly, interest is calculated differently
          from Fixed Deposits. Early deposits earn more interest while later ones
          earn less. The calculator handles this automatically and gives accurate
          results.
        </p>
      </section>


      {/* ================= FORMULA ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">RD Calculation Formula</h2>

        <div className="p-4 rounded-lg border bg-[var(--surface-2)] font-mono text-sm">
          M = P × n + Interest
        </div>

        <p>
          Where P is monthly deposit and n is number of months. Interest is
          calculated using compound interest rules. Since the math is complex,
          using a calculator is the easiest and most accurate way.
        </p>
      </section>


      {/* ================= EXAMPLE ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Example RD Calculation</h2>

        <p>
          Suppose you invest ₹5,000 every month for 3 years at 7 percent interest.
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Total deposits = ₹1,80,000</li>
          <li>Interest earned ≈ ₹20,000+</li>
          <li>Maturity value ≈ ₹2,00,000</li>
        </ul>

        <p>
          This shows how small monthly savings can grow into a meaningful amount
          over time without any risk.
        </p>
      </section>


      {/* ================= FACTORS ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Factors That Affect Your RD Returns</h2>

        <ul className="list-disc pl-6 space-y-2">
          <li>Monthly deposit amount</li>
          <li>Interest rate offered by bank</li>
          <li>Tenure length</li>
          <li>Compounding frequency</li>
          <li>Early withdrawal penalties</li>
        </ul>

        <p>
          Higher deposits, better rates, and longer tenure increase your maturity
          value significantly.
        </p>
      </section>


      {/* ================= MISTAKES ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Common Mistakes to Avoid</h2>

        <ul className="list-disc pl-6 space-y-2">
          <li>Skipping monthly deposits</li>
          <li>Not comparing interest rates</li>
          <li>Choosing very long tenure without need</li>
          <li>Breaking RD early and losing interest</li>
          <li>Ignoring tax implications</li>
        </ul>

        <p>
          Planning carefully ensures you get maximum returns from your savings.
        </p>
      </section>


      {/* ================= RD VS FD ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Recurring Deposit vs Fixed Deposit</h2>

        <ul className="list-disc pl-6 space-y-2">
          <li>RD → Monthly small deposits</li>
          <li>FD → One time lump sum deposit</li>
          <li>RD → Good for salary earners</li>
          <li>FD → Good for large savings</li>
        </ul>

        <p>
          Choose RD if you want to build savings slowly. Choose FD if you already
          have a large amount to invest.
        </p>
      </section>


      {/* ================= FAQ ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>

        <p><strong>Is RD safe?</strong> Yes, it is backed by banks and offers guaranteed returns.</p>
        <p><strong>Can I withdraw early?</strong> Yes, but penalties may apply.</p>
        <p><strong>Is interest taxable?</strong> Yes, RD interest is taxable as income.</p>
        <p><strong>Is this calculator accurate?</strong> Yes, it uses standard banking formulas.</p>
      </section>


      {/* ================= FINAL ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Final Thoughts</h2>

        <p>
          Recurring Deposits are perfect for disciplined saving without risk. They
          help you build money steadily while keeping your capital protected. If
          you prefer safety and stability over market fluctuations, RD is an
          excellent option.
        </p>

        <p>
          Use this Recurring Deposit Calculator to plan your monthly savings,
          estimate maturity value, and achieve your financial goals confidently.
        </p>

        <p className="font-medium">
          Save regularly. Stay consistent. Grow securely.
        </p>
      </section>

    </article>
  );
};

export default RecurringDepositArticle;
