const Card = ({item}) => {
    return (
        <div className="col-md-4">
            <div className="card mb-4 border-0">
                <img src={item.foto} className="card-img-top" alt={item.nombre} />
                <div className="card-body">
                    <p className="card-text"><b>${item.precio}</b><br /><span className="card-title fw-light">{item.nombre}</span></p>
                </div>
            </div>
        </div>
    )
}

export default Card