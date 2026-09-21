# Plan de pruebas manuales - Versión 4.0

## Ambiente

- Google Chrome actualizado y Visual Studio Code con Live Server.
- Escritorio: `1440 x 900`; móvil: `390 x 844`.
- Conexión a Internet y consola del navegador abierta.
- Antes de iniciar, borrar `tarot-carrito`, `tarot-historial-pedidos`, `tarot-ultimo-pedido` y `tarot-carrito-migrado-v4` desde Local Storage.

## Datos de prueba

| Dato | Valor válido | Valor inválido |
| --- | --- | --- |
| Nombre | `Valentina Soto` | `Va` |
| Correo | `valentina@example.com` | `valentina@` |
| Contraseña | `Tarot2026!` | `Tarot` |
| Región | `Metropolitana` | sin selección |
| Comuna | `Santiago` | sin selección |
| Dirección | `Alameda 1234` | `Sol` |
| Referencia | `Departamento 402` | vacío permitido |
| Producto válido | `detalle-producto.html?id=mazo-clasico` | `detalle-producto.html?id=inexistente` |
| Experiencia válida | `detalle-experiencia.html?id=2` | `detalle-experiencia.html?id=999` |

## Casos

### CP-01 - Navegación V4

**Pasos:** recorrer Inicio, Experiencias, Tienda, Biblioteca, Blog, Nosotros, Contacto, Carrito e Ingresar.

**Esperado:** el menú mantiene tamaño estable, Tienda está visible, “Mi selección” no aparece y el carrito usa un único icono.

### CP-02 - Experiencia gratuita

**Pasos:** abrir Una carta y pulsar “Iniciar experiencia”.

**Esperado:** aparece “Tu experiencia ha comenzado” y el badge continúa vacío.

### CP-03 - Experiencia pagada

**Pasos:** abrir Tres cartas y pulsar “Agregar al carrito”.

**Esperado:** aparece confirmación, el badge muestra `1` y el carrito agrupa la línea en Experiencias.

### CP-04 - Catálogo de Tienda

**Pasos:** abrir Tienda y contar productos y filtros.

**Esperado:** aparecen 11 productos completos y 5 chips: Todos más cuatro categorías.

### CP-05 - Filtros

**Pasos:** seleccionar Libros y guías.

**Esperado:** se muestran exactamente Guía de Arcanos Mayores e Introducción al Tarot.

### CP-06 - Detalle e incremento

**Pasos:** abrir Mazo clásico, agregarlo dos veces y revisar el carrito.

**Esperado:** existe una sola línea con cantidad `2`; el badge suma dos unidades.

### CP-07 - Stock máximo

**Pasos:** aumentar Mazo clásico hasta 8 e intentar agregar una novena unidad.

**Esperado:** la cantidad permanece en 8, se informa el límite y la acción de incremento queda deshabilitada en el carrito.

### CP-08 - Persistencia

**Pasos:** recargar Carrito después de agregar experiencias y productos.

**Esperado:** líneas, cantidades, badge y subtotal se conservan.

### CP-09 - Retiro de línea

**Pasos:** pulsar el icono Quitar, cancelar y repetir confirmando.

**Esperado:** `md-dialog` conserva la línea al cancelar y la retira al confirmar.

### CP-10 - Carrito mixto

**Pasos:** reunir Tres cartas, 2 Mazos clásicos y 1 Amatista.

**Esperado:** aparecen grupos Experiencias y Productos; subtotal esperado `$60.960` y despacho “Se calcula al finalizar”.

### CP-11 - Checkout digital

**Pasos:** dejar solo Tres cartas, ir a finalizar y usar Nombre y Correo válidos.

**Esperado:** no aparecen campos de entrega, despacho vale `$0` y el total es `$2.990`.

### CP-12 - Retiro

**Pasos:** agregar Mazo clásico, finalizar y mantener Retiro.

**Esperado:** no se pide dirección y el despacho vale `$0`.

### CP-13 - Despacho inválido

**Pasos:** elegir Despacho y confirmar sin Región, Comuna ni Dirección.

**Esperado:** se muestran tres mensajes asociados y el foco llega al primer campo inválido.

### CP-14 - Despacho válido

**Pasos:** usar Metropolitana, Santiago y Alameda 1234.

**Esperado:** se suman `$3.990` y se permite confirmar.

### CP-15 - Pedido confirmado

**Pasos:** completar una compra simulada.

**Esperado:** aparece un número `TOA-AAAAMMDD-0001`, fecha, líneas, total y mensaje de entrega; el carrito queda vacío y el historial local contiene el pedido.

### CP-16 - Compatibilidad de enlace antiguo

**Pasos:** abrir `mi-seleccion.html`.

**Esperado:** redirige inmediatamente a `carrito.html`.

### CP-17 - Formularios conservados

**Pasos:** probar Contacto, Registro e Ingreso con los datos válidos e inválidos de la tabla.

**Esperado:** mensajes en tiempo real y confirmaciones simuladas continúan funcionando.

### CP-18 - Secciones conservadas

**Pasos:** filtrar Biblioteca, abrir ambos artículos y cambiar un estado en Administración.

**Esperado:** filtros, enlaces, diálogo y estados responden sin errores.

### CP-19 - Responsividad

**Pasos:** repetir Tienda, Detalle, Carrito y Checkout en `390 x 844`.

**Esperado:** no hay desplazamiento horizontal, las imágenes se ven completas, los botones son utilizables y el menú se despliega.

### CP-20 - Recursos y consola

**Pasos:** recargar cada página con Network y Console abiertas.

**Esperado:** no existen 404 locales ni errores críticos; `customElements.get('md-filled-button')` y los demás componentes Material devuelven una definición.

### CP-21 - Interacción de cantidad

**Datos:** Mazo clásico de Tarot, cantidad inicial `1`, stock `8`.

**Pasos:** abrir el Carrito, posicionar el mouse sobre `+`, pulsarlo, posicionar el mouse sobre `−` y pulsarlo; repetir con Tab y Enter.

**Esperado:** cada botón cambia visualmente con `hover` y foco; ambos signos permanecen centrados, la cantidad pasa de `1` a `2` y vuelve a `1`, y subtotal y badge se actualizan.

### CP-22 - Checkout sin Material Web

**Datos:** Nombre `Valentina Soto`; correo `valentina@example.com`; entrega `Despacho`; región `Metropolitana`; comuna `Santiago`; dirección `Alameda 1234`.

**Pasos:** bloquear temporalmente `https://esm.run/` desde DevTools, recargar Carrito y Finalizar compra, modificar una cantidad y completar el formulario con los datos indicados.

**Esperado:** los campos siguen visibles y editables, las cantidades responden, se agregan `$3.990` de despacho y la confirmación muestra un número `TOA-AAAAMMDD-0001`.

## Aprobación

La versión se aprueba cuando los 22 casos cumplen el resultado esperado y ninguna compra real, pago, correo o despacho es ejecutado.
