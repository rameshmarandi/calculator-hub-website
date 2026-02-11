import Link from "next/link";

const LoanEligibilityArticle = () => {
  return (
    <article className="max-w-4xl mx-auto space-y-14 leading-relaxed text-sm sm:text-base text-[var(--text-main)]">

      {/* ================= HERO ================= */}
      <section className="space-y-6">
        <h1 className="text-3xl font-bold">
          Loan Eligibility Calculator – Check How Much Home or Personal Loan You Can Afford
        </h1>

        <p>
          Before applying for any loan, the most important question is not the interest rate or bank offer.
          It is how much you can safely repay every month without affecting your lifestyle or savings.
        </p>

        <p>
          This Loan Eligibility Calculator instantly estimates your maximum borrowing capacity using your income,
          existing EMIs, interest rate, and loan tenure. The results follow standard bank calculations so you can
          plan realistically and avoid rejection or over borrowing.
        </p>

        <div className="grid grid-cols-2 gap-3 font-medium text-sm">
          <span>✔ Instant Results</span>
          <span>✔ Bank Standard Formula</span>
          <span>✔ 100% Free Tool</span>
          <span>✔ No Signup Required</span>
        </div>
      </section>


      {/* ================= WHY THIS TOOL ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Why Use a Loan Eligibility Calculator?</h2>

        <p>
          Many people directly apply for large loans without checking eligibility first. This often leads to loan
          rejection or EMIs that become difficult to manage later.
        </p>

        <p>
          Using this calculator helps you understand your safe borrowing limit before speaking to any lender.
          That gives you negotiation power and protects your finances.
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Know your maximum eligible loan amount instantly</li>
          <li>Prevent loan rejection that hurts your credit score</li>
          <li>Keep EMIs within a comfortable budget</li>
          <li>Compare banks with confidence</li>
          <li>Plan home or personal loans smarter</li>
        </ul>
      </section>


      {/* ================= WHAT IS ELIGIBILITY ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">What Is Loan Eligibility?</h2>

        <p>
          Loan eligibility is the maximum amount a bank is willing to lend you based on your repayment capacity.
          Lenders analyze your monthly income, expenses, existing debts, and credit history to decide how much EMI you can safely handle.
        </p>

        <p className="font-medium">
          Simply put, eligibility means the loan amount you can repay comfortably, not the highest amount offered.
        </p>
      </section>


      {/* ================= HOW IT WORKS ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">How This Calculator Works</h2>

        <p>
          The tool follows the same process used by banks and financial institutions.
        </p>

        <ol className="list-decimal pl-6 space-y-2">
          <li>Calculate a safe EMI limit based on your income</li>
          <li>Subtract existing EMIs or liabilities</li>
          <li>Convert remaining EMI capacity into loan value</li>
          <li>Display your eligible loan amount instantly</li>
        </ol>

        <p>
          You can adjust interest rate or tenure to test different scenarios and choose the option that fits your budget best.
        </p>
      </section>


      {/* ================= FORMULA ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Bank Formula Used for Eligibility</h2>

        <div className="p-4 rounded-lg border bg-[var(--surface-2)] font-mono text-sm">
          Eligible EMI = Monthly Income × 40% − Existing EMIs
        </div>

        <p>
          Once the affordable EMI is calculated, it is converted into a loan amount using standard EMI formulas.
          This approach ensures realistic and practical results similar to what lenders use.
        </p>
      </section>


      {/* ================= FACTORS ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Factors That Affect Your Loan Eligibility</h2>

        <ul className="list-disc pl-6 space-y-2">
          <li>Monthly salary or business income</li>
          <li>Existing loans or EMIs</li>
          <li>Credit score and repayment record</li>
          <li>Interest rate offered</li>
          <li>Loan tenure selected</li>
          <li>Employment stability</li>
        </ul>

        <p>
          Improving even one of these factors can significantly increase your eligible amount.
        </p>
      </section>


      {/* ================= IMPROVE ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">How to Increase Your Loan Eligibility</h2>

        <ul className="list-disc pl-6 space-y-2">
          <li>Close small debts before applying</li>
          <li>Maintain a credit score above 750</li>
          <li>Add a co applicant with income</li>
          <li>Choose a slightly longer tenure</li>
          <li>Provide stable income proof</li>
        </ul>

        <p>
          These simple steps can help you qualify for a higher loan without increasing financial risk.
        </p>
      </section>


      {/* ================= INTERNAL LINKS ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Useful Related Calculators</h2>

        <p>
          For complete financial planning, you may also use:
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li><Link href="/finance/emi-calculator" className="text-blue-600 underline">EMI Calculator</Link></li>
          <li><Link href="/finance/home-loan-emi-calculator" className="text-blue-600 underline">Home Loan EMI Calculator</Link></li>
          <li><Link href="/finance/personal-loan-emi-calculator" className="text-blue-600 underline">Personal Loan EMI Calculator</Link></li>
        </ul>
      </section>


      {/* ================= FINAL ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Final Thoughts</h2>

        <p>
          Taking a loan should support your goals, not create financial pressure. Always calculate your eligibility
          first, borrow only what you can repay comfortably, and avoid stretching your monthly budget.
        </p>

        <p className="font-medium">
          Check eligibility. Plan smart. Borrow responsibly.
        </p>
      </section>

    </article>
  );
};

export default LoanEligibilityArticle;
