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

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log('Register success:', { email, password });

        navigate('/app/dashboard');
    };

    return (
        <>
            <Navbar></Navbar>
            <div className="register-page">
                <AuthCard title="Crea tu cuenta" subtitle="Completa tu información para unirte al sistema">
                    <form className="register-form" onSubmit={handleSubmit}>

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
                            Crear mi cuenta
                        </button>
                    </form>
                </AuthCard>
            </div>
        </>
    );
};

export default RegisterView;