import { formatIndianNumber, unformatNumber } from '../../lib/numberFormat'

export function AmountInput ({
  label,
  value,
  onChange,
  placeholder,
  min = 1,
  max = 999999999999
}) {
  const hasError = value !== '' && Number(value) < min

  function handleChange (e) {
    let raw = unformatNumber(e.target.value)

    if (!/^\d*$/.test(raw)) return

    if (raw.length > 12) return

    if (raw === '') {
      onChange('')
      return
    }

    const num = Number(raw)

    if (num > max) return

    onChange(num)
  }

  return (
    <label className='block space-y-1'>
      {/* LABEL */}
      <span className='text-sm font-medium text-[var(--text-main)]'>
        {label}
      </span>

      <div className='relative'>
        <input
          type='text'
          inputMode='numeric'
          value={value ? formatIndianNumber(value) : ''}
          placeholder={placeholder}
          onChange={handleChange}
          onWheel={e => e.target.blur()}
          className='
            w-full
            rounded-lg
            px-3 py-2 pl-8
            border
            bg-[var(--surface-2)]
            text-[var(--text-main)]
            transition-all duration-200

            border-[var(--border)]

            focus:outline-none
            focus:border-indigo-500
            focus:bg-[var(--surface)]
            focus:shadow-[0_0_0_3px_rgba(99,102,241,0.08)]
          '
          style={{
            borderColor: hasError ? '#ef4444' : undefined
          }}
        />

        {/* RUPEE ICON */}
        <span className='absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400'>
          ₹
        </span>
      </div>

      {/* ERROR */}
      {hasError && (
        <p className='text-xs text-red-500'>
          Amount must be greater than ₹{min}
        </p>
      )}
    </label>
  )
}
