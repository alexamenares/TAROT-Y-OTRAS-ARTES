# Tarot y Otras Artes - React

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
npm run build
```

## Funcionalidades incluidas

- Inicio responsivo con experiencias destacadas y acceso administrativo separado.
- Catálogo y detalle de experiencias.
- Tienda, detalle de producto, carrito, cantidades, stock y eliminación confirmada.
- Checkout con retiro, despacho y comprobante simulado.
- Biblioteca filtrable, blog y dos artículos de detalle.
- Nosotros con video local y Contacto con validación en tiempo real.
- Ingreso y registro simulado; el registro solo se ofrece desde Ingresar.
- Agenda protegida, creación de reservas y cancelación en Mis reservas.
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

Al cerrar la pestaña o limpiar `sessionStorage`, la información simulada puede desaparecer.

## Documentación

- [Informe de migración](docs/INFORME_MIGRACION_REACT.md)
- [Plan de pruebas manuales](docs/PLAN_PRUEBAS_MANUALES.md)
