import { useEffect, useState } from "react";
import productos from "../assets/productos.json";

const Alta = () => {
    const [items, setItems] = useState(productos);
    const [nombre, setNombre] = useState("D.O.N. Issue 7");
    const [precio, setPrecio] = useState(169999);
    const [stock, setStock] = useState(10);
    const [marca, setMarca] = useState("Adidas");
    const [categoria, setCategoria] = useState("hombre");
    const [detalles, setDetalles] = useState("Preparate para un nuevo Don. Las D.O.N. Issue #7 son las últimas zapatillas exclusivas de adidas Basketball y la superestrella Donovan Mitchell. Diseñadas para lucir elegantes y modernas, estas zapatillas de básquet de alto rendimiento apoyan el tipo de movimientos que hacen de Spida uno de los talentos más dinámicos del juego.");
    const [foto, setFoto] = useState("https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/47e212a033874a3e9d81a8acdbc0c95f_9366/D.O.N._Issue_7_Blanco_JS1299_01_00_standard.jpg");
    const [envio, setEnvio] = useState(true);
    const [deshabilitarEnvio, setDeshabilitarEnvio] = useState(true);

    const generarId = () => {
        let max = 0;

        items.forEach(item => {
            if (item.id > max) {
                max = item.id;
            }
        })

        return (max + 1);
    }

    const guardarProducto = () => {
        const id = generarId();
        const producto = {id, nombre, precio, stock, marca, categoria, detalles, foto, envio};
        items.push(producto);
        setItems([...items]);
        console.log("Se agregó el producto #" + id);
        
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
                        <button type="button" className="btn btn-primary" onClick={guardarProducto}>Guardar</button>
                    </form>
                </div>
            </div>
            <div className="row my-5">
                <div className="col-md-12">
                    {items.length == 0 ? <h3 className="text-center fw-bold text-danger mb-3">No hay Productos!</h3> : <table className="table">
                        <tbody>
                        {
                            items.map(item => (
                                <tr key={item.id}>
                                    <td><img src={item.foto} alt={item.nombre} width={80} /></td>
                                    <td className="align-middle">{item.nombre}</td>
                                    <td className="align-middle">${item.precio}</td>
                                    <td className="align-middle">{item.stock}</td>
                                    <td className="align-middle">{item.marca}</td>
                                    <td className="align-middle">{item.categoria}</td>
                                    <td className="align-middle">{item.detalles}</td>
                                    <td className="align-middle">{item.envio ? <b>Envío Gratis</b> : ""}</td>
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