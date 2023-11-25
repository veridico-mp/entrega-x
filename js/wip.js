document.addEventListener('DOMContentLoaded', ()=>{
    //Boton de registro
    let register = document.getElementById('register');
    //Evento click sobre boton registro
    register.addEventListener('click', ()=>{
        let usuario = document.getElementById('user');
        let email =document.getElementById('email');
        let pass1 = document.getElementById('pass1');
        let pass2 = document.getElementById('pass2');
        let passHex;
        //Compruebo que los campos tengan contenido
        if((usuario.value === null || usuario.value === "") || (pass1.value === null || pass1.value === "") || (pass2.value === null || pass2.value === "") || (email.value === null || email.value === "")){
            alert('Todos los campos deben estar completos.');
        }else {
            if(!(encryptarPass(pass1.value) === encryptarPass(pass2.value))){
                alert('Las contraseñas deben cohincidir.');
            }else {
                console.log(encryptarPass(pass1.value));
                passHex = encryptarPass(pass1.value);
                //Acá se realizará el envio mediante fetch POST del usuario y la constraseña encriptada
                solicitarRegistro(usuario.value, email.value, passHex);
                //Acá se recive la confirmación del registro y se redirige al login
                //verificarUsuario();
            }
        }
        //Resetea los inputs
        usuario.value = null;
        email.value = null;
        pass1.value = null;
        pass2.value = null;
    })
})
//Función para encryptar las contraseñas
function encryptarPass(pass){
    // El método md5 toma una cadena y devuelve un objeto WordArray
    let encryptedPass = CryptoJS.MD5(pass);
    // Convertir el objeto WordArray a una cadena hexadecimal
    let hex = encryptedPass.toString(CryptoJS.enc.Hex);
    return hex;
}
//Funcion que realiza envia los datos del usuario para procesar el registro
function solicitarRegistro(user, mail, pass){
    let url = 'http://127.0.0.1:3000/registro'
    fetch(url, {
        method: 'POST', // Método de la solicitud (POST en este caso)
        headers: {
          'Content-Type': 'application/json', // Tipo de contenido (JSON en este ejemplo)
        },
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
    if(dato.message!=="true"){
        alert(dato.message);
    }else {
        alert("Te has registrado correctamente");
        window.location.href = "login.html";
    }
}
//Solicitud de usuario mediante fetch() method GET
function verificarUsuario(){
    fetch('http://localhost:3000/lectura')
    .then(response=> response.json())
    .then(data=> {console.log(data)})
    .catch(error=> {
        console.error("Error al cargar la informacion", error);
    })
}