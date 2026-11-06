import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <section className="flex flex-col items-center px-4 py-24 text-center">
      <p className="bg-gradient-to-r from-violet-500 to-amber-400 bg-clip-text text-8xl font-black text-transparent sm:text-9xl">
        404
      </p>
      <h1 className="mt-4 text-2xl font-bold">Página no encontrada</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-400">La ruta que buscas no existe en esta aplicación.</p>
      <Link
        to="/"
        className="mt-8 rounded-lg bg-violet-600 px-6 py-2.5 font-medium text-white hover:bg-violet-700"
      >
        Volver al inicio
      </Link>
    </section>
  )
}
