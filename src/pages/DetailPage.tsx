import { useCallback, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage'
import FavoriteButton from '../components/FavoriteButton'
import Loader from '../components/Loader'
import { useToast } from '../context/ToastContext'
import { useFetch } from '../hooks/useFetch'
import { getShowById, STATUS_LABELS, stripHtml } from '../services/tvmaze'

export default function DetailPage() {
  const { id = '' } = useParams<{ id: string }>()
  const { showToast } = useToast()
  const fetcher = useCallback((signal: AbortSignal) => getShowById(id, signal), [id])
  const { data: show, loading, error, retry } = useFetch(fetcher, [id])

  useEffect(() => {
    if (error) showToast('No se pudo cargar la serie', 'error')
  }, [error, showToast])

  return (
    <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <Link to="/explorar" className="mb-6 inline-block font-medium text-violet-600 hover:underline dark:text-violet-400">
        ← Volver a explorar
      </Link>

      {loading && <Loader message="Cargando serie..." />}
      {!loading && error && <ErrorMessage message={error} onRetry={retry} />}

      {!loading && !error && show && (
        <article className="overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-slate-200 md:flex dark:bg-slate-800 dark:ring-slate-700">
          <div className="bg-slate-200 md:w-2/5 dark:bg-slate-700">
            {show.image ? (
              <img
                src={show.image.original}
                alt={`Póster de ${show.name}`}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex aspect-[2/3] items-center justify-center text-slate-500">Sin imagen</div>
            )}
          </div>

          <div className="flex-1 p-6 sm:p-8">
            <h1 className="text-3xl font-extrabold">{show.name}</h1>
            <ul className="mt-3 flex flex-wrap gap-2" aria-label="Géneros">
              {show.genres.map((g) => (
                <li
                  key={g}
                  className="rounded-full bg-violet-100 px-3 py-0.5 text-xs font-medium text-violet-700 dark:bg-violet-900/50 dark:text-violet-300"
                >
                  {g}
                </li>
              ))}
            </ul>

            <dl className="mt-6 grid grid-cols-1 gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
              <Info label="Estado" value={STATUS_LABELS[show.status] ?? show.status} />
              <Info label="Rating" value={show.rating.average ? `⭐ ${show.rating.average} / 10` : 'N/A'} />
              <Info label="Estreno" value={show.premiered ?? 'Desconocido'} />
              <Info label="Idioma" value={show.language ?? 'Desconocido'} />
              <Info label="Cadena" value={show.network?.name ?? 'Desconocida'} />
              <Info label="Duración" value={show.runtime ? `${show.runtime} min` : 'N/A'} />
            </dl>

            <h2 className="mt-6 font-bold">Sinopsis</h2>
            <p className="mt-2 leading-relaxed text-slate-600 dark:text-slate-300">{stripHtml(show.summary)}</p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <FavoriteButton show={show} variant="full" />
              {show.officialSite && (
                <a
                  href={show.officialSite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-violet-600 hover:underline dark:text-violet-400"
                >
                  Sitio oficial ↗
                </a>
              )}
            </div>
          </div>
        </article>
      )}
    </section>
  )
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-1">
      <dt className="text-slate-500 dark:text-slate-400">{label}:</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  )
}
