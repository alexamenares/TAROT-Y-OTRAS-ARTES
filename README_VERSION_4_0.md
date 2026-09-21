# Tarot y Otras Artes - Frontend versión 4.0

## Descripción

La versión 4.0 conserva el diseño Material 3 "Ritual nocturno" y agrega una tienda simulada con carrito único para productos y experiencias pagadas. Continúa siendo un frontend estático sin API, backend, JWT, pagos ni base de datos.

## Ejecución

1. Abrir la carpeta completa en Visual Studio Code.
2. Abrir `index.html` con **Live Server**.
3. Mantener conexión a Internet para Bootstrap, Google Fonts y Material Web.
4. No abrir mediante `file://`, porque Material Web utiliza módulos ES.

## Tecnologías

- HTML5 semántico.
- CSS propio y Bootstrap 5.3.8 para estructura y navbar.
- JavaScript puro.
- Material Web oficial mediante `https://esm.run/@material/web/`.
- `localStorage` para carrito, historial y último pedido simulado.

## Flujo de compra

- “Una carta” es gratuita, comienza directamente y no modifica el carrito.
- “Tres cartas” y “Sanar y soltar” se agregan al mismo carrito que los productos.
- Tienda contiene 11 productos filtrables en cuatro categorías.
- El badge del encabezado cuenta unidades, no líneas.
- Los productos respetan el stock simulado y el carrito persiste al recargar.
- El checkout distingue entrega digital, retiro gratuito y despacho estándar de `$3.990`.
- La confirmación genera un número `TOA-AAAAMMDD-0001`, guarda el historial local y vacía el carrito.
- `mi-seleccion.html` redirige a `carrito.html` para conservar enlaces antiguos.

## Material Web utilizado

- `md-filled-button` y `md-outlined-button` para acciones.
- `md-filter-chip` para filtros de Tienda.
- `md-dialog` para confirmar acciones irreversibles.

Los campos del checkout y los botones de cantidad son controles HTML nativos con estilo Material 3. Esta decisión mantiene los flujos esenciales operativos si el CDN de Material Web no está disponible.

## Archivos principales

- `tienda.html`, `detalle-producto.html` y `js/datos-productos.js`.
- `carrito.html`, `js/carrito-servicio.js` y `js/carrito.js`.
- `finalizar-compra.html` y `js/finalizar-compra.js`.
- `pedido-confirmado.html` y `js/pedido-confirmado.js`.
- `css/estilos-v4.css`: precedencia visual específica de V4.
- `INFORME_IMPLEMENTACION_VERSION_4_0.md`.
- `PLAN_PRUEBAS_MANUALES_VERSION_4_0.md`.

## Alcance simulado

No se realiza ningún cobro, despacho, retiro, correo ni comprobante tributario real. Los precios, stock, clientes y pedidos son datos demostrativos guardados únicamente en el navegador.
