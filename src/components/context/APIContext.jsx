import { createContext, useState } from "react";
import productosJSON from "../../assets/productos.json";

export const APIContext = createContext();

const APIContextProvider = ({children}) => {
    const [productos, setProductos] = useState(productosJSON);
    const [carrito, setCarrito] = useState([]);

    const generarId = () => {
        let max = 0;

        productos.forEach(item => {
            if (item.id > max) {
                max = item.id;
            }
        })

        return (max + 1);
    }

    const agregarProductoCatalogo = (item) => {
        const id = generarId();
        const producto = {id, ...item};
        productos.push(producto);
        setProductos([...productos]);
        console.log("Se agregó el Producto #" + id);
    }

    const editarProductoCatalogo = (id, item) => {
        let producto = productos.find(item => item.id == id);
        producto.nombre = item.nombre;
        producto.precio = item.precio;
        producto.stock = item.stock;
        producto.marca = item.marca;
        producto.categoria = item.categoria;
        producto.detalles = item.detalles;
        producto.foto = item.foto;
        producto.envio = item.envio;
        console.log(producto);
        
        setProductos([...productos]);
        console.log("Se actualizó el Producto #" + id);        
    }

    const eliminarProductoCatalogo = (id) => {
        const productosActualizados = productos.filter(item => item.id != id);
        setProductos([...productosActualizados]);
        console.log("Se eliminó el Producto #" + id);
    }

    return <APIContext.Provider value={{productos, carrito, agregarProductoCatalogo, editarProductoCatalogo, eliminarProductoCatalogo}}>
        {children}
    </APIContext.Provider>
}

export default APIContextProvider