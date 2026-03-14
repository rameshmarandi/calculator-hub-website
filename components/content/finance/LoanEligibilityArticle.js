import Link from "next/link";

const LoanEligibilityArticle = () => {
  return (
    <article className="max-w-4xl mx-auto space-y-12 leading-relaxed text-sm sm:text-base text-[var(--text-main)]">
      {/* ================= 1 INTRODUCTION ================= */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold">
          Loan Eligibility Calculator – Check How Much Loan You Can Afford
        </h2>

        <p>
          Before applying for a home loan, personal loan, or any type of credit,
          one of the most important questions you should ask is how much you can
          realistically afford to borrow. Many borrowers focus only on interest
          rates or attractive bank offers, but the real financial decision
          begins with understanding your repayment capacity.
        </p>

        <p>
          A Loan Eligibility Calculator helps estimate the maximum loan amount
          you may qualify for based on important financial factors such as your
          monthly income, existing EMIs, interest rate, and loan tenure. Instead
          of relying on rough estimates or waiting for bank approval, this tool
          provides an instant estimate of your borrowing capacity.
        </p>

        <p>
          Knowing your eligibility before applying for a loan allows you to make
          better financial decisions. It helps prevent loan rejection, ensures
          that your monthly EMI remains manageable, and allows you to choose a
          loan amount that fits comfortably within your budget.
        </p>

        <p>
          This calculator is especially useful for first time borrowers, home
          buyers, salaried professionals, and self employed individuals who want
          to plan their finances responsibly before taking a loan.
        </p>

        <p>
          For more detailed loan planning, you may also use related financial
          tools such as the{" "}
          <Link
            href="/finance/emi-calculator"
            className="text-blue-600 underline"
          >
            EMI Calculator
          </Link>
          ,{" "}
          <Link
            href="/finance/home-loan-emi-calculator"
            className="text-blue-600 underline"
          >
            Home Loan EMI Calculator
          </Link>
          , and{" "}
          <Link
            href="/finance/personal-loan-emi-calculator"
            className="text-blue-600 underline"
          >
            Personal Loan EMI Calculator
          </Link>
          , which help you understand loan payments, repayment schedules, and
          long term borrowing costs.
        </p>
      </section>

      {/* ================= 2 WHY THIS MATTERS ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Why This Calculation Matters</h2>

        <p>
          Many borrowers apply for loans without checking whether their income
          can comfortably support the monthly EMI payments. This often results
          in loan rejection or financial stress later.
        </p>

        <p>
          Banks evaluate loan applications based on repayment capacity. If your
          income cannot support the required EMI, your loan may be rejected or
          approved for a lower amount.
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Helps you understand your safe borrowing limit</li>
          <li>Prevents loan rejection during application</li>
          <li>Keeps monthly EMIs manageable</li>
          <li>Supports better financial planning</li>
          <li>Helps compare different loan options</li>
        </ul>

        <p>
          By calculating eligibility before applying for a loan, you gain a
          clear understanding of what you can realistically afford.
        </p>
      </section>

      {/* ================= 3 CONCEPT ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">What This Concept Means</h2>

        <p>
          Loan eligibility refers to the maximum amount of money that a bank or
          financial institution is willing to lend to a borrower. This decision
          is based on a detailed evaluation of the borrower’s financial profile,
          including income, existing debts, employment stability, and credit
          history.
        </p>

        <p>
          The most important factor lenders consider is repayment capacity.
          Banks want to make sure that your monthly income is sufficient to
          cover the EMI payments while still leaving enough money for daily
          expenses, savings, and other financial commitments.
        </p>

        <p>
          Financial institutions generally allow only a portion of your income
          to be used for loan repayment. This ensures that borrowers do not
          become overburdened with debt and are able to maintain financial
          stability throughout the loan tenure.
        </p>

        <p>
          In simple terms, loan eligibility is not the highest loan amount
          available in the market. Instead, it represents the amount you can
          realistically and safely repay without putting unnecessary pressure on
          your finances.
        </p>
      </section>

      {/* ================= 4 KEY TERMS ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">
          Key Terms Every User Should Understand
        </h2>

        <p>
          Loan calculations often include several financial terms that may be
          unfamiliar to first time borrowers. Understanding these basic concepts
          makes it easier to interpret calculator results and compare loan
          offers from different lenders.
        </p>

        <ul className="list-disc pl-6 space-y-3">
          <li>
            <strong>Loan Principal</strong> – The original amount of money
            borrowed from the lender before interest is added. This is the base
            amount on which interest is calculated.
          </li>

          <li>
            <strong>Interest Rate</strong> – The percentage charged by the
            lender for providing the loan. A higher interest rate increases the
            total repayment amount over the loan tenure.
          </li>

          <li>
            <strong>Loan Tenure</strong> – The total time period given to repay
            the loan. A longer tenure reduces the monthly EMI but increases the
            total interest paid over time.
          </li>

          <li>
            <strong>EMI (Equated Monthly Installment)</strong> – The fixed
            amount paid every month to repay the loan. Each EMI includes a
            portion of the principal amount and the interest charged by the
            lender.
          </li>

          <li>
            <strong>Debt to Income Ratio</strong> – A financial measure used by
            banks to evaluate how much of your monthly income is already used
            for paying existing loans or EMIs.
          </li>

          <li>
            <strong>Credit Score</strong> – A numerical representation of your
            credit history and repayment behavior. A higher credit score usually
            increases the chances of loan approval and may help you get better
            interest rates.
          </li>
        </ul>

        <p>
          Understanding these terms helps borrowers evaluate loan options more
          confidently and interpret the results generated by the Loan
          Eligibility Calculator.
        </p>
      </section>

      {/* ================= 5 HOW CALCULATOR WORKS ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">How the Calculator Works</h2>

        <p>
          The Loan Eligibility Calculator estimates how much money you may be
          able to borrow based on your repayment capacity. It uses common
          banking guidelines that consider your income, current financial
          obligations, interest rate, and loan tenure.
        </p>

        <p>
          The calculator follows a simple step by step process to estimate your
          maximum borrowing limit.
        </p>

        <ol className="list-decimal pl-6 space-y-2">
          <li>
            <strong>Enter your monthly income</strong> – This represents your
            total salary or business income available for loan repayment.
          </li>

          <li>
            <strong>Add existing EMIs</strong> – Any ongoing loan repayments are
            subtracted from your repayment capacity.
          </li>

          <li>
            <strong>Select the expected interest rate</strong> – The interest
            rate affects how much loan amount corresponds to your affordable
            EMI.
          </li>

          <li>
            <strong>Choose the loan tenure</strong> – Longer tenures reduce
            monthly EMI but increase the total interest paid.
          </li>

          <li>
            <strong>Calculate eligibility</strong> – The calculator converts
            your remaining EMI capacity into the maximum loan amount you may
            qualify for.
          </li>
        </ol>

        <p>
          This calculation closely mirrors the method used by banks and
          financial institutions when assessing loan applications.
        </p>
      </section>

      {/* ================= 6 INPUTS ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">
          Inputs Required in the Calculator
        </h2>

        <p>
          To estimate your loan eligibility accurately, the calculator requires
          a few important financial details. These inputs help determine how
          much EMI you can comfortably afford and how large a loan amount you
          may qualify for.
        </p>

        <ul className="list-disc pl-6 space-y-3">
          <li>
            <strong>Monthly Income</strong> – Your total monthly salary or
            business income. This is the primary factor banks use to determine
            repayment capacity.
          </li>

          <li>
            <strong>Existing EMIs</strong> – Any ongoing loan repayments you are
            currently paying. These reduce your available income for new loan
            repayments.
          </li>

          <li>
            <strong>Interest Rate</strong> – The expected interest rate offered
            by the lender. Interest rates affect how much loan amount
            corresponds to a particular EMI.
          </li>

          <li>
            <strong>Loan Tenure</strong> – The time period over which the loan
            will be repaid. Longer tenure usually lowers monthly EMI but
            increases the total interest paid.
          </li>
        </ul>

        <p>
          Entering accurate information ensures that the calculator produces
          realistic loan eligibility estimates.
        </p>
      </section>

      {/* ================= 7 RESULTS ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Understanding the Results</h2>

        <p>
          Once the required information is entered, the calculator provides
          several results that help you understand your borrowing capacity and
          the overall cost of the loan.
        </p>

        <ul className="list-disc pl-6 space-y-3">
          <li>
            <strong>Eligible Loan Amount</strong> – The estimated maximum loan
            amount you may qualify for based on your income and repayment
            capacity.
          </li>

          <li>
            <strong>Estimated EMI</strong> – The monthly installment required to
            repay the loan over the selected tenure.
          </li>

          <li>
            <strong>Total Interest Payable</strong> – The total interest amount
            you would pay during the entire loan period.
          </li>

          <li>
            <strong>Total Repayment</strong> – The combined amount of the
            principal loan and interest that will be paid over the full tenure.
          </li>
        </ul>

        <p>
          Reviewing these results helps you understand whether the loan is
          affordable and allows you to adjust tenure or interest assumptions
          before applying with a lender.
        </p>
      </section>

      {/* ================= 8 FORMULA ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Mathematical Formula Used</h2>

        <p>
          Banks determine loan eligibility primarily based on repayment
          capacity. Financial institutions usually allow only a portion of your
          monthly income to be used for loan repayments. This ensures borrowers
          are able to manage EMIs without affecting their daily living expenses.
        </p>

        <div className="p-4 rounded-lg border bg-[var(--surface-2)] font-mono text-sm">
          Eligible EMI = Monthly Income × 40% − Existing EMIs
        </div>

        <p>
          In many cases, lenders allow around 40% to 50% of a borrower’s monthly
          income to be allocated toward EMI payments. Any existing loan
          repayments are deducted from this amount to determine the remaining
          EMI capacity available for a new loan.
        </p>

        <p>
          Once the eligible EMI is calculated, banks convert this EMI into a
          loan amount using the standard EMI calculation formula based on
          interest rate and loan tenure. This step determines the maximum loan
          amount a borrower may qualify for.
        </p>
      </section>

      {/* ================= 9 EXAMPLES ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Example Calculations</h2>

        <p>
          The following examples show how income and existing loan obligations
          affect loan eligibility.
        </p>

        <p>
          <strong>Example 1:</strong> Suppose a borrower earns ₹60,000 per month
          and has no existing EMIs. If the bank allows 40% of income for EMI,
          the maximum EMI capacity becomes ₹24,000. This EMI amount is then
          converted into the eligible loan value based on interest rate and
          tenure.
        </p>

        <p>
          <strong>Example 2:</strong> If the same borrower already has an
          existing EMI of ₹5,000, the available EMI capacity becomes ₹19,000.
          This reduces the maximum loan amount the borrower can qualify for.
        </p>

        <p>
          <strong>Example 3:</strong> If the borrower’s income increases to
          ₹80,000 per month with no existing loans, the EMI capacity may
          increase to ₹32,000, allowing a larger loan amount.
        </p>

        <p>
          These examples illustrate why income level, existing EMIs, interest
          rates, and loan tenure all play an important role in determining loan
          eligibility.
        </p>
      </section>

      {/* ================= 10 COMPARISON ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Comparison Scenarios</h2>

        <p>
          Loan eligibility can change significantly depending on income,
          interest rate, loan tenure, and existing financial commitments. Even
          small adjustments in these factors can increase or decrease the
          maximum loan amount you may qualify for.
        </p>

        <p>
          The following scenarios demonstrate how different conditions influence
          borrowing capacity.
        </p>

        <ul className="list-disc pl-6 space-y-3">
          <li>
            <strong>Higher Income</strong> – When monthly income increases,
            banks allow a higher EMI limit. This increases the loan amount you
            may qualify for.
          </li>

          <li>
            <strong>Higher Interest Rates</strong> – If interest rates rise, the
            cost of borrowing increases. This reduces the loan amount
            corresponding to a fixed EMI.
          </li>

          <li>
            <strong>Longer Loan Tenure</strong> – A longer repayment period
            lowers monthly EMI, which can increase loan eligibility. However, it
            also increases the total interest paid over time.
          </li>

          <li>
            <strong>Existing EMIs</strong> – Ongoing loan repayments reduce your
            remaining repayment capacity, which decreases the loan amount you
            can safely borrow.
          </li>
        </ul>

        <p>
          Exploring different combinations of these factors helps borrowers
          understand how changes in financial conditions can impact loan
          approval and borrowing limits.
        </p>
      </section>

      {/* ================= 11 FACTORS ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Factors That Affect the Result</h2>

        <p>
          Banks evaluate several financial and personal factors before approving
          a loan. These variables help lenders determine whether a borrower can
          comfortably repay the loan throughout the chosen tenure.
        </p>

        <ul className="list-disc pl-6 space-y-3">
          <li>
            <strong>Income Level</strong> – Higher income increases repayment
            capacity and allows lenders to approve larger loan amounts.
          </li>

          <li>
            <strong>Existing Loan Obligations</strong> – Current EMIs reduce the
            portion of income available for new loan repayments.
          </li>

          <li>
            <strong>Credit Score</strong> – A strong credit score indicates
            responsible financial behavior and improves the chances of loan
            approval.
          </li>

          <li>
            <strong>Employment Stability</strong> – Stable employment or
            consistent business income increases lender confidence in your
            repayment ability.
          </li>

          <li>
            <strong>Interest Rate Offered</strong> – Interest rates influence
            EMI calculations and therefore affect the loan amount you may
            qualify for.
          </li>
        </ul>

        <p>
          Improving even one of these factors can increase your chances of
          qualifying for a higher loan amount from lenders.
        </p>
      </section>
      {/* ================= 12 BENEFITS ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">
          Benefits of Using This Calculator
        </h2>

        <p>
          A Loan Eligibility Calculator simplifies the process of estimating how
          much money you can safely borrow. Instead of manually calculating loan
          affordability or waiting for bank approval, the tool provides quick
          insights based on your financial information.
        </p>

        <ul className="list-disc pl-6 space-y-3">
          <li>
            <strong>Instant Loan Estimation</strong> – The calculator provides
            an immediate estimate of your borrowing capacity without requiring
            complex manual calculations.
          </li>

          <li>
            <strong>Better Financial Planning</strong> – Knowing your loan
            eligibility allows you to plan major financial decisions such as
            buying a house or funding personal expenses more responsibly.
          </li>

          <li>
            <strong>Avoid Loan Rejection</strong> – Understanding your
            eligibility before applying helps reduce the chances of loan
            rejection by lenders.
          </li>

          <li>
            <strong>Easy Loan Comparison</strong> – By adjusting interest rates
            or tenure, you can compare different loan scenarios and select the
            option that fits your financial situation.
          </li>

          <li>
            <strong>Improved Borrowing Decisions</strong> – The calculator helps
            you choose a loan amount that is comfortable to repay instead of
            borrowing the maximum available amount.
          </li>
        </ul>
      </section>

      {/* ================= 13 USE CASES ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Practical Use Cases</h2>

        <p>
          A Loan Eligibility Calculator can be useful in several real life
          financial situations. By estimating borrowing capacity in advance, the
          tool helps borrowers make informed decisions before approaching banks
          or financial institutions.
        </p>

        <ul className="list-disc pl-6 space-y-3">
          <li>
            <strong>Planning a Home Purchase</strong> – Home buyers can estimate
            the maximum property price they can afford based on their loan
            eligibility.
          </li>

          <li>
            <strong>Applying for a Personal Loan</strong> – Borrowers can check
            how much they may qualify for before submitting loan applications.
          </li>

          <li>
            <strong>Comparing Bank Offers</strong> – The calculator helps
            evaluate how different interest rates or tenures affect loan
            eligibility.
          </li>

          <li>
            <strong>Understanding Borrowing Capacity</strong> – Individuals can
            determine a safe loan amount that fits within their monthly budget.
          </li>

          <li>
            <strong>Financial Planning for Large Expenses</strong> – The tool
            can help plan funding for education, home renovation, or other major
            expenses that require borrowing.
          </li>
        </ul>

        <p>
          Using the calculator before approaching lenders helps borrowers
          prepare better and avoid unrealistic loan expectations.
        </p>
      </section>

      {/* ================= 14 MISTAKES ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Mistakes People Commonly Make</h2>

        <p>
          Many borrowers make financial decisions without fully understanding
          their repayment capacity. This can lead to loan rejections, high
          financial pressure, or difficulty managing monthly EMIs.
        </p>

        <ul className="list-disc pl-6 space-y-3">
          <li>
            <strong>Borrowing the Maximum Offered Amount</strong> – Just because
            a bank approves a large loan does not mean it is financially
            comfortable to repay. Borrowing too much can strain your monthly
            budget.
          </li>

          <li>
            <strong>Ignoring Existing Debt Obligations</strong> – Existing loans
            reduce your available income for new EMIs. Many borrowers
            underestimate the impact of multiple loans on their finances.
          </li>

          <li>
            <strong>Not Calculating EMI Affordability</strong> – Applying for a
            loan without estimating the monthly EMI can result in repayment
            difficulties later.
          </li>

          <li>
            <strong>Choosing Very Long Loan Tenures</strong> – Longer tenures
            reduce EMI amounts but significantly increase the total interest
            paid over the life of the loan.
          </li>
        </ul>

        <p>
          Avoiding these mistakes helps borrowers maintain financial stability
          and make more responsible borrowing decisions.
        </p>
      </section>

      {/* ================= 15 TIPS ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Tips to Improve Loan Eligibility</h2>

        <p>
          If your current loan eligibility is lower than expected, there are
          several practical steps you can take to improve your chances of
          qualifying for a higher loan amount.
        </p>

        <ul className="list-disc pl-6 space-y-3">
          <li>
            <strong>Maintain a High Credit Score</strong> – Paying bills and
            EMIs on time helps build a strong credit history, which improves
            loan approval chances.
          </li>

          <li>
            <strong>Reduce Existing Debts</strong> – Closing smaller loans or
            credit card balances increases your repayment capacity.
          </li>

          <li>
            <strong>Increase Loan Tenure Slightly</strong> – Choosing a slightly
            longer repayment period can reduce EMI and increase loan
            eligibility.
          </li>

          <li>
            <strong>Add a Co Applicant</strong> – Including a spouse or family
            member with income can increase the total household income used for
            eligibility calculations.
          </li>

          <li>
            <strong>Maintain Stable Employment</strong> – Consistent income and
            stable job history improve lender confidence in repayment ability.
          </li>
        </ul>

        <p>
          Following these strategies can help improve your loan eligibility and
          increase the chances of getting approved for a larger loan amount.
        </p>
      </section>

      {/* ================= 16 WHEN TO USE ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">
          When Should You Use This Calculator
        </h2>

        <p>
          A Loan Eligibility Calculator is useful whenever you want to
          understand how much money you can safely borrow without putting
          pressure on your monthly finances. Using this tool before applying for
          a loan helps you make better borrowing decisions and avoid unrealistic
          expectations.
        </p>

        <ul className="list-disc pl-6 space-y-3">
          <li>
            <strong>Before Applying for a Loan</strong> – Check your borrowing
            capacity before submitting loan applications to banks or lenders.
          </li>

          <li>
            <strong>When Planning a Home Purchase</strong> – Estimate how much
            property value you can afford based on your income and repayment
            capacity.
          </li>

          <li>
            <strong>While Comparing Loan Options</strong> – Evaluate how
            different interest rates or tenures affect your loan eligibility.
          </li>

          <li>
            <strong>During Financial Planning</strong> – Understand how a new
            loan will affect your monthly budget and long term finances.
          </li>

          <li>
            <strong>Before Taking Additional Loans</strong> – Check whether you
            can manage another loan alongside your existing EMIs.
          </li>
        </ul>

        <p>
          Using the calculator in these situations helps you borrow responsibly
          and maintain a balanced financial plan.
        </p>
      </section>

      {/* ================= 17 RELATED ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Related Financial Tools</h2>

        <p>
          Loan planning usually involves several calculations such as EMI,
          interest cost, and repayment schedules. These related financial
          calculators can help you understand different aspects of borrowing.
        </p>

        <ul className="list-disc pl-6 space-y-3">
          <li>
            <Link
              href="/finance/emi-calculator"
              className="text-blue-600 underline"
            >
              EMI Calculator
            </Link>{" "}
            – Calculate the monthly EMI for different loan amounts, interest
            rates, and tenures.
          </li>

          <li>
            <Link
              href="/finance/home-loan-emi-calculator"
              className="text-blue-600 underline"
            >
              Home Loan EMI Calculator
            </Link>{" "}
            – Estimate monthly payments and total interest for home financing.
          </li>

          <li>
            <Link
              href="/finance/personal-loan-emi-calculator"
              className="text-blue-600 underline"
            >
              Personal Loan EMI Calculator
            </Link>{" "}
            – Understand repayment schedules and costs for personal loans.
          </li>
        </ul>

        <p>
          Using these tools together provides a clearer understanding of loan
          affordability and long term borrowing costs.
        </p>
      </section>

      {/* ================= 18 FAQ ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>

        <p>
          <strong>What is loan eligibility?</strong>
          <br />
          Loan eligibility is the maximum loan amount a bank or financial
          institution may approve based on your income, repayment capacity,
          existing debts, and credit profile.
        </p>

        <p>
          <strong>Does salary affect loan eligibility?</strong>
          <br />
          Yes. Higher monthly income increases repayment capacity, which
          generally allows borrowers to qualify for a larger loan amount.
        </p>

        <p>
          <strong>Can existing loans reduce eligibility?</strong>
          <br />
          Yes. Existing EMIs reduce the portion of your income available for new
          loan repayments, which lowers the maximum loan amount you may qualify
          for.
        </p>

        <p>
          <strong>Is credit score important for loan eligibility?</strong>
          <br />
          Yes. A higher credit score indicates responsible borrowing behavior
          and improves the chances of loan approval. It may also help you get
          better interest rates from lenders.
        </p>

        <p>
          <strong>Can longer tenure increase the loan amount?</strong>
          <br />
          Yes. Longer repayment periods reduce the monthly EMI, which can
          increase the loan amount you qualify for. However, longer tenures also
          increase the total interest paid over time.
        </p>

        <p>
          <strong>Do all banks use the same eligibility formula?</strong>
          <br />
          While the exact calculation may vary slightly, most banks follow
          similar guidelines based on income, EMI capacity, credit score, and
          debt to income ratio.
        </p>

        <p>
          <strong>Can self employed individuals use this calculator?</strong>
          <br />
          Yes. Self employed borrowers can use their average monthly business
          income to estimate loan eligibility.
        </p>

        <p>
          <strong>Is the Loan Eligibility Calculator accurate?</strong>
          <br />
          The calculator provides realistic estimates based on common banking
          formulas. However, final approval and loan amount depend on the
          lender’s internal policies and credit evaluation.
        </p>
      </section>
      {/* ================= DISCLAIMER ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Disclaimer</h2>

        <p>
          The results generated by this Loan Eligibility Calculator are
          estimates based on common banking guidelines and standard financial
          formulas. Actual loan approval, interest rates, and eligible loan
          amounts may vary depending on the lender’s internal policies, credit
          score evaluation, documentation, and financial background of the
          applicant.
        </p>

        <p>
          This tool is intended for informational and educational purposes only.
          It should not be considered financial or lending advice. Borrowers are
          encouraged to consult banks, financial institutions, or financial
          advisors for exact loan eligibility and personalized financial
          guidance.
        </p>
      </section>
    </article>
  );
};

export default LoanEligibilityArticle;
