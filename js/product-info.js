// Obtener el ID de producto almacenado en el localStorage
var prodID = localStorage.getItem('prodID');
let URL_prod = `https://japceibal.github.io/emercado-api/products/${prodID}.json`;
let URL_com = `https://japceibal.github.io/emercado-api/products_comments/${prodID}.json`;

// Hacer la solicitud fetch para obtener la información del producto
fetchData(URL_prod);

// Función para cargar contenidos.
function fetchData(url) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
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
    .then(response => response.json())
    .then(data => {
      showProductComments(data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function showProductGallery(data) {
  let galleryContainer = document.getElementById('gallery');
  galleryContainer.innerHTML = ''; // Limpia el contenido anterior si lo hubiera

  for (let image of data.images) {
    let imageElement = document.createElement('img');
    imageElement.src = image;
    galleryContainer.appendChild(imageElement);
  }
}

function showProductDescription(data) {
  let descriptionContainer = document.getElementById('description');
  descriptionContainer.innerHTML = `
    <h1>${data.name}</h1>
    <p>${data.description}</p>
    <p>Precio: ${data.currency} ${data.cost}</p>
    <p>Stock: ${data.soldCount}</p>
  `;
}

function showRelatedProducts(data) {
  let relatedProductsContainer = document.getElementById('related-products');
  relatedProductsContainer.innerHTML = '<h2>Productos Relacionados:</h2>';

  for (let relatedProduct of data.relatedProducts) {
    let productElement = document.createElement('div');
    productElement.classList.add('related-product');

    productElement.innerHTML = `
      <h3>${relatedProduct.name}</h3>
      <img src="${relatedProduct.image}" alt="${relatedProduct.name}">
    `;

    relatedProductsContainer.appendChild(productElement);
  }
}

function showProductComments(data) {
  let commentsContainer = document.getElementById('comments');
  commentsContainer.innerHTML = ''; // Limpia el contenido anterior si lo hubiera

  for (let comment of data) {
    let commentElement = document.createElement('div');
    commentElement.classList.add('comment');

    commentElement.innerHTML = `
      <p>Puntuación: ${comment.score}</p>
      <p>${comment.user}</p>
      <p>Descripción: ${comment.description}</p>
      <p>Fecha y hora: ${comment.dateTime}</p>
      <br> <hr>
      
    `;

    commentsContainer.appendChild(commentElement);
  }
}

// Llamamos a la función para cargar los comentarios
fetchComments(URL_com);

// Obtener una referencia al formulario y al contenedor de comentarios
const commentForm = document.getElementById('comment-form');
const commentsContainer = document.getElementById('comments');

// Agregar un evento de envío al formulario
commentForm.addEventListener('submit', function (event) {
  event.preventDefault(); // Evitar que la página se recargue al enviar el formulario

  // Obtener los valores ingresados por el usuario
  let username = localStorage.getItem('nombre');
  let score = Number(document.getElementById('score').value);
  let commentText = document.getElementById('comment').value;

  if (score === -1) {
    alert('Tu comentario debe ir acompañado de una puntuación.');
    return;
  }
  // Validar que se haya ingresado un comentario
  if (commentText.trim() === '') {
    alert('Por favor, ingrese un comentario.');
    return;
  }

  // Obtener la fecha y hora actual
  const now = new Date();
  const formattedDate = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;

  // Crear un nuevo elemento de comentario y agregarlo al contenedor de comentarios
  const newComment = document.createElement('div');
  newComment.className = 'comment';
  newComment.innerHTML = `
    <p>Puntuación: ${score}</p>  
    <p>${username}</p>
    <p>Comentario: ${commentText}</p>
    <p>Fecha y Hora: ${formattedDate}</p>
  `;

  commentsContainer.appendChild(newComment);

  // Limpiar el formulario después de enviar el comentario
  commentForm.reset();
});
