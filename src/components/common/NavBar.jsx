import CustomButton from "../common/CustomButton";
import logoBankify from "../../assets/img/Logo.webp";
import { useNavigate, Link } from 'react-router-dom';

import "../../assets/css/common/NavBar.css";

export const Navbar = () => {
    const navigate = useNavigate();

    // 1. Revisar si hay un usuario con sesión activa en el navegador
    const sessionUser = localStorage.getItem('bankify_current_user');
    const user = sessionUser ? JSON.parse(sessionUser) : null;

    const handleLoginRedirect = () => {
        navigate("/auth/login");
    };

    const handleRegisterRedirect = () => {
        navigate("/auth/register");
    };

    // 2. Función para borrar la sesión y sacarlo de la app
    const handleLogout = () => {
        localStorage.removeItem('bankify_current_user');
        navigate("/auth/login");
    };

    return (
        <nav className="bankify-navbar">
            <div className="navbar-container">

                <div className="navbar-left" style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
                    <div className="navbar-logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                        <img src={logoBankify} alt="Logo Bankify" />
                    </div>

                    {/* ENLACES DINÁMICOS: Solo aparecen si el usuario inició sesión */}
                    {user && (
                        <div className="navbar-links" style={{ display: 'flex', gap: '20px' }}>
                            <Link to="/app/dashboard" style={{ textDecoration: 'none', color: 'var(--text-main)', fontWeight: '500' }}>
                                Página Principal
                            </Link>
                            {user.role === 'client' && (
                                <Link to="/app/transferences" style={{ textDecoration: 'none', color: 'var(--text-main)', fontWeight: '500' }}>
                                    Transacciones
                                </Link>
                            )}
                        </div>
                    )}
                </div>

                <div className="navbar-actions">
                    {user ? (
                        // ESTADO A: Si hay usuario, muestra su nombre y el botón de Cerrar Sesión
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <span style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--text-main)' }}>
                                {user.fullName}
                            </span>
                            <CustomButton variant="outline" onClick={handleLogout}>
                                Cerrar Sesión
                            </CustomButton>
                        </div>
                    ) : (
                        // ESTADO B: Si NO hay usuario, muestra los botones originales de Juan Pablo
                        <>
                            <CustomButton variant="outline" onClick={handleLoginRedirect}>
                                Iniciar Sesión
                            </CustomButton>

                            <CustomButton variant="solid" onClick={handleRegisterRedirect}>
                                Registrarse
                            </CustomButton>
                        </>
                    )}
                </div>

            </div>
        </nav>
    );
};

export default Navbar;