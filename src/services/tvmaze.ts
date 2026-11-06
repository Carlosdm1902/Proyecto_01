import type { Show } from '../types/show'

const BASE_URL = 'https://api.tvmaze.com'

// Fetch 1: lista de series (la página 0 trae ~250 series)
export async function getShows(signal?: AbortSignal): Promise<Show[]> {
  const res = await fetch(`${BASE_URL}/shows?page=0`, { signal })
  if (!res.ok) throw new Error(`Error ${res.status} al cargar las series`)
  return res.json()
}

// Fetch 2: detalle de una serie por ID
export async function getShowById(id: string, signal?: AbortSignal): Promise<Show> {
  const res = await fetch(`${BASE_URL}/shows/${id}`, { signal })
  if (res.status === 404) throw new Error('La serie no existe')
  if (!res.ok) throw new Error(`Error ${res.status} al cargar la serie`)
  return res.json()
}

// La API devuelve el resumen con etiquetas HTML (<p>, <b>...). Las quitamos
// para mostrarlo como texto plano sin usar dangerouslySetInnerHTML.
export function stripHtml(html: string | null): string {
  if (!html) return 'Sin descripción disponible.'
  return html.replace(/<[^>]*>/g, '').trim()
}

// Traducción de los estados que devuelve la API
export const STATUS_LABELS: Record<string, string> = {
  Running: 'En emisión',
  Ended: 'Finalizada',
  'To Be Determined': 'Por definir',
  'In Development': 'En desarrollo',
}
