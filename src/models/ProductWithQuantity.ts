import type { Product } from "./Product";

export interface ProductWithQuantity {
  product: Product;
  quantity: number;
}

export function getTotalPrice(productWithQty: ProductWithQuantity): number {
  const priceStr = productWithQty.product.price.replace(/\D/g, "");
  const priceNum = parseInt(priceStr) || 0;
  return priceNum * productWithQty.quantity;
}

export function getFormattedTotal(productWithQty: ProductWithQuantity): string {
  const total = getTotalPrice(productWithQty);
  return `$${total.toLocaleString("es-CO")} COP`;
}

