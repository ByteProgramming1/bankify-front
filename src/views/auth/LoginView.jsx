import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconMail, IconLock, IconEye, IconEyeOff } from '@tabler/icons-react';
import { AuthCard } from '../../components/auth/AuthCard';
import { InputField } from '../../components/auth/InputField';
import Navbar from '../../components/common/NavBar';

import "./../../assets/css/auth/LoginView.css"

export const LoginView = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    
    const [error, setError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null); 
        const users = JSON.parse(localStorage.getItem('bankify_users') || '[]');
        
        const userFound = users.find((u) => u.email === email && u.password === password);

        if (!userFound) {
            setError('Credenciales incorrectas.');
            return;
        }

        if (userFound.role === 'client') {
            const isBugFixed = localStorage.getItem('bug_correlacion_fixed') === 'true';
            if (!isBugFixed) {
                setError('Error de correlación de datos en el sistema. El administrador debe cargar el archivo de estadística primero.');
                return;
            }
        }

        localStorage.setItem('bankify_current_user', JSON.stringify(userFound));

        console.log('Login success:', userFound);

        if (userFound.role === 'admin') {
            navigate('/app/admin'); 
        }
    };

    return (
        <>
            <Navbar></Navbar>
            <div className="login-page">
                <AuthCard title="Accede a tu cuenta" subtitle="Tu banco digital, en cualquier lugar.">
                    <form className="login-form" onSubmit={handleSubmit}>

                        {/* 7. Contenedor visual para mostrar el error si existe */}
                        {error && (
                            <div style={{ color: '#dc3545', fontSize: '14px', textAlign: 'center', marginBottom: '15px', fontWeight: '500' }}>
                                {error}
                            </div>
                        )}

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
                            Iniciar Sesión
                        </button>
                    </form>
                </AuthCard>
            </div>
        </>
    );
};

export default LoginView;