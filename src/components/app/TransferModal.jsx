import { useState } from 'react';
import { IconArrowRight, IconCurrencyDollar } from '@tabler/icons-react';
import Modal from '../common/Modal';
import AccountSummaryCard from './AccountSummaryCard';
import './../../assets/css/common/Modal.css';

// TODO: reemplazar por datos reales (cuenta del usuario autenticado y lista de
// contactos/destinatarios) cuando exista integración con el backend.
const MOCK_ORIGIN_ACCOUNT = {
    label: 'CUENTA ORIGEN',
    name: 'Elián Ibarra',
    accountInfo: 'Cuenta Corriente · **** 4821',
    balance: 4850000,
};

const MOCK_RECIPIENTS = [
    { id: 'rec-1', name: 'Laura Ríos', accountInfo: 'Cuenta Corriente · **** 7733', balance: 1250000 },
    { id: 'rec-2', name: 'Andrés Suárez', accountInfo: 'Cuenta de Ahorros · **** 2210', balance: 980000 },
];

/**
 * Modal de "Nueva Transferencia". Se abre desde TransferencesView.
 *
 * @param {boolean} isOpen
 * @param {() => void} onClose
 * @param {(transfer: object) => void} [onSubmit] - Callback al confirmar (de momento solo loguea/cierra).
 */
export const TransferModal = ({ isOpen, onClose, onSubmit }) => {
    const [recipientId, setRecipientId] = useState(MOCK_RECIPIENTS[0]?.id ?? '');
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');

    const recipient = MOCK_RECIPIENTS.find((r) => r.id === recipientId) ?? MOCK_RECIPIENTS[0];

    const handleSubmit = (e) => {
        e.preventDefault();

        const transfer = {
            recipientId,
            amount: Number(amount),
            message,
        };

        // TODO: integrar con el endpoint real de transferencias
        console.log('Nueva transferencia:', transfer);

        onSubmit?.(transfer);
        onClose?.();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2 className="modal-title">Nueva Transferencia</h2>
            <p className="modal-subtitle">Mueve tus fondos a otra cuenta de forma segura</p>

            <div className="modal-accounts">
                <AccountSummaryCard {...MOCK_ORIGIN_ACCOUNT} />
                <span className="modal-arrow">
                    <IconArrowRight size={16} />
                </span>
                {recipient && <AccountSummaryCard label="CUENTA DESTINO" {...recipient} />}
            </div>

            <form className="modal-form" onSubmit={handleSubmit}>
                <div className="modal-field">
                    <label htmlFor="recipient">Destinatario*</label>
                    <select
                        id="recipient"
                        value={recipientId}
                        onChange={(e) => setRecipientId(e.target.value)}
                        required
                    >
                        {MOCK_RECIPIENTS.map((r) => (
                            <option key={r.id} value={r.id}>
                                {r.name} – {r.accountInfo.split('·')[1]?.trim()}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="modal-field">
                    <label htmlFor="amount">Monto a Transferir*</label>
                    <div className="modal-field-input-wrapper">
                        <IconCurrencyDollar size={18} className="modal-field-icon" />
                        <input
                            id="amount"
                            type="number"
                            min="0"
                            step="50"
                            placeholder="0"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="modal-field">
                    <label htmlFor="message">Mensaje (Opcional)</label>
                    <textarea
                        id="message"
                        placeholder="Ej: Compra traje formal"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={3}
                    />
                </div>

                <button type="submit" className="modal-submit">
                    Confirmar Transferencia <IconArrowRight size={16} />
                </button>
            </form>
        </Modal>
    );
};

export default TransferModal;
