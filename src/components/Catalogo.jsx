import productos from "../assets/productos.json";
import Card from "./Card";

const Catalogo = () => {
    return (
        <div className="container my-5">
            <div className="row">
                {
                    productos.map(item => (
                        <Card key={item.id} item={item} />
                    ))
                }
            </div>
        </div>
    )
}

export default Catalogo