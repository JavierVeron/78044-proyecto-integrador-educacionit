import { useContext, useEffect, useState } from "react";

import Card from "./Card";
import { useParams } from "react-router-dom";
import { APIContext } from "./context/APIContext";

const Catalogo = () => {
    const {productos} = useContext(APIContext);
    const [items, setItems] = useState(productos);
    const {id} = useParams();    

    useEffect(() => {
        setItems(id ? productos.filter(item => item.categoria == id) : productos)
    }, [id, productos])

    if (!productos || productos.length == 0) {
        return (
            <div className="container my-5">
                <div className="row">
                    <h2 className="text-center fw-light mb-3">Listado de Productos</h2>
                    <h3 className="text-center fw-bold text-danger mb-3">No hay Productos!</h3>
                </div>
            </div>
        )
    }

    return (
        <div className="container my-5">
            <div className="row">
                <h2 className="text-center fw-light mb-3">Listado de Productos</h2>
                {
                    items.map(item => (
                        <Card key={item.id} item={item} />
                    ))
                }
            </div>
        </div>
    )
}

export default Catalogo