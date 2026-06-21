import CustomButton from "../common/CustomButton";
import logoBankify from "../../assets/img/Logo.webp";
import { useNavigate } from 'react-router-dom';

import "../../assets/css/common/NavBar.css";

export const Navbar = () => {
    const navigate = useNavigate();

    const handleLoginRedirect = () => {
        navigate("/auth/login")
    };

    const handleRegisterRedirect = () => {
        navigate("/auth/register")
    };

    return (
        <nav className="bankify-navbar">
            <div className="navbar-container">

                <div className="navbar-logo" onClick={() => window.location.href = '/'}>
                    <img src={logoBankify} alt="Logo Bankify" />
                </div>

                <div className="navbar-actions">
                    <CustomButton variant="outline" onClick={handleLoginRedirect}>
                        Iniciar Sesión
                    </CustomButton>

                    <CustomButton variant="solid" onClick={handleRegisterRedirect}>
                        Registrarse
                    </CustomButton>
                </div>

            </div>
        </nav>
    );
};

export default Navbar;