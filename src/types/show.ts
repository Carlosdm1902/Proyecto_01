// Tipos basados en la respuesta de la API de TVMaze (solo los campos que usamos)
export interface Show {
  id: number
  name: string
  language: string | null
  genres: string[]
  status: string
  premiered: string | null
  rating: { average: number | null }
  image: { medium: string; original: string } | null
  summary: string | null
  network: { name: string } | null
  officialSite: string | null
  runtime: number | null
}

export type ToastType = 'success' | 'error' | 'info'

export interface Toast {
  id: number
  type: ToastType
  message: string
}
