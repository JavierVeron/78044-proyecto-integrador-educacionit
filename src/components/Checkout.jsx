import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { VACIAR_CARRITO } from "./redux/actions/CartActions";
import { APIContext } from "./context/APIContext";
import mockAPI from "./mockAPI";

const Checkout = () => {
    const {mostrarMensaje} = useContext(APIContext);
    const carrito = useSelector(state => state.carrito.carrito);
    const totalProductos = useSelector(state => state.carrito.totalProductos);
    const sumaProductos = useSelector(state => state.carrito.sumaProductos);
    const dispatch = useDispatch();

    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [telefono, setTelefono] = useState("");
    const [direccion, setDireccion] = useState("");
    const [pedidoId, setPedidoId] = useState(null);

    const vaciarCarrito = () => {
        dispatch(VACIAR_CARRITO);
    }

    const realizarPedido = async () => {
        try {
            if (nombre == "" && email == "" && telefono == "" && direccion == "") {
                throw new Error("Complete los Campos del Formulario!");
            }

            const comprador = {nombre, email, telefono, direccion};
            const items = carrito.map(item => ({id:item.id, nombre:item.nombre, precio:item.precio, cantidad:item.cantidad}));
            const fechaActual = new Date();
            const fecha = `${fechaActual.getDate()}-${fechaActual.getMonth()+1}-${fechaActual.getFullYear()} ${fechaActual.getHours()}:${fechaActual.getMinutes()}:${fechaActual.getSeconds()}`;
            const pedido = {comprador, items, fecha, sumaProductos};
            const response = await mockAPI.post("/pedidos", pedido);            

            if (response.status == 201) {
                setPedidoId(response.data.id);
                vaciarCarrito();
            } else {
                throw new Error("No se pudo actualizar el Producto!")
            }
        } catch (error) {   
            mostrarMensaje(error.toString(), "error"); 
        }
    }

    if (pedidoId) {
        return (
            <div className="container my-5">
                <div className="row">
                    <h2 className="text-center fw-light mb-3">Gracias por tu Compra!</h2>
                    <h3 className="text-center mb-3">Tu Número de Compra es: <b className="fw-bold">{pedidoId}</b></h3>
                    <p className="text-center my-5"><Link to={"/"} className="btn btn-dark btn-sm fw-bold px-5">Volver a la Tienda Online</Link></p>
                </div>
            </div>
        )
    }

    if (!carrito || totalProductos == 0) {
        return (
            <div className="container my-5">
                <div className="row">
                    <h2 className="text-center fw-light mb-3">Checkout</h2>
                    <h3 className="text-center fw-bold text-danger mb-3">Carrito vacío!</h3>
                </div>
            </div>
        )
    }

    return (
        <div className="container my-5">
            <div className="row">
                <h2 className="text-center fw-light mb-3">Checkout</h2>
                <div className="col-md-6">
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Nombre</label>
                            <input type="text" className="form-control" value={nombre} onChange={(e) => {setNombre(e.target.value)}} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input type="text" className="form-control" value={email} onChange={(e) => {setEmail(e.target.value)}} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Teléfono</label>
                            <input type="text" className="form-control" value={telefono} onChange={(e) => {setTelefono(e.target.value)}} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Dirección</label>
                            <input type="text" className="form-control" value={direccion} onChange={(e) => {setDireccion(e.target.value)}} />
                        </div>
                        <button type="button" className="btn btn-dark btn-sm fw-bold px-5" onClick={realizarPedido}>Realizar Pedido</button>
                    </form>
                </div>
                <div className="col-md-6">
                    <table className="table">
                        <tbody>
                            {
                                carrito.map(item => (
                                    <tr key={item.id}>
                                        <td><img src={item.foto} alt={item.nombre} width={80} /></td>
                                        <td className="align-middle">{item.nombre}</td>
                                        <td className="text-center align-middle">${item.precio}</td>
                                        <td className="text-center align-middle">x{item.cantidad}</td>
                                        <td className="text-center align-middle">${item.precio * item.cantidad}</td>
                                    </tr>
                                ))
                            }
                            <tr>
                                <td className="text-center" colSpan={4}><b>Total a Pagar</b></td>
                                <td className="text-center">${sumaProductos}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Checkout