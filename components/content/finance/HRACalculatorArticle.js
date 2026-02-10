import Link from "next/link";

const HRACalculatorArticle = () => {
  return (
    <article className="max-w-4xl mx-auto space-y-12 leading-relaxed text-sm sm:text-base text-[var(--text-main)]">

      {/* ================= HERO ================= */}
      <section className="space-y-6">
        <h1 className="text-3xl font-bold">
          HRA Calculator – Calculate House Rent Allowance Exemption & Save More Tax
        </h1>

        <p>
          House Rent Allowance or HRA is one of the biggest salary components
          that helps salaried employees reduce taxable income. If you live in a
          rented house, you can claim tax exemption on HRA and legally save a
          significant amount every year.
        </p>

        <p>
          The problem is most people do not know how much exemption they are
          actually eligible for. Guessing often leads to either paying extra tax
          or claiming incorrectly.
        </p>

        <p>
          This HRA Calculator instantly calculates your eligible exemption,
          taxable HRA, and actual tax saving using official rules. You can also
          explore tools like the{" "}
          <Link href="/finance/emi-calculator" className="text-blue-600 underline">
            EMI Calculator
          </Link>
          ,{" "}
          <Link href="/finance/home-loan-emi-calculator" className="text-blue-600 underline">
            Home Loan EMI Calculator
          </Link>
          , and{" "}
          <Link href="/finance/salary-in-hand-calculator" className="text-blue-600 underline">
            In hand Salary Calculator
          </Link>{" "}
          for complete financial planning.
        </p>
      </section>


      {/* ================= WHAT IS HRA ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">What is HRA?</h2>

        <p>
          HRA stands for House Rent Allowance. It is a part of your salary given
          by your employer to cover rental expenses. If you stay in rented
          accommodation, a portion of this amount becomes tax free under income
          tax rules.
        </p>

        <p>
          The exemption is not fixed. It depends on your salary, rent paid, and
          the city where you live. That is why using a calculator is important
          instead of estimating manually.
        </p>
      </section>


      {/* ================= WHY USE ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Why Use an HRA Calculator?</h2>

        <p>
          Manual calculation is confusing because multiple conditions apply at
          the same time. This calculator removes mistakes and gives accurate
          results in seconds.
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Instant HRA exemption calculation</li>
          <li>Know exact taxable salary</li>
          <li>Avoid overpaying tax</li>
          <li>Plan rent and salary structure smarter</li>
          <li>Compare metro vs non metro benefits</li>
        </ul>
      </section>


      {/* ================= ELIGIBILITY ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Who Can Claim HRA Exemption?</h2>

        <ul className="list-disc pl-6 space-y-2">
          <li>You must be a salaried employee</li>
          <li>You must receive HRA as part of salary</li>
          <li>You must live in rented accommodation</li>
          <li>You must pay rent regularly</li>
        </ul>

        <p>
          If you live in your own house or do not pay rent, you cannot claim HRA
          exemption.
        </p>
      </section>


      {/* ================= HOW TO USE ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">How to Use This HRA Calculator</h2>

        <ol className="list-decimal pl-6 space-y-2">
          <li>Enter your basic salary</li>
          <li>Enter HRA received from employer</li>
          <li>Add monthly rent paid</li>
          <li>Select metro or non metro city</li>
          <li>View exemption and taxable HRA instantly</li>
        </ol>
      </section>


      {/* ================= FORMULA ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">HRA Exemption Formula</h2>

        <p>
          The exempt amount is the minimum of the following three values:
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Actual HRA received</li>
          <li>Rent paid minus 10 percent of basic salary</li>
          <li>50 percent of salary for metro cities or 40 percent for non metro</li>
        </ul>

        <div className="p-4 rounded-lg border bg-[var(--surface-2)] font-mono text-sm">
          HRA Exemption = Minimum of (HRA received, Rent − 10% salary, 50% or 40% salary)
        </div>
      </section>


      {/* ================= EXAMPLE ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Example HRA Calculation</h2>

        <p>
          Suppose:
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Basic salary ₹30,000 per month</li>
          <li>HRA received ₹15,000 per month</li>
          <li>Rent paid ₹12,000 per month</li>
          <li>Metro city</li>
        </ul>

        <p>
          After applying rules, eligible exemption may be around ₹10,000 per
          month. The remaining HRA becomes taxable income. This shows why proper
          calculation matters.
        </p>
      </section>


      {/* ================= FACTORS ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Factors That Affect HRA Exemption</h2>

        <ul className="list-disc pl-6 space-y-2">
          <li>Basic salary amount</li>
          <li>Total HRA received</li>
          <li>Actual rent paid</li>
          <li>City category metro or non metro</li>
          <li>Changes in salary during the year</li>
        </ul>
      </section>


      {/* ================= MISTAKES ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Common HRA Claim Mistakes to Avoid</h2>

        <ul className="list-disc pl-6 space-y-2">
          <li>Claiming without paying rent</li>
          <li>Not keeping rent receipts</li>
          <li>Ignoring PAN requirement for high rent</li>
          <li>Using incorrect salary components</li>
          <li>Overclaiming exemption</li>
        </ul>
      </section>


      {/* ================= TIPS ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Smart Tips to Save More Tax with HRA</h2>

        <ul className="list-disc pl-6 space-y-2">
          <li>Maintain proper rent receipts</li>
          <li>Structure salary with higher basic if beneficial</li>
          <li>Pay rent digitally for proof</li>
          <li>Review exemption yearly</li>
          <li>Use the calculator before filing taxes</li>
        </ul>
      </section>


      {/* ================= FAQ ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>

        <p><strong>Can I claim HRA if I live with parents?</strong> Yes, if you actually pay rent and maintain proof.</p>
        <p><strong>Is HRA available for self employed people?</strong> No, only salaried employees can claim HRA.</p>
        <p><strong>Do I need rent receipts?</strong> Yes, they are required for tax proof.</p>
        <p><strong>Is this calculator accurate?</strong> Yes, it follows official exemption rules.</p>
      </section>


      {/* ================= FINAL ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Final Thoughts</h2>

        <p>
          HRA is one of the easiest ways to legally reduce tax. Do not ignore it.
          Calculate properly, keep documentation ready, and optimize your salary
          structure. Small planning can save thousands every year.
        </p>

        <p className="font-medium">
          Track rent. Calculate smartly. Save tax confidently.
        </p>
      </section>

    </article>
  );
};

export default HRACalculatorArticle;
