# Informe de implementación — Versión 2.0

## Proyecto

**Tarot y Otras Artes — Ritual nocturno**

Esta versión rediseña el frontend del MVP con una identidad inspirada en Material Design 3, manteniendo HTML5 semántico, CSS propio, JavaScript puro y Bootstrap 5.3.8 por CDN. No se incorporaron API, backend, JWT, pagos ni persistencia distinta de `localStorage`.

## Objetivo alcanzado

El sitio dejó de presentarse como una maqueta clara y genérica. Ahora utiliza una experiencia nocturna coherente, con jerarquía tipográfica, superficies Material 3, cartas reales como protagonistas, estados interactivos y retroalimentación accesible.

## Cambios principales

### Identidad visual

- Paleta exacta de la especificación mediante tokens globales en `css/estilos.css`.
- Cinzel para marca y títulos; Lora para lectura e interfaz.
- Emblema ouróboro original en SVG, incluido en la marca y como favicon local.
- Separadores de tres estrellas de cuatro puntas; no se incorporó simbología lunar genérica.
- Escena fotográfica original para la portada, generada sin textos, controles ni símbolos de marca incrustados.
- Superficies nocturnas diferenciadas, contornos suaves y elevación moderada.
- Botones, chips, campos y tarjetas con formas y estados coherentes con Material 3.

### Experiencia de uso

- Navegación de escritorio estable: cada enlace mantiene el mismo ancho en todas las páginas.
- Menú móvil colapsable mediante Bootstrap.
- Portada inmersiva con navegación superpuesta, escenario ritual y El Loco como carta HTML independiente.
- Experiencias destacadas compactas y visibles desde el primer recorrido de la página Inicio.
- Tarjetas de experiencias, Biblioteca y Blog con imágenes reales del mazo.
- Formularios oscuros legibles con validación visible en tiempo real.
- Snackbar para confirmaciones no bloqueantes.
- Diálogo accesible antes de quitar una experiencia o cambiar estados administrativos.
- Regla `prefers-reduced-motion` para personas que solicitan menos movimiento.

### Funcionalidades preservadas

- Tres experiencias renderizadas desde `datos-experiencias.js`.
- Detalle mediante `detalle-experiencia.html?id=...` y manejo de ID inexistente.
- Selección persistida bajo la clave `seleccionExperiencias`.
- Prevención de duplicados, contador, total referencial y eliminación.
- Seis recursos de Biblioteca y filtros por categoría.
- Dos publicaciones del Blog y sus páginas de detalle.
- Validaciones de Registro, Login, Contacto y Administración.
- Simulación de publicación, revisión y creación de borradores.
- Las 78 cartas existentes, sin reemplazar ni repetir recursos por falta de imágenes.

## Archivos relevantes

- `css/estilos.css`: tokens, componentes, adaptación responsive y accesibilidad.
- `js/interfaz.js`: ouróboro, snackbar y diálogo reutilizable.
- `js/detalle-experiencia.js`: feedback al añadir una experiencia.
- `js/seleccion.js`: confirmación antes de eliminar y lectura segura de `localStorage`.
- `js/admin.js`: confirmaciones y feedback de las operaciones simuladas.
- `js/registro.js`, `js/login.js`, `js/contacto.js`: confirmación mediante snackbar.
- `imagenes/ouroboro.svg`: emblema original de marca.
- `imagenes/portada-ritual-nocturno-v2.png`: fondo panorámico original del hero, sin interfaz incrustada.

## Comentarios de código

Los comentarios se mantuvieron y ampliaron en español. Se documentan especialmente las decisiones de integración, accesibilidad, persistencia, validación, confirmación y reutilización de componentes. Se evitaron comentarios que solo repiten literalmente una instrucción obvia.

## Verificación realizada

- Las 13 páginas HTML revisadas en 1440 × 1000 px y 390 × 844 px.
- Primer viewport de Inicio revisado por separado en escritorio y móvil.
- Sin desbordamiento horizontal ni imágenes rotas.
- Ocho enlaces del menú con ancho uniforme de 108 px en escritorio.
- Cabecera global de 105 px en todas las páginas de escritorio.
- Sintaxis válida en los 11 archivos JavaScript.
- Consola sin errores locales.
- Flujos verificados: catálogo, detalle, duplicados, contador, diálogo de eliminación, filtros, formularios, Blog, Administración e ID inexistente.

## Ejecución

Abrir la carpeta en Visual Studio Code y ejecutar `index.html` con Live Server. Se necesita conexión a Internet para cargar Bootstrap y las fuentes de Google; el contenido, los scripts y las 78 imágenes permanecen locales.
