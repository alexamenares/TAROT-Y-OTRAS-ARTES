/**
 * Actualiza el contador visible de "Mi selección" en el menú.
 * La información se lee desde localStorage para mantener el MVP sin backend.
 */
function obtenerCantidadSeleccionNav() {
  let seleccionGuardada = null;

  try {
    seleccionGuardada = localStorage.getItem("seleccionExperiencias");
  } catch (error) {
    return 0;
  }

  if (seleccionGuardada === null) {
    return 0;
  }

  try {
    const seleccion = JSON.parse(seleccionGuardada);

    if (Array.isArray(seleccion)) {
      return seleccion.length;
    }

    return 0;
  } catch (error) {
    return 0;
  }
}

function actualizarContadorSeleccion() {
  const cantidadSeleccionada = obtenerCantidadSeleccionNav();
  const contadores = document.querySelectorAll("[data-contador-seleccion]");
  const enlacesSeleccion = document.querySelectorAll("[data-link-seleccion]");
  const tieneSeleccion = cantidadSeleccionada > 0;

  contadores.forEach((contador) => {
    contador.textContent = tieneSeleccion ? String(cantidadSeleccionada) : "";
    contador.hidden = !tieneSeleccion;
    contador.setAttribute("aria-hidden", String(!tieneSeleccion));

    if (tieneSeleccion) {
      contador.setAttribute(
        "aria-label",
        `${cantidadSeleccionada} experiencias seleccionadas`,
      );
    } else {
      contador.removeAttribute("aria-label");
    }
  });

  enlacesSeleccion.forEach((enlace) => {
    const iconoSeleccion = enlace.querySelector(".icono-menu-seleccion");

    if (iconoSeleccion) {
      iconoSeleccion.hidden = !tieneSeleccion;
      iconoSeleccion.setAttribute("aria-hidden", String(!tieneSeleccion));
    }

    enlace.classList.toggle("tiene-seleccion", tieneSeleccion);
    enlace.setAttribute(
      "aria-label",
      tieneSeleccion
        ? `Mi selección, ${cantidadSeleccionada} experiencias seleccionadas`
        : "Mi selección",
    );
  });
}

window.actualizarContadorSeleccion = actualizarContadorSeleccion;

window.addEventListener("storage", (evento) => {
  if (evento.key === "seleccionExperiencias") {
    actualizarContadorSeleccion();
  }
});

actualizarContadorSeleccion();
