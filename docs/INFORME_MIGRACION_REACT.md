# Informe de migración a React

## 1. Objetivo

Migrar el frontend versión 4.0 a React sin perder las funcionalidades verificadas, el contenido ni la identidad visual “Ritual nocturno”. La solución queda preparada para sustituir los datos simulados por microservicios en una etapa posterior.

## 2. Tecnologías

- React 19 y JavaScript.
- Vite 8 como servidor y compilador.
- React Router para navegación SPA.
- React Bootstrap y Bootstrap 5.3.8.
- CSS propio para personalización, contraste y responsividad.
- `sessionStorage` para persistencia temporal.

No se incorporaron TypeScript, Material UI, API, backend, JWT ni pagos reales.

## 3. Trabajo realizado

### Estructura React

- Se definieron rutas públicas, rutas dinámicas, ruta 404 y rutas protegidas.
- Se creó un `Layout` compartido para mantener encabezado y pie estables.
- Se separaron componentes en átomos, moléculas y organismos sin sobredimensionar la arquitectura.
- Se centralizaron los datos simulados en `src/data`.
- Se centralizaron carrito, sesión, pedidos y reservas en `src/services`.
- Se incorporaron contextos para carrito y sesión, evitando cadenas extensas de propiedades.

### Funcionalidad conservada y ampliada

- Experiencias: catálogo, detalles y activación o incorporación al carrito.
- Tienda: categorías, detalles, stock y productos físicos.
- Carrito: suma, resta, subtotal, eliminación con diálogo y persistencia.
- Checkout: datos de contacto, retiro o despacho, regiones, comunas, dirección y comprobante.
- Biblioteca: recursos únicos y filtros por categoría.
- Blog: listado y dos páginas de detalle.
- Nosotros: contenido institucional y video local.
- Contacto: validación controlada en tiempo real y envío simulado.
- Ingreso y registro: sesión simulada; el registro está vinculado exclusivamente al flujo de Ingresar.
- Agenda: protección por sesión, selección de atención, profesional, fecha y hora.
- Mis reservas: listado y cancelación confirmada.
- Administración: panel demostrativo ubicado fuera del menú público.

### Diseño y accesibilidad

- Se reutilizaron los héroes, cartas, productos, logotipo y video existentes.
- Se unificó la altura del encabezado y la escala tipográfica en todas las rutas.
- Se agregaron foco visible, mensajes asociados a campos y etiquetas accesibles.
- Se evitaron desbordes horizontales y se adaptaron tarjetas, formularios y carrito a móvil.
- Los botones de cantidad poseen zona de interacción estable, centrado y estados `hover`, `focus` y `disabled`.

## 4. Rutas principales

| Ruta | Propósito |
|---|---|
| `/` | Inicio |
| `/experiencias` y `/experiencias/:id` | Catálogo y detalle de experiencias |
| `/tienda` y `/tienda/:id` | Catálogo y detalle de productos |
| `/carrito` | Carrito unificado |
| `/finalizar-compra` | Checkout simulado |
| `/pedido-confirmado` | Comprobante temporal |
| `/biblioteca` | Biblioteca filtrable |
| `/blog` y `/blog/:slug` | Blog y artículos |
| `/nosotros` | Proyecto y video |
| `/contacto` | Formulario de contacto |
| `/ingresar` y `/registro` | Acceso y registro vinculado |
| `/agenda` | Agenda protegida |
| `/mis-reservas` | Reservas protegidas |
| `/administracion` | Panel interno simulado |

## 5. Persistencia y futura API

Las claves `tarot-react-carrito`, `tarot-react-usuario`, `tarot-react-pedidos`, `tarot-react-ultimo-pedido` y `tarot-react-reservas` están encapsuladas en servicios. Para integrar backend se pueden reemplazar esos servicios por llamadas HTTP sin reconstruir las páginas ni los componentes visuales.

## 6. Verificación ejecutada

- `npm ci`: instalación reproducible, 0 vulnerabilidades informadas.
- `npm run lint`: finalizado sin observaciones.
- `npm run build`: compilación exitosa; 376 módulos transformados.
- Prueba automatizada en Microsoft Edge, escritorio `1440 x 1000` y móvil `390 x 844`.
- 31 comprobaciones funcionales y visuales aprobadas.
- Sin errores JavaScript de consola.
- Sin solicitudes locales fallidas ni imágenes rotas.
- Sin desborde horizontal en las rutas públicas comprobadas.
- Altura del encabezado estable en ocho rutas: `87,39 px`.

## 7. Alcance pendiente

La autenticación, disponibilidad, pagos, mensajes y pedidos continúan siendo demostraciones locales. Su persistencia real, autorización y seguridad deberán implementarse cuando se conecte el frontend con el backend.

