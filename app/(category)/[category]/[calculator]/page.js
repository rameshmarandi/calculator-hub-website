import Header from "@/components/Header";
import Calculator from "@/components/Calculator";

export default function Page({ params }) {
  const { calculator } = params;

  return (
    <>
      <Header />
      <main className="max-w-xl mx-auto p-4">
        {calculator === "emi-calculator" && <Calculator type="emi" />}
        {calculator === "bmi-calculator" && <Calculator type="bmi" />}
      </main>
    </>
  );
}
