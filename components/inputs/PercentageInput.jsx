export function PercentageInput ({
  label,
  value,
  onChange,
  placeholder,
  min = 0,
  max = 100
}) {
  const hasError = value !== '' && (Number(value) < min || Number(value) > max)

  function handleChange (e) {
    let raw = e.target.value

    // allow digits + decimal
    raw = raw.replace(/[^0-9.]/g, '')

    // only one dot
    const parts = raw.split('.')
    if (parts.length > 2) return

    // limit decimal precision (optional but professional)
    if (parts[1]?.length > 2) return

    // KEEP STRING (important)
    onChange(raw)
  }

  return (
    <label className='block space-y-1'>
      <span className='text-sm font-medium text-[var(--text-main)]'>
        {label}
      </span>

      <div className='relative'>
        <input
          type='text'
          inputMode='decimal'
          value={value ?? ''}
          placeholder={placeholder}
          onChange={handleChange}
          onWheel={e => e.target.blur()}
          className='
            // w-full rounded-md px-3 py-2 pr-10 border transition
            // bg-[var(--surface-2)]
            // text-[var(--text-main)]
            // transition-all duration-200

            // border-[var(--border)]

            // focus:outline-none
            // focus:border-indigo-500
            // focus:bg-[var(--surface)]
            // focus:shadow-[0_0_0_3px_rgba(99,102,241,0.08)]
             w-full
          rounded-lg
          px-3 py-2
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
            borderColor: hasError ? '#ef4444' : 'var(--border)'
          }}
        />

        <span className='absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400'>
          %
        </span>
      </div>

      {hasError && (
        <p className='text-xs text-red-500'>
          Enter between {min}% and {max}%
        </p>
      )}
    </label>
  )
}
