import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

const NavBar = () => {
    const totalProductos = useSelector(state => state.carrito.totalProductos);

    return (
        <ul className="nav justify-content-center">
            <li className="nav-item">
                <Link to={"/productos"} className="nav-link text-dark fw-bold">Productos</Link>
            </li>
            <li className="nav-item">
                <Link to={"/categoria/hombre"} className="nav-link text-dark fw-bold">Hombre</Link>
            </li>
            <li className="nav-item">
                <Link to={"/categoria/mujer"} className="nav-link text-dark fw-bold">Mujer</Link>
            </li>
            <li className="nav-item">
                <Link to={"/categoria/ninos"} className="nav-link text-dark fw-bold">Niños</Link>
            </li>
            <li className="nav-item">
                <Link to={"/alta"} className="nav-link text-dark fw-bold">Alta</Link>
            </li>
            <li className="nav-item">
                <Link to={"/carrito"} className="nav-link text-dark fw-bold">Carrito <span className="badge text-bg-secondary">{totalProductos}</span></Link>
            </li>
        </ul>
    )
}

export default NavBar