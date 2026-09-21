# Guía simple para explicar el código — Versión 4.0

## Antes de empezar: la idea principal

Este proyecto es una página web de Tarot y Otras Artes.

Por ahora, casi todo funciona de forma **simulada**. Eso significa que la página se comporta como una tienda real, pero no cobra dinero, no envía correos y no guarda pedidos en una base de datos.

La información se guarda temporalmente en el navegador. Más adelante, cuando conectemos el frontend con el backend, esos datos podrán venir de la API.

## 1. Las tres tecnologías principales

| Tecnología | Forma fácil de explicarla |
|---|---|
| HTML | Es el esqueleto de la página: títulos, textos, botones, formularios e imágenes. |
| CSS | Es la ropa de la página: colores, tamaños, espacios, tarjetas y diseño. |
| JavaScript | Es el comportamiento: filtros, validaciones, carrito y cambios sin recargar. |

También se usan dos bibliotecas:

- **Bootstrap** ayuda a ordenar el contenido en columnas y contenedores.
- **Material Web** entrega componentes modernos, por ejemplo botones y diálogos.

## 2. Cómo está ordenado el proyecto

No necesitas memorizar todos los archivos. Primero reconoce estos grupos:

| Carpeta o archivo | Para qué sirve |
|---|---|
| Archivos HTML | Son las distintas páginas del sitio. |
| carpeta css | Tiene los estilos visuales. |
| carpeta js | Tiene la lógica y comportamiento. |
| carpeta imagenes | Tiene cartas, Heroes, ouróboro y productos. |
| README e INFORME | Explican el proyecto y las pruebas. |

## 3. Las páginas más importantes

| Página | Qué hace |
|---|---|
| index.html | Es la portada. Da acceso a las áreas principales. |
| experiencias.html | Muestra las experiencias de Tarot. |
| detalle-experiencia.html | Muestra una experiencia específica. |
| tienda.html | Muestra productos físicos y filtros por categoría. |
| detalle-producto.html | Muestra un producto específico. |
| carrito.html | Reúne experiencias pagadas y productos. |
| finalizar-compra.html | Simula el paso final de compra. |
| pedido-confirmado.html | Muestra el pedido recién creado. |

## 4. La forma más fácil de entender el flujo

Piensa en esta secuencia:

1. La persona entra a **Tienda**.
2. Ve productos creados con JavaScript.
3. Pulsa “Ver producto”.
4. En el detalle pulsa “Agregar al carrito”.
5. El carrito guarda ese producto en el navegador.
6. La persona puede aumentar, disminuir o quitar unidades.
7. Al finalizar, completa datos simples y elige Retiro o Despacho.
8. El sitio crea un pedido simulado y vacía el carrito.

### Frase que puedes decir

> “El flujo de compra está completo desde el punto de vista de la interfaz, pero es simulado. No hay pago real ni conexión al backend todavía.”

## 5. Dónde están los productos

Archivo: datos-productos.js dentro de la carpeta js.

Aquí existe una lista llamada productos. Cada producto tiene información como:

- id: identificador único;
- nombre;
- categoría;
- precio;
- stock;
- descripción;
- imagen.

### Ejemplo simple

Un producto es un objeto de datos. Tienda no escribe las tarjetas una por una en HTML; JavaScript toma cada producto de la lista y crea su tarjeta automáticamente.

### Si te preguntan por qué se hizo así

> “Porque es más fácil de mantener. Para agregar otro oráculo, solo se agrega un producto a la lista y su imagen. No hay que copiar una página completa.”

## 6. Cómo funcionan los filtros de Tienda

Archivo: tienda.js.

Este archivo:

1. Mira las categorías existentes en los productos.
2. Crea un filtro para cada categoría.
3. Muestra solo los productos de la categoría elegida.

No borra productos. Solo decide cuáles se ven y cuáles no.

### Frase que puedes decir

> “El filtro trabaja con los productos que ya están cargados en memoria. Por ahora no consulta una base de datos.”

## 7. La parte más importante: el carrito

Archivo: carrito-servicio.js.

Este es el “cerebro” del carrito. Lo usan Tienda, Experiencias y Carrito.

| Función | Explicación sencilla |
|---|---|
| agregar | Crea una línea o aumenta una existente sin sobrepasar stock. |
| actualizarCantidad | Aplica el cambio de los botones + y −. |
| quitar | Elimina una línea completa. |
| obtenerLineas | Entrega lo que está actualmente en el carrito. |
| calcularSubtotal | Suma los precios. |
| vaciar | Borra el carrito después de confirmar un pedido. |

### Reglas del carrito

- Un producto no se puede agregar más veces que su stock disponible.
- Las experiencias pagadas también pueden ir al carrito.
- La experiencia gratuita “Una carta” no va al carrito: se inicia directamente.
- El carrito sigue allí aunque se recargue la página.

### Frase que puedes decir

> “Centralicé las reglas en un solo archivo. Así Tienda y Experiencias no calculan el stock de formas diferentes.”

## 8. ¿Qué es localStorage?

localStorage es un espacio que tiene el navegador para guardar datos pequeños.

En este proyecto guarda:

- el carrito;
- los pedidos simulados;
- el último pedido mostrado en la página de confirmación.

No es una base de datos real. Si la persona borra los datos del navegador, se borra esa información.

### Frase que puedes decir

> “Usamos localStorage para que el carrito no desaparezca al actualizar la página, sin tener que conectar todavía el backend.”

## 9. Cómo se diferencia una experiencia gratuita de una pagada

Archivos: datos-experiencias.js y detalle-experiencia.js.

La regla es muy simple:

- Si el precio es 0, es gratuita y se inicia directamente.
- Si el precio es mayor que 0, se puede agregar al carrito.

### Frase que puedes decir

> “La decisión no depende del texto del botón; depende del precio que viene en los datos de la experiencia.”

## 10. Checkout: Retiro y Despacho

Archivo: finalizar-compra.js.

El checkout revisa primero qué hay en el carrito.

- Si hay solo experiencias digitales, no pide dirección.
- Si hay productos físicos, permite elegir:
  - Retiro: cuesta 0 pesos.
  - Despacho: suma 3.990 pesos y pide dirección.

Después guarda un pedido simulado y envía a la página de confirmación.

### Frase que puedes decir

> “La página muestra campos distintos según el tipo de compra, para no pedir dirección a alguien que solo compró una experiencia digital.”

## 11. ¿Por qué el código usa funciones?

Una función es una tarea pequeña con un nombre.

Por ejemplo:

- crearTarjetaProducto: crea una tarjeta visual.
- mostrarProductos: muestra productos.
- agregar: agrega al carrito.
- mostrarCarrito: dibuja el carrito.

Esto ayuda a que el código esté ordenado. En vez de tener un archivo gigante, cada función hace una tarea específica.

## 12. Los archivos comunes

| Archivo | Para qué sirve |
|---|---|
| interfaz.js | Agrega el ouróboro, mensajes pequeños y ventanas de confirmación. |
| navegacion.js | Actualiza el número que aparece en el icono del carrito. |
| material.js | Activa los componentes oficiales de Material Web. |

### Algo importante

El ouróboro se agrega desde interfaz.js para no tener que copiar el mismo código en cada página.

## 13. Formularios: Login, Registro y Contacto

Estos formularios revisan que los datos tengan una forma correcta, por ejemplo:

- que un correo tenga formato de correo;
- que una contraseña tenga la longitud mínima;
- que los campos obligatorios no estén vacíos.

Pero todavía son simulados. No crean usuarios reales ni hacen inicio de sesión contra el backend.

### Frase que puedes decir

> “La validación del navegador mejora la experiencia de usuario. Cuando se conecte el backend, también habrá validación en el servidor por seguridad.”

## 14. Material Web y Bootstrap sin confundirse

Los dos se usan, pero para tareas distintas:

- Bootstrap ordena la página en columnas y contenedores.
- Material Web da botones, filtros y diálogos modernos.
- CSS propio da la identidad visual de Tarot y Otras Artes.

No compiten por el mismo botón.

## 15. Cinco preguntas probables y respuestas

### ¿Por qué los productos están en un archivo JavaScript?

Porque es una forma simple de simular datos. Más adelante se reemplazará por una llamada a la API.

### ¿Cómo sabe la página qué producto mostrar?

Lee el id que viene en la URL. Luego busca ese id en la lista de productos.

### ¿Cómo se evita comprar más unidades que el stock?

Antes de aumentar la cantidad, carrito-servicio.js compara la cantidad solicitada con el stock del producto.

### ¿Por qué el carrito no se borra al recargar?

Porque se guarda en localStorage del navegador.

### ¿La compra es real?

No. Es una simulación de frontend. No hay pago, descuento de stock ni pedido en base de datos.

## 16. Ruta corta para estudiar en orden

No intentes leer todo de una vez. Sigue este orden:

1. index.html: mira la estructura de una página.
2. datos-productos.js: mira cómo se guarda un producto.
3. tienda.js: mira cómo se crea una tarjeta.
4. detalle-producto.js: mira cómo se agrega al carrito.
5. carrito-servicio.js: mira las reglas principales.
6. carrito.js: mira cómo se muestra el carrito.
7. finalizar-compra.js: mira cómo termina la compra.

Después revisa los formularios y el panel administrativo.

## 17. Qué NO hace aún el proyecto

No tiene:

- pagos reales;
- usuarios reales conectados al backend;
- descuento real de stock;
- envío de correo;
- pedidos guardados en una base de datos.

Eso no significa que el frontend esté mal. Significa que esta versión está construida como un MVP simulado, preparado para integrarse más adelante.
