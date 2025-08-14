import Logo from "./Logo"
import NavBar from "./NavBar"

const Header = () => {
    return (
        <div className="container-fluid my-5">
            <div className="row">
                <div className="col">
                    <Logo />
                </div>
                <div className="col">
                    <NavBar />
                </div>
                <div className="col">
                    -
                </div>
            </div>
        </div>
    )
}

export default Header