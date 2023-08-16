const nombre = document.getElementById('nombre');
const pass = document.getElementById('pass');

document.addEventListener('DOMContentLoaded', ()=>{
    let btn = document.getElementById('logg');

    btn.addEventListener('click', ()=>{
        if (checkCont()){
            location.href('index.html');
        }else{
            alert("Ninguno de los campos puede estar vacio");
        }

    })
    
})

function checkCont(){
    if (nombre.value === "" && pass.value=== ""){
        alert("Ninguno de los campos puede estar vacio");
    }else {
        return true;
    }
}