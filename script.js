var carro = [];

const productos = [
    //Polera
    {
    nombre: 'Polera Polo',
    variosPrecios: true,
    precios: {
            primerPrecio: { precio: 3 , hasta: 5},
            segundoPrecio: { precio: 2 , hasta: 10},
            tercerPrecio: { precio: 1 , hasta: 11}
        }
    },
    {
    nombre: 'Polera Pique',
    variosPrecios: true,
    precios: {
            primerPrecio: { precio: 4 , hasta: 5},
            segundoPrecio: { precio: 3 , hasta: 10},
            tercerPrecio: { precio: 2 , hasta: 11}
        }
    }
];

/*=====================================================================================================*/
//APP
/*=====================================================================================================*/
const app = new Vue({
    el: '#app',
    //Aca podremos poner cualquier dato para la vista
    data: {
        productos: productos , 
        productoActual: productos[0],
        //Este es el nombre que se obtiene en el select de la vista
        productoSeleccionado: productos[0].nombre,
        precioActual: productos[0].precios.primerPrecio.precio,
        //Este es el precio tachado mostrando al cliente lo que ahorra
        precioPorUnidadTachado: 0,
        cantidadActual: 1
    },
    //Metodos (palabra reservada methods)
    methods:{

        //Este metodo es para ver si este producto tiene varios precios y aplicarlo
        cambio(){

            productos.forEach(producto => {
                if(producto.nombre === this.productoSeleccionado) this.productoActual = producto;
            });

            //Ver si el producto actual tiene varios precios
            if(this.productoActual.variosPrecios){
                //Verificar si sobrepasa algun precio extra

                //Si es menor al tope del primer precio
                if(this.cantidadActual < this.productoActual.precios.primerPrecio.hasta){
                    this.precioActual = this.productoActual.precios.primerPrecio.precio;
                    //Seteamos el precio tachado a 0 de nuevo
                    this.precioPorUnidadTachado = 0;
                }
                //Si es mayor o igual al tope del primer precio pero menor al tope del segundo
                else if(this.cantidadActual >= this.productoActual.precios.primerPrecio.hasta && this.cantidadActual < this.productoActual.precios.segundoPrecio.hasta){
                    this.precioActual = this.productoActual.precios.segundoPrecio.precio;
                    //Asignamos un nuevo precio tachado
                    this.precioPorUnidadTachado = this.productoActual.precios.primerPrecio.precio;
                }
                //Si es igual o mayor al tope del segundo precio
                else if(this.cantidadActual >= this.productoActual.precios.segundoPrecio.hasta){
                    this.precioActual = this.productoActual.precios.tercerPrecio.precio;
                    //Asignamos un nuevo precio tachado
                    this.precioPorUnidadTachado = this.productoActual.precios.primerPrecio.precio;
                }
            }
        },

        addProducto(){
            carro.push({
                producto: this.productoActual.nombre,
                precioPorUnidad: this.precioActual,
                cantidad: this.cantidadActual,
                total: this.precioActual * this.cantidadActual
            });

            console.log(carro);
        }
    }
});

/*=====================================================================================================*/
//CARRO
/*=====================================================================================================*/
const lista = new Vue({
    el: '#carro',
    data:{
        carro: carro
    },
    methods:{
        quitarItem(index){
            carro.splice(index , 1);
        },
        imprimirPdf(){
            var pdf = document.getElementById('carro');
            print();
        }
    }
});