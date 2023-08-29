    let catID = localStorage.getItem("catID");
    const URL_CATEGORIES = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`;


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
    
    //Se llama a la funcion fetchProductData() con la URL. Cuando se resuelve la promesa muestra los datos con uploadProducts(), sino se crea un mensaje de error
    fetchProductData(URL_CATEGORIES)
        .then(data => {
            uploadProducts(data.products);
        })
        .catch(error => {
            const errorMessage = document.createElement("p");
            errorMessage.textContent = "Hubo un error al cargar los productos.";
            document.body.appendChild(errorMessage);
        });
    
    
          
        //Toma un array de productos y crea un div a medida que itera por cada elemento, dentro coloca todas sus características   
        function uploadProducts(dataArray) {
            const productsList = document.getElementById("products-list");
          
            for (const item of dataArray) {
              const productDiv = document.createElement("div");
              productDiv.classList.add("product"); // Agrega la clase "product" para aplicar los estilos CSS
              productDiv.classList.add("fetched-product"); // Agrega la clase adicional para todos los productos obtenidos a través de fetch
          
              productDiv.innerHTML = `
                  <img src="${item.image}">
                  <div class="description-container">
                      <h2>${item.name}</h2>
                      <p>${item.description}</p>
                      <p class="price">${item.currency} ${item.cost}</p>
                  </div>
                  <div class="sold-count">
                      <span>${item.soldCount} vendidos</span>
                  </div>
              `;
              productsList.appendChild(productDiv);
            }
            
            /*Aca esta el filtro de productos segun precio */
            const filterBtn = document.getElementById('rangeFilterCount');
            filterBtn.addEventListener('click', function(){
                let min = document.getElementById('rangeFilterCountMin').value;
                let max = document.getElementById('rangeFilterCountMax').value;
                //Aca nos aseguramos de que se contemplen los casos en que el usuario deja un campo vacio
                if (min === "" && max === ""){//Si ambos "minimo y maximo" estan vacios no hace nada mas q enviar un mensaje a consola
                    console.log("Los campos estan vacíos")//Esto se puede sustituír por una alerta visual para el usuario
                }else if (min >=0 && max === ""){
                    productsList.innerHTML= "";
                    let filtrado = dataArray.filter(item => item.cost >= min);
                    uploadProducts(filtrado);
                }else if (min === "" && max >= 0){
                    productsList.innerHTML= "";
                    let filtrado = dataArray.filter(item => item.cost <= max);
                    uploadProducts(filtrado);
                }else {
                    productsList.innerHTML= "";
                    let filtrado = dataArray.filter(item => item.cost >= min && item.cost <= max);
                    uploadProducts(filtrado);
                }
            })
            

        }
        /*Aca se limpian los filtros y se vuelve a cargar los productos en su totalidad */
            const cleanFilter = document.getElementById('clearRangeFilter');
            cleanFilter.addEventListener('click', function(){
                const productsList = document.getElementById("products-list");
                productsList.innerHTML= "";
                
                fetchProductData(URL_CATEGORIES)
                .then(data => {
                    uploadProducts(data.products);
                })
                .catch(error => {
                    const errorMessage = document.createElement("p");
                    errorMessage.textContent = "Hubo un error al cargar los productos.";
                    document.body.appendChild(errorMessage);
                });

            })

