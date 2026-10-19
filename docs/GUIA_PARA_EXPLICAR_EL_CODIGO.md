# Guía para explicar Tarot y Otras Artes · React V2

Esta guía acompaña los comentarios del código. Continúa la versión React entregada: React, Vite, React Router, React Bootstrap, CSS propio y datos temporales en `sessionStorage`. No hay backend ni pagos reales.

## 1. Cómo preparar la demostración

Abre en Visual Studio Code la carpeta que contiene `package.json`. En su terminal:

```bash
npm install
npm run dev
```

Abre la dirección que muestre Vite. Mantén la terminal abierta. No abras `index.html` con doble clic: JSX y las rutas necesitan el servidor de desarrollo.

Para revisar el proyecto:

```bash
npm run lint
npm test
npm run format:check
npm run build
```

`npm run preview` sirve la compilación de `dist`. `npm run format` aplica el formato legible a JavaScript, JSX, CSS y pruebas. El ZIP no incluye dependencias instaladas: `npm install` las reconstruye usando `package-lock.json`.

## 2. Una explicación breve de la arquitectura

Puedes decir: «Es una SPA: React cambia el contenido de la pantalla cuando navego. React Router relaciona las URL con componentes. Bootstrap organiza controles y columnas, mientras mi CSS mantiene la identidad Ritual nocturno. Los datos de catálogo están separados de las pantallas. Los servicios concentran las reglas de negocio y el acceso a sessionStorage. Los contextos comparten carrito y sesión entre las rutas».

Orden recomendado para mostrar archivos:

1. `index.html`: contiene el elemento `root`.
2. `src/main.jsx`: monta React y envuelve la aplicación en el router y los proveedores de estado.
3. `src/App.jsx`: declara las rutas.
4. `src/components/organisms/Layout.jsx`: inserta la página activa mediante `Outlet`, entre encabezado y pie.
5. `src/pages/`: pantallas que combinan datos, estado y componentes.
6. `src/data/`: catálogos y contenido local.
7. `src/contexts/`: comunicación del carrito y la sesión con React.
8. `src/services/`: validación de reglas y almacenamiento temporal.
9. `src/index.css` y `src/styles/ritual.css`: colores, tipografías, tamaños, disposición y adaptación móvil.

## 3. Dónde encontrar cada pantalla

Todas las rutas se encuentran en `src/App.jsx`. Los archivos siguientes pertenecen a `src/pages/`.

| Pantalla / URL | Archivo | Qué conviene explicar |
|---|---|---|
| Inicio `/` | `InicioReact.jsx` | Hero, experiencias destacadas y accesos internos. |
| Experiencias `/experiencias` | `Experiencias.jsx` | `map` convierte el catálogo en tarjetas. |
| Detalle `/experiencias/:id` | `DetalleExperiencia.jsx` | `useParams`, búsqueda por id, gratis o agregar al carrito. |
| Tienda `/tienda` | `Tienda.jsx` | Estado de categoría y filtro derivado. |
| Producto `/tienda/:id` | `DetalleProducto.jsx` | Producto, precio, stock y resultado al agregar. |
| Carrito `/carrito` | `Carrito.jsx` | Lista única, cantidades, totales y confirmación de eliminación. |
| Compra `/finalizar-compra` | `FinalizarCompra.jsx` | Validaciones, retiro, despacho y entrega digital. |
| Comprobante `/pedido-confirmado` | `PedidoConfirmado.jsx` | Último pedido almacenado, aunque el carrito esté vacío. |
| Biblioteca `/biblioteca` | `Biblioteca.jsx` | Categorías y enlaces a los seis recursos. |
| Recurso `/biblioteca/:id` | `DetalleRecurso.jsx` | Lectura, fuentes y actividad según su tipo. |
| Blog `/blog` | `Blog.jsx` | Listado de artículos locales. |
| Artículo `/blog/:slug` | `ArticuloBlog.jsx` | El slug identifica el artículo. |
| Nosotros `/nosotros` | `Nosotros.jsx` | Contenido institucional y reproductor MP4. |
| Contacto `/contacto` | `Contacto.jsx` | Formulario controlado y envío simulado. |
| Ingreso `/ingresar`, `/login` | `Ingresar.jsx` | Validación e inicio de sesión demostrativo. |
| Registro `/registro` | `Registro.jsx` | Acceso desde Ingresar, confirmación de contraseña y aceptación. |
| Agenda `/agenda` | `Agenda.jsx` | Cuatro pasos, horarios ocupados y confirmación. |
| Mis reservas `/mis-reservas` | `MisReservas.jsx` | Lista y cancelación con modal. |
| Administración `/administracion` | `Administracion.jsx` | Filas de ejemplo con publicación local, sin roles reales. |
| URL o identificador inexistente | `NoEncontrada.jsx` | Pantalla 404 y regreso al inicio. |

## 4. Componentes reutilizables

`atoms` contiene piezas pequeñas: `Etiqueta`, `Precio` y `MensajeCampo`.

`molecules` combina piezas para formar `HeroPagina`, `ControlCantidad`, `TarjetaProducto` y `TarjetaExperiencia`. Reciben información mediante **props**. Por ejemplo, la tarjeta recibe `experiencia`, utiliza su imagen y nombre, y construye un enlace con su id.

`organisms` contiene `Encabezado`, `PiePagina`, `Layout`, `RutaProtegida` y las actividades nuevas: `ExploradorArcanos` y `DiarioLecturas`.

El **encabezado** usa `useCarrito` para mostrar las unidades y `useSesion` para cambiar los accesos de la cuenta. El menú móvil pertenece al mismo componente. La marca usa la imagen original del ouróboros.

## 5. Cómo explicar React en este proyecto

- **JSX:** descripción de la interfaz dentro de JavaScript. Las llaves insertan expresiones; no convierten el archivo en HTML independiente.
- **Props:** datos o funciones que un componente padre entrega a un hijo.
- **useState:** información que cambia y hace que React vuelva a renderizar. Ejemplos: categoría, formulario, mensaje y carta seleccionada.
- **Estado derivado:** un valor calculado desde otro, como el subtotal desde las líneas. Evita guardar dos copias que podrían desincronizarse.
- **useContext:** permite compartir datos sin pasarlos manualmente por todos los componentes. Aquí se utiliza para carrito y usuario.
- **useEffect:** en `Layout` reinicia el desplazamiento cuando cambia la ruta.
- **useRef:** permite enfocar un campo del checkout o del diario sin buscarlo manualmente en el DOM.
- **useMemo:** en Agenda conserva el resultado del filtro de profesionales mientras no cambie la especialidad.
- **Render condicional:** muestra confirmación o formulario; lista o estado vacío; dirección solo cuando corresponde.
- **map / filter / find / reduce:** respectivamente construyen listas, filtran, buscan un elemento y acumulan totales.
- **key:** identifica cada elemento de una lista para que React mantenga su correspondencia entre renders.
- **Formulario controlado:** `value` viene del estado y `onChange` lo actualiza. En un checkbox se utiliza `checked`.
- **preventDefault:** impide que el envío nativo recargue la página y permite validar en React.

## 6. Recorrido de una reserva y corrección de duplicados

1. `RutaProtegida` comprueba si `SesionContext` tiene usuario. Si falta, redirige a Ingresar y recuerda la URL solicitada.
2. `Agenda.jsx` lee `data/profesionales.js` y guarda la elección en `seleccion`.
3. Cambiar especialidad o profesional reinicia los campos dependientes. Cambiar fecha limpia la hora.
4. `estaHorarioOcupado` comprueba la combinación **profesionalId + fecha + horario**. Los botones ocupados quedan deshabilitados y llevan la palabra «Ocupado».
5. `confirmar` valida los campos y llama a `crearReserva`.
6. `reservaService.js` vuelve a leer las reservas y valida el profesional, la especialidad, la fecha, la hora y la ausencia de colisión **antes de escribir**.
7. Si hay colisión, lanza un error y la pantalla lo muestra. Si hay éxito, se asigna un UUID y se guarda en `tarot-react-reservas`.
8. `MisReservas.jsx` recupera esa lista. Al confirmar la cancelación, `cancelarReserva` guarda la lista sin la cita y libera el horario.

La comprobación del servicio es necesaria aunque el botón esté deshabilitado: también protege frente a un doble envío o a un formulario que quedó desactualizado.

**Datos antiguos duplicados:** al leer se conserva la primera cita de cada combinación. No se escribe durante el render; la siguiente creación o cancelación consolida la lista almacenada. Cancelar la primera también elimina sus copias anteriores.

**Alcance real:** la regla se garantiza dentro de la misma pestaña/sesión. `sessionStorage` no es una agenda compartida entre dispositivos o pestañas independientes. Una futura integración deberá garantizar la exclusión también en el backend.

## 7. Biblioteca: del catálogo a la interacción

`data/biblioteca.js` contiene seis tarjetas y sus lecturas. Cada recurso conserva su id y añade `secciones`, un tipo de `actividad` opcional y fuentes cuando corresponde.

`Biblioteca.jsx` filtra las tarjetas y enlaza a `DetalleRecurso.jsx`. La ruta admite acceso directo y recarga; un id inexistente muestra la página 404.

| Recurso | Qué puede hacer el usuario |
|---|---|
| Arcanos mayores para empezar | Leer y explorar las 22 cartas. |
| Cómo preparar una tirada simple | Seguir los pasos y sacar una carta al azar. |
| Origen simbólico del Tarot | Leer y consultar fuentes de museos. |
| Diario de lecturas | Crear, recuperar, editar y eliminar anotaciones. |
| Lectura intuitiva responsable | Leer propuestas y pasar al diario. |
| Tarot y arte editorial | Leer, comparar imágenes y consultar una fuente. |

`ExploradorArcanos.jsx` cambia la carta con un selector, botones anterior/siguiente y selección aleatoria. Las fichas se editan en `data/arcanos.js`; las imágenes ya existían en el proyecto. Las preguntas son propuestas de reflexión, no predicciones.

`DiarioLecturas.jsx` controla el formulario y los mensajes. `bibliotecaService.js` valida y guarda en `tarot-react-diario`. Una entrada sin id crea un UUID; con id reemplaza la entrada anterior. Eliminar exige confirmar en un modal. React presenta el texto como contenido y no lo interpreta como HTML.

## 8. Video de Nosotros

El archivo está en `public/Videos/Tarot-1-minuto.mp4`. Antes se solicitaba `/videos/…`, con distinta capitalización. La ruta corregida conserva `Videos` y utiliza `import.meta.env.BASE_URL` para construir el enlace al recurso público.

El elemento `video` ofrece controles, `playsInline` y carga inicial de metadatos. El componente muestra un error si la carga falla y ofrece un enlace para abrir el MP4. El archivo original no se sustituyó ni transcodificó.

## 9. Las dos nuevas experiencias

Se añaden en `src/data/experiencias.js` con ids `4` y `5`. Inicio, catálogo, detalles y carrito utilizan ese arreglo, por lo que comparten nombres, precios e imágenes.

| Experiencia | Precio de demostración | Duración de demostración | Imagen en `public/imagenes/` |
|---|---:|---|---|
| Terapia con la cruz ankh | $4.990 CLP | 30 minutos | `experiencia-cruz-ankh.png` |
| Preguntas sí o no con péndulo | $1.990 CLP | 15 minutos | `experiencia-pendulo.png` |

Estos valores fueron elegidos para completar la demostración porque no se habían indicado tarifas. Puedes cambiarlos en el catálogo. Se incorporan como experiencias pagadas siguiendo el flujo existente: **no implementan una consulta remota, tratamiento ni servicio real después de la compra**. El origen y los prompts de las imágenes están en `IMAGENES_NUEVAS.md`.

## 10. Recorrido del carrito y la compra

`DetalleProducto` o `DetalleExperiencia` → `useCarrito().agregar` → `carritoService.agregarItem` → `guardarSesion` → `setLineas` → actualización del carrito y del encabezado.

Una línea se identifica por tipo e id. Añadirla nuevamente incrementa su cantidad. Los productos físicos tienen stock; las experiencias tienen `stock: null`. La experiencia gratuita no entra al carrito.

En `FinalizarCompra`, la dirección es obligatoria solo si hay productos y se elige despacho. El pedido se guarda antes de vaciar el carrito. `PedidoConfirmado` lee una copia del último pedido. No se procesan cobros.

## 11. Almacenamiento: dónde buscar los datos

En las herramientas del navegador: **Application/Aplicación → Session Storage → origen del sitio**.

| Clave | Responsable |
|---|---|
| `tarot-react-usuario` | `sesionService.js`: nombre y correo. |
| `tarot-react-carrito` | `carritoService.js`: líneas de compra. |
| `tarot-react-pedidos` | `pedidoService.js`: historial simulado. |
| `tarot-react-ultimo-pedido` | `pedidoService.js`: comprobante más reciente. |
| `tarot-react-reservas` | `reservaService.js`: citas y disponibilidad local. |
| `tarot-react-diario` | `bibliotecaService.js`: anotaciones de biblioteca. |

`storageService.js` transforma objetos a JSON al guardar y los reconstruye al leer. Devuelve un respaldo cuando la lectura falla o el JSON está dañado. Los errores de escritura se propagan para que el flujo pueda informar que no guardó.

Recargar la misma pestaña conserva los datos. Cerrar la sesión de navegación puede eliminarlos. Cerrar sesión mediante el menú elimina la identidad del usuario, conservando el comportamiento previo del carrito y las reservas de esa pestaña; el diario sigue el mismo alcance local. No hay aislamiento de datos por cuenta real.

## 12. Estilos e imágenes

`src/index.css` define variables globales, tipografías y base visual. `src/styles/ritual.css` desarrolla héroes, tarjetas, formularios, navegación, carrito y actividades. Busca por el `className` que ves en JSX para encontrar su regla CSS. Los bloques `@media` adaptan la disposición al ancho de pantalla.

Los componentes Bootstrap aportan estructura y comportamiento; variantes propias como `ritual` y `ritual-outline` reciben sus colores y bordes desde el CSS del proyecto.

`public/imagenes` contiene cartas, héroes y objetos. `public/Videos` contiene el video. La URL pública no incluye la palabra `public`. El ouróboros oficial se mantiene sin cambios.

## 13. Demostración sugerida para la evaluación

1. Abre `App.jsx` y navega de Inicio a Experiencias para mostrar la relación ruta-componente.
2. Enseña una experiencia nueva y su objeto en `data/experiencias.js`.
3. Agrégala al carrito y explica contexto → servicio → storage → render.
4. Compra solo experiencias: muestra que no se solicita domicilio y que el pedido queda guardado.
5. Ingresa a Agenda, reserva una cita y vuelve al mismo profesional/día: el horario queda ocupado.
6. Cancela en Mis reservas y vuelve a Agenda: el horario queda disponible.
7. Abre un recurso, cambia de arcano, guarda una lectura y recarga la página.
8. Reproduce el video de Nosotros y muestra su ruta exacta.
9. Ejecuta `npm test`, `npm run lint` y `npm run build`.

Puedes buscar palabras como `RUTA`, `ESTADO COMPARTIDO`, `REGLAS`, `CATÁLOGO`, `crearReserva` o `guardarEntrada` en VS Code para encontrar rápidamente las explicaciones del código.
