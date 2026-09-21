# Plan de pruebas manuales — Versión 2.0

## Preparación

1. Abrir la carpeta del proyecto en Visual Studio Code.
2. Ejecutar `index.html` con Live Server.
3. Usar una ventana privada o limpiar `localStorage` antes de comenzar.
4. Probar inicialmente con 1440 × 900 px y luego con 390 × 844 px.
5. Mantener abierta la consola del navegador para comprobar que no aparezcan errores JavaScript.

## Datos de prueba

| Dato | Valor válido | Valor inválido |
|---|---|---|
| Nombre | `Valentina Soto` | campo vacío |
| Correo | `valentina.soto@example.com` | `valentina@` |
| Contraseña | `Tarot2026!` | `1234567` |
| Confirmación | `Tarot2026!` | `OtraClave2026!` |
| Asunto | `Consulta sobre una experiencia` | campo vacío |
| Mensaje | `Quisiera conocer más detalles de la experiencia de tres cartas.` | `Hola` |
| Título Admin | `Nueva guía de arcanos` | `Sol` |
| Tipo Admin | `Biblioteca` | sin seleccionar |

## Casos de prueba

### PM-01 — Navegación estable en escritorio

**Pasos:** abrir Inicio, Experiencias, Biblioteca, Blog, Nosotros, Contacto, Mi selección e Ingresar usando el menú.

**Resultado esperado:** la marca, altura de cabecera, tamaño de texto y ancho de los enlaces no cambian al navegar; el enlace activo se reconoce mediante contenedor lavanda y línea dorada.

### PM-02 — Menú móvil

**Pasos:** usar 390 × 844 px, pulsar el botón de menú, recorrer los enlaces y volver a cerrarlo.

**Resultado esperado:** aparecen los ocho enlaces en una sola columna; no existe desplazamiento horizontal ni texto cortado.

### PM-03 — Portada Ritual nocturno

**Pasos:** abrir Inicio en 1440 × 900 px; revisar el primer viewport y repetir en 390 × 844 px.

**Resultado esperado:** se muestran el ouróboro, la escena nocturna, el título `Tarot y Otras Artes`, dos acciones y El Loco como carta protagonista. Las experiencias destacadas comienzan a verse sin una navegación confusa; el texto mantiene contraste, no hay controles incrustados en la fotografía y no aparece una luna como símbolo de marca.

### PM-04 — Catálogo dinámico

**Pasos:** abrir Experiencias.

**Resultado esperado:** se renderizan exactamente tres tarjetas: Una carta, Tres cartas y Sanar y soltar, con imágenes, textos y precios correctos.

### PM-05 — Detalle válido

**Pasos:** abrir `detalle-experiencia.html?id=1`.

**Resultado esperado:** aparece Una carta, su imagen, descripción, gratuidad y botón para agregar.

### PM-06 — Detalle inexistente

**Pasos:** abrir `detalle-experiencia.html?id=999`.

**Resultado esperado:** aparece un mensaje controlado y un enlace para volver al catálogo; la consola no muestra errores.

### PM-07 — Añadir y evitar duplicados

**Pasos:** en el detalle de Una carta, pulsar Agregar a mi selección dos veces.

**Resultado esperado:** el primer clic muestra snackbar de confirmación y el contador cambia a 1; el segundo informa que ya existe y el contador permanece en 1.

### PM-08 — Eliminar con confirmación

**Pasos:** abrir Mi selección, pulsar Quitar de mi selección, elegir Cancelar y repetir el proceso eligiendo Quitar experiencia.

**Resultado esperado:** Cancelar conserva la tarjeta; confirmar la elimina, actualiza el contador y muestra el estado vacío.

### PM-09 — Persistencia local

**Pasos:** agregar Tres cartas, recargar y cerrar/abrir nuevamente la página.

**Resultado esperado:** la experiencia sigue visible porque se conserva en `localStorage` bajo `seleccionExperiencias`.

### PM-10 — Filtros de Biblioteca

**Pasos:** pulsar Todos, Aprendizaje, Guías e Historia.

**Resultado esperado:** los resultados visibles son 6, 2, 2 y 2 respectivamente; el chip activo usa lavanda y el mensaje informa categoría y cantidad.

### PM-11 — Blog

**Pasos:** abrir las dos publicaciones desde Blog y regresar con sus enlaces secundarios.

**Resultado esperado:** ambas páginas de detalle cargan su artículo, imagen, jerarquía de títulos y bloque destacado sin enlaces rotos.

### PM-12 — Nosotros y video

**Pasos:** abrir Nosotros e intentar reproducir el video con conexión disponible.

**Resultado esperado:** el reproductor conserva proporción 16:9 y muestra el póster mientras no reproduce. Si el recurso externo no está disponible, el resto de la página continúa funcional.

### PM-13 — Contacto inválido

**Pasos:** enviar el formulario vacío y luego usar correo `valentina@` y mensaje `Hola`.

**Resultado esperado:** cada campo incorrecto presenta borde rosado y texto de error; el formulario no se reinicia.

### PM-14 — Contacto válido

**Pasos:** usar Nombre, Correo, Asunto y Mensaje válidos de la tabla y enviar.

**Resultado esperado:** aparece snackbar de éxito, el estado se anuncia a lectores de pantalla y el formulario se limpia.

### PM-15 — Registro inválido y válido

**Pasos:** enviar vacío; luego usar contraseña corta; luego completar los datos válidos, aceptar el tratamiento y enviar.

**Resultado esperado:** se muestran errores específicos en los intentos inválidos y snackbar de confirmación en el intento válido.

### PM-16 — Login inválido y válido

**Pasos:** probar correo `valentina@` y contraseña `1234567`; después usar correo y contraseña válidos.

**Resultado esperado:** el primer intento muestra dos errores; el segundo muestra confirmación simulada y limpia los campos.

### PM-17 — Administración: cambio de estado

**Pasos:** pulsar Publicar, cancelar el diálogo, repetir y confirmar.

**Resultado esperado:** cancelar no modifica la fila; confirmar cambia el badge a Publicado, actualiza la acción y el contador.

### PM-18 — Administración: nuevo borrador

**Pasos:** enviar el formulario vacío; después escribir `Nueva guía de arcanos`, seleccionar Biblioteca y enviar.

**Resultado esperado:** primero aparecen dos errores; después se agrega una fila con estado Borrador y aparece snackbar.

### PM-19 — Teclado y foco

**Pasos:** recorrer menú, chips, campos, botones y diálogo solo con Tab, Shift+Tab, Enter y Escape.

**Resultado esperado:** el foco dorado siempre es visible; Enter activa controles; Escape cierra el diálogo sin ejecutar la acción.

### PM-20 — Tipografías y caracteres en español

**Pasos:** revisar visualmente `¿Qué energía guía tu corazón hoy? Niño, año, conexión, intuición, pingüino, ¡bienvenido!` con Cinzel y Lora desde las herramientas del navegador.

**Resultado esperado:** signos, tildes, diéresis y letra ñ se muestran correctamente y sin sustituciones.

### PM-21 — Reducción de movimiento

**Pasos:** activar Reducir movimiento en el sistema y volver a cargar.

**Resultado esperado:** tarjetas y botones no se desplazan al pasar el puntero; las transiciones quedan reducidas.

### PM-22 — Revisión final de consola y recursos

**Pasos:** recorrer las 13 páginas HTML con la consola y pestaña Red abiertas.

**Resultado esperado:** no existen errores JavaScript, rutas locales 404, imágenes rotas ni enlaces con `href="#"`.

## Criterio de aprobación

La versión se considera aprobada cuando todos los casos funcionales cumplen el resultado esperado y no aparecen diferencias de tamaño entre páginas, desbordes horizontales, texto con contraste insuficiente ni errores JavaScript locales.
