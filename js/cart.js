const URL_CART = `https://japceibal.github.io/emercado-api/user_cart/25801.json`;

// Recuperar datos de localStorage
const cartFromLocalStorage = JSON.parse(localStorage.getItem('cartProducts'));
if (cartFromLocalStorage) {
  showListFromStorage(cartFromLocalStorage);
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

  values.addEventListener('change', () => {
    let costElements = document.querySelectorAll('.cost').innerHTML;
    console.log(costElements);
    // calcularSubtotal(precioProducto, cantidadProducto);
  });
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
                <div class="col text-center fnt-size px-1 py-0"><div class="row"><div class="col">${one.currency}</div><div class="col subTot">${calcularSubtotal(one.unitCost, 1)}</div></div></div>
            </div>
        </div>
        `;
    /*Se crea la clase "cost" que contiene el valor numerico del costo unitario.
         Se crea la clase "subTot" en la cual se debe introducir el valor subtotal calculado*/

    console.log(values[2].value);
  }
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
                  <div class="col text-center fnt-size px-1 py-1"><input type="number" onchange="" min="1" value="${article.Cantidad}" class="cantidadProd"></div>
                  <div class="col text-center fnt-size px-1 py-0"><div class="row"><div class="col">${article.Divisa}</div><div class="col subTot">${calcularSubtotal(
      article.CosteUnidad,
      article.Cantidad
    )}</div></div></div>

              </div>
          </div>
          `;
  }
}

function calcularSubtotal(precioProducto, cantidadProducto) {
  subtotal = precioProducto * cantidadProducto;
  return subtotal;
}

// agrego aquí funcion para el modal
const validacion = document.getElementById('validar');
const obTransferencia = document.getElementById('Transferencia');
const obTarjeta = document.getElementById('tarjetacredito');
const avisoMetodo = document.getElementById('DebeCambiar');

function modalCheck (){
 
  let resultado ="";
    if(obTransferencia.checked){
    resultado = "Transferencia Bancaria";}
    else if (obTarjeta.checked){
      resultado = "Tarjeta de Crédito";
    }
    avisoMetodo.textContent = resultado;
  }

  validacion.addEventListener('click', (event)=>{
    event.preventDefault();
    return modalCheck();
  });


function validacionesModal() {
  let validity = true;
  
    /*if (calle.value === "" || calle.checkValidity()) {
    calle.setCustomValidity(false);
    validity = false;
    } else {
    calle.setCustomValidity('');
    }*/
     
    if (!obTransferencia.checked) {
      validity = false;
      document.querySelector('#Transferencia').classList.add('invalid-color');
      document.querySelector('#feedbackTransfer').style.display = 'inline';
    } else {
      document.querySelector('#Transferencia').classList.remove('invalid-color');
      document.querySelector('#feedbackTransfer').style.display = 'none';
    }

    if (!obTarjeta.checked) {
      validity = false;
      document.querySelector('#tarjetacredito').classList.add('invalid-color');
      document.querySelector('#feedbackTarjeta').style.display = 'inline';
    } else {
      document.querySelector('#tarjetacredito').classList.remove('invalid-color');
      document.querySelector('#feedbackTarjeta').style.display = 'none';
    }


    return modalCheck;
  }

  validacion.addEventListener('click', evento => {
    if (!validacionesModal() && !validacionesModal2() || !this.checkValidity()) {
      evento.preventDefault();
      evento.stopPropagation();
    
    let obdivTarjeta = document.getElementById("feedbackTarjeta");
    let obdivTransfer = document.getElementById("feedbackTransfer");
    obdivTransfer.innerHTML += `Debe seleccionar un método`;
    obdivTarjeta.innerHTML += `Debe seleccionar un método`;
    } else if (validacionesModal()  || validacionesModal2() && this.checkValidity()){
    evento.preventDefault();
    evento.stopPropagation();
    obdivTransfer.innerHTML = null;
    obdivTarjeta.innerHTML = null;
   } 
   
  });

  
 /*Validacion trasnferencia*/

 function validacionesModal2() {
  let validity = true;
  
    /*if (calle.value === "" || calle.checkValidity()) {
    calle.setCustomValidity(false);
    validity = false;
    } else {
    calle.setCustomValidity('');
    }*/
     
    if (!obTarjeta.checked) {
      validity = false;
      document.querySelector('#tarjetacredito').classList.add('invalid-color');
      document.querySelector('#feedbackTarjeta').style.display = 'inline';
    } else {
      document.querySelector('#tarjetacredito').classList.remove('invalid-color');
      document.querySelector('#feedbackTarjeta').style.display = 'none';
    }
  
    return modalCheck;
  }

  /*validacion.addEventListener('click', evento => {
    if (!validacionesModal2() || !this.checkValidity()) {
      evento.preventDefault();
      evento.stopPropagation();
    }
    let obdivTarjeta = document.getElementById("feedbackTarjeta");
    obdivTarjeta.innerHTML += `Debe seleccionar un método`
    });*/


  
//Validaciones del botón de Compra

const BotónComprar = document.getElementById('BotóndeCompra');




/*
BotónComprar.addEventListener('click', ()=>{

  if ( calle.value ===" "){
  return ("Ingrese una calle");
} 
else if( numeroDireccion.value ===" "){
  return ("ingrese un número");
} 
else if( esquina.value ===" " ){
  return ("Ingrese una esquina");
}
else {
  return ("Has comprado con éxito");
}
});*/