import { useEffect, useState } from 'react';
import { IconArrowRight, IconCurrencyDollar } from '@tabler/icons-react';
import Modal from '../common/Modal';
import AccountSummaryCard from './AccountSummaryCard';

// ─── Claves de localStorage ────────────────────────────────────────────────────
const TRANSFERS_KEY = 'bankify-transfers';
const BALANCE_KEY   = 'bankify-balance';
const ADMIN_STATUS_KEY = 'admin-modules-status';

// ID del módulo admin que controla las transferencias
const TRANSFER_MODULE_ID = 'mod-4';

// ─── Cuenta origen por defecto ────────────────────────────────────────────────
const ORIGIN_ACCOUNT = {
    label: 'CUENTA ORIGEN',
    name: 'Elián Ibarra',
    accountInfo: 'Cuenta Corriente · **** 4821',
};

const INITIAL_BALANCE = 4850000;

const MOCK_RECIPIENTS = [
    { id: 'rec-1', name: 'Laura Ríos',     accountInfo: 'Cuenta Corriente · **** 7733', balance: 1250000 },
    { id: 'rec-2', name: 'Andrés Suárez',  accountInfo: 'Cuenta de Ahorros · **** 2210', balance: 980000  },
];

// ─── Helpers de localStorage ──────────────────────────────────────────────────
const getBalance = () => {
    try {
        const stored = localStorage.getItem(BALANCE_KEY);
        return stored !== null ? Number(stored) : INITIAL_BALANCE;
    } catch {
        return INITIAL_BALANCE;
    }
};

const saveBalance = (value) => {
    try { localStorage.setItem(BALANCE_KEY, String(value)); } catch { /* noop */ }
};

const getTransfers = () => {
    try {
        const stored = localStorage.getItem(TRANSFERS_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
};

const saveTransfer = (transfer) => {
    try {
        const transfers = getTransfers();
        transfers.unshift(transfer); // más reciente primero
        localStorage.setItem(TRANSFERS_KEY, JSON.stringify(transfers));
    } catch { /* noop */ }
};

const isTransferModuleFixed = () => {
    try {
        const stored = localStorage.getItem(ADMIN_STATUS_KEY);
        if (!stored) return false;
        const statusMap = JSON.parse(stored);
        return statusMap[TRANSFER_MODULE_ID] === 'completado';
    } catch {
        return false;
    }
};

const formatCurrency = (value) =>
    new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        maximumFractionDigits: 0,
    }).format(value);

// ─── Componente ───────────────────────────────────────────────────────────────
export const TransferModal = ({ isOpen, onClose, onTransferComplete }) => {
    const [recipientId, setRecipientId] = useState(MOCK_RECIPIENTS[0]?.id ?? '');
    const [amount, setAmount]           = useState('');
    const [message, setMessage]         = useState('');
    const [balance, setBalance]         = useState(getBalance);

    // Sincroniza el saldo al abrir el modal
    useEffect(() => {
        if (isOpen) setBalance(getBalance());
    }, [isOpen]);

    const recipient = MOCK_RECIPIENTS.find((r) => r.id === recipientId) ?? MOCK_RECIPIENTS[0];

    const handleSubmit = (e) => {
        e.preventDefault();

        const amountValue = Number(amount);
        const isFixed = isTransferModuleFixed();

        let newBalance;

        if (isFixed) {
            // ✅ Lógica CORRECTA: restar el monto de la cuenta origen
            newBalance = balance - amountValue;
        } else {
            // ❌ BUG INTENCIONAL: suma el monto en vez de restarlo
            // El saldo aumenta cuando debería disminuir
            newBalance = balance + amountValue;
        }

        saveBalance(newBalance);
        setBalance(newBalance);

        const transfer = {
            id: `TX-${Date.now()}`,
            recipient: recipient.name,
            message: message || '—',
            date: new Date().toISOString().split('T')[0],
            amount: amountValue,
        };

        saveTransfer(transfer);
        onTransferComplete?.();

        setAmount('');
        setMessage('');
        onClose?.();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2 className="modal-title">Nueva Transferencia</h2>
            <p className="modal-subtitle">Mueve tus fondos a otra cuenta de forma segura</p>

            <div className="modal-accounts">
                <AccountSummaryCard
                    {...ORIGIN_ACCOUNT}
                    balance={balance}
                />
                <span className="modal-arrow">
                    <IconArrowRight size={16} />
                </span>
                {recipient && (
                    <AccountSummaryCard
                        label="CUENTA DESTINO"
                        name={recipient.name}
                        accountInfo={recipient.accountInfo}
                        balance={recipient.balance}
                    />
                )}
            </div>

            {/* Saldo actual destacado — el usuario lo verá cambiar incorrectamente */}
            <div className="modal-balance-banner">
                <span className="modal-balance-label">Saldo disponible en tu cuenta</span>
                <span className="modal-balance-value">{formatCurrency(balance)}</span>
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
                            min="1"
                            step="1"
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
