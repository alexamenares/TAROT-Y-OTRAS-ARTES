# Informe de implementación - Versión 4.0

## Objetivo

Incorporar Tienda, carrito único y checkout simulado sobre la versión 3.0 aprobada, preservando sus imágenes, formularios, contenidos y navegación funcional.

## Cambios realizados

### Tienda

- Se incorporaron `hero-tienda.png`, `hero-carrito.png` y 11 imágenes de productos.
- Se creó un catálogo basado en datos, cuatro categorías y cinco filtros `md-filter-chip` incluyendo “Todos”.
- Se agregó detalle por parámetro `id`, precio CLP, stock y acción de carrito.

### Carrito único

- Se reemplazó el flujo público “Mi selección” por un icono de carrito con badge de unidades.
- Se creó la clave `tarot-carrito` y un servicio compartido para lectura, escritura, totales, cantidades y stock.
- Las experiencias pagadas y productos se agrupan visualmente, pero comparten subtotal y compra.
- Las selecciones antiguas pagadas se migran una vez; la experiencia gratuita se excluye.
- `mi-seleccion.html` redirige inmediatamente a `carrito.html`.

### Experiencias

- “Una carta” inicia directamente en su detalle y no entra al carrito.
- “Tres cartas” y “Sanar y soltar” se agregan al carrito único.
- Se mantuvo el catálogo, detalle por `id` y control de identificadores inexistentes.

### Checkout simulado

- El checkout informa de forma visible que no existe cobro real.
- Un carrito solo digital omite datos de entrega.
- Los productos permiten Retiro por `$0` o Despacho por `$3.990`.
- Despacho exige Región, Comuna y Dirección con datos chilenos simulados.
- La confirmación genera número local, almacena historial y resumen, vacía el carrito y muestra el pedido.

### Material Web y accesibilidad

- Se registraron botones, campos, filtros, iconos y diálogo Material reales.
- Los héroes mantienen texto HTML y fondos decorativos con contraste reforzado.
- Se añadieron foco visible, nombres accesibles, mensajes asociados y respeto de `prefers-reduced-motion`.
- Los botones Material con navegación incluyen respaldo `data-href` para no repetir la regresión detectada en V3.

### Corrección de robustez de formulario y carrito

- Los campos esenciales de contacto y dirección del checkout usan controles HTML nativos con apariencia Material 3.
- El envío se realiza mediante el evento `submit`, por lo que responde tanto al botón como a la tecla Enter.
- Nombre, correo, región, comuna y dirección mantienen validación accesible y mensajes en tiempo real.
- Los controles `+`, `−` y Quitar del carrito usan botones nativos con áreas estables de 42 a 44 píxeles.
- Se incorporaron estados visibles de `hover`, foco, pulsación y deshabilitado, con los signos centrados en ambos ejes.
- El checkout y el cambio de cantidades continúan operativos si Material Web no puede cargarse desde el CDN.

## Funcionalidad preservada

Biblioteca, Blog, Nosotros, Contacto, Registro, Ingreso, Administración, menú móvil, logo oficial y las 78 cartas continúan disponibles. No se incorporaron API, backend, JWT ni pasarela de pago.

## Verificación realizada

- 18 archivos JavaScript validados con `node --check`.
- 11 productos y 5 filtros Material comprobados.
- Experiencia gratuita y experiencias pagadas verificadas.
- Incremento sin duplicación, límite de stock y persistencia aprobados.
- Carrito mixto, subtotal, retiro y despacho aprobados.
- Número de pedido, historial local y vaciado del carrito aprobados.
- Enlace antiguo de Mi selección redirige correctamente.
- Contacto, Registro, Ingreso, Biblioteca, Blog y Administración revisados.
- 13 vistas en escritorio y móvil sin errores, 404, imágenes rotas ni desborde horizontal.
- Formulario, cantidades, centrado y estados de interacción verificados con Material Web disponible y bloqueado.
