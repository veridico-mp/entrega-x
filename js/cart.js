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
        <div class="form-control py-1" id="cssList">
            <div class="row py-0">
                <div class="col text-center fnt-size px-1"><img src="${one.image}" title="producto" class="imagenCart img-fluid float-start"></div>
                <div class="col text-center fnt-size px-1">${one.name}</div>
                <div class="col text-center fnt-size px-0 py-0"><div class="row"><div class="col">${one.currency}</div><div class="col cost">${one.unitCost}</div></div></div>
                <div class="col text-center fnt-size px-1 py-1"><input type="number" id="units" min="1" placeholder="1" class="cantidadProd"></div>
                <div class="col text-center fnt-size px-1 py-0"><div class="row"><div class="col">${one.currency}</div><div class="col subTot">123456</div></div></div>
            </div>
        </div>
        `
        /*Se crea la clase "cost" que contiene el valor numerico del costo unitario.
         Se crea la clase "subTot" en la cual se debe introducir el valor subtotal calculado*/
    }
}
