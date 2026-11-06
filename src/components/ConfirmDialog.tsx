import { useEffect, useRef, type ReactNode } from 'react'

interface ConfirmDialogProps {
  open: boolean
  title: string
  children: ReactNode
  confirmText?: string
  cancelText?: string
  variant?: 'danger' | 'primary'
  onConfirm: () => void
  onCancel: () => void
}

// Modal de confirmación con <dialog> nativo + useRef + showModal().
// showModal() da gratis: fondo (::backdrop), foco atrapado dentro del modal
// y cierre con la tecla Escape.
export default function ConfirmDialog({
  open,
  title,
  children,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  variant = 'primary',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  const confirmClasses =
    variant === 'danger'
      ? 'bg-red-600 hover:bg-red-700 focus-visible:outline-red-600'
      : 'bg-violet-600 hover:bg-violet-700 focus-visible:outline-violet-600'

  return (
    <dialog
      ref={dialogRef}
      onClose={onCancel}
      aria-labelledby="confirm-dialog-title"
      className="m-auto w-[calc(100%-2rem)] max-w-md rounded-2xl bg-white p-6 text-slate-800 shadow-2xl dark:bg-slate-800 dark:text-slate-100"
    >
      <div className="flex flex-col items-center text-center">
        <span aria-hidden="true" className="mb-3 text-4xl">
          {variant === 'danger' ? '⚠️' : '✉️'}
        </span>
        <h2 id="confirm-dialog-title" className="text-xl font-bold">
          {title}
        </h2>
        <div className="mt-2 text-sm text-slate-600 dark:text-slate-300">{children}</div>
      </div>
      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-center">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg bg-slate-200 px-5 py-2 font-medium text-slate-800 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600"
        >
          {cancelText}
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className={`rounded-lg px-5 py-2 font-medium text-white focus-visible:outline-2 focus-visible:outline-offset-2 ${confirmClasses}`}
        >
          {confirmText}
        </button>
      </div>
    </dialog>
  )
}
