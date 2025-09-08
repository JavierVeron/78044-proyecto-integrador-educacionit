import { Link } from "react-router-dom"

const Error404 = () => {
    return (
        <div className="container my-5">
            <div className="row">
                <div className="col">
                    <h1 className="fw-bold">NO SE ENCUENTRA LA PÁGINA</h1>
                    <p>Vuelve a nuestra <Link to={"/"} className="text-dark">tienda online</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Error404