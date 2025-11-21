import { OrderProvider } from "./context/OrderContext"
import Hero from "./components/Hero"
import FeaturedProducts from "./components/FeaturedProducts"
import OrderSection from "./components/OrderSection"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import Navigation from "./components/Navigation"
import "./globals.css"

export default function App() {
  return (
    <OrderProvider>
      <main className="min-h-screen">
        <Navigation />
        <Hero />
        <FeaturedProducts />
        <OrderSection />
        <Contact />
        <Footer />
      </main>
    </OrderProvider>
  )
}
