# Informe de implementación - Versión 3.0

## 1. Objetivo

Actualizar el frontend del MVP "Tarot y Otras Artes" con la especificación Material 3 "Ritual nocturno", incorporar las imágenes finales de héroe y restablecer de forma verificable tanto los formularios como las acciones de navegación de la versión funcional de referencia.

## 2. Alcance realizado

### Identidad visual

- Se incorporaron ocho imágenes de héroe: seis secciones públicas principales y dos flujos personales prioritarios.
- Se retiró la carta independiente de Inicio porque ya forma parte de `hero-inicio.png`.
- Se reemplazaron las referencias del símbolo anterior por `ouroboro-identidad-original.png`.
- Se mantuvo texto HTML real sobre las imágenes para preservar selección, semántica y accesibilidad.
- Se normalizaron alturas, anchos, espaciados y puntos de quiebre para evitar cambios de escala durante la navegación.

### Material Web oficial

- Se añadió el import map solicitado a los 13 documentos HTML.
- Se creó `js/material.js` y se registraron componentes Material mediante el módulo oficial.
- El diálogo de confirmación se enriqueció con `md-dialog` y conserva `window.confirm` como respaldo.
- Los enlaces, botones y filtros esenciales se implementaron con elementos HTML nativos estilizados con la identidad Material 3.
- Bootstrap quedó reservado para grilla, utilidades estructurales y navbar.
- Los formularios críticos mantienen controles HTML nativos con apariencia Material 3 para no depender de la carga de un componente remoto al enviar datos.

Durante la verificación se detectó que `esm.run` redirige cada subruta de Material Web a un paquete independiente de jsDelivr. Los imports individuales duplicaban el registro interno `md-focus-ring`. La solución estable fue importar una sola vez `@material/web/common.js` y tratar su carga como una mejora progresiva, nunca como requisito para navegar o ejecutar una acción.

### Corrección funcional de formularios

- Se comparó la versión 3.0 con `tarotyotrasartes - frontend.zip`, entregada como referencia funcional.
- Se determinó que la regresión se produjo al reemplazar controles HTML nativos por campos y botones de envío personalizados de Material Web.
- Se restauraron `input`, `textarea`, `select`, `label` y `button type="submit"` en Ingresar, Crear cuenta, Contacto y Administración.
- Se conservaron colores, tipografía, geometría, botones tipo píldora, héroes e imágenes de la versión 3.0.
- Se incorporaron atributos `required`, `minlength`, `maxlength`, `name` y `aria-describedby` donde correspondía.
- La validación en tiempo real vuelve a usar clases `is-valid` e `is-invalid`, anuncia `aria-invalid` y lleva el foco al primer campo erróneo.
- Cada envío correcto deja una alerta persistente y, cuando está disponible, también muestra el snackbar.
- `js/interfaz.js` usa `window.confirm` como respaldo si el diálogo Material no se registra dentro del tiempo esperado.

### Corrección funcional de acciones y navegación

- Se identificó que etiquetas personalizadas como `<md-filled-button href="...">` conservaban apariencia de botón mediante CSS, pero no eran enlaces HTML y no navegaban cuando Material Web no se registraba.
- Se reemplazaron por elementos `<a>` las acciones "Conocer experiencia", "Regresar a experiencias", "Explorar experiencias", accesos del Inicio y enlaces del Blog.
- Se reemplazaron por elementos `<button>` las acciones para agregar o quitar una experiencia, filtros de Biblioteca y cambios de estado de Administración.
- Se mantuvieron intactos los héroes, imágenes, colores, tipografía, geometría y botones tipo píldora de la versión 3.0.
- Se verificó el recorrido completo Experiencias, Detalle y Mi selección con Material Web disponible y con su CDN bloqueado.

### Funcionalidad conservada

- Catálogo y detalle por identificador.
- Mensaje para identificadores inexistentes.
- Selección persistente en `localStorage`.
- Prevención de experiencias duplicadas.
- Retiro con confirmación mediante `md-dialog` o confirmación nativa de respaldo.
- Contador de "Mi selección" visible solo cuando existen elementos.
- Filtros de Biblioteca mediante botones semánticos con estado `aria-pressed`.
- Blog y dos páginas de detalle.
- Video de Nosotros.
- Contacto, registro e ingreso con validación en tiempo real, envío por clic o Enter y mensajes persistentes.
- Administración simulada con cambios de estado y creación de borradores.
- Menú móvil Bootstrap y acceso administrativo ubicado solo en la zona inferior de Inicio.

## 3. Archivos principales modificados

### HTML

Se actualizaron todos los documentos HTML para incorporar import map, módulo Material, favicon oficial y controles Material cuando correspondía. Los cuatro formularios funcionales recuperaron controles nativos semánticos sin alterar su composición. Los héroes fotográficos se aplicaron exclusivamente en:

- `index.html`.
- `experiencias.html`.
- `biblioteca.html`.
- `blog.html`.
- `nosotros.html`.
- `contacto.html`.
- `mi-seleccion.html`.
- `login.html`.

Las páginas de detalle, las publicaciones, Registro y Administración mantienen cabeceras sin fotografía, según la especificación.

### CSS

`css/estilos.css` recibió:

- Tokens de personalización para componentes Material.
- Geometría compartida de héroes.
- Superposición sólida para contraste, sin gradientes decorativos.
- Reglas responsivas para escritorio, tableta y móvil.
- Estilos de respaldo mientras se registran los web components.
- Ajustes para el PNG oficial del ouróboro.

### JavaScript

- `js/material.js`: carga y confirmación de registro de componentes.
- `js/interfaz.js`: inserción del logo PNG, snackbar, diálogo Material y confirmación nativa de respaldo.
- `js/biblioteca.js`: filtrado y estado accesible `aria-pressed` de los botones de Biblioteca.
- `js/contacto.js`, `js/login.js`, `js/registro.js`: validación nativa en tiempo real y confirmación persistente.
- `js/admin.js`: botones semánticos dinámicos y formulario nativo para nuevos borradores.
- `js/experiencias.js`, `js/detalle-experiencia.js`, `js/seleccion.js`: enlaces y botones nativos que conservan la apariencia Material 3.

## 4. Verificación automatizada ejecutada

La versión fue servida localmente y revisada con Chrome mediante Playwright en `1440 x 1000` y `390 x 844`.

Resultados:

- 13 páginas revisadas en escritorio y móvil.
- 0 errores de consola.
- 0 recursos locales con respuesta 404.
- 0 imágenes rotas.
- 0 desbordes horizontales.
- 8 héroes con la imagen correcta.
- 5 páginas orientadas a tareas verificadas sin héroe fotográfico.
- 3 experiencias renderizadas.
- Persistencia y prevención de duplicados correctas.
- Diálogo `md-dialog` operativo y confirmación nativa verificada como respaldo.
- 2 recursos visibles al filtrar Biblioteca por "Guías".
- 4 errores detectados al enviar Contacto vacío.
- Contacto, registro e ingreso válidos confirmados mediante alerta persistente y snackbar.
- Ingreso verificado mediante la tecla Enter.
- Las acciones de Experiencias, Detalle, Mi selección, Biblioteca, Blog, Administración y los cuatro formularios principales se verificaron con Material Web bloqueado: todas conservaron su operación.
- 2 publicaciones de blog accesibles.
- Publicación y creación de borrador administrativo confirmadas.
- Menú móvil desplegable operativo.

El detalle de la ejecución quedó registrado en el entorno de trabajo como `capturas-version-3/resultado-verificacion.json`, acompañado por capturas de todas las páginas.

## 5. Resultado

El proyecto queda listo para abrir en Visual Studio Code y ejecutar con Live Server. La versión mantiene la identidad visual y las imágenes de la versión 3.0, recupera el comportamiento comprobado de los formularios y de todas las acciones principales, y utiliza Material Web sin convertirlo en una dependencia de la navegación o la lógica. No se incorporaron framework JavaScript, API ni backend.
