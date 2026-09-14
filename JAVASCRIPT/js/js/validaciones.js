const DOMINIOS_VALIDOS = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];

function setError(input, spanId, mensaje) {
  const span = document.getElementById(spanId);
  if (span) span.textContent = mensaje || "";
  input.classList.toggle("invalid", !!mensaje);
}

function validarCorreo(valor) {
  if (!valor) return "El correo es obligatorio.";
  if (valor.length > 100) return "Máximo 100 caracteres.";
  if (!DOMINIOS_VALIDOS.some(d => valor.endsWith(d)))
    return "Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com";
  return "";
}

// ---------- REGISTRO ----------
const formReg = document.getElementById("form-registro");
if (formReg) {
  const campos = ["nombre", "correo", "correo2", "password", "password2", "region", "comuna"];
  campos.forEach(id => {
    document.getElementById(id).addEventListener("input", () => validarCampoRegistro(id));
  });

  function validarCampoRegistro(id) {
    const el = document.getElementById(id);
    let err = "";
    switch (id) {
      case "nombre":
        if (!el.value.trim()) err = "El nombre es obligatorio.";
        else if (el.value.length > 100) err = "Máximo 100 caracteres.";
        break;
      case "correo":
      case "correo2":
        err = validarCorreo(el.value.trim());
        if (id === "correo2" && !err && el.value !== document.getElementById("correo").value)
          err = "Los correos no coinciden.";
        break;
      case "password":
        if (!el.value) err = "La contraseña es obligatoria.";
        else if (el.value.length < 4 || el.value.length > 10)
          err = "Debe tener entre 4 y 10 caracteres.";
        break;
      case "password2":
        if (el.value !== document.getElementById("password").value)
          err = "Las contraseñas no coinciden.";
        break;
      case "region":
        if (!el.value) err = "Selecciona una región.";
        break;
      case "comuna":
        if (!el.value) err = "Selecciona una comuna.";
        break;
    }
    setError(el, "error-" + id, err);
    return !err;
  }

  formReg.addEventListener("submit", (e) => {
    e.preventDefault();
    const ok = campos.map(validarCampoRegistro).every(Boolean);
    if (ok) {
      alert("¡Registro exitoso! Bienvenido/a ✨");
      formReg.reset();
    } else {
      document.querySelector(".invalid")?.focus();
    }
  });
}

// ---------- LOGIN ----------
const formLogin = document.getElementById("form-login");
if (formLogin) {
  const validar = (id) => {
    const el = document.getElementById(id);
    let err = "";
    if (id === "correo") err = validarCorreo(el.value.trim());
    if (id === "password" && (el.value.length < 4 || el.value.length > 10))
      err = "Entre 4 y 10 caracteres.";
    setError(el, "error-" + id, err);
    return !err;
  };
  ["correo", "password"].forEach(id =>
    document.getElementById(id).addEventListener("input", () => validar(id))
  );
  formLogin.addEventListener("submit", (e) => {
    e.preventDefault();
    if (validar("correo") && validar("password")) alert("Sesión iniciada ✨");
  });
}

// ---------- CONTACTO ----------
const formContacto = document.getElementById("form-contacto");
if (formContacto) {
  const comentario = document.getElementById("comentario");
  const contador = document.getElementById("contador");
  comentario.addEventListener("input", () => contador.textContent = comentario.value.length);

  const validar = (id) => {
    const el = document.getElementById(id);
    let err = "";
    if (id === "nombre") {
      if (!el.value.trim()) err = "El nombre es obligatorio.";
      else if (el.value.length > 100) err = "Máximo 100 caracteres.";
    }
    if (id === "correo") err = validarCorreo(el.value.trim());
    if (id === "comentario") {
      if (!el.value.trim()) err = "El comentario es obligatorio.";
      else if (el.value.length > 500) err = "Máximo 500 caracteres.";
    }
    setError(el, "error-" + id, err);
    return !err;
  };
  ["nombre", "correo", "comentario"].forEach(id =>
    document.getElementById(id).addEventListener("input", () => validar(id))
  );
  formContacto.addEventListener("submit", (e) => {
    e.preventDefault();
    if (["nombre","correo","comentario"].map(validar).every(Boolean)) {
      alert("Mensaje enviado. ¡Gracias por escribirnos!");
      formContacto.reset();
      contador.textContent = "0";
    }
  });
}