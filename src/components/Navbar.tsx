import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'
import ThemeToggle from './ThemeToggle'

const LINKS = [
  { to: '/', label: 'Inicio' },
  { to: '/explorar', label: 'Explorar' },
  { to: '/favoritos', label: 'Favoritos' },
  { to: '/contacto', label: 'Contacto' },
]

export default function Navbar() {
  const { favorites } = useFavorites()
  const [menuOpen, setMenuOpen] = useState<boolean>(false)

  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition ${
      isActive ? 'bg-white/10 text-amber-400' : 'text-slate-300 hover:text-white'
    }`

  return (
    <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur">
      <nav aria-label="Navegación principal" className="mx-auto flex max-w-7xl flex-wrap items-center justify-between px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-2 text-lg font-extrabold text-white">
          <span aria-hidden="true">📺</span>
          Universo <span className="text-amber-400">Series</span>
        </Link>

        <div className="flex items-center gap-1 md:order-last">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="main-menu"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            className="flex h-9 w-9 items-center justify-center rounded-md text-xl text-white hover:bg-white/10 md:hidden"
          >
            <span aria-hidden="true">{menuOpen ? '✕' : '☰'}</span>
          </button>
        </div>

        <ul
          id="main-menu"
          className={`${menuOpen ? 'flex' : 'hidden'} w-full flex-col gap-1 pt-3 md:flex md:w-auto md:flex-row md:pt-0`}
        >
          {LINKS.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} end={link.to === '/'} className={linkClasses} onClick={() => setMenuOpen(false)}>
                {link.label}
                {link.to === '/favoritos' && favorites.length > 0 && (
                  <span
                    aria-label={`${favorites.length} favoritos`}
                    className="rounded-full bg-amber-400 px-1.5 text-xs font-bold text-slate-900"
                  >
                    {favorites.length}
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
