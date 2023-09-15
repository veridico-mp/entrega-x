// Obtener el ID de producto almacenado en el localStorage
var prodID = localStorage.getItem("prodID");
let URL_prod = `https://japceibal.github.io/emercado-api/products/${prodID}.json`;
let URL_com = `https://japceibal.github.io/emercado-api/products_comments/${prodID}.json`;

// Hacer la solicitud fetch para obtener la información del producto
fetchData(URL_prod);

// Función para cargar contenidos.
function fetchData(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      showProductGallery(data);
      showProductDescription(data);
      showRelatedProducts(data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

// Función para cargar comentarios.
function fetchComments(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      showProductComments(data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function showProductGallery(data) {
  let galleryContainer = document.getElementById("gallery");
  galleryContainer.innerHTML = ""; // Limpia el contenido anterior si lo hubiera

  for (let image of data.images) {
    let imageElement = document.createElement("img");
    imageElement.src = image;
    galleryContainer.appendChild(imageElement);
  }
}

function showProductDescription(data) {
  let descriptionContainer = document.getElementById("description");
  descriptionContainer.innerHTML = `
    <h1>${data.name}</h1>
    <p>${data.description}</p>
    <p>Precio: ${data.currency} ${data.cost}</p>
    <p>Stock: ${data.soldCount}</p>
  `;
}

function showRelatedProducts(data) {
  let relatedProductsContainer = document.getElementById("related-products");
  relatedProductsContainer.innerHTML = "<h2>Productos Relacionados:</h2>";

  for (let relatedProduct of data.relatedProducts) {
    let productElement = document.createElement("div");
    productElement.classList.add("related-product");

    productElement.innerHTML = `
      <h3>${relatedProduct.name}</h3>
      <img src="${relatedProduct.image}" alt="${relatedProduct.name}">
    `;

    relatedProductsContainer.appendChild(productElement);
  }
}

function showProductComments(data) {
  let commentsContainer = document.getElementById("comments");
  commentsContainer.innerHTML = ""; // Limpia el contenido anterior si lo hubiera

  for (let comment of data) {
    let commentElement = document.createElement("div");
    commentElement.classList.add("comment");

    commentElement.innerHTML = `
      <h3>Comentario:</h3>
      <p>Puntuación: ${comment.score}</p>
      <p>Usuario: ${comment.user}</p>
      <p>Descripción: ${comment.description}</p>
      <p>Fecha y hora: ${comment.dateTime}</p>
    `;

    commentsContainer.appendChild(commentElement);
  }
}

// Llamamos a la función para cargar los comentarios
fetchComments(URL_com);
