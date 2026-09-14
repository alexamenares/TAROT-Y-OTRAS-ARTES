# Plan de pruebas manuales del MVP Frontend

## Proyecto

**Nombre:** Tarot y Otras Artes  
**Tipo de prueba:** Pruebas manuales funcionales y visuales  
**Contexto:** MVP frontend estático, sin backend ni API  
**Fecha:** 07-09-2026  

Este plan sirve para demostrar en la defensa que el sitio fue revisado manualmente por módulos, usando datos de prueba concretos y resultados esperados.

---

## 1. Alcance de las pruebas

Las pruebas cubren:

- Navegación general del sitio.
- Página de inicio.
- Catálogo de experiencias.
- Detalle de experiencia.
- Mi selección con `localStorage`.
- Registro simulado.
- Login simulado.
- Biblioteca pública.
- Blog y dos detalles de publicaciones.
- Nosotros con video.
- Contacto con validación en tiempo real.
- Administración simulada.
- Contraste visual y responsividad básica.

No se prueban API, Oracle, JWT ni microservicios porque esta etapa es solo frontend.

---

## 2. Ambiente recomendado

### Opción recomendada

Abrir el proyecto en Visual Studio Code y usar Live Server.

Carpeta a abrir:

```text
tarot-variables-constantes-frontend
```

Archivo inicial:

```text
index.html
```

### Navegadores sugeridos

- Google Chrome.
- Microsoft Edge.

### Consideraciones

- Bootstrap se carga desde CDN, por lo tanto se recomienda tener conexión a internet.
- El video de Nosotros también requiere conexión a internet.
- Los datos se guardan localmente en el navegador mediante `localStorage`.

---

## 3. Datos de prueba generales

### Datos válidos para registro

```text
Nombre completo: Esteban Parada
Correo electrónico: esteban.parada@test.cl
Contraseña: Tarot2026
Confirmar contraseña: Tarot2026
Aceptación de tratamiento de datos: marcada
```

### Datos inválidos para registro

```text
Nombre completo: vacío
Correo electrónico: correo-invalido
Contraseña: 123
Confirmar contraseña: 456
Aceptación de tratamiento de datos: sin marcar
```

### Datos válidos para login

```text
Correo electrónico: esteban.parada@test.cl
Contraseña: Tarot2026
```

### Datos inválidos para login

```text
Correo electrónico: esteban.parada
Contraseña: 123
```

### Datos válidos para contacto

```text
Nombre completo: Esteban Parada
Correo electrónico: esteban.parada@test.cl
Asunto: Consulta sobre biblioteca
Mensaje: Me interesa revisar más recursos de aprendizaje sobre arcanos mayores.
```

### Datos inválidos para contacto

```text
Nombre completo: vacío
Correo electrónico: correo
Asunto: vacío
Mensaje: Hola
```

### Datos válidos para administración simulada

```text
Título: Calendario lunar para principiantes
Tipo: Blog
```

### Datos inválidos para administración simulada

```text
Título: Sol
Tipo: sin seleccionar
```

---

## 4. Casos de prueba manuales

### CP-001 Navegación principal

**Módulo:** Navegación  
**Objetivo:** Confirmar que el menú principal permite recorrer las páginas creadas.  
**Datos de prueba:** No aplica.  

**Pasos:**

1. Abrir `index.html`.
2. Hacer clic en `Experiencias`.
3. Volver al inicio.
4. Hacer clic en `Biblioteca`.
5. Hacer clic en `Blog`.
6. Hacer clic en `Nosotros`.
7. Hacer clic en `Contacto`.
8. Hacer clic en `Mi selección`.
9. Hacer clic en `Ingresar`.
10. Confirmar que dentro de la pantalla de ingreso aparece el enlace `Crea tu cuenta`.
11. Volver a Inicio y bajar hasta la sección `Administración del sitio`.
12. Hacer clic en `Ir al panel interno`.

**Resultado esperado:**  
Cada enlace abre la página correspondiente y no aparece ningún error de archivo no encontrado.
Admin no aparece en el menú principal ni en el footer público; solo se accede desde la sección inferior de Inicio.
`Crear cuenta` no aparece como opción independiente del menú principal; el registro solo se ofrece desde la pantalla `Ingresar`.

---

### CP-002 Inicio y experiencias destacadas

**Módulo:** Inicio  
**Objetivo:** Confirmar que la portada y las experiencias destacadas se muestran correctamente.  
**Datos de prueba:** No aplica.  

**Pasos:**

1. Abrir `index.html`.
2. Revisar que se muestre el título principal.
3. Revisar que aparezca la carta `El Loco`.
4. Revisar las tres experiencias destacadas.
5. Hacer clic en `Explorar experiencias`.

**Resultado esperado:**  
La página muestra portada, imagen, tres tarjetas y el botón lleva a `experiencias.html`.

---

### CP-003 Catálogo dinámico de experiencias

**Módulo:** Experiencias  
**Objetivo:** Confirmar que JavaScript genera el catálogo desde datos simulados.  
**Datos de prueba:** No aplica.  

**Pasos:**

1. Abrir `experiencias.html`.
2. Verificar que se muestran las experiencias:
   - Una carta.
   - Tres cartas.
   - Sanar y soltar.
3. Revisar que cada tarjeta tenga imagen, categoría, descripción, precio y botón.

**Resultado esperado:**  
Se muestran tres experiencias completas. No debe verse la página vacía.

---

### CP-004 Detalle de experiencia válido

**Módulo:** Detalle de experiencia  
**Objetivo:** Confirmar que el detalle se carga usando el parámetro `id` de la URL.  
**Datos de prueba:**

```text
URL: detalle-experiencia.html?id=2
```

**Pasos:**

1. Abrir `experiencias.html`.
2. En la experiencia `Tres cartas`, hacer clic en `Conocer experiencia`.
3. Revisar la URL.
4. Revisar el contenido cargado.

**Resultado esperado:**  
La URL contiene `id=2` y la pantalla muestra la experiencia `Tres cartas`, su descripción, precio referencial y botón `Agregar a mi selección`.

---

### CP-005 Detalle de experiencia inexistente

**Módulo:** Detalle de experiencia  
**Objetivo:** Confirmar que se muestra un aviso si el identificador no existe.  
**Datos de prueba:**

```text
URL: detalle-experiencia.html?id=999
```

**Pasos:**

1. Escribir manualmente la URL `detalle-experiencia.html?id=999`.
2. Presionar Enter.
3. Observar el mensaje en pantalla.

**Resultado esperado:**  
Se muestra un aviso indicando que la experiencia no fue encontrada y un enlace para volver al catálogo.

---

### CP-006 Agregar experiencia a Mi selección

**Módulo:** Mi selección  
**Objetivo:** Confirmar que una experiencia se guarda en `localStorage`.  
**Datos de prueba:**

```text
Experiencia: Tres cartas
URL: detalle-experiencia.html?id=2
```

**Pasos:**

1. Abrir `detalle-experiencia.html?id=2`.
2. Hacer clic en `Agregar a mi selección`.
3. Observar el mensaje de confirmación bajo los botones.
4. Abrir `mi-seleccion.html`.

**Resultado esperado:**  
La página muestra la experiencia `Tres cartas`, el total referencial y el botón `Quitar de mi selección`. En el detalle se informa `La experiencia fue agregada a tu selección.` y el contador del menú muestra `1` con el marco activo de selección.

---

### CP-007 Evitar duplicados en Mi selección

**Módulo:** Mi selección  
**Objetivo:** Confirmar que no se agrega dos veces la misma experiencia.  
**Datos de prueba:**

```text
Experiencia: Tres cartas
```

**Pasos:**

1. Agregar la experiencia `Tres cartas` a Mi selección.
2. Volver al detalle de la misma experiencia.
3. Hacer clic nuevamente en `Agregar a mi selección`.

**Resultado esperado:**  
Se muestra un mensaje indicando que la experiencia ya está en la selección.

---

### CP-008 Quitar experiencia de Mi selección

**Módulo:** Mi selección  
**Objetivo:** Confirmar que una experiencia guardada puede eliminarse.  
**Datos de prueba:**

```text
Experiencia guardada: Tres cartas
```

**Pasos:**

1. Abrir `mi-seleccion.html`.
2. Hacer clic en `Quitar de mi selección`.
3. Revisar el contenido de la página.

**Resultado esperado:**  
La experiencia desaparece. Si era la única experiencia guardada, aparece el estado vacío con el botón `Explorar experiencias`; el menú vuelve a mostrar `Mi selección` sin marco ni contador visible.

---

### CP-009 Registro con datos inválidos

**Módulo:** Registro  
**Objetivo:** Confirmar que el formulario muestra errores personalizados.  
**Datos de prueba:**

```text
Nombre completo: vacío
Correo electrónico: correo-invalido
Contraseña: 123
Confirmar contraseña: 456
Aceptación de tratamiento de datos: sin marcar
```

**Pasos:**

1. Abrir `login.html`.
2. Hacer clic en el enlace `Crea tu cuenta`.
3. Completar los campos con los datos inválidos.
4. Observar los mensajes bajo cada campo.
5. Hacer clic en `Crear cuenta`.

**Resultado esperado:**  
Se muestran mensajes de error por nombre, correo, contraseña, confirmación y aceptación de tratamiento de datos. El registro no se simula como exitoso.

---

### CP-010 Registro con datos válidos

**Módulo:** Registro  
**Objetivo:** Confirmar el envío simulado del registro.  
**Datos de prueba:**

```text
Nombre completo: Esteban Parada
Correo electrónico: esteban.parada@test.cl
Contraseña: Tarot2026
Confirmar contraseña: Tarot2026
Aceptación de tratamiento de datos: marcada
```

**Pasos:**

1. Abrir `login.html`.
2. Hacer clic en el enlace `Crea tu cuenta`.
3. Completar todos los campos con datos válidos.
4. Marcar la aceptación de tratamiento de datos.
5. Hacer clic en `Crear cuenta`.

**Resultado esperado:**  
Se muestra el mensaje `Registro simulado correctamente.` y el formulario se limpia.

---

### CP-011 Login con datos inválidos

**Módulo:** Login  
**Objetivo:** Confirmar validaciones del inicio de sesión simulado.  
**Datos de prueba:**

```text
Correo electrónico: esteban.parada
Contraseña: 123
```

**Pasos:**

1. Abrir `login.html`.
2. Completar los campos con datos inválidos.
3. Hacer clic en `Ingresar`.

**Resultado esperado:**  
Se muestran errores de correo y contraseña. No aparece mensaje de éxito.

---

### CP-012 Login con datos válidos

**Módulo:** Login  
**Objetivo:** Confirmar el inicio de sesión simulado.  
**Datos de prueba:**

```text
Correo electrónico: esteban.parada@test.cl
Contraseña: Tarot2026
```

**Pasos:**

1. Abrir `login.html`.
2. Completar los campos con datos válidos.
3. Hacer clic en `Ingresar`.

**Resultado esperado:**  
Se muestra el mensaje `Inicio de sesión simulado correctamente.` y el formulario se limpia.

---

### CP-013 Biblioteca y filtros

**Módulo:** Biblioteca  
**Objetivo:** Confirmar que los filtros muestran recursos por categoría.  
**Datos de prueba:**

```text
Filtro: Historia
Filtro: Guías
Filtro: Aprendizaje
```

**Pasos:**

1. Abrir `biblioteca.html`.
2. Hacer clic en `Historia`.
3. Revisar que cambie el mensaje de resultados.
4. Hacer clic en `Guías`.
5. Hacer clic en `Aprendizaje`.
6. Hacer clic en `Todos`.

**Resultado esperado:**  
Las tarjetas visibles cambian según el filtro seleccionado y el mensaje informa cuántos recursos se muestran.
Las rutas de imagen de las tarjetas son únicas y las cartas cargadas son distintas. Si en otra copia del proyecto faltara alguna imagen, se muestra el marcador `Carta pendiente` y no se repite una carta existente.

---

### CP-014 Blog y detalles de publicaciones

**Módulo:** Blog  
**Objetivo:** Confirmar que existen dos publicaciones y dos páginas de detalle.  
**Datos de prueba:** No aplica.  

**Pasos:**

1. Abrir `blog.html`.
2. Revisar que existan dos publicaciones.
3. Entrar a `Cómo iniciar una tirada diaria sin complicarte`.
4. Volver al blog.
5. Entrar a `Rituales simples para preparar tus cartas`.
6. Volver al blog.

**Resultado esperado:**  
Cada publicación abre una página de detalle distinta y ambas permiten regresar al blog.

---

### CP-015 Nosotros con video

**Módulo:** Nosotros  
**Objetivo:** Confirmar que la página presenta el proyecto e incluye video HTML5.  
**Datos de prueba:** No aplica.  

**Pasos:**

1. Abrir `nosotros.html`.
2. Revisar el texto de propósito.
3. Confirmar que se visualiza el reproductor del video.
4. Intentar reproducir el video si hay conexión a internet.

**Resultado esperado:**  
La página muestra el propósito del proyecto y un video externo mediante etiqueta HTML5 `video`. Si no hay internet, el resto del contenido debe seguir visible.

---

### CP-016 Contacto con datos inválidos

**Módulo:** Contacto  
**Objetivo:** Confirmar validación en tiempo real y al enviar.  
**Datos de prueba:**

```text
Nombre completo: vacío
Correo electrónico: correo
Asunto: vacío
Mensaje: Hola
```

**Pasos:**

1. Abrir `contacto.html`.
2. Completar los campos con los datos inválidos.
3. Observar los mensajes bajo cada campo.
4. Hacer clic en `Enviar mensaje`.

**Resultado esperado:**  
Se muestran errores personalizados y no aparece mensaje de envío exitoso.

---

### CP-017 Contacto con datos válidos

**Módulo:** Contacto  
**Objetivo:** Confirmar envío simulado del formulario.  
**Datos de prueba:**

```text
Nombre completo: Esteban Parada
Correo electrónico: esteban.parada@test.cl
Asunto: Consulta sobre biblioteca
Mensaje: Me interesa revisar más recursos de aprendizaje sobre arcanos mayores.
```

**Pasos:**

1. Abrir `contacto.html`.
2. Completar todos los campos con datos válidos.
3. Hacer clic en `Enviar mensaje`.

**Resultado esperado:**  
Se muestra el mensaje `Mensaje enviado correctamente en modo simulado.` y el formulario se limpia.

---

### CP-018 Administración: publicar contenido

**Módulo:** Administración simulada  
**Objetivo:** Confirmar que una acción administrativa cambia el estado visual.  
**Datos de prueba:** Usar la fila `Rituales simples para preparar tus cartas`.  

**Pasos:**

1. Abrir `admin.html`.
2. Buscar la fila `Rituales simples para preparar tus cartas`.
3. Hacer clic en `Publicar`.

**Resultado esperado:**  
El estado cambia a `Publicado` y aparece un mensaje indicando que el contenido fue publicado en modo simulado.

---

### CP-019 Administración: agregar borrador válido

**Módulo:** Administración simulada  
**Objetivo:** Confirmar que se puede agregar un nuevo borrador visualmente.  
**Datos de prueba:**

```text
Título: Calendario lunar para principiantes
Tipo: Blog
```

**Pasos:**

1. Abrir `admin.html`.
2. Escribir el título.
3. Seleccionar tipo `Blog`.
4. Hacer clic en `Agregar borrador`.

**Resultado esperado:**  
Aparece una nueva fila en la tabla con el título ingresado, tipo `Blog` y estado `Borrador`.

---

### CP-020 Administración: agregar borrador inválido

**Módulo:** Administración simulada  
**Objetivo:** Confirmar validación del formulario administrativo.  
**Datos de prueba:**

```text
Título: Sol
Tipo: sin seleccionar
```

**Pasos:**

1. Abrir `admin.html`.
2. Escribir `Sol` como título.
3. Dejar el tipo sin seleccionar.
4. Hacer clic en `Agregar borrador`.

**Resultado esperado:**  
Se muestran mensajes de error. No se agrega una nueva fila a la tabla.

---

### CP-021 Contraste visual

**Módulo:** Diseño visual  
**Objetivo:** Confirmar que no exista texto claro sobre fondo claro.  
**Datos de prueba:** No aplica.  

**Pasos:**

1. Recorrer todas las páginas del menú.
2. Revisar cabeceras oscuras.
3. Revisar tarjetas blancas.
4. Revisar formularios.
5. Revisar mensajes de error y éxito.

**Resultado esperado:**  
El texto es legible en todas las pantallas. En fondos oscuros se usa texto claro y en tarjetas/fondos claros se usa texto oscuro.

---

### CP-022 Responsividad básica

**Módulo:** Diseño responsive  
**Objetivo:** Confirmar que el sitio se pueda revisar en pantallas pequeñas.  
**Datos de prueba:** Usar herramientas del navegador o achicar la ventana.  

**Pasos:**

1. Abrir `index.html`.
2. Achicar el ancho de la ventana.
3. Verificar que el menú se convierta en botón desplegable.
4. Abrir el menú.
5. Navegar a `experiencias.html`, `contacto.html` y abrir `admin.html` desde la sección inferior de administración en Inicio.
6. Revisar que no aparezca desplazamiento horizontal molesto.

**Resultado esperado:**  
El contenido se acomoda en columnas verticales, el menú móvil funciona y la lectura se mantiene clara.

---

### CP-023 Correcciones visuales de navegación

**Módulo:** Navegación y consistencia visual  
**Objetivo:** Confirmar que los últimos comentarios visuales fueron corregidos.  
**Datos de prueba:** Vaciar `localStorage` o usar un navegador sin experiencias seleccionadas.  

**Pasos:**

1. Abrir `index.html` sin experiencias guardadas.
2. Confirmar que `Mi selección` aparece como enlace normal, sin marco, icono ni contador visible.
3. Confirmar que `Admin` no aparece en el menú principal.
4. Confirmar que el footer público tampoco muestra acceso a Admin.
5. Bajar en Inicio hasta `Administración del sitio`.
6. Hacer clic en `Ir al panel interno`.
7. Volver a Inicio y comparar visualmente la cabecera con `Blog`, `Biblioteca`, `Contacto` e `Ingresar`.
8. Confirmar que `Crear cuenta` no aparece en el menú principal de ninguna página.
9. Abrir `Ingresar` y confirmar que el enlace `Crea tu cuenta` aparece dentro del contenido de esa pantalla.
10. Navegar entre `Experiencias`, `Biblioteca`, `Blog`, `Nosotros`, `Contacto`, `Mi selección` e `Ingresar` sin cambiar el zoom del navegador.
11. Confirmar que el logo, el alto del menú, el ancho del contenido y la altura del bloque superior se mantienen estables desde Inicio hasta las páginas internas.
12. En una ventana de escritorio amplia, idealmente cercana a 1440 px de ancho, confirmar que `Mi selección` ocupa el mismo ancho y alto visual que `Inicio`, `Experiencias`, `Biblioteca`, `Blog`, `Nosotros`, `Contacto` e `Ingresar`.
13. Reducir la ventana bajo 1200 px de ancho y confirmar que el menú cambia a modo colapsado antes de que los enlaces se amontonen o cambien de tamaño.

**Resultado esperado:**  
La navegación pública mantiene el mismo tamaño y jerarquía en todas las páginas revisadas; `Mi selección` mide visualmente igual que los demás enlaces del menú, no se enmarca cuando está vacía, `Crear cuenta` queda vinculado solo a `Ingresar` y el panel Admin solo se abre desde la sección inferior de Inicio.

---

## 5. Orden recomendado para la defensa

Para mostrar el proyecto de forma clara, se recomienda seguir este orden:

1. Inicio.
2. Experiencias.
3. Detalle de experiencia.
4. Agregar a Mi selección.
5. Mi selección y quitar experiencia.
6. Login y acceso a registro desde `Crea tu cuenta`.
7. Registro con error y éxito.
8. Biblioteca y filtros.
9. Blog y dos detalles.
10. Nosotros con video.
11. Contacto con error y éxito.
12. Administración del sitio/Admin: publicar contenido y agregar borrador.
13. Mostrar que no hay backend conectado todavía y que todo está simulado según el alcance.

---

## 6. Evidencia sugerida para presentar

Durante la defensa se puede mencionar:

- El proyecto usa `localStorage` para conservar la selección del usuario.
- El menú muestra un contador visual para `Mi selección`.
- `Mi selección` no queda enmarcada cuando no hay experiencias guardadas.
- `Crear cuenta` no aparece en el menú principal; el registro está vinculado a `Ingresar`.
- Los formularios no usan validaciones automáticas del navegador porque tienen `novalidate` y mensajes propios con JavaScript.
- Registro exige aceptación del tratamiento de datos en el contexto simulado del MVP.
- La administración es simulada y no requiere roles reales todavía.
- Admin queda fuera del menú público principal y se accede desde la sección inferior de Inicio.
- Biblioteca usa rutas de cartas únicas para evitar imágenes repetidas; en la carpeta real del proyecto se verificó la baraja desde `00-el-loco.png` hasta `77-rey-de-oros.png`.
- Las páginas nuevas cumplen los requisitos académicos de biblioteca, blog, contacto, nosotros con video y vista administrativa.
- No se dejó integración con backend porque corresponde a una etapa futura.

---

## 7. Resultado esperado global

Si todas las pruebas anteriores se cumplen, el MVP queda listo para presentarse como una interfaz frontend navegable, consistente, semántica, con validaciones en tiempo real y datos simulados.
