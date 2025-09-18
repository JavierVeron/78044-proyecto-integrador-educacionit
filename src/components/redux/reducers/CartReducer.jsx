import { AGREGAR_PRODUCTO_TYPE, DECREMENTAR_ITEM_TYPE, ELIMINAR_PRODUCTO_TYPE, INCREMENTAR_ITEM_TYPE, VACIAR_CARRITO_TYPE } from "../types/CartTypes";
import productosJSON from "../../../assets/productos.json"

const initialState = {
    carrito:[],
    totalProductos:0,
    sumaProductos:0
}

const CartReducer = (state=initialState, action) => {
    let producto;

    switch (action.type) {
        case AGREGAR_PRODUCTO_TYPE:
            producto = state.carrito.find(item => item.id == action.payload);

            if (producto) {
                producto.cantidad++;
            } else {
                producto = productosJSON.find(item => item.id == action.payload);
                producto.cantidad = 1;
                state.carrito.push(producto);
            }

            return {
                ...state,
                carrito:state.carrito,
                totalProductos:state.carrito.reduce((acum, item) => acum += item.cantidad,0),
                sumaProductos:state.carrito.reduce((acum, item) => acum += item.cantidad * item.precio,0)
            }
        case ELIMINAR_PRODUCTO_TYPE:
            const productosActualizados = state.carrito.filter(item => item.id != action.payload);
            
            return {
                ...state,
                carrito:productosActualizados,
                totalProductos:productosActualizados.reduce((acum, item) => acum += item.cantidad,0),
                sumaProductos:productosActualizados.reduce((acum, item) => acum += item.cantidad * item.precio,0)
            }
        case VACIAR_CARRITO_TYPE:            
            return {
                ...state,
                carrito:[],
                totalProductos:0,
                sumaProductos:0
            }
        case INCREMENTAR_ITEM_TYPE:
            producto = state.carrito.find(item => item.id == action.payload);
            
            if (producto.cantidad < producto.stock) {
                producto.cantidad++;
            }

            return {
                ...state,
                carrito:state.carrito,
                totalProductos:state.carrito.reduce((acum, item) => acum += item.cantidad,0),
                sumaProductos:state.carrito.reduce((acum, item) => acum += item.cantidad * item.precio,0)
            }
        case DECREMENTAR_ITEM_TYPE:
            producto = state.carrito.find(item => item.id == action.payload);
            
            if (producto.cantidad > 1) {
                producto.cantidad--;
            }

            return {
                ...state,
                carrito:state.carrito,
                totalProductos:state.carrito.reduce((acum, item) => acum += item.cantidad,0),
                sumaProductos:state.carrito.reduce((acum, item) => acum += item.cantidad * item.precio,0)
            }
        default:
            return state;
    }
}

export default CartReducer