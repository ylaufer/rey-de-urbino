// DECLARACION DE CLASE
class Producto{
    constructor(datos){
        this.id     = parseInt(datos.id);
        this.nombre = datos.nombre;
        this.bodega = datos.bodega;
        this.precio = parseFloat(datos.precio);
        this.cepa = datos.cepa;
        this.imagen = datos.imagen;
        this.cantidad = 1;
    }

    addCantidad() {
        this.cantidad++;
    }

    resCantidad() {
        this.cantidad--;
    }

    getTotal() {
        return (this.cantidad * this.precio);
    }
}