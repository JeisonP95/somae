# SOMAÉ - E-commerce de Bienestar Femenino

SOMAÉ es una aplicación web e-commerce desarrollada con React, TypeScript y Vite, especializada en la venta de productos de bienestar femenino: productos capilares naturales, pijamas de lujo y maquillaje.

## 🚀 Tecnologías Utilizadas

- **React 19** - Framework de UI
- **TypeScript** - Lenguaje de programación tipado
- **Vite** - Herramienta de construcción rápida
- **Tailwind CSS** - Framework CSS utilitario
- **PostCSS** - Procesador de CSS moderno

## 📋 Características Principales

### 1. **Catálogo de Productos**
- Visualización de productos con imágenes
- Categorización por tipo (Capilar, Corporal, Facial)
- Información detallada de precios y categorías

### 2. **Sistema de Pedidos con WhatsApp**
- Carrito de compras funcional
- Control de cantidades de productos
- Integración con WhatsApp para envío de pedidos
- Formulario de contacto integrado con WhatsApp

### 3. **Diseño Responsive**
- Diseño adaptativo para todos los dispositivos
- Menú de navegación móvil
- Transiciones y animaciones suaves

## 🎓 Programación Orientada a Objetos (POO)

Este proyecto implementa los conceptos de Programación Orientada a Objetos (POO) mediante la clase `Order`.

### 📦 Implementación POO

#### **Clase: Order**

Ubicación: `src/models/Order.ts`

```typescript
export class Order {
  name: string;
  phone: string;
  products: Product[];
}
```

##### **1. Propiedades (Atributos)**

La clase `Order` encapsula los datos de un pedido:

```typescript
name: string;      // Nombre del cliente
phone: string;     // Teléfono del cliente
products: Product[]; // Lista de productos
```

##### **2. Constructor**

El constructor inicializa las propiedades del pedido:

```typescript
constructor(name: string, phone: string, products: Product[]) {
  this.name = name;
  this.phone = phone;
  this.products = products;
}
```

##### **3. Métodos**

###### **a) `toJSON()`**

Convierte el objeto Order a formato JSON para almacenamiento o transmisión:

```typescript
toJSON() {
  return JSON.stringify({
    cliente: this.name,
    telefono: this.phone,
    productos: this.products.map((p) => ({
      nombre: p.name,
      categoria: p.category,
      precio: p.price,
    })),
    total: this.getTotal(),
  }, null, 2);
}
```

**Características POO:**
- **Encapsulación**: Accede a las propiedades privadas (`this.name`, `this.products`)
- **Abstracción**: Oculta la complejidad de la serialización

###### **b) `getTotal()`**

Calcula el total del pedido sumando los precios de todos los productos:

```typescript
getTotal(): string {
  const total = this.products.reduce((sum, p) => {
    const value = parseInt(p.price.replace(/\D/g, ""));
    return sum + value;
  }, 0);
  return `$${total.toLocaleString("es-CO")} COP`;
}
```

**Características POO:**
- **Encapsulación**: Método que opera sobre los datos del objeto
- **Reutilización**: Puede ser llamado desde otros métodos

###### **c) `toWhatsAppMessage()`**

Formatea el pedido como mensaje de WhatsApp:

```typescript
toWhatsAppMessage() {
  const lines = [
    `*Nuevo Pedido SOMAE*`,
    ``,
    `👤 *Cliente:* ${this.name}`,
    `📞 *Teléfono:* ${this.phone}`,
    ``,
    `🛍️ *Productos:*`,
    ...this.products.map((p) => `- ${p.name} (${p.price})`),
    ``,
    `💰 *Total:* ${this.getTotal()}`,
  ];
  return lines.join("\n");
}
```

**Características POO:**
- **Encapsulación**: Accede a las propiedades de la instancia
- **Polimorfismo**: Genera diferentes formatos de salida según el contexto

### 🔑 Conceptos POO Aplicados

#### 1. **Encapsulación**
Los datos del pedido están encapsulados dentro de la clase `Order`. Solo los métodos públicos pueden acceder y modificar los datos.

```typescript
// Privado (implícito)
name: string;
phone: string;
products: Product[];

// Público (métodos)
toJSON()
getTotal()
toWhatsAppMessage()
```

#### 2. **Abstracción**
La clase `Order` abstrae la complejidad de manejar un pedido, proporcionando métodos simples como `toJSON()` y `getTotal()`.

#### 3. **Reutilización**
La clase puede ser instanciada múltiples veces para crear diferentes pedidos:

```typescript
const order1 = new Order("María", "3001234567", [product1, product2]);
const order2 = new Order("Juan", "3007654321", [product3]);
```

#### 4. **Composición**
`Order` está compuesta por objetos `Product[]`, demostrando la relación "tiene-un" (has-a).

### 📊 Diagrama de Clases

```
┌──────────────────┐
│      Order       │
├──────────────────┤
│ - name: string   │
│ - phone: string  │
│ - products:      │
│   Product[]      │
├──────────────────┤
│ + constructor()  │
│ + toJSON()       │
│ + getTotal()     │
│ + toWhatsAppMsg()│
└──────────────────┘
         │
         │ (usa)
         ▼
┌──────────────────┐
│     Product      │
├──────────────────┤
│ - name: string   │
│ - category: string│
│ - price: string  │
│ - image: string  │
└──────────────────┘
```

### 🎯 Ejemplo de Uso

```typescript
// Crear instancia de Order
const order = new Order(
  "María González",
  "3001234567",
  [product1, product2, product3]
);

// Usar métodos de la clase
const jsonOrder = order.toJSON();
const total = order.getTotal();
const whatsappMsg = order.toWhatsAppMessage();

// Enviar a WhatsApp
const whatsappURL = `https://wa.me/573225097180?text=${encodeURIComponent(whatsappMsg)}`;
window.open(whatsappURL, "_blank");
```

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes React
│   ├── Hero.tsx
│   ├── Navigation.tsx
│   ├── FeaturedProducts.tsx
│   ├── OrderSection.tsx
│   ├── Contact.tsx
│   └── Footer.tsx
├── models/             # Modelos POO
│   ├── Order.ts        # Clase Order (implementación POO)
│   ├── Product.ts      # Interfaz Product
│   └── ProductWithQuantity.ts
├── context/            # Context API de React
│   └── OrderContext.tsx
├── data/               # Datos estáticos
│   └── products.ts
└── assets/             # Recursos estáticos
    └── images/
```

## 🛠️ Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Vista previa de producción
npm run preview
```

## 🎨 Uso del Sistema de Pedidos

### 1. Agregar Productos al Pedido
- Los usuarios pueden hacer clic en "Agregar al Pedido" en cualquier producto del catálogo
- El producto se agrega automáticamente a la lista de pedidos con cantidad 1

### 2. Gestionar Cantidades
- En la sección de pedidos, los usuarios pueden ajustar las cantidades con los botones +/-
- Se muestra el total individual de cada producto
- Total general calculado automáticamente

### 3. Realizar el Pedido
1. El usuario completa el formulario con nombre y teléfono
2. Al hacer clic en "Realizar Pedido":
   - Se crea una instancia de la clase `Order`
   - Se genera el mensaje para WhatsApp
   - Se abre WhatsApp automáticamente con el pedido formateado
   - Se muestra el pedido en formato JSON en pantalla
   - Se limpia el formulario y el carrito

### 4. Formulario de Contacto
- Los mensajes del formulario de contacto también se envían por WhatsApp
- Formato similar al sistema de pedidos

## 💡 Ventajas de la Implementación POO

1. **Mantenibilidad**: El código está organizado y es fácil de mantener
2. **Escalabilidad**: Fácil agregar nuevos métodos o propiedades
3. **Reutilización**: La clase `Order` puede ser usada en diferentes contextos
4. **Type Safety**: TypeScript proporciona seguridad de tipos
5. **Testeable**: Cada método puede ser probado independientemente

## 📱 Integración con WhatsApp

El proyecto integra WhatsApp Business para:
- Envío automático de pedidos
- Recepción de mensajes de contacto
- Número: +57 322 509 7180

## 🎯 Funcionalidades Futuras

- [ ] Persistencia de pedidos en base de datos
- [ ] Sistema de autenticación de usuarios
- [ ] Historial de pedidos
- [ ] Integración con API de pagos
- [ ] Panel de administración

## 👥 Créditos

Desarrollado con ❤️ para SOMAÉ - Bienestar Femenino & Autocuidado

---

## 📝 Licencia

Este proyecto es privado y propiedad de SOMAÉ.
