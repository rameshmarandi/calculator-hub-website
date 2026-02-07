import Image from "next/image";
import Link from "next/link";

const EMIArticle = () => {
  return (
    <article className="max-w-4xl mx-auto space-y-14 leading-relaxed text-sm sm:text-base text-[var(--text-main)]">
      {/* ================= HERO ================= */}
      <section className="space-y-6">
        {/* <Image
          src="https://res.cloudinary.com/dmqlnxdes/image/upload/v1770437193/emi-calculator_apc0ym.webp"
          alt="EMI calculator financial planning with calculator and documents on desk"
          width={1200}
          height={700}
          priority
          className="rounded-xl w-full h-auto"
        /> */}

        <h1 className="text-3xl font-bold">
          EMI Calculator – Instantly Calculate Your Monthly Loan Payments with
          Accuracy
        </h1>

        <p>
          Taking a loan without knowing your monthly repayment is financially
          risky. Whether it is a house, car, or personal expense, borrowing
          money creates a long term commitment. If the monthly EMI is too high,
          it silently eats your income and affects savings, investments, and
          lifestyle. That is why every smart borrower calculates EMI first and
          applies later.
        </p>

        <p>
          An EMI Calculator gives you complete clarity in seconds. You simply
          enter the loan amount, interest rate, and tenure. The tool instantly
          shows your monthly EMI, total interest payable, and overall repayment
          cost. Instead of guessing, you make decisions backed by numbers.
        </p>

        <p>
          You can also use dedicated tools like{" "}
          <Link
            href="/finance/home-loan-emi-calculator"
            className="text-blue-600 underline font-medium">
            Home Loan EMI Calculator
          </Link>
          ,{" "}
          <Link
            href="/finance/car-loan-emi-calculator"
            className="text-blue-600 underline font-medium">
            Car Loan EMI Calculator
          </Link>
          ,{" "}
          <Link
            href="/finance/personal-loan-emi-calculator"
            className="text-blue-600 underline font-medium">
            Personal Loan EMI Calculator
          </Link>
          , or{" "}
          <Link
            href="/finance/education-loan-emi-calculator"
            className="text-blue-600 underline font-medium">
            Education Loan EMI Calculator
          </Link>{" "}
          for more specific planning.
        </p>
      </section>

      {/* ================= WHAT IS EMI ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">What is EMI?</h2>

        <p>
          EMI stands for Equated Monthly Installment. It is the fixed amount you
          pay to the lender every month until your loan is completely repaid.
          Each EMI includes both principal and interest.
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Principal</strong> is the original loan amount borrowed
          </li>
          <li>
            <strong>Interest</strong> is the lender’s charge for providing money
          </li>
          <li>
            <strong>Tenure</strong> is the total number of months for repayment
          </li>
        </ul>

        <p>
          During the early years, most of your EMI goes toward interest. Later,
          the principal share increases. This process is called amortization and
          it explains why longer tenures increase the overall interest
          dramatically.
        </p>
      </section>

      {/* ================= IMAGE 1 ================= */}
      {/* <section>
        <Image
          src="https://res.cloudinary.com/dmqlnxdes/image/upload/v1770437740/emi-calculator_acwdg1.webp"
          alt="Person calculating EMI on laptop with notebook and calculator"
          width={1200}
          height={700}
          loading="lazy"
          className="rounded-xl w-full h-auto"
        />
      </section> */}

      {/* ================= WHY EMI CALCULATOR ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">
          Why You Must Use an EMI Calculator Before Taking Any Loan
        </h2>

        <p>
          Many borrowers apply for loans based on eligibility alone. This is a
          mistake. Approval does not mean affordability. A bank may approve a
          large amount, but paying a heavy EMI every month can create constant
          stress.
        </p>

        <p>
          An EMI calculator ensures your repayment fits comfortably within your
          income. It protects your financial stability and prevents future
          regret.
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Know exact EMI instantly</li>
          <li>Avoid over borrowing</li>
          <li>Compare multiple tenure options</li>
          <li>Understand total interest cost</li>
          <li>Plan savings properly</li>
          <li>Make smarter financial decisions</li>
        </ul>
      </section>

      {/* ================= FORMULA ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">EMI Calculation Formula</h2>

        <div className="p-4 rounded-lg border bg-[var(--surface-2)] font-mono text-sm">
          EMI = P × r × (1 + r)^n / ((1 + r)^n − 1)
        </div>

        <p>
          Where P is loan amount, r is monthly interest rate, and n is number of
          months. Although the formula looks complicated, the calculator
          performs it instantly and produces bank level accurate results.
        </p>
      </section>

      {/* ================= EXAMPLE ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Example EMI Calculation</h2>

        <p>
          Suppose you borrow ₹15,00,000 at 10 percent interest for 5 years. Your
          EMI becomes roughly ₹31,870 per month. Total repayment exceeds ₹19
          lakh. This means you pay more than ₹4 lakh purely as interest. Small
          differences in rate or tenure can change this amount significantly.
        </p>
      </section>

      {/* ================= TENURE IMPACT ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">How Tenure Affects Your EMI</h2>

        <p>
          Loan tenure directly controls your EMI size and total interest paid.
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Short tenure gives higher EMI but lower interest</li>
          <li>Long tenure gives lower EMI but much higher interest</li>
        </ul>

        <p>
          If you can afford slightly higher monthly payments, always choose a
          shorter tenure. It saves lakhs in interest over time.
        </p>
      </section>

      {/* ================= IMAGE 2 ================= */}
      {/* <section>
        <Image
          src="https://res.cloudinary.com/dmqlnxdes/image/upload/v1770437740/family-emi-calculator_itlktn.webp"
          alt="Family planning home loan repayment together"
          width={1200}
          height={700}
          loading="lazy"
          className="rounded-xl w-full h-auto"
        />
      </section> */}

      {/* ================= MISTAKES ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Common Loan Mistakes to Avoid</h2>

        <ul className="list-disc pl-6 space-y-2">
          <li>Borrowing maximum eligible amount</li>
          <li>Ignoring interest differences</li>
          <li>Choosing long tenure blindly</li>
          <li>Not checking prepayment options</li>
          <li>Skipping EMI planning completely</li>
        </ul>
      </section>

      {/* ================= REDUCE EMI ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Smart Ways to Reduce Your EMI</h2>

        <ul className="list-disc pl-6 space-y-2">
          <li>Increase down payment</li>
          <li>Improve credit score</li>
          <li>Negotiate lower rates</li>
          <li>Make early prepayments</li>
          <li>Transfer loan to cheaper lender</li>
        </ul>
      </section>

      {/* ================= FAQ ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>

        <p>
          <strong>Is EMI fixed every month?</strong> Yes for fixed rate loans.
          Floating rates may change.
        </p>
        <p>
          <strong>Can I close my loan early?</strong> Yes. Prepayment reduces
          interest significantly.
        </p>
        <p>
          <strong>Does longer tenure help?</strong> EMI decreases but total
          interest increases.
        </p>
        <p>
          <strong>Is the calculator accurate?</strong> Yes. It uses standard
          banking formulas.
        </p>
      </section>

      {/* ================= CONCLUSION ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Final Thoughts</h2>

        <p>
          A loan is a serious long term commitment. Never rely on assumptions or
          sales promises. Use an EMI calculator, compare scenarios, and borrow
          only what you can comfortably repay. Careful planning today protects
          your financial future.
        </p>

        <p className="font-semibold">
          Calculate first. Borrow wisely. Stay financially strong.
        </p>
      </section>
    </article>
  );
};

export default EMIArticle;
