import { useNavigate } from 'react-router-dom';
import { IconArrowsRightLeft, IconClipboardList, IconClipboardPlus, IconSend } from '@tabler/icons-react';
import ActionCard from '../../components/app/ActionCard';
import './../../assets/css/app/DashboardView.css';

// TODO: reemplazar por el nombre real del usuario autenticado
const MOCK_USER_NAME = 'Elián';

export const DashboardView = () => {
    const navigate = useNavigate();

    const actions = [
        {
            icon: IconClipboardList,
            title: 'Mis Créditos',
            description: 'Consulta tus solicitudes activas',
            onClick: () => navigate('/app/credits'),
        },
        {
            icon: IconArrowsRightLeft,
            title: 'Mis Transacciones',
            description: 'Revisa el historial de movimientos',
            onClick: () => navigate('/app/transferences'),
        },
        {
            icon: IconClipboardPlus,
            title: 'Nuevo Crédito',
            description: 'Solicita un nuevo crédito',
            onClick: () => navigate('/app/credits'),
        },
        {
            icon: IconSend,
            title: 'Nueva Transferencia',
            description: 'Envía dinero a otra cuenta',
            onClick: () => navigate('/app/transferences'),
        },
    ];

    return (
        <div className="dashboard-view">
            <h1 className="dashboard-greeting">{MOCK_USER_NAME}, ¿Qué quieres hacer hoy?</h1>

            <div className="dashboard-actions-grid">
                {actions.map((action) => (
                    <ActionCard key={action.title} {...action} />
                ))}
            </div>
        </div>
    );
};

export default DashboardView;
