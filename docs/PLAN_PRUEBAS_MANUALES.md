# Plan de pruebas manuales

## 1. Objetivo

Demostrar que la versión React mantiene la navegación, los formularios y los flujos comerciales del frontend anterior, y que agrega una agenda protegida sin depender todavía de backend.

## 2. Preparación

1. Abrir una terminal en el proyecto.
2. Ejecutar `npm install` y luego `npm run dev`.
3. Abrir la URL indicada por Vite.
4. En DevTools, pestaña Application, limpiar `sessionStorage` antes de comenzar.
5. Probar una vez en escritorio y repetir los casos de responsividad con ancho móvil de `390 px`.

## 3. Datos de prueba

| Dato | Valor válido | Valor inválido |
|---|---|---|
| Nombre | `Valentina Soto` | `Va` |
| Correo | `valentina.soto@example.cl` | `valentina@` |
| Contraseña | `Tarot2026` | `123` |
| Asunto | `Consulta sobre una lectura` | vacío |
| Mensaje | `Quisiera conocer la disponibilidad para una sesión durante la próxima semana.` | `Hola` |
| Entrega | `Despacho estándar` | sin región/comuna/dirección |
| Región | `Metropolitana` | sin selección |
| Comuna | `Santiago` | sin selección |
| Dirección | `Avenida Siempre Viva 742` | `C` |
| Especialidad | `Tarotista` | sin selección |

## 4. Casos de prueba

| ID | Escenario y pasos | Resultado esperado |
|---|---|---|
| PM-01 | Recorrer Inicio, Experiencias, Tienda, Biblioteca, Blog, Nosotros y Contacto. | El encabezado conserva altura, marca y tamaño de enlaces; no hay saltos ni recargas completas. |
| PM-02 | En Experiencias, seleccionar **Conocer experiencia** en “Una carta”. | Se abre `/experiencias/1` con imagen, descripción, duración y valor. |
| PM-03 | En “Una carta”, presionar **Comenzar experiencia**. | Se informa el inicio de la experiencia gratuita y no se agrega una compra. |
| PM-04 | En Tienda, filtrar por una categoría y abrir un producto. | La cantidad visible cambia según el filtro y el detalle corresponde al producto elegido. |
| PM-05 | Agregar “Mazo clásico de Tarot” y abrir el carrito. | Aparece una línea con cantidad 1, precio unitario, total y contador en el encabezado. |
| PM-06 | Posicionar el cursor sobre `+` y `−`, luego usarlos. | Cambian visualmente al pasar o enfocar; `+` aumenta y `−` reduce sin bajar de 1. |
| PM-07 | Presionar `×` en una línea del carrito y cancelar; repetir y confirmar. | Cancelar conserva la línea; confirmar la elimina y recalcula subtotal y contador. |
| PM-08 | En checkout, enviar nombre y correo vacíos. | Se muestran mensajes bajo los campos y el foco queda en el primer error. |
| PM-09 | Completar nombre y correo válidos, mantener Retiro y confirmar. | Se genera un comprobante `TOA-AAAAMMDD-0001`, sin costo de despacho. |
| PM-10 | Repetir una compra, elegir Despacho y enviar sin dirección; luego completar los datos válidos. | Primero aparecen errores; después el total suma `$3.990` y se confirma el pedido. |
| PM-11 | En Contacto, escribir `Va`, `valentina@`, asunto vacío y `Hola`. | La validación se actualiza mientras se escribe y explica cada dato inválido. |
| PM-12 | Completar Contacto con los datos válidos y enviar. | Aparece “Mensaje enviado correctamente en modo simulado” y se limpian los campos. |
| PM-13 | En Ingresar, usar correo inválido y contraseña `123`; luego usar los datos válidos. | Primero se bloquea el acceso; después se crea la sesión simulada y se abre Agenda. |
| PM-14 | Escribir `/registro` directamente; luego entrar mediante **Crea tu cuenta** desde Ingresar. | El acceso directo vuelve a Ingresar; el enlace de Ingresar sí abre Registro. “Crear cuenta” no figura en el menú. |
| PM-15 | Sin sesión, abrir `/agenda`. | La ruta redirige a Ingresar y explica que se necesita sesión. |
| PM-16 | Ingresar, escoger Tarotista, primer profesional, primera fecha y primer horario; confirmar. | Se crea una reserva temporal y aparece el acceso a Mis reservas. |
| PM-17 | Abrir Mis reservas y cancelar la reserva. | Se solicita confirmación; al aceptar, la reserva desaparece. |
| PM-18 | En Biblioteca, activar Todos, Aprendizaje, Guías e Historia. | Cada filtro muestra solo sus recursos y no repite imágenes dentro del listado. |
| PM-19 | En Blog, abrir cada uno de los dos artículos y volver. | Ambas rutas de detalle muestran el contenido correcto y permiten regresar. |
| PM-20 | En Nosotros, reproducir el video y usar sus controles. | El video local inicia, pausa y permite modificar volumen y posición. |
| PM-21 | Desde el bloque inferior de Inicio, abrir Administración y cambiar estados. | El panel no está en el menú público y sus botones alternan Publicado/Borrador. |
| PM-22 | Reducir a `390 x 844`, abrir el menú y recorrer Inicio, Carrito y Contacto. | No hay scroll horizontal, superposición ni texto fuera de sus controles. |
| PM-23 | Abrir una ruta inexistente, por ejemplo `/carta-desconocida`. | Se muestra la página 404 con enlace para volver al inicio. |

## 5. Criterio de aprobación

La defensa puede considerar aprobado el MVP si todos los casos muestran el resultado esperado, no aparecen errores en la consola y los datos desaparecen al limpiar `sessionStorage`, confirmando que esta versión continúa siendo frontend simulado.

