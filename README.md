# 🔮 Tarot y Otras Artes

### Tienda online de experiencias y productos esotéricos

**Frontend v4.0 — Ritual Nocturno**

Repositorio oficial del proyecto **Tarot y Otras Artes**, una aplicación web frontend desarrollada como una tienda online temática que combina experiencias de tarot, productos físicos, biblioteca de recursos y artículos de blog dentro de una identidad visual inspirada en un **"Ritual nocturno"**.

---

## 🌙 Descripción del proyecto

**Tarot y Otras Artes** es un proyecto frontend desarrollado con tecnologías web estándar, orientado a representar la experiencia de una tienda online especializada en tarot y otras prácticas relacionadas.

La versión actual corresponde a **Frontend v4.0**, que incorpora mejoras de interfaz, organización del código, carrito de compras, formularios, validaciones, administración simulada y adaptación responsive.

El proyecto está desarrollado completamente del lado del cliente, por lo que las funcionalidades de compra, administración y persistencia corresponden a una **simulación frontend**.

---

## ✨ Funcionalidades principales

### 🃏 Experiencias

* Catálogo de experiencias.
* Visualización del detalle de cada experiencia.
* Experiencias gratuitas que pueden iniciarse directamente.
* Experiencias pagadas que pueden agregarse al carrito.

### 🛍️ Tienda

* Catálogo de productos físicos.
* Visualización del detalle de productos.
* Filtrado por categorías.
* Agregar productos al carrito.
* Modificación de cantidades.
* Eliminación de productos.
* Cálculo de subtotales y total provisional.

### 🛒 Carrito

* Carrito único para experiencias pagadas y productos.
* Persistencia mediante `localStorage`.
* Actualización de cantidades.
* Eliminación de elementos.
* Migración de una selección anterior al carrito.
* Contador de elementos en la navegación.
* Confirmación antes de acciones determinadas.

### 📦 Compra simulada

* Proceso de checkout.
* Selección entre **Retiro** y **Despacho**.
* Cálculo del costo de despacho.
* Confirmación del pedido.
* Generación de información del pedido.
* Vaciamiento del carrito después de confirmar la compra.

> El proceso de compra es completamente simulado y no incluye pagos reales.

### 📚 Biblioteca

* Catálogo de recursos.
* Filtrado de recursos por categoría.

### ✍️ Blog

Incluye artículos relacionados con tarot, entre ellos:

* Preparación de cartas.
* Tirada diaria.

### 📩 Formularios

El proyecto incluye formularios de:

* Contacto.
* Registro.
* Inicio de sesión.
* Administración.

Los formularios cuentan con validaciones y mensajes de retroalimentación para el usuario.

### ⚙️ Administración

El proyecto incorpora un panel de administración simulado que permite:

* Visualizar contenidos.
* Cambiar estados.
* Crear borradores simulados.

> La administración no corresponde a un sistema real de autenticación o gestión de usuarios.

---

## 🎨 Diseño visual

La interfaz utiliza una identidad visual denominada **"Ritual nocturno"**, basada en una combinación de:

* Tonos oscuros.
* Tonos dorados.
* Tonos pergamino.
* Tipografías serif.
* Componentes de tarjetas.
* Elementos visuales relacionados con tarot y esoterismo.

El diseño busca mantener una identidad visual consistente entre las diferentes páginas del proyecto.

---

## 📱 Diseño responsive

El proyecto incorpora adaptación responsive para distintos tamaños de pantalla.

Se consideran principalmente:

* 🖥️ Escritorio.
* 💻 Notebook.
* 📱 Dispositivos móviles.

La navegación, tarjetas, catálogos, formularios y contenido se adaptan mediante CSS responsive.

---

## 🗂️ Estructura del proyecto

```text
TAROT-Y-OTRAS-ARTES/
│
├── Videos/
│
├── css/
│   ├── estilos.css
│   └── ...
│
├── imagenes/
│   └── ...
│
├── js/
│   ├── ...
│   └── carrito-servicio.js
│
├── index.html
├── experiencias.html
├── detalle-experiencia.html
├── tienda.html
├── detalle-producto.html
├── carrito.html
├── finalizar-compra.html
├── pedido-confirmado.html
├── mi-seleccion.html
│
├── biblioteca.html
│
├── blog.html
├── blog-preparar-cartas.html
├── blog-tirada-diaria.html
│
├── nosotros.html
├── contacto.html
├── registro.html
├── login.html
├── admin.html
│
├── ESPECIFICACION_REDISENO_MATERIAL3_RITUAL_NOCTURNO.md
├── GUIA_LECTURA_CODIGO_VERSION_4_0.md
├── INFORME_IMPLEMENTACION_VERSION_2_0.md
├── INFORME_IMPLEMENTACION_VERSION_3_0.md
├── INFORME_IMPLEMENTACION_VERSION_4_0.md
├── PLAN_PRUEBAS_MANUALES_VERSION_2_0.md
├── PLAN_PRUEBAS_MANUALES_VERSION_3_0.md
├── PLAN_PRUEBAS_MANUALES_VERSION_4_0.md
├── README_VERSION_2_0.md
├── README_VERSION_3_0.md
└── README_VERSION_4_0.md
```

---

## 🛠️ Tecnologías utilizadas

* **HTML5**
* **CSS3**
* **JavaScript**
* **Bootstrap 5.3.8**
* **Material Web**
* **Google Fonts**
* **LocalStorage**
* **Visual Studio Code**
* **Live Server**

El proyecto está pensado para ejecutarse como frontend estático, sin requerir un proceso de compilación o backend.

---

## 💾 Persistencia

La persistencia del proyecto se realiza mediante `localStorage`.

Esto permite mantener información del carrito y otros datos definidos por el funcionamiento del frontend mientras el usuario trabaja dentro del mismo navegador y origen.

No se almacenan datos sensibles.

---

## 🔐 Alcance de seguridad

Esta versión corresponde exclusivamente a un proyecto frontend académico.

Por lo tanto, **no incluye**:

* Backend.
* Base de datos.
* JWT.
* Autenticación real.
* Roles gestionados por servidor.
* Pasarela de pago real.
* Procesamiento de tarjetas.
* Envío real de correos.
* Gestión real de stock.
* Persistencia en servidor.

Las funciones que representan estas características son únicamente simulaciones de interfaz.

---

## ▶️ Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/alexamenares/TAROT-Y-OTRAS-ARTES.git
```

### 2. Abrir el proyecto

Abrir la carpeta del proyecto en **Visual Studio Code**.

### 3. Ejecutar con Live Server

Abrir `index.html` utilizando **Live Server**.

El proyecto está diseñado para ejecutarse directamente desde un servidor estático local.

---

## 📋 Documentación

El repositorio incluye documentación correspondiente a las diferentes versiones del proyecto.

### Versión 4.0

* `README_VERSION_4_0.md`
* `INFORME_IMPLEMENTACION_VERSION_4_0.md`
* `PLAN_PRUEBAS_MANUALES_VERSION_4_0.md`
* `GUIA_LECTURA_CODIGO_VERSION_4_0.md`
* `ESPECIFICACION_REDISENO_MATERIAL3_RITUAL_NOCTURNO.md`

También se conservan los documentos correspondientes a las versiones anteriores para mantener el historial y evolución del proyecto.

---

## 🧪 Pruebas

El repositorio contiene planes de pruebas manuales asociados a las diferentes versiones:

* `PLAN_PRUEBAS_MANUALES_VERSION_2_0.md`
* `PLAN_PRUEBAS_MANUALES_VERSION_3_0.md`
* `PLAN_PRUEBAS_MANUALES_VERSION_4_0.md`

Estos documentos permiten revisar y comprobar el comportamiento de las funcionalidades implementadas.

---

## 👥 Equipo

**Tarot y Otras Artes**

* Alexandra Menares
* Esteban Valenzuela

---

## 📌 Versión actual

**Frontend v4.0**

Última versión del proyecto utilizada para la evaluación actual.

---

## 🔗 Repositorio

[GitHub — TAROT Y OTRAS ARTES](https://github.com/alexamenares/TAROT-Y-OTRAS-ARTES.git)

---

## 📄 Licencia

Proyecto desarrollado con fines académicos.
