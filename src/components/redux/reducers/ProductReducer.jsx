import { AGREGAR_PRODUCTO_CATALOGO_TYPE, EDITAR_PRODUCTO_CATALOGO_TYPE, ELIMINAR_PRODUCTO_CATALOGO_TYPE } from "../types/ProductTypes"
import productosJSON from "../../../assets/productos.json"

const ProductReducer = (state=productosJSON, action) => {
    switch(action.type) {
        case AGREGAR_PRODUCTO_CATALOGO_TYPE:
            let max = 0;

            state.forEach(item => {
                if (item.id > max) {
                    max = item.id
                }
            });

            max++;
            state.push({id:max, ...action.payload});

            return state;
        case EDITAR_PRODUCTO_CATALOGO_TYPE:
            const producto = state.find(item => item.id == action.payload.id);
            producto.nombre = action.payload.item.nombre;
            producto.precio = action.payload.item.precio;
            producto.stock = action.payload.item.stock;
            producto.marca = action.payload.item.marca;
            producto.categoria = action.payload.item.categoria;
            producto.detalles = action.payload.item.detalles;
            producto.foto = action.payload.item.foto;
            producto.envio = action.payload.item.envio;            

            return state;
        case ELIMINAR_PRODUCTO_CATALOGO_TYPE:
            const productosActualizados = state.filter(item => item.id != action.payload)

            return productosActualizados;
        default:
            return state;
    }

}

export default ProductReducer