import { useState, type FormEvent } from 'react'
import ConfirmDialog from '../components/ConfirmDialog'
import FormField from '../components/FormField'
import { useToast } from '../context/ToastContext'

interface FormValues {
  name: string
  email: string
  message: string
}

type FormErrors = Partial<Record<keyof FormValues, string>>

const INITIAL_VALUES: FormValues = { name: '', email: '', message: '' }
const INITIAL_TOUCHED: Record<keyof FormValues, boolean> = { name: false, email: false, message: false }

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {}
  if (values.name.trim().length < 2) errors.name = 'El nombre debe tener al menos 2 caracteres'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
    errors.email = 'Ingresa un email válido (debe contener @ y un dominio)'
  if (values.message.trim().length < 10) errors.message = 'El mensaje debe tener al menos 10 caracteres'
  return errors
}

export default function ContactPage() {
  const { showToast } = useToast()
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES)
  const [touched, setTouched] = useState(INITIAL_TOUCHED)
  const [confirming, setConfirming] = useState<boolean>(false)

  const errors = validate(values)
  const isValid = Object.keys(errors).length === 0

  const setField = (field: keyof FormValues) => (value: string) =>
    setValues((prev) => ({ ...prev, [field]: value }))
  const touchField = (field: keyof FormValues) => () => setTouched((prev) => ({ ...prev, [field]: true }))

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!isValid) {
      setTouched({ name: true, email: true, message: true })
      showToast('Revisa los campos del formulario', 'error')
      return
    }
    setConfirming(true)
  }

  const handleConfirm = () => {
    setConfirming(false)
    // No hay backend: simulamos el envío
    showToast(`¡Gracias ${values.name.trim()}! Tu mensaje fue enviado`, 'success')
    setValues(INITIAL_VALUES)
    setTouched(INITIAL_TOUCHED)
  }

  return (
    <section aria-labelledby="contact-title" className="mx-auto max-w-xl px-4 py-12">
      <h1 id="contact-title" className="text-3xl font-extrabold">Contacto</h1>
      <p className="mt-1 mb-8 text-sm text-slate-600 dark:text-slate-400">
        ¿Tienes preguntas o sugerencias? Envíanos un mensaje.
      </p>

      <form
        noValidate
        onSubmit={handleSubmit}
        className="space-y-5 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8 dark:bg-slate-800 dark:ring-slate-700"
      >
        <FormField
          id="name"
          label="Nombre"
          value={values.name}
          error={errors.name}
          showError={touched.name}
          placeholder="Tu nombre"
          onChange={setField('name')}
          onBlur={touchField('name')}
        />
        <FormField
          id="email"
          label="Email"
          type="email"
          value={values.email}
          error={errors.email}
          showError={touched.email}
          placeholder="tu@correo.com"
          onChange={setField('email')}
          onBlur={touchField('email')}
        />
        <FormField
          id="message"
          label="Mensaje"
          multiline
          value={values.message}
          error={errors.message}
          showError={touched.message}
          placeholder="Escribe tu mensaje aquí..."
          onChange={setField('message')}
          onBlur={touchField('message')}
        />

        <button
          type="submit"
          disabled={!isValid}
          className="w-full rounded-lg bg-violet-600 py-2.5 font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-violet-600"
        >
          Enviar mensaje
        </button>
      </form>

      <ConfirmDialog
        open={confirming}
        title="¿Enviar mensaje?"
        confirmText="Enviar"
        onConfirm={handleConfirm}
        onCancel={() => setConfirming(false)}
      >
        Se enviará tu mensaje a nombre de <strong>{values.name.trim()}</strong> ({values.email.trim()}).
      </ConfirmDialog>
    </section>
  )
}
