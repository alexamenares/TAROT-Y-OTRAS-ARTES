# Cambios V3 — Agenda y recursos visuales

## Objetivo

Esta versión reemplaza las imágenes genéricas de Tarot que se mostraban en la Agenda por imágenes conceptuales asociadas a cada especialidad. Las imágenes no representan rostros de profesionales reales, por lo que pueden mantenerse aunque cambien las personas que presten el servicio.

## Imágenes de Agenda

| Especialidad | Archivo |
|---|---|
| Tarotista | `src/assets/imagenes/profesionales/tarotista-alma-rojas.png` |
| Terapeuta | `src/assets/imagenes/profesionales/terapeuta-elena-silva.png` |
| Lector de runas | `src/assets/imagenes/profesionales/lector-runas-matias-leon.png` |
| Psicóloga | `src/assets/imagenes/profesionales/psicologa-camila-soto.png` |
| Consteladora familiar | `src/assets/imagenes/profesionales/consteladora-sofia-morales.png` |

El archivo `src/data/profesionales.js` relaciona cada perfil simulado con su imagen conceptual.

## Recursos en `src/assets`

La carpeta `public` fue retirada del proyecto. Ahora todas las imágenes, íconos y el video están dentro de `src/assets`:

```text
src/assets/
  imagenes/
  Videos/
  favicon.svg
  icons.svg
```

`vite.config.js` declara `src/assets` como `publicDir`. Esto permite seguir usando rutas como `/imagenes/...` y `/Videos/...`, pero mantiene todos los recursos reunidos dentro de la carpeta `assets` del proyecto.

## Verificación realizada

Se ejecutaron satisfactoriamente:

```bash
npm run lint
npm test
npm run build
```

## Prueba manual recomendada

1. Ejecutar `npm run dev`.
2. Ingresar o registrarse para habilitar la ruta **Agenda**.
3. Seleccionar cada especialidad y comprobar que aparece una imagen conceptual distinta.
4. Confirmar que el video de la sección Nosotros se reproduce correctamente.
5. Comprobar que siguen cargando las imágenes de productos, cartas y heroes.
