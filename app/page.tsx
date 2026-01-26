import Link from 'next/link'
import Header from '@/components/Header'
import categories from '@/data/categories'

export default function Home () {
  return (
    <>
      <Header />

      <main className='max-w-5xl mx-auto px-4 py-10'>
        {/* HERO SECTION */}
        <section className='mb-12 text-center'>
          <h1 className='text-3xl sm:text-4xl font-bold mb-4'>
            Free Online Calculators
          </h1>
          <p className='text-gray-600 max-w-2xl mx-auto'>
            Use our free online calculators for finance, health, and more. Fast,
            accurate, and easy to use on any device.
          </p>
        </section>

        {/* CATEGORY LIST */}
        <section className='grid gap-6 sm:grid-cols-2'>
          {categories.map(cat => (
            <Link
              key={cat.slug}
              href={`/${cat.slug}`}
              className='border rounded-lg p-6 hover:shadow-md transition'
            >
              <h2 className='text-xl font-semibold mb-2'>{cat.name}</h2>
              <p className='text-gray-600'>
                Explore all {cat.name.toLowerCase()} calculators.
              </p>
            </Link>
          ))}
        </section>

        {/* SEO CONTENT (IMPORTANT FOR ADSENSE) */}
        <section className='mt-16 text-gray-700 leading-7'>
          <h2 className='text-2xl font-bold mb-4'>Why Use Our Calculators?</h2>
          <p className='mb-4'>
            Our calculator website is designed to help you make quick and
            accurate calculations without any complicated steps. Whether you
            want to calculate EMI, BMI, or other values, our tools are built to
            be simple and reliable.
          </p>
          <p>
            All calculators work instantly in your browser and are optimized for
            mobile and desktop users. Bookmark this site to access calculators
            anytime.
          </p>
        </section>
      </main>
    </>
  )
}
