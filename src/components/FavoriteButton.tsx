import { useState } from 'react'
import { useFavorites } from '../context/FavoritesContext'
import { useToast } from '../context/ToastContext'
import type { Show } from '../types/show'
import ConfirmDialog from './ConfirmDialog'

interface FavoriteButtonProps {
  show: Show
  variant?: 'icon' | 'full'
}

// Botón para agregar/quitar favoritos.
// Agregar es inmediato; quitar pide confirmación con un <dialog>.
export default function FavoriteButton({ show, variant = 'icon' }: FavoriteButtonProps) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites()
  const { showToast } = useToast()
  const [confirming, setConfirming] = useState<boolean>(false)
  const favorite = isFavorite(show.id)

  const handleClick = () => {
    if (favorite) {
      setConfirming(true)
    } else {
      addFavorite(show)
      showToast(`${show.name} agregada a favoritos`, 'success')
    }
  }

  const handleConfirmRemove = () => {
    removeFavorite(show.id)
    setConfirming(false)
    showToast(`${show.name} se quitó de favoritos`, 'info')
  }

  const label = favorite ? `Quitar ${show.name} de favoritos` : `Agregar ${show.name} a favoritos`

  return (
    <>
      {variant === 'icon' ? (
        <button
          type="button"
          onClick={handleClick}
          aria-label={label}
          aria-pressed={favorite}
          title={label}
          className={`flex h-10 w-10 items-center justify-center rounded-full text-xl shadow-md backdrop-blur transition hover:scale-110 ${
            favorite ? 'bg-amber-400 text-white' : 'bg-white/90 text-slate-400 hover:text-amber-400'
          }`}
        >
          <span aria-hidden="true">★</span>
        </button>
      ) : (
        <button
          type="button"
          onClick={handleClick}
          aria-pressed={favorite}
          className={`inline-flex items-center gap-2 rounded-lg px-5 py-2.5 font-semibold transition ${
            favorite
              ? 'bg-amber-400 text-slate-900 hover:bg-amber-500'
              : 'bg-violet-600 text-white hover:bg-violet-700'
          }`}
        >
          <span aria-hidden="true">★</span>
          {favorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        </button>
      )}

      {confirming && (
        <ConfirmDialog
          open={confirming}
          title="¿Quitar de favoritos?"
          confirmText="Quitar"
          variant="danger"
          onConfirm={handleConfirmRemove}
          onCancel={() => setConfirming(false)}
        >
          ¿Seguro que quieres quitar <strong>{show.name}</strong> de tus favoritos?
        </ConfirmDialog>
      )}
    </>
  )
}
