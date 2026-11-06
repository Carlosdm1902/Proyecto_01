import type { Toast, ToastType } from '../types/show'

interface ToastContainerProps {
  toasts: Toast[]
  onDismiss: (id: number) => void
}

const STYLES: Record<ToastType, { classes: string; icon: string }> = {
  success: { classes: 'bg-emerald-600', icon: '✓' },
  error: { classes: 'bg-red-600', icon: '✕' },
  info: { classes: 'bg-sky-600', icon: 'ℹ' },
}

export default function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  return (
    <div
      aria-live="polite"
      aria-atomic="false"
      className="pointer-events-none fixed top-20 right-4 left-4 z-50 flex flex-col items-end gap-2 sm:left-auto"
    >
      {toasts.map((toast) => {
        const { classes, icon } = STYLES[toast.type]
        return (
          <div
            key={toast.id}
            role={toast.type === 'error' ? 'alert' : 'status'}
            className={`pointer-events-auto flex w-full max-w-sm animate-toast-in items-center gap-3 rounded-lg px-4 py-3 text-sm text-white shadow-lg ${classes}`}
          >
            <span aria-hidden="true" className="font-bold">{icon}</span>
            <p className="flex-1">{toast.message}</p>
            <button
              type="button"
              onClick={() => onDismiss(toast.id)}
              aria-label="Cerrar notificación"
              className="rounded px-1 text-white/80 hover:text-white"
            >
              ✕
            </button>
          </div>
        )
      })}
    </div>
  )
}
