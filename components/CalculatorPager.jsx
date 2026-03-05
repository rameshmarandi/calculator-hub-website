import Link from 'next/link'

export default function CalculatorPager ({ list, currentSlug, basePath }) {
  const index = list.findIndex(c => c.slug === currentSlug)

  const prev = list[index - 1]
  const next = list[index + 1]

  if (!prev && !next) return null

  return (
    <div className='flex justify-between gap-3 mt-6 md:hidden'>
      {prev ? (
        <Link
          href={`${basePath}/${prev.slug}`}
          className='flex-1 border rounded-lg px-4 py-3 text-sm'
        >
          ← {prev.name}
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={`${basePath}/${next.slug}`}
          className='flex-1 border rounded-lg px-4 py-3 text-sm text-right'
        >
          {next.name} →
        </Link>
      ) : (
        <div />
      )}
    </div>
  )
}
