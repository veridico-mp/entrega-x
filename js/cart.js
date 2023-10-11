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
        <div class="form-control" id="cssList">
            <div class="row">
                <div class="col text-center fnt-size px-1"><img src="${one.image}" title="producto" class="imagenCart img-fluid float-start"></div>
                <div class="col text-center fnt-size px-1">${one.name}</div>
                <div class="col text-center fnt-size px-1">${one.currency}${one.unitCost}</div>
                <div class="col text-center fnt-size px-1"><input type="number" id="units" min="1" placeholder="1" class="cantidadProd"></div>
                <div class="col text-center fnt-size px-1">${"una funcion"}</div>
            </div>
        </div>
        `
    }
}
