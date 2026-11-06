import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { Show } from '../types/show'

interface FavoritesContextValue {
  favorites: Show[]
  isFavorite: (id: number) => boolean
  addFavorite: (show: Show) => void
  removeFavorite: (id: number) => void
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null)
const STORAGE_KEY = 'universo-series-favorites'

function loadFavorites(): Show[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? (JSON.parse(saved) as Show[]) : []
  } catch {
    return []
  }
}

// El estado de favoritos vive aquí, POR ENCIMA del router, para que no se
// pierda al cambiar de ruta. Además se guarda en localStorage para que
// sobreviva a recargas de la página.
export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Show[]>(loadFavorites)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
    } catch {
      // localStorage no disponible: los favoritos siguen funcionando en memoria
    }
  }, [favorites])

  const isFavorite = (id: number) => favorites.some((f) => f.id === id)

  const addFavorite = (show: Show) => {
    setFavorites((prev) => (prev.some((f) => f.id === show.id) ? prev : [...prev, show]))
  }

  const removeFavorite = (id: number) => {
    setFavorites((prev) => prev.filter((f) => f.id !== id))
  }

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext)
  if (!ctx) throw new Error('useFavorites debe usarse dentro de FavoritesProvider')
  return ctx
}
