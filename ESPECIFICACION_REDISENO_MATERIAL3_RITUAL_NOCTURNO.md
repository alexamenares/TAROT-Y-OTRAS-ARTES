# Especificación de rediseño UX/UI — Tarot y Otras Artes

## 1. Propósito de este documento

Este archivo es el traspaso de decisiones para continuar el rediseño del frontend del MVP **Tarot y Otras Artes**. El objetivo es elevar la experiencia visual y de interacción, porque la primera revisión académica consideró que el frontend funcionaba, pero se percibía demasiado básico.

La meta no es reemplazar el proyecto ni convertirlo en una aplicación con otro framework. Se debe conservar su funcionamiento y modernizarlo con una identidad visual propia, inspirada en **Material Design 3 (Material 3)** y usando componentes web oficiales cuando aporten valor.

## 2. Fuente de trabajo y alcance

Trabajar sobre el ZIP/folder final del frontend compartido por el usuario:

```text
tarotyotrasartes - frontend/
```

Estructura relevante actual:

```text
tarotyotrasartes - frontend/
├── index.html
├── experiencias.html
├── detalle-experiencia.html
├── mi-seleccion.html
├── biblioteca.html
├── blog.html
├── blog-tirada-diaria.html
├── blog-preparar-cartas.html
├── nosotros.html
├── contacto.html
├── registro.html
├── login.html
├── admin.html
├── css/estilos.css
├── js/
│   ├── datos-experiencias.js
│   ├── experiencias.js
│   ├── detalle-experiencia.js
│   ├── seleccion.js
│   ├── navegacion.js
│   ├── registro.js
│   ├── login.js
│   ├── biblioteca.js
│   ├── contacto.js
│   └── admin.js
└── imagenes/
    └── 78 imágenes de cartas de Tarot
```

### Dentro del alcance

- Rediseño UX/UI del frontend con identidad visual consistente.
- Integración gradual de Material Web / principios Material 3.
- Mejoras visuales e interacciones de la página Inicio y, después, del resto de pantallas.
- Componentes de feedback como snackbar y diálogos de confirmación, sin alterar reglas de negocio.
- Accesibilidad visual, foco de teclado y soporte de reducción de movimiento.

### Fuera del alcance

- No modificar backend, base de datos, microservicios, Oracle ni API Gateway.
- No implementar JWT, autenticación real, roles reales ni consumo de API en esta etapa.
- No reemplazar los datos simulados existentes.
- No agregar pagos, stock físico, despacho ni compras reales.
- No eliminar funcionalidades existentes solo por el rediseño.

## 3. Principios de implementación

1. **Preservar antes de mejorar.** Antes de editar, inspeccionar HTML, CSS y JavaScript existentes. Mantener rutas, enlaces, `id`, `data-*`, nombres de funciones y flujos que usan los scripts actuales, salvo que se actualice cuidadosamente la referencia relacionada.
2. **No mezclar estilos sin regla.** Bootstrap organiza el layout; Material mejora componentes interactivos; el CSS propio expresa la marca Tarot y Otras Artes.
3. **Iterar por pantalla.** Implementar y probar una sección o pantalla antes de aplicar el mismo patrón a las demás.
4. **Código explicable.** Mantener comentarios relevantes en español. No comentar obviedades, pero sí decisiones de integración, accesibilidad y comportamiento.
5. **Mantener el sitio en español.** Todos los nuevos textos, mensajes, botones, `aria-label`, ayudas y validaciones deben estar en español.

## 4. Regla Bootstrap + Material + CSS propio

| Herramienta | Responsabilidad | Ejemplos |
|---|---|---|
| Bootstrap | Estructura y adaptación | `container`, `row`, `col-*`, navbar colapsable y utilidades de layout. |
| Material Web / Material 3 | Interacciones visibles | Botones, campos, chips, snackbar y diálogo. |
| CSS propio | Identidad de marca | Colores, tipografías, tarjetas, ouróboro, imágenes, superficies, animaciones y detalles. |

### Regla de un único dueño visual

No aplicar la apariencia de Bootstrap y la de Material al mismo componente. Ejemplo: un botón Material no debe llevar también la clase visual `btn btn-primary` o `btn-experiencia` si esas reglas entran en conflicto.

Si un componente Material Web no puede mantener de forma accesible una navegación o un comportamiento actual, conservar el elemento HTML semántico existente y estilizarlo con CSS basado en tokens Material 3. No romper enlaces ni formularios por forzar un componente.

## 5. Identidad visual aprobada

### Nombre de la dirección visual

> **Ritual nocturno**

Debe transmitir introspección, elegancia, misterio amable y cercanía. No debe ser terror, ocultismo agresivo, ni una tienda genérica. Se permiten velas, textura de papel, cristal, cartas, libros y luz cálida con moderación; no sobrecargar cada bloque.

### Decisión crítica sobre simbología

- **Símbolo de marca:** usar un **ouróboro** (serpiente que se muerde la cola) junto a la marca `Tarot y Otras Artes` o como emblema visual. Usar una versión original en SVG/incrustada, sin depender de una imagen externa ni copiar arte protegido.
- **No usar la luna como símbolo genérico de marca.** No usar crecientes, lunas llenas, fases lunares ni decoración lunar en menú, footer, iconos, botones o fondos.
- La luna puede aparecer solamente cuando sea parte necesaria de una carta de Tarot —por ejemplo, el arcano mayor XVIII— o de un producto futuro explícitamente ligado a esa simbología.
- Para separadores decorativos usar **tres estrellas de cuatro puntas** y líneas doradas finas, no fases lunares.

### Referencia visual aprobada

La dirección deseada es una portada nocturna de alto contraste: fondo violeta profundo, texto marfil, acentos dorados, lavanda para acciones principales, carta El Loco como protagonista y tarjetas inmersivas. Debe mantener suficiente aire visual y una jerarquía clara; no se considera excesivamente recargada si los elementos se usan con propósito.

## 6. Tipografías y soporte en español

### Familias aprobadas

| Uso | Fuente | Aplicación |
|---|---|---|
| Marca y títulos | `Cinzel` | Marca, `h1`, títulos de secciones, nombre de experiencia, títulos de cartas. |
| Lectura e interfaz | `Lora` | Párrafos, menú, botones, etiquetas, formularios, precios, ayudas, alertas y tablas. |

Cargar ambas desde Google Fonts con pesos necesarios y `display=swap`. Usar una URL equivalente a:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap"
  rel="stylesheet"
/>
```

### Verificación obligatoria de caracteres

Comprobar visualmente en navegador esta cadena con ambas fuentes:

```text
¿Qué energía guía tu corazón hoy? Niño, año, conexión, intuición, pingüino, ¡bienvenido!
```

No usar Cinzel para párrafos largos. Lora debe conservar tamaño y altura de línea suficientes para lectura; no sacrificar legibilidad por estética.

## 7. Paleta exacta y roles Material 3

La paleta se define por **rol**, no por uso casual. No sustituir valores arbitrariamente.

| Rol | Hexadecimal | Uso |
|---|---:|---|
| Fondo principal | `#151220` | Fondo global nocturno. |
| Superficie | `#211B2F` | Tarjetas y paneles normales. |
| Superficie elevada | `#2B243B` | Hover, panel destacado o diálogo. |
| Contenedor primario | `#493466` | Acciones tonales o contenedores de énfasis. |
| Lavanda principal | `#CDB8FF` | Acción principal, chip seleccionado y foco destacado. |
| Dorado ritual | `#E4C580` | Ouróboro, etiquetas, detalles y borde de acción secundaria. |
| Marfil | `#F0E8F0` | Texto principal sobre fondo oscuro. |
| Lavanda grisácea | `#D1C5D6` | Texto secundario. |
| Contorno | `#9A8E9F` | Bordes, separadores y foco secundario. |
| Éxito salvia | `#A8D9BA` | Confirmaciones positivas. |
| Error rosado | `#FFB4AB` | Errores y alertas. |

Declarar tokens globales en `:root`, incluyendo nombres Material y nombres propios si son necesarios:

```css
:root {
  --md-sys-color-primary: #cdb8ff;
  --md-sys-color-on-primary: #251632;
  --md-sys-color-primary-container: #493466;
  --md-sys-color-on-primary-container: #f0e8f0;
  --md-sys-color-secondary: #e4c580;
  --md-sys-color-on-secondary: #251632;
  --md-sys-color-surface: #151220;
  --md-sys-color-surface-container: #211b2f;
  --md-sys-color-surface-container-high: #2b243b;
  --md-sys-color-on-surface: #f0e8f0;
  --md-sys-color-on-surface-variant: #d1c5d6;
  --md-sys-color-outline: #9a8e9f;
  --md-sys-color-error: #ffb4ab;
  --color-exito: #a8d9ba;
}
```

No usar gradientes visibles como recurso principal. La profundidad se obtiene por capas de superficie, contornos sutiles y luz/contraste controlados.

## 8. Formas, espaciado y profundidad

### Formas

| Elemento | Decisión |
|---|---|
| Tarjetas principales | Esquinas de `24px` a `28px`. |
| Botones de acción principal | Forma píldora (`999px`). |
| Campos de formulario | Esquinas de `12px` a `16px`. |
| Chips de filtros | Forma píldora (`999px`). |
| Diálogos | Esquinas grandes, coherentes con tarjetas (`24px` aprox.). |

### Escala de espaciado

```text
8px   separación pequeña
16px  separación normal
24px  relleno interno de tarjeta
32px  separación entre bloques relacionados
48px  separación grande
64px  distancia entre secciones
96px  aire especial para hero/portada
```

Usar esta escala en lugar de valores aislados. En escritorio, la portada debe tener aire amplio; en pantallas pequeñas, disminuir el espaciado sin eliminar la jerarquía.

### Profundidad

- Fondo base: `#151220`.
- Superficie normal: `#211B2F`, con contorno lavanda discreto.
- Superficie elevada: `#2B243B`; se utiliza en hover, panel destacado o diálogo.
- Evitar sombras negras pesadas. En tema oscuro, preferir cambio de superficie + borde suave + sombra moderada.
- Solo debe elevarse lo interactivo o prioritario.

## 9. Estados e interacción

Todos los controles interactivos deben contar con estado base, `hover`, `focus-visible`, activo/seleccionado, `disabled` cuando aplique y respuesta de teclado.

| Elemento | Estado esperado |
|---|---|
| Tarjeta de experiencia | En hover: elevarse levemente, borde lavanda más visible, transición suave. |
| Botón principal | Lavanda; hover con aumento leve de intensidad; texto siempre legible. |
| Botón secundario | Transparente, borde dorado; hover con superficie tonal sutil. |
| Chip | No seleccionado con contorno; seleccionado con lavanda llena. |
| Campo de formulario | Borde definido y etiqueta clara; foco visible; error rosado; éxito salvia. |
| Navegación | Enlace actual reconocible; foco de teclado visible. |

Usar transiciones de aproximadamente `150ms` a `250ms`. Agregar una regla `prefers-reduced-motion: reduce` para disminuir o eliminar desplazamientos/animaciones para quien lo solicite.

## 10. Componentes Material aprobados

Usar Material Web oficial o un equivalente semántico estilizado con tokens Material, según compatibilidad con las páginas actuales.

| Componente | Uso en el MVP |
|---|---|
| Botón lleno | Acción más importante de cada contexto: explorar, añadir, ingresar, enviar. |
| Botón de contorno | Volver, conocer el proyecto, cancelar u otra acción secundaria. |
| Botón de texto | Acciones menores y navegación secundaria. |
| Campo de texto | Registro, login, contacto y administración. |
| Chip de filtro | Biblioteca y futuros filtros del catálogo. |
| Snackbar | Confirmación no bloqueante: añadir a selección, formulario enviado o borrador creado. |
| Diálogo | Confirmar la eliminación de una experiencia y acciones administrativas relevantes. |

### No incorporar por ahora

- Buscador, selector de fechas, pagos, stock, despacho o calendario.
- Menú Material: conservar la navbar responsive de Bootstrap.
- Íconos o animaciones decorativas sin significado.

## 11. Mapa de aplicación por pantalla

### Fase 1 — Fundaciones globales

1. Cargar Google Fonts Cinzel y Lora en todas las páginas.
2. Definir tokens de color, tipografía, forma, espaciado y elevación en `css/estilos.css`.
3. Preparar carga global de Material Web por CDN/import map y módulo, si se usa; evitar duplicar el código en cada página. Una opción es `js/material.js` con importación de los componentes necesarios.
4. Conservar Bootstrap para layout y navbar.
5. Añadir ouróboro SVG original en marca y separadores de tres estrellas de cuatro puntas cuando corresponda.

### Fase 2 — Inicio (`index.html`)

- Rediseñar primero la portada sin modificar destinos de enlaces.
- Hero con jerarquía clara: etiqueta, título Cinzel, texto Lora, acción principal y secundaria.
- Carta `El Loco` como protagonista en una superficie inmersiva; utilizar imagen real existente.
- Rehacer tarjetas de experiencias destacadas con superficie oscura, bordes suaves y estado hover.
- No usar ilustraciones generadas como sustituto de las imágenes reales del proyecto.

### Fase 3 — Experiencias y selección

- `experiencias.html`: aplicar tarjetas rediseñadas preservando render dinámico desde `datos-experiencias.js` y `experiencias.js`.
- `detalle-experiencia.html`: mejorar jerarquía e implementar botón de adición con snackbar. Preservar parámetro `id` y manejo de identificador inexistente.
- `mi-seleccion.html`: tarjetas coherentes, total legible y diálogo de confirmación antes de quitar una experiencia.
- Conservar la clave de persistencia `seleccionExperiencias` y el contador administrado por `navegacion.js`.

### Fase 4 — Formularios

- `registro.html`, `login.html`, `contacto.html` y formulario de `admin.html`.
- Mejorar campo, etiqueta, ayuda, error y éxito visualmente.
- Conservar los `id` de los campos y los contenedores de mensajes requeridos por sus scripts.
- Preservar validación en tiempo real y los mensajes personalizados en español.
- Reemplazar confirmaciones visuales invasivas por snackbar o alertas coherentes, sin eliminar información para lectores de pantalla.

### Fase 5 — Contenido y Administración

- `biblioteca.html`: aplicar chips de filtro, manteniendo `data-filtro-biblioteca`, `data-categoria-recurso` y la lógica de `biblioteca.js`.
- `blog*.html`: mejorar lectura editorial, tarjetas y llamados a leer, sin cambiar rutas.
- `nosotros.html`: aplicar el sistema sin convertir la página en una portada recargada.
- `admin.html`: superficies, tabla legible, chips/badges de estado y diálogo para acciones de cambio de estado si corresponde; conservar simulación actual.

## 12. Funcionalidades que deben conservarse

- Navegación y enlaces existentes; no crear enlaces rotos ni usar `href="#"` como sustituto.
- Catálogo dinámico de tres experiencias desde `datos-experiencias.js`.
- Detalle por `detalle-experiencia.html?id=...` y mensaje controlado si el ID no existe.
- Mi selección en `localStorage`, evitación de duplicados, total referencial y eliminación.
- Contador de Mi selección en el menú mediante `navegacion.js`.
- Filtros de Biblioteca.
- Dos publicaciones del Blog y sus páginas de detalle.
- Validación en tiempo real de Registro, Login, Contacto y Admin.
- Respuestas simuladas de formularios y operaciones administrativas; no introducir API todavía.
- Las 78 imágenes de cartas y rutas existentes.

## 13. Accesibilidad y calidad

- Mantener HTML semántico: `header`, `nav`, `main`, `section`, `article`, `footer`, `label`, `button` y títulos jerárquicos.
- No eliminar `alt`, `aria-label`, `role="status"` ni atributos que faciliten la lectura asistida.
- Comprobar contraste alto entre marfil/lavanda y superficies oscuras.
- Agregar `:focus-visible` distinguible, idealmente dorado ritual o lavanda con contraste suficiente.
- No comunicar errores solamente con color; conservar texto claro de error.
- Verificar que botones, chips y diálogos se puedan usar con teclado.
- Agregar fallback tipográfico razonable en CSS; no depender de la descarga de Google Fonts para que el contenido sea legible.

## 14. Pruebas obligatorias después de cada fase

### Visuales

- Revisar Inicio, Experiencias, Detalle, Mi selección, Biblioteca, Blog, Nosotros, Contacto, Registro, Login y Admin.
- Comprobar que no hay texto claro sobre fondo claro, ni texto oscuro sobre superficie oscura.
- Comprobar que ninguna superficie se vea plana accidentalmente ni tenga sombras excesivas.
- Verificar que no exista luna/fase lunar en la identidad genérica.
- Revisar la navegación en ancho de escritorio y en ancho reducido.

### Funcionales

- Abrir todos los enlaces principales.
- Añadir una experiencia, intentar duplicarla, revisar contador, quitarla y comprobar estado vacío.
- Abrir un detalle válido y `detalle-experiencia.html?id=999`.
- Probar filtros de Biblioteca.
- Probar datos inválidos y válidos en Registro, Login, Contacto y Admin.
- Publicar/enviar a revisión/agregar borrador en la administración simulada.
- Comprobar consola del navegador sin errores JavaScript.

### Verificación técnica

- Ejecutar el sitio con Live Server.
- Revisar rutas a CSS, JS e imágenes.
- Ejecutar comprobación de sintaxis de los archivos JavaScript modificados cuando sea posible.
- No introducir dependencias de compilación obligatorias si el proyecto seguirá abriéndose como sitio estático en VS Code.

## 15. Resultado esperado

Al terminar, el sitio debe sentirse como un producto coherente y contemporáneo: una experiencia nocturna de Tarot, cálida y legible, con las cartas como protagonistas. Debe conservar la simplicidad técnica adecuada para el curso, pero mostrar una mejora notable de jerarquía, superficies, interacción y calidad visual.

La mejora debe ser evidente en Inicio y reutilizable en todas las pantallas, sin comprometer los flujos que ya funcionan en el MVP.

## 16. Referencias oficiales

- [Material Design 3](https://m3.material.io/)
- [Material Web Components](https://material-web.dev/about/intro/)
- [Inicio rápido de Material Web](https://material-web.dev/about/quick-start/)
- [Theming de Material Web](https://material-web.dev/theming/material-theming/)
- [Botones Material 3](https://m3.material.io/components/buttons)
- [Campos de texto Material 3](https://m3.material.io/components/text-fields)
- [Chips Material 3](https://m3.material.io/components/chips)
- [Snackbar Material 3](https://m3.material.io/components/snackbar)
- [Diálogos Material 3](https://m3.material.io/components/dialogs)
