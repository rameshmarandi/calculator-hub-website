import Link from "next/link";
import Header from "@/components/Header";
import calculators from "@/data/calculators";

export default function Page({ params }) {
  const list = calculators[params?.category] || [];

  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">
          {params.category?.toUpperCase()} Calculators
        </h1>

        {list.map((c) => (
          <Link
            key={c.slug}
            href={`/${params.category}/${c.slug}`}
            className="block border p-4 mb-3 rounded hover:bg-gray-50">
            <h2 className="font-semibold">{c.name}</h2>
            <p className="text-sm">{c.description}</p>
          </Link>
        ))}
      </main>
    </>
  );
}
