import { formatIndianNumber, unformatNumber } from '../../lib/numberFormat'

export function AmountInput ({
  label,
  value,
  onChange,
  placeholder,
  allowNegative = false,
  max = 999999999999
}) {
  function handleChange (e) {
    let raw = unformatNumber(e.target.value)

    const regex = allowNegative ? /^-?\d*$/ : /^\d*$/
    if (!regex.test(raw)) return

    if (raw === '' || raw === '-') {
      onChange(raw)
      return
    }

    const num = Number(raw)

    if (Number.isNaN(num)) return
    if (Math.abs(num) > max) return

    onChange(num)
  }

  return (
    <label className='block'>
      <span className='text-sm font-medium text-[var(--text-main)] mb-1 block'>
        {label}
      </span>

      <div className='relative'>
        <input
          type='text'
          inputMode='numeric'
          value={
            value === '' || value === '-' ? value : formatIndianNumber(value)
          }
          placeholder={placeholder}
          onChange={handleChange}
          className='
            w-full
            rounded-lg
            px-3 py-2 pl-8
            border
            bg-[var(--surface-2)]
          '
        />

        <span className='absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400'>
          ₹
        </span>
      </div>
    </label>
  )
}
