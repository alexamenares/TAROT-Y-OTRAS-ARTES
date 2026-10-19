# Pruebas unitarias con Vitest

Este proyecto incorpora cuatro pruebas unitarias de componentes React para la
segunda evaluación. El archivo principal de pruebas es
`src/tests/componentes.test.jsx`.

## Ejecutar las pruebas

Desde la carpeta raíz del proyecto:

```bash
npm install
npm test
```

El resultado esperado de `npm test` es que Vitest indique **4 pruebas aprobadas
y 0 fallas**.

Para dejar Vitest observando cambios mientras se programa:

```bash
npm run test:watch
```

El proyecto también conserva pruebas anteriores de servicios. Son evidencia
adicional y se ejecutan por separado:

```bash
npm run test:servicios
```

## Las cuatro pruebas requeridas

1. **TarjetaProducto:** comprueba que una tarjeta muestre los datos recibidos
   por `props` y cree el enlace correcto al detalle.
2. **ControlCantidad:** simula clics y verifica que la cantidad visible cambie
   sin bajar de 1 ni superar el máximo definido.
3. **Ingresar:** escribe un correo inválido y verifica que aparezca el mensaje
   de validación sin iniciar una sesión.
4. **RutaProtegida:** intenta entrar a `/agenda` sin sesión y verifica que se
   redirija a `/ingresar`, recordando la ruta solicitada.

## Archivos de configuración

- `vitest.config.js`: configura Vitest, React y el navegador simulado `jsdom`.
- `src/tests/setup.js`: carga las aserciones de `jest-dom` y limpia el DOM
  después de cada prueba.
- `src/tests/componentes.test.jsx`: contiene los cuatro casos de prueba.

El documento entregable `INFORME_PRUEBAS_UNITARIAS_VITEST.docx` amplía esta
información y está pensado para adjuntarlo a los demás documentos del proyecto.
