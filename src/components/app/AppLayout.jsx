import { Outlet } from 'react-router-dom';
import AppNavbar from './AppNavbar';
import './../../assets/css/app/AppLayout.css';

/**
 * Layout compartido por todas las vistas autenticadas (/app/*).
 * Reemplaza el <header>Top header</header> de marcador de posición en Router.jsx.
 */
export const AppLayout = () => {
    return (
        <div className="app-layout">
            <AppNavbar />
            <main className="app-layout-content">
                <Outlet />
            </main>
        </div>
    );
};

export default AppLayout;
