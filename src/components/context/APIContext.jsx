import { createContext, useEffect, useState } from "react";
import mockAPI from "../mockAPI";

export const APIContext = createContext();

const APIContextProvider = ({children}) => {
    const [productos, setProductos] = useState([]);
    const [carrito, setCarrito] = useState([]);

    useEffect(() => {
        cargarProductosCatalogo();
    }, [])

    const cargarProductosCatalogo = async () => {
        const response = await mockAPI.get("/productos");          
        setProductos(response.data);
    }

    const agregarProductoCatalogo = async (item) => {
        try {
            const response = await mockAPI.post("/productos", item);

            if (response.status == 201) {
                console.log("Se agregó el Producto #" + response.data.id);
                cargarProductosCatalogo();
            } else {
                throw new Error("No se pudo agregar el Producto!")
            }
        } catch (error) {
            console.log(error);  
        }
    }

    const editarProductoCatalogo = async (id, item) => {
        let producto = productos.find(item => item.id == id);
        producto.nombre = item.nombre;
        producto.precio = item.precio;
        producto.stock = item.stock;
        producto.marca = item.marca;
        producto.categoria = item.categoria;
        producto.detalles = item.detalles;
        producto.foto = item.foto;
        producto.envio = item.envio;
        
        try {
            const response = await mockAPI.put("/productos/" + id, producto);            

            if (response.status == 200) {
                console.log("Se actualizó el Producto #" + response.data.id);
                cargarProductosCatalogo();
            } else {
                throw new Error("No se pudo actualizar el Producto!")
            }
        } catch (error) {
            console.log(error);  
        }
    }

    const eliminarProductoCatalogo = async (id) => {
        try {
            const response = await mockAPI.delete("/productos/" + id);            

            if (response.status == 200) {
                console.log("Se eliminó el Producto #" + response.data.id);
                cargarProductosCatalogo();
            } else {
                throw new Error("No se pudo eliminar el Producto!")
            }
        } catch (error) {
            console.log(error);  
        }
    }

    const agregarProductoCarrito = (id) => {
        let producto = carrito.find(item => item.id == id);

        if (producto) {
            producto.cantidad++;
            setCarrito([...carrito]);
        } else {
            producto = productos.find(item => item.id == id);
            producto.cantidad = 1;
            setCarrito([...carrito, producto]);
        }

        console.log("Se agregó el Producto #" + id + " al Carrito!");
    }

    const eliminarProductoCarrito = (id) => {
        const carritoActualizado = carrito.filter(item => item.id != id);
        setCarrito([...carritoActualizado]);
        console.log("Se eliminó el Producto #" + id + " del Carrito!");
    }

    const vaciarCarrito = () => {
        setCarrito([]);
        console.log("Se vació el Carrito!");
    }

    const cantidadTotalProductos = () => {
        return carrito.reduce((acum, item) => acum += item.cantidad, 0);
    }

    const sumaTotalProductos = () => {
        return carrito.reduce((acum, item) => acum += item.precio * item.cantidad, 0);
    }

    const incrementarItem = (id) => {
        const producto = carrito.find(item => item.id == id);

        if (producto.cantidad < producto.stock) {
            producto.cantidad++;
            setCarrito([...carrito]);
            console.log("Se incrementó la cantidad del Producto #" + id + "!");
        }
    }

    const decrementarItem = (id) => {
        const producto = carrito.find(item => item.id == id);

        if (producto.cantidad > 1) {
            producto.cantidad--;
            setCarrito([...carrito]);
            console.log("Se decrementó la cantidad del Producto #" + id + "!");            
        }
    }

    return <APIContext.Provider value={{productos, carrito, agregarProductoCatalogo, editarProductoCatalogo, eliminarProductoCatalogo, agregarProductoCarrito, eliminarProductoCarrito, vaciarCarrito, cantidadTotalProductos, sumaTotalProductos, incrementarItem, decrementarItem}}>
        {children}
    </APIContext.Provider>
}

export default APIContextProvider