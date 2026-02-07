const HomeLoanEMIArticle = () => {
  return (
    <article className="max-w-4xl mx-auto space-y-12 leading-relaxed text-sm sm:text-base text-[var(--text-main)]">
      {/* ================= HERO IMAGE ================= */}
      <section className="space-y-6">
        <div className="rounded-xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1600&auto=format&fit=crop"
            alt="Home loan planning with calculator and house model"
            className="w-full h-auto"
            loading="lazy"
          />
        </div>

        <h1 className="text-3xl font-bold">
          Home Loan EMI Calculator – Calculate Monthly Payments Before You
          Commit
        </h1>

        <p>
          Buying a home is one of the biggest financial decisions you will ever
          make. A housing loan usually runs for 15 to 30 years, which means even
          small mistakes in planning can cost you lakhs in extra interest. That
          is why using a Home Loan EMI Calculator is not optional. It is a smart
          first step before applying for any mortgage or housing finance.
        </p>

        <p>
          Instead of guessing how much you can afford, this calculator tells you
          the exact monthly EMI, total interest payable, and overall repayment
          amount within seconds. You get complete clarity before signing any
          loan agreement. Clear numbers lead to better decisions. Better
          decisions save money.
        </p>
      </section>

      {/* ================= WHAT IS EMI ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">
          What Does EMI Mean in a Home Loan?
        </h2>

        <p>
          EMI stands for Equated Monthly Installment. It is the fixed amount you
          pay every month to your lender until your home loan is fully repaid.
          Each EMI consists of two components.
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Principal – the actual amount borrowed</li>
          <li>Interest – the charge for borrowing money</li>
        </ul>

        <p>
          During the early years, most of your EMI goes toward interest. Later,
          the principal share increases. Many borrowers misunderstand this and
          assume they are reducing the loan faster than they actually are. A
          calculator shows you the reality upfront.
        </p>
      </section>

      {/* ================= WHY CALCULATOR ================= */}
      <section className="space-y-6">
        <div className="rounded-xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1600&auto=format&fit=crop"
            alt="Laptop displaying EMI calculator results"
            className="w-full h-auto"
            loading="lazy"
          />
        </div>

        <h2 className="text-2xl font-bold">
          Why You Should Always Calculate EMI First
        </h2>

        <p>
          Most people focus only on loan approval. They ignore whether the EMI
          fits comfortably into their income. This approach creates pressure
          later. If your EMI is too high, it affects savings, lifestyle, and
          even mental peace.
        </p>

        <p>
          A Home Loan EMI Calculator helps you plan responsibly. You know your
          limits before committing. Financial discipline at this stage prevents
          long term stress.
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Know exact monthly payment instantly</li>
          <li>Avoid borrowing more than necessary</li>
          <li>Compare banks easily</li>
          <li>Choose best tenure</li>
          <li>Reduce interest burden</li>
          <li>Plan household expenses confidently</li>
        </ul>
      </section>

      {/* ================= FORMULA ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">How EMI is Calculated</h2>

        <div className="p-4 rounded-lg border bg-[var(--surface-2)] font-mono text-sm overflow-x-auto">
          EMI = P × r × (1 + r)^n / ((1 + r)^n − 1)
        </div>

        <p>
          Where P is the loan amount, r is the monthly interest rate, and n is
          the total number of months. While this looks complex, the calculator
          handles everything automatically and delivers accurate results
          instantly.
        </p>
      </section>

      {/* ================= EXAMPLE ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Example Home Loan Calculation</h2>

        <p>
          Imagine you take a home loan of ₹50,00,000 at 8.5 percent annual
          interest for 20 years.
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Monthly EMI ≈ ₹43,400</li>
          <li>Total repayment ≈ ₹1.04 crore</li>
          <li>Total interest ≈ ₹54 lakh</li>
        </ul>

        <p>
          Notice something important. You pay more in interest than half of your
          original loan. That is why comparing tenure and rates before
          finalizing is extremely important.
        </p>
      </section>

      {/* ================= TENURE IMPACT ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">How Tenure Impacts Your EMI</h2>

        <p>
          Your loan tenure directly changes how much you pay every month and how
          much total interest you pay overall.
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Short tenure → higher EMI but lower interest</li>
          <li>Long tenure → lower EMI but higher interest</li>
        </ul>

        <p>
          If you can afford slightly higher monthly payments, choosing a shorter
          tenure can save several lakhs in the long run. Always test different
          combinations inside the calculator before deciding.
        </p>
      </section>

      {/* ================= TIPS ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">
          Practical Tips to Reduce Home Loan EMI
        </h2>

        <ul className="list-disc pl-6 space-y-2">
          <li>Increase down payment</li>
          <li>Maintain high credit score</li>
          <li>Negotiate lower interest rate</li>
          <li>Make part prepayments yearly</li>
          <li>Transfer balance to cheaper lender</li>
          <li>Avoid unnecessary long tenures</li>
        </ul>

        <p>
          These small actions combined can reduce your loan cost dramatically.
          Smart borrowers focus on interest savings, not just EMI comfort.
        </p>
      </section>

      {/* ================= FAQ ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>

        <h3 className="font-semibold">Is EMI fixed every month?</h3>
        <p>
          Yes for fixed rate loans. Floating rate loans may vary with market
          rates.
        </p>

        <h3 className="font-semibold">Can I prepay my home loan?</h3>
        <p>
          Yes. Paying extra reduces principal and saves significant interest.
        </p>

        <h3 className="font-semibold">Is this calculator accurate?</h3>
        <p>Yes. It uses the same standard banking formula for calculations.</p>

        <h3 className="font-semibold">
          Should I choose longer tenure for comfort?
        </h3>
        <p>
          Only if necessary. Longer tenure increases total interest heavily.
          Shorter tenure is financially smarter when affordable.
        </p>
      </section>

      {/* ================= CONCLUSION ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Final Thoughts</h2>

        <p>
          A home loan will stay with you for years. Walking into it without
          planning is careless. Use the Home Loan EMI Calculator, test multiple
          scenarios, understand the numbers clearly, and then borrow only what
          you can comfortably repay.
        </p>

        <p className="font-medium">
          Calculate first. Commit later. Stay financially strong.
        </p>
      </section>
    </article>
  );
};

export default HomeLoanEMIArticle;
