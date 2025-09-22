import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AGREGAR_PRODUCTO_CATALOGO, EDITAR_PRODUCTO_CATALOGO, ELIMINAR_PRODUCTO_CATALOGO } from "./redux/actions/ProductActions";
import { APIContext } from "./context/APIContext";

const Alta = () => {
    const {mostrarMensaje, mostrarModal} = useContext(APIContext);
    const productos = useSelector(state => state.productos);
    const dispatch = useDispatch();
    const [nombre, setNombre] = useState("D.O.N. Issue 7");
    const [precio, setPrecio] = useState(169999);
    const [stock, setStock] = useState(10);
    const [marca, setMarca] = useState("Adidas");
    const [categoria, setCategoria] = useState("hombre");
    const [detalles, setDetalles] = useState("Preparate para un nuevo Don. Las D.O.N. Issue #7 son las últimas zapatillas exclusivas de adidas Basketball y la superestrella Donovan Mitchell. Diseñadas para lucir elegantes y modernas, estas zapatillas de básquet de alto rendimiento apoyan el tipo de movimientos que hacen de Spida uno de los talentos más dinámicos del juego.");
    const [foto, setFoto] = useState("https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/47e212a033874a3e9d81a8acdbc0c95f_9366/D.O.N._Issue_7_Blanco_JS1299_01_00_standard.jpg");
    const [envio, setEnvio] = useState(true);
    const [deshabilitarEnvio, setDeshabilitarEnvio] = useState(true);
    const [modoEdicion, setModoEdicion] = useState(false);
    const [idProducto, setIdProducto] = useState(0);

    const vaciarFormulario = () => {
        setNombre("");
        setPrecio("");
        setStock("");
        setMarca("");
        setCategoria("");
        setDetalles("");
        setFoto("");
        setEnvio(false);
    }

    const guardarProducto = () => {
        const producto = {nombre, precio, stock, marca, categoria, detalles, foto, envio};
        dispatch(AGREGAR_PRODUCTO_CATALOGO(producto));
        vaciarFormulario();
        mostrarMensaje("Se agregó un nuevo Producto!", "ok");
    }

    const editarItem = (id) => {
        vaciarFormulario();
        setModoEdicion(true);
        setIdProducto(id);
        const producto = productos.find(item => item.id == id);
        setNombre(producto.nombre);
        setPrecio(producto.precio);
        setStock(producto.stock);
        setMarca(producto.marca);
        setCategoria(producto.categoria);
        setDetalles(producto.detalles);
        setFoto(producto.foto);
        setEnvio(producto.envio);
    }

    const cancelarEdicion = () => {
        vaciarFormulario();
        setModoEdicion(false);
        setIdProducto(0);
    }

    const actualizarProducto = () => {
        const producto = {nombre, precio, stock, marca, categoria, detalles, foto, envio};
        dispatch(EDITAR_PRODUCTO_CATALOGO(idProducto, producto));
        cancelarEdicion();
        mostrarMensaje("Se editó el Producto #" + idProducto, "advertencia");
    }

    const eliminarItem = (id) => {
        /* const confirmar = confirm("Desea eliminar el Producto #" + id + "?");

        if (confirmar) {
            dispatch(ELIMINAR_PRODUCTO_CATALOGO(id));
            mostrarMensaje("Se eliminó el Producto #" + id, "error");
        } */

        mostrarModal("Desea eliminar el Producto #" + id + "?", () => {
            dispatch(ELIMINAR_PRODUCTO_CATALOGO(id));
            mostrarMensaje("Se eliminó el Producto #" + id, "error");
        })
    }

    useEffect(() => {
        (nombre != "" && precio != "" && stock != "" && marca != "" && categoria != "" && detalles != "" && foto != "") ? setDeshabilitarEnvio(false) :  setDeshabilitarEnvio(true);
    })

    return (
        <div className="container">
            <div className="row my-5">
                <div className="col-md-6 offset-md-3">
                    <h2 className="text-center fw-light mb-3">Alta de Producto</h2>
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Nombre</label>
                            <input type="text" className="form-control" value={nombre} onChange={(e) => {setNombre(e.target.value)}} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Precio</label>
                            <input type="text" className="form-control" value={precio} onChange={(e) => {setPrecio(e.target.value)}}  />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Stock</label>
                            <input type="text" className="form-control" value={stock} onChange={(e) => {setStock(e.target.value)}} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Marca</label>
                            <input type="text" className="form-control" value={marca} onChange={(e) => {setMarca(e.target.value)}} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Categoría</label>
                            <input type="text" className="form-control" value={categoria} onChange={(e) => {setCategoria(e.target.value)}} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Detalles</label>
                            <input type="text" className="form-control" value={detalles} onChange={(e) => {setDetalles(e.target.value)}} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Foto</label>
                            <input type="text" className="form-control" value={foto} onChange={(e) => {setFoto(e.target.value)}} />
                        </div>
                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" disabled={deshabilitarEnvio} checked={envio} value={envio} onChange={(e) => {setEnvio(envio ? false : true)}} />
                            <label className="form-check-label">Envío Gratis</label>
                        </div>
                        <button type="button" className="btn btn-dark fw-bold me-2" onClick={modoEdicion ? actualizarProducto : guardarProducto}>{modoEdicion ? "Actualizar" : "Guardar"}</button>
                        {modoEdicion && <button type="button" className="btn btn-dark fw-bold" onClick={cancelarEdicion}>Cancelar</button>}
                    </form>
                </div>
            </div>
            <div className="row my-5">
                <div className="col-md-12">
                    {productos.length == 0 ? <h3 className="text-center fw-bold text-danger mb-3">No hay Productos!</h3> : <table className="table">
                        <tbody>
                        {
                            productos.map(item => (
                                <tr key={item.id} className={item.id == idProducto ? "table-active" : ""}>
                                    <td><img src={item.foto} alt={item.nombre} width={80} /></td>
                                    <td className="align-middle">{item.nombre}</td>
                                    <td className="align-middle">${item.precio}</td>
                                    <td className="align-middle">{item.stock}</td>
                                    <td className="align-middle">{item.marca}</td>
                                    <td className="align-middle">{item.categoria}</td>
                                    <td className="align-middle">{item.envio ? <b>Envío Gratis</b> : ""}</td>
                                    <td className="text-end align-middle"><button className="btn btn-dark fw-bold me-2" onClick={(e) => {editarItem(item.id)}}>Editar</button><button className="btn btn-dark fw-bold" disabled={modoEdicion} onClick={(e) => {eliminarItem(item.id)}}>Eliminar</button></td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>}
                </div>
            </div>
        </div>
    )
}

export default Alta