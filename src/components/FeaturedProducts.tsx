import { products } from "../data/products";
import { useOrder } from "../context/OrderContext";
import type { Product } from "../models/Product";

export default function FeaturedProducts() {
  const { addProduct, getTotalQuantity } = useOrder();

  const handleAddToOrder = (product: Product) => {
    addProduct(product);
    // Feedback visual opcional
    alert(`✅ ${product.name} agregado al pedido (${getTotalQuantity()} productos)`);
  };

  return (
    <section id="productos" className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-widest text-primary mb-4">Productos Destacados</p>
          <h2 className="somae-section-title font-serif text-foreground">Lo más amado por nuestras clientas</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div key={index} className="somae-card bg-card rounded-2xl overflow-hidden shadow-lg group cursor-pointer">
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-secondary text-secondary-foreground px-4 py-2 rounded-full text-xs uppercase tracking-wider">
                  {product.category}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-serif mb-2 text-card-foreground">{product.name}</h3>
                <p className="text-2xl font-light text-primary">{product.price}</p>
                <button
                  onClick={() => handleAddToOrder(product)}
                  className="mt-4 w-full somae-button py-3 border border-primary text-primary rounded-full text-sm uppercase tracking-wider hover:bg-primary hover:text-primary-foreground transition-all"
                >
                  Agregar al Pedido
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
