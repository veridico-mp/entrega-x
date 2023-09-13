// Obtener el ID de producto almacenado en el localStorage
var prodID = localStorage.getItem("prodID");

// Comprobar si se ha almacenado un ID de producto
// if (prodID) {
    // Hacer la solicitud fetch para obtener la información del producto
    fetch( `https://japceibal.github.io/emercado-api/products/${prodID}`)
        .then(function(response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Error al obtener la información del producto.");
            }
        })
        .then(function(productInfo) {
            // Aquí puedes utilizar la información del producto obtenida
            console.log(productInfo);
            // Puedes mostrar la información en tu página HTML o realizar cualquier otra acción necesaria
        })
        .catch(function(error) {
            console.error(error);
            // Manejar cualquier error que ocurra durante la solicitud fetch
        });
// } else {
//    console.error("No se ha encontrado un ID de producto en el localStorage.");
    // Manejar el caso en el que no se haya almacenado un ID de producto
//}

