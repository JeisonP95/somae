import { useState } from "react";
import { useOrder } from "../context/OrderContext";
import { Order } from "../models/order";

export default function OrderSection() {
  const { selectedProducts, updateQuantity, removeProduct, clearProducts } = useOrder();
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });

  const [order, setOrder] = useState<Order | null>(null);
  const [showOrder, setShowOrder] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedProducts.length === 0) {
      alert("Por favor agrega al menos un producto al pedido");
      return;
    }

    // Convertir productos con cantidad a productos simples para el modelo Order
    const productsForOrder = selectedProducts.flatMap(item =>
      Array(item.quantity).fill(null).map(() => item.product)
    );

    // Crear instancia de Order
    const newOrder = new Order(
      formData.name,
      formData.phone,
      productsForOrder
    );

    setOrder(newOrder);
    setShowOrder(true);

    // Mostrar en consola
    console.log("📦 Pedido generado:");
    console.log(newOrder.toJSON());

    // Enviar a WhatsApp
    const whatsappMessage = newOrder.toWhatsAppMessage();
    const whatsappNumber = "573104994168"; // Número de WhatsApp para pedidos
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappURL, "_blank");

    // Limpiar el formulario y productos seleccionados
    setFormData({ name: "", phone: "" });
    clearProducts();
  };

  // Calcular total del pedido
  const calculateTotal = () => {
    return selectedProducts.reduce((sum, item) => {
      const priceStr = item.product.price.replace(/\D/g, "");
      const priceNum = parseInt(priceStr) || 0;
      return sum + priceNum * item.quantity;
    }, 0);
  };

  return (
    <section id="pedidos" className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-widest text-primary mb-4">
            Realizar Pedido
          </p>
          <h2 className="somae-section-title font-serif text-foreground">
            Compra nuestros productos
          </h2>
          <p className="text-lg text-muted-foreground mt-4">
            Completa tus datos para finalizar el pedido
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Formulario */}
          <div className="bg-card rounded-2xl p-8 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nombre */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm uppercase tracking-wider text-muted-foreground mb-2"
                >
                  Nombre Completo
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  placeholder="Tu nombre completo"
                />
              </div>

              {/* Teléfono */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm uppercase tracking-wider text-muted-foreground mb-2"
                >
                  Teléfono
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  placeholder="300 1234567"
                />
              </div>

              {/* Botón de envío */}
              <button
                type="submit"
                disabled={selectedProducts.length === 0}
                className="somae-button w-full py-4 bg-primary text-primary-foreground rounded-full text-sm uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Realizar Pedido ({selectedProducts.reduce((sum, p) => sum + p.quantity, 0)} productos)
              </button>
            </form>
          </div>

          {/* Lista de productos seleccionados */}
          <div className="space-y-6">
            <div className="bg-card rounded-2xl p-8 shadow-xl">
              <h3 className="text-xl font-serif mb-6 text-card-foreground">
                Tu Pedido ({selectedProducts.length} {selectedProducts.length === 1 ? 'producto' : 'productos'})
              </h3>
              
              {selectedProducts.length === 0 ? (
                <p className="text-center text-muted-foreground py-12">
                  No hay productos en tu pedido. Agrega productos desde la sección de productos.
                </p>
              ) : (
                <div className="space-y-4 max-h-[500px] overflow-y-auto">
                  {selectedProducts.map((item, index) => (
                    <div
                      key={index}
                      className="border-2 border-border rounded-xl p-4 bg-background"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-serif font-semibold text-foreground">
                            {item.product.name}
                          </h4>
                          <p className="text-lg font-bold text-primary mt-1">
                            {item.product.price}
                          </p>
                        </div>
                        <button
                          onClick={() => removeProduct(item.product.name)}
                          className="ml-3 p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-all"
                          title="Eliminar producto"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                      
                      {/* Control de cantidad */}
                      <div className="flex items-center gap-3 mt-3">
                        <span className="text-sm text-muted-foreground">Cantidad:</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.name, item.quantity - 1)}
                          className="px-3 py-1 bg-muted hover:bg-muted/80 rounded-lg transition-all"
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="font-bold text-lg min-w-[3rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.name, item.quantity + 1)}
                          className="px-3 py-1 bg-muted hover:bg-muted/80 rounded-lg transition-all"
                        >
                          +
                        </button>
                        <span className="ml-auto font-bold text-lg text-primary">
                          ${(parseInt(item.product.price.replace(/\D/g, "")) * item.quantity).toLocaleString('es-CO')} COP
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Resumen de total */}
            {selectedProducts.length > 0 && (
              <div className="bg-muted/50 rounded-2xl p-6">
                <h4 className="font-serif text-lg mb-3">Resumen del Pedido</h4>
                <div className="space-y-2 mb-3">
                  {selectedProducts.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {item.quantity}x {item.product.name}
                      </span>
                      <span className="font-semibold">
                        ${(parseInt(item.product.price.replace(/\D/g, "")) * item.quantity).toLocaleString('es-CO')} COP
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border pt-3 flex justify-between items-center">
                  <span className="font-serif text-xl font-bold">Total:</span>
                  <span className="font-serif text-2xl font-bold text-primary">
                    ${calculateTotal().toLocaleString('es-CO')} COP
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mostrar orden generada */}
        {showOrder && order && (
          <div className="mt-12 bg-card rounded-2xl p-8 shadow-xl">
            <h3 className="text-2xl font-serif mb-6 text-card-foreground">
              Pedido Generado
            </h3>
            <div className="bg-background rounded-xl p-6 mb-6">
              <pre className="text-sm text-muted-foreground overflow-x-auto">
                {order.toJSON()}
              </pre>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(order.toJSON());
                  alert("Pedido copiado al portapapeles!");
                }}
                className="somae-button px-6 py-3 border border-primary text-primary rounded-full text-sm uppercase tracking-wider hover:bg-primary hover:text-primary-foreground transition-all"
              >
                Copiar JSON
              </button>
              <button
                onClick={() => setShowOrder(false)}
                className="somae-button px-6 py-3 bg-primary text-primary-foreground rounded-full text-sm uppercase tracking-wider"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
