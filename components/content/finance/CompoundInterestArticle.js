import Link from "next/link";

const CompoundInterestArticle = () => {
  return (
    <article className="max-w-4xl mx-auto space-y-12 leading-relaxed text-sm sm:text-base text-[var(--text-main)]">

      {/* ================= HERO ================= */}
      <section className="space-y-6">
        <h1 className="text-3xl font-bold">
          Compound Interest Calculator – See How Your Money Grows Over Time
        </h1>

        <p>
          Compound interest is one of the most powerful concepts in finance. It
          is the reason why investments grow faster and loans become expensive if
          not managed properly. Whether you are saving money, investing in mutual
          funds, or taking a loan, understanding compound interest is essential.
        </p>

        <p>
          A Compound Interest Calculator helps you instantly calculate the future
          value of your money. By entering your principal amount, interest rate,
          and time period, you can see how much your money will grow with
          compounding. This helps you make smarter financial decisions.
        </p>

        <p>
          You can also explore tools like the{" "}
          <Link href="/finance/sip-calculator" className="text-blue-600 underline">
            SIP Calculator
          </Link>
          ,{" "}
          <Link href="/finance/lumpsum-investment-calculator" className="text-blue-600 underline">
            Lumpsum Investment Calculator
          </Link>
          , or{" "}
          <Link href="/finance/fixed-deposit-calculator" className="text-blue-600 underline">
            FD Calculator
          </Link>{" "}
          to plan your savings and investments better.
        </p>
      </section>


      {/* ================= WHAT IS CI ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">What is Compound Interest?</h2>

        <p>
          Compound interest means earning interest not only on your original
          investment but also on the interest you have already earned. In simple
          words, your money earns money, and that money keeps earning more money.
        </p>

        <p>
          Over time, this creates exponential growth. The longer you stay invested,
          the faster your wealth grows. This is why compound interest is often
          called the “eighth wonder of the world” in finance.
        </p>
      </section>


      {/* ================= SIMPLE VS COMPOUND ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Simple Interest vs Compound Interest</h2>

        <p>
          Understanding the difference is important.
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Simple Interest</strong> – interest is calculated only on the principal</li>
          <li><strong>Compound Interest</strong> – interest is calculated on principal + accumulated interest</li>
        </ul>

        <p>
          Compound interest always generates higher returns compared to simple
          interest for long-term investments.
        </p>
      </section>


      {/* ================= WHY USE CALCULATOR ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Why You Should Use a Compound Interest Calculator</h2>

        <p>
          Manual calculations can be confusing and time-consuming. A calculator
          provides instant and accurate results so you can focus on planning.
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Estimate future investment value instantly</li>
          <li>Compare different interest rates</li>
          <li>Choose best investment duration</li>
          <li>Plan savings goals easily</li>
          <li>Understand the impact of compounding</li>
          <li>Make smarter financial decisions</li>
        </ul>
      </section>


      {/* ================= HOW TO USE ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">How to Use This Calculator</h2>

        <ol className="list-decimal pl-6 space-y-2">
          <li>Enter your principal investment amount</li>
          <li>Input annual interest rate</li>
          <li>Select time period in years</li>
          <li>Choose compounding frequency (yearly, monthly, etc.)</li>
          <li>View maturity amount and total interest instantly</li>
        </ol>

        <p>
          You can test different scenarios to see how small changes affect your
          final wealth.
        </p>
      </section>


      {/* ================= FORMULA ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Compound Interest Formula</h2>

        <div className="p-4 rounded-lg border bg-[var(--surface-2)] font-mono text-sm">
          A = P × (1 + r / n)^(n × t)
        </div>

        <p>
          Where P is principal, r is annual interest rate, n is compounding
          frequency per year, and t is number of years. The calculator performs
          this formula automatically to give precise results.
        </p>
      </section>


      {/* ================= EXAMPLE 1 ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Example Calculation</h2>

        <p>
          Suppose you invest ₹1,00,000 at 10 percent annual interest compounded
          yearly for 5 years.
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Year 1 → ₹1,10,000</li>
          <li>Year 2 → ₹1,21,000</li>
          <li>Year 3 → ₹1,33,100</li>
          <li>Year 5 → ₹1,61,051</li>
        </ul>

        <p>
          Notice how the growth accelerates every year. This is compounding in
          action.
        </p>
      </section>


      {/* ================= POWER OF TIME ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Why Time is Your Biggest Advantage</h2>

        <p>
          The most important factor in compounding is time. The longer you stay
          invested, the larger your returns become. Starting early is much more
          powerful than investing a big amount later.
        </p>

        <p>
          Even small savings started today can become huge wealth after 15 or 20
          years.
        </p>
      </section>


      {/* ================= REAL LIFE USE CASES ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Where Compound Interest is Used</h2>

        <ul className="list-disc pl-6 space-y-2">
          <li>Fixed deposits</li>
          <li>Mutual fund investments</li>
          <li>SIP and Step-Up SIP plans</li>
          <li>Recurring deposits</li>
          <li>Loans and credit cards (interest charges)</li>
          <li>Retirement savings</li>
        </ul>

        <p>
          It works for you when investing and against you when borrowing. So use
          it wisely.
        </p>
      </section>


      {/* ================= FACTORS ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Factors That Affect Compound Growth</h2>

        <ul className="list-disc pl-6 space-y-2">
          <li>Interest rate</li>
          <li>Investment duration</li>
          <li>Compounding frequency</li>
          <li>Initial investment amount</li>
          <li>Consistency of investment</li>
        </ul>

        <p>
          Higher rates, longer duration, and frequent compounding lead to higher
          returns.
        </p>
      </section>


      {/* ================= MISTAKES ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Common Mistakes to Avoid</h2>

        <ul className="list-disc pl-6 space-y-2">
          <li>Starting investment too late</li>
          <li>Withdrawing money early</li>
          <li>Expecting unrealistic returns</li>
          <li>Ignoring inflation</li>
          <li>Not reinvesting gains</li>
        </ul>
      </section>


      {/* ================= TIPS ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Smart Tips to Maximize Returns</h2>

        <ul className="list-disc pl-6 space-y-2">
          <li>Start investing early</li>
          <li>Stay invested long term</li>
          <li>Reinvest profits</li>
          <li>Increase contributions gradually</li>
          <li>Avoid frequent withdrawals</li>
        </ul>
      </section>


      {/* ================= FAQ ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>

        <p><strong>Is compound interest safe?</strong> It depends on the investment type. Fixed deposits are safer, mutual funds depend on markets.</p>
        <p><strong>Does compounding work monthly?</strong> Yes, more frequent compounding increases returns.</p>
        <p><strong>Is this calculator accurate?</strong> Yes, it uses the standard compound interest formula.</p>
        <p><strong>Which is better, simple or compound interest?</strong> Compound interest gives higher returns over time.</p>
      </section>


      {/* ================= FINAL ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Final Thoughts</h2>

        <p>
          Compound interest is the foundation of wealth creation. The earlier you
          start and the longer you stay invested, the bigger your financial
          growth. Even small amounts can turn into large sums with time and
          discipline.
        </p>

        <p>
          Use this Compound Interest Calculator to plan your investments smartly
          and let your money grow automatically.
        </p>

        <p className="font-medium">
          Start early. Stay patient. Let compounding build your future.
        </p>
      </section>

    </article>
  );
};

export default CompoundInterestArticle;
