// Obtener el ID de producto almacenado en el localStorage
var prodID = localStorage.getItem("prodID");
let URL_prod = `https://japceibal.github.io/emercado-api/products/${prodID}.json`;
let URL_com = `https://japceibal.github.io/emercado-api/products_comments/${prodID}.json`;
// Hacer la solicitud fetch para obtener la información del producto
fetchData(URL_prod);
fetchData(URL_com);
//Funcion para cargar contenidos.
function fetchData(url){
    fetch(url)
    .then(response=> response.json())
    .then(data => {
        console.log(data)
    })
    .catch(function(error) {
        console.error(error);
    });
}
