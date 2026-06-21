import { IconClipboardText, IconClipboardPlus, IconSearch } from "@tabler/icons-react"
import CustomButton from "../../components/common/CustomButton"
import { useState } from "react";
import './../../assets/css/app/TopView.css';
import SortDropdown from "../../components/app/SortDropdown";
import DataTable from "../../components/app/DataTable";
import CreditModal from "../../components/app/Creditmodal";

const MOCK_CREDITS = [
    {
        id: 'CR-001',
        purpose: 'Compra de vehículo',
        date: '2026-06-10',
        amount: 25000000,
        status: 'en revision',
        incomes: 5700000,
    },
    {
        id: 'CR-002',
        purpose: 'Remodelación de vivienda',
        date: '2026-06-08',
        amount: 15000000,
        status: 'aprobado',
        incomes: 3800000,
    },
    {
        id: 'CR-003',
        purpose: 'Consolidación de deudas',
        date: '2026-06-05',
        amount: 8000000,
        status: 'rechazado',
        incomes: 4400000,
    },
    {
        id: 'CR-004',
        purpose: 'Capital de trabajo',
        date: '2026-06-12',
        amount: 12000000,
        status: 'ingresos',
        incomes: 9200000,
    },
    {
        id: 'CR-005',
        purpose: 'Educación',
        date: '2026-06-15',
        amount: 6000000,
        status: 'en revision',
        incomes: 5000000,
    },
    {
        id: 'CR-006',
        purpose: 'Compra de maquinaria',
        date: '2026-06-01',
        amount: 30000000,
        status: 'aprobado',
        incomes: 14000000,
    },
    {
        id: 'CR-007',
        purpose: 'Libre inversión',
        date: '2026-05-28',
        amount: 5000000,
        status: 'rechazado',
        incomes: 3000000,
    },
];

const SORT_OPTIONS = [
    { value: 'date-desc', label: 'Más reciente' },
    { value: 'date-asc', label: 'Más antiguo' },
    { value: 'amount-desc', label: 'Monto: mayor a menor' },
    { value: 'amount-asc', label: 'Monto: menor a mayor' },
];

const sortRows = (rows, sortBy) => {
    const sorted = [...rows];

    switch (sortBy) {
        case 'date-asc':
            return sorted.sort((a, b) => a.date.localeCompare(b.date));
        case 'amount-desc':
            return sorted.sort((a, b) => b.amount - a.amount);
        case 'amount-asc':
            return sorted.sort((a, b) => a.amount - b.amount);
        case 'date-desc':
        default:
            return sorted.sort((a, b) => b.date.localeCompare(a.date));
    }
};

const formatCurrency = (value) =>
    new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(value);

const COLUMNS = [
    { key: 'id', label: 'ID' },
    { key: 'purpose', label: 'Propósito' },
    { key: 'date', label: 'Fecha' },
    { key: 'incomes', label: 'Ingresos', render: (row) => formatCurrency(row.incomes) },
    { key: 'amount', label: 'Monto', render: (row) => formatCurrency(row.amount) },
];

const CreditsView = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState('date-desc');

    const filteredRows = sortRows(
        MOCK_CREDITS.filter(
            (row) =>
                row.purpose.toLowerCase().includes(search.toLowerCase()) ||
                row.amount.toString().toLowerCase().includes(search.toLowerCase())
        ),
        sortBy
    );
    return (
        <div className="top-view">
            <div className="top-header">
                <div className="top-title-group">
                    <span className="top-title-icon">
                        <IconClipboardText size={24} stroke={2.2} />
                    </span>
                    <div>
                        <h1>Mis Créditos</h1>
                        <p>Revisa tu historial de solicitudes activas</p>
                    </div>
                </div>

                <CustomButton variant="solid" onClick={() => setIsModalOpen(true)}>
                    <span className="top-btn-content">
                        <IconClipboardPlus size={18} stroke={2.2} /> Nuevo Crédito
                    </span>
                </CustomButton>
            </div>
            <div className="top-toolbar">
                <div className="top-search">
                    <IconSearch size={18} className="top-search-icon" />
                    <input
                        type="text"
                        placeholder="Buscar crédito por propósito o monto"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="top-sort">
                    <SortDropdown options={SORT_OPTIONS} value={sortBy} onChange={setSortBy} />
                </div>
            </div>

            <DataTable
                columns={COLUMNS}
                rows={filteredRows}
                emptyMessage="No tienes créditos solicitados"
            />
            
            <CreditModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    )
}

export default CreditsView