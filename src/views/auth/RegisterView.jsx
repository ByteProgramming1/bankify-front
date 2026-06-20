import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconMail, IconLock, IconEye, IconEyeOff } from '@tabler/icons-react';
import { AuthCard } from '../../components/auth/AuthCard';
import { InputField } from '../../components/auth/InputField';
import Navbar from '../../components/common/NavBar';

import "./../../assets/css/auth/RegisterView.css"

export const RegisterView= () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
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
                            onChange={(e) => setEmail(e.target.value)}
                            iconLeft={IconMail}
                            required
                        />

                        <InputField
                            label="Contraseña"
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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