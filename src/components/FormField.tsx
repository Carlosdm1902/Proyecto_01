import type { ChangeEvent } from 'react'

interface FormFieldProps {
  id: string
  label: string
  value: string
  error?: string
  showError: boolean
  type?: 'text' | 'email'
  multiline?: boolean
  placeholder?: string
  onChange: (value: string) => void
  onBlur: () => void
}

export default function FormField({
  id,
  label,
  value,
  error,
  showError,
  type = 'text',
  multiline = false,
  placeholder,
  onChange,
  onBlur,
}: FormFieldProps) {
  const hasError = showError && Boolean(error)
  const errorId = `${id}-error`
  const classes = `w-full rounded-lg border px-3 py-2 text-slate-900 focus:ring-2 focus:outline-none dark:bg-slate-900 dark:text-white ${
    hasError
      ? 'border-red-500 focus:ring-red-400'
      : 'border-slate-300 focus:ring-violet-500 dark:border-slate-600'
  }`

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e.target.value)

  const commonProps = {
    id,
    name: id,
    value,
    placeholder,
    onChange: handleChange,
    onBlur,
    className: classes,
    'aria-invalid': hasError,
    'aria-describedby': hasError ? errorId : undefined,
  }

  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-medium">
        {label}
      </label>
      {multiline ? <textarea rows={5} {...commonProps} /> : <input type={type} {...commonProps} />}
      {hasError && (
        <p id={errorId} className="mt-1 text-xs text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  )
}
