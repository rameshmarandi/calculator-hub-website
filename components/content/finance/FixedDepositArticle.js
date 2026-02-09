import Link from "next/link";

const FixedDepositArticle = () => {
  return (
    <article className="max-w-4xl mx-auto space-y-12 leading-relaxed text-sm sm:text-base text-[var(--text-main)]">

      {/* ================= HERO ================= */}
      <section className="space-y-6">
        <h1 className="text-3xl font-bold">
          Fixed Deposit Calculator – Calculate FD Maturity Amount and Interest Instantly
        </h1>

        <p>
          A Fixed Deposit is one of the safest and most trusted ways to grow your
          money. If you want stable returns without market risk, FD is often the
          first choice. It offers guaranteed interest and predictable maturity
          value, making it ideal for conservative investors and short term
          financial goals.
        </p>

        <p>
          A Fixed Deposit Calculator helps you instantly estimate your maturity
          amount, total interest earned, and overall returns. Instead of manually
          calculating complex formulas, you simply enter your deposit amount,
          interest rate, and tenure to get accurate results within seconds.
        </p>

        <p>
          You can also explore tools like the{" "}
          <Link href="/finance/compound-interest-calculator" className="text-blue-600 underline">
            Compound Interest Calculator
          </Link>
          ,{" "}
          <Link href="/finance/sip-calculator" className="text-blue-600 underline">
            SIP Calculator
          </Link>
          , or{" "}
          <Link href="/finance/lumpsum-investment-calculator" className="text-blue-600 underline">
            Lumpsum Investment Calculator
          </Link>{" "}
          to compare different saving options.
        </p>
      </section>


      {/* ================= WHAT IS FD ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">What is a Fixed Deposit?</h2>

        <p>
          A Fixed Deposit, also known as FD or Term Deposit, is a financial
          product offered by banks and financial institutions. You deposit a
          fixed amount of money for a specific period and earn interest at a
          predetermined rate.
        </p>

        <p>
          Unlike savings accounts, you cannot withdraw money freely during the
          tenure. In return, banks offer higher interest rates and guaranteed
          returns.
        </p>
      </section>


      {/* ================= WHY FD ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Why Many People Prefer Fixed Deposits</h2>

        <ul className="list-disc pl-6 space-y-2">
          <li>Safe and low risk investment</li>
          <li>Guaranteed returns</li>
          <li>Fixed interest rate</li>
          <li>Flexible tenure options</li>
          <li>Ideal for short term goals</li>
          <li>No market volatility</li>
        </ul>

        <p>
          For people who do not want stock market risk, FD provides stability and
          peace of mind.
        </p>
      </section>


      {/* ================= WHY CALCULATOR ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Why Use a Fixed Deposit Calculator?</h2>

        <p>
          Many investors guess returns or depend on bank staff. This is not smart.
          You should know exactly how much you will receive at maturity before
          investing.
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Instant maturity value calculation</li>
          <li>Compare different banks and rates</li>
          <li>Choose best tenure easily</li>
          <li>Understand total interest earned</li>
          <li>Plan savings goals accurately</li>
          <li>Avoid manual calculation mistakes</li>
        </ul>
      </section>


      {/* ================= HOW TO USE ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">How to Use This FD Calculator</h2>

        <ol className="list-decimal pl-6 space-y-2">
          <li>Enter your deposit amount</li>
          <li>Input the annual interest rate</li>
          <li>Select tenure in months or years</li>
          <li>Choose compounding frequency</li>
          <li>View maturity amount and interest instantly</li>
        </ol>

        <p>
          You can test multiple combinations to find the best return before
          locking your money.
        </p>
      </section>


      {/* ================= SIMPLE VS COMPOUND ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Simple Interest vs Compound Interest in FD</h2>

        <p>
          Fixed deposits usually use compound interest. That means you earn
          interest on both your original deposit and previously earned interest.
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Quarterly compounding gives higher returns than yearly</li>
          <li>More frequent compounding increases maturity value</li>
        </ul>
      </section>


      {/* ================= FORMULA ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">FD Calculation Formula</h2>

        <div className="p-4 rounded-lg border bg-[var(--surface-2)] font-mono text-sm">
          A = P × (1 + r / n)^(n × t)
        </div>

        <p>
          Where P is deposit amount, r is interest rate, n is compounding
          frequency, and t is tenure. The calculator applies this formula to give
          accurate results instantly.
        </p>
      </section>


      {/* ================= EXAMPLE ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Example FD Calculation</h2>

        <p>
          Suppose you invest ₹1,00,000 at 7 percent annual interest for 3 years
          compounded quarterly.
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Maturity value ≈ ₹1,23,000</li>
          <li>Total interest ≈ ₹23,000</li>
        </ul>

        <p>
          You earn ₹23,000 without any market risk. This is why FD is considered a
          stable investment.
        </p>
      </section>


      {/* ================= WHEN TO USE FD ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">When Should You Choose Fixed Deposits?</h2>

        <ul className="list-disc pl-6 space-y-2">
          <li>Emergency funds</li>
          <li>Short term savings goals</li>
          <li>Low risk portfolio</li>
          <li>Retirement income stability</li>
          <li>Capital protection</li>
        </ul>

        <p>
          FD is ideal when safety is more important than high returns.
        </p>
      </section>


      {/* ================= LIMITATIONS ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Limitations of Fixed Deposits</h2>

        <ul className="list-disc pl-6 space-y-2">
          <li>Lower returns than mutual funds or stocks</li>
          <li>Penalty on early withdrawal</li>
          <li>Interest taxable</li>
          <li>May not beat inflation</li>
        </ul>

        <p>
          For long term wealth creation, combining FD with other investments like
          SIPs may be smarter.
        </p>
      </section>


      {/* ================= TIPS ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Smart Tips to Maximize FD Returns</h2>

        <ul className="list-disc pl-6 space-y-2">
          <li>Compare interest rates across banks</li>
          <li>Choose quarterly compounding</li>
          <li>Use ladder strategy for liquidity</li>
          <li>Reinvest maturity amount</li>
          <li>Avoid premature withdrawals</li>
        </ul>
      </section>


      {/* ================= FAQ ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>

        <p><strong>Is FD safe?</strong> Yes, bank FDs are considered very safe and stable.</p>
        <p><strong>Can I withdraw early?</strong> Yes, but banks may charge a penalty.</p>
        <p><strong>Is interest taxable?</strong> Yes, FD interest is taxable as income.</p>
        <p><strong>Is this calculator accurate?</strong> Yes, it uses the standard banking formula.</p>
      </section>


      {/* ================= FINAL ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Final Thoughts</h2>

        <p>
          Fixed Deposits are perfect for investors who want safety, stability, and
          predictable returns. They may not offer the highest growth, but they
          protect your capital and provide peace of mind.
        </p>

        <p>
          Use this Fixed Deposit Calculator to compare returns, plan your savings,
          and choose the best tenure before investing.
        </p>

        <p className="font-medium">
          Save safely. Earn steadily. Grow confidently.
        </p>
      </section>

    </article>
  );
};

export default FixedDepositArticle;
