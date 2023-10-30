const URL_CART = `https://japceibal.github.io/emercado-api/user_cart/25801.json`;
let costeDeProductosTotal = 0;
let costeEnvio = 0;

// Recuperar datos de localStorage
const cartFromLocalStorage = JSON.parse(localStorage.getItem('cartProducts'));
if (cartFromLocalStorage) {
  showListFromStorage(cartFromLocalStorage);
  modificarSubtotal();
  calcularCostos();
}

fetch(URL_CART)
  .then(response => response.json())
  .then(data => {
    showList(data);
  })
  .catch(err => {
    console.error('Hubo un error al cargar los datos', err);
  });

document.addEventListener('DOMContentLoaded', function () {
  let values = document.getElementsByClassName('cantidadProd');
  let envio = document.getElementById('tipoEnvio'); //Este es el div que contiene los radio check para el tipo de envio.

  calcularCostos();
  /*values.addEventListener('change', () => {
    let costElements = document.querySelectorAll('.cost').innerHTML;
    console.log(costElements);
    // calcularSubtotal(precioProducto, cantidadProducto);
  });*/
});

function showList(data) {
  let list = document.getElementById('listaCarrito');
  for (let one of data.articles) {
    list.innerHTML += `
        <div class="form-control py-1" id="cssList">
            <div class="row py-0">
                <div class="col text-center fnt-size px-1"><img src="${one.image}" title="producto" class="imagenCart img-fluid float-start"></div>
                <div class="col text-center fnt-size px-1">${one.name}</div>
                <div class="col text-center fnt-size px-0 py-0"><div class="row"><div class="col">${one.currency}</div><div class="col cost">${one.unitCost}</div></div></div>
                <div class="col text-center fnt-size px-1 py-1"><input type="number" id="units" min="1" value="${one.count}" class="cantidadProd"></div>
                <div class="col text-center fnt-size px-1 py-0"><div class="row"><div class="col">${one.currency}</div><div class="col subTot">${one.unitCost * one.count}</div></div></div>
            </div>
        </div>
        `;
  }
  let cantidadInputs = document.querySelectorAll('.cantidadProd');
  cantidadInputs.forEach(input => {
    input.addEventListener('change', function () {
      modificarSubtotal();
      calcularCostos();
      precioTotal();
    });
  });
}

function showListFromStorage(data) {
  let list = document.getElementById('listaCarrito');
  for (let article of data) {
    list.innerHTML += `
      <div class="form-control py-1" id="cssList">
        <div class="row py-0">
          <div class="col text-center fnt-size px-1"><img src="${article.Imagen}" title="producto" class="imagenCart img-fluid float-start"></div>
          <div class="col text-center fnt-size px-1">${article.Nombre}</div>
          <div class="col text-center fnt-size px-0 py-0"><div class="row"><div class="col">${article.Divisa}</div><div class="col cost">${article.CosteUnidad}</div></div></div>
          <div class="col text-center fnt-size px-1 py-1"><input type="number" min="1" value="${article.Cantidad}" class="cantidadProd"></div>
          <div class="col text-center fnt-size px-1 py-0"><div class="row"><div class="col">${article.Divisa}</div><div class="col subTot">${article.Cantidad * article.CosteUnidad}</div></div></div>
        </div>
      </div>
    `;
  }

  // Agregar el evento change a todos los elementos con la clase "cantidadProd"
  let cantidadInputs = document.querySelectorAll('.cantidadProd');
  cantidadInputs.forEach(input => {
    input.addEventListener('change', function () {
      modificarSubtotal();
      calcularCostos();
      precioTotal();
    });
  });
}

function modificarSubtotal() {
  let cantidadInputs = document.querySelectorAll('.cantidadProd');
  let preciosProducto = document.querySelectorAll('.cost');
  let subtotales = document.querySelectorAll('.subTot');

  for (let i = 0; i < cantidadInputs.length; i++) {
    let cantidad = parseInt(cantidadInputs[i].value);
    let precio = parseFloat(preciosProducto[i].textContent);
    subtotales[i].innerHTML = cantidad * precio;
  }
}

function calcularCostos() {
  let mostrarPreciosProductos = document.querySelector('#costo');
  let preciosProductos = document.querySelectorAll('.subTot');

  for (let i = 0; i < preciosProductos.length; i++) {
    costo = Number(preciosProductos[i].innerHTML);

    costeDeProductosTotal += costo;
  }

  mostrarPreciosProductos.value = costeDeProductosTotal;
  console.log(costeDeProductosTotal);
}

function tipoEnvio() {
  let mostrarPrecioEnvio = document.querySelector('#envio');

  envioStandard = document.querySelector('#envioStandard').checked;
  envioRapido = document.querySelector('#envioRapido').checked;
  envioExpress = document.querySelector('#envioExpress').checked;

  if (envioStandard) {
    costeEnvio = costeDeProductosTotal * 0.05;
  } else if (envioRapido) {
    costeEnvio = costeDeProductosTotal * 0.07;
  } else if (envioExpress) {
    costeEnvio = costeDeProductosTotal * 0.15;
  }
  mostrarPrecioEnvio.value = costeEnvio;
}

var radios = document.getElementsByName('envío');

radios.forEach(function (radio) {
  radio.addEventListener('change', function () {
    if (radio.checked) {
      tipoEnvio();
      precioTotal();
    }
  });
});

function precioTotal() {
  let mostrarPrecioTotal = document.querySelector('#total');

  mostrarPrecioTotal.value = costeEnvio + costeDeProductosTotal;
}
