// Obtener el ID de producto almacenado en el localStorage
var prodID = localStorage.getItem("prodID");
let URL_prod = `https://japceibal.github.io/emercado-api/products/${prodID}.json`;
let URL_com = `https://japceibal.github.io/emercado-api/products_comments/${prodID}.json`;
// Hacer la solicitud fetch para obtener la información del producto
fetchData(URL_prod);
//fetchCom(URL_com);
//Funcion para cargar contenidos.
function fetchData(url){//Esta es para mostrar imagenes
    fetch(url)
    .then(response=> response.json())
    .then(data => {
        console.log(data);
        showProductGalery(data);
        //showProductDescription(data);
    })
    .catch(function(error) {
        console.log(error);
    });
}
function fetchCom(url){//Esta es para los comentarios
    fetch(url)
    .then(response=> response.json())
    .then(data => {
        console.log(data);
        //showProductInfo(data);
    })
    .catch(function(error) {
        console.log(error);
    });
}

function showProductGalery(data){//Muestra galeria de imagenes.
    let cont = document.getElementById('contenedor');
    cont.innerHTML+= `
    <h1>${data.name}</h1>
    <div class='imgList' id='imList'></div>
    <div class='showImg' id='showImg'></div>
    <div class='prodInfo'></div>
    `;
    showImgList(data);
}
function showImgList(data){//Agrega imagenes a la lista.
    let imgList= document.getElementById('imList');
    for(let one of data.images){
        imgList.innerHTML+=`<img src='${one}' onclick='expose("${one}")'>`;
    }
}
function expose(img){//Muestra las imagenes ampliadas.
    let screen= document.getElementById('showImg');
    screen.innerHTML = `<img src=${img}>`;
}
function showProductDescription(data){
    let cont = document.getElementById('contenedor');
}