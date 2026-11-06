import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import { FavoritesProvider } from './context/FavoritesContext'
import { ThemeProvider } from './context/ThemeContext'
import { ToastProvider } from './context/ToastContext'
import ContactPage from './pages/ContactPage'
import DetailPage from './pages/DetailPage'
import ExplorePage from './pages/ExplorePage'
import FavoritesPage from './pages/FavoritesPage'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        {/* Los favoritos envuelven al router: así el estado persiste entre rutas */}
        <FavoritesProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/explorar" element={<ExplorePage />} />
                <Route path="/explorar/:id" element={<DetailPage />} />
                <Route path="/favoritos" element={<FavoritesPage />} />
                <Route path="/contacto" element={<ContactPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </FavoritesProvider>
      </ToastProvider>
    </ThemeProvider>
  )
}
