interface SearchFiltersProps {
  query: string
  genre: string
  status: string
  genres: string[]
  statuses: string[]
  statusLabels: Record<string, string>
  onQueryChange: (value: string) => void
  onGenreChange: (value: string) => void
  onStatusChange: (value: string) => void
}

// Buscador + filtros. Son inputs controlados: el valor vive en el padre
// y cada cambio filtra los resultados en tiempo real.
export default function SearchFilters({
  query,
  genre,
  status,
  genres,
  statuses,
  statusLabels,
  onQueryChange,
  onGenreChange,
  onStatusChange,
}: SearchFiltersProps) {
  const fieldClasses =
    'w-full rounded-lg border border-white/20 bg-white px-4 py-2.5 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-amber-400 focus:outline-none dark:bg-slate-800 dark:text-white'

  return (
    <form
      role="search"
      aria-label="Buscar y filtrar series"
      onSubmit={(e) => e.preventDefault()}
      className="mx-auto flex w-full max-w-3xl flex-col gap-3 sm:flex-row"
    >
      <div className="flex-1">
        <label htmlFor="search" className="sr-only">Buscar serie por nombre</label>
        <input
          id="search"
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Buscar serie..."
          className={fieldClasses}
        />
      </div>
      <div className="sm:w-44">
        <label htmlFor="genre" className="sr-only">Filtrar por género</label>
        <select id="genre" value={genre} onChange={(e) => onGenreChange(e.target.value)} className={fieldClasses}>
          <option value="">Todos los géneros</option>
          {genres.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
      </div>
      <div className="sm:w-44">
        <label htmlFor="status" className="sr-only">Filtrar por estado</label>
        <select id="status" value={status} onChange={(e) => onStatusChange(e.target.value)} className={fieldClasses}>
          <option value="">Todos los estados</option>
          {statuses.map((s) => (
            <option key={s} value={s}>{statusLabels[s] ?? s}</option>
          ))}
        </select>
      </div>
    </form>
  )
}
