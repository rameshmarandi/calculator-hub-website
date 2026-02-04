export default function EmiArticle() {
  return (
    <article className="max-w-6xl mx-auto space-y-10 leading-relaxed text-sm sm:text-base">

      {/* Section 1 */}
      <section>
        <h2 className="text-2xl sm:text-3xl font-bold border-b pb-2 mb-4">
          What is EMI (Equated Monthly Installment)?
        </h2>

        <p className="text-[var(--text-muted)]">
          EMI is the fixed monthly amount you pay to repay your loan. It includes
          both principal and interest. Paying EMI regularly reduces your loan
          balance until the loan is fully repaid.
        </p>
      </section>

      {/* Section 2 */}
      <section>
        <h2 className="text-2xl sm:text-3xl font-bold border-b pb-2 mb-4">
          How is EMI Calculated?
        </h2>

        <div
          className="rounded-lg p-4 font-mono text-sm"
          style={{ backgroundColor: "var(--surface-2)" }}
        >
          EMI = P × r × (1 + r)^n / ((1 + r)^n − 1)
        </div>

        <ul className="list-disc pl-6 mt-4 space-y-1">
          <li><strong>P</strong> = Loan Amount</li>
          <li><strong>r</strong> = Monthly Interest Rate</li>
          <li><strong>n</strong> = Tenure in Months</li>
        </ul>
      </section>

      {/* Section 3 */}
      <section>
        <h3 className="text-xl font-semibold mb-3">Example Calculation</h3>

        <p className="text-[var(--text-muted)]">
          If you borrow ₹10,00,000 at 9.5% interest for 10 years, you will pay a
          fixed EMI every month for 120 months. This calculator instantly shows
          your EMI, interest paid, and repayment schedule.
        </p>
      </section>

      {/* Section 4 */}
      <section>
        <h3 className="text-xl font-semibold mb-3">
          Advantages of Using This EMI Calculator
        </h3>

        <ul className="list-disc pl-6 space-y-1">
          <li>Instant calculation</li>
          <li>Principal vs interest breakdown</li>
          <li>Monthly amortization table</li>
          <li>Better loan planning</li>
          <li>Completely free</li>
        </ul>
      </section>

      {/* Section 5 */}
      <section>
        <h3 className="text-xl font-semibold mb-3">
          Frequently Asked Questions
        </h3>

        <div className="space-y-3 text-[var(--text-muted)]">
          <p><strong>Is EMI fixed?</strong> Yes for fixed-rate loans.</p>
          <p><strong>Can EMI be reduced?</strong> Increase tenure or lower rate.</p>
          <p><strong>Does prepayment reduce interest?</strong> Yes, significantly.</p>
        </div>
      </section>

    </article>
  );
}
