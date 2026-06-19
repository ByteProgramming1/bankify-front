import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconMail, IconLock, IconEye, IconEyeOff } from '@tabler/icons-react';
import { AuthCard } from '../../components/auth/AuthCard';
import { InputField } from '../../components/auth/InputField';
import Navbar from '../../components/common/NavBar';

// @ts-ignore
import './LoginView.css';

export const LoginView: React.FC = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log('Login success:', { email, password });

        navigate('/app/dashboard');
    };

    return (
        <>
            <Navbar></Navbar>
            <div className="login-page">
                <AuthCard title="Accede a tu cuenta" subtitle="Tu banco digital, en cualquier lugar.">
                    <form className="login-form" onSubmit={handleSubmit}>

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

                        <button type="submit" className="bankify-btn-submit">
                            Iniciar Sesión
                        </button>
                    </form>
                </AuthCard>
            </div>
        </>
    );
};

export default LoginView;