import Link from "next/link";

const GratuityCalculatorArticle = () => {
  return (
    <article className="max-w-4xl mx-auto space-y-12 leading-relaxed text-sm sm:text-base text-[var(--text-main)]">

      {/* ================= HERO ================= */}
      <section className="space-y-6">
        <h1 className="text-3xl font-bold">
          Gratuity Calculator – Calculate Your Gratuity Amount & Retirement Benefits Instantly
        </h1>

        <p>
          Gratuity is one of the most valuable financial benefits available to
          salaried employees. It is a lump sum amount paid by your employer as a
          reward for long term service. Many employees ignore it while planning
          their finances, but this amount can easily run into lakhs.
        </p>

        <p>
          The challenge is that most people do not know how much gratuity they
          are eligible for. Manual calculation is confusing and often inaccurate.
          That is why using a Gratuity Calculator is the smartest way to estimate
          your benefit instantly.
        </p>

        <p>
          This calculator helps you determine your total gratuity amount based on
          salary and years of service. You can also explore tools like the{" "}
          <Link href="/finance/salary-in-hand-calculator" className="text-blue-600 underline">
            In hand Salary Calculator
          </Link>
          ,{" "}
          <Link href="/finance/emi-calculator" className="text-blue-600 underline">
            EMI Calculator
          </Link>
          , and{" "}
          <Link href="/finance/hra-calculator" className="text-blue-600 underline">
            HRA Calculator
          </Link>{" "}
          for complete financial planning.
        </p>
      </section>


      {/* ================= WHAT IS GRATUITY ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">What is Gratuity?</h2>

        <p>
          Gratuity is a retirement benefit paid by an employer to an employee for
          continuous service. It is a way of thanking employees for their loyalty
          and contribution to the organization.
        </p>

        <p>
          You usually receive gratuity when you resign, retire, or complete a
          minimum number of service years. It acts as a financial cushion and
          supports you during career transitions or retirement.
        </p>
      </section>


      {/* ================= WHY USE ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Why Use a Gratuity Calculator?</h2>

        <p>
          Many employees underestimate their gratuity amount. Even a small salary
          difference or extra service year can significantly increase your final
          payout. This calculator gives exact numbers instantly.
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Instant gratuity estimation</li>
          <li>Better retirement planning</li>
          <li>Understand long term benefits of staying longer</li>
          <li>Avoid manual formula errors</li>
          <li>Make smarter job change decisions</li>
        </ul>
      </section>


      {/* ================= ELIGIBILITY ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Who is Eligible for Gratuity?</h2>

        <p>
          To receive gratuity, you must meet certain conditions set by labor
          laws and company policies.
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Minimum 5 years of continuous service</li>
          <li>Resignation, retirement, or termination</li>
          <li>Applicable to employees in companies with required workforce size</li>
        </ul>

        <p>
          In special cases like death or disability, the 5 year rule may not apply.
        </p>
      </section>


      {/* ================= HOW TO USE ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">How to Use This Gratuity Calculator</h2>

        <ol className="list-decimal pl-6 space-y-2">
          <li>Enter your last drawn basic salary plus DA</li>
          <li>Add total years of service</li>
          <li>Click calculate</li>
          <li>View your gratuity amount instantly</li>
        </ol>

        <p>
          You can test different service years to see how staying longer increases
          your final payout.
        </p>
      </section>


      {/* ================= FORMULA ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Gratuity Formula</h2>

        <p>
          For most employees, gratuity is calculated using the following formula:
        </p>

        <div className="p-4 rounded-lg border bg-[var(--surface-2)] font-mono text-sm">
          Gratuity = (Last drawn salary × 15 × Years of service) ÷ 26
        </div>

        <p>
          Here, salary means basic pay plus dearness allowance. The number 15
          represents 15 days of wages for each completed year, and 26 represents
          working days in a month.
        </p>
      </section>


      {/* ================= EXAMPLE ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Example Calculation</h2>

        <p>
          Suppose:
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Last drawn salary ₹30,000 per month</li>
          <li>Years of service 10 years</li>
        </ul>

        <p>
          Gratuity = (30,000 × 15 × 10) ÷ 26 = ₹1,73,076 approximately.
          This shows how long term service creates a significant payout.
        </p>
      </section>


      {/* ================= FACTORS ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Factors That Affect Your Gratuity Amount</h2>

        <ul className="list-disc pl-6 space-y-2">
          <li>Last drawn basic salary</li>
          <li>Dearness allowance</li>
          <li>Total years of service</li>
          <li>Company policies</li>
          <li>Government limits and rules</li>
        </ul>
      </section>


      {/* ================= TAXATION ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Is Gratuity Taxable?</h2>

        <p>
          Gratuity is partially or fully tax free depending on your employment
          type and limits set by tax laws. Government employees usually receive
          full exemption, while private employees may have limits.
        </p>

        <p>
          Knowing this helps you plan withdrawals and avoid unexpected tax
          liabilities.
        </p>
      </section>


      {/* ================= MISTAKES ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Common Gratuity Mistakes to Avoid</h2>

        <ul className="list-disc pl-6 space-y-2">
          <li>Switching jobs before completing 5 years</li>
          <li>Ignoring gratuity while comparing job offers</li>
          <li>Using wrong salary components for calculation</li>
          <li>Not confirming eligibility with HR</li>
        </ul>
      </section>


      {/* ================= TIPS ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Smart Tips to Maximize Gratuity Benefits</h2>

        <ul className="list-disc pl-6 space-y-2">
          <li>Complete at least 5 years before resigning</li>
          <li>Negotiate better basic salary structure</li>
          <li>Track service continuity carefully</li>
          <li>Include gratuity in long term financial planning</li>
        </ul>
      </section>


      {/* ================= FAQ ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>

        <p><strong>Is gratuity mandatory?</strong> Yes, for eligible employees under labor laws.</p>
        <p><strong>Can I get gratuity before 5 years?</strong> Usually no, except special cases.</p>
        <p><strong>Is gratuity paid monthly?</strong> No, it is a one time lump sum payment.</p>
        <p><strong>Is this calculator accurate?</strong> Yes, it uses the official gratuity formula.</p>
      </section>


      {/* ================= FINAL ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Final Thoughts</h2>

        <p>
          Gratuity is free money earned through loyalty and time. Do not ignore it.
          Calculate your benefit early, plan your career strategically, and use it
          as part of your long term wealth strategy.
        </p>

        <p className="font-medium">
          Stay longer. Earn more. Secure your future.
        </p>
      </section>

    </article>
  );
};

export default GratuityCalculatorArticle;
