import Link from "next/link";

const GSTCalculatorArticle = () => {
  return (
    <article className="max-w-4xl mx-auto space-y-14 leading-relaxed text-sm sm:text-base text-[var(--text-main)]">

      {/* ================= HERO ================= */}
      <section className="space-y-6">
        <h1 className="text-3xl font-bold">
          GST Calculator – Calculate GST Amount, CGST, SGST and Final Price Instantly
        </h1>

        <p>
          Whether you run a business, send invoices, or simply want to check the
          correct price of a product, calculating GST manually can be confusing.
          Small mistakes in tax calculation can lead to wrong billing or losses.
        </p>

        <p>
          This GST Calculator helps you add or remove GST in seconds. Enter the
          amount and GST rate to instantly see tax value, total price, and the
          split between CGST and SGST or IGST.
        </p>

        <div className="grid grid-cols-2 gap-3 font-medium text-sm">
          <span>✔ Instant GST Calculation</span>
          <span>✔ CGST/SGST Breakdown</span>
          <span>✔ 100% Free Tool</span>
          <span>✔ No Signup Required</span>
        </div>
      </section>


      {/* ================= WHY USE ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Why Use a GST Calculator?</h2>

        <p>
          Manually calculating tax percentages every time wastes time and often
          causes errors. This tool gives you accurate results immediately.
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Calculate GST on any product or service price</li>
          <li>Separate CGST and SGST automatically</li>
          <li>Remove GST to find base price</li>
          <li>Create correct invoices</li>
          <li>Save time during billing and accounting</li>
        </ul>
      </section>


      {/* ================= WHAT IS GST ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">What Is GST?</h2>

        <p>
          GST, or Goods and Services Tax, is an indirect tax applied to the
          supply of goods and services. It replaced multiple older taxes and
          simplified the taxation system into a single structure.
        </p>

        <p>
          GST is generally divided into:
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li><strong>CGST</strong> – Central GST collected by the central government</li>
          <li><strong>SGST</strong> – State GST collected by the state government</li>
          <li><strong>IGST</strong> – Inter state GST for interstate transactions</li>
        </ul>
      </section>


      {/* ================= HOW CALCULATOR WORKS ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">How This GST Calculator Works</h2>

        <p>
          You can either add GST to a base price or remove GST from an inclusive
          price. The calculator handles both automatically.
        </p>

        <ol className="list-decimal pl-6 space-y-2">
          <li>Enter the original amount</li>
          <li>Select GST rate like 5%, 12%, 18%, or 28%</li>
          <li>Choose add GST or remove GST</li>
          <li>View tax amount and final price instantly</li>
        </ol>
      </section>


      {/* ================= FORMULAS ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">GST Calculation Formulas</h2>

        <div className="p-4 rounded-lg border bg-[var(--surface-2)] font-mono text-sm space-y-2">
          <p>GST Amount = (Price × GST Rate) / 100</p>
          <p>Final Price = Price + GST Amount</p>
          <p>Base Price (GST included) = Price × 100 / (100 + GST Rate)</p>
        </div>

        <p>
          The calculator uses these formulas internally to give precise results
          without manual effort.
        </p>
      </section>


      {/* ================= EXAMPLES ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Example Calculations</h2>

        <ul className="list-disc pl-6 space-y-2">
          <li>₹1,000 with 18% GST → Final price ₹1,180</li>
          <li>GST amount → ₹180</li>
          <li>CGST ₹90 + SGST ₹90</li>
        </ul>

        <p>
          These quick examples show how easily GST changes the final billing price.
        </p>
      </section>


      {/* ================= WHO SHOULD USE ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Who Should Use This Tool?</h2>

        <ul className="list-disc pl-6 space-y-2">
          <li>Shop owners and retailers</li>
          <li>Freelancers and consultants</li>
          <li>Business owners preparing invoices</li>
          <li>Students learning taxation</li>
          <li>Customers checking product prices</li>
        </ul>

        <p>
          Anyone dealing with GST regularly can save time using this calculator.
        </p>
      </section>


      {/* ================= COMMON RATES ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Common GST Rates in India</h2>

        <ul className="list-disc pl-6 space-y-2">
          <li>5% – essential goods</li>
          <li>12% – standard items</li>
          <li>18% – most services and products</li>
          <li>28% – luxury or premium goods</li>
        </ul>
      </section>


      {/* ================= RELATED TOOLS ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Useful Related Calculators</h2>

        <ul className="list-disc pl-6 space-y-2">
          <li>
            <Link href="/finance/emi-calculator" className="text-blue-600 underline">
              EMI Calculator
            </Link>
          </li>
          <li>
            <Link href="/finance/loan-eligibility-calculator" className="text-blue-600 underline">
              Loan Eligibility Calculator
            </Link>
          </li>
          <li>
            <Link href="/finance/credit-card-emi-calculator" className="text-blue-600 underline">
              Credit Card EMI Calculator
            </Link>
          </li>
        </ul>
      </section>


      {/* ================= FINAL ================= */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Final Thoughts</h2>

        <p>
          Correct tax calculation is important for both businesses and customers.
          Using a reliable GST calculator saves time, reduces mistakes, and helps
          maintain accurate billing every day.
        </p>

        <p className="font-medium">
          Calculate faster. Bill accurately. Stay compliant.
        </p>
      </section>

    </article>
  );
};

export default GSTCalculatorArticle;
