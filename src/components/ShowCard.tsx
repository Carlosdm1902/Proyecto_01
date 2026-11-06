import { Link } from 'react-router-dom'
import { STATUS_LABELS } from '../services/tvmaze'
import type { Show } from '../types/show'
import FavoriteButton from './FavoriteButton'

interface ShowCardProps {
  show: Show
}

export default function ShowCard({ show }: ShowCardProps) {
  const statusLabel = STATUS_LABELS[show.status] ?? show.status

  return (
    <article className="group relative flex w-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-lg dark:bg-slate-800 dark:ring-slate-700">
      <Link to={`/explorar/${show.id}`} className="flex flex-1 flex-col focus-visible:outline-none">
        <div className="aspect-[2/3] overflow-hidden bg-slate-200 dark:bg-slate-700">
          {show.image ? (
            <img
              src={show.image.medium}
              alt={`Póster de ${show.name}`}
              loading="lazy"
              className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-slate-500" role="img" aria-label={`${show.name} no tiene imagen`}>
              Sin imagen
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col gap-2 p-4">
          <h3 className="line-clamp-1 font-bold text-slate-900 group-focus-visible:underline dark:text-white">
            {show.name}
          </h3>
          <dl className="space-y-0.5 text-sm text-slate-600 dark:text-slate-400">
            <div className="flex gap-1">
              <dt>Estado:</dt>
              <dd className="font-medium text-slate-800 dark:text-slate-200">{statusLabel}</dd>
            </div>
            <div className="flex gap-1">
              <dt>Rating:</dt>
              <dd className="font-medium text-slate-800 dark:text-slate-200">
                {show.rating.average ?? 'N/A'}
              </dd>
            </div>
          </dl>
          <ul className="mt-auto flex flex-wrap gap-1.5 pt-2" aria-label="Géneros">
            {show.genres.slice(0, 2).map((genre) => (
              <li
                key={genre}
                className="rounded-full bg-violet-100 px-2.5 py-0.5 text-xs font-medium text-violet-700 dark:bg-violet-900/50 dark:text-violet-300"
              >
                {genre}
              </li>
            ))}
          </ul>
        </div>
      </Link>
      <div className="absolute top-3 right-3">
        <FavoriteButton show={show} />
      </div>
    </article>
  )
}
