import React from 'react';
import CustomButton from "../common/CustomButton";
import logoBankify from "../../assets/img/Logo.webp";
import { useNavigate } from 'react-router-dom';


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