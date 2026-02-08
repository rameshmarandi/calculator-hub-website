"use client"

export default function NumberInput({
  label,
  value,
  onChange,
  placeholder,
  min = 0,
  max,
  step = 1
}) {
  const hasError =
    value !== '' &&
    (Number(value) < min || (max !== undefined && Number(value) > max))

  // function handleChange(e) {
  //   let raw = e.target.value

  //   // digits only
  //   raw = raw.replace(/[^\d]/g, '')

  //   if (raw === '') {
  //     onChange('')
  //     return
  //   }

  //   const num = Number(raw)

  //   if (num < min) return
  //   if (max !== undefined && num > max) return

  //   onChange(raw) // critical fix: send string not number
  // }


  function handleChange(e) {
  let raw = e.target.value

  // digits only
  raw = raw.replace(/[^\d]/g, '')

  // allow empty
  if (raw === '') {
    onChange('')
    return
  }

  onChange(raw) // always allow typing
}

  return (
    <label className="block space-y-1">
      <span className="text-sm font-medium text-[var(--text-main)]">
        {label}
      </span>

      <input
        type="text"
        inputMode="numeric"
        value={value ?? ''}
        placeholder={placeholder}
        onChange={handleChange}
        onWheel={(e) => e.target.blur()}
        className="
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
        "
        style={{
          borderColor: hasError ? '#ef4444' : undefined
        }}
      />

      {hasError && (
        <p className="text-xs text-red-500">
          Enter between {min}
          {max !== undefined && ` and ${max}`}
        </p>
      )}
    </label>
  )
}
