import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import EmptyState from '../components/EmptyState'
import ErrorMessage from '../components/ErrorMessage'
import Loader from '../components/Loader'
import SearchFilters from '../components/SearchFilters'
import ShowGrid from '../components/ShowGrid'
import { useToast } from '../context/ToastContext'
import { useFetch } from '../hooks/useFetch'
import { getShows, STATUS_LABELS } from '../services/tvmaze'

const PAGE_SIZE = 20

export default function ExplorePage() {
  const { data: shows, loading, error, retry } = useFetch(getShows, [])
  const { showToast } = useToast()

  // Los filtros se guardan en la URL (?q=...&genre=...&status=...) para que
  // se mantengan al volver desde la página de detalle.
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') ?? ''
  const genre = searchParams.get('genre') ?? ''
  const status = searchParams.get('status') ?? ''
  const [visible, setVisible] = useState<number>(PAGE_SIZE)

  const updateParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams)
    if (value) next.set(key, value)
    else next.delete(key)
    setSearchParams(next, { replace: true })
    setVisible(PAGE_SIZE)
  }

  useEffect(() => {
    if (error) showToast('No se pudieron cargar las series', 'error')
  }, [error, showToast])

  // Opciones de los <select> calculadas a partir de los datos de la API
  const genres = useMemo(
    () => [...new Set((shows ?? []).flatMap((s) => s.genres))].sort(),
    [shows],
  )
  const statuses = useMemo(() => [...new Set((shows ?? []).map((s) => s.status))].sort(), [shows])

  // Filtrado en tiempo real
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return (shows ?? []).filter(
      (s) =>
        s.name.toLowerCase().includes(q) &&
        (genre === '' || s.genres.includes(genre)) &&
        (status === '' || s.status === status),
    )
  }, [shows, query, genre, status])

  const clearFilters = () => {
    setSearchParams({}, { replace: true })
    setVisible(PAGE_SIZE)
  }

  return (
    <>
      <section
        aria-labelledby="explore-title"
        className="bg-gradient-to-br from-slate-950 via-violet-950 to-slate-900 px-4 py-12 text-center text-white"
      >
        <h1 id="explore-title" className="text-3xl font-extrabold sm:text-4xl">
          Explorar <span className="text-amber-400">Series</span>
        </h1>
        <p className="mt-2 mb-8 text-slate-300">Datos obtenidos en tiempo real desde la API de TVMaze</p>
        <SearchFilters
          query={query}
          genre={genre}
          status={status}
          genres={genres}
          statuses={statuses}
          statusLabels={STATUS_LABELS}
          onQueryChange={(v) => updateParam('q', v)}
          onGenreChange={(v) => updateParam('genre', v)}
          onStatusChange={(v) => updateParam('status', v)}
        />
      </section>

      <section aria-labelledby="results-title" className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        {loading && <Loader message="Cargando series..." />}

        {!loading && error && <ErrorMessage message={error} onRetry={retry} />}

        {!loading && !error && shows && (
          <>
            <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
              <h2 id="results-title" className="text-xl font-bold">Resultados</h2>
              <p className="text-sm text-slate-600 dark:text-slate-400" aria-live="polite">
                Mostrando {Math.min(visible, filtered.length)} de {filtered.length} series
              </p>
            </div>

            {filtered.length === 0 ? (
              <EmptyState icon="🔍" title="No hay series que coincidan con tu búsqueda">
                <button
                  type="button"
                  onClick={clearFilters}
                  className="font-medium text-violet-600 hover:underline dark:text-violet-400"
                >
                  Limpiar filtros
                </button>
              </EmptyState>
            ) : (
              <>
                <ShowGrid shows={filtered.slice(0, visible)} />
                {visible < filtered.length && (
                  <div className="mt-10 text-center">
                    <button
                      type="button"
                      onClick={() => setVisible((v) => v + PAGE_SIZE)}
                      className="rounded-lg bg-violet-600 px-6 py-2.5 font-medium text-white hover:bg-violet-700"
                    >
                      Mostrar más
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </section>
    </>
  )
}
