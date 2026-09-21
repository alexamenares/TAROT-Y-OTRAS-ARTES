# Tarot y Otras Artes - Frontend versión 3.0

## Descripción

Esta versión aplica el rediseño Material 3 con identidad visual "Ritual nocturno". El proyecto continúa siendo un MVP estático: utiliza HTML5 semántico, CSS propio, JavaScript puro y Bootstrap 5.3.8 para estructura y navegación. Los enlaces, botones, filtros y formularios críticos son controles HTML nativos con apariencia Material 3; Material Web se conserva como mejora progresiva para el diálogo de confirmación.

No existe conexión a API, backend, base de datos ni JWT en esta etapa. Los formularios y la administración son simulados, y la selección de experiencias se guarda en `localStorage`.

## Cómo ejecutar el proyecto

1. Abrir la carpeta completa en Visual Studio Code.
2. Instalar la extensión Live Server si todavía no está disponible.
3. Abrir `index.html` con la opción **Open with Live Server**.
4. Mantener conexión a Internet para cargar Bootstrap, Google Fonts y la mejora opcional de Material Web desde CDN.

Se recomienda Live Server porque reproduce el entorno usado durante las pruebas y evita restricciones de módulos ES. Las acciones esenciales siguen siendo enlaces y botones HTML reales, por lo que no dependen del registro de Material Web.

## Tecnologías

- HTML5 semántico.
- CSS propio con tokens de color y estilos responsivos.
- JavaScript puro.
- Bootstrap 5.3.8 mediante CDN, limitado a grilla, utilidades y menú responsivo.
- Material Web oficial mediante import map y `https://esm.run/@material/web/`, usado como mejora progresiva.
- Almacenamiento local del navegador para "Mi selección".

## Integración Material Web

Todos los HTML declaran el mismo import map y cargan `js/material.js` como módulo. `js/material.js` carga una sola vez el módulo oficial `@material/web/common.js`. El componente `md-dialog` enriquece las confirmaciones cuando el módulo está disponible; `window.confirm` actúa como respaldo cuando el CDN falla o la página se abre en un entorno que bloquea módulos remotos.

Los enlaces de navegación, botones de acción, filtros y formularios usan elementos nativos `a`, `button`, `label`, `input`, `textarea` y `select`. CSS les entrega la apariencia Material 3 del proyecto. Esta separación conserva el diseño y garantiza navegación, envío por clic o Enter, validación en tiempo real y operación aun cuando Material Web no esté disponible.

## Imágenes principales

Las imágenes de héroe son decorativas; los títulos, descripciones y acciones permanecen como HTML seleccionable y accesible.

| Página | Imagen |
| --- | --- |
| Inicio | `imagenes/hero-inicio.png` |
| Experiencias | `imagenes/hero-experiencias.png` |
| Biblioteca | `imagenes/hero-biblioteca.png` |
| Blog | `imagenes/hero-blog.png` |
| Nosotros | `imagenes/hero-nosotros.png` |
| Contacto | `imagenes/hero-contacto.png` |
| Mi selección | `imagenes/hero-mi-seleccion.png` |
| Ingresar | `imagenes/hero-ingresar.png` |

El símbolo de marca se obtiene exclusivamente desde `imagenes/ouroboro-identidad-original.png` y se inserta en cabecera y pie mediante `js/interfaz.js`.

## Funcionalidades disponibles

- Catálogo de tres experiencias generado con JavaScript.
- Detalle por parámetro `id` y manejo de identificadores inexistentes.
- Incorporación, prevención de duplicados y retiro de experiencias en `localStorage`.
- Confirmación de acciones mediante diálogo Material con respaldo nativo.
- Biblioteca pública con seis recursos y filtros semánticos de apariencia Material 3.
- Blog público y dos páginas de detalle.
- Página Nosotros con video de presentación.
- Contacto con validación en tiempo real, foco del primer error y envío simulado.
- Registro e ingreso simulados con validación, mensajes persistentes y envío con Enter.
- Panel administrativo simulado para cambiar estados y agregar borradores mediante controles nativos fiables.
- Menú responsivo estable, contador condicional de selección y acceso administrativo fuera del menú público.

## Estructura relevante

- `index.html`: inicio inmersivo y acceso administrativo inferior.
- `css/estilos.css`: identidad visual, componentes, héroes y puntos de quiebre.
- `js/material.js`: registro de Material Web.
- `js/interfaz.js`: marca, snackbar y diálogo compartido.
- `js/datos-experiencias.js`: datos simulados del catálogo.
- `js/navegacion.js`: contador de selección.
- `js/contacto.js`, `js/login.js`, `js/registro.js`: validaciones en tiempo real, foco de errores y confirmaciones persistentes.
- `js/admin.js`: administración simulada.
- `INFORME_IMPLEMENTACION_VERSION_3_0.md`: detalle técnico de la entrega.
- `PLAN_PRUEBAS_MANUALES_VERSION_3_0.md`: casos y datos para la defensa.

## Limitaciones conocidas

- Los envíos y sesiones no persisten en un servidor.
- La autenticación y los roles son demostrativos.
- El video de Nosotros y el acabado completo de los recursos CDN requieren conexión a Internet. Las funciones principales mantienen su lógica si Material Web no carga.
- Los precios y contenidos son datos de muestra para el MVP académico.
