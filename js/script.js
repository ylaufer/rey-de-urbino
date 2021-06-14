let vinos = [];

$(()=>{
      $.getJSON("../data/vinos.json",(respuesta)=>{
        vinos = respuesta;
    

    //  INSTANCIACION DE OBJETOS PRODUCTO
    let productos = [];
    productos.push(new Producto(vinos[0]));
    productos.push(new Producto(vinos[1]));
    productos.push(new Producto(vinos[2]));
    productos.push(new Producto(vinos[3]));
    productos.push(new Producto(vinos[4]));
    productos.push(new Producto(vinos[5]));
    productos.push(new Producto(vinos[6]));
    productos.push(new Producto(vinos[7]));
    productos.push(new Producto(vinos[8]));
    productos.push(new Producto(vinos[9]));

    // VARIABLES

    let contenedorPadre = document.getElementById('cardsGeneradas');
    const comprarBtn = document.getElementsByClassName('comprar');
    let contenedorAlerts = document.getElementById('contenedorAlerts');
    let contenedorCarrito = document.getElementById('lista-carrito');
    const CARRITO = [];

    for(let producto of productos){
        crearCard(producto);
    }

    // EVENT LISTENERS
    for (const boton of comprarBtn) {
      boton.onclick =  manejadorCompra;
    }

    // FUNCIONES

    function crearCard(producto){
        let nuevoElemento = document.createElement("div");
        nuevoElemento.id  = "ID"+producto.id;
        nuevoElemento.classList.add('col-lg-4', 'col-xs-12', 'mb-4')
        nuevoElemento.innerHTML = ` <div class="card">
                                      <div class="product-image">
                                        <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}" >
                                      </div>  
                                      <div class="card-body">
                                        <h4 class="card-text bodega"> ${producto.bodega}</h4>
                                        <h3 class="card-title nombre">${producto.nombre}</h3>
                                        <h5 class="card-title cepa">${producto.cepa}</h5>
                                        <p class="card-text texto">Precio: $${producto.precio}</p>
                                        <button id="${producto.id}" class="comprar w-100">COMPRAR</button>
                                      </div>
                                    </div>`
      
        contenedorPadre.appendChild(nuevoElemento);
      }

      function manejadorCompra(evento){
        let seleccionado = evento.target.id;
        let datosProducto = new Producto(vinos.find(objeto => objeto.id == seleccionado));
        CARRITO.push(datosProducto);
        $(evento.target).animate ({
                            left: '250px',
                            opacity: '.7' },
                            "slow",
                            function (){
                                console.log("listo")
                            })
                        .attr('disabled','disabled') 
                        .css('background-color','#cd903c')
                        .css('color','white')
                        .text("COMPRADO");
        agregarCarrito(CARRITO);
        sincronizarStorage()
      }
      
      function agregarCarrito(CARRITO){
      removeCarritoPrevio()
        for (const producto of CARRITO) {
            const row = document.createElement('tr');
            row.innerHTML = 
                `<td>  
                    <img src="${producto.imagen}" width=50>
                  </td>
                  <td>${producto.nombre}</td>
                  <td>${producto.precio}</td>
                  <td>1</td>
                  <td>
                  <a href="#" class="btnDelete"><i class="fa fa-trash fa-2x btnDelete"></i></a>
                  </td>`;
            contenedorCarrito.appendChild(row);
        }  

        $(".btnDelete").click(function (evento) { 
          console.log("apreto boton delete");
            eliminarFilter(evento.target.id);
        })
    
        function eliminarFilter(id){
            CARRITO = CARRITO.filter(objeto => objeto.id != id);
            // contenedorCarrito.innerHTML = '';
        }
      }

    function removeCarritoPrevio(){
      contenedorCarrito.innerHTML = '';
      localStorage = null;
    }


    function sincronizarStorage() {
      localStorage.setItem('carrito', JSON.stringify(CARRITO));
      console.log(CARRITO);
    }
  })
})  


// ANIMACION MUESTRA CARRITO

$('.fa-shopping-cart').hover(function () {
  $('#carrito').show();
  if ($("#lista-carrito").is(":empty"))
          $("#encabezado").hide();
      else
          $("#encabezado").show();
});

$('#carrito').mouseleave(function(){
  $(this).hide();
});


/* FALTA HACER:
- FUNCIONALIDAD TRASH CAN
- LOCAL STORAGE EN INDEX Y EN TIENDA Y EN TODAS (Una vez guardados los items en el carrito estaría bueno que luego los levantes con un localStorage.getitem al principio del código (preguntar, si es distinto de null ) así como hiciste en carrito.html pero también hacerlo en el index.html. Si es null, se pasa de largo) (SOBREESCRIBIR)
- STYLEAR PAGINA CARRITO
- FUNCIONALIDAD SUB-TOTAL
- FUNCIONALIDAD CANTIDADES
- FILTROS
- PODER COMPRAR CON TECLADO
- request params por id
- POST PARA FINALIZAR COMPRA
- buscador / ordenar ?
- animacion comprado (añadiendo...)

JQUERY:
READY, DOMCONTENTLOADED
*/
