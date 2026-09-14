# Informe y documentación del MVP Frontend

## Proyecto

**Nombre:** Tarot y Otras Artes  
**Tipo:** MVP frontend estático para asignatura Full Stack  
**Estudiante:** Esteban Parada  
**Fecha de actualización:** 07-09-2026  

Este informe documenta el trabajo realizado sobre el proyecto frontend `tarot-variables-constantes-frontend`, respetando la especificación entregada en `CONTEXTO_PARA_CODEX_MVP_FRONTEND.md`.

---

## 1. Objetivo del trabajo

El objetivo fue completar el MVP frontend pendiente sin modificar el backend ni integrar todavía API, Oracle, JWT o microservicios.

El proyecto mantiene el concepto definido como **Tienda de experiencias y recursos espirituales**, donde:

- Un producto equivale a una experiencia, lectura, meditación, guía o recurso.
- El carro se representa como **Mi selección**.
- Los precios son gratuitos o referenciales simulados.
- No existe pago, despacho ni stock físico.

---

## 2. Tecnologías utilizadas

Se mantuvieron las reglas técnicas solicitadas:

- HTML5 semántico.
- CSS propio en `css/estilos.css`.
- JavaScript puro.
- Bootstrap 5.3.8 desde CDN.
- Datos simulados en frontend.
- Sin React, Angular, Vue ni herramientas de compilación.
- Sin llamadas a backend.
- Sin uso de JWT.

Todas las páginas mantienen la ruta:

```html
<link rel="stylesheet" href="css/estilos.css" />
```

Y cargan Bootstrap 5.3.8 desde CDN.

---

## 3. Funcionalidades que se conservaron

Se conservaron las funcionalidades ya verificadas antes de esta etapa:

- Página de inicio con portada, carta destacada y experiencias destacadas.
- Catálogo dinámico de experiencias desde `js/datos-experiencias.js`.
- Página de detalle por URL usando `detalle-experiencia.html?id=...`.
- Manejo de experiencia no encontrada.
- Agregar experiencias a **Mi selección** usando `localStorage`.
- Clave de almacenamiento conservada: `seleccionExperiencias`.
- Evitar experiencias duplicadas.
- Mostrar, contar, sumar y quitar experiencias desde **Mi selección**.
- Mostrar avisos no bloqueantes al agregar o repetir una experiencia en el detalle.
- Registro simulado con validación en tiempo real.
- Login simulado con validación en tiempo real.
- Contador visible de **Mi selección** en la navegación, sincronizado con `localStorage`.

---

## 4. Nuevas páginas creadas

### 4.1 Biblioteca pública

Archivo creado:

```text
biblioteca.html
```

Script creado:

```text
js/biblioteca.js
```

Incluye:

- Recursos simulados de aprendizaje, guías e historia del Tarot.
- Tarjetas con textos descriptivos.
- Imágenes con atributos `alt`.
- Rutas de imagen únicas por recurso para evitar cartas repetidas en la vista pública.
- Marcadores visuales neutrales para recursos cuyas cartas todavía no existan en la carpeta `imagenes`.
- Filtros por categoría:
  - Todos.
  - Aprendizaje.
  - Guías.
  - Historia.
- Mensaje dinámico que informa cuántos recursos se están mostrando.

La biblioteca no consulta backend. El filtrado se realiza mostrando u ocultando elementos ya presentes en el HTML.

En la carpeta real del proyecto se verificó una baraja amplia de imágenes, desde `00-el-loco.png` hasta `77-rey-de-oros.png`. Para no repetir cartas, cada recurso de Biblioteca quedó asociado a una ruta única (`00-el-loco.png`, `27-seis-de-bastos.png`, `52-tres-de-espadas.png`, `14-la-templanza.png`, `01-el-mago.png` y `21-el-mundo.png`). El marcador `Carta pendiente` queda solo como respaldo si una copia futura del proyecto no tuviera alguna imagen.

---

### 4.2 Blog público

Archivo creado:

```text
blog.html
```

Incluye dos publicaciones simuladas:

- `Cómo iniciar una tirada diaria sin complicarte`.
- `Rituales simples para preparar tus cartas`.

Cada publicación tiene una página de detalle independiente, cumpliendo el requisito académico de dos páginas de detalle de blog.

---

### 4.3 Detalles del blog

Archivos creados:

```text
blog-tirada-diaria.html
blog-preparar-cartas.html
```

Cada detalle incluye:

- Encabezado semántico.
- Artículo con contenido editorial.
- Imagen con `alt` descriptivo.
- Bloque destacado.
- Enlaces de regreso al blog o hacia otras áreas del sitio.

---

### 4.4 Nosotros

Archivo creado:

```text
nosotros.html
```

Incluye:

- Propósito del proyecto.
- Explicación del alcance académico del MVP.
- Lista de características del enfoque actual.
- Video educativo integrado con etiqueta HTML5 `video`.

El video se integró como recurso externo liviano, evitando crear archivos pesados dentro del proyecto y corrigiendo el problema de configuración detectado en el reproductor embebido anterior. La fuente indicada es:

```text
https://commons.wikimedia.org/wiki/File:Vector_graphics_Tarot_reader.webm
```

---

### 4.5 Contacto

Archivo creado:

```text
contacto.html
```

Script creado:

```text
js/contacto.js
```

Incluye formulario con:

- Nombre completo.
- Correo electrónico.
- Asunto.
- Mensaje.

Validaciones implementadas:

- Nombre obligatorio, máximo 120 caracteres.
- Correo con formato válido, máximo 254 caracteres.
- Asunto obligatorio, máximo 80 caracteres.
- Mensaje entre 10 y 500 caracteres.

El envío es simulado. Si los datos son válidos, se muestra mensaje de éxito y se limpian los campos.

---

### 4.6 Administración simulada

Archivo creado:

```text
admin.html
```

Script creado:

```text
js/admin.js
```

Incluye:

- Dashboard con contadores simulados.
- Tabla administrativa con experiencias, recursos y publicaciones.
- Estados visuales:
  - Disponible.
  - Publicado.
  - En revisión.
  - Borrador.
- Botones para publicar o enviar a revisión de forma simulada.
- Formulario para agregar un nuevo borrador simulado.

La vista administrativa no requiere login real, roles, backend ni JWT en esta etapa.

---

## 5. Archivos existentes actualizados

Se actualizaron páginas existentes para normalizar navegación, footer, contraste y semántica:

```text
index.html
experiencias.html
detalle-experiencia.html
mi-seleccion.html
registro.html
login.html
css/estilos.css
js/detalle-experiencia.js
js/experiencias.js
js/registro.js
js/seleccion.js
```

Cambios principales:

- Reemplazo de enlaces pendientes `href="#"` por páginas reales.
- Menú común con:
  - Inicio.
  - Experiencias.
  - Biblioteca.
  - Blog.
  - Nosotros.
  - Contacto.
  - Mi selección con icono y contador.
  - Ingresar.
- Footer común con enlaces funcionales.
- Acceso a `admin.html` desplazado a una sección inferior de Inicio llamada **Administración del sitio**, para no mezclarlo con la navegación pública principal.
- Eliminación de `Crear cuenta` desde el menú principal. La creación de cuenta queda disponible solo desde la pantalla `Ingresar`, mediante el enlace `Crea tu cuenta`.
- **Mi selección** queda como enlace normal cuando está vacía y solo muestra icono, contador y marco cuando existen experiencias guardadas.
- Normalización visual del layout mediante variables CSS para ancho de contenido, altura de menú y altura de cabeceras internas.
- Reserva estable del espacio de scrollbar para evitar desplazamientos laterales cuando una página tiene más contenido vertical que otra.
- Normalización final del menú principal: todos los enlaces ocupan la misma celda fija, incluido **Mi selección**, y el menú pasa a modo colapsado antes de que los elementos se compriman visualmente.
- Mejora de contraste en fondos claros y oscuros.
- Mejora de jerarquía visual para `Ingresar`, `Mi selección` y estado activo del menú.
- Homologación de tarjetas de Biblioteca con imagen, título, bajada y texto.
- Ajuste de imágenes de tarjetas para evitar recortes agresivos.
- Reemplazo de verbos visuales como `Ver` o `Leer` por acciones más accesibles como `Conocer`, `Abrir` e `Ir a`.
- Incorporación de enlace `¿Olvidaste tu contraseña?` en Login.
- Incorporación de checkbox de aceptación de tratamiento de datos en Registro.
- Consolidación del CSS repetido.
- Base responsive usando Bootstrap y media queries propias.
- Conservación de comentarios útiles en español.

---

## 6. Estructura final del proyecto

```text
tarot-variables-constantes-frontend/
├── INFORME_Y_DOCUMENTACION_MVP_FRONTEND.md
├── admin.html
├── biblioteca.html
├── blog.html
├── blog-preparar-cartas.html
├── blog-tirada-diaria.html
├── contacto.html
├── detalle-experiencia.html
├── experiencias.html
├── index.html
├── PLAN_PRUEBAS_MANUALES_MVP_FRONTEND.md
├── login.html
├── mi-seleccion.html
├── nosotros.html
├── registro.html
├── css/
│   └── estilos.css
├── imagenes/
│   ├── 00-el-loco.png
│   ├── 27-seis-de-bastos.png
│   └── 52-tres-de-espadas.png
└── js/
    ├── admin.js
    ├── biblioteca.js
    ├── contacto.js
    ├── datos-experiencias.js
    ├── detalle-experiencia.js
    ├── experiencias.js
    ├── login.js
    ├── navegacion.js
    ├── registro.js
    └── seleccion.js
```

Nota: el nombre correcto del archivo de informe es:

```text
INFORME_Y_DOCUMENTACION_MVP_FRONTEND.md
```

---

## 7. Mapa de navegación

Páginas públicas:

- `index.html` → Inicio.
- `experiencias.html` → Catálogo de experiencias.
- `detalle-experiencia.html?id=1` → Detalle de Una carta.
- `detalle-experiencia.html?id=2` → Detalle de Tres cartas.
- `detalle-experiencia.html?id=3` → Detalle de Sanar y soltar.
- `mi-seleccion.html` → Experiencias guardadas en el navegador.
- `biblioteca.html` → Recursos públicos.
- `blog.html` → Listado de publicaciones.
- `blog-tirada-diaria.html` → Detalle de publicación 1.
- `blog-preparar-cartas.html` → Detalle de publicación 2.
- `nosotros.html` → Propósito y video.
- `contacto.html` → Formulario de contacto.

Páginas simuladas:

- `registro.html` → Registro simulado, accesible desde `login.html`.
- `login.html` → Login simulado.
- `admin.html` → Panel administrativo simulado, disponible desde la sección inferior de administración en Inicio.

---

## 8. Comportamiento de JavaScript

### Experiencias

Los datos se encuentran en:

```text
js/datos-experiencias.js
```

El catálogo se genera desde:

```text
js/experiencias.js
```

El detalle se genera desde:

```text
js/detalle-experiencia.js
```

La selección se guarda en `localStorage` con la clave:

```text
seleccionExperiencias
```

El contador del menú se actualiza desde:

```text
js/navegacion.js
```

Este script lee `seleccionExperiencias`, muestra la cantidad de experiencias guardadas junto al icono de **Mi selección** solo cuando la cantidad es mayor que cero y se mantiene tolerante a errores si el navegador bloquea `localStorage`.

---

### Formularios

Los formularios usan `novalidate` para mostrar mensajes propios y no depender de los mensajes automáticos del navegador.

Scripts:

```text
js/registro.js
js/login.js
js/contacto.js
```

Todos validan en tiempo real con eventos `input` y validan nuevamente al enviar.

En Registro se agregó además la validación del checkbox de aceptación de tratamiento de datos, coherente con el alcance simulado del MVP.

---

### Administración

El panel administrativo funciona con:

```text
js/admin.js
```

Las acciones son solo visuales:

- Publicar.
- Enviar a revisión.
- Crear borrador.

No se envían datos a ningún servidor.

---

## 9. Verificación realizada

Se levantó un servidor local estático para probar el sitio en navegador:

```text
http://127.0.0.1:4174
```

Pruebas realizadas:

- Carga visual de la portada.
- Carga de las 13 páginas HTML.
- Verificación de referencias locales a CSS, JS e imágenes.
- Confirmación de que no quedaron enlaces principales con `href="#"`.
- Confirmación de Bootstrap 5.3.8 en todas las páginas.
- Revisión de imágenes rotas.
- Revisión programática de contraste básico.
- Revisión de overflow horizontal en viewport angosto.
- Validación de sintaxis JavaScript con `node --check`.
- Prueba de agregar experiencia a **Mi selección**.
- Prueba de evitar duplicado en selección.
- Prueba de quitar experiencia y mostrar estado vacío.
- Prueba de filtros de Biblioteca.
- Verificación de rutas únicas de imagen en Biblioteca para evitar cartas repetidas.
- Prueba de errores y éxito en Registro.
- Prueba de errores y éxito en Login.
- Verificación de que Registro solo se ofrece desde Login y no desde el menú principal.
- Prueba de errores y éxito en Contacto.
- Prueba de publicar contenido en Admin.
- Prueba de agregar borrador simulado en Admin.
- Verificación de que Admin no aparezca en el menú principal ni en el footer público.
- Verificación de que Admin solo sea accesible desde la sección inferior de Inicio.
- Verificación de contador visual de **Mi selección**.
- Verificación de que **Mi selección** no aparezca enmarcada cuando está vacía.
- Verificación de etiquetas accesibles en botones y enlaces principales.
- Verificación de tarjetas consistentes en Biblioteca.
- Verificación de video HTML5 en Nosotros sin `iframe`.
- Verificación de avisos inline en detalle de experiencia.
- Verificación responsive en viewport móvil de 390 px y escritorio de 1366 px.
- Verificación de consistencia visual entre secciones: menú con la misma altura, contenedor común y bloque superior estable desde Inicio hasta las páginas internas.
- Verificación específica de los comentarios recibidos por pantallazos: Admin fuera de navegación pública y **Mi selección** sin marco al estar vacía.
- Verificación específica de escritorio en viewport de 1440 px: los 8 enlaces del menú miden 112 px de ancho y 40.8 px de alto, incluyendo **Mi selección**.
- Revisión de errores de consola durante pruebas funcionales.

Resultado:

```text
Sin referencias locales rotas.
Sin href="#" pendiente.
Sin errores de sintaxis JavaScript.
Sin errores de consola en las pruebas funcionales.
Sin problemas de contraste detectados en la revisión programática.
Sin overflow horizontal detectado en viewport angosto.
Sin etiquetas obsoletas de acción visual en botones principales.
Sin errores de consola en la prueba funcional final.
```

---

## 10. Cómo abrir el proyecto en Visual Studio Code

1. Descomprimir el archivo ZIP actualizado.
2. Abrir la carpeta:

```text
tarot-variables-constantes-frontend
```

3. En VS Code, abrir `index.html`.
4. Se puede usar la extensión Live Server o abrir `index.html` directamente en el navegador.

Recomendación:

```text
Usar Live Server para que las rutas y scripts se prueben como sitio local.
```

Importante: Bootstrap y el video de Nosotros se cargan desde internet. Si no hay conexión, el contenido propio seguirá visible, pero Bootstrap CDN y el video externo podrían no cargar.

---

## 11. Pendientes para una etapa futura

Estos puntos no se implementaron porque la especificación pidió no integrar backend todavía:

- Conectar registro y login al API Gateway.
- Guardar JWT real.
- Usar roles reales para proteger `admin.html`.
- Consumir experiencias desde `ms-tarot`.
- Consumir biblioteca y blog desde `ms-contenido`.
- Registrar mensajes de contacto en backend.
- Preparar publicación en GitHub cuando sea solicitado formalmente.

Cuando llegue la integración, el frontend debe conectarse al Gateway:

```text
http://localhost:8080
```

No debe conectarse directamente a Oracle ni a los puertos internos de microservicios.

---

## 12. Checklist académico cubierto

- HTML semántico.
- Navegación entre páginas.
- Imágenes con textos alternativos.
- Botones y formularios.
- Footer común.
- Menú principal separado de accesos internos.
- Registro vinculado a Login, sin opción independiente en el menú.
- Contador visible de selección.
- Acceso administrativo ubicado fuera de la navegación pública.
- CSS externo propio.
- Buen contraste entre fondos y textos.
- JavaScript puro.
- Validaciones en tiempo real.
- Mensajes personalizados.
- Checkbox de aceptación en Registro.
- Vista pública.
- Vista administrativa simulada.
- Formato tipo tienda mediante experiencias espirituales.
- Blog público.
- Dos páginas de detalle de blog.
- Video en Nosotros.
- Proyecto listo para abrir en VS Code.

---

## 13. Resumen ejecutivo

El MVP frontend quedó completo, navegable y coherente con la identidad visual definida. Se agregaron las secciones pendientes de Biblioteca, Blog, Nosotros, Contacto y Administración simulada, conservando las funcionalidades ya probadas de experiencias, detalle, selección, registro y login.

Además, se incorporó el feedback visual y funcional del documento de comentarios y de los pantallazos: navegación pública más clara, creación de cuenta vinculada solo a Login, carro/selección sin marco cuando está vacío, Biblioteca sin rutas de cartas repetidas, tarjetas más consistentes, acciones con lenguaje más accesible, video funcional en Nosotros, formularios más completos y acceso administrativo separado en la parte inferior de Inicio.

El proyecto sigue siendo 100% frontend, con datos simulados y sin dependencia del backend. Esto permite presentarlo como una entrega funcional de interfaz mientras se deja preparada la ruta para una integración posterior con el API Gateway.
