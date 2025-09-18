import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DECREMENTAR_ITEM, ELIMINAR_PRODUCTO, INCREMENTAR_ITEM, VACIAR_CARRITO } from "./redux/actions/CartActions";
import { useContext } from "react";
import { APIContext } from "./context/APIContext";

const CarritoDeCompras = () => {
    const {mostrarMensaje} = useContext(APIContext);
    const carrito = useSelector(state => state.carrito.carrito);
    const totalProductos = useSelector(state => state.carrito.totalProductos);
    const sumaProductos = useSelector(state => state.carrito.sumaProductos);
    const dispatch = useDispatch();

    const eliminarProductoCarrito = (id) => {
        dispatch(ELIMINAR_PRODUCTO(id));
        mostrarMensaje("Eliminaste el Producto #" + id + " del Carrito!", "error");
    }

    const vaciarCarrito = () => {
        dispatch(VACIAR_CARRITO);
        mostrarMensaje("Vaciaste el Carrito!", "error");
    }

    const incrementarItem = (id) => {
        dispatch(INCREMENTAR_ITEM(id));
        mostrarMensaje("Incrementaste el Producto #" + id + " del Carrito!", "warning");
    }

    const decrementarItem = (id) => {
        dispatch(DECREMENTAR_ITEM(id));
        mostrarMensaje("Decrementaste el Producto #" + id + " del Carrito!", "warning");
    }

    if (!carrito || totalProductos == 0) {
        return (
            <div className="container my-5">
                <div className="row">
                    <h2 className="text-center fw-light mb-3">Carrito de Compras</h2>
                    <h3 className="text-center fw-bold text-danger mb-3">Carrito vacío!</h3>
                </div>
            </div>
        )
    }

    return (
        <div className="container my-5">
            <div className="row">
                <div className="col">
                    <h2 className="text-center fw-light mb-3">Carrito de Compras</h2>
                    <table className="table">
                        <tbody>
                            <tr>
                                <td className="text-end" colSpan={6}>
                                    <button className="btn btn-dark btn-sm fw-bold px-5" onClick={vaciarCarrito}>Vaciar Carrito</button>
                                </td>
                            </tr>
                            {
                                carrito.map(item => (
                                    <tr key={item.id}>
                                        <td><img src={item.foto} alt={item.nombre} width={80} /></td>
                                        <td className="align-middle">{item.nombre}</td>
                                        <td className="text-center align-middle">${item.precio}</td>
                                        <td className="text-center align-middle">
                                            <button className="btn btn-dark btn-sm fw-bold" onClick={() => {decrementarItem(item.id)}}>-</button> x{item.cantidad} <button className="btn btn-dark btn-sm fw-bold" onClick={() => {incrementarItem(item.id)}}>+</button></td>
                                        <td className="text-center align-middle">${item.precio * item.cantidad}</td>
                                        <td className="text-end align-middle"><button className="btn btn-dark btn-sm fw-bold px-5" onClick={() => {eliminarProductoCarrito(item.id)}}>Eliminar</button></td>
                                    </tr>
                                ))
                            }
                            <tr>
                                <td className="text-center" colSpan={4}><b>Total a Pagar</b></td>
                                <td className="text-center">${sumaProductos}</td>
                                <td className="text-end">
                                    <Link to={"/checkout"} className="btn btn-dark btn-sm fw-bold px-5">Checkout</Link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default CarritoDeCompras