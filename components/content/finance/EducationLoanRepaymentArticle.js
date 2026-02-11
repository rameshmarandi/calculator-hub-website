import Link from "next/link";

const EducationLoanRepaymentArticle = () => {
  return (
    <article className="max-w-4xl mx-auto space-y-14 leading-relaxed text-sm sm:text-base text-[var(--text-main)]">

      {/* ================= HERO ================= */}
      <section className="space-y-6">
        <h1 className="text-3xl font-bold">
          Education Loan Repayment Calculator – Calculate EMI, Interest and Total Repayment Instantly
        </h1>

        <p>
          Education loans help you invest in your future, but repayment planning
          is equally important. Without calculating EMI and interest in advance,
          monthly payments can become stressful after graduation.
        </p>

        <p>
          This Education Loan Repayment Calculator helps you estimate your monthly
          EMI, total interest payable, and complete repayment amount so you can
          plan your finances confidently before taking or repaying a loan.
        </p>

        <div className="grid grid-cols-2 gap-3 font-medium text-sm">
          <span>✔ Instant EMI Results</span>
          <span>✔ Accurate Interest Breakdown</span>
          <span>✔ 100% Free Tool</span>
          <span>✔ No Signup Required</span>
        </div>
      </section>


      {/* ================= WHY USE ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Why You Should Calculate Repayment First</h2>

        <p>
          Many students focus only on getting the loan approved and forget to check
          how much they will repay later. A small difference in interest rate or
          tenure can add thousands to your total cost.
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Know your exact monthly EMI</li>
          <li>Understand total interest cost clearly</li>
          <li>Plan salary and expenses after graduation</li>
          <li>Compare lenders easily</li>
          <li>Avoid financial pressure early in your career</li>
        </ul>
      </section>


      {/* ================= WHAT IS EMI ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">What Is Education Loan EMI?</h2>

        <p>
          EMI stands for Equated Monthly Installment. It is the fixed amount you
          pay every month to repay your loan. Each EMI includes:
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Principal</strong> – borrowed loan amount</li>
          <li><strong>Interest</strong> – cost charged by the bank</li>
        </ul>

        <p>
          In the early years, more of your EMI goes toward interest. Later, more
          goes toward principal.
        </p>
      </section>


      {/* ================= HOW IT WORKS ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">How This Calculator Works</h2>

        <p>
          The calculator uses standard bank EMI formulas to estimate your monthly
          payments accurately.
        </p>

        <ol className="list-decimal pl-6 space-y-2">
          <li>Enter loan amount</li>
          <li>Add annual interest rate</li>
          <li>Select repayment tenure</li>
          <li>View EMI, interest, and total repayment instantly</li>
        </ol>

        <p>
          You can test multiple tenures to choose the most comfortable EMI.
        </p>
      </section>


      {/* ================= FORMULA ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">EMI Formula Used</h2>

        <div className="p-4 rounded-lg border bg-[var(--surface-2)] font-mono text-sm">
          EMI = P × r × (1 + r)^n / ((1 + r)^n − 1)
        </div>

        <p>
          Where P is loan amount, r is monthly interest rate, and n is number of months.
          This is the same formula used by banks.
        </p>
      </section>


      {/* ================= EXAMPLE ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Example Repayment Calculation</h2>

        <p>
          Suppose you take an education loan of ₹5,00,000 at 10 percent interest for 5 years.
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Monthly EMI around ₹10,600</li>
          <li>Total repayment around ₹6,36,000</li>
          <li>Total interest around ₹1,36,000</li>
        </ul>

        <p>
          This shows how interest increases your overall cost significantly.
        </p>
      </section>


      {/* ================= MORATORIUM ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">What Is a Moratorium Period?</h2>

        <p>
          Many education loans offer a moratorium period, which means you do not
          start full EMI payments until your course ends or after a grace period.
          However, interest may still accumulate during this time.
        </p>

        <p>
          Always calculate total interest including the moratorium to avoid surprises.
        </p>
      </section>


      {/* ================= TIPS ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Smart Tips to Reduce Education Loan Burden</h2>

        <ul className="list-disc pl-6 space-y-2">
          <li>Pay interest during study period if possible</li>
          <li>Choose shorter tenure when affordable</li>
          <li>Make part prepayments when you start earning</li>
          <li>Compare banks for lower interest rates</li>
          <li>Avoid unnecessary borrowing</li>
        </ul>
      </section>


      {/* ================= RELATED ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Useful Related Calculators</h2>

        <ul className="list-disc pl-6 space-y-2">
          <li>
            <Link href="/finance/emi-calculator" className="text-blue-600 underline">
              EMI Calculator
            </Link>
          </li>
          <li>
            <Link href="/finance/loan-prepayment-calculator" className="text-blue-600 underline">
              Loan Prepayment Calculator
            </Link>
          </li>
          <li>
            <Link href="/finance/loan-eligibility-calculator" className="text-blue-600 underline">
              Loan Eligibility Calculator
            </Link>
          </li>
        </ul>
      </section>


      {/* ================= FINAL ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Final Thoughts</h2>

        <p>
          Education is an investment in your future, but smart repayment planning
          protects your financial freedom. Always calculate EMI and total cost before
          committing to a loan.
        </p>

        <p className="font-medium">
          Study smart. Borrow wisely. Repay comfortably.
        </p>
      </section>

    </article>
  );
};

export default EducationLoanRepaymentArticle;
