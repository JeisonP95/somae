export interface Product {
  name: string;
  category: string;
  price: string;
  image: string;
}

// Función helper para obtener información del producto
export function getProductInfo(product: Product): string {
  return `${product.name} - ${product.price}`;
}
  