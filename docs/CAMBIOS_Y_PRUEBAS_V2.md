# Cambios y verificación · React V2

Fecha: 18 de octubre de 2026. Se trabajó sobre una copia del proyecto React compartido; los archivos originales se conservaron. Se mantuvieron React Bootstrap, la arquitectura existente y sessionStorage.

## Correcciones

| Solicitud | Implementación |
|---|---|
| Citas duplicadas | Regla en `reservaService.js`, comprobación antes del guardado, horarios ocupados deshabilitados y mensaje cuando el día está completo. Cancelar libera el horario. |
| Duplicados ya guardados | La lectura conserva la primera reserva por profesional/fecha/hora. La siguiente escritura consolida la lista; cancelar no deja una copia duplicada. |
| Video no reproduce | Ruta `Videos` respetando mayúsculas, controles, reproducción en línea, mensaje de error y enlace alternativo. MP4 original conservado. |
| Biblioteca sin acciones | Seis lecturas en `/biblioteca/:id`, navegación, fuentes, explorador de 22 arcanos y diario con creación, edición y eliminación confirmada. |
| Dos experiencias | Ankh y péndulo en el catálogo compartido, detalles, Inicio y carrito. Dos imágenes generadas acordes al estilo existente. |
| Código difícil de explicar | Formato multilínea y comentarios que relacionan rutas, componentes, estado, datos y servicios. Guía de exposición con mapa de archivos. |

También se corrigió la construcción de fechas de agenda para utilizar el calendario local y se actualizaron los contadores de Administración para derivarlos de los catálogos, incluyendo las nuevas experiencias.

## Verificación automática

Comandos ejecutados satisfactoriamente: `npm run lint`, `npm test`, `npm run format:check` y `npm run build`.

Las nueve pruebas de `tests/servicios.test.js` utilizan el runner integrado de Node y un almacenamiento en memoria exclusivo de las pruebas:

1. Rechazo de un segundo envío del mismo profesional/fecha/hora, sin escribir una segunda cita.
2. Aceptación de otro día u horario e identificadores distintos.
3. La ocupación de un profesional no bloquea a otro en la comprobación de disponibilidad.
4. Cancelar y volver a reservar el horario.
5. Rechazo de combinaciones que no pertenecen a la agenda.
6. Consolidación y cancelación de duplicados antiguos.
7. Recuperación ante JSON dañado o datos ausentes.
8. Creación, lectura, edición sin duplicación y eliminación de una entrada del diario.
9. Rechazo de entradas del diario sin campos obligatorios.

## Comprobaciones en navegador

Se utilizó Chrome automatizado con Playwright sobre el servidor local Vite, con zona horaria America/Santiago. Se inspeccionaron capturas de escritorio y móvil.

- Ingreso desde ruta protegida y creación de una reserva.
- Regreso a la misma fecha: 10:00 aparece ocupado y deshabilitado.
- Ocupación de las tres horas del día: mensaje de ausencia de horarios; otro día permanece disponible.
- Cancelación y recuperación de la hora liberada.
- Seis enlaces de biblioteca y filtro Guías con dos resultados.
- Lectura de los seis recursos y 404 para id inexistente.
- Selector de arcanos y recorrido circular de El Mundo a El Loco y viceversa.
- Diario: guardar, recargar, editar sin duplicar, cancelar una eliminación y confirmar la eliminación.
- Cinco experiencias visibles, compra de las dos nuevas y experiencia gratuita fuera del carrito.
- Checkout solo digital: sin campo de dirección, total $6.980, comprobante y carrito vacío.
- MP4: metadatos cargados y reproducción que avanzó más de 0,5 segundos. Duración informada por el navegador: aproximadamente 58,50 segundos.
- Siete rutas a 390 px: Inicio, Experiencias, Biblioteca, detalle de lectura, diario, Nosotros y Agenda sin desbordamiento horizontal.
- Sin excepciones JavaScript ni respuestas HTTP locales 4xx/5xx durante el recorrido.

## Cómo repetir los casos principales a mano

### Agenda

Ingresa con un correo válido y contraseña de 8 o más caracteres. Elige Tarotista → Alma Rojas → primer día disponible → 10:00. Confirma. Vuelve a Agenda y repite la selección: el botón debe decir «10:00 · Ocupado». En Mis reservas cancela esa cita y verifica que pueda seleccionarse nuevamente.

### Biblioteca

Abre «Arcanos mayores para empezar». Cambia la carta desde el selector y prueba anterior/siguiente. Abre Diario, completa los campos, guarda y recarga. Edita la observación: debe seguir habiendo una sola entrada. Elimina primero cancelando y después confirmando.

### Video y experiencias

En Nosotros pulsa reproducir y observa el avance. En Experiencias abre Ankh y Péndulo, agrégalos al carrito y confirma una compra simulada. No debe pedirse dirección si el carrito contiene solo experiencias.

## Límites de esta etapa

La agenda, el carrito, los pedidos y el diario son locales a la pestaña. El acceso es simulado y no hay cobros, correos ni reservas coordinadas por un servidor. Los precios/duraciones nuevos son provisionales. Las pruebas no representan una certificación de todos los navegadores ni una auditoría exhaustiva de funciones que no se modificaron.
