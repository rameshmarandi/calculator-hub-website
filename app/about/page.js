import { BRAND_NAME } from "../../lib/constant";

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">{`About ${BRAND_NAME}`}</h1>

      <p className="mb-4">
        QuickCalcfy is a free online calculator platform designed to help users
        make quick, accurate, and informed calculations across multiple domains.
        Our goal is to simplify complex calculations and make them accessible
        to everyone, without requiring registrations or downloads.
      </p>

      <p className="mb-4">
        We provide calculators for finance, health and fitness, construction,
        education, astrology, and general daily use. Each calculator is built
        with a focus on accuracy, simplicity, and mobile-friendly design.
      </p>

      <p className="mb-4">
        QuickCalcfy is suitable for students, professionals, homeowners, investors,
        and anyone who needs reliable calculation tools. All calculations are
        performed instantly in your browser, ensuring speed and privacy.
      </p>

      <p>
        We continuously improve our calculators and add new tools to better
        serve our users. If you have suggestions or feedback, feel free to
        contact us.
      </p>
    </main>
  );
}
