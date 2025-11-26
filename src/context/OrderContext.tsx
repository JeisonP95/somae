import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { Product } from "../models/Product";
import type { ProductWithQuantity } from "../models/ProductWithQuantity";

interface OrderContextType {
  selectedProducts: ProductWithQuantity[];
  addProduct: (product: Product) => void;
  updateQuantity: (productName: string, quantity: number) => void;
  removeProduct: (productName: string) => void;
  clearProducts: () => void;
  getTotalQuantity: () => number;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [selectedProducts, setSelectedProducts] = useState<ProductWithQuantity[]>([]);

  const addProduct = (product: Product) => {
    setSelectedProducts(prev => {
      const existing = prev.find(p => p.product.name === product.name);
      if (existing) {
        // Si ya existe, incrementar cantidad
        return prev.map(p =>
          p.product.name === product.name
            ? { ...p, quantity: p.quantity + 1 }
            : p
        );
      }
      // Si no existe, agregar con cantidad 1
      return [...prev, { product, quantity: 1 }];
    });
  };

  const updateQuantity = (productName: string, quantity: number) => {
    if (quantity <= 0) {
      removeProduct(productName);
      return;
    }
    setSelectedProducts(prev =>
      prev.map(p =>
        p.product.name === productName ? { ...p, quantity } : p
      )
    );
  };

  const removeProduct = (productName: string) => {
    setSelectedProducts(prev =>
      prev.filter(p => p.product.name !== productName)
    );
  };

  const clearProducts = () => {
    setSelectedProducts([]);
  };

  const getTotalQuantity = () => {
    return selectedProducts.reduce((sum, p) => sum + p.quantity, 0);
  };

  return (
    <OrderContext.Provider
      value={{
        selectedProducts,
        addProduct,
        updateQuantity,
        removeProduct,
        clearProducts,
        getTotalQuantity,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error("useOrder must be used within an OrderProvider");
  }
  return context;
}

