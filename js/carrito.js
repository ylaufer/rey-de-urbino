const almacenados = JSON.parse(localStorage.getItem("carrito"));
let contenedorCarrito = document.getElementById('tabla-carrito');




for (const producto of almacenados) {
    let contenedor = document.createElement("tr");
    contenedor.innerHTML = `
    <td>${producto.nombre}</td>
    <td>${producto.bodega}</td>
    <td>${producto.cepa}</td>
    <td>${producto.precio}</td>
    `
    contenedorCarrito.appendChild(contenedor);
}