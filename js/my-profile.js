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

// Script para cambiar imagen del perfil

document.addEventListener("DOMContentLoaded", function () {
  // Obtener el elemento de entrada de archivo y el elemento de imagen
  const imagenInput = document.getElementById("imagen");
  const perfilImagen = document.getElementById("perfilImagen");

  // Escuchar cambios en el campo de entrada de archivo
  imagenInput.addEventListener("change", function (event) {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      // Crear una URL del archivo seleccionado
      const imageUrl = URL.createObjectURL(selectedFile);

      // Actualizar la imagen del perfil con la imagen seleccionada
      perfilImagen.src = imageUrl;
    }
  });
});