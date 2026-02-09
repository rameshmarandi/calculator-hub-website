import Link from "next/link";

const SimpleInterestArticle = () => {
  return (
    <article className="max-w-4xl mx-auto space-y-12 leading-relaxed text-sm sm:text-base text-[var(--text-main)]">

      {/* ================= HERO ================= */}
      <section className="space-y-6">
        <h1 className="text-3xl font-bold">
          Simple Interest Calculator – Calculate Interest and Total Amount Easily
        </h1>

        <p>
          Understanding interest is one of the most important basics of finance.
          Whether you are taking a loan, lending money, or learning mathematics,
          knowing how interest works helps you make better decisions. One of the
          simplest types of interest is called simple interest.
        </p>

        <p>
          A Simple Interest Calculator allows you to instantly calculate the
          interest amount and the total payable amount without doing manual
          calculations. Just enter the principal, interest rate, and time period,
          and you get accurate results within seconds.
        </p>

        <p>
          If you are looking for compound or investment based calculations, you
          can also try our{" "}
          <Link href="/finance/compound-interest-calculator" className="text-blue-600 underline">
            Compound Interest Calculator
          </Link>
          ,{" "}
          <Link href="/finance/emi-calculator" className="text-blue-600 underline">
            EMI Calculator
          </Link>
          , or{" "}
          <Link href="/finance/fixed-deposit-calculator" className="text-blue-600 underline">
            Fixed Deposit Calculator
          </Link>
          .
        </p>
      </section>


      {/* ================= WHAT IS SI ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">What is Simple Interest?</h2>

        <p>
          Simple interest is the easiest way to calculate interest on a loan or
          investment. In this method, interest is calculated only on the original
          principal amount. It does not include interest on previously earned
          interest.
        </p>

        <p>
          Because of this, the interest grows at a constant rate over time. This
          makes simple interest easy to understand and predict compared to
          compound interest.
        </p>
      </section>


      {/* ================= WHERE USED ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Where is Simple Interest Used?</h2>

        <p>
          Simple interest is commonly used in short term financial situations.
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Short term personal loans</li>
          <li>Education loans</li>
          <li>Gold loans</li>
          <li>Basic bank interest calculations</li>
          <li>School and college math problems</li>
          <li>Quick manual interest estimates</li>
        </ul>

        <p>
          For long term investments, compound interest is usually preferred. But
          for short durations, simple interest works perfectly.
        </p>
      </section>


      {/* ================= WHY CALCULATOR ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Why Use a Simple Interest Calculator?</h2>

        <p>
          Although the formula is easy, doing calculations manually every time
          can be slow and prone to mistakes. A calculator saves time and gives
          instant results.
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Instant and accurate results</li>
          <li>No manual math required</li>
          <li>Helpful for students and beginners</li>
          <li>Quick loan cost estimation</li>
          <li>Better financial planning</li>
          <li>Easy comparison of rates and durations</li>
        </ul>
      </section>


      {/* ================= HOW TO USE ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">How to Use This Calculator</h2>

        <ol className="list-decimal pl-6 space-y-2">
          <li>Enter the principal amount (money borrowed or invested)</li>
          <li>Add the annual interest rate (%)</li>
          <li>Select the time period in years or months</li>
          <li>Click calculate to view interest and total amount</li>
        </ol>

        <p>
          The calculator automatically applies the formula and shows the result
          instantly.
        </p>
      </section>


      {/* ================= FORMULA ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Simple Interest Formula</h2>

        <div className="p-4 rounded-lg border bg-[var(--surface-2)] font-mono text-sm">
          SI = (P × R × T) / 100
        </div>

        <p>Where:</p>

        <ul className="list-disc pl-6 space-y-2">
          <li>P = Principal amount</li>
          <li>R = Interest rate per year</li>
          <li>T = Time period in years</li>
        </ul>

        <p>
          Total Amount = Principal + Simple Interest
        </p>

        <p>
          This formula makes simple interest one of the easiest financial
          calculations.
        </p>
      </section>


      {/* ================= EXAMPLES ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Example Calculations</h2>

        <p><strong>Example 1:</strong></p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Principal = ₹10,000</li>
          <li>Rate = 10% per year</li>
          <li>Time = 2 years</li>
          <li>Interest = ₹2,000</li>
          <li>Total = ₹12,000</li>
        </ul>

        <p><strong>Example 2:</strong></p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Principal = ₹50,000</li>
          <li>Rate = 8% per year</li>
          <li>Time = 3 years</li>
          <li>Interest = ₹12,000</li>
          <li>Total = ₹62,000</li>
        </ul>

        <p>
          As you can see, the interest increases linearly over time instead of
          compounding.
        </p>
      </section>


      {/* ================= SI VS CI ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Simple Interest vs Compound Interest</h2>

        <ul className="list-disc pl-6 space-y-2">
          <li>Simple Interest → interest only on principal</li>
          <li>Compound Interest → interest on principal + previous interest</li>
          <li>Simple → slower growth</li>
          <li>Compound → faster growth</li>
          <li>Simple → short term loans</li>
          <li>Compound → long term investments</li>
        </ul>

        <p>
          For higher long term returns, compound interest is usually better. But
          for quick calculations and short durations, simple interest is enough.
        </p>
      </section>


      {/* ================= FACTORS ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Factors That Affect Simple Interest</h2>

        <ul className="list-disc pl-6 space-y-2">
          <li>Principal amount</li>
          <li>Interest rate</li>
          <li>Time duration</li>
        </ul>

        <p>
          Increasing any of these factors increases the total interest directly.
          The relationship is linear and predictable.
        </p>
      </section>


      {/* ================= FAQ ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>

        <p><strong>Is simple interest better than compound interest?</strong> It is simpler but usually gives lower returns.</p>
        <p><strong>Where is simple interest used?</strong> Mostly for short term loans and education purposes.</p>
        <p><strong>Can I calculate monthly interest?</strong> Yes, convert time into months accordingly.</p>
        <p><strong>Is this calculator accurate?</strong> Yes, it uses the standard simple interest formula.</p>
      </section>


      {/* ================= FINAL ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Final Thoughts</h2>

        <p>
          Simple interest is the foundation of financial calculations. It is easy
          to understand, quick to compute, and useful for short term borrowing or
          lending. Knowing how it works helps you avoid overpaying interest and
          make smarter decisions.
        </p>

        <p>
          Use this Simple Interest Calculator whenever you need fast and accurate
          results without complicated math.
        </p>

        <p className="font-medium">
          Learn the basics. Calculate smartly. Manage money better.
        </p>
      </section>

    </article>
  );
};

export default SimpleInterestArticle;
