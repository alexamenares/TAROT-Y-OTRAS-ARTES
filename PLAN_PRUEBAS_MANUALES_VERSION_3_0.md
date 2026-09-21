# Plan de pruebas manuales - Versión 3.0

## 1. Objetivo

Demostrar durante la defensa que la versión 3.0 conserva las funciones del MVP, aplica la identidad Material 3, utiliza las imágenes aprobadas y responde correctamente en escritorio y móvil, incluso si la mejora externa de Material Web no está disponible.

## 2. Ambiente sugerido

- Visual Studio Code con Live Server.
- Google Chrome actualizado.
- Resolución de escritorio: `1440 x 900` o superior.
- Resolución móvil en DevTools: `390 x 844`.
- Conexión a Internet para CDN y video externo.
- Consola de Chrome abierta para comprobar ausencia de errores.

Antes de comenzar, abrir DevTools, ir a **Application > Local Storage** y eliminar `seleccionExperiencias`. Recargar `index.html`.

## 3. Datos de prueba

| Dato | Valor válido | Valor inválido |
| --- | --- | --- |
| Nombre | `Valentina Soto` | vacío |
| Correo | `valentina@example.com` | `valentina@` |
| Contraseña | `Tarot2026!` | `Tarot` |
| Confirmación | `Tarot2026!` | `Tarot2025!` |
| Asunto | `Consulta sobre tres cartas` | vacío |
| Mensaje | `Quisiera conocer más detalles de la experiencia de tres cartas.` | `Hola` |
| Título administrativo | `Nueva guía de arcanos` | `Sol` |
| Tipo administrativo | `Biblioteca` | sin selección |
| Identificador válido | `detalle-experiencia.html?id=1` | `detalle-experiencia.html?id=999` |

## 4. Casos de prueba

### CP-01 - Carga general e identidad Material 3

**Pasos:** abrir `index.html` con Live Server, esperar la carga y revisar la consola.

**Resultado esperado:** la página muestra el diseño nocturno, los botones tienen forma de píldora, el logo aparece y no existen errores ni recursos locales 404.

### CP-02 - Estabilidad del menú en escritorio

**Pasos:** navegar por Inicio, Experiencias, Biblioteca, Blog, Nosotros, Contacto, Mi selección e Ingresar.

**Resultado esperado:** marca, altura del menú, tamaño de texto y posición de enlaces se mantienen estables; solo cambia el estado activo. "Crear cuenta" y "Admin" no aparecen en el menú.

### CP-03 - Menú móvil

**Pasos:** activar `390 x 844`, recargar Inicio y pulsar el icono de menú.

**Resultado esperado:** el menú se despliega sin desborde horizontal y permite navegar por todos los enlaces públicos.

### CP-04 - Héroes públicos

**Pasos:** visitar Inicio, Experiencias, Biblioteca, Blog, Nosotros, Contacto, Mi selección e Ingresar.

**Resultado esperado:** cada página usa una fotografía distinta, el texto se mantiene como HTML legible a la izquierda y la imagen temática ocupa el fondo. Mi selección muestra tres cartas reunidas e Ingresar muestra una llave junto a un diario.

### CP-05 - Páginas sin héroe fotográfico

**Pasos:** visitar detalle de experiencia, las dos publicaciones, Registro y Admin.

**Resultado esperado:** estas páginas conservan cabecera sólida y no reutilizan fotografías de héroe.

### CP-06 - Catálogo de experiencias

**Pasos:** abrir Experiencias.

**Resultado esperado:** aparecen exactamente tres tarjetas: Una carta, Tres cartas y Sanar y soltar, cada una con imagen, descripción, precio y el enlace "Conocer experiencia".

### CP-07 - Detalle válido

**Pasos:** abrir `detalle-experiencia.html?id=1` desde el catálogo.

**Resultado esperado:** se muestran los datos de Una carta y las acciones para agregar o regresar.

### CP-08 - Detalle inexistente

**Pasos:** escribir `detalle-experiencia.html?id=999` en la barra de dirección.

**Resultado esperado:** aparece el aviso "La experiencia solicitada no fue encontrada" y un enlace de regreso.

### CP-09 - Agregar a Mi selección

**Pasos:** en el detalle con `id=1`, pulsar "Agregar a mi selección" y luego abrir Mi selección.

**Resultado esperado:** aparece una confirmación visible, el menú muestra contador `1` y la experiencia está listada.

### CP-10 - Evitar duplicados

**Pasos:** pulsar dos veces "Agregar a mi selección" para la misma experiencia.

**Resultado esperado:** la segunda acción muestra un aviso y el contador continúa en `1`.

### CP-11 - Cancelar retiro

**Pasos:** en Mi selección, pulsar "Quitar de mi selección" y luego "Cancelar" en el diálogo.

**Resultado esperado:** el diálogo se cierra y la experiencia permanece. Si Material Web no cargó, la confirmación nativa permite cancelar con el mismo resultado.

### CP-12 - Confirmar retiro

**Pasos:** repetir la acción y confirmar "Quitar experiencia".

**Resultado esperado:** la tarjeta desaparece, se muestra el estado vacío y el contador deja de verse.

### CP-13 - Filtros de Biblioteca

**Pasos:** abrir Biblioteca y pulsar Todos, Aprendizaje, Guías e Historia.

**Resultado esperado:** el botón activo cambia visualmente y anuncia `aria-pressed="true"`; Guías muestra dos recursos y el mensaje informa la categoría y cantidad.

### CP-14 - Blog y detalles

**Pasos:** abrir Blog y entrar a cada publicación.

**Resultado esperado:** existen dos artículos completos; los enlaces para volver o continuar funcionan y no se aplica héroe fotográfico en los detalles.

### CP-15 - Video de Nosotros

**Pasos:** abrir Nosotros y pulsar reproducir.

**Resultado esperado:** el control de video responde. Si la red impide reproducirlo, el poster y el enlace a Wikimedia siguen visibles.

### CP-16 - Contacto inválido

**Pasos:** enviar el formulario vacío; luego escribir `valentina@` y `Hola` en correo y mensaje.

**Resultado esperado:** los cuatro campos muestran mensajes bajo el control correspondiente; correo y mensaje mantienen error por formato y longitud. El foco queda en el primer campo inválido.

### CP-17 - Contacto válido

**Pasos:** completar Nombre, Correo, Asunto y Mensaje con los datos válidos de la tabla y enviar.

**Resultado esperado:** aparece una alerta persistente con "Mensaje enviado correctamente en modo simulado", también se muestra el snackbar y el formulario queda limpio.

### CP-18 - Ingreso inválido y válido

**Pasos:** enviar vacío, probar correo inválido y contraseña corta; después usar `valentina@example.com` y `Tarot2026!` y presionar Enter desde el campo Contraseña.

**Resultado esperado:** primero aparecen errores; con datos válidos se muestra una alerta persistente de confirmación y los campos quedan limpios. El enlace de creación de cuenta existe solo dentro de esta página.

### CP-19 - Registro

**Pasos:** acceder desde Ingresar, escribir `Tarot2025!` como confirmación para provocar el error, corregir a `Tarot2026!`, dejar el consentimiento desmarcado y enviar; luego marcarlo y reenviar.

**Resultado esperado:** se detecta la diferencia entre contraseñas y, tras corregirla, el consentimiento pendiente. Al aceptarlo aparece una alerta persistente con "Registro simulado correctamente" y los campos quedan limpios.

### CP-20 - Cambio de estado administrativo

**Pasos:** entrar a Admin desde la sección inferior de Inicio, pulsar "Publicar", cancelar una vez y confirmar en el segundo intento.

**Resultado esperado:** cancelar no modifica la fila; confirmar cambia el estado a Publicado, actualiza el contador y transforma la acción en "Enviar a revisión".

### CP-21 - Nuevo borrador administrativo

**Pasos:** intentar agregar `Sol` sin tipo; después usar `Nueva guía de arcanos` y tipo Biblioteca.

**Resultado esperado:** el primer intento muestra errores y enfoca Título. El segundo agrega una fila en estado Borrador con botón Publicar y limpia ambos controles.

### CP-22 - Responsividad y contraste

**Pasos:** repetir CP-02, CP-04, CP-06, CP-13 y CP-17 en `390 x 844`, `768 x 1024` y `1440 x 900`.

**Resultado esperado:** no existe desplazamiento horizontal, los títulos no se cortan, los controles mantienen al menos 48 px de altura táctil y el texto permanece legible sobre los héroes.

### CP-23 - Respaldo sin Material Web

**Pasos:** en DevTools, abrir la pestaña Network, activar Request blocking y bloquear `*esm.run*`; recargar Experiencias. Abrir "Conocer experiencia", agregarla, regresar, retirarla desde Mi selección, filtrar Biblioteca, abrir un artículo y probar un cambio de estado en Admin.

**Resultado esperado:** todas las acciones navegan o actualizan los datos correctamente. Las confirmaciones usan el diálogo nativo del navegador si `md-dialog` no está disponible. El diseño principal permanece legible y utilizable.

## 5. Criterio de aprobación

La versión se considera aprobada cuando los 23 casos cumplen el resultado esperado, no hay errores propios de la aplicación en consola, no existen recursos locales 404 y los datos simulados no se duplican de forma indebida.
