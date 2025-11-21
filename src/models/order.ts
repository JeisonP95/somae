// models/Order.ts
import type { Product } from "./Product";

export class Order {
  name: string;
  phone: string;
  products: Product[];

  constructor(name: string, phone: string, products: Product[]) {
    this.name = name;
    this.phone = phone;
    this.products = products;
  }

  toJSON() {
    return JSON.stringify(
      {
        cliente: this.name,
        telefono: this.phone,
        productos: this.products.map((p) => ({
          nombre: p.name,
          categoria: p.category,
          precio: p.price,
        })),
        total: this.getTotal(),
      },
      null,
      2
    );
  }

  getTotal(): string {
    const total = this.products.reduce((sum, p) => {
      const value = parseInt(p.price.replace(/\D/g, ""));
      return sum + value;
    }, 0);
    return `$${total.toLocaleString("es-CO")} COP`;
  }

  toWhatsAppMessage() {
    const lines = [
      `*Nuevo Pedido SOMAE*`,
      ``,
      `👤 *Cliente:* ${this.name}`,
      `📞 *Teléfono:* ${this.phone}`,
      ``,
      `🛍️ *Productos:*`,
      ...this.products.map(
        (p) => `- ${p.name} (${p.price})`
      ),
      ``,
      `💰 *Total:* ${this.getTotal()}`,
    ];

    return lines.join("\n");
  }
}
