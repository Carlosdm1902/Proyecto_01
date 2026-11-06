export default function Footer() {
  return (
    <footer className="bg-slate-950 py-6 text-center text-sm text-slate-400">
      <p>
        Datos proporcionados por{' '}
        <a
          href="https://www.tvmaze.com/api"
          target="_blank"
          rel="noopener noreferrer"
          className="text-amber-400 hover:underline"
        >
          TVMaze API
        </a>
      </p>
      <p className="mt-1">Proyecto 01 · 2026</p>
    </footer>
  )
}
