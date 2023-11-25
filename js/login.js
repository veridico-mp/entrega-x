//Evento de envío al formulario y redirigir
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    form.addEventListener('submit', (event) => {
        event.preventDefault();//Evita que el formulario se envíe por defecto
        let user = document.getElementById('nombre').value;
        let email = document.getElementById('email').value;
        let pass = encryptarPass(document.getElementById('pass').value);
        /*if (checkCont()){
            location.href = 'index.html';
        }*/
        solicitarIngreso(user, email, pass);
    });
});
//verifica si los campos y guaarda si es correcto
function checkCont(a, b) {
    const email = document.getElementById('email').value;

    localStorage.setItem('nombre', a);
    localStorage.setItem('email', email);
    localStorage.setItem('token', b);
}
//Funcion que envia los datos del usuario para procesar el ingreso
function solicitarIngreso(user, mail, pass){
    let url = 'http://127.0.0.1:3000/login'
    fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify({
            user: user,
            email: mail,
            password: pass
        })
    })
    .then(response => response.json())
    .then(data=>{manejoRespuesta(data)})
    .catch(err => console.log(err));
};
//Manejando la respuesta del servidor
function manejoRespuesta(dato){
    if(dato.status!=="ok"){
        alert(dato.message);
    }else {
        checkCont(dato.usuario, dato.token);
        alert(dato.message);
        window.location.href = 'index.html';
    }
}
//Función para encryptar las contraseñas
function encryptarPass(pass){
    // El método md5 toma una cadena y devuelve un objeto WordArray
    let encryptedPass = CryptoJS.MD5(pass);
    // Convertir el objeto WordArray a una cadena hexadecimal
    let hex = encryptedPass.toString(CryptoJS.enc.Hex);
    return hex;
}

/*const labelPass = document.querySelector('label[for="pass"]');
const labelNombre = document.querySelector('label[for="nombre"]');
nombre.addEventListener('input', () => {
    if (nombre.value.trim() !== '') {
        labelNombre.style.transform = 'translateY(-30px)';
    } else {
        labelNombre.style.transform = 'translateY(-50%)';
    }
});
pass.addEventListener('input', () => {
    if (pass.value.trim() !== '') {
        labelPass.style.transform = 'translateY(-30px)';
    } else {
        labelPass.style.transform = 'translateY(-50%)';
    }
});*/
/*nombre.addEventListener('input', () => {
    if (nombre.value.trim() !== '') {
        document.querySelector('label[for="nombre"]').style.transform = 'translateY(-20px)';
    } else {
        document.querySelector('label[for="nombre"]').style.display = 'block';
    }
});
pass.addEventListener('input', () => {
    if (pass.value.trim() !== '') {
        document.querySelector('label[for="pass"]').style.transform = 'translateY(-20px)';
    } else {
        document.querySelector('label[for="pass"]').style.display = 'block';
    }
}); */
