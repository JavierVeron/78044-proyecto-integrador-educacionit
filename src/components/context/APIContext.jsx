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
        setProductos([...productos]);
        console.log("Se actualizó el Producto #" + id);        
    }

    const eliminarProductoCatalogo = (id) => {
        const productosActualizados = productos.filter(item => item.id != id);
        setProductos([...productosActualizados]);
        console.log("Se eliminó el Producto #" + id);
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