const URL_Autos = "https://japceibal.github.io/emercado-api/cats_products/101.json";

//Realiza solicitud fetch y espera a que la respuesta se convierta a formato JSON. En caso de error se captura en un bloque catch y muestra mensaje de error en consola
async function fetchProductData(url) {
    try {
        const res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}

//Toma un array de productos y crea un div a medida que itera por cada elemento, dentro coloca todas sus características
function uploadProducts(dataArray) {
    const productsList = document.getElementById("products-list");

    for (const item of dataArray) {
        const productDiv = document.createElement("div");
        productDiv.innerHTML = `
            <img src="${item.image}">
            <div>
                <h2>${item.name} ${item.currency} ${item.cost}</h2>
                <p>${item.description}</p>
            </div>
            <div>
                <span>${item.soldCount} vendidos</span>
            </div>
        `;
        productsList.appendChild(productDiv);
    }
}

//Se llama a la funcion fetchProductData() con la URL. Cuando se resuelve la promesa muestra los datos con uploadProducts(), sino se crea un mensaje de error
fetchProductData(URL_Autos)
    .then(data => {
        uploadProducts(data.products);
    })
    .catch(error => {
        const errorMessage = document.createElement("p");
        errorMessage.textContent = "Hubo un error al cargar los productos.";
        document.body.appendChild(errorMessage);
    });