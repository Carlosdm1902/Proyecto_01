import { Link } from 'react-router-dom'
import EmptyState from '../components/EmptyState'
import ShowGrid from '../components/ShowGrid'
import { useFavorites } from '../context/FavoritesContext'

export default function FavoritesPage() {
  const { favorites } = useFavorites()

  return (
    <section aria-labelledby="favorites-title" className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 id="favorites-title" className="text-3xl font-extrabold">Mis Favoritos</h1>
      <p className="mt-1 mb-8 text-sm text-slate-600 dark:text-slate-400">
        {favorites.length} {favorites.length === 1 ? 'serie guardada' : 'series guardadas'}
      </p>

      {favorites.length === 0 ? (
        <EmptyState icon="⭐" title="No tienes favoritos guardados">
          <Link to="/explorar" className="font-medium text-violet-600 hover:underline dark:text-violet-400">
            Explorar y agregar algunas
          </Link>
        </EmptyState>
      ) : (
        <ShowGrid shows={favorites} />
      )}
    </section>
  )
}
