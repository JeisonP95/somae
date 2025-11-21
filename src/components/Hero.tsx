import heroImage from "../assets/images/pef.jpg"

export default function Hero() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="fade-in">
            <p className="text-sm uppercase tracking-widest text-primary mb-6">Bienestar · Belleza · Autocuidado</p>
            <h1 className="somae-hero-title font-serif text-foreground mb-6">Descubre tu mejor versión</h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl">
              SOMAÉ es más que una marca, es un estilo de vida dedicado al bienestar femenino. Productos capilares
              naturales, pijamas de lujo y maquillaje que realza tu belleza natural.
            </p>
          </div>

          {/* Right Image */}
          <div className="relative fade-in">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <img src={heroImage} alt="SOMAÉ Wellness" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 bg-secondary text-secondary-foreground px-8 py-6 rounded-2xl shadow-xl">
              <p className="text-sm uppercase tracking-wider mb-1">Productos</p>
              <p className="text-3xl font-serif">100% Naturales</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
