// DECLARACION DE CLASE
class Producto{
    constructor(datos){
        this.id     = parseInt(datos.id);
        this.nombre = datos.nombre;
        this.bodega = datos.bodega;
        this.precio = parseFloat(datos.precio);
        this.cepa = datos.cepa;
        this.imagen = datos.imagen;
    }
}

//  DATOS ESTATICOS
const DATOS = [{
    "id": 1,
    "nombre": "Colección Privada",
    "bodega": "Navarro Correas",
    "cepa": "Chardonnay",
    "precio": 400,
    "imagen": "../assets/img/vinos/coleccion_privada_chardonnay.jpg"
  }, {
    "id": 2,
    "nombre": "Espumante Trapiche",
    "bodega": "Trapiche",
    "cepa": "Extra Brut",
    "precio": 500,
    "imagen": "../assets/img/vinos/trapiche_extra_brut.jpg"
  }, {
    "id": 3,
    "nombre": "Dadá",
    "bodega": "Finca Las Moras",
    "cepa": "Blend",
    "precio": 600,
    "imagen": "../assets/img/vinos/las_moras_blend.jpg"
  }, {
    "id": 4,
    "nombre": "Impuro",
    "bodega": "Trapiche",
    "cepa": "Malbec",
    "precio": 700,
    "imagen": "../assets/img/vinos/trapiche_impuro.jpg"
  }, {
    "id": 5,
    "nombre": "Sparkling",
    "bodega": "Navarro Correas",
    "cepa": "Nature",
    "precio": 800,
    "imagen": "../assets/img/vinos/navarro_correas_nature.jpg"
  }, {
    "id": 6,
    "nombre": "Impuro",
    "bodega": "Trapiche",
    "cepa": "Cabernet Sauvignon",
    "precio": 850,
    "imagen": "../assets/img/vinos/trapiche_impuro_cabernet.jpg"
}];

//  INSTANCIACION DE OBJETOS PRODUCTO
let productos = [];
productos.push(new Producto(DATOS[0]));
productos.push(new Producto(DATOS[1]));
productos.push(new Producto(DATOS[2]));
productos.push(new Producto(DATOS[3]));
productos.push(new Producto(DATOS[4]));
productos.push(new Producto(DATOS[5]));

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
                                    <button id="${producto.id}" class="comprar w-100">
                                      <i class="fa fa-spinner fa-spin hide"></i>
                                      <span class="btn-text"> COMPRAR</span>
                                    </button>
                                  </div>
                                </div>`
  
    contenedorPadre.appendChild(nuevoElemento);
  }

  function manejadorCompra(evento){
    let seleccionado = evento.target.id;
    let datosProducto = new Producto(DATOS.find(objeto => objeto.id == seleccionado));
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
                    .children('.btn-text').text("COMPRADO");
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
              <a href="#" class="borrar-curso"><i class="fa fa-trash fa-2x"></i></a>
              </td>`;
        contenedorCarrito.appendChild(row);
    }  
  }

function removeCarritoPrevio(){
  contenedorCarrito.innerHTML = '';
}

function sincronizarStorage() {
  localStorage.setItem('carrito', JSON.stringify(CARRITO));
  console.log(CARRITO);
}

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



HACER:

- ANIMAR CUANDO APRETAS EL BOTON DE COMPRAR
- FUNCIONALIDAD TRASH CAN
- LOCAL STORAGE EN INDEX Y EN TIENDA Y EN TODAS (Una vez guardados los items en el carrito estaría bueno que luego los levantes con un localStorage.getitem al principio del código (preguntar, si es distinto de null ) así como hiciste en carrito.html pero también hacerlo en el index.html. Si es null, se pasa de largo)
- STYLEAR PAGINA CARRITO
- FUNCIONALIDAD SUB-TOTAL
- FUNCIONALIDAD CANTIDADES
- FILTROS
- PODER COMPRAR CON TECLADO

JQUERY:
READY, DOMCONTENTLOADED
*/
