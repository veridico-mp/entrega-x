document.addEventListener('DOMContentLoaded', function () {
  const URL_CART = `https://japceibal.github.io/emercado-api/user_cart/25801.json`;

  fetch(URL_CART)
    .then(response => response.json())
    .then(data => {
        console.log(data.articles[0].name);
        showList(data);      
    });
});

function showList(data) {
    let list = document.getElementById("listaCarrito");
    for(let one of data.articles){
        list.innerHTML += `
        <div class="form-control col-md-6" id="cssList">
            <ul>
                <div class="form-control col-md-6">
                    <li></li>
                    <img src="${one.image}">
                </div>
                <div class="form-control col-md-6">
                    <li>Nombre</li>
                    <p>${one.name}</p>
                </div>
                <div class="form-control col-md-6">
                    <li>Costo</li>
                    <p>${one.currency}${one.unitCost}</p>
                </div>
                <div class="form-control col-md-6">
                    <li>Cant.</li>
                    <input type="number" id="units" min="1" placeholder="1">
                </div>
                <div class="form-control col-md-6">
                    <li>Subtotal</li>
                    ${"una funcion"};//Aca va el subtotal
                </div>
            </ul>
        </div>
        `
    }
}
