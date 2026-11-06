import { useEffect, useRef, useState } from 'react'
import { useToast } from '../context/ToastContext'

const SEEN_KEY = 'universo-series-newsletter-seen'
const DELAY_MS = 2500

/*
 * MODAL CON DARK PATTERNS INTENCIONALES (ejercicio académico)
 *
 * Este modal está hecho A PROPÓSITO con malas prácticas de UX para
 * identificarlas. Los dark patterns que usa son:
 *
 * 1. CONFIRMSHAMING: el botón de rechazo dice "No gracias, prefiero ver
 *    series aburridas", haciendo sentir culpable al usuario por decir que no.
 *
 * 2. JERARQUÍA VISUAL ENGAÑOSA: el botón de aceptar es grande, colorido y
 *    llamativo; la opción de rechazar es un enlace pequeño y gris que casi
 *    no se ve.
 *
 * 3. CASILLA PRE-MARCADA (sneak into basket): "Acepto compartir mis datos
 *    con socios comerciales" viene marcada por defecto, esperando que el
 *    usuario no lo note.
 *
 * 4. SIN BOTÓN DE CERRAR Y ESCAPE BLOQUEADO: no hay una "X" y se cancela el
 *    evento `cancel` del <dialog> para que la tecla Escape no lo cierre.
 *    El usuario queda obligado a elegir una de las dos opciones.
 *
 * 5. URGENCIA FALSA: "¡Solo quedan 3 cupos hoy!" es un mensaje inventado
 *    para presionar la decisión.
 *
 * Una versión ética tendría: botón de cerrar visible, Escape funcional,
 * ambas opciones con el mismo peso visual y texto neutro ("No, gracias"),
 * la casilla desmarcada y nada de urgencia falsa.
 */
export default function NewsletterModal() {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const { showToast } = useToast()
  const [email, setEmail] = useState<string>('')
  const [shareData, setShareData] = useState<boolean>(true) // Dark pattern #3: pre-marcada

  useEffect(() => {
    let seen = false
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === 'true'
    } catch {
      // ignorar
    }
    if (seen) return

    const timer = setTimeout(() => dialogRef.current?.showModal(), DELAY_MS)
    return () => clearTimeout(timer)
  }, [])

  const close = () => {
    try {
      sessionStorage.setItem(SEEN_KEY, 'true')
    } catch {
      // ignorar
    }
    dialogRef.current?.close()
  }

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const handleSubscribe = () => {
    if (!emailValid) return
    close()
    showToast('¡Te suscribiste al newsletter!', 'success')
  }

  return (
    <dialog
      ref={dialogRef}
      // Dark pattern #4: se bloquea Escape para que no se pueda cerrar
      onCancel={(e) => e.preventDefault()}
      aria-labelledby="newsletter-title"
      className="m-auto w-[calc(100%-2rem)] max-w-md overflow-hidden rounded-2xl bg-white p-0 text-slate-800 shadow-2xl dark:bg-slate-800 dark:text-slate-100"
    >
      <div className="bg-gradient-to-br from-violet-600 to-fuchsia-600 px-6 py-5 text-center text-white">
        {/* Dark pattern #5: urgencia falsa */}
        <p className="mb-1 inline-block animate-pulse rounded-full bg-amber-400 px-3 py-0.5 text-xs font-bold text-slate-900">
          ¡Solo quedan 3 cupos hoy!
        </p>
        <h2 id="newsletter-title" className="text-2xl font-extrabold">
          ¡No te pierdas ningún estreno!
        </h2>
      </div>

      <form
        method="dialog"
        onSubmit={(e) => {
          e.preventDefault()
          handleSubscribe()
        }}
        className="space-y-4 p-6"
      >
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Suscríbete y recibe cada semana las mejores recomendaciones de series.
        </p>
        <div>
          <label htmlFor="newsletter-email" className="mb-1 block text-sm font-medium">
            Correo electrónico
          </label>
          <input
            id="newsletter-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@correo.com"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:ring-2 focus:ring-violet-500 focus:outline-none dark:border-slate-600 dark:bg-slate-900 dark:text-white"
          />
        </div>

        {/* Dark pattern #3: casilla pre-marcada con texto pequeño */}
        <div className="flex items-start gap-2">
          <input
            id="share-data"
            type="checkbox"
            checked={shareData}
            onChange={(e) => setShareData(e.target.checked)}
            className="mt-0.5"
          />
          <label htmlFor="share-data" className="text-[10px] leading-tight text-slate-400">
            Acepto compartir mis datos con socios comerciales seleccionados para fines publicitarios.
          </label>
        </div>

        {/* Dark pattern #2: botón de aceptar enorme y llamativo */}
        <button
          type="submit"
          disabled={!emailValid}
          className="w-full rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 py-3 text-lg font-extrabold text-slate-900 shadow-lg transition hover:scale-[1.02] disabled:opacity-60"
        >
          ¡SÍ, QUIERO SUSCRIBIRME!
        </button>

        {/* Dark patterns #1 y #2: confirmshaming + opción de rechazo casi invisible */}
        <button
          type="button"
          onClick={close}
          className="block w-full text-center text-[11px] text-slate-400 hover:underline"
        >
          No gracias, prefiero ver series aburridas
        </button>
      </form>
    </dialog>
  )
}
