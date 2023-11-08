document.addEventListener("DOMContentLoaded", function() {
  const nombreInput = document.getElementById("nombre");
  const apellidoInput = document.getElementById("apellido");
  const nombre2Input = document.getElementById("nombre2");
  const apellido2Input = document.getElementById("apellido2");
  const emailInput = document.getElementById("email");
  const telefonoInput = document.getElementById("telefono");
  const userProfileForm = document.querySelector(".form-group");
  


  const storedData = JSON.parse(localStorage.getItem("userProfileData")) || {};
    nombreInput.value = storedData.nombre || "";
    segundoNombreInput.value = storedData.segundoNombre || "";
    apellidoInput.value = storedData.apellido || "";
    segundoApellidoInput.value = storedData.segundoApellido || "";
    emailInput.value = storedData.email || "";
    telefonoInput.value = storedData.telefono || "";

    userProfileForm.addEventListener("submit", function() {

      const userData = {
        nombre: nombreInput.value,
        apellido: apellidoInput.value,
        nombre2: nombre2Input.value,
        apellido2: apellido2Input.value,
        email: emailInput.value,
        telefono: telefonoInput.value
      };

      localStorage.setItem("userProfileData", JSON.stringify(userData));
      alert("Datos guardados con éxito.");

    })
  


})




toProfile();

function isLoged() {
  let usuario = localStorage.getItem('nombre');
  if (usuario == '' || usuario == null) {
    return false;
  }
  return true;
}

function toProfile() {
  if (!isLoged()) {
    location.href = 'login.html';
  }
}
