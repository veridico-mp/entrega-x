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
