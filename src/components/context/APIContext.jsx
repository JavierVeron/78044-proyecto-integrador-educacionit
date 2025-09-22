import { createContext, useEffect, useState } from "react";
import mockAPI from "../mockAPI";

export const APIContext = createContext();

const ToastMensaje = ({mensaje}) => {
    return (
        <div className="toast-container position-fixed top-0 end-0 p-3">
            <div id="liveToast" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
                <div className="toast-header">
                    <img src="https://www.adidas.com.ar/static/glass/landing-app/adidas-landing-app/favicon.ico" className="rounded me-2" alt="Adidas" />
                    <strong className="me-auto">Adidas Argentina</strong>
                    <small>ahora</small>
                    <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div className="toast-body">
                    {mensaje}
                </div>
            </div>
        </div>
    )
}

const ModalMensaje = ({mensaje, fn}) => {
    return (
        <div className="modal fade" id="liveModal" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5">Adidas Argentina</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    {mensaje}
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary" onClick={fn}>Eliminar</button>
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                </div>
                </div>
            </div>
        </div>
    )
}

const APIContextProvider = ({children}) => {
    const [mensaje, setMensaje] = useState("");
    const [fn, setFn] = useState(null);
 
    /* const [productos, setProductos] = useState([]);
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
    } */

    const mostrarMensaje = (texto, tipo) => {
        let style = tipo == "ok" ? "bg-success" : tipo == "error" ? "bg-danger" : "bg-warning";
        setMensaje(texto);
        const liveToast = document.getElementById('liveToast');
        liveToast.className = `toast ${style}`;
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(liveToast);
        toastBootstrap.show();
    }

    const mostrarModal = (texto, unaFuncion) => {
        setMensaje(texto);
        setFn(unaFuncion);
        const modalToggle = document.getElementById("liveModal");
        const myModal = new bootstrap.Modal(modalToggle, {});
        myModal.show(modalToggle);
    }

    return <APIContext.Provider value={{mostrarMensaje, mostrarModal /* , agregarProductoCatalogo, editarProductoCatalogo, eliminarProductoCatalogo, agregarProductoCarrito, eliminarProductoCarrito, vaciarCarrito, cantidadTotalProductos, sumaTotalProductos, incrementarItem, decrementarItem */}}>
        <ToastMensaje mensaje={mensaje} />
        <ModalMensaje mensaje={mensaje} fn={fn} />
        {children}
    </APIContext.Provider>
}

export default APIContextProvider