import { Link } from "react-router-dom"
import logo from "../../assets/img/Logo.webp"

const NavBar = () => {
    return (
        <nav>
            <div>
                <img src={logo} alt="Bankify" />
            </div>

            <div>
                <Link to="/auth/login">Iniciar Sesion</Link>
                <Link to="/auth/register">Registrarse</Link>
            </div>
        </nav>
    )
}

export default NavBar