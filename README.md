# Universo Series — Proyecto 01

Aplicación SPA hecha con **Vite + React + TypeScript + Tailwind CSS + React Router** que consume la API pública de [TVMaze](https://www.tvmaze.com/api).

## Rutas

| Ruta | Vista |
|---|---|
| `/` | Inicio (hero) + modal con dark pattern |
| `/explorar` | Grid de series con búsqueda y filtros (género, estado) |
| `/explorar/:id` | Detalle de una serie (fetch por ID) |
| `/favoritos` | Series guardadas |
| `/contacto` | Formulario controlado con validación |
| `*` | Página 404 |

## Endpoints usados

- Lista: `GET https://api.tvmaze.com/shows?page=0`
- Detalle: `GET https://api.tvmaze.com/shows/:id`

## Funcionalidades

- Estados de **loading**, **error** (con reintentar) y **empty**
- Búsqueda y filtrado en tiempo real (los filtros se guardan en la URL)
- Favoritos en Context (persisten entre rutas y en `localStorage`)
- Toasts de éxito / error / info con auto-dismiss (implementados desde cero)
- Modal de confirmación con `<dialog>` + `useRef` + `showModal()` (quitar favoritos y enviar formulario)
- Modal de newsletter con **dark patterns intencionales**, explicados en `src/components/NewsletterModal.tsx`
- Modo oscuro
- Accesibilidad: `alt`, `role`, `aria-*`, `htmlFor`, HTML semántico, enlace "saltar al contenido"

## Scripts

```bash
npm install
npm run dev      # desarrollo
npm run build    # build de producción
```

`vercel.json` redirige todas las rutas a `index.html` para que React Router funcione al recargar en Vercel.
