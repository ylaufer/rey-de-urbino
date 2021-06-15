/****************** PAGINA CARRITO *****************/
let contenedor = "";


let almacenados = JSON.parse(localStorage.getItem("carrito"));
console.log(almacenados);

if ($.isEmptyObject(almacenados) === true) {
    console.log("vacio");
}
let contenedorCarrito = document.getElementById('tabla-carrito');


// CARGA DATOS CARRITO EN PAGINA CARRITO
for (const producto of almacenados) {
    contenedor = document.createElement("tr");
    contenedor.innerHTML = `
    <td>${producto.nombre}</td>
    <td>${producto.bodega}</td>
    <td>${producto.cepa}</td>
    <td></td>
    <td></td>
    `
    contenedorCarrito.appendChild(contenedor);
}
