import Link from 'next/link'

const popularCalculators = [
  {
    title: 'EMI Calculator',
    category: 'Finance',
    description: 'Calculate monthly EMI, total interest and total repayment.',
    href: '/finance/emi-calculator/'
  },
  {
    title: 'SIP Calculator',
    category: 'Finance',
    description:
      'Estimate potential investment growth from regular SIP contributions.',
    href: '/finance/sip-calculator/'
  },
  {
    title: 'BMI Calculator',
    category: 'Health',
    description: 'Calculate BMI using your height and weight.',
    href: '/health/bmi-calculator/'
  },
  {
    title: 'GST Calculator',
    category: 'Finance',
    description: 'Calculate GST-inclusive and GST-exclusive amounts.',
    href: '/finance/gst-calculator/'
  },
  {
    title: 'Percentage Calculator',
    category: 'Education',
    description: 'Solve common percentage calculations quickly.',
    href: '/education/percentage-calculator/'
  },
  {
    title: 'CAGR Calculator',
    category: 'Finance',
    description: 'Calculate compound annual growth rate for an investment.',
    href: '/finance/cagr-calculator/'
  },
  {
    title: 'Concrete Calculator',
    category: 'Construction',
    description: 'Estimate concrete volume using project dimensions.',
    href: '/construction/concrete-calculator/'
  },
  {
    title: 'Cement Quantity Calculator',
    category: 'Construction',
    description: 'Estimate cement requirements for common construction work.',
    href: '/construction/cement-quantity-calculator/'
  }
]

const categories = [
  {
    title: 'Finance',
    count: '30+ calculators',
    description:
      'Loans, investments, savings, tax, salary and financial planning.',
    href: '/finance/'
  },
  {
    title: 'Construction',
    count: '20+ calculators',
    description:
      'Materials, quantity, area, volume and construction estimates.',
    href: '/construction/'
  },
  {
    title: 'Health',
    count: '15+ calculators',
    description:
      'Health, fitness, body measurements and wellness calculations.',
    href: '/health/'
  },
  {
    title: 'Education',
    count: '15+ calculators',
    description:
      'Percentage, GPA, CGPA, marks, grades and education calculations.',
    href: '/education/'
  }
]

const guides = [
  {
    title: 'How EMI is calculated',
    description:
      'Understand the EMI formula, interest calculation and repayment structure.',
    href: '/finance/emi-calculator/'
  },
  {
    title: 'How SIP returns are calculated',
    description:
      'Understand how investment amount, return assumptions and time affect projections.',
    href: '/finance/sip-calculator/'
  },
  {
    title: 'How BMI is calculated',
    description: 'Learn how height and weight are used to calculate BMI.',
    href: '/health/bmi-calculator/'
  },
  {
    title: 'How construction quantities are estimated',
    description:
      'Explore practical calculations used for common construction measurements.',
    href: '/construction/'
  }
]

const faqItems = [
  {
    question: 'What is Swiftcalcfy?',
    answer:
      'Swiftcalcfy is an online calculator platform covering finance, construction, health and education.'
  },
  {
    question: 'Are the calculators free?',
    answer:
      'Yes. The calculators are designed to be available for free without requiring an account for basic use.'
  },
  {
    question: 'How should I use the results?',
    answer:
      'Review the displayed result together with the formula, examples, assumptions and limitations provided by the relevant calculator.'
  },
  {
    question: 'Can I browse calculators by category?',
    answer:
      'Yes. Calculators are organized into Finance, Construction, Health and Education categories.'
  }
]

function ArrowIcon () {
  return (
    <svg viewBox='0 0 20 20' fill='none' className='h-4 w-4' aria-hidden='true'>
      <path
        d='M4 10h11M10.5 5.5 15 10l-4.5 4.5'
        stroke='currentColor'
        strokeWidth='1.7'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

function CalculatorIcon () {
  return (
    <svg viewBox='0 0 24 24' fill='none' className='h-5 w-5' aria-hidden='true'>
      <rect
        x='5'
        y='3'
        width='14'
        height='18'
        rx='2.5'
        stroke='currentColor'
        strokeWidth='1.6'
      />

      <rect
        x='8'
        y='6'
        width='8'
        height='3'
        rx='0.8'
        stroke='currentColor'
        strokeWidth='1.4'
      />

      <path
        d='M8 12h2M14 12h2M8 16h2M14 16h2'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
      />
    </svg>
  )
}

function BookIcon () {
  return (
    <svg viewBox='0 0 24 24' fill='none' className='h-5 w-5' aria-hidden='true'>
      <path
        d='M5 4.5A2.5 2.5 0 0 1 7.5 2H19v17H7.5A2.5 2.5 0 0 0 5 21V4.5Z'
        stroke='currentColor'
        strokeWidth='1.6'
        strokeLinejoin='round'
      />

      <path
        d='M5 18.5A2.5 2.5 0 0 1 7.5 16H19'
        stroke='currentColor'
        strokeWidth='1.5'
      />
    </svg>
  )
}

export default function HomePage () {
  return (
    <main
      className='min-h-screen'
      style={{
        backgroundColor: 'var(--surface)',
        color: 'var(--text-main)'
      }}
    >
      {/* =========================================================
          HERO
      ========================================================== */}
      <section
        className='border-b'
        style={{
          backgroundColor: 'var(--surface)',
          borderColor: 'var(--border)'
        }}
      >
        <div className='mx-auto max-w-6xl px-4 pb-12 pt-12 sm:px-6 sm:pb-14 sm:pt-14 lg:px-8 lg:pt-16'>
          <div className='mx-auto max-w-4xl text-center'>
            {/* Label */}
            <div
              className='mx-auto inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium'
              style={{
                backgroundColor: 'var(--hover-bg)',
                borderColor: 'var(--border)',
                color: 'var(--text-main)'
              }}
            >
              <CalculatorIcon />
              Free online calculators
            </div>

            {/* H1 */}
            <h1
              className='mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl'
              style={{
                color: 'var(--text-main)'
              }}
            >
              Free Online Calculators
            </h1>

            {/* Supporting Heading */}
            <h2
              className='mt-3 text-2xl font-semibold tracking-tight sm:text-3xl'
              style={{
                color: 'var(--primary)'
              }}
            >
              Calculate everyday problems with clear, practical tools.
            </h2>

            {/* Description */}
            <p
              className='mx-auto mt-5 max-w-2xl text-base leading-7 sm:text-lg'
              style={{
                color: 'var(--text-main)',
                opacity: 0.72
              }}
            >
              Explore calculators for finance, construction, health and
              education, with clear inputs, useful examples and explanations
              that help you understand the result.
            </p>

            {/* CTAs */}
            <div className='mt-7 flex flex-col justify-center gap-3 sm:flex-row'>
              <Link
                href='/finance/'
                className='inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition hover:opacity-90'
                style={{
                  backgroundColor: 'var(--primary)',
                  color: '#ffffff'
                }}
              >
                Explore all calculators
                <ArrowIcon />
              </Link>

              <Link
                href='#popular'
                className='inline-flex items-center justify-center gap-2 rounded-xl border px-6 py-3.5 text-sm font-semibold transition hover:opacity-90'
                style={{
                  backgroundColor: 'var(--hover-bg)',
                  borderColor: 'var(--border)',
                  color: 'var(--text-main)'
                }}
              >
                Popular calculators
                <ArrowIcon />
              </Link>
            </div>

            {/* Supporting points */}
            <p
              className='mt-5 text-sm'
              style={{
                color: 'var(--text-main)',
                opacity: 0.55
              }}
            >
              Free to use • No signup required • Mobile friendly
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          POPULAR CALCULATORS
      ========================================================== */}
      <section
        id='popular'
        className='border-b py-12 sm:py-14'
        style={{
          backgroundColor: 'var(--hover-bg)',
          borderColor: 'var(--border)'
        }}
      >
        <div className='mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
          <div className='flex items-end justify-between gap-5'>
            <div>
              <p
                className='text-xs font-semibold uppercase tracking-wider'
                style={{
                  color: 'var(--primary)'
                }}
              >
                Popular tools
              </p>

              <h2
                className='mt-2 text-2xl font-bold tracking-tight sm:text-3xl'
                style={{
                  color: 'var(--text-main)'
                }}
              >
                Start with a calculator
              </h2>

              <p
                className='mt-2 text-sm leading-6'
                style={{
                  color: 'var(--text-main)',
                  opacity: 0.68
                }}
              >
                Quick access to commonly used calculators.
              </p>
            </div>

            <Link
              href='/finance/'
              className='hidden items-center gap-2 text-sm font-semibold sm:inline-flex'
              style={{
                color: 'var(--primary)'
              }}
            >
              View all
              <ArrowIcon />
            </Link>
          </div>

          <div className='mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
            {popularCalculators.map(calculator => (
              <Link
                key={calculator.title}
                href={calculator.href}
                className='group rounded-2xl border p-5 transition duration-200 hover:-translate-y-0.5 hover:shadow-lg'
                style={{
                  backgroundColor: 'var(--surface)',
                  borderColor: 'var(--border)'
                }}
              >
                <div className='flex items-center justify-between gap-3'>
                  <div
                    className='flex h-10 w-10 items-center justify-center rounded-xl'
                    style={{
                      backgroundColor: 'var(--hover-bg)',
                      color: 'var(--primary)'
                    }}
                  >
                    <CalculatorIcon />
                  </div>

                  <span
                    className='rounded-full border px-2.5 py-1 text-xs'
                    style={{
                      borderColor: 'var(--border)',
                      color: 'var(--text-main)',
                      opacity: 0.6
                    }}
                  >
                    {calculator.category}
                  </span>
                </div>

                <h3
                  className='mt-5 text-base font-semibold'
                  style={{
                    color: 'var(--text-main)'
                  }}
                >
                  {calculator.title}
                </h3>

                <p
                  className='mt-2 text-sm leading-6'
                  style={{
                    color: 'var(--text-main)',
                    opacity: 0.68
                  }}
                >
                  {calculator.description}
                </p>

                <span
                  className='mt-5 inline-flex items-center gap-2 text-sm font-semibold'
                  style={{
                    color: 'var(--primary)'
                  }}
                >
                  Calculate
                  <ArrowIcon />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          CATEGORIES
      ========================================================== */}
      <section
        id='categories'
        className='border-b py-12 sm:py-14'
        style={{
          backgroundColor: 'var(--surface)',
          borderColor: 'var(--border)'
        }}
      >
        <div className='mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
          <div>
            <p
              className='text-xs font-semibold uppercase tracking-wider'
              style={{
                color: 'var(--primary)'
              }}
            >
              Browse calculators
            </p>

            <h2
              className='mt-2 text-2xl font-bold tracking-tight sm:text-3xl'
              style={{
                color: 'var(--text-main)'
              }}
            >
              Find the right category
            </h2>

            <p
              className='mt-2 max-w-2xl text-sm leading-6'
              style={{
                color: 'var(--text-main)',
                opacity: 0.68
              }}
            >
              Browse related calculators based on the type of calculation you
              need.
            </p>
          </div>

          <div className='mt-7 grid gap-4 md:grid-cols-2'>
            {categories.map(category => (
              <Link
                key={category.title}
                href={category.href}
                className='group rounded-2xl border p-6 transition duration-200 hover:-translate-y-0.5 hover:shadow-lg'
                style={{
                  backgroundColor: 'var(--hover-bg)',
                  borderColor: 'var(--border)'
                }}
              >
                <div className='flex items-start justify-between gap-5'>
                  <div>
                    <div
                      className='flex h-11 w-11 items-center justify-center rounded-xl'
                      style={{
                        backgroundColor: 'var(--surface)',
                        color: 'var(--primary)'
                      }}
                    >
                      <CalculatorIcon />
                    </div>

                    <div
                      className='mt-4 text-xs font-semibold uppercase tracking-wider'
                      style={{
                        color: 'var(--primary)'
                      }}
                    >
                      {category.count}
                    </div>

                    <h3
                      className='mt-2 text-xl font-bold'
                      style={{
                        color: 'var(--text-main)'
                      }}
                    >
                      {category.title}
                    </h3>

                    <p
                      className='mt-2 max-w-lg text-sm leading-6'
                      style={{
                        color: 'var(--text-main)',
                        opacity: 0.68
                      }}
                    >
                      {category.description}
                    </p>

                    <span
                      className='mt-5 inline-flex items-center gap-2 text-sm font-semibold'
                      style={{
                        color: 'var(--primary)'
                      }}
                    >
                      Explore {category.title}
                      <ArrowIcon />
                    </span>
                  </div>

                  <div
                    className='hidden h-10 w-10 items-center justify-center rounded-full border sm:flex'
                    style={{
                      borderColor: 'var(--border)',
                      color: 'var(--text-main)',
                      opacity: 0.5
                    }}
                  >
                    <ArrowIcon />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          HOW IT WORKS
      ========================================================== */}
      <section
        className='border-b py-12 sm:py-14'
        style={{
          backgroundColor: 'var(--hover-bg)',
          borderColor: 'var(--border)'
        }}
      >
        <div className='mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl text-center'>
            <p
              className='text-xs font-semibold uppercase tracking-wider'
              style={{
                color: 'var(--primary)'
              }}
            >
              How it works
            </p>

            <h2
              className='mt-2 text-2xl font-bold sm:text-3xl'
              style={{
                color: 'var(--text-main)'
              }}
            >
              Simple from input to result
            </h2>

            <p
              className='mt-2 text-sm leading-6'
              style={{
                color: 'var(--text-main)',
                opacity: 0.68
              }}
            >
              Each calculator is built around a simple workflow.
            </p>
          </div>

          <div className='mt-7 grid gap-4 md:grid-cols-3'>
            {[
              {
                number: '01',
                title: 'Enter your values',
                description:
                  'Provide the information required by the calculator.'
              },
              {
                number: '02',
                title: 'Calculate',
                description:
                  'The calculator processes your inputs using its defined method.'
              },
              {
                number: '03',
                title: 'Understand',
                description:
                  'Review the result, examples, assumptions and explanations.'
              }
            ].map(step => (
              <div
                key={step.number}
                className='rounded-2xl border p-6'
                style={{
                  backgroundColor: 'var(--surface)',
                  borderColor: 'var(--border)'
                }}
              >
                <div
                  className='text-sm font-bold'
                  style={{
                    color: 'var(--primary)'
                  }}
                >
                  {step.number}
                </div>

                <h3
                  className='mt-4 text-lg font-semibold'
                  style={{
                    color: 'var(--text-main)'
                  }}
                >
                  {step.title}
                </h3>

                <p
                  className='mt-2 text-sm leading-6'
                  style={{
                    color: 'var(--text-main)',
                    opacity: 0.68
                  }}
                >
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          CALCULATION GUIDES
      ========================================================== */}
      <section
        className='border-b py-12 sm:py-14'
        style={{
          backgroundColor: 'var(--surface)',
          borderColor: 'var(--border)'
        }}
      >
        <div className='mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
          <div className='flex items-start gap-3'>
            <div
              className='flex h-11 w-11 shrink-0 items-center justify-center rounded-xl'
              style={{
                backgroundColor: 'var(--hover-bg)',
                color: 'var(--primary)'
              }}
            >
              <BookIcon />
            </div>

            <div>
              <p
                className='text-xs font-semibold uppercase tracking-wider'
                style={{
                  color: 'var(--primary)'
                }}
              >
                Calculation knowledge
              </p>

              <h2
                className='mt-2 text-2xl font-bold sm:text-3xl'
                style={{
                  color: 'var(--text-main)'
                }}
              >
                Understand how the numbers work
              </h2>

              <p
                className='mt-2 max-w-2xl text-sm leading-6'
                style={{
                  color: 'var(--text-main)',
                  opacity: 0.68
                }}
              >
                Practical explanations help you understand the calculations
                behind the tools you use.
              </p>
            </div>
          </div>

          <div className='mt-7 grid gap-4 md:grid-cols-2'>
            {guides.map(guide => (
              <Link
                key={guide.title}
                href={guide.href}
                className='group rounded-2xl border p-5 transition hover:shadow-lg'
                style={{
                  backgroundColor: 'var(--hover-bg)',
                  borderColor: 'var(--border)'
                }}
              >
                <h3
                  className='font-semibold'
                  style={{
                    color: 'var(--text-main)'
                  }}
                >
                  {guide.title}
                </h3>

                <p
                  className='mt-2 text-sm leading-6'
                  style={{
                    color: 'var(--text-main)',
                    opacity: 0.68
                  }}
                >
                  {guide.description}
                </p>

                <span
                  className='mt-4 inline-flex items-center gap-2 text-sm font-semibold'
                  style={{
                    color: 'var(--primary)'
                  }}
                >
                  Explore
                  <ArrowIcon />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          CALCULATION TRANSPARENCY
      ========================================================== */}
      <section
        className='border-b py-12 sm:py-14'
        style={{
          backgroundColor: 'var(--hover-bg)',
          borderColor: 'var(--border)'
        }}
      >
        <div className='mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
          <div className='grid gap-5 lg:grid-cols-2'>
            <div
              className='rounded-2xl border p-7'
              style={{
                backgroundColor: 'var(--surface)',
                borderColor: 'var(--border)'
              }}
            >
              <div
                className='flex h-11 w-11 items-center justify-center rounded-xl'
                style={{
                  backgroundColor: 'var(--hover-bg)',
                  color: 'var(--primary)'
                }}
              >
                <BookIcon />
              </div>

              <p
                className='mt-5 text-xs font-semibold uppercase tracking-wider'
                style={{
                  color: 'var(--primary)'
                }}
              >
                Calculation transparency
              </p>

              <h2
                className='mt-2 text-2xl font-bold sm:text-3xl'
                style={{
                  color: 'var(--text-main)'
                }}
              >
                Understand what is behind the result
              </h2>

              <p
                className='mt-4 text-sm leading-7'
                style={{
                  color: 'var(--text-main)',
                  opacity: 0.68
                }}
              >
                A useful calculator should make its calculation understandable.
                Where appropriate, calculator pages explain formulas, examples,
                assumptions and limitations.
              </p>

              <div className='mt-6'>
                <Link
                  href='/about/'
                  className='inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition hover:opacity-90'
                  style={{
                    backgroundColor: 'var(--primary)',
                    color: '#ffffff'
                  }}
                >
                  About Swiftcalcfy
                  <ArrowIcon />
                </Link>
              </div>
            </div>

            <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-1'>
              {[
                'Clear calculator inputs',
                'Practical examples',
                'Visible assumptions',
                'Focused navigation'
              ].map(item => (
                <div
                  key={item}
                  className='flex items-center rounded-2xl border px-5 py-4'
                  style={{
                    backgroundColor: 'var(--surface)',
                    borderColor: 'var(--border)'
                  }}
                >
                  <span
                    className='mr-3 h-2 w-2 rounded-full'
                    style={{
                      backgroundColor: 'var(--primary)'
                    }}
                  />

                  <span
                    className='text-sm font-medium'
                    style={{
                      color: 'var(--text-main)'
                    }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FAQ
      ========================================================== */}
      <section
        className='py-12 sm:py-14'
        style={{
          backgroundColor: 'var(--surface)'
        }}
      >
        <div className='mx-auto max-w-4xl px-4 sm:px-6 lg:px-8'>
          <div className='text-center'>
            <p
              className='text-xs font-semibold uppercase tracking-wider'
              style={{
                color: 'var(--primary)'
              }}
            >
              Frequently asked questions
            </p>

            <h2
              className='mt-2 text-2xl font-bold sm:text-3xl'
              style={{
                color: 'var(--text-main)'
              }}
            >
              About Swiftcalcfy
            </h2>
          </div>

          <div
            className='mt-7 overflow-hidden rounded-2xl border'
            style={{
              backgroundColor: 'var(--hover-bg)',
              borderColor: 'var(--border)'
            }}
          >
            {faqItems.map((faq, index) => (
              <details
                key={faq.question}
                className='group'
                style={{
                  borderBottom:
                    index !== faqItems.length - 1
                      ? '1px solid var(--border)'
                      : undefined
                }}
              >
                <summary
                  className='flex cursor-pointer list-none items-center justify-between gap-5 px-5 py-5 text-sm font-semibold sm:px-6'
                  style={{
                    color: 'var(--text-main)'
                  }}
                >
                  <span>{faq.question}</span>

                  <span
                    className='text-xl font-normal transition group-open:rotate-45'
                    style={{
                      color: 'var(--text-main)',
                      opacity: 0.5
                    }}
                  >
                    +
                  </span>
                </summary>

                <p
                  className='px-5 pb-5 text-sm leading-7 sm:px-6'
                  style={{
                    color: 'var(--text-main)',
                    opacity: 0.68
                  }}
                >
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
