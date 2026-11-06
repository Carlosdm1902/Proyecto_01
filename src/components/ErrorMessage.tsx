interface ErrorMessageProps {
  message: string
  onRetry?: () => void
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div role="alert" className="flex flex-col items-center gap-3 py-20 text-center">
      <span aria-hidden="true" className="text-5xl">⚠️</span>
      <p className="font-semibold text-red-600 dark:text-red-400">No se pudo cargar la información.</p>
      <p className="text-sm text-slate-600 dark:text-slate-400">{message}. Verifica tu conexión e intenta de nuevo.</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-2 rounded-lg bg-red-600 px-5 py-2 font-medium text-white hover:bg-red-700"
        >
          Reintentar
        </button>
      )}
    </div>
  )
}
