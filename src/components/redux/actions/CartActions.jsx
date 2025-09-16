import { AGREGAR_PRODUCTO_TYPE, DECREMENTAR_ITEM_TYPE, ELIMINAR_PRODUCTO_TYPE, INCREMENTAR_ITEM_TYPE, VACIAR_CARRITO_TYPE } from "../types/CartTypes";

export const AGREGAR_PRODUCTO = (id) => ({type:AGREGAR_PRODUCTO_TYPE, payload:id});
export const ELIMINAR_PRODUCTO = (id) => ({type:ELIMINAR_PRODUCTO_TYPE, payload:id});
export const VACIAR_CARRITO = {type:VACIAR_CARRITO_TYPE};
export const INCREMENTAR_ITEM = (id) => ({type:INCREMENTAR_ITEM_TYPE, payload:id});
export const DECREMENTAR_ITEM = (id) => ({type:DECREMENTAR_ITEM_TYPE, payload:id});