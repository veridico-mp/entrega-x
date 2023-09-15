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
        showMainInfo(data)
        showProductDescription(data);
        showRelatedProducts(data);
        
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

    showImgList(data);
    showSlides(1);
    
}



function showImgList(data){//Agrega imagenes a la lista.
    let imgList= document.getElementById('expImg');
    let imgRow = document.getElementById('row')
    let numImg = 1;
    for(let one of data.images){

        imgList.innerHTML+=`<div class="mySlides">
        <div class="numbertext">${numImg} / ${data.images.length}</div>
        <img src='${one}' onclick='expose("${one}") style="width:100%'>
      </div>`;


      imgRow.innerHTML+= `<div class="column">
      <img class="demo cursor" src="${one}"  onclick="currentSlide(${numImg})" style="width:100%;";" >
        </div>`;


      numImg++;
    }
}
let slideIndex = 1;
showSlides(slideIndex);

// Controles
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("demo");

  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";

}

function showMainInfo(data){
  let des = document.getElementById('mainInfo');
  let prodName = document.getElementById('prodName');
  let prodCost = document.getElementById('prodCost');
  prodName.innerHTML += `${data.name}`
  prodCost.innerHTML += `${data.currency}:  ${data.cost}`
 
}






function showProductDescription(data){
    let des = document.getElementById('descripcion');

    des.innerHTML += `<h2>Descripción:</h2> <br> ${data.description}<br>`;
        console.log(des);    
}

function showRelatedProducts(data){ // Funcion que mostrara los productos relacionados
    let relproduct= document.getElementById('prodRelacionados');
    relproduct.innerHTML += `
    <div class='container form-control' id='relprod'></div>`
    showProductRelacionado(data);
};
function showProductRelacionado(data){ // Esta funcion obtendra los productos del array y luego se llamará dentro de showRelatedProducts
 let relprod = document.getElementById('relprod');
 for (let product of data.relatedProducts){
    relprod.innerHTML += `<h2>Productos Relacionados:</h2> <br> <p>${product.name}</p> <img src=${product.image}>`;
 }
}