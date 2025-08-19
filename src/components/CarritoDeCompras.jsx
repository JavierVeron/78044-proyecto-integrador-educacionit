import { useEffect, useState } from "react";
import productos from "../assets/productos.json";

const CarritoDeCompras = () => {
    const [carrito, setCarrito] = useState([]);

    useEffect(() => {
        const producto1 = productos.find(item => item.id == 1);
        const producto2 = productos.find(item => item.id == 2);
        const nuevoCarrito = [producto1, producto2];
        setCarrito(nuevoCarrito);
    }, [])

    if (!carrito || carrito.length == 0) {
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
                        {
                            carrito.map(item => (
                                <tr key={item.id}>
                                    <td><img src={item.foto} alt={item.nombre} width={80} /></td>
                                    <td className="align-middle">{item.nombre}</td>
                                    <td className="align-middle">${item.precio}</td>
                                    <td className="align-middle">1</td>
                                    <td className="align-middle">${item.precio}</td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default CarritoDeCompras