const Card = ({item}) => {
    return (
        <div className="col-md-4">
            <div class="card mb-4 border-0">
                <img src={item.foto} class="card-img-top" alt={item.nombre} />
                <div class="card-body">
                    <p class="card-text"><b>${item.precio}</b><br /><span class="card-title fw-light">{item.nombre}</span></p>
                </div>
            </div>
        </div>
    )
}

export default Card