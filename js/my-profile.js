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

// Script para validaciones del perfil y guardar en el local Storage

document.addEventListener('DOMContentLoaded', () => {

  let botonConfirmarCambios = document.getElementById('guardarCambios');
  
  let datosUsuario = {};

  botonConfirmarCambios.addEventListener('click', () => {

  let mensajeDeErrorNombre = document.getElementById('mensajeErrorNombre');
  let mensajeDeErrorApellido = document.getElementById('mensajeErrorApellido');
  let mensajeDeErrorTelefono = document.getElementById('mensajeErrorTelefono');
  let alerta = document.getElementById('alerta');
    
    let firstName = document.getElementById('primerNombre').value;
    let firstLastName = document.getElementById('primerApellido').value;
    let secondName = document.getElementById('segundoNombre').value;
    let secondLastName = document.getElementById('segundoApellido').value;
    let correo = document.getElementById('email').value;
    let phone = document.getElementById('telefono').value;

    mensajeDeErrorNombre.textContent = " ";
    mensajeDeErrorApellido.textContent = " ";
    mensajeDeErrorTelefono.textContent = " ";

    if (firstName === "") {
      mensajeDeErrorNombre.textContent = 'Por favor, debe ingresar un nombre';
    } else {
      localStorage.setItem("name", firstName);
    }

    if (firstLastName === "") {
      mensajeDeErrorApellido.textContent = 'Por favor, debe ingresar un apellido';
    } else {
      localStorage.setItem("lastName", firstLastName);
    }

    if (phone === "") {
      mensajeDeErrorTelefono.textContent = 'Por favor, debe ingresar un teléfono de contacto';
    } else {
      localStorage.setItem("Telefono", phone);
    }

    if (secondName !== "" && secondLastName !== "" && correo !== "") {
      datosUsuario = {
        segundoNombre: secondName,
        segundoApellido: secondLastName,
        email: correo
      };
      localStorage.setItem('datosdelUsuario', JSON.stringify(datosUsuario));
    };
    
    // Mostrar alerta de Bootstrap
    console.log(alerta);
    alerta.classList.add('show');

  });
});
