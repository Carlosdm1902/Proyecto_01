import type { ReactNode } from 'react'

interface EmptyStateProps {
  icon?: string
  title: string
  children?: ReactNode
}

export default function EmptyState({ icon = '📭', title, children }: EmptyStateProps) {
  return (
    <div role="status" className="flex flex-col items-center gap-3 py-20 text-center">
      <span aria-hidden="true" className="text-5xl">{icon}</span>
      <p className="font-semibold text-slate-700 dark:text-slate-300">{title}</p>
      {children}
    </div>
  )
}
