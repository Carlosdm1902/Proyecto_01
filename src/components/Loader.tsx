interface LoaderProps {
  message?: string
}

export default function Loader({ message = 'Cargando datos...' }: LoaderProps) {
  return (
    <div role="status" aria-live="polite" className="flex flex-col items-center justify-center gap-4 py-20">
      <span
        aria-hidden="true"
        className="h-12 w-12 animate-spin rounded-full border-4 border-violet-200 border-t-violet-600 dark:border-slate-700 dark:border-t-violet-400"
      />
      <p className="text-slate-600 dark:text-slate-400">{message}</p>
    </div>
  )
}
