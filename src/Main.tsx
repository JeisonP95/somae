import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './globals.css'
import App from './App'
// Establecer el título y la descripción de la página
document.title = "SOMAÉ - Bienestar Femenino & Autocuidado"
const metaDescription = document.querySelector('meta[name="description"]')
if (metaDescription) {
  metaDescription.setAttribute(
    "content",
    "Descubre SOMAÉ: tu marca de confianza en productos capilares, pijamas de lujo y maquillaje natural. Bienestar y belleza para la mujer moderna."
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
