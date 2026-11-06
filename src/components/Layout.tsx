import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Navbar from './Navbar'

// Estructura común a todas las páginas: navbar + contenido de la ruta + footer
export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-100">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-amber-400 focus:px-3 focus:py-2 focus:text-slate-900"
      >
        Saltar al contenido
      </a>
      <Navbar />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
