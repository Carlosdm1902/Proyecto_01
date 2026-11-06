import { Link } from 'react-router-dom'
import NewsletterModal from '../components/NewsletterModal'

const FEATURES = [
  { icon: '🔎', title: 'Busca', text: 'Encuentra cualquier serie por nombre al instante.' },
  { icon: '🎭', title: 'Filtra', text: 'Por género o por estado de emisión.' },
  { icon: '⭐', title: 'Guarda', text: 'Arma tu lista de series favoritas.' },
]

export default function HomePage() {
  return (
    <>
      <section
        aria-labelledby="hero-title"
        className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-violet-950 to-slate-900 px-4 py-24 text-center text-white sm:py-32"
      >
        <div aria-hidden="true" className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-violet-600/30 blur-3xl" />
        <div aria-hidden="true" className="absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-amber-500/20 blur-3xl" />
        <div className="relative mx-auto max-w-3xl">
          <h1 id="hero-title" className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Descubre tu próxima <span className="text-amber-400">serie favorita</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base text-slate-300 sm:text-lg">
            Explora cientos de series de televisión con datos en tiempo real de TVMaze. Busca, filtra y guarda tus
            favoritas.
          </p>
          <Link
            to="/explorar"
            className="mt-10 inline-block rounded-xl bg-amber-400 px-8 py-3 font-bold text-slate-900 shadow-lg transition hover:bg-amber-300"
          >
            Explorar ahora
          </Link>
        </div>
      </section>

      <section aria-label="Características" className="mx-auto grid max-w-5xl gap-6 px-4 py-16 sm:grid-cols-3">
        {FEATURES.map((f) => (
          <article
            key={f.title}
            className="rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700"
          >
            <span aria-hidden="true" className="text-4xl">{f.icon}</span>
            <h2 className="mt-3 text-lg font-bold">{f.title}</h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{f.text}</p>
          </article>
        ))}
      </section>

      <NewsletterModal />
    </>
  )
}
