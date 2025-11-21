import { useState, useEffect } from "react"

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <a href="#inicio" className="flex items-center">
            <span className="text-3xl font-serif font-light tracking-wider text-foreground">SOMAÉ</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#inicio"
              className="text-sm uppercase tracking-wider text-foreground/80 hover:text-primary transition-colors"
            >
              Inicio
            </a>
            <a
              href="#productos"
              className="text-sm uppercase tracking-wider text-foreground/80 hover:text-primary transition-colors"
            >
              Productos
            </a>
            <a
              href="#contacto"
              className="text-sm uppercase tracking-wider text-foreground/80 hover:text-primary transition-colors"
            >
              Contacto
            </a>
            <a
              href="#pedidos"
              className="somae-button px-6 py-2 bg-primary text-primary-foreground rounded-full text-sm uppercase tracking-wider"
            >
              Realizar Pedido
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span
                className={`w-full h-0.5 bg-foreground transition-all ${
                  isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span className={`w-full h-0.5 bg-foreground transition-all ${isMobileMenuOpen ? "opacity-0" : ""}`} />
              <span
                className={`w-full h-0.5 bg-foreground transition-all ${
                  isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-6 border-t border-border">
            <div className="flex flex-col gap-4">
              <a
                href="#inicio"
                className="text-sm uppercase tracking-wider text-foreground/80 hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Inicio
              </a>
              <a
                href="#productos"
                className="text-sm uppercase tracking-wider text-foreground/80 hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Productos
              </a>
              <a
                href="#contacto"
                className="text-sm uppercase tracking-wider text-foreground/80 hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contacto
              </a>
              <a
                href="#pedidos"
                className="somae-button px-6 py-2 bg-primary text-primary-foreground rounded-full text-sm uppercase tracking-wider w-full"
              >
                Realizar Pedido
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
