# Tarot y Otras Artes - React V2

Migración completa del frontend estático de **Tarot y Otras Artes** a una SPA construida con React, Vite, React Router y React Bootstrap. La aplicación conserva el diseño “Ritual nocturno”, las imágenes y el video del proyecto anterior, y simula sus flujos mediante `sessionStorage`.

## Requisitos

- Node.js 20.19 o superior.
- npm 10 o superior.
- Navegador moderno con JavaScript habilitado.

## Ejecución local

```bash
npm install
npm run dev
```

Vite mostrará la dirección local, normalmente `http://localhost:5173/`.

## Verificaciones técnicas

```bash
npm run lint
npm test
npm run format:check
npm run build
```

## Funcionalidades incluidas

- Inicio responsivo con experiencias destacadas y acceso administrativo separado.
- Catálogo y detalle de experiencias.
- Tienda, detalle de producto, carrito, cantidades, stock y eliminación confirmada.
- Checkout con retiro, despacho y comprobante simulado.
- Biblioteca filtrable con seis lecturas completas, explorador de 22 arcanos y diario editable.
- Blog y dos artículos de detalle.
- Nosotros con video local y Contacto con validación en tiempo real.
- Ingreso y registro simulado; el registro solo se ofrece desde Ingresar.
- Agenda protegida con bloqueo de horarios ocupados por profesional, fecha y hora; cancelación que libera el horario.
- Terapia con la cruz ankh y preguntas sí o no con péndulo, con imágenes propias y compra simulada.
- Administración simulada fuera de la navegación pública.
- Página 404 y restablecimiento del desplazamiento al cambiar de ruta.

## Arquitectura

```text
src/
  components/
    atoms/          Elementos pequeños reutilizables.
    molecules/      Tarjetas, héroes y controles compuestos.
    organisms/      Layout, navegación, pie y protección de rutas.
  contexts/         Estado compartido de carrito y sesión.
  data/             Datos simulados reemplazables por una API.
  pages/            Vistas asociadas a las rutas.
  services/         Reglas de negocio y persistencia temporal.
  styles/           Sistema visual responsivo.
  utils/            Formatos y validaciones compartidas.
```

## Persistencia temporal

La aplicación no usa backend, JWT, pagos ni envíos reales. Guarda datos únicamente durante la sesión del navegador bajo estas claves:

- `tarot-react-carrito`
- `tarot-react-usuario`
- `tarot-react-pedidos`
- `tarot-react-ultimo-pedido`
- `tarot-react-reservas`
- `tarot-react-diario`

Al cerrar la pestaña o limpiar `sessionStorage`, la información simulada puede desaparecer.

La disponibilidad se coordina únicamente dentro de la misma sesión de pestaña. No existe aún una agenda compartida entre navegadores ni dispositivos. Los precios y duraciones de las dos experiencias nuevas son de demostración y se editan en `src/data/experiencias.js`.

## Cambios V2

- La agenda revalida disponibilidad antes de guardar y consolida reservas antiguas duplicadas.
- El video respeta la ruta real `public/Videos/Tarot-1-minuto.mp4`; se comprobó su reproducción.
- La biblioteca permite leer, explorar cartas y guardar, editar o eliminar anotaciones.
- JSX, JavaScript y CSS formateados; comentarios explicativos en pantallas, componentes, contextos, datos y servicios.
- `npm run format` permite mantener el formato con Prettier.

## Documentación

- [Guía para explicar el código](docs/GUIA_PARA_EXPLICAR_EL_CODIGO.md)
- [Cambios y verificaciones V2](docs/CAMBIOS_Y_PRUEBAS_V2.md)
- [Origen y prompts de las imágenes nuevas](docs/IMAGENES_NUEVAS.md)
- [Informe de migración](docs/INFORME_MIGRACION_REACT.md)
- [Plan de pruebas manuales](docs/PLAN_PRUEBAS_MANUALES.md)

Los últimos dos documentos describen la entrega original. Para las correcciones y actividades nuevas, consulta primero la documentación V2.
