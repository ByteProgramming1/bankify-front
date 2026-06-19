import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconUser, IconMail, IconLock, IconEye, IconEyeOff } from '@tabler/icons-react';
import { AuthCard } from '../../components/auth/AuthCard';
import { InputField } from '../../components/auth/InputField';
import Navbar from '../../components/common/NavBar';


// @ts-ignore
import "./../../assets/css/auth/RegisterView.css"

export const RegisterView: React.FC = () => {
    const navigate = useNavigate();

    const [fullName, setFullName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [accountType, setAccountType] = useState<string>('Ahorros');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [acceptTerms, setAcceptTerms] = useState<boolean>(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log('Register success:', { fullName, email, accountType, password, acceptTerms });

        navigate('/app/dashboard');
    };

    return (
        <>
            <Navbar></Navbar>
            <div className="register-page">
                <AuthCard title="Crea tu cuenta" subtitle="Completa tu información para unirte al sistema">
                    <form className="register-form" onSubmit={handleSubmit}>

                        <InputField
                            label="Nombre Completo"
                            id="fullName"
                            placeholder="Carlos Mendoza"
                            value={fullName}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFullName(e.target.value)}
                            iconLeft={IconUser}
                            required
                        />

                        <InputField
                            label="Correo Electrónico"
                            id="email"
                            type="email"
                            placeholder="john@example.com"
                            value={email}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                            iconLeft={IconMail}
                            required
                        />

                        <div className="input-group">
                            <label htmlFor="accountType">Tipo de Cuenta</label>
                            <div className="input-wrapper">
                                <select
                                    id="accountType"
                                    className="register-select"
                                    style={{ paddingLeft: '14px' }}
                                    value={accountType}
                                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setAccountType(e.target.value)}
                                >
                                    <option value="Ahorros">Ahorros</option>
                                    <option value="Corriente">Corriente</option>
                                </select>
                            </div>
                        </div>

                        <InputField
                            label="Contraseña"
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="********"
                            value={password}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                            iconLeft={IconLock}
                            iconRight={showPassword ? IconEyeOff : IconEye}
                            onIconRightClick={() => setShowPassword(!showPassword)}
                            required
                        />

                        <div className="checkbox-group">
                            <input
                                type="checkbox"
                                id="terms"
                                checked={acceptTerms}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAcceptTerms(e.target.checked)}
                                required
                            />
                            <label htmlFor="terms">Acepto los términos y condiciones</label>
                        </div>

                        <button type="submit" className="bankify-btn-submit">
                            Crear mi cuenta
                        </button>
                    </form>
                </AuthCard>
            </div>
        </>
    );
};

export default RegisterView;