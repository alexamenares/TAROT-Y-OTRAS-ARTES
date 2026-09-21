/**
 * Componentes visuales comunes de la identidad Ritual nocturno.
 *
 * Este archivo evita copiar el mismo código de marca, avisos temporales y
 * confirmaciones en cada HTML. Las páginas llaman a InterfazRitual para
 * informar una acción o pedir confirmación sin conocer su implementación.
 */
(function iniciarInterfazRitual() {
  /**
   * Inserta el PNG aprobado junto al texto de marca. La comprobación inicial
   * evita duplicar el emblema si una página carga el script más de una vez.
   */
  function decorarMarca() {
    document.querySelectorAll(".marca-sitio, .marca-footer").forEach((marca) => {
      if (marca.querySelector(".icono-ouroboro")) {
        return;
      }

      const textoMarca = marca.textContent.trim();
      marca.textContent = "";

      const icono = document.createElement("img");
      icono.className = "icono-ouroboro";
      icono.src = "imagenes/ouroboro-identidad-original.png";
      icono.alt = marca.classList.contains("marca-sitio")
        ? "Ouróboro de Tarot y Otras Artes"
        : "";
      marca.appendChild(icono);

      const texto = document.createElement("span");
      texto.textContent = textoMarca;
      marca.appendChild(texto);
    });
  }

  /**
   * Crea una región aria-live reutilizable. Los avisos complementan un mensaje
   * visible, pero no deben ser la única forma de comunicar un resultado.
   */
  function crearSnackbar() {
    let snackbar = document.getElementById("snackbarRitual");

    if (snackbar) {
      return snackbar;
    }

    snackbar = document.createElement("div");
    snackbar.id = "snackbarRitual";
    snackbar.className = "snackbar-ritual";
    snackbar.setAttribute("role", "status");
    snackbar.setAttribute("aria-live", "polite");
    snackbar.setAttribute("aria-atomic", "true");
    document.body.appendChild(snackbar);

    return snackbar;
  }

  let temporizadorSnackbar = null;

  /**
   * Muestra un aviso breve. Reiniciar el temporizador permite que un mensaje
   * nuevo tenga su tiempo completo de lectura en vez de desaparecer enseguida.
   */
  function mostrarSnackbar(mensaje, tipo = "exito") {
    const snackbar = crearSnackbar();
    snackbar.textContent = mensaje;
    snackbar.dataset.tipo = tipo;
    snackbar.classList.add("visible");

    window.clearTimeout(temporizadorSnackbar);
    temporizadorSnackbar = window.setTimeout(() => {
      snackbar.classList.remove("visible");
    }, 4200);
  }

  /**
   * Convierte data-href en navegación para componentes Material. Usar un
   * atributo de datos permite mantener el botón Material y conservar teclado.
   */
  function configurarNavegacionMaterial() {
    document.addEventListener("click", (evento) => {
      const accion = evento.target.closest("[data-href]");
      if (accion?.dataset.href) window.location.assign(accion.dataset.href);
    });

    document.addEventListener("keydown", (evento) => {
      const accion = evento.target.closest("[data-href]");
      if (accion && (evento.key === "Enter" || evento.key === " ")) {
        evento.preventDefault();
        window.location.assign(accion.dataset.href);
      }
    });
  }

  /**
   * Construye un único diálogo Material reutilizable. Así quitar, cambiar
   * estado u otra acción delicada mantienen una confirmación consistente.
   */
  function crearDialogo() {
    let dialogo = document.getElementById("dialogoRitual");

    if (dialogo) {
      return dialogo;
    }

    dialogo = document.createElement("md-dialog");
    dialogo.id = "dialogoRitual";
    dialogo.className = "dialogo-ritual";
    dialogo.type = "alert";
    dialogo.innerHTML = `
      <div slot="headline" id="tituloDialogoRitual">¿Deseas continuar?</div>
      <form slot="content" id="formularioDialogoRitual" method="dialog">
        <p class="etiqueta-dialogo">Confirmar acción</p>
        <p id="textoDialogoRitual"></p>
      </form>
      <div slot="actions" class="acciones-dialogo">
        <md-text-button
          form="formularioDialogoRitual"
          value="cancelar"
        >Cancelar</md-text-button>
        <md-filled-button
          form="formularioDialogoRitual"
          value="confirmar"
          autofocus
        >Confirmar</md-filled-button>
      </div>
    `;
    document.body.appendChild(dialogo);

    return dialogo;
  }

  /**
   * Limita la espera de un componente externo para que una acción local nunca quede bloqueada.
   */
  async function esperarComponente(etiqueta, tiempoMaximo = 1200) {
    if (customElements.get(etiqueta)) {
      return true;
    }

    return Promise.race([
      customElements.whenDefined(etiqueta).then(() => true),
      new Promise((resolver) => {
        window.setTimeout(() => resolver(false), tiempoMaximo);
      }),
    ]);
  }

  /**
   * Devuelve una promesa para esperar una decisión humana antes de seguir. Si
   * Material no carga, window.confirm mantiene operativo el flujo del MVP.
   */
  async function confirmar({ titulo, mensaje, textoConfirmar = "Confirmar" }) {
    /* Si Material no carga, el diálogo nativo mantiene operativa la administración. */
    const materialDisponible = await esperarComponente("md-dialog");

    if (!materialDisponible) {
      return window.confirm(`${titulo}\n\n${mensaje}`);
    }

    const dialogo = crearDialogo();
    const tituloDialogo = dialogo.querySelector("#tituloDialogoRitual");
    const textoDialogo = dialogo.querySelector("#textoDialogoRitual");
    const botonConfirmar = dialogo.querySelector('[value="confirmar"]');

    tituloDialogo.textContent = titulo;
    textoDialogo.textContent = mensaje;
    botonConfirmar.textContent = textoConfirmar;

    return new Promise((resolver) => {
      const finalizar = () => {
        resolver(dialogo.returnValue === "confirmar");
      };

      dialogo.addEventListener("closed", finalizar, { once: true });
      dialogo.show();
    });
  }

  decorarMarca();
  configurarNavegacionMaterial();

  window.InterfazRitual = {
    confirmar,
    mostrarSnackbar,
  };
})();
