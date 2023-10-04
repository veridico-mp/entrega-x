document.addEventListener('DOMContentLoaded', function () {
  const URL_CART = `https://japceibal.github.io/emercado-api/user_cart/25801.json`;

  fetch(URL_CART)
    .then(response => response.json())
    .then(data => {
      showList(data);
      console.log(data.articles[0].name);
    });
});

function showList(data) {
    let list = document.getElementById("listaCarrito");
    for(let one of products){
        list.innerHTML += `
        <div class="form-control col-md-6" id="cssList">
            <ul>
                <div class="form-control col-md-6">
                    <li></li>
                    <img src="${one.article.image}">
                </div>
                <div class="form-control col-md-6">
                    <li>Nombre</li>
                    <p>${one.article.name}</p>
                </div>
                <div class="form-control col-md-6">
                    <li>Costo</li>
                    <p>${one.article.currency}${one.article.unitCost}</p>
                </div>
                <div class="form-control col-md-6">
                    <li>Cant.</li>
                    <input type="number" id="units" min="1">
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
